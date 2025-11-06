<script>
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/Firebase/firebaseConfig";

export default {
  name: "ForgetPassword1",
  data() {
    return {
      isOpen: false,
      isDark: false,
      email: "",
      loading: false,
    };
  },
  computed: {
    logoSrc() {
      return this.isDark ? logoDark : logoLight;
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      localStorage.setItem("darkMode", this.isDark);
      document.documentElement.classList.toggle("dark", this.isDark);
    },

    async handleForgetPassword() {
      if (!this.email) {
        alert("من فضلك أدخل البريد الإلكتروني 📧");
        return;
      }

      this.loading = true;
      try {
        await sendPasswordResetEmail(auth, this.email);
        this.$router.push({ 
          path: '/forgetpassword2', 
          query: { email: this.email } 
        });
      } catch (error) {
        console.error(error.message);
        if (error.code === "auth/user-not-found") {
          alert("لا يوجد حساب بهذا البريد الإلكتروني ❌");
        } else {
          alert("حدث خطأ أثناء الإرسال 😢");
        }
      } finally {
        this.loading = false;
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
      <div class="hidden lg:flex w-[45%] h-screen items-center justify-center">
        <img
          src="@/assets/images/pic3.jpg"
          alt="Payment Illustration"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- الصورة الخلفية في التابلت -->
      <div class="absolute inset-0 hidden md:flex lg:hidden">
        <img
          src="@/assets/images/pic3.jpg"
          alt="Background"
          class="w-full h-full object-cover blur-md brightness-75"
        />
      </div>

      <!-- العمود اللي فيه اللوجو والفورم -->
      <div class="flex flex-col w-full justify-center lg:w-2/3 relative z-10">
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
                src="@/assets/images/reset pass icon.png"
                alt="Reset Password"
                class="w-17 h-17"
              />
            </div>

            <form @submit.prevent="handleForgetPassword">
              <h1
                class="text-2xl font-bold text-black-600 dark:text-white mb-3 mt-5"
              >
                {{ $t("forgotPasswordTitle") }}
              </h1>

              <p class="text-gray-900 mb-5 dark:text-white font-normal">
                {{ $t("forgotPasswordDesc") }}
              </p>

              <input
                v-model="email"
                type="email"
                :placeholder="$t('forgotPasswordPlaceholder')"
                class="border border-gray-300 rounded-2xl px-4 py-3 mb-6 w-[70%] mx-auto focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <br />

              <button
                type="submit"
                :disabled="loading"
                class="cursor-pointer px-10 py-1 rounded-4xl bg-linear-to-r from-[#00C853] to-[#00B0FF] text-white hover:opacity-90 transition text-lg font-semibold w-[45%] h-12 mb-5"
              >
                {{ loading ? "جارٍ الإرسال..." : $t("submitButton") }}
              </button>
            </form>

            <router-link to="/login" class="text-gray-600 dark:text-gray-300">
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
