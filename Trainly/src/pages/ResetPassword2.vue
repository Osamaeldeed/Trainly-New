<script>
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/Firebase/firebaseConfig";

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
      oobCode: "", // الكود اللي جاي من اللينك
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

      // ✅ التحقق من صحة كلمة المرور
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
      if (!this.formData.password) {
        this.errors.password = "Password is required";
      } else if (!passwordRegex.test(this.formData.password)) {
        this.errors.password = "Password must be at least 8 characters and contain letters, numbers, and symbols";
      }

      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = "Please confirm your password";
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords must match";
      }

      if (this.errors.password || this.errors.confirmPassword) return;

      try {
        // ✅ تأكيد الريسيت باستخدام الكود من اللينك
        await confirmPasswordReset(auth, this.oobCode, this.formData.password);

        // ✅ تحويل المستخدم لصفحة النجاح
        this.$router.push("/resetpassword2");
      } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء تغيير كلمة المرور 😢");
      }
    },
  },

  mounted() {
    // الاتجاه والدارك مود
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";
    const saved = localStorage.getItem("darkMode") === "true";
    this.isDark = saved;
    document.documentElement.classList.toggle("dark", this.isDark);

    // ✅ قراءة الكود من رابط Firebase (oobCode)
    const params = new URLSearchParams(window.location.search);
    this.oobCode = params.get("oobCode");
  },
};
</script>


<template>
  <section class="flex justify-center bg-white dark:bg-black h-screen">
    <div class="flex w-full h-full overflow-hidden">
      <!-- الصورة -->
      <div class="hidden md:w-[40%] h-full md:flex items-center justify-center bg-gray-100">
        <img
          src="@/assets/images/pic4.png"
          alt="Payment Illustration"
          class="w-full h-screen object-cover"
        />
      </div>

      <!-- النصوص -->
      <div class="md:w-[60%] h-full flex flex-col">
        <div class="flex ml-18">
          <img
            :src="logoSrc"
            alt="Project Logo"
            class="w-40 h-13 mb-15 mt-7"
          />
        </div>

        <div
          class="relative md:p-[4px] rounded-3xl bg-linear-to-r from-green-500 to-sky-400 shadow-xl w-4/5 h-[60vh] flex mx-auto"
        >
          <div
            class="bg-white rounded-3xl dark:bg-[#3b3b3b] md:p-10 pt-7 text-center w-full h-full overflow-auto pb-1"
          >
            <div class="flex justify-center">
              <img src="@/assets/images/success icon.png" alt="Success" class="w-30 h-30" />
            </div>

            <!-- النصوص المترجمة -->
            <h1 class="text-2xl font-bold text-black-600 dark:text-gray-300 mb-7 mt-10">
              {{ $t("passwordResetSuccess") }}
            </h1>

            <router-link to="/login">
              <button
                type="submit"
                class="cursor-pointer md:px-10 md:py-1 rounded-4xl bg-linear-to-r from-green-500 to-sky-400 text-white hover:opacity-90 transition text-lg font-semibold w-60 h-12 mb-5"
              >
                {{ $t("login") }}
              </button>
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
