<template>
  <div>
    <!-- Header & Search -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Sessions & Bookings</h1>
        <p class="text-gray-500">Manage all training sessions and bookings</p>
      </div>

      <!-- Search Bar -->
      <div class="relative w-full md:w-1/3">
        <img
          src="@/assets/images/ic_outline-search.png"
          alt="Search Icon"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by trainer, trainee, or sport..."
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

<!-- Table for Desktop -->
<div class="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-blue-50">
      <tr>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Trainer</th>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Trainee</th>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Sport</th>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Plan</th>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Date</th>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Amount</th>
        <th class="px-6 py-3 text-gray-600 font-medium text-left">Status</th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
      <tr v-if="filteredBookings.length === 0">
        <td colspan="7" class="text-center py-4 text-gray-500">
          No results found for "{{ searchQuery }}"
        </td>
      </tr>

      <tr
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="hover:bg-gray-50 transition"
      >
        <td class="px-6 py-4 text-gray-900">
          {{ booking.trainer?.firstName }} {{ booking.trainer?.lastName }}
        </td>
        <td class="px-6 py-4 text-gray-700">
          {{ booking.trainee?.firstName }} {{ booking.trainee?.lastName }}
        </td>
        <td class="px-6 py-4 text-gray-700">{{ booking.trainer?.sport || "N/A" }}</td>
        <td class="px-6 py-4 text-gray-700">{{ booking.plan?.title || "N/A" }}</td>
        <td class="px-6 py-4 text-gray-700">{{ formatDate(booking.createdAt?.seconds) }}</td>
        <td class="px-6 py-4 text-gray-700">{{ booking.amount }} {{ booking.currency }}</td>

        <td class="px-6 py-4">
          <span
            class="px-3 py-1 text-xs font-medium rounded-full capitalize"
            :class="{
              'bg-green-100 text-green-700': booking.status === 'paid',
              'bg-yellow-100 text-yellow-700': booking.status === 'pending',
              'bg-red-100 text-red-700': booking.status === 'cancelled',
            }"
          >
            {{ booking.status }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      

   <!-- Mobile Cards -->
<div class="md:hidden flex flex-col gap-4">
  <div
    v-for="booking in filteredBookings"
    :key="booking.id"
    class="relative border-4 border-blue-100 p-4 rounded-lg shadow-sm bg-white "
  >
    <!-- Status Badge Top Right -->
    <span
      class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
      :class="{
        'text-green-600 bg-green-100': booking.status === 'paid',
        'text-yellow-600 bg-yellow-100': booking.status === 'pending',
        'text-red-600 bg-red-100': booking.status === 'cancelled'
      }"
    >
      {{ booking.status }}
    </span>

    <!-- Booking Details -->
    <p><span class="font-semibold m-2">Trainer:</span> {{ booking.trainer?.firstName }} {{ booking.trainer?.lastName }}</p>
    <p><span class="font-semibold m-2">Trainee:</span> {{ booking.trainee?.firstName }} {{ booking.trainee?.lastName }}</p>
    <p><span class="font-semibold m-2">Sport:</span> {{ booking.trainer?.sport || "N/A" }}</p>
    <p><span class="font-semibold m-2">Plan:</span> {{ booking.plan?.title || "N/A" }}</p>
    <p><span class="font-semibold m-2">Date:</span> {{ formatDate(booking.createdAt?.seconds) }}</p>
    <p><span class="font-semibold m-2">Amount:</span> {{ booking.amount }} {{ booking.currency }}</p>
  </div>
</div>


    <div v-if="loading" class="text-center mt-6">Loading bookings...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig.js";

const bookings = ref([]);
const loading = ref(true);
const searchQuery = ref("");

const filteredBookings = computed(() => {
  if (!searchQuery.value) return bookings.value;
  const q = searchQuery.value.toLowerCase();
  return bookings.value.filter((b) => {
    const trainerName = `${b.trainer?.firstName || ""} ${b.trainer?.lastName || ""}`.toLowerCase();
    const traineeName = `${b.trainee?.firstName || ""} ${b.trainee?.lastName || ""}`.toLowerCase();
    const sport = b.trainer?.sport?.toLowerCase() || "";
    return trainerName.includes(q) || traineeName.includes(q) || sport.includes(q);
  });
});

const fetchBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    bookings.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBookings);

const formatDate = (seconds) => {
  if (!seconds) return "";
  const date = new Date(seconds * 1000);
  return date.toLocaleDateString();
};
</script>
