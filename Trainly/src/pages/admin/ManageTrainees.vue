<template>
  <div class="bg-white min-h-screen w-full p-6 relative">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-medium text-gray-900">Manage Trainees</h1>
      <p class="text-gray-500 mt-1">View and manage all registered trainees</p>
    </header>

    <!-- Controls -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      <h2 class="text-lg font-medium text-gray-900">Trainees List</h2>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <!-- Search -->
        <div class="relative w-full md:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search trainees..."
            class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

    
      </div>
    </div>

    <!-- 🖥️ Desktop Table -->
    <div class="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden ">
     <table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-blue-50">
    <tr>
      <th class="px-6 py-3 text-gray-600 font-medium text-left">Trainee</th>
      <th class="px-6 py-3 text-gray-600 font-medium text-center">Email</th>
      <th class="px-6 py-3 text-gray-600 font-medium text-center">Joined</th>
      <th class="px-6 py-3 text-gray-600 font-medium text-center">Actions</th>
    </tr>
  </thead>

  <tbody class="divide-y divide-gray-200">
    <tr
      v-for="trainee in filteredTrainees"
      :key="trainee.id"
      class="hover:bg-gray-50 transition"
    >
      <!-- Trainee -->
      <td class="px-5 py-4 flex items-center gap-3">
        <div
          class="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm uppercase overflow-hidden"
        >
          <img
            v-if="trainee.profilePicture"
            :src="trainee.profilePicture"
            alt="Profile"
            class="w-full h-full object-cover"
          />
          <span v-else>{{ getInitials(trainee.name) }}</span>
        </div>
        <span class="font-medium text-gray-900">{{ trainee.name }}</span>
      </td>

      <!-- Email -->
      <td class="px-6 py-4 text-gray-700 text-center align-middle gap-0">
        {{ trainee.email || "-" }}
      </td>

      <!-- Joined -->
      <td class="px-6 py-4 text-gray-700 text-center align-middle">
        {{ trainee.joined || "-" }}
      </td>

      <!-- Actions -->
      <td class="px-6 py-4 text-center align-middle">
        <button
          @click="openDeleteModal(trainee)"
          class="text-red-500 hover:text-red-700 text-m"
        >
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>

    </div>

    <!-- 📱 Mobile Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
      <div
        v-for="trainee in filteredTrainees"
        :key="trainee.id"
        class="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
      >
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold overflow-hidden"
          >
            <img
              v-if="trainee.profilePicture"
              :src="trainee.profilePicture"
              alt="Profile"
              class="w-full h-full object-cover"
            />
            <span v-else>{{ getInitials(trainee.name) }}</span>
          </div>
          <div>
            <p class="font-medium text-gray-900">{{ trainee.name }}</p>
            <p class="text-sm text-gray-500">{{ trainee.email }}</p>
          </div>
        </div>
        <p class="text-sm text-gray-600 mb-2">
          <strong>Status:</strong>
          <span
            class="ml-1 px-2 py-0.5 rounded-full text-xs"
            :class="{
              'bg-blue-500 text-white': trainee.status === 'active',
              'bg-gray-300 text-gray-700': trainee.status !== 'active',
            }"
          >
            {{ trainee.status }}
          </span>
        </p>
        <div class="flex justify-end mt-3 gap-2">
          <button
            @click="openDeleteModal(trainee)"
            class="text-red-600 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- 🧊 Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          Confirm Deletion
        </h3>
        <p class="text-gray-600 mb-5">
          Are you sure you want to delete <strong>{{ traineeToDelete?.name }}</strong>?
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { db } from "@/Firebase/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const trainees = ref([]);
const searchQuery = ref("");
const selectedStatus = ref(null);
const showDeleteModal = ref(false);
const traineeToDelete = ref(null);


const getInitials = (name) => {
  if (!name) return "--";
  const parts = name.split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();
};

const filteredTrainees = computed(() =>
  trainees.value.filter((t) => {
    const q = searchQuery.value.toLowerCase();
    const matchesSearch =
      (t.name || "").toLowerCase().includes(q) ||
      (t.email || "").toLowerCase().includes(q);
    const matchesStatus =
      !selectedStatus.value || t.status === selectedStatus.value;
    return matchesSearch && matchesStatus;
  })
);

const openDeleteModal = (trainee) => {
  traineeToDelete.value = trainee;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!traineeToDelete.value) return;
  try {
    await deleteDoc(doc(db, "users", traineeToDelete.value.id));
    trainees.value = trainees.value.filter(
      (t) => t.id !== traineeToDelete.value.id
    );
  } catch (error) {
    console.error("Error deleting trainee:", error);
  }
  showDeleteModal.value = false;
  traineeToDelete.value = null;
};

// ✅ Fetch trainees
onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    trainees.value = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((u) => u.role === "trainee")
      .map((u) => ({
        id: u.id,
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown",
        email: u.email || "-",
        joined: u.createdAt
          ? new Date(u.createdAt.seconds * 1000).toLocaleDateString()
          : "-",
        profilePicture: u.profilePicture || null,
        status: u.status || "active",
      }));
  } catch (error) {
    console.error("Error fetching trainees:", error);
  }
});
</script>
