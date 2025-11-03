<script>
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";

export default {
  name: "PaymentPage",
  data() {
    return {
      isOpen: false,
      isDark: false,
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
  <section class="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-white">
    <div class="relative p-[4px] rounded-3xl bg-red-600 shadow-xl w-full max-w-2xl">
      <div class="bg-white dark:bg-[#3B3B3B] rounded-3xl p-12 text-center">
        <div class="flex justify-center mb-8">
          <img src="@/assets/images/credit icon fail.png" alt="Payment Failed" class="w-28 h-28" />
        </div>

        <h1 class="text-4xl font-bold text-red-600 mb-6">
          {{ $t("paymentFailedTitle") }}
        </h1>

        <p class="text-gray-800 text-lg font-medium dark:text-white text-center">
          {{ $t("paymentFailedLine1") }}
        </p>

        <p class="text-gray-800 mb-6 text-lg font-medium dark:text-white text-center mt-0">
          {{ $t("paymentFailedLine2") }}
        </p>
        <div class="flex flex-col items-center gap-4 mt-6">
          <button
            class="cursor-pointer px-8 py-4 rounded-4xl bg-red-600 text-white hover:opacity-90 transition text-xl font-semibold w-60 h-15 mt-4"
          >
            {{ $t("tryAgain") }}
          </button>
          <router-link
            to="/traineehome"
            class="cursor-pointer dark:text-white text-gray-500 text-base font-medium mt-3"
          >
            {{ $t("backToHome") }}
            >
          </router-link>
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
