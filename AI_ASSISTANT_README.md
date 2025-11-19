# AI Assistant Feature - Trainly

## نظرة عامة (Overview)

تم إضافة ميزة AI Assistant للمتدربين في مشروع Trainly. المساعد الذكي يظهر كزر طافي دائري في جميع صفحات المتدرب، ويوفر:

1. إجابات عن أسئلة تدريبية وتغذية (نصائح، تمارين، وصفات غذائية صحية)
2. اقتراح مدربين من قاعدة البيانات بناءً على متطلبات المستخدم (رياضة، مدينة، سعر أقصى، مستوى تقييم)
3. استخدام Gemini API من السيرفر فقط (لا استدعاءات من المتصفح)

## الملفات المضافة/المعدلة

### Frontend (Vue)

1. **`Trainly/src/components/AiAssistantButton.vue`**
   - زر دائري طافي يظهر فقط للمتدربين
   - يتحقق من `role === 'trainee'` قبل العرض
   - يفتح/يغلق واجهة الدردشة

2. **`Trainly/src/components/AiChatWidget.vue`**
   - واجهة دردشة كاملة مع AI
   - رسائل متبادلة (user/assistant)
   - زر "اقترح مدربين" للبحث السريع
   - كشف تلقائي لطلبات البحث عن المدربين
   - معالجة أخطاء وحالات تحميل

3. **`Trainly/src/config/api.js`**
   - ملف تكوين لـ API URL
   - يستخدم `VITE_API_URL` من متغيرات البيئة أو `http://localhost:3000` كافتراضي

4. **`Trainly/src/App.vue`**
   - تم إضافة `AiAssistantButton` في التطبيق الرئيسي

### Backend (Node.js/Express)

1. **`server/server.js`**
   - **POST `/api/ai/chat`**: استقبال رسائل المستخدم وإرسالها إلى Gemini API
     - التحقق من أن المستخدم trainee
     - استخدام System Prompt مناسب
     - حفظ المحادثة في Firestore (اختياري)
   
   - **POST `/api/ai/recommend-trainers`**: البحث عن مدربين وفلترتهم
     - فلترة حسب: الرياضة، المدينة، السعر الأقصى
     - حساب التقييم المتوسط من reviews
     - حساب matchScore (0-100)
     - ترتيب حسب التقييم ثم matchScore
     - إرجاع أعلى 5 نتائج (أو حسب limit)

## API Endpoints

### POST `/api/ai/chat`

**Request:**
```json
{
  "userId": "string",
  "message": "string",
  "conversationId": "string (optional)"
}
```

**Response:**
```json
{
  "conversationId": "string",
  "reply": "string"
}
```

### POST `/api/ai/recommend-trainers`

**Request:**
```json
{
  "userId": "string",
  "filters": {
    "sport": "string (optional)",
    "city": "string (optional)",
    "maxPrice": "number (optional)"
  },
  "limit": "number (optional, default: 5)"
}
```

**Response:**
```json
{
  "trainers": [
    {
      "id": "t123",
      "name": "Ahmed Ali",
      "city": "Cairo",
      "sports": ["Tennis"],
      "plans": [
        {
          "planId": "p1",
          "title": "Beginner Tennis",
          "price": 900
        }
      ],
      "averageRating": 4.9,
      "matchScore": 95
    }
  ]
}
```

## System Prompt

المساعد الذكي يستخدم System Prompt باللغة العربية والإنجليزية:

```
You are Trainly AI Assistant. Behave like a friendly, helpful fitness & nutrition coach.

Rules:
1. Provide general fitness and nutrition advice, meal suggestions, and simple exercise explanations. 
   Do NOT provide medical diagnoses — if user asks for medical advice, respond: 
   "أنا لست طبيب، لو عندك مشكلة صحية لازم تستشير متخصص."

2. When the user asks to "find a trainer" or gives requirements (sport, city, max price), 
   reply with a short natural-language summary PLUS a JSON block with an array "trainers"...

3. Keep replies concise (max 6 short paragraphs) and include actionable tips.

4. If asked for meal suggestions, ask about allergies/preferences and caloric goal.

5. When suggesting trainers, prioritize by averageRating (desc), then by matchScore.

6. Respond in Arabic when the user writes in Arabic, and in English when the user writes in English.
```

