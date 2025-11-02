<template>
  <div class="p-4">
    <!-- Heading + Search Bar -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Payments & Subscriptions</h1>
        <p class="text-gray-500">Manage all transactions for trainees and trainers</p>
      </div>

      <div class="relative w-full md:w-1/3">
        <img
          src="@/assets/images/ic_outline-search.png"
          alt="Search Icon"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by user, type, or plan..."
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- Table for medium+ screens -->
    <div class="hidden md:block bg-white rounded-xl shadow border-2 border-[#0D8BF2] overflow-x-auto">
      <div class="overflow-y-auto max-h-[600px]">
        <table class="min-w-full table-auto text-sm border-collapse">
          <thead class="bg-[#D9EEFF]">
            <tr class="border-b border-[#0D8BF2] text-black">
              <th class="py-3 px-2 text-left">Transaction ID</th>
              <th class="py-3 px-2 text-left">User</th>
              <th class="py-3 px-2 text-left">Type</th>
              <th class="py-3 px-2 text-left">Plan</th>
              <th class="py-3 px-2 text-left">Amount</th>
              <th class="py-3 px-2 text-left">Payment Method</th>
              <th class="py-3 px-2 text-left">Status</th>
              <th class="py-3 px-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="9" class="text-center py-4 text-gray-500">
                No results found for "{{ searchQuery }}"
              </td>
            </tr>

            <tr
              v-for="(tx) in filteredTransactions"
              :key="tx.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="py-3 px-2 relative group cursor-pointer">
                {{ tx.transactionId?.slice(0, 8) || "N/A" }}
                <div
                  class="absolute left-0 -top-8 md:-top-8 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                >
                  {{ tx.transactionId }}
                </div>
              </td>
              <td class="py-3 px-2">{{ tx.userName }}</td>
              <td class="py-3 px-2">{{ tx.type }}</td>
              <td class="py-3 px-2">{{ tx.planTitle || "N/A" }}</td>
              <td class="py-3 px-2">{{ tx.amount }} {{ tx.currency }}</td>
              <td class="py-3 px-2">{{ tx.paymentMethod }}</td>
              <td class="py-3 px-2">
                <span
                  :class="{
                    'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium': tx.status === 'paid' || tx.status === 'active',
                    'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium': tx.status === 'pending',
                    'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium': tx.status === 'cancelled' || tx.status === 'inactive'
                  }"
                >
                  {{ tx.status }}
                </span>
              </td>
              <td class="py-3 px-2">{{ formatDate(tx.date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Card layout for small screens -->
    <div class="md:hidden flex flex-col gap-4">
      <div
        v-for="(tx) in filteredTransactions"
        :key="tx.id"
        class="bg-white shadow rounded-lg p-4 border-4 border-[#0D8BF2] relative group"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="font-bold"><span class="font-bold">User:</span> {{ tx.userName }}</div>
          <span class="text-gray-400 text-xs cursor-pointer">
            ID: {{ tx.transactionId?.slice(0, 8) || "N/A" }}
            <div
              class="absolute left-4 -top-6 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
            >
              {{ tx.transactionId }}
            </div>
          </span>
        </div>
        <div class="flex flex-col gap-1 text-sm">
          <div><span class="font-medium">Type:</span> {{ tx.type }}</div>
          <div><span class="font-medium">Plan:</span> {{ tx.planTitle || "N/A" }}</div>
          <div><span class="font-medium">Amount:</span> {{ tx.amount }} {{ tx.currency }}</div>
          <div><span class="font-medium">Payment Method:</span> {{ tx.paymentMethod }}</div>
          <div>
            <span class="font-medium">Status:</span>
            <span
              :class="{
                'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium': tx.status === 'paid' || tx.status === 'active',
                'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium': tx.status === 'pending',
                'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium': tx.status === 'cancelled' || tx.status === 'inactive'
              }"
            >
              {{ tx.status }}
            </span>
          </div>
          <div><span class="font-medium">Date:</span> {{ formatDate(tx.date) }}</div>
        </div>
      </div>
      <!-- No results message -->
      <div v-if="filteredTransactions.length === 0" class="text-center py-4 text-gray-500">
        No results found for "{{ searchQuery }}"
      </div>
    </div>

    <div v-if="loading" class="text-center mt-6">Loading transactions...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig.js";

const transactions = ref([]);
const loading = ref(true);
const searchQuery = ref("");

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  return date.toLocaleString();
};

const fetchTransactions = async () => {
  loading.value = true;
  try {
    const txList = [];

    // 🔹 Bookings
    const bookingsSnapshot = await getDocs(collection(db, "bookings"));
    bookingsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.createdAt && (data.stripeSessionId || data.paymentIntent) && data.trainee) {
        txList.push({
          id: doc.id,
          transactionId: data.stripeSessionId || data.paymentIntent,
          userName: `${data.trainee.firstName} ${data.trainee.lastName}`,
          type: "Booking",
          planTitle: data.plan?.title || "N/A",
          amount: data.amount,
          currency: data.currency || "USD",
          paymentMethod: "Stripe",
          status: data.status,
          date: data.createdAt,
        });
      }
    });

    // 🔹 Subscribers
    const subscribersSnapshot = await getDocs(collection(db, "subscribers"));
    subscribersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.trainerName && data.price && data.createdAt) {
        txList.push({
          id: doc.id,
          transactionId: data.stripeSessionId || "N/A",
          userName: data.trainerName,
          type: "Subscription",
          planTitle: data.planType || "N/A",
          amount: data.price,
          currency: data.currency || "USD",
          paymentMethod: data.stripeSessionId ? "Stripe" : "Manual",
          status: data.subscriptionStatus || "active",
          date: data.createdAt,
        });
      }
    });

    // 🔹 Subscriptions
    const subscriptionsSnapshot = await getDocs(collection(db, "subscriptions"));
    subscriptionsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.trainerName && data.price && data.createdAt) {
        txList.push({
          id: doc.id,
          transactionId: data.stripeSubscriptionId || "N/A",
          userName: data.trainerName,
          type: "Subscription",
          planTitle: data.planType || "N/A",
          amount: data.price,
          currency: data.currency || "USD",
          paymentMethod: data.stripeSubscriptionId ? "Stripe" : "Manual",
          status: data.status || "active",
          date: data.createdAt,
        });
      }
    });

    // Sort by date descending
    transactions.value = txList.sort(
      (a, b) => b.date.seconds * 1000 - a.date.seconds * 1000
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
  } finally {
    loading.value = false;
  }
};


onMounted(fetchTransactions);

const filteredTransactions = computed(() => {
  if (!searchQuery.value) return transactions.value;
  const q = searchQuery.value.toLowerCase();
  return transactions.value.filter(
    (tx) =>
      tx.userName.toLowerCase().includes(q) ||
      tx.type.toLowerCase().includes(q) ||
      (tx.planTitle?.toLowerCase() || "").includes(q)
  );
});
</script>
