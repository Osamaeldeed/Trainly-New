const savedLocale = localStorage.getItem("lang") || "en";
document.documentElement.lang = savedLocale;
document.dir = savedLocale === "ar" ? "rtl" : "ltr";

// ----------------------------
// ✅ الاستيرادات الأساسية
// ----------------------------
import { createApp } from "vue";
import App from "./App.vue";
import "./Firebase/firebaseConfig.js";
import { createRouter, createWebHistory } from "vue-router";
import i18n from "./i18n";
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "../src/style.css";

// ----------------------------
// ✅ استيراد صفحات الموقع
// ----------------------------
import LandingPage from "./pages/LandingPage.vue";
import PaymentPage from "./pages/PaymentPage.vue";
import FailedPage from "./pages/FailedPage.vue";
import ErrorPage from "./pages/ErrorPage.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ForgetPassword1 from "./pages/ForgetPassword1.vue";
import ForgetPassword2 from "./pages/ForgetPassword2.vue";
import ResetPassword2 from "./pages/ResetPassword2.vue";
import Signup from "./pages/SignUp.vue";
import LoginPage from "./pages/LoginPage.vue";
import AboutUs from "./pages/AboutUs.vue";
import SportS from "./pages/SportS.vue";
import ContactUs from "./pages/ContactUs.vue";
import TrainerClient from "./pages/trainer/TrainerClient.vue";
import TrainerReviews from "./pages/trainer/TrainerReviews.vue";
import TrainerDashboardLayout from "./pages/trainer/TrainerDashboardLayout.vue";
import SearchPage from "./pages/SearchPage.vue";
import TrainerPlans from "./pages/trainer/TrainerPlans.vue";
import TrainerHome from "./pages/trainer/TrainerHome.vue";
import HomePage from "./pages/HomePage.vue";
import TrainerSettings from "./pages/trainer/TrainerSettings.vue";
import TraineeDashboardLayout from "./pages/trainee/TraineeDashboardLayout.vue";
import TraineeDashboard from "./pages/trainee/TraineeDashboard.vue";
import TraineeSettings from "./pages/trainee/TraineeSettings.vue";
import TraineeCustomerservice from "./pages/trainee/TraineeCustomerservice.vue";
import TrainerCustomerservice from "./pages/trainer/TrainerCustomerservice.vue";
import AboutUstrainee from "./pages/NavpagesforTrainee/AboutUstrainee.vue";
import ContactUstrainee from "./pages/NavpagesforTrainee/ContactUstrainee.vue";
import SportStrainee from "./pages/NavpagesforTrainee/SportsPagetrainee.vue";
import TrainerProfile from "./pages/TrainerProfile.vue";
import TrainerViewHisProfile from "./pages/TrainerViewHisProfile.vue";
import TrainerInbox from "./pages/trainer/TrainerInbox.vue";
import TraineeInbox from "./pages/trainee/TraineeInbox.vue";
import MyTrainers from "./pages/trainee/MyTrainers.vue";

// ----------------------------
// ✅ صفحات الأدمن
// ----------------------------
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout.vue";
import AdminOverview from "./pages/admin/AdminOverview.vue";
import ManageTrainers from "./pages/admin/ManageTrainers.vue";
import ManageTrainees from "./pages/admin/ManageTrainees.vue";
import AdminReviews from "./pages/admin/AdminReviews.vue";
import AdminBookings from "./pages/admin/AdminBookings.vue";
import AdminPayments from "./pages/admin/AdminPayments.vue";

