<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Sessions & Bookings</h1>
    <p class="text-gray-500 mb-6">Manage all training sessions and bookings</p>

    <div class="bg-white rounded-xl shadow p-4">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="border-b text-gray-600">
            <th class="py-3 text-left">Trainer</th>
            <th class="py-3 text-left">Trainee</th>
            <th class="py-3 text-left">Sport</th>
            <th class="py-3 text-left">Date</th>
            <th class="py-3 text-left">Amount</th>
            <th class="py-3 text-left">Status</th>
            <th class="py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="booking in bookings"
            :key="booking.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="py-3">{{ booking.trainer?.firstName }} {{ booking.trainer?.lastName }}</td>
            <td class="py-3">{{ booking.trainee?.firstName }} {{ booking.trainee?.lastName }}</td>
            <td class="py-3">{{ booking.trainer?.sport || "N/A" }}</td>
            <td class="py-3">{{ formatDate(booking.createdAt?.seconds) }}</td>
            <td class="py-3">{{ booking.amount }} {{ booking.currency }}</td>
            <td>
              <span
                :class="{
                  'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium': booking.status === 'paid',
                  'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium': booking.status === 'pending',
                  'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium': booking.status === 'cancelled'
                }"
              >
                {{ booking.status }}
              </span>
            </td>
            <td class="py-3">
              <button
                class="text-blue-500 underline"
                @click="viewBooking(booking)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="text-center mt-6">Loading bookings...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig.js";

const bookings = ref([]);
const loading = ref(true);

const fetchBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    bookings.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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

const viewBooking = (booking) => {
  console.log("Stripe Session:", booking.stripeSessionId);
};
</script>
