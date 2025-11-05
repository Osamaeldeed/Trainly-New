<script>
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";
export default {
  name: "ResetPassword",
  data() {
    return {
      isOpen: false,
      isDark: false,
      passwordVisible: false,
      confirmPasswordVisible: false,
      formData: {
        password: "",
        confirmPassword: "",
      },
      errors: {
        password: "",
        confirmPassword: "",
      },
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
    handleSubmit(event) {
      event.preventDefault();
      this.errors.password = "";
      this.errors.confirmPassword = "";

      // Validate password
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!this.formData.password) {
        this.errors.password = "Password is required";
      } else if (!passwordRegex.test(this.formData.password)) {
        this.errors.password = "Password must be 8+ characters with letters, numbers, and symbols";
      }

      // Validate confirm password
      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = "Please confirm your password";
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords must match";
      }

      // If no errors, submit form
      if (!this.errors.password && !this.errors.confirmPassword) {
        // Submit logic here
        console.log("Form submitted successfully");
      }
    },
  },
  mounted() {
    // حفظ الاتجاه بناءً على اللغة
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";

    // استرجاع الوضع الليلي المحفوظ
    const saved = localStorage.getItem("darkMode") === "true";
    this.isDark = saved;
    document.documentElement.classList.toggle("dark", this.isDark);
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
                    :src="
                      passwordVisible
                        ? '/src/assets/images/eye off.png'
                        : '/src/assets/images/Eye.png'
                    "
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
                    :src="
                      confirmPasswordVisible
                        ? '/src/assets/images/eye off.png'
                        : '/src/assets/images/Eye.png'
                    "
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
                class="px-10 py-1 rounded-4xl bg-gradient-to-r from-green-500 to-sky-400 text-white hover:opacity-90 transition font-semibold w-[50%] h-12 mb-5 text-[90%] cursor-pointer"
              >
                {{ $t("resetPasswordButton") }}
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
