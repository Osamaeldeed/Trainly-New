require('dotenv').config();

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// ✅ Create Stripe Checkout Session (يروح على صفحة Stripe)
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('📥 Received request to create checkout session');
    console.log('📦 Request body:', req.body);

    const { planId, trainerId, traineeId, planDetails } = req.body;

    // التحقق من البيانات
    if (!planId || !trainerId || !traineeId || !planDetails) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!planDetails.price || planDetails.price <= 0) {
      console.error('❌ Invalid price');
      return res.status(400).json({ error: 'Invalid price' });
    }

    console.log('✅ Creating Stripe checkout session...');

    // إنشاء Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // أو 'egp'
            product_data: {
              name: planDetails.name || 'Training Plan',
              description: planDetails.description || '',
              images: planDetails.image ? [planDetails.image] : [],
            },
            unit_amount: Math.round(planDetails.price * 100), // Stripe يستخدم cents
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

    console.log('✅ Checkout session created:', session.id);
    console.log('🔗 Checkout URL:', session.url);

    res.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Verify Payment وحفظ البيانات في Firestore
app.post('/verify-payment', async (req, res) => {
  try {
    console.log('📥 Verifying payment...');
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    // جلب بيانات الـ Session من Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('📄 Session retrieved:', session.id, '- Status:', session.payment_status);

    // التحقق من أن الدفع تم بنجاح
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // استخراج البيانات من metadata
    const { planId, trainerId, traineeId, planName, duration, sessions } = session.metadata;

    // التحقق من عدم تكرار الحفظ
    const existingSubscription = await db.collection('subscriptions')
      .where('paymentId', '==', session.payment_intent)
      .get();

    if (!existingSubscription.empty) {
      console.log('⚠️ Subscription already exists');
      return res.json({ 
        success: true, 
        message: 'Subscription already exists',
        subscriptionId: existingSubscription.docs[0].id
      });
    }

    console.log('💾 Saving subscription to Firestore...');

    // حفظ بيانات الاشتراك في Firestore
    const subscriptionData = {
      planId,
      trainerId,
      traineeId,
      planName,
      duration,
      sessions,
      paymentId: session.payment_intent,
      amount: session.amount_total / 100,
      currency: session.currency,
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
      stripeSessionId: sessionId,
    };

    const subscriptionRef = await db.collection('subscriptions').add(subscriptionData);
    console.log('✅ Subscription saved:', subscriptionRef.id);

    // جلب بيانات المتدرب
    let traineeName = 'Unknown';
    let traineeEmail = '';
    try {
      const traineeDoc = await db.collection('users').doc(traineeId).get();
      if (traineeDoc.exists()) {
        const traineeData = traineeDoc.data();
        traineeName = `${traineeData.firstName || ''} ${traineeData.lastName || ''}`.trim();
        traineeEmail = traineeData.email || '';
      }
    } catch (e) {
      console.warn('Could not fetch trainee data:', e);
    }

    // تحديث بيانات المتدرب (إضافة الاشتراك)
    await db.collection('users').doc(traineeId).set({
      subscriptions: admin.firestore.FieldValue.arrayUnion({
        subscriptionId: subscriptionRef.id,
        planId,
        planName,
        trainerId,
        startDate: subscriptionData.startDate,
        status: 'active'
      })
    }, { merge: true });

    console.log('✅ Trainee data updated');

    // تحديث بيانات المدرب (إضافة المتدرب)
    await db.collection('users').doc(trainerId).set({
      trainees: admin.firestore.FieldValue.arrayUnion({
        traineeId,
        traineeName,
        traineeEmail,
        subscriptionId: subscriptionRef.id,
        planId,
        planName,
        subscribedAt: subscriptionData.startDate
      }),
      earnings: admin.firestore.FieldValue.increment(subscriptionData.amount),
      totalClients: admin.firestore.FieldValue.increment(1)
    }, { merge: true });

    console.log('✅ Trainer data updated');

    // إضافة notification للمدرب
    await db.collection('notifications').add({
      userId: trainerId,
      type: 'new_subscription',
      title: 'اشتراك جديد!',
      message: `${traineeName} اشترك في ${planName}`,
      subscriptionId: subscriptionRef.id,
      traineeId,
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Notification created');

    res.json({
      success: true,
      subscriptionId: subscriptionRef.id,
      message: 'تم الاشتراك بنجاح'
    });

  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Subscription Details
app.get('/subscription/:id', async (req, res) => {
  try {
    const subscriptionDoc = await db.collection('subscriptions').doc(req.params.id).get();
    
    if (!subscriptionDoc.exists) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({ id: subscriptionDoc.id, ...subscriptionDoc.data() });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all subscriptions (للـ Admin)
app.get('/subscriptions', async (req, res) => {
  try {
    const subscriptionsSnapshot = await db.collection('subscriptions')
      .orderBy('createdAt', 'desc')
      .get();

    const subscriptions = subscriptionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get trainer's subscriptions
app.get('/trainer/:trainerId/subscriptions', async (req, res) => {
  try {
    const { trainerId } = req.params;

    const subscriptionsSnapshot = await db.collection('subscriptions')
      .where('trainerId', '==', trainerId)
      .orderBy('createdAt', 'desc')
      .get();

    const subscriptions = subscriptionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching trainer subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get trainee's subscriptions
app.get('/trainee/:traineeId/subscriptions', async (req, res) => {
  try {
    const { traineeId } = req.params;

    const subscriptionsSnapshot = await db.collection('subscriptions')
      .where('traineeId', '==', traineeId)
      .orderBy('createdAt', 'desc')
      .get();

    const subscriptions = subscriptionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching trainee subscriptions:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Server is running!',
    endpoints: [
      'POST /create-checkout-session',
      'POST /verify-payment',
      'GET /subscriptions',
      'GET /trainer/:trainerId/subscriptions',
      'GET /trainee/:traineeId/subscriptions'
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 CORS enabled for: http://localhost:5173`);
  console.log(`🔗 Test: http://localhost:${PORT}`);
});