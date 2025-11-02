<template>
  <div>
    <!-- ✅ Navbar -->
    <nav class="top-0 z-50 w-full bg-white shadow-sm">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <!-- 🔹 Sidebar Toggle Button -->
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center justify-center p-2 text-gray-600 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>

          <!-- 🔹 Overlay -->
          <div
            v-if="isSidebarOpen"
            class="fixed inset-0 filter backdrop-blur-sm bg-opacity-80 z-30 lg:hidden transition-all duration-300"
            @click="toggleSidebar"
          ></div>

          <!-- Right Side: Notifications + Profile -->
          <div class="flex items-center">
            <div class="flex items-center ms-3 gap-[24px]">
             
            

              <!-- 👤 Admin Profile -->
              <div>
                <button
                  type="button"
                  class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <img
                    class="w-8 h-8 rounded-full"
                    :src="
                      adminImage ||
                      'https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif'
                    "
                    alt="admin photo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- ✅ Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 w-65 h-screen transition-transform duration-300 bg-all rounded-tr-4xl overflow-y-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
      ]"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4">
        <ul class="space-y-4 font-light text-[14px] mx-5">
          <li class="mb-11 mt-3 mx-2">
            <img src="@/assets/images/Project LOGO.png" class="h-8 w-25 me-3" alt="Logo" />
          </li>

          <!-- Menu Items -->
          <li>
            <router-link
              to="/admin/overview"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/overview.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Overview</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/managetrainers"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/manage-trainers.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Manage Trainers</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/managetrainees"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/manage-trainees.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Manage Trainees</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/bookings"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/bookings.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Bookings</span>
              
              <!-- Unread indicator for bookings (if needed) -->
              <span
                v-if="unreadBookings > 0"
                class="sidebar-unread-dot ms-3"
                :title="unreadBookings + ' unread'"
              ></span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/payments"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/payments.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Payments</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/reviews"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/carbon_star-review.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Reviews & Feedback</span>
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
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal.vue";

export default {
  name: "AdminSidebar",
  components: { ConfirmLogoutModal },
  setup() {
    const adminImage = ref("");
    const showLogoutModal = ref(false);
    const isSidebarOpen = ref(false);

    // notifications
    const notifications = ref([]);
    const showNotifications = ref(false);
    const adminUid = ref(null);
    let notificationsUnsub = null;

    // unread bookings indicator (optional - add if needed)
    const unreadBookings = ref(0);
    let bookingsUnsub = null;

    const db = getFirestore();
    const auth = getAuth();
    const router = useRouter();

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
    };

    const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length);

    // fetch admin image
    const fetchAdminImage = async (uid) => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await (await import("firebase/firestore")).getDoc(docRef).catch((e) => {
          throw e;
        });
        if (docSnap && docSnap.exists && docSnap.exists()) {
          adminImage.value =
            docSnap.data().profilePicture ||
            "https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif";
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
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

    // mark single note read
    const markReadLocal = (noteId) => {
      const idx = notifications.value.findIndex((n) => n.id === noteId);
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
      const unread = notifications.value.filter((n) => !n.read);
      for (const n of unread) {
        try {
          await updateDoc(doc(db, "notifications", n.id), { read: true });
        } catch (err) {
          console.error("markAllRead error for", n.id, err);
          if (err.code === "permission-denied") {
            notifications.value = notifications.value.map((x) => ({ ...x, read: true }));
            return;
          }
        }
      }
      notifications.value = notifications.value.map((n) => ({ ...n, read: true }));
    };

    const handleNotificationClick = async (note) => {
      if (!note) return;
      if (!note.read) await toggleRead(note);
      try {
        // Route to appropriate admin page based on notification
        router.push({ name: "adminBookings" });
      } catch (err) {
        console.warn("Ignored error:", err);
      }
    };

    // start listener for notifications
    const startNotificationsListener = async () => {
      if (!adminUid.value) {
        console.warn("startNotificationsListener: no adminUid yet");
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
            return query(
              notRef,
              where("userId", "==", adminUid.value),
              orderBy("createdAt", "desc"),
              limit(100),
            );
          } else {
            return query(notRef, where("userId", "==", adminUid.value), limit(100));
          }
        } catch (err) {
          console.warn("tryQuery build error:", err);
          return query(notRef, where("userId", "==", adminUid.value), limit(100));
        }
      };

      let q = tryQuery(true);

      try {
        notificationsUnsub = onSnapshot(
          q,
          (snap) => {
            const list = [];
            snap.forEach((d) => {
              const data = d.data();
              list.push({
                id: d.id,
                title: data.title || data.t || "",
                message:
                  data.message ||
                  data.massage ||
                  data.msg ||
                  data.massageText ||
                  data.massage_text ||
                  data.massageMessage ||
                  "",
                createdAt: data.createdAt || data.time || null,
                read: typeof data.read === "boolean" ? data.read : false,
                raw: data,
              });
            });
            notifications.value = list;
          },
          (err) => {
            console.error("notifications onSnapshot error:", err);
            const msg = String(err && err.message ? err.message : err);
            if (msg.includes("index") || msg.includes("requires an index")) {
              console.warn(
                "Firestore requires a composite index for this query — falling back to query without orderBy.",
              );
              if (notificationsUnsub) {
                notificationsUnsub();
                notificationsUnsub = null;
              }
              q = tryQuery(false);
              notificationsUnsub = onSnapshot(
                q,
                (snap2) => {
                  const list2 = [];
                  snap2.forEach((d) => {
                    const data = d.data();
                    list2.push({
                      id: d.id,
                      title: data.title || data.t || "",
                      message: data.message || data.massage || data.msg || "",
                      createdAt: data.createdAt || data.time || null,
                      read: typeof data.read === "boolean" ? data.read : false,
                      raw: data,
                    });
                  });
                  notifications.value = list2;
                },
                (e2) => {
                  console.error("Fallback notifications onSnapshot error:", e2);
                },
              );
            }
          },
        );
      } catch (err) {
        console.error("startNotificationsListener fatal:", err);
      }
    };

    // cleanup on unmount
    onUnmounted(() => {
      if (notificationsUnsub) {
        notificationsUnsub();
        notificationsUnsub = null;
      }
      if (bookingsUnsub) {
        bookingsUnsub();
        bookingsUnsub = null;
      }
    });

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
          adminUid.value = user.uid;
          fetchAdminImage(user.uid);
          startNotificationsListener();
        } else {
          console.warn("No admin user logged in");
        }
      });
    });

    return {
      adminImage,
      handleLogout,
      showLogoutModal,
      confirmLogout,
      cancelLogout,
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
      unreadBookings,
    };
  },
};
</script>

<style scoped>
.bg-all {
  background: #d9eeff;
}
.router-link-active {
  background-color: #83d3f7;
  color: #000;
  font-weight: 600;
}
.router-link-active img {
  filter: invert(29%) sepia(83%) saturate(749%) hue-rotate(181deg) brightness(95%) contrast(90%);
}

/* small blue dot for unread indicator */
.sidebar-unread-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #2563eb; /* blue-600 */
  display: inline-block;
  vertical-align: middle;
}

/* spacing helper */
.ms-3 {
  margin-left: 0.75rem;
}
</style>