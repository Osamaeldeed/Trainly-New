<template>
  <nav
    class="flex justify-between items-center px-[50px] md:px-[70px] h-20 bg-white dark:bg-[#3B3B3B] shadow-sm relative"
  >
    <!-- 🔹 اللوجو -->
    <img :src="logoSrc" alt="Logo" class="w-[140px] h-auto" />

    <!-- 🔹 روابط التنقل -->
    <ul
      class="hidden md:flex items-center justify-center md:space-x-10 lg:space-x-16 font-[500] md:text-[85%] lg:text-[100%]"
    >
      <router-link to="/traineehome" class="nav-link">{{ $t("home") }}</router-link>
      <router-link to="/sportstrainee" class="nav-link">{{ $t("sports") }}</router-link>
      <router-link to="/aboutustrainee" class="nav-link">{{ $t("about") }}</router-link>
      <router-link to="/contactustrainee" class="nav-link">{{ $t("contact") }}</router-link>
    </ul>

    <!-- 🔹 اليمين: Dark Mode + Language + User -->
    <div class="hidden md:flex items-center gap-4">
      <!-- 🌙 الوضع الليلي -->
      <button @click="toggleDarkMode" class="py-2 cursor-pointer">
        {{ isDark ? "☀️" : "🌙" }}
      </button>

      <!-- 🌐 اللغة -->
      <img
        src="@/assets/images/language switch(1)(1).png"
        alt="Language"
        class="w-[35px] cursor-pointer transition-transform duration-500 hover:rotate-180"
        @click="switchLang"
      />

      <!-- 🔹 أيقونة المستخدم مع Dropdown -->
      <div class="relative">
        <img
          class="w-8 h-8 rounded-full cursor-pointer"
          :src="TraineeImage || 'https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif'"
          alt="user photo"
          @click="toggleUserMenu"
        />

        <!-- Dropdown Menu Desktop -->
        <transition
          enter-active-class="transition ease-out duration-200 transform"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150 transform"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-40 bg-white dark:bg-black shadow-lg rounded-lg py-2 z-50 cursor-pointer"
          >
            <button
              @click="
                $router.push('/trainee/mytrainers');
                showUserMenu = false;
              "
              class="w-full text-left px-4 py-2 text-[#333] dark:text-white hover:bg-gray-300 dark:hover:bg-gray-300 transition cursor-pointer"
            >
              My Dashboard
            </button>
            <button
              @click="handleLogout"
              class="flex items-center p-2 text-red-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-300 w-full transition duration-300 cursor-pointer"
            >
              <img src="@/assets/images/logout.png" alt="logout icon" class="w-5 h-5" />
              <span class="ms-3 font-medium">Log out</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- 🔹 أيقونة الموبايل -->
    <div
      class="flex md:hidden flex-col text-[#333] dark:text-white justify-center items-center cursor-pointer space-y-1"
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
        class="absolute top-[80px] left-0 w-full bg-white dark:bg-black shadow-md flex flex-col items-center space-y-6 py-6 z-50 md:hidden"
      >
        <div class="w-full px-6 flex items-center justify-between">
          <button @click="toggleDarkMode" class="py-2 px-3 rounded-md text-xl cursor-pointer">
            {{ isDark ? "☀️" : "🌙" }}
          </button>
          <img
            src="@/assets/images/language switch(1)(1).png"
            alt="Language"
            class="w-[36px] cursor-pointer text-[#333] dark:text-white transition-transform duration-500 hover:rotate-180"
            @click="switchLang"
          />
        </div>
        <router-link
          to="/traineehome"
          class="nav-link text-[#333] dark:text-white"
          @click="isOpen = false"
          >{{ $t("home") }}</router-link
        >
        <router-link
          to="/sportstrainee"
          class="nav-link text-[#333] dark:text-white"
          @click="isOpen = false"
          >{{ $t("sports") }}</router-link
        >
        <router-link
          to="/aboutustrainee"
          class="nav-link text-[#333] dark:text-white"
          @click="isOpen = false"
          >{{ $t("about") }}</router-link
        >
        <router-link
          to="/contactustrainee"
          class="nav-link text-[#333] dark:text-white"
          @click="isOpen = false"
          >{{ $t("contact") }}</router-link
        >

        <!-- Mobile Dropdown -->
        <div class="flex flex-col gap-2 w-[80%] items-center">
          <button
            @click="showUserMenu = !showUserMenu"
            class="w-full rounded-2xl border-2 border-primary text-[#333] dark:text-white text-primary hover:bg-primary hover:text-white transition h-11 text-[17px] cursor-pointer"
          >
            Profile
          </button>

          <transition
            enter-active-class="transition ease-out duration-200 transform"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150 transform"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="showUserMenu"
              class="flex flex-col w-full bg-white dark:bg-black rounded-lg shadow-md"
            >
              <!-- ✅ Dashboard Button -->
              <button
                @click="
                  $router.push('/trainee/dashboard');
                  isOpen = false;
                  showUserMenu = false;
                "
                class="px-4 py-2 hover:bg-gray-100 w-full text-[#333] dark:text-white text-left rounded-t-lg"
              >
                Dashboard
              </button>

              <!-- ✅ Logout Button (منفصل تماماً) -->
              <button
                @click="handleLogout"
                class="flex items-center p-2 text-red-600 rounded-b-lg hover:bg-blue-200 w-full transition duration-300 cursor-pointer"
              >
                <img src="@/assets/images/logout.png" alt="logout icon" class="w-5 h-5" />
                <span class="ms-3 font-medium">Log out</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- ✅ Confirmation Modal (خارج كل الـ buttons) -->
    <Teleport to="body">
      <ConfirmLogoutModal
        v-model="showLogoutModal"
        @confirm="confirmLogout"
        @cancel="cancelLogout"
      />
    </Teleport>
  </nav>
