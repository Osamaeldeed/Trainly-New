<template>
  <div>
    <!-- 🔹 Navbar -->
    <nav class="top-0 z-50 w-full bg-white shadow-sm">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <!-- Sidebar Toggle Button -->
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              @click="toggleSidebar"
              type="button"
              class="inline-flex items-center justify-center p-2 text-gray-600 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200 lg:hidden"
            >
              <svg
                class="w-6 h-6"
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

          <!-- Admin Profile -->
          <div class="flex items-center">
            <div class="flex items-center gap-5">
              <div>
                <button
                  type="button"
                  class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <img
                    class="w-8 h-8 rounded-full"
                    :src="adminImage || 'https://media1.tenor.com/m/IfbOs_yh89AAAAAC/loading-buffering.gif'"
                    alt="admin photo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 🔹 Overlay when sidebar is open -->
    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-opacity-40 z-30 lg:hidden"
        @click="closeSidebar"
      ></div>
    </transition>

    <!-- 🔹 Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 bg-[#D9EEFF] shadow-lg rounded-tr-3xl overflow-y-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
      ]"
    >
       <div class="h-full px-3 py-4">
        <ul class="space-y-4 font-light text-[14px] mx-5">
          <li class="mb-11 mt-3 mx-2">
            <img
              src="@/assets/images/Project LOGO.png"
              class="h-8 w-25 me-3"
              alt="Logo"
            />
          </li>

          <!-- Menu Items -->
          <li>
            <router-link
              to="/admin/overview"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition duration-200"
            >
              <img src="@/assets/images/overview.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Overview</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/managetrainers"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition duration-200"
            >
              <img src="@/assets/images/manage-trainers.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Manage Trainers</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/managetrainees"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition duration-200"
            >
              <img src="@/assets/images/manage-trainees.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Manage Trainees</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/bookings"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition duration-200"
            >
              <img src="@/assets/images/bookings.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Bookings</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/payments"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition duration-200"
            >
              <img src="@/assets/images/payments.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Payments</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/admin/reviews"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition duration-200"
            >
              <img src="@/assets/images/carbon_star-review.png" alt="" class="w-5 h-5" />
              <span class="ms-3">Reviews & Feedback</span>
            </router-link>
          </li>

          <!-- Logout -->
          <li>
            <button
              @click="handleLogout"
              class="flex items-center p-2 text-red-600 rounded-lg hover:bg-red-100 w-full transition duration-200 cursor-pointer"
            >
              <img src="@/assets/images/logout.png" alt="logout icon" class="w-5 h-5" />
              <span class="ms-3">Log out</span>
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

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "@/Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal.vue";

const router = useRouter();
const isSidebarOpen = ref(false);
const showLogoutModal = ref(false);
const adminImage = ref(null);
const adminName = ref("Admin");

// 🔹 Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

// 🔹 Fetch Admin Data
onMounted(async () => {
  const user = auth.currentUser;

  if (!user) {
    router.push("/login");
    return;
  }

  const userDocRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    // لو ملهوش Document
    router.push("/login");
    return;
  }

  const data = userSnap.data();

  // ✅ تأكد إنه Admin
  if (data.role !== "admin") {
    router.push("/login");
    return;
  }

  adminImage.value = data.profilePicture || null;
  adminName.value = `${data.firstName} ${data.lastName}`;
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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
