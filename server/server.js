require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Configure email transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Helper function to send subscription email
async function sendSubscriptionEmail(subscriptionData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "osamaeldeeb728@gmail.com",
    subject: "🎉 New Subscription - Training Platform",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; margin-bottom: 20px;">🎉 New Subscription!</h1>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin-top: 0;">Trainer Information</h2>
            <p><strong>Name:</strong> ${subscriptionData.trainerName || "N/A"}</p>
            <p><strong>Email:</strong> ${subscriptionData.trainerEmail || "N/A"}</p>
            <p><strong>Trainer ID:</strong> ${subscriptionData.trainerUid}</p>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #15803d; margin-top: 0;">Subscription Details</h2>
            <p><strong>Plan Type:</strong> ${subscriptionData.planType}</p>
            <p><strong>Plan Limit:</strong> ${subscriptionData.planLimit} plans</p>
            <p><strong>Price:</strong> $${subscriptionData.price}/month</p>
            <p><strong>Status:</strong> <span style="color: #15803d; font-weight: bold;">ACTIVE</span></p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px;">
            <h2 style="color: #92400e; margin-top: 0;">Payment Information</h2>
            <p><strong>Stripe Session ID:</strong> ${subscriptionData.stripeSessionId || "N/A"}</p>
            <p><strong>Stripe Subscription ID:</strong> ${subscriptionData.stripeSubscriptionId || "N/A"}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280;">
            <p>This is an automated notification from your Training Platform</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Subscription email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

// Helper function to send new trainer registration email
async function sendNewTrainerEmail(trainerData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "osamaeldeeb728@gmail.com",
    subject: "👤 New Trainer Registration - Trainly",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; margin-bottom: 20px;">👤 New Trainer Registration</h1>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e40af; margin-top: 0;">Trainer Information</h2>
            <p><strong>Name:</strong> ${trainerData.trainerName}</p>
            <p><strong>Registration Date:</strong> ${trainerData.registrationDate}</p>
            <p><strong>Sport:</strong> ${trainerData.sport}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #92400e; font-weight: bold;">A new trainer has signed up on your Trainly platform!</p>
            <p style="margin: 10px 0 0 0; color: #92400e;">Please review their account to approve it</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280;">
            <p>This is an automated notification from Trainly</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ New trainer registration email sent successfully");
  } catch (error) {
    console.error("❌ Error sending trainer registration email:", error);
  }
}