</template>

<script>
import { onMounted, ref } from "vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal.vue";
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";
export default {
  name: "TraineeNavbar",
  data() {
    return {
      isOpen: false,
      showUserMenu: false,
      isDark: false,
    };
  },
  computed: {
    logoSrc() {
      return this.isDark ? logoDark : logoLight;
    },
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    switchLang() {
      const newLocale = this.$i18n.locale === "en" ? "ar" : "en";
      this.$i18n.locale = newLocale;
      localStorage.setItem("lang", newLocale);
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
      this.isDark = !this.isDark;
      this.saveDark(this.isDark);
    },
  },
  mounted() {
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";
    const saved = localStorage.getItem("darkMode") === "true";
    this.isDark = saved;
    this.saveDark(saved);
  },
  components: {
    ConfirmLogoutModal,
  },
  setup() {
    const TraineeImage = ref("");
    const showLogoutModal = ref(false);
    const db = getFirestore();
    const auth = getAuth();
    const router = useRouter();

    const fetchTraineeImage = async (uid) => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          TraineeImage.value =
            docSnap.data().profilePicture ||
            "https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif";
        }
      } catch (error) {
        console.error("Error fetching trainee data:", error);
      }
    };

    const handleLogout = () => {
      showLogoutModal.value = true;
    };

    const confirmLogout = async () => {
      try {
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const cancelLogout = () => {
      console.log("Logout cancelled");
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchTraineeImage(user.uid);
        } else {
          console.log("No user signed in.");
        }
      });
    });

    return {
      TraineeImage,
      handleLogout,
      showLogoutModal,
      confirmLogout,
      cancelLogout,
    };
  },
};
</script>

<style scoped>
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
.router-link-exact-active.nav-link {
  background: linear-gradient(to right, var(--primary), var(--secondry));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}
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

/* Fade effect for mobile */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.dark .nav-link {
  color: white;
}
.dark .nav-link:hover {
  color: white;
}
</style>