## متطلبات التشغيل (Requirements)

1. **Environment Variables**:
   - `GEMINI_API_KEY`: يجب أن يكون موجودًا في `.env` على السيرفر

2. **Dependencies** (موجودة بالفعل):
   - `@google/generative-ai`: لاستدعاء Gemini API
   - `firebase-admin`: للوصول إلى Firestore
   - `express`: للسيرفر

3. **Firestore Collections**:
   - `users`: لتخزين بيانات المستخدمين (role: "trainee" أو "trainer")
   - `reviews`: لتخزين تقييمات المدربين
   - `plans`: لتخزين خطط التدريب
   - `ai_conversations`: لتخزين محادثات AI (اختياري)

## كيفية الاستخدام (Usage)

1. **للمتدربين**:
   - سجل الدخول بحساب trainee
   - سيظهر زر "AI Assistant" دائري في أسفل يمين الشاشة
   - اضغط على الزر لفتح الشات
   - اكتب أسئلة عن التغذية أو التمارين
   - أو اكتب "عايز مدرب تنس من القاهرة أقل من 1000" للبحث عن المدربين

2. **للمدربين/Admins**:
   - لن يظهر الزر (لأنه يظهر فقط للمتدربين)

## اختبارات يدوية (Manual Testing)

### Test Case 1: سؤال عن التغذية
```
رسالة: "إزاي أزود كتلة العضلات؟ عندي 70 كجم"
النتيجة المتوقعة: نصائح تمارين + تغذية
```

### Test Case 2: البحث عن مدربين
```
رسالة: "عايز مدرب تنس من القاهرة أقل من 1000"
النتيجة المتوقعة: قائمة مدربين مرتبة حسب التقييم
```

### Test Case 3: التحقق من الصلاحيات
```
1. سجل الدخول كـ trainer → لا يظهر الزر
2. سجل الدخول كـ admin → لا يظهر الزر
3. سجل الدخول كـ trainee → يظهر الزر
```

## ملاحظات مهمة (Important Notes)

1. **الأمان**: 
   - جميع استدعاءات Gemini تتم من السيرفر فقط
   - `GEMINI_API_KEY` لا يُكشف في الـ frontend
   - التحقق من role يتم في السيرفر

2. **الأداء**:
   - المحادثات تُخزن في Firestore (يمكن تحسينها لاستخدام context في المستقبل)
   - نتائج البحث عن المدربين محدودة بـ 5 نتائج (قابل للتعديل)

3. **التوسع المستقبلي**:
   - يمكن إضافة context للمحادثات (تذكر المحادثات السابقة)
   - يمكن تحسين استخراج filters من النص باستخدام Gemini
   - يمكن إضافة ميزات أخرى مثل اقتراح تمارين مخصصة

## استكشاف الأخطاء (Troubleshooting)

1. **الزر لا يظهر**:
   - تأكد من أن المستخدم logged in و role === "trainee"
   - تحقق من console للأخطاء

2. **لا توجد استجابة من AI**:
   - تحقق من `GEMINI_API_KEY` في `.env`
   - تحقق من logs السيرفر
   - تأكد من أن السيرفر يعمل على port 3000 (أو PORT المحدد)

3. **خطأ في البحث عن المدربين**:
   - تحقق من Firestore collections (users, reviews, plans)
   - تحقق من أن المدربين لديهم reviews/plans

## مثال JSON Response لـ recommend-trainers

```json
{
  "trainers": [
    {
      "id": "t123",
      "name": "Ahmed Ali",
      "city": "Cairo",
      "sports": ["Tennis"],
      "plans": [
        {
          "planId": "p1",
          "title": "Beginner Tennis Plan",
          "price": 900
        }
      ],
      "averageRating": 4.9,
      "matchScore": 95
    },
    {
      "id": "t456",
      "name": "Sara Mohamed",
      "city": "Cairo",
      "sports": ["Tennis", "Padel"],
      "plans": [
        {
          "planId": "p2",
          "title": "Advanced Tennis",
          "price": 1200
        }
      ],
      "averageRating": 4.7,
      "matchScore": 88
    }
  ]
}
```

---

**تم التنفيذ بواسطة Cursor AI**
**التاريخ: 2024**