/**
 * WEBHOOK - Must be BEFORE express.json()
 */
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET in env");
      return res.status(500).send("Webhook secret not configured");
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error("⚠️  Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      // Handle plan booking checkout completed
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("🔔 checkout.session.completed:", session.id);

        const { purpose } = session.metadata || {};

        // Check if this is a subscription checkout
        if (purpose === "trainer_subscription") {
          console.log("📝 Processing subscription checkout...");

          const { trainerUid, planType, planLimit } = session.metadata;
          const stripeSubscriptionId = session.subscription;

          // Check if subscription already exists
          const existing = await db
            .collection("subscriptions")
            .where("stripeSessionId", "==", session.id)
            .limit(1)
            .get();

          if (!existing.empty) {
            console.log(
              "⚠️ Subscription for this session already exists:",
              session.id
            );
            return res.json({ received: true });
          }

          // Get trainer details
          let trainerData = {};
          try {
            const trainerDoc = await db
              .collection("users")
              .doc(trainerUid)
              .get();
            if (trainerDoc.exists) {
              trainerData = trainerDoc.data();
            }
          } catch (e) {
            console.warn("Could not fetch trainer data:", e);
          }

          // Create subscription document
          const subscriptionData = {
            trainerUid: trainerUid || null,
            trainerEmail: trainerData.email || session.customer_email || null,
            trainerName:
              `${trainerData.firstName || ""} ${
                trainerData.lastName || ""
              }`.trim() || "Unknown",
            planType: planType || "Unknown",
            planLimit: parseInt(planLimit) || 0,
            price: (session.amount_total || 0) / 100,
            currency: session.currency || "usd",
            status: "active",
            stripeSessionId: session.id,
            stripeSubscriptionId: stripeSubscriptionId || null,
            stripeCustomerId: session.customer || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          };

          const subscriptionRef = await db
            .collection("subscriptions")
            .add(subscriptionData);
          console.log("✅ Subscription saved:", subscriptionRef.id);

          // Update trainer's subscription status in users collection
          if (trainerUid) {
            try {
              await db
                .collection("users")
                .doc(trainerUid)
                .set(
                  {
                    subscription: {
                      active: true,
                      planType: planType,
                      planLimit: parseInt(planLimit),
                      subscriptionId: subscriptionRef.id,
                      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    },
                  },
                  { merge: true }
                );
              console.log("✅ Trainer subscription status updated");
            } catch (e) {
              console.warn("Could not update trainer subscription status:", e);
            }
          }

          // Send email notification
          await sendSubscriptionEmail({
            ...subscriptionData,
            subscriptionId: subscriptionRef.id,
          });

          // Create notification for trainer
          try {
            await db.collection("notifications").add({
              userId: trainerUid,
              type: "subscription_activated",
              title: "Subscription Activated",
              message: `Your ${planType} subscription is now active! You can now create up to ${planLimit} plans.`,
              subscriptionId: subscriptionRef.id,
              read: false,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
          } catch (e) {
            console.warn("Could not create notification:", e);
          }
        } else {
          // Handle regular plan booking
          const { planId, trainerId, traineeId, planName } =
            session.metadata || {};

          const existingBooking = await db
            .collection("bookings")
            .where("stripeSessionId", "==", session.id)
            .limit(1)
            .get();

          if (!existingBooking.empty) {
            console.log(
              "⚠️ Booking for this session already exists:",
              session.id
            );
            return res.json({ received: true });
          }

          const planDoc = planId
            ? await db.collection("plans").doc(planId).get()
            : null;
          const planData =
            planDoc && planDoc.exists
              ? planDoc.data()
              : { id: planId, name: planName || "Plan" };

          const trainerDoc = trainerId
            ? await db.collection("users").doc(trainerId).get()
            : null;
          const trainerData =
            trainerDoc && trainerDoc.exists
              ? trainerDoc.data()
              : { id: trainerId };

          const traineeDoc = traineeId
            ? await db.collection("users").doc(traineeId).get()
            : null;
          const traineeData =
            traineeDoc && traineeDoc.exists
              ? traineeDoc.data()
              : { id: traineeId };

          const booking = {
            planId: planId || null,
            plan: planData,
            trainerId: trainerId || null,
            trainer: trainerData,
            traineeId: traineeId || null,
            trainee: traineeData,
            amount: (session.amount_total || 0) / 100,
            currency: session.currency || "usd",
            status: "paid",
            stripeSessionId: session.id,
            paymentIntent: session.payment_intent || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          };

          const bookingRef = await db.collection("bookings").add(booking);
          console.log("✅ Booking saved:", bookingRef.id);

          if (traineeId) {
            try {
              await db
                .collection("users")
                .doc(traineeId)
                .set(
                  {
                    bookings: admin.firestore.FieldValue.arrayUnion({
                      bookingId: bookingRef.id,
                      planId: booking.planId,
                      trainerId: booking.trainerId,
                      amount: booking.amount,
                      createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    }),
                  },
                  { merge: true }
                );
            } catch (e) {
              console.warn("Could not update trainee bookings:", e);
            }
          }

          if (trainerId) {
            try {
              await db
                .collection("users")
                .doc(trainerId)
                .set(
                  {
                    trainees: admin.firestore.FieldValue.arrayUnion({
                      traineeId: traineeId,
                      bookingId: bookingRef.id,
                      planId: booking.planId,
                      createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    }),
                    earnings: admin.firestore.FieldValue.increment(
                      booking.amount
                    ),
                    totalClients: admin.firestore.FieldValue.increment(1),
                  },
                  { merge: true }
                );
            } catch (e) {
              console.warn("Could not update trainer data:", e);
            }
          }

          // Create notification for trainer
          try {
            await db.collection("notifications").add({
              userId: trainerId || null,
              type: "new_booking",
              title: "Congratulations! New Booking",
              message: `${traineeData.firstName || "User"} booked your plan ${
                planData.name || planName || ""
              }`,
              bookingId: bookingRef.id,
              read: false,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
          } catch (e) {
            console.warn("Could not create notification:", e);
          }

          // 🆕 Send AI welcome message if available
          try {
            const planDocFresh = await db.collection("plans").doc(planId).get();
            if (planDocFresh.exists) {
              const freshPlanData = planDocFresh.data();
              if (freshPlanData.aiWelcomeMessage) {
                console.log("📨 Attempting to send AI welcome message...");
                
                // Call internal endpoint to send welcome message
                const fetch = (await import('node-fetch')).default;
                await fetch(`http://localhost:${process.env.PORT || 3000}/send-welcome-message`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    trainerId: trainerId,
                    traineeId: traineeId,
                    welcomeMessage: freshPlanData.aiWelcomeMessage
                  })
                }).catch(err => console.warn('Failed to send welcome message:', err));
                
                console.log('✅ AI Welcome message queued for trainee');
              }
            }
          } catch (e) {
            console.warn('Could not send welcome message:', e);
          }
        }
      }

      // Handle subscription updates/cancellations
      if (
        event.type === "customer.subscription.updated" ||
        event.type === "customer.subscription.deleted"
      ) {
        const subscription = event.data.object;
        console.log(`🔔 ${event.type}:`, subscription.id);

        const subscriptionQuery = await db
          .collection("subscriptions")
          .where("stripeSubscriptionId", "==", subscription.id)
          .limit(1)
          .get();

        if (!subscriptionQuery.empty) {
          const subscriptionDoc = subscriptionQuery.docs[0];
          const newStatus =
            subscription.status === "canceled"
              ? "canceled"
              : subscription.status;

          await subscriptionDoc.ref.update({
            status: newStatus,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          const subscriptionData = subscriptionDoc.data();
          if (subscriptionData.trainerUid) {
            await db
              .collection("users")
              .doc(subscriptionData.trainerUid)
              .set(
                {
                  subscription: {
                    active: newStatus === "active",
                    status: newStatus,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                  },
                },
                { merge: true }
              );
          }

          console.log(
            `✅ Subscription ${subscription.id} updated to ${newStatus}`
          );
        }
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Error handling webhook event:", err);
      res.status(500).send("Webhook handler error");
    }
  }
);

// After webhook route we can parse JSON
app.use(express.json());

/**
 * 🆕 Generate AI Welcome Message for Training Plan
 */
app.post('/generate-welcome-message', async (req, res) => {
  console.log('🔔 /generate-welcome-message called');
  console.log('📥 body preview:', JSON.stringify(req.body).slice(0,1000));

  const { planTitle, weeks, trainerName, trainerPhone, location } = req.body || {};

  if (!planTitle || !weeks || !Array.isArray(weeks) || weeks.length === 0) {
    console.warn('❗ Missing required fields in request');
    return res.status(400).json({ error: 'Missing required fields: planTitle and weeks required' });
  }

  // build schedule text
  let scheduleText = '';
  weeks.forEach((week, index) => {
    scheduleText += `\n\nWeek ${index + 1}:\n`;
    scheduleText += `Sessions: ${week.sessions || 'N/A'}\n`;
    scheduleText += `Exercises: ${week.exercises || 'N/A'}\n`;
    if (week.notes) scheduleText += `Notes: ${week.notes}\n`;
  });

  const prompt = `
You are a professional fitness trainer assistant. Generate a warm, professional welcome message for a new trainee who just subscribed to a training plan.

Plan Details:
- Plan Name: ${planTitle}
- Duration: ${weeks.length} weeks
- Trainer: ${trainerName || 'Your Trainer'}

Training Schedule:
${scheduleText}

Additional Information:
${trainerPhone ? `- Trainer Phone: ${trainerPhone}` : ''}
${location ? `- Location: ${location}` : ''}

Requirements:
1. Start with a warm welcome greeting
2. Congratulate them on starting their fitness journey
3. Present the training schedule in a clear, organized format (week by week)
4. Include the trainer's contact information at the end
5. Keep the tone motivating and professional
6. Write in clear, simple English
7. Use proper formatting with line breaks for readability
8. Make it around 200-300 words

Generate the welcome message now:
`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured on server');
    }

    let messageText = null;

    try {
      // try multiple call patterns to be resilient against SDK differences
      const model = genAI.getGenerativeModel ? genAI.getGenerativeModel({ model: 'gemini-pro' }) : genAI;
      
      if (model.generateContent) {
        // original approach
        const result = await model.generateContent(prompt);
        const response = result?.response || result;
        // response.text might be function or property
        if (response) {
          if (typeof response.text === 'function') messageText = response.text();
          else if (response.text) messageText = response.text;
        }
        if (!messageText && result?.outputText) messageText = result.outputText;
      } else if (model.generate) {
        // alternate pattern
        const result = await model.generate({ prompt });
        messageText = result?.outputText || result?.candidates?.[0]?.content || null;
      } else if (typeof genAI.generate === 'function') {
        const result = await genAI.generate(prompt);
        messageText = result?.text || result?.outputText || null;
      } else {
        console.warn('⚠️ Unknown Gemini SDK shape, will fallback');
      }
    } catch (genErr) {
      console.error('❌ Gemini call failed:', genErr && genErr.stack ? genErr.stack : genErr);
    }

    // Fallback if no AI response
    if (!messageText) {
      console.warn('⚠️ No AI message received — using fallback generated message');
      // small friendly fallback that includes schedule summary
      messageText = `Welcome to ${planTitle}!\n\nCongratulations on starting your ${weeks.length}-week program. Here's a quick overview:\n${scheduleText}\n\nIf you need any help, reply here or contact your trainer${trainerPhone ? ` at ${trainerPhone}` : ''}. Good luck — let's get started!`;
    }

    console.log('✅ Returning generated message (preview):', messageText.slice(0,200));
    return res.json({ success: true, message: messageText });
  } catch (error) {
    console.error('❌ Error generating AI message:', error && error.stack ? error.stack : error);
    // return helpful debug info in development
    return res.status(500).json({
      error: error.message || 'Server error generating message',
      hint: 'Check server logs for full stack',
    });
  }
});


