<template>
  <div class=" bg-white min-h-screen w-[101%]">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-medium text-gray-900 dark:text-white">
        Manage Trainers
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        View and manage all registered trainers
      </p>
    </header>

    <!-- Search & Filter -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
    >
      <h2 class="text-xl font-medium text-gray-900">Trainers List</h2>
      <div class="flex gap-3 w-full md:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search trainers..."
          class="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          
        />
        <select
          v-model="filterStatus"
          class="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-lg rounded-xl overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-50">
          <tr>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">
              Trainer
            </th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Sport</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Email</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">
              Rating
            </th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">
              Clients
            </th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">
              Status
            </th>
            <th class="px-6 py-3 text-gray-600 font-medium text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="trainer in filteredTrainers"
            :key="trainer.id"
            class="hover:bg-gray-50 transition"
          >
            <!-- Trainer -->
            <td class="px-6 py-4 flex items-center gap-3">
              <div
                v-if="trainer.photoURL"
                class="w-12 h-12 rounded-full overflow-hidden shadow-sm"
              >
                <img
                  :src="trainer.photoURL"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold uppercase shadow-sm"
              >
                {{ getInitials(trainer.firstName, trainer.lastName) }}
              </div>
              <div class="w-25">
                <p class="font-medium  text-gray-700">
                  {{ trainer.firstName }} {{ trainer.lastName }}
                </p>
             
              </div>
            </td>

            <!-- Sport & Email -->
            <td class="px-6 py-4  text-gray-700">{{ trainer.sport || "-" }}</td>
            <td class="px-6 py-4  text-gray-700">{{ trainer.email }}</td>

            <!-- Rating -->
            <td class="px-6 py-4 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927C9.349 2.02 10.65 2.02 10.951 2.927l1.286 3.957a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.907-.755 1.658-1.54 1.118l-3.373-2.455a1 1 0 00-1.175 0l-3.373 2.455c-.785.54-1.84-.21-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.285-3.957z"
                />
              </svg>
              <span class="ml-1 text-gray-700 ">{{ trainer.rating }}</span>
            </td>

            <!-- Clients -->
            <td class="px-6 py-4">
              <span
                class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-center text-sm w-10 inline-block"
              >
                {{ trainer.clients || 0 }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-blue-500 text-white': trainer.status === 'active',
                  'bg-gray-200 text-gray-700': trainer.status === 'pending',
                  'bg-red-100 text-red-700': trainer.status === 'suspended',
                }"
              >
                {{ trainer.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 text-right relative">
              <button
                @click="toggleMenu(trainer.id)"
                class="text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
              >
                ⋮
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="openMenuId === trainer.id"
                class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              >
                <button
                  @click="viewAccount(trainer)"
                  class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  View Account
                </button>
                <button
                  @click="deleteTrainer(trainer)"
                  class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { db } from "@/Firebase/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

// State
const trainers = ref([]);
const searchQuery = ref("");
const filterStatus = ref("");

// State للتحكم في أي قائمة مفتوحة
const openMenuId = ref(null);

// Helper: get initials
const getInitials = (firstName, lastName) =>
  (firstName?.[0] || "") + (lastName?.[0] || "");

// Computed: filtered trainers based on search & status
const filteredTrainers = computed(() =>
  trainers.value.filter((trainer) => {
    const matchName = `${trainer.firstName} ${trainer.lastName}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchStatus = filterStatus.value
      ? trainer.status === filterStatus.value
      : true;
    return matchName && matchStatus;
  })
);

// فتح/إغلاق المينيو
const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

// View Account action
const viewAccount = (trainer) => {
  console.log("View Account:", trainer);
  openMenuId.value = null;
  // هنا ممكن تعمل توجيه للصفحة الخاصة بالمدرب
};

// Delete Trainer action
const deleteTrainer = async (trainer) => {
  const confirmed = confirm(
    `Are you sure you want to delete ${trainer.firstName}?`
  );
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, "users", trainer.id));
    trainers.value = trainers.value.filter((t) => t.id !== trainer.id);
    alert("Trainer deleted successfully.");
  } catch (error) {
    console.error("Error deleting trainer:", error);
  }
  openMenuId.value = null;
};

// Fetch trainers, bookings, reviews
onMounted(async () => {
  try {
    const trainersSnapshot = await getDocs(collection(db, "users"));
    const bookingsSnapshot = await getDocs(collection(db, "bookings"));
    const reviewsSnapshot = await getDocs(collection(db, "reviews"));

    const allTrainers = trainersSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((user) => user.role === "trainer");

    const bookings = bookingsSnapshot.docs.map((doc) => doc.data());
    const reviews = reviewsSnapshot.docs.map((doc) => doc.data());

    allTrainers.forEach((trainer) => {
      // عدد العملاء
      const trainerBookings = bookings.filter(
        (b) => b.trainerId === trainer.uid || b.trainerId === trainer.id
      );
      trainer.clients = trainerBookings.length;

      // جميع الريفيوهات للمدرب
      const trainerReviews = reviews.filter(
        (r) => r.trainerId === trainer.uid || r.trainerId === trainer.id
      );
      trainer.reviewsCount = trainerReviews.length;

      // التقييم المتوسط
      if (trainerReviews.length > 0) {
        const totalRating = trainerReviews.reduce(
          (sum, r) => sum + (r.rating || 0),
          0
        );
        trainer.rating = (totalRating / trainerReviews.length).toFixed(1);
      } else {
        trainer.rating = "-";
      }
    });

    trainers.value = allTrainers;
  } catch (error) {
    console.error("Error fetching trainers:", error);
  }
});
</script>
