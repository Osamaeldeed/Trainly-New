<template>
  <div>
    <div v-if="showToast" class="toast flex justify-center items-center bg-white dark:bg-[#3B3B3B]">
      {{ toastMessage }}
    </div>
    <div
      :style="{ backgroundImage: `url(${bgImage})` }"
      class="bg-cover bg-no-repeat bg-[position-x:100%] w-full h-screen flex items-center justify-start pl-20 max-[768px]:pl-0 max-[768px]:justify-center"
    >
      <div
        class="w-[480px] max-w-[calc(100%-40px)] mx-0 rounded-[10px] bg-white dark:bg-[#3B3B3B]/80 p-3 flex items-start justify-center relative animate-slideUp"
      >
        <div
          class="w-[446px] h-[546px] bg-white dark:bg-[#3B3B3B] p-9 rounded-lg flex flex-col justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        >
          <h2 class="mb-5 text-[22px] text-black dark:text-white font-semibold">
            Welcome back To
            <span
              class="bg-gradient-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent"
            >
              Trainly
            </span>
          </h2>

          <form @submit.prevent="handleLogin" class="w-full">
            <!-- Email -->
            <label for="email" class="text-sm text-black dark:text-white block mt-2 mb-1"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter email"
              required
              class="w-full p-3 mb-2 border placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white border-gray-300 rounded-md shadow-[0_0_6px_rgba(0,0,0,0.1)]"
            />

            <!-- Password -->
            <div class="relative">
              <label for="password" class="text-sm block text-black dark:text-white mt-2 mb-1"
                >Password</label
              >
              <input
                :type="passwordFieldType"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
                class="w-full p-3 mb-2 placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white border border-gray-300 rounded-md shadow-[0_0_6px_rgba(0,0,0,0.1)]"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 translate-y-[10%] w-5 h-auto cursor-pointer bg-transparent border-0"
                @click="togglePasswordVisibility"
              >
                <img
                  :src="passwordVisible ? eyeOffIcon : eyeIcon"
                  alt="Show/Hide"
                  class="w-full h-auto"
                />
              </button>
            </div>

            <!-- Forgot Password -->
            <a
              href="/forgetpassword1"
              class="text-xs text-[#2d8fff] dark:text-[#6ab8ff] dark:hover:text-[#8ed0ff] transition-colors duration-300 hover:underline block text-right mb-4 cursor-pointer"
            >
              Forgot Password?
            </a>

            <!-- Login Button -->
            <button
              type="submit"
              class="w-full p-3 text-white text-lg rounded-md cursor-pointer mb-4 bg-gradient-to-r from-[#00C853] to-[#00b0ff] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
              <template v-if="!isLoading"> Log In </template>
              <template v-else>
                <svg
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Logging in...</span>
              </template>
            </button>

            <!-- Google Button -->
            <button
              type="button"
              @click="handleGoogleLogin"
              class="flex items-center dark:text-white dark:bg-[#555555] justify-center gap-2 border border-gray-300 p-2 cursor-pointer rounded-md bg-white w-full"
            >
              <img :src="googleLogo" alt="google" class="w-5 h-5" />
              Continue with Google
            </button>

            <!-- Sign Up Link -->
            <p class="text-left text-black dark:text-white text-sm mt-7">
              Don't have an account?
              <a href="/signup"
                class="text-[#2d8fff] hover:underline dark:text-[#6ab8ff] dark:hover:text-[#8ed0ff] transition-colors duration-300"
               >Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { auth, provider, db } from "../Firebase/firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  EmailAuthProvider,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import bgImage from "../assets/images/couple-training-together-gym.jpg";