/**
 * 🆕 Send Welcome Message to Trainee after booking
 */
app.post('/send-welcome-message', async (req, res) => {
  try {
    const { trainerId, traineeId, welcomeMessage } = req.body;

    if (!trainerId || !traineeId || !welcomeMessage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get trainer and trainee info
    const trainerDoc = await db.collection('users').doc(trainerId).get();
    const traineeDoc = await db.collection('users').doc(traineeId).get();

    if (!trainerDoc.exists || !traineeDoc.exists) {
      return res.status(404).json({ error: 'Trainer or trainee not found' });
    }

    const trainerData = trainerDoc.data();
    const traineeData = traineeDoc.data();

    // Find or create conversation
    const conversationsRef = db.collection('conversations');
    const participants = [trainerId, traineeId].sort();
    
    let conversationId = null;
    const existingConvQuery = await conversationsRef
      .where('participants', '==', participants)
      .limit(1)
      .get();

    if (!existingConvQuery.empty) {
      conversationId = existingConvQuery.docs[0].id;
    } else {
      // Create new conversation
      const newConvRef = await conversationsRef.add({
        participants: participants,
        traineeInfo: {
          id: traineeId,
          name: `${traineeData.firstName || ''} ${traineeData.lastName || ''}`.trim() || 'Trainee',
          avatar: traineeData.profilePicture || traineeData.avatar || null
        },
        trainerInfo: {
          id: trainerId,
          name: `${trainerData.firstName || ''} ${trainerData.lastName || ''}`.trim() || 'Trainer',
          avatar: trainerData.profilePicture || trainerData.avatar || null
        },
        lastMessage: '',
        lastMessageTime: admin.firestore.FieldValue.serverTimestamp(),
        unreadCount: {
          [trainerId]: 0,
          [traineeId]: 0
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      conversationId = newConvRef.id;
    }

    // Send welcome message in conversation
    const messagesRef = db.collection('conversations').doc(conversationId).collection('messages');
    await messagesRef.add({
      senderId: trainerId,
      text: welcomeMessage,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      read: false,
      isWelcomeMessage: true
    });

    // Update conversation's lastMessage
    await conversationsRef.doc(conversationId).update({
      lastMessage: welcomeMessage.substring(0, 100) + '...',
      lastMessageTime: admin.firestore.FieldValue.serverTimestamp(),
      [`unreadCount.${traineeId}`]: admin.firestore.FieldValue.increment(1)
    });

    console.log('✅ Welcome message sent successfully');
    res.json({ success: true, conversationId });

  } catch (error) {
    console.error('❌ Error sending welcome message:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Send New Trainer Registration Email
 */
app.post("/send-trainer-registration-email", async (req, res) => {
  try {
    const { trainerName, sport, registrationDate } = req.body;

    if (!trainerName || !sport || !registrationDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendNewTrainerEmail({
      trainerName,
      sport,
      registrationDate,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending trainer registration email:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create Subscription Checkout Session
 */
app.post("/create-subscription-checkout", async (req, res) => {
  try {
    console.log("📥 Creating subscription checkout session");
    const {
      trainerUid,
      trainerEmail,
      trainerName,
      planType,
      planLimit,
      price,
      metadata,
      success_url,
      cancel_url,
    } = req.body;

    if (!trainerUid || !planType || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planType} Subscription`,
              description: `Up to ${planLimit} training plans per month`,
            },
            unit_amount: Math.round(price * 100),
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url:
        success_url ||
        `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `http://localhost:5173/canceled`,
      customer_email: trainerEmail || undefined,
      metadata: {
        purpose: "trainer_subscription",
        trainerUid,
        planType: planType || "",
        planLimit: (planLimit || 0).toString(),
        ...metadata,
      },
    });

    console.log("✅ Subscription checkout session created:", session.id);
    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Error creating subscription checkout:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create Regular Plan Checkout Session
 */
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("📥 Received request to create checkout session");
    const { planId, trainerId, traineeId, planDetails } = req.body;

    if (!planId || !trainerId || !traineeId || !planDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!planDetails.price || planDetails.price <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planDetails.name || "Training Plan",
              description: planDetails.description || "",
              images: planDetails.image ? [planDetails.image] : [],
            },
            unit_amount: Math.round(planDetails.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/failed`,
      metadata: {
        purpose: "plan_booking",
        planId,
        trainerId,
        traineeId,
        planName: planDetails.name || "",
        duration: planDetails.duration || "",
        sessions: planDetails.sessions || "",
      },
    });

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify Payment
 */
app.post("/verify-payment", async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId)
      return res.status(400).json({ error: "Session ID required" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const existing = await db
      .collection("bookings")
      .where("stripeSessionId", "==", sessionId)
      .limit(1)
      .get();

    if (!existing.empty) {
      const doc = existing.docs[0];
      return res.json({
        success: true,
        bookingId: doc.id,
        booking: doc.data(),
      });
    }

    return res.json({
      success: true,
      message:
        "Payment completed but booking not found yet. Webhook will create it.",
    });
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get All Subscriptions
 */
app.get("/subscriptions", async (req, res) => {
  try {
    const snapshot = await db
      .collection("subscriptions")
      .orderBy("createdAt", "desc")
      .get();
    const subscriptions = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Trainer's Subscription
 */
app.get("/trainer/:trainerId/subscription", async (req, res) => {
  try {
    const { trainerId } = req.params;
    const snapshot = await db
      .collection("subscriptions")
      .where("trainerUid", "==", trainerId)
      .where("status", "==", "active")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ subscription: null });
    }

    const subscription = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };
    res.json({ subscription });
  } catch (error) {
    console.error("Error fetching trainer subscription:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Root endpoint
 */
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Server is running!",
    endpoints: [
      "POST /generate-welcome-message",
      "POST /send-welcome-message",
      "POST /send-trainer-registration-email",
      "POST /create-subscription-checkout",
      "POST /create-checkout-session",
      "POST /verify-payment",
      "POST /webhook",
      "GET /subscriptions",
      "GET /trainer/:trainerId/subscription",
    ],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email notifications configured for: osamaeldeeb728@gmail.com`);
  console.log(`🤖 AI features enabled with Gemini API`);
});