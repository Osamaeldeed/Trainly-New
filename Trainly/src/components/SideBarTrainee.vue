<template>
  <div>
    <nav class="top-0 z-50 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <!-- ✅ زرار السايد بار -->
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 dark:text-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>

          <!-- ✅ كل عناصر اليمين (دارك + لغة + نوتيفيكيشن + بروفايل) -->
          <div class="flex items-center gap-6 justify-end">
            <!-- دارك مود + اللغة -->
            <div class="flex items-center gap-3">
              <button
                @click="toggleDarkMode"
                class="py-2 text-xl cursor-pointer dark:text-white hover:scale-110 transition-transform"
              >
                {{ isDark ? "☀️" : "🌙" }}
              </button>

              <img
                src="@/assets/images/language switch(1)(1).png"
                alt="Language"
                class="w-[40px] cursor-pointer transition-transform duration-500 hover:rotate-180"
                @click="switchLang"
              />
            </div>

            <!-- 🔔 النوتيفيكيشن -->
            <div class="relative">
              <button
                @click="toggleNotifications"
                type="button"
                class="relative inline-flex items-center justify-center p-2 dark:bg-[#3B3B3B] cursor-pointer text-gray-600 dark:text-white rounded-lg hover:bg-gray-200 focus:outline-none transition duration-200"
                aria-label="Notifications"
              >
                <img src="@/assets/images/mingcute_notification-line.png" alt="bell" class="w-7 h-7" />
                <span
                  v-if="unreadCount > 0"
                  class="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs dark:text-white font-bold leading-none text-white bg-red-600 rounded-full"
                >
                  {{ unreadCount }}
                </span>
              </button>

              <!-- dropdown notifications -->
              <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white dark:bg-[#3B3B3B] border shadow-xl rounded-xl overflow-hidden z-50"
              >
                <div class="p-3 border-b font-semibold flex items-center justify-between dark:bg-[#3B3B3B] bg-blue-50">
                  <div class="dark:text-white text-gray-700">Notifications</div>
                  <button
                    v-if="unreadCount > 0"
                    @click.stop="markAllRead"
                    class="text-sm text-blue-600 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>

                <div class="max-h-64 overflow-y-auto">
                  <div v-if="notifications.length === 0" class="p-4 text-center text-sm dark:text-white text-gray-400">
                    No notifications
                  </div>

                  <div
                    v-for="note in notifications"
                    :key="note.id"
                    @click="handleNotificationClick(note)"
                    class="cursor-pointer p-3 flex flex-col gap-1 border-b dark:text-white hover:bg-blue-50 transition-colors duration-200 rounded-xl mx-2 my-1"
                    :class="{ 'bg-blue-100': !note.read }"
                  >
                    <div class="flex items-center justify-between">
                      <div class="font-medium dark:text-white text-gray-800 text-sm">{{ note.title || 'Notification' }}</div>
                      <div class="text-xs dark:text-white text-gray-400">{{ formatTime(note.createdAt) }}</div>
                    </div>
                    <div class="text-sm dark:text-white text-gray-700 mt-1">{{ note.message || '' }}</div>
                    <div class="self-end mt-1">
                      <button
                        @click.stop="toggleRead(note)"
                        class="text-xs dark:text-white px-2 py-1 border rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        {{ note.read ? 'Read' : 'Mark' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 👤 صورة المستخدم -->
            <div>
              <button
                type="button"
                class="flex text-sm dark:text-white dark:bg-[#3B3B3B] bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <img
                  class="w-8 h-8 rounded-full"
                  :src="traineeImage || 'https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif'"
                  alt="user photo"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- ✅ Overlay أبيض شفاف -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 filter backdrop-blur-sm dark:bg-[#3B3B3B] bg-opacity-70 z-30 lg:hidden transition-all duration-300"
      @click="toggleSidebar"
    ></div>

    <!-- ✅ سايد بار متجاوب -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 w-65 h-screen bg-all dark:bg-[#3B3B3B] transition-transform duration-300 ease-in-out rounded-tr-4xl overflow-y-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:block',
      ]"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 dark:bg-[#3B3B3B] py-4">
        <ul class="space-y-4 font-light dark:text-white text-[14px] mx-5">
          <!-- ✅ Logo -->
          <li class="mb-8 mt-3 mx-2">
            <img :src="logoSrc" class="h-8 w-25 me-3" alt="Logo" />
          </li>

          <!-- ✅ Back to Home Button -->
          <li class="mb-6">
            <router-link
              to="/traineehome"
              class="flex items-center p-2 dark:text-white dark:bg-[#3B3B3B] text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span class="ms-3 font-medium">Back to Home</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/trainee/mytrainers"
              class="flex items-center p-2 dark:text-white text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/fluent_people-24-filled.png" alt="" class="w-5 h-5" />
              <span class="ms-3">My trainers</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/traineeplans"
              class="flex items-center p-2 dark:text-white text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/grommet-icons_plan.png" alt="" class="w-5 h-5" />
              <span class="ms-3">My Plans</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/trainee/inbox"
              class="flex items-center p-2 dark:text-white text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/wpf_message-outline.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Inbox</span>

              <!-- unread dot for inbox (small blue) -->
              <span v-if="unreadConversations > 0" class="sidebar-unread-dot ms-3" :title="unreadConversations + ' unread'"></span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/trainee/settings"
              class="flex items-center p-2 dark:text-white text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/mdi_settings-outline.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Settings</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/trainee/customerservice"
              class="flex items-center p-2 dark:text-white text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/mdi_customer-service.png" alt="" class="w-6 h-6" />
              <span class="ms-3">Customer Service</span>
            </router-link>
          </li>

          <!-- ✅ Log Out Button -->
          <li>
            <button
              @click="handleLogout"
              class="flex items-center p-2 text-red-600 rounded-lg hover:bg-blue-200 w-full transition duration-300 cursor-pointer"
            >
              <img src="@/assets/images/logout.png" alt="logout icon" class="w-5 h-5" />
              <span class="ms-3 font-medium">Log out</span>
            </button>
          </li>

          <!-- ✅ Confirmation Modal -->
          <Teleport to="body">
            <ConfirmLogoutModal
              v-model="showLogoutModal"
              @confirm="confirmLogout"
              @cancel="cancelLogout"
            />
          </Teleport>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import logoLight from "@/assets/images/Project LOGO.png";
import logoDark from "@/assets/images/LOGO for (Dark mode).png";
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  limit,
  getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal.vue";

export default {
  name: "SideBarTrainee",
  components: { ConfirmLogoutModal },
  setup() {
    const { locale } = useI18n();
    const isSidebarOpen = ref(false);
    const isDark = ref(false);
    const notifications = ref([]);
    const showNotifications = ref(false);
    const traineeUid = ref(null);
    const unreadConversations = ref(0);
    const traineeImage = ref("");
    const showLogoutModal = ref(false);

    const db = getFirestore();
    const auth = getAuth();
    const router = useRouter();

    let notificationsUnsub = null;
    let conversationsUnsub = null;

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
    };

    const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

    const logoSrc = computed(() => (isDark.value ? logoDark : logoLight));

    // ✅ حفظ وضع الـ dark mode
    const saveDark = (val) => {
      localStorage.setItem("darkMode", val);
      document.documentElement.classList.toggle("dark", val);
    };

    // ✅ تفعيل أو إلغاء الـ dark mode
    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      saveDark(isDark.value);
    };

    // ✅ تبديل اللغة بين عربي / إنجليزي
    const switchLang = () => {
      const newLocale = locale.value === "en" ? "ar" : "en";
      locale.value = newLocale;
      localStorage.setItem("lang", newLocale);

      document.dir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
      document.body.style.fontFamily =
        newLocale === "ar" ? "'Tajawal', sans-serif" : "'Poppins', sans-serif";
    };

    // fetch trainee image
    const fetchTraineeImage = async (uid) => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap && docSnap.exists()) {
          traineeImage.value =
            docSnap.data().profilePicture ||
            "https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif";
        }
      } catch (error) {
        console.error("Error fetching trainee data:", error);
      }
    };

    // format time helper
    const formatTime = (ts) => {
      if (!ts) return "";
      try {
        if (ts.toDate && typeof ts.toDate === "function") return ts.toDate().toLocaleString();
        const d = new Date(ts);
        if (!isNaN(d.getTime())) return d.toLocaleString();
        return "";
      } catch {
        return "";
      }
    };

    // mark single note read locally
    const markReadLocal = (noteId) => {
      const idx = notifications.value.findIndex(n => n.id === noteId);
      if (idx !== -1) notifications.value[idx].read = true;
    };

    const toggleRead = async (note) => {
      if (!note || !note.id) return;
      try {
        const nRef = doc(db, "notifications", note.id);
        await updateDoc(nRef, { read: true });
        markReadLocal(note.id);
      } catch (err) {
        console.error("toggleRead error:", err);
        if (err.code === "permission-denied") {
          console.warn("No permission to update notification.read — check Firestore rules.");
          markReadLocal(note.id);
        }
      }
    };

    const markAllRead = async () => {
      const unread = notifications.value.filter(n => !n.read);
      for (const n of unread) {
        try {
          await updateDoc(doc(db, "notifications", n.id), { read: true });
        } catch (err) {
          console.error("markAllRead error for", n.id, err);
          if (err.code === "permission-denied") {
            notifications.value = notifications.value.map(x => ({ ...x, read: true }));
            return;
          }
        }
      }
      notifications.value = notifications.value.map(n => ({ ...n, read: true }));
    };

    const handleNotificationClick = async (note) => {
      if (!note) return;
      if (!note.read) await toggleRead(note);
      try {
        router.push({ name: "traineeBookings" });
      } catch (err) {
        console.warn("Ignored error:", err);
      }
    };

    // start listener for notifications
    const startNotificationsListener = async () => {
      if (!traineeUid.value) {
        console.warn("startNotificationsListener: no traineeUid yet");
        return;
      }

      if (notificationsUnsub) {
        notificationsUnsub();
        notificationsUnsub = null;
      }

      const notRef = collection(db, "notifications");
      const tryQuery = (useOrder) => {
        try {
          if (useOrder) {
            return query(notRef, where("userId", "==", traineeUid.value), orderBy("createdAt", "desc"), limit(100));
          } else {
            return query(notRef, where("userId", "==", traineeUid.value), limit(100));
          }
        } catch (err) {
          console.warn("tryQuery build error:", err);
          return query(notRef, where("userId", "==", traineeUid.value), limit(100));
        }
      };

      let q = tryQuery(true);

      try {
        notificationsUnsub = onSnapshot(q, (snap) => {
          const list = [];
          snap.forEach(d => {
            const data = d.data();
            list.push({
              id: d.id,
              title: data.title || data.t || "",
              message: data.message || data.massage || data.msg || data.massageText || data.massage_text || data.massageMessage || "",
              createdAt: data.createdAt || data.time || null,
              read: typeof data.read === "boolean" ? data.read : false,
              raw: data
            });
          });
          notifications.value = list;
        }, (err) => {
          console.error("notifications onSnapshot error:", err);
          const msg = String(err && err.message ? err.message : err);
          if (msg.includes("index") || msg.includes("requires an index")) {
            console.warn("Firestore requires a composite index for this query — falling back to query without orderBy.");
            if (notificationsUnsub) { notificationsUnsub(); notificationsUnsub = null; }
            q = tryQuery(false);
            notificationsUnsub = onSnapshot(q, (snap2) => {
              const list2 = [];
              snap2.forEach(d => {
                const data = d.data();
                list2.push({
                  id: d.id,
                  title: data.title || data.t || "",
                  message: data.message || data.massage || data.msg || "",
                  createdAt: data.createdAt || data.time || null,
                  read: typeof data.read === "boolean" ? data.read : false,
                  raw: data
                });
              });
              notifications.value = list2;
            }, e2 => {
              console.error("Fallback notifications onSnapshot error:", e2);
            });
          }
        });
      } catch (err) {
        console.error("startNotificationsListener fatal:", err);
      }
    };

    // conversations unread listener
    const startConversationsListener = async () => {
      if (!traineeUid.value) {
        console.warn("startConversationsListener: no traineeUid yet");
        return;
      }

      if (conversationsUnsub) {
        conversationsUnsub();
        conversationsUnsub = null;
        unreadConversations.value = 0;
      }

      const convRef = collection(db, "conversations");

      const tryConvQuery = (useUnreadFilter) => {
        try {
          if (useUnreadFilter) {
            return query(convRef, where("participants", "array-contains", traineeUid.value), where(`unreadCount.${traineeUid.value}`, ">", 0));
          } else {
            return query(convRef, where("participants", "array-contains", traineeUid.value));
          }
        } catch (err) {
          console.warn("tryConvQuery build error:", err);
          return query(convRef, where("participants", "array-contains", traineeUid.value));
        }
      };

      let q = tryConvQuery(true);

      try {
        conversationsUnsub = onSnapshot(q, (snap) => {
          if (q && String(q).includes("unreadCount")) {
            unreadConversations.value = snap.size;
          } else {
            let count = 0;
            snap.forEach(d => {
              const data = d.data();
              if (data && data.unreadCount && data.unreadCount[traineeUid.value] > 0) count++;
            });
            unreadConversations.value = count;
          }
        }, (err) => {
          console.error("conversations onSnapshot error:", err);
          const msg = String(err && err.message ? err.message : err);
          if (msg.includes("index") || msg.includes("requires an index")) {
            console.warn("Firestore requires an index for this conversations query — falling back to scanning conversations for unread count.");
            if (conversationsUnsub) { conversationsUnsub(); conversationsUnsub = null; }
            q = tryConvQuery(false);
            conversationsUnsub = onSnapshot(q, (snap2) => {
              let count2 = 0;
              snap2.forEach(d => {
                const data = d.data();
                if (data && data.unreadCount && data.unreadCount[traineeUid.value] > 0) count2++;
              });
              unreadConversations.value = count2;
            }, e2 => {
              console.error("Fallback conversations onSnapshot error:", e2);
            });
          } else {
            try {
              if (conversationsUnsub) { conversationsUnsub(); conversationsUnsub = null; }
              q = tryConvQuery(false);
              conversationsUnsub = onSnapshot(q, (snap3) => {
                let cnt = 0;
                snap3.forEach(d => {
                  const data = d.data();
                  if (data && data.unreadCount && data.unreadCount[traineeUid.value] > 0) cnt++;
                });
                unreadConversations.value = cnt;
              }, e3 => {
                console.error("Second fallback conversations onSnapshot error:", e3);
              });
            } catch (e) {
              console.error("conversations listener fatal fallback error:", e);
            }
          }
        });
      } catch (err) {
        console.error("startConversationsListener fatal:", err);
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

    // ✅ عند تحميل الصفحة
    onMounted(() => {
      // اللغة
      const savedLang = localStorage.getItem("lang");
      if (savedLang) {
        locale.value = savedLang;
        document.dir = savedLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLang;
        document.body.style.fontFamily =
          savedLang === "ar" ? "'Tajawal', sans-serif" : "'Poppins', sans-serif";
      }

      // الـ dark mode
      const savedDark = localStorage.getItem("darkMode") === "true";
      isDark.value = savedDark;
      saveDark(savedDark);

      // Firebase auth
      onAuthStateChanged(auth, (user) => {
        if (user) {
          traineeUid.value = user.uid;
          fetchTraineeImage(user.uid);
          startNotificationsListener();
          startConversationsListener();
        } else {
          console.warn("No user logged in");
        }
      });
    });

    // cleanup on unmount
    onUnmounted(() => {
      if (notificationsUnsub) {
        notificationsUnsub();
        notificationsUnsub = null;
      }
      if (conversationsUnsub) {
        conversationsUnsub();
        conversationsUnsub = null;
      }
    });

    return {
      isSidebarOpen,
      toggleSidebar,
      notifications,
      unreadCount,
      showNotifications,
      toggleNotifications,
      toggleRead,
      markAllRead,
      handleNotificationClick,
      formatTime,
      traineeImage,
      handleLogout,
      showLogoutModal,
      confirmLogout,
      cancelLogout,
      unreadConversations,
      isDark,
      logoSrc,
      toggleDarkMode,
      switchLang
    };
  },
};
</script>

<style scoped>
.bg-all {
  background: #d9eeff;
}
.router-link-active {
  background-color: #83d3f7 !important;
  color: #000;
  font-weight: 600;
}
.router-link-active img {
  filter: invert(29%) sepia(83%) saturate(749%) hue-rotate(181deg) brightness(95%) contrast(90%);
}

.sidebar-unread-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #2563eb;
  display: inline-block;
  vertical-align: middle;
}

.ms-3 {
  margin-left: 0.75rem;
}
</style>
