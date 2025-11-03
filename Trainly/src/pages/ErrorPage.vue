<script>
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";

export default {
  name: "ErrorPage",
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
  <section class="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
    <div class="relative p-[4px] rounded-3xl bg-red-600 shadow-xl w-full max-w-2xl">
      <div class="bg-white dark:bg-[#3B3B3B] rounded-3xl p-12 text-center">
        <div class="flex justify-center mb-8 text-red-600 text-9xl font-bold">
          <img src="@/assets/images/Vector.png" alt="" class="w-15 h-15 mt-11 mx-15" />
          404
          <img src="@/assets/images/Vector.png" alt="" class="w-15 h-15 mt-11 mx-15" />
        </div>

        <h1 class="text-4xl font-bold text-red-600">{{ $t("notFoundTitle") }}</h1>
        <p class="text-gray-800 dark:text-white text-lg font-medium text-center mt-8">
          {{ $t("notFoundDescription") }}
        </p>

        <router-link to="/">
          <button
            class="cursor-pointer px-8 py-4 rounded-4xl bg-red-600 text-white hover:opacity-90 transition text-xl font-semibold w-60 h-15 mt-8"
          >
            {{ $t("notFoundButton") }}
          </button>
        </router-link>
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