import eyeIcon from "../assets/images/Eye.png";
import eyeOffIcon from "../assets/images/eye off.png";
import googleLogo from "../assets/images/g-logo.png";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const passwordVisible = ref(false);
    const isLoading = ref(false);
    const toastMessage = ref("");
    const showToast = ref(false);

    const showPopup = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    // ✅ Login with Email and Password
    const handleLogin = async () => {
      if (isLoading.value) return;
      isLoading.value = true;

      try {
        await signOut(auth).catch(() => {});

        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log("✅ Logged in with Email:", user);

        // Fetch user doc
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          showPopup("❌ No profile found for this account. Please sign up first.");
          await signOut(auth);
          isLoading.value = false;
          return;
        }

        const userData = userSnap.data();

        // ✅ تحقق من حالة الحساب
        if (userData.status === "pending") {
          showPopup("⚠️ Your account is under review. You will be notified when approved.");
          await signOut(auth);
          isLoading.value = false;
          return;
        }

        // ✅ تحقق من الدور (role)
        if (userData.role === "admin") {
          router.push("/admin/overview");
        } else if (userData.role === "trainer") {
          router.push("/trainer/home");
        } else {
          router.push("/traineehome");
        }
      } catch (error) {
        console.error("❌ Login error:", error.code, error.message);

        if (error.code === "auth/user-not-found") {
          showPopup("❌ No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          showPopup("⚠️ Incorrect password. Please try again.");
        } else if (error.code === "auth/account-exists-with-different-credential") {
          showPopup("⚠️ This email is linked with Google. Trying to link accounts...");
          try {
            const methods = await fetchSignInMethodsForEmail(auth, email.value);
            if (methods.includes("google.com")) {
              const googleResult = await signInWithPopup(auth, provider);
              const googleUser = googleResult.user;
              const credential = EmailAuthProvider.credential(email.value, password.value);
              await linkWithCredential(googleUser, credential);
              showPopup("✅ Accounts linked successfully!");
              const userDocRef = doc(db, "users", googleUser.uid);
              const userSnap = await getDoc(userDocRef);
              if (userSnap.exists()) {
                const userData = userSnap.data();
                if (userData.status === "pending") {
                  showPopup("⚠️ Your account is under review. You will be notified when approved.");
                  await signOut(auth);
                  return;
                }
                if (userData.role === "trainer") {
                  router.push("/trainer/home");
                } else {
                  router.push("/traineehome");
                }
              } else {
                showPopup("❌ Profile missing or pending after linking. Contact support.");
                await signOut(auth);
              }
            } else {
              showPopup("❌ This email is associated with another sign-in method.");
            }
          } catch (linkError) {
            console.error("❌ Linking error:", linkError);
            showPopup("❌ Failed to link accounts. Try signing in with Google.");
          }
        } else if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/invalid-login-credentials"
        ) {
          showPopup("❌ Wrong email or password.");
        } else {
          showPopup(`❌ ${error.message || "Login failed."}`);
        }
      } finally {
        isLoading.value = false;
      }
    };

    // ✅ Login with Google
    const handleGoogleLogin = async () => {
      if (isLoading.value) return;
      isLoading.value = true;

      try {
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ Logged in with Google:", user);

        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          showPopup("❌ No profile found for this Google account. Please sign up first.");
          await signOut(auth);
          isLoading.value = false;
          return;
        }

        const userData = userSnap.data();

        if (userData.status === "pending") {
          showPopup("⚠️ Your account is under review. You will be notified when approved.");
          await signOut(auth);
          isLoading.value = false;
          return;
        }

        // ✅ تحقق من الدور عند تسجيل الدخول بجوجل
        if (userData.role === "admin") {
          router.push("/admin/overview");
        } else if (userData.role === "trainer") {
          router.push("/trainer/home");
        } else {
          router.push("/traineehome");
        }
      } catch (error) {
        console.error("❌ Google login error:", error.code, error.message);
        if (error.code === "auth/popup-closed-by-user") {
          showPopup("⚠️ Popup closed before login completed.");
        } else if (error.code === "auth/credential-already-in-use") {
          showPopup("⚠️ This Google account is already linked.");
        } else {
          showPopup("❌ Google login failed.");
        }
      } finally {
        isLoading.value = false;
      }
    };

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const passwordFieldType = computed(() => (passwordVisible.value ? "text" : "password"));

    return {
      email,
      password,
      handleLogin,
      handleGoogleLogin,
      isLoading,
      passwordVisible,
      togglePasswordVisibility,
      passwordFieldType,
      showToast,
      toastMessage,
      bgImage,
      eyeIcon,
      eyeOffIcon,
      googleLogo,
    };
  },
};
</script>

<style scoped>
/* 🔔 Simple Toast Popup Style */
.toast {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: fadeInOut 2.5s ease-in-out forwards;
}

/* أنيميشن الظهور والاختفاء */
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
}
</style>
