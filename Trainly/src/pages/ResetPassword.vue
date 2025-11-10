<script>
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";
import eyeIcon from "@/assets/images/Eye.png";
import eyeOffIcon from "@/assets/images/eye off.png";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export default {
  name: "ResetPassword",
  data() {
    return {
      isDark: false,
      passwordVisible: false,
      confirmPasswordVisible: false,
      isLoading: false,
      formData: {
        password: "",
        confirmPassword: "",
      },
      errors: {
        password: "",
        confirmPassword: "",
      },
      message: "",
      oobCode: "",
      eyeIcon,
      eyeOffIcon,
    };
  },
  computed: {
    logoSrc() {
      return this.isDark ? logoDark : logoLight;
    },
    passwordFieldType() {
      return this.passwordVisible ? "text" : "password";
    },
    confirmPasswordFieldType() {
      return this.confirmPasswordVisible ? "text" : "password";
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      localStorage.setItem("darkMode", this.isDark);
      document.documentElement.classList.toggle("dark", this.isDark);
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    async handleSubmit(event) {
      event.preventDefault();
      this.errors.password = "";
      this.errors.confirmPassword = "";
      this.message = "";

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

      if (!this.formData.password) {
        this.errors.password = "Password is required";
        return;
      } else if (!passwordRegex.test(this.formData.password)) {
        this.errors.password =
          "Must contain at least 8 characters including numbers and symbols";
        return;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
        return;
      }

      this.isLoading = true;

      try {
        const auth = getAuth();

        await verifyPasswordResetCode(auth, this.oobCode);

        await confirmPasswordReset(auth, this.oobCode, this.formData.password);

        this.message = "✅ Password changed successfully!";
        setTimeout(() => {
          this.$router.push("/resetpassword2");
        }, 2000);
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        if (error.code === "auth/invalid-action-code") {
          this.message = "❌ Invalid or expired link.";
        } else {
          this.message = "An error occurred while changing the password.";
        }
      }
    },
  },
  mounted() {
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";

    const saved = localStorage.getItem("darkMode") === "true";
    this.isDark = saved;
    document.documentElement.classList.toggle("dark", this.isDark);

    const params = new URLSearchParams(window.location.search);
    this.oobCode = params.get("oobCode");

    if (!this.oobCode) {
      this.message = "❌ Invalid link or does not contain a valid code.";
    }
  },
};
</script>


<template>
  <section
    class="flex min-h-screen justify-center items-center bg-white dark:bg-black text-black dark:text-white relative overflow-hidden"
  >
    <div class="flex w-full h-full">
      <!-- الصورة الجانبية (للكبير فقط) -->
      <div class="hidden lg:flex w-[40%] h-screen items-center justify-center">
        <img
          src="@/assets/images/pic4.png"
          alt="Payment Illustration"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- الصورة الخلفية في التابلت -->
      <div class="absolute inset-0 hidden md:flex lg:hidden">
        <img
          src="@/assets/images/pic4.png"
          alt="Background"
          class="w-full h-full object-cover blur-md brightness-75"
        />
      </div>

      <!-- العمود اللي فيه اللوجو والفورم -->
      <div class="flex flex-col w-full justify-center lg:w-[60%] relative z-10">
        <!-- اللوجو -->
        <div class="hidden lg:flex ml-13 mb-5">
          <img :src="logoSrc" alt="Project Logo" class="w-40 h-13 mx-10" />
        </div>

        <!-- الفورم -->
        <div
          class="relative w-4/5 mx-auto flex flex-col items-center justify-center bg-transparent md:bg-white lg:bg-transparent md:rounded-3xl p-8 md:p-10 text-center"
        >
          <div class="w-full">
            <div class="flex justify-center">
              <img
                src="@/assets/images/pass reset icon.png"
                alt="Reset Password"
                class="w-16 h-16"
              />
            </div>

            <form @submit="handleSubmit">
              <h1 class="text-2xl dark:text-white font-bold text-black-600 mb-3 mt-3">
                {{ $t("resetPasswordTitle") }}
              </h1>
              <p class="text-gray-900 dark:text-white mb-5 font-normal">
                {{ $t("resetPasswordSubtitle") }}
              </p>

              <!-- New Password Field -->
              <div class="relative w-[80%] mx-auto mb-6">
                <input
                  :type="passwordFieldType"
                  :placeholder="$t('newPasswordPlaceholder')"
                  v-model="formData.password"
                  class="w-full border dark:text-white rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
                  :class="errors.password ? 'border-red-500' : 'border-gray-300'"
                  @focus="errors.password = ''"
                  required
                />
                <button
                  type="button"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer bg-transparent border-0"
                  @click="togglePasswordVisibility"
                >
                  <img
                    :src="passwordVisible ? eyeOffIcon : eyeIcon"
                    alt="Show/Hide"
                    class="w-full h-auto"
                  />
                </button>
                <p v-if="errors.password" class="text-red-500 text-xs mt-1 text-left px-4">
                  {{ errors.password }}
                </p>
              </div>

              <!-- Confirm Password Field -->
              <div class="relative w-[80%] mx-auto mb-6">
                <input
                  :type="confirmPasswordFieldType"
                  :placeholder="$t('confirmPasswordPlaceholder')"
                  v-model="formData.confirmPassword"
                  class="w-full border dark:text-white rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
                  :class="errors.confirmPassword ? 'border-red-500' : 'border-gray-300'"
                  @focus="errors.confirmPassword = ''"
                  required
                />
                <button
                  type="button"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer bg-transparent border-0"
                  @click="toggleConfirmPasswordVisibility"
                >
                  <img
                    :src="confirmPasswordVisible ? eyeOffIcon : eyeIcon"
                    alt="Show/Hide"
                    class="w-full h-auto"
                  />
                </button>
                <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1 text-left px-4">
                  {{ errors.confirmPassword }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="px-10 py-1 rounded-4xl bg-gradient-to-r from-green-500 to-sky-400 text-white hover:opacity-90 transition font-semibold w-[50%] h-12 mb-5 text-[90%] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed relative"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin h-5 w-5 text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span :class="{ 'opacity-0': isLoading }">
                  {{ $t("resetPasswordButton") }}
                </span>
              </button>
            </form>

            <router-link to="/" class="text-gray-600 dark:text-gray-300">
              {{ $t("backToLogin") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
:root {
  --primary: #00c853;
  --secondry: #00b0ffb2;
}
</style>