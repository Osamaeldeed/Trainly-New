<template>
  <div class="bg-white min-h-screen dark:bg-black w-full p-6 relative">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl dark:text-white font-medium text-gray-900">Manage Trainees</h1>
      <p class="text-gray-500 dark:text-gray-300 mt-1">View and manage all registered trainees</p>
    </header>

    <!-- Controls -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      <h2 class="text-lg font-medium dark:text-white text-gray-900">Trainees List</h2>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div class="relative w-full md:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search trainees..."
            class="w-full px-4 py-2 bg-white border dark:bg-[#3b3b3b] dark:text-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block bg-white dark:bg-[#292929] shadow-lg rounded-xl overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-50 dark:bg-[#292929] ">
          <tr>
            <th class="px-6 py-3 dark:text-white text-gray-600 font-medium text-left">Trainee</th>
            <th class="px-6 py-3 dark:text-white text-gray-600 font-medium text-center">Email</th>
            <th class="px-6 py-3 dark:text-white text-gray-600 font-medium text-center">Joined</th>
            <th class="px-6 py-3 dark:text-white text-gray-600 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="trainee in filteredTrainees"
            :key="trainee.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-600 transition"
          >
            <td class="px-5 py-4 flex items-center gap-3">
              <div class="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm uppercase overflow-hidden">
                <img v-if="trainee.profilePicture" :src="trainee.profilePicture" alt="Profile" class="w-full h-full object-cover" />
                <span v-else>{{ getInitials(trainee.name) }}</span>
              </div>
              <span class="font-medium dark:text-white text-gray-900">{{ trainee.name }}</span>
            </td>
            <td class="px-6 py-4 text-gray-700 dark:text-white text-center align-middle gap-0">
              {{ trainee.email || "-" }}
            </td>
            <td class="px-6 py-4 text-gray-700 dark:text-white text-center align-middle">
              {{ trainee.joined || "-" }}
            </td>
            <td class="px-6 py-4 text-center align-middle">
              <button
                @click="openDeleteModal(trainee)"
                class="text-red-500 hover:text-red-700 text-m cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#3b3b3b] rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center">
        <h3 class="text-lg font-semibold dark:text-white text-gray-900 mb-3">
          Confirm Deletion
        </h3>
        <p class="text-gray-600 dark:text-gray-200 mb-3">
          Are you sure you want to delete <strong>{{ traineeToDelete?.name }}</strong>?
        </p>

        <!-- Reason Input -->
        <textarea
          v-model="deleteReason"
          placeholder="Reason for deletion"
          class="w-full p-2 border rounded-lg dark:bg-[#292929] dark:text-white mb-5 focus:outline-none focus:ring-2 focus:ring-red-400"
        ></textarea>

        <div class="flex justify-center gap-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 rounded-lg cursor-pointer border dark:hover:bg-gray-600 dark:text-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white hover:bg-red-700"
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
const showDeleteModal = ref(false);
const traineeToDelete = ref(null);
const deleteReason = ref("");

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
    return (
      (t.name || "").toLowerCase().includes(q) ||
      (t.email || "").toLowerCase().includes(q)
    );
  })
);

const openDeleteModal = (trainee) => {
  traineeToDelete.value = trainee;
  deleteReason.value = ""; // reset reason
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!traineeToDelete.value) return;

  // ✅ Validate reason
  if (!deleteReason.value.trim()) {
    alert("Please provide a reason for deletion.");
    return;
  }

  try {
    // Delete trainee from Firestore
    await deleteDoc(doc(db, "users", traineeToDelete.value.id));
    trainees.value = trainees.value.filter(
      (t) => t.id !== traineeToDelete.value.id
    );

    // Send email to trainee about deletion
    await fetch("https://YOUR_BACKEND_URL/send-review-deletion-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        traineeEmail: traineeToDelete.value.email,
        traineeName: traineeToDelete.value.name,
        reason: deleteReason.value,
      }),
    });

    console.log("✅ Trainee deletion email sent successfully");
  } catch (error) {
    console.error("❌ Error deleting trainee or sending email:", error);
  }

  showDeleteModal.value = false;
  traineeToDelete.value = null;
  deleteReason.value = ""; // reset reason
};

  


onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    trainees.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
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
