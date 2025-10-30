<template>
  <div>
    <nav class="top-0 z-50 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <!-- ✅ زرار السايد بار (شغال بVue) -->
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

          <!-- باقي الناف زي ما هو -->
          <div class="flex items-center">
            <div class="flex items-center ms-3 gap-[40px]">
              <div class="hidden md:block">
                <img
                  src="@/assets/images/mingcute_notification-line.png"
                  alt=""
                  class="w-7 h-7"
                />
              </div>

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
                      traineeImage ||
                      'https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif'
                    "
                    alt="user photo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- ✅ Overlay أبيض شفاف -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 filter backdrop-blur-sm bg-opacity-70 z-30 lg:hidden transition-all duration-300"
      @click="toggleSidebar"
    ></div>

    <!-- ✅ سايد بار متجاوب -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 w-65 h-screen bg-all transition-transform duration-300 ease-in-out rounded-tr-4xl',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:block'
      ]"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <ul class="space-y-4 font-light text-[14px] mx-5">
          <!-- ✅ Logo -->
          <li class="mb-8 mt-3 mx-2">
            <img src="@/assets/images/Project LOGO.png" class="h-8 w-25 me-3" alt="Logo" />
          </li>

          <!-- ✅ Back to Home Button -->
          <li class="mb-6">
            <router-link
              to="/traineehome"
              class="flex items-center p-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md"
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
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/fluent_people-24-filled.png" alt="" class="w-5 h-5" />
              <span class="ms-3">My trainers</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/traineeplans"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/grommet-icons_plan.png" alt="" class="w-5 h-5" />
              <span class="ms-3">My Plans</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/traineeinbox"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/wpf_message-outline.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Inbox</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/trainee/settings"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <img src="@/assets/images/mdi_settings-outline.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Settings</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/trainee/customerservice"
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-200 transition duration-300"
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
import { ref, onMounted } from "vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal.vue";

export default {
  name: "SideBarTrainee",
  components: { ConfirmLogoutModal },
  setup() {
    const isSidebarOpen = ref(false);

    const traineeImage = ref("");
    const showLogoutModal = ref(false);
    const db = getFirestore();
    const auth = getAuth();
    const router = useRouter();



    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const fetchTraineeImage = async (uid) => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          traineeImage.value =
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
        if (user) fetchTraineeImage(user.uid);
      });
    });

    return {
      isSidebarOpen,
      toggleSidebar,
      traineeImage,
      handleLogout,
      showLogoutModal,
      confirmLogout,
      cancelLogout,
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
</style>
