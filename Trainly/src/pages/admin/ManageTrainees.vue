<template>
  <div class=" bg-white min-h-screen w-[101%]">
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

        <!-- Status Filter -->
        <div class="relative">
          <button
            @click="toggleStatusDropdown"
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <span>{{ selectedStatusLabel }}</span>
            <span>▼</span>
          </button>

          <div
            v-if="showStatusDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
          >
            <button
              @click="selectStatus(null)"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              All Status
            </button>
            <button
              @click="selectStatus('active')"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Active
            </button>
            <button
              @click="selectStatus('inactive')"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Inactive
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-lg rounded-xl overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-50">
          <tr>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Trainee</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Email</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Joined</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Sessions</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Plan</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-left">Status</th>
            <th class="px-6 py-3 text-gray-600 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="trainee in filteredTrainees"
            :key="trainee.id"
            class="hover:bg-gray-50 transition"
          >
            <!-- Trainee initials only -->
            <td class="px-6 py-4 flex items-center gap-3">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm uppercase"
              >
                {{ getInitials(trainee.name) }}
              </div>
              <span class="font-medium text-gray-900 w-25">
                {{ trainee.name || "-" }}
              </span>
            </td>

            <td class="px-6 py-4 text-gray-700 ">{{ trainee.email || "-" }}</td>
            <td class="px-6 py-4 text-gray-700 ">{{ trainee.joined || "-" }}</td>
            <td class="px-6 py-4 text-gray-700">{{ trainee.sessions || 0 }}</td>
            <td class="px-6 py-4 text-gray-700">{{ trainee.planTitle || "-" }}</td>

            <td class="px-6 py-4">
              <span
                class="px-3 py-1 text-xs font-medium rounded-full capitalize"
                :class="{
                  'bg-blue-500 text-white': trainee.status === 'active',
                  'bg-gray-300 text-gray-700': trainee.status !== 'active',
                }"
              >
                {{ trainee.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right relative">
              <button
                @click="toggleMenu(trainee.id)"
                class="text-gray-500 hover:text-gray-700 text-lg"
              >
                ⋮
              </button>

              <div
                v-if="openMenuId === trainee.id"
                class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              >
                <button
                  @click="viewAccount(trainee)"
                  class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  View Account
                </button>
                <button
                  @click="deleteTrainee(trainee)"
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

const trainees = ref([]);
const searchQuery = ref("");
const openMenuId = ref(null);
const showStatusDropdown = ref(false);
const selectedStatus = ref(null);

const selectedStatusLabel = computed(() =>
  selectedStatus.value
    ? selectedStatus.value.charAt(0).toUpperCase() + selectedStatus.value.slice(1)
    : "All Status"
);

const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
};

const selectStatus = (status) => {
  selectedStatus.value = status;
  showStatusDropdown.value = false;
};

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

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

const viewAccount = (trainee) => {
  console.log("View Account:", trainee);
  openMenuId.value = null;
};

const deleteTrainee = async (trainee) => {
  const confirmed = confirm(`Are you sure you want to delete ${trainee.name}?`);
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, "users", trainee.id));
    trainees.value = trainees.value.filter((t) => t.id !== trainee.id);
    alert("Trainee deleted successfully.");
  } catch (error) {
    console.error("Error deleting trainee:", error);
  }
  openMenuId.value = null;
};

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, "bookings"));
    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const traineesMap = {};

    bookings.forEach((b) => {
      const trainee = b.trainee || {};
      const plan = b.plan || {};

      const id = trainee.uid || trainee.traineeId;
      if (!id) return;

      if (!traineesMap[id]) {
        traineesMap[id] = {
          id,
          name:
            `${trainee.firstName || ""} ${trainee.lastName || ""}`.trim() ||
            "Unknown",
          email: trainee.email || "-",
          joined: trainee.createdAt
            ? new Date(trainee.createdAt.seconds * 1000).toLocaleDateString()
            : "-",
          sessions: plan.sessions || 0,
          planTitle: plan.title || "—",
          status: trainee.status || "active",
        };
      } else {
        traineesMap[id].sessions += plan.sessions || 0;
      }
    });

    trainees.value = Object.values(traineesMap);
  } catch (error) {
    console.error("Error fetching trainees:", error);
  }
});
</script>
