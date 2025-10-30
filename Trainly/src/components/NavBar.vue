<template>
  <nav
    class="flex justify-between items-center px-[50px] md:px-[70px] h-20 bg-white shadow-sm relative"
  >
    <!-- 🔹 اللوجو -->
    <img src="@/assets/images/Project LOGO.png" alt="Logo" class="w-[140px] h-auto" />

    <!--  روابط التنقل -->
    <ul
      class="hidden md:flex items-center justify-center md:space-x-10 lg:space-x-16 font-[500] md:text-[85%] lg:text-[100%]"
    >
      <router-link to="/" class="nav-link">{{ $t("home") }}</router-link>
      <router-link to="/aboutus" class="nav-link">{{ $t("about") }}</router-link>
      <router-link to="/sports" class="nav-link">{{ $t("sports") }}</router-link>
      <router-link to="/contactus" class="nav-link">{{ $t("contact") }}</router-link>
    </ul>

    <!-- 🔹 الأزرار وتبديل اللغة -->
    <div class="hidden md:flex items-center gap-3">
      <!-- ✅ زرار Login بستايل منفصل -->
        <button
          @click="$router.push('/login')"
          class="min-w-[130px] lg:min-w-[150px] px-4 rounded-3xl border-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--third)] transition h-10 lg:h-11 text-[14px] lg:text-[17px] cursor-pointer"
        >
          {{ $t("login") }}
        </button>
      <!-- ✅ زرار Get Started -->
      <button
        @click="$router.push('/signup')"
        class="min-w-[130px] lg:min-w-[150px] px-4 rounded-3xl bg-primary text-white hover:opacity-90 transition h-10 lg:h-11 text-[14px] lg:text-[17px] cursor-pointer"
      >
        {{ $t("get_started") }}
      </button>

      <img
        src="@/assets/images/language switch(1)(1).png"
        alt="Language"
        class="w-[40px] cursor-pointer transition-transform duration-500 hover:rotate-180"
        @click="switchLang"
      />
    </div>


    <!-- 🔹 أيقونة الموبايل -->
    <div
      class="flex md:hidden flex-col justify-center items-center cursor-pointer space-y-1"
      @click="isOpen = !isOpen"
    >
      <span
        class="block w-6 h-[3px] bg-gray-800 rounded transition-all duration-300"
        :class="{ 'rotate-45 translate-y-[8px]': isOpen }"
      ></span>
      <span
        class="block w-6 h-[3px] bg-gray-800 rounded transition-all duration-300"
        :class="{ 'opacity-0': isOpen }"
      ></span>
      <span
        class="block w-6 h-[3px] bg-gray-800 rounded transition-all duration-300"
        :class="{ '-rotate-45 -translate-y-[8px]': isOpen }"
      ></span>
    </div>

    <!-- 🔹 القائمة المنسدلة للموبايل -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-[80px] left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 z-50 md:hidden"
      >
        <router-link to="/" class="nav-link" @click="isOpen = false">{{ $t("home") }}</router-link>
        <router-link to="/sports" class="nav-link" @click="isOpen = false">{{
          $t("sports")
        }}</router-link>
        <router-link to="/aboutus" class="nav-link" @click="isOpen = false">{{
          $t("about")
        }}</router-link>
        <router-link to="/contactus" class="nav-link" @click="isOpen = false">{{
          $t("contact")
        }}</router-link>

        <div class="flex flex-col gap-4 w-[80%] items-center">
          <button
            @click="$router.push('/login'); isOpen = false"
             class="min-w-[130px] lg:min-w-[150px] px-4 rounded-3xl border-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--third)] transition h-10 lg:h-11 text-[14px] lg:text-[17px] cursor-pointer"
        >
            {{ $t("login") }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    switchLang() {
      const newLocale = this.$i18n.locale === "en" ? "ar" : "en";
      this.$i18n.locale = newLocale;
      localStorage.setItem("lang", newLocale);
      document.dir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
      document.body.style.fontFamily =
        newLocale === "ar" ? "'Tajawal', sans-serif" : "'Poppins', sans-serif";
    },
  },
  mounted() {
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";
  },
};
</script>

<style scoped>
/* 🌈 ألوان اللينكات */
.nav-link {
  position: relative;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}

/* 🌈 لما تكون الصفحة مفتوحة */
.router-link-exact-active.nav-link {
  background: linear-gradient(to right, var(--primary), var(--secondry));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

/* ✨ خط تحت اللينك لما يكون active */
.router-link-exact-active.nav-link::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, var(--primary), var(--secondry));
  border-radius: 2px;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(to right, var(--primary), var(--secondry));
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
.gradient-border {
  border: 2px solid transparent;
  border-radius: 12px;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, var(--primary), var(--secondry)) border-box;
}
/* ✨ تأثير الموبايل */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