// ----------------------------
// ✅ إعداد المسارات (Routes)
// ----------------------------
const routes = [
  { path: "/", name: "landing", component: LandingPage },
  { path: "/success", name: "payment", component: PaymentPage },
  { path: "/failed", name: "failed", component: FailedPage },
  { path: "/resetpassword", name: "resetpassword", component: ResetPassword },
  { path: "/resetpassword2", name: "resetpassword2", component: ResetPassword2 },
  { path: "/forgetpassword1", name: "forgetpassword1", component: ForgetPassword1 },
  { path: "/forgetpassword2", name: "forgetpassword2", component: ForgetPassword2 },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/aboutus", name: "aboutus", component: AboutUs },
  { path: "/sports", name: "sports", component: SportS },
  { path: "/contactus", name: "contactus", component: ContactUs },
  { path: "/viewtrainerprofile", name: "profile", component: TrainerProfile },
  { path: "/searchresults", name: "search", component: SearchPage },
  { path: "/traineehome", name: "traineehome", component: HomePage },
  { path: "/aboutustrainee", name: "aboutustrainee", component: AboutUstrainee },
  { path: "/contactustrainee", name: "contactustrainee", component: ContactUstrainee },
  { path: "/sportstrainee", name: "sportstrainee", component: SportStrainee },
  { path: "/myprofile", name: "trainerviewprofile", component: TrainerViewHisProfile },

  {
    path: "/trainer",
    name: "trainer",
    component: TrainerDashboardLayout,
    children: [
      { path: "home", name: "trainerhome", component: TrainerHome },
      { path: "plans", name: "trainerplans", component: TrainerPlans },
      { path: "reviews", name: "trainerreviews", component: TrainerReviews },
      { path: "clients", name: "trainerclient", component: TrainerClient },
      {
        path: "customerservice",
        name: "trainercustomerservice",
        component: TrainerCustomerservice,
      },
      { path: "settings", name: "trainersettings", component: TrainerSettings },
      { path: "inbox", name: "trainerinbox", component: TrainerInbox },

    ],
  },
  {
    path: "/trainee",
    name: "trainee",
    component: TraineeDashboardLayout,
    children: [
      { path: "dashboard", name: "traineedashboard", component: TraineeDashboard },
      {path:"mytrainers", name:"mytrainers", component:MyTrainers},
      { path: "settings", name: "traineesettings", component: TraineeSettings },
      {
        path: "customerservice",
        name: "traineecustomerservice",
        component: TraineeCustomerservice,
      },
      { path: "inbox", name: "traineeinbox", component: TraineeInbox },
      {
        path: 'trainer', 
        name: 'TrainerProfile',
        component: TrainerProfile,
      }
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboardLayout,
    children: [
      { path: "overview", name: "adminoverview", component: AdminOverview },
      { path: "managetrainers", name: "managetrainers", component: ManageTrainers },
      { path: "managetrainees", name: "managetrainees", component: ManageTrainees },
      { path: "reviews", name: "adminreviews", component: AdminReviews },
      { path: "bookings", name: "adminbookings", component: AdminBookings },
      { path: "payments", name: "adminpayments", component: AdminPayments },
      {
        path: "trainer",
        name: "admintrainerprofile",
        component: TrainerProfile,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "error", component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ----------------------------
// ✅ Navigation Guards
// ----------------------------
import { auth, db } from "./Firebase/firebaseConfig.js";
import { getDoc, doc } from "firebase/firestore";

const publicPages = [
  "/",
  "/login",
  "/signup",
  "/aboutus",
  "/contactus",
  "/sports",
  "/success",
  "/failed",
  "/resetpassword",
  "/resetpassword2",
  "/forgetpassword1",
  "/forgetpassword2",
  "/:pathMatch(.*)*",

];
const traineePages = [
  "/traineehome",
  "/searchresults",
  "/viewtrainerprofile",
  "/aboutustrainee",
  "/contactustrainee",
  "/sportstrainee",
  "/trainee/dashboard",
  "/trainee/settings",
  "/trainee/customerservice",
  "/trainee/trainer"
];
const trainerPages = [
  "/trainer/home",
  "/trainer/plans",
  "/trainer/reviews",
  "/trainer/clients",
  "/trainer/customerservice",
  "/trainer/settings",
  "/myprofile",
  
];
const adminPages = [
  "/admin/overview",
  "/admin/managetrainers",
  "/admin/managetrainees",
  "/admin/reviews",
  "/admin/bookings",
  "/admin/payments",
  "/myprofile",
  "/admin/trainer"
];

// ✅ Helper function: انتظار تحميل حالة المستخدم من Firebase
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  // لو الصفحة عامة → ادخل عادي
  if (publicPages.includes(to.path)) return next();

  // ✅ انتظر Firebase يخلص تحميل حالة المستخدم
  const user = await getCurrentUser();

  // لو مش عامل تسجيل دخول → يروح login
  if (!user) return next("/login");

  try {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const role = snap.exists() ? snap.data().role : null;

    // حماية صفحات الأدمن
    if (adminPages.includes(to.path)) {
      if (role === "admin") return next();
      return next("/error");
    }

    // لو trainer حاول يدخل صفحة trainee
    if (role === "trainer" && traineePages.includes(to.path)) {
      return next("/error");
    }

    // لو trainee حاول يدخل صفحة trainer
    if (role === "trainee" && trainerPages.includes(to.path)) {
      return next("/error");
    }

    // لو admin حاول يدخل صفحات user
    if (role === "admin" && [...trainerPages, ...traineePages].includes(to.path)) {
      return next("/error");
    }

    return next();
  } catch (e) {
    console.error("Error checking user role:", e);
    return next("/error");
  }
});

// ----------------------------
// ✅ متابعة حالة المستخدم
// ----------------------------
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("🔐 المستخدم مسجل الدخول:", user.email);
  } else {
    console.log("🚪 لا يوجد مستخدم مسجل حاليًا");
  }
});

// ----------------------------
// ✅ إنشاء التطبيق وربطه بكل شيء
// ----------------------------
createApp(App)
  .use(router)
  .use(i18n)
  .use(Toast, {
    position: "top-center",
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "auto",
  })
  .mount("#app");

// ✅ إخفاء loading بعد ما كل حاجة تتحمل (including CSS)
router.isReady().then(() => {
  // نستنى شوية عشان ال CSS و ال components تخلص render
  requestAnimationFrame(() => {
    setTimeout(() => {
      const appElement = document.getElementById("app");
      const loader = document.querySelector(".app-loading");

      if (appElement) appElement.classList.add("loaded");
      if (loader) {
        loader.classList.add("loaded");
        setTimeout(() => loader.remove(), 300);
      }
    }, 50);
  });
});
