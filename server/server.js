require('dotenv').config();

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // تأكد إنه في .gitignore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express();

// CORS (غير domains حسب الحاجة)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));

/**
 * IMPORTANT:
 * Stripe requires the raw body to verify the webhook signature.
 * So we put the webhook route BEFORE express.json() and use express.raw() for it.
 */
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET in env');
    return res.status(500).send('Webhook secret not configured');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle checkout completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('🔔 checkout.session.completed:', session.id);

      // metadata we set when creating session
      const { planId, trainerId, traineeId, planName } = session.metadata || {};

      // idempotency check: avoid duplicate booking for same session
      const existing = await db.collection('bookings').where('stripeSessionId', '==', session.id).limit(1).get();
      if (!existing.empty) {
        console.log('⚠️ Booking for this session already exists:', session.id);
        return res.json({ received: true });
      }

      // fetch plan, trainer, trainee (safely)
      const planDoc = planId ? await db.collection('plans').doc(planId).get() : null;
      const planData = planDoc && planDoc.exists ? planDoc.data() : { id: planId, name: planName || 'Plan' };

      const trainerDoc = trainerId ? await db.collection('users').doc(trainerId).get() : null;
      const trainerData = trainerDoc && trainerDoc.exists ? trainerDoc.data() : { id: trainerId };

      const traineeDoc = traineeId ? await db.collection('users').doc(traineeId).get() : null;
      const traineeData = traineeDoc && traineeDoc.exists ? traineeDoc.data() : { id: traineeId };

      // create booking document
      const booking = {
        planId: planId || null,
        plan: planData,
        trainerId: trainerId || null,
        trainer: trainerData,
        traineeId: traineeId || null,
        trainee: traineeData,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'usd',
        status: 'paid',
        stripeSessionId: session.id,
        paymentIntent: session.payment_intent || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const bookingRef = await db.collection('bookings').add(booking);
      console.log('✅ Booking saved:', bookingRef.id);

      // update trainee: push booking ref or subscription
      if (traineeId) {
        try {
          await db.collection('users').doc(traineeId).set({
            bookings: admin.firestore.FieldValue.arrayUnion({
              bookingId: bookingRef.id,
              planId: booking.planId,
              trainerId: booking.trainerId,
              amount: booking.amount,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            })
          }, { merge: true });
        } catch (e) {
          console.warn('Could not update trainee bookings:', e);
        }
      }

      // update trainer: add client & earnings
      if (trainerId) {
        try {
          await db.collection('users').doc(trainerId).set({
            trainees: admin.firestore.FieldValue.arrayUnion({
              traineeId: traineeId,
              bookingId: bookingRef.id,
              planId: booking.planId,
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            }),
            earnings: admin.firestore.FieldValue.increment(booking.amount),
            totalClients: admin.firestore.FieldValue.increment(1)
          }, { merge: true });
        } catch (e) {
          console.warn('Could not update trainer data:', e);
        }
      }

      // notification for trainer
      try {
        await db.collection('notifications').add({
          userId: trainerId || null,
          type: 'new_booking',
          title: 'تم حجز خطة جديدة',
          message: `${(traineeData.firstName || 'User')} اشترك في ${planData.name || planName || ''}`,
          bookingId: bookingRef.id,
          read: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) {
        console.warn('Could not create notification:', e);
      }
    }

    // respond to stripe
    res.json({ received: true });
  } catch (err) {
    console.error('Error handling webhook event:', err);
    res.status(500).send('Webhook handler error');
  }
});

// After webhook route we can parse JSON for other endpoints
app.use(express.json());

// ------------------ Existing endpoints ------------------
// Create Checkout Session (unchanged, uses metadata)
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('📥 Received request to create checkout session');
    const { planId, trainerId, traineeId, planDetails } = req.body;

    if (!planId || !trainerId || !traineeId || !planDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!planDetails.price || planDetails.price <= 0) {
      return res.status(400).json({ error: 'Invalid price' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planDetails.name || 'Training Plan',
              description: planDetails.description || '',
              images: planDetails.image ? [planDetails.image] : [],
            },
            unit_amount: Math.round(planDetails.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/failed`,
      metadata: {
        planId,
        trainerId,
        traineeId,
        planName: planDetails.name || '',
        duration: planDetails.duration || '',
        sessions: planDetails.sessions || '',
      },
    });

    res.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// verify-payment (optional fallback)
app.post('/verify-payment', async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'Session ID required' });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // optional: return booking info if exists
    const existing = await db.collection('bookings').where('stripeSessionId', '==', sessionId).limit(1).get();
    if (!existing.empty) {
      const doc = existing.docs[0];
      return res.json({ success: true, bookingId: doc.id, booking: doc.data() });
    }

    // otherwise instruct to rely on webhook (or create fallback logic)
    return res.json({ success: true, message: 'Payment completed but booking not found yet. Webhook will create it.' });
  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

// other GET endpoints (subscriptions etc) - keep as you had...
app.get('/subscription/:id', async (req, res) => {
  try {
    const subscriptionDoc = await db.collection('subscriptions').doc(req.params.id).get();
    if (!subscriptionDoc.exists) return res.status(404).json({ error: 'Subscription not found' });
    res.json({ id: subscriptionDoc.id, ...subscriptionDoc.data() });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/subscriptions', async (req, res) => {
  try {
    const snapshot = await db.collection('subscriptions').orderBy('createdAt', 'desc').get();
    const subscriptions = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/trainer/:trainerId/subscriptions', async (req, res) => {
  try {
    const { trainerId } = req.params;
    const snapshot = await db.collection('subscriptions').where('trainerId', '==', trainerId).orderBy('createdAt', 'desc').get();
    res.json(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (error) {
    console.error('Error fetching trainer subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/trainee/:traineeId/subscriptions', async (req, res) => {
  try {
    const { traineeId } = req.params;
    const snapshot = await db.collection('subscriptions').where('traineeId', '==', traineeId).orderBy('createdAt', 'desc').get();
    res.json(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (error) {
    console.error('Error fetching trainee subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: '🚀 Server is running!',
    endpoints: [
      'POST /create-checkout-session',
      'POST /verify-payment',
      'POST /webhook',
      'GET /subscriptions',
      'GET /trainer/:trainerId/subscriptions',
      'GET /trainee/:traineeId/subscriptions'
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
