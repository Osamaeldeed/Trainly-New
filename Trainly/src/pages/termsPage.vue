<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <header class="bg-white dark:bg-[#3b3b3b] shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Use justify-between to split left & right -->
        <div class="flex items-center justify-between">
          <!-- Left section -->
          <div class="flex items-center gap-3">
            <svg
              class="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
            <div>
              <h1 class="text-3xl dark:text-white font-bold text-gray-900">
                {{ $t("Terms and Conditions") }}
              </h1>
              <p class="text-sm dark:text-gray-200 text-gray-600 mt-1">
                {{ $t("Terms 1") }}
              </p>
            </div>
          </div>

          <!-- Right section -->
          <div class="hidden md:flex items-center gap-3">
            <button @click="toggleDarkMode" class="py-2 cursor-pointer">
              {{ isDark ? "☀️" : "🌙" }}
            </button>
            <img
              src="@/assets/images/language switch(1)(1).png"
              alt="Language"
              class="w-[40px] cursor-pointer transition-transform duration-500 hover:rotate-180"
              @click="switchLang"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <aside class="lg:col-span-1">
          <div
            class="fixed-sidebar dark:bg-[#3b3b3b] dark:text-white bg-white rounded-lg shadow-md p-6 fixed top-32 w-64 max-h-[calc(100vh-10rem)] overflow-y-auto z-50 hidden lg:block transition-all duration-500 ease-in-out"
            :style="sidebarStyle"
          >
            <h2 class="font-semibold dark:text-white text-gray-900 mb-4">{{ $t("Terms 2") }}</h2>
            <nav class="space-y-2">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                @click.prevent="scrollToSection(section.id)"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 font-medium dark:bg-blue-600 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300',
                ]"
              >
                <component :is="section.icon" class="w-4 h-4" />
                <span class="dark:text-gray-200 text-xs">{{ $t(section.title) }}</span>
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <div class="bg-white dark:bg-[#3b3b3b] rounded-lg shadow-md p-8 space-y-8">
            <!-- Introduction -->
            <div
              class="border-blue-500 transition-all duration-500"
              :class="isRTL ? 'border-r-4 border-l-0 pr-6 pl-0' : 'border-l-4 border-r-0 pl-6 pr-0'"
            >
              <p class="text-gray-700 dark:text-gray-200 leading-relaxed">
                {{ $t("Terms 3") }}
              </p>
            </div>

            <!-- Section 1: Acceptance -->
            <section id="acceptance" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 5") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>
                  {{ $t("Terms 6") }}
                </p>
                <p>
                  {{ $t("Terms 7") }}
                </p>
              </div>
            </section>

            <!-- Section 2: Definitions -->
            <section id="definitions" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 8") }}
                </h2>
              </div>
              <div
                class="bg-gray-50 dark:bg-[#292929] dark:text-gray-300 rounded-lg p-6 space-y-3 text-gray-700"
              >
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">{{ $t("Terms 9") }}</strong>
                  {{ $t("Terms 10") }}
                </p>
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">{{ $t("Terms 11") }}:</strong>
                  {{ $t("Terms 12") }}
                </p>
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">{{ $t("Terms 13") }}</strong>
                  {{ $t("Terms 14") }}
                </p>
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">{{ $t("Terms 65") }}</strong>
                  {{ $t("Terms 15") }}
                </p>
              </div>
            </section>

            <!-- Section 3: Registration -->
            <section id="registration" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 16") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-300 text-gray-700">
                <p>
                  {{ $t("Terms 17") }}
                </p>
                <div class="bg-blue-50 border dark:bg-blue-200 border-blue-200 rounded-lg p-4">
                  <h3 class="font-semibold text-blue-900 mb-2">{{ $t("Terms 18") }}</h3>
                  <ul class="space-y-2 text-blue-800">
                    <li>• {{ $t("Terms 19") }}</li>
                    <li>• {{ $t("Terms 20") }}</li>
                    <li>• {{ $t("terms 21") }}</li>
                    <li>• {{ $t("Terms 22") }}</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Section 4: Trainers -->
            <section id="trainers" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 23") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-300 text-gray-700">
                <p>{{ $t("Terms 24") }}</p>
                <div class="space-y-3">
                  <div
                    class="border-green-500 transition-all duration-500 dark:text-gray-300"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 66") }}</h3>
                    <p>
                      {{ $t("Terms 25") }}
                    </p>
                  </div>
                  <div
                    class="border-green-500 transition-all duration-500 dark:text-gray-300"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 26") }}</h3>
                    <p>
                      {{ $t("Terms 27") }}
                    </p>
                  </div>
                  <div
                    class="border-green-500 transition-all duration-500 dark:text-gray-300"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 28") }}</h3>
                    <p>
                      {{ $t("Terms 29") }}
                    </p>
                  </div>
                  <div
                    class="border-green-500 transition-all duration-500 dark:text-gray-300"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 30") }}</h3>
                    <p>
                      {{ $t("Terms 31") }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 5: Trainees -->
            <section id="trainees" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 32") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>{{ $t("Terms 33") }}</p>
                <div class="space-y-3">
                  <div
                    class="border-purple-500 transition-all duration-500 dark:text-gray-200"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 34") }}</h3>
                    <p>
                      {{ $t("Terms 35") }}
                    </p>
                  </div>
                  <div
                    class="border-purple-500 transition-all duration-500 dark:text-gray-200"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 36") }}</h3>
                    <p>
                      {{ $t("Terms 37") }}
                    </p>
                  </div>
                  <div
                    class="border-purple-500 transition-all duration-500 dark:text-gray-200"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 38") }}</h3>
                    <p>
                      {{ $t("Terms 39") }}
                    </p>
                  </div>
                  <div
                    class="border-purple-500 transition-all duration-500 dark:text-gray-200"
                    :class="
                      isRTL ? 'border-r-4 border-l-0 pr-4 pl-0' : 'border-l-4 border-r-0 pl-4 pr-0'
                    "
                  >
                    <h3 class="font-semibold text-gray-900 mb-1">{{ $t("Terms 40") }}</h3>
                    <p>
                      {{ $t("Terms 41") }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 6: Payments -->
            <section id="payments" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 42") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>
                  {{ $t("Terms 43") }}
                </p>
                <div
                  class="bg-amber-50 border dark:text-white dark:bg-[#292929] border-amber-200 rounded-lg p-4 space-y-3"
                >
                  <p>
                    <strong class="text-amber-900">{{ $t("Terms 44") }}</strong
                    >{{ $t("Terms 45") }}
                  </p>
                  <p>
                    <strong class="text-amber-900">{{ $t("Terms 46") }}</strong>
                    {{ $t("Terms 47") }}
                  </p>
                  <p>
                    <strong class="text-amber-900">{{ $t("Terms 48") }}</strong>
                    {{ $t("Terms 49") }}
                  </p>
                  <p>
                    <strong class="text-amber-900">{{ $t("Terms 50") }}</strong>
                    {{ $t("Terms 51") }}
                  </p>
                </div>
              </div>
            </section>

            <!-- Section 7: Liability -->
            <section id="liability" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 52") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 class="font-semibold dark:text-black text-red-900 mb-2">
                    {{ $t("Terms 53") }}
                  </h3>
                  <p class="text-red-800">
                    {{ $t("Terms 54") }}
                  </p>
                </div>
                <p>
                  {{ $t("Terms 55") }}
                </p>
                <p>
                  {{ $t("Terms 56") }}
                </p>
                <p>
                  {{ $t("Terms 57") }}
                </p>
              </div>
            </section>

            <!-- Section 8: Termination -->
            <section id="termination" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  {{ $t("Terms 58") }}
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>
                  {{ $t("Terms 59") }}
                </p>
                <p>
                  {{ $t("Terms 61") }}
                </p>
                <div class="bg-gray-100 dark:bg-[#292929] rounded-lg p-4">
                  <h3 class="font-semibold dark:text-gray-300 text-gray-900 mb-2">
                    {{ $t("Terms 60") }}
                  </h3>
                  <p>
                    {{ $t("Terms 62") }}
                  </p>
                </div>
              </div>
            </section>

            <!-- Contact Section -->
            <section class="border-t pt-8 mt-8">
              <h2 class="text-2xl font-bold dark:text-white text-gray-900 mb-4">
                {{ $t("contact") }}
              </h2>
              <div class="bg-blue-50 dark:bg-[#292929] rounded-lg p-6">
                <p class="text-gray-700 dark:text-gray-200 mb-4">
                  {{ $t("Terms 63") }}
                </p>
                <div class="space-y-2 dark:text-gray-200 text-gray-700">
                  <p><strong>Email:</strong> Admin@trainly.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </section>

            <!-- Acceptance Button -->
            <div class="border-t pt-8 mt-8">
              <div class="bg-white dark:bg-[#292929] rounded-lg p-6 text-center">
                <p class="text-gray-800 dark:text-gray-200 font-medium mb-4">
                  {{ $t("Terms 64") }}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: "",
      isOpen: false,
      isDark: false,
      isRTL: false,
      sections: [
        { id: "acceptance", title: "section1", icon: "check-circle" },
        { id: "definitions", title: "section2", icon: "file-text" },
        { id: "registration", title: "section3", icon: "users" },
        { id: "trainers", title: "section4", icon: "award" },
        { id: "trainees", title: "section5", icon: "users" },
        { id: "payments", title: "section6", icon: "credit-card" },
        { id: "liability", title: "section7", icon: "alert-circle" },
        { id: "termination", title: "section8", icon: "x-circle" },
      ],
    };
  },
  computed: {
    sidebarStyle() {
      return {
        left: this.isRTL ? "auto" : "2rem",
        right: this.isRTL ? "2rem" : "auto",
        opacity: 1,
        transform: "translateX(0)",
      };
    },
  },
  methods: {
    scrollToSection(sectionId) {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    acceptTerms() {
      alert("Thank you for accepting the Terms and Conditions!");
    },
    handleScroll() {
      const footer = document.querySelector("footer");
      const sidebar = document.querySelector(".fixed-sidebar");

      if (footer && sidebar) {
        const footerRect = footer.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();

        if (footerRect.top < sidebarRect.bottom) {
          sidebar.style.opacity = "0";
          sidebar.style.pointerEvents = "none";
        } else {
          sidebar.style.opacity = "1";
          sidebar.style.pointerEvents = "auto";
        }
      }
    },
    switchLang() {
      const newLocale = this.$i18n.locale === "en" ? "ar" : "en";
      this.$i18n.locale = newLocale;
      localStorage.setItem("lang", newLocale);
      this.isRTL = newLocale === "ar";
      document.dir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
      document.body.style.fontFamily =
        newLocale === "ar" ? "'Tajawal', sans-serif" : "'Poppins', sans-serif";
    },
    saveDark(val) {
      localStorage.setItem("darkMode", val);
      if (val) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    toggleDarkMode() {
      const newValue = !this.isDark;
      this.isDark = !this.isDark;
      this.saveDark(this.isDark);
      window.dispatchEvent(new CustomEvent("darkModeChanged", { detail: newValue }));
    },
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-120px 0px -50% 0px",
      },
    );

    this.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Initialize RTL state
    this.isRTL = this.$i18n.locale === "ar";
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";
    const saved = localStorage.getItem("darkMode") === "true";
    this.isDark = saved;
    this.saveDark(saved);

    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.scroll-mt-6 {
  scroll-margin-top: 1.5rem;
}
</style>
