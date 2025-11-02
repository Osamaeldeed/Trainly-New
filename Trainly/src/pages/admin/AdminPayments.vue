<template>
  <div class="p-4">
    <!-- Header + Search Bar -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Payments & Subscriptions</h1>
        <p class="text-gray-500">Manage all transactions for trainees and trainers</p>
      </div>

      <!-- Search -->
      <div class="relative w-full md:w-1/3">
        <img
          src="@/assets/images/ic_outline-search.png"
          alt="Search Icon"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by user, type, or plan..."
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- ✅ Styled Table like “Sessions & Bookings” -->
    <div class="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <div class="overflow-y-auto max-h-[600px]">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-blue-50 text-gray-600 font-medium">
            <tr>
              <th class="px-6 py-3 font-medium">Transaction ID</th>
              <th class="px-6 py-3 font-medium">User</th>
              <th class="px-6 py-3 font-medium">Type</th>
              <th class="px-6 py-3 font-medium">Plan</th>
              <th class="px-6 py-3 font-medium">Amount</th>
              <th class="px-6 py-3 font-medium">Payment Method</th>
              <th class="px-6 py-3 font-medium">Status</th>
              <th class="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="8" class="text-center py-4 text-gray-500">
                No results found for "{{ searchQuery }}"
              </td>
            </tr>

            <tr
              v-for="tx in filteredTransactions"
              :key="tx.id"
              class="hover:bg-blue-50 transition duration-150 ease-in-out group"
            >
              <!-- Hover to show full ID -->
              <td class="px-6 py-4 relative cursor-pointer text-gray-700">
                {{ tx.transactionId?.slice(0, 8) || "N/A" }}
                <div
                  class="absolute left-0 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                >
                  {{ tx.transactionId }}
                </div>
              </td>

              <td class="px-6 py-4 text-gray-800">{{ tx.userName }}</td>
              <td class="px-6 py-4 text-gray-800">{{ tx.type }}</td>
              <td class="px-6 py-4 text-gray-800">{{ tx.planTitle || "N/A" }}</td>
              <td class="px-6 py-4 text-gray-800">{{ tx.amount }} {{ tx.currency }}</td>
              <td class="px-6 py-4 text-gray-800">{{ tx.paymentMethod }}</td>

              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full capitalize"
                  :class="{
                    'bg-green-100 text-green-700': tx.status === 'paid' || tx.status === 'active',
                    'bg-yellow-100 text-yellow-700': tx.status === 'pending',
                    'bg-red-100 text-red-700': tx.status === 'cancelled' || tx.status === 'inactive'
                  }"
                >
                  {{ tx.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-gray-800">{{ formatDate(tx.date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 📱 Mobile Cards (same style as bookings) -->
    <div class="md:hidden flex flex-col gap-4">
      <div
        v-for="tx in filteredTransactions"
        :key="tx.id"
        class="relative border-4 border-blue-100 p-4 rounded-lg shadow-sm bg-white group"
      >
        <span
          class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
          :class="{
            'text-green-600 bg-green-100': tx.status === 'paid' || tx.status === 'active',
            'text-yellow-600 bg-yellow-100': tx.status === 'pending',
            'text-red-600 bg-red-100': tx.status === 'cancelled' || tx.status === 'inactive'
          }"
        >
          {{ tx.status }}
        </span>

        <p><span class="font-semibold">User:</span> {{ tx.userName }}</p>
        <p><span class="font-semibold">Type:</span> {{ tx.type }}</p>
        <p><span class="font-semibold">Plan:</span> {{ tx.planTitle || "N/A" }}</p>
        <p><span class="font-semibold">Amount:</span> {{ tx.amount }} {{ tx.currency }}</p>
        <p><span class="font-semibold">Payment Method:</span> {{ tx.paymentMethod }}</p>
        <p><span class="font-semibold">Date:</span> {{ formatDate(tx.date) }}</p>

        <p class="text-gray-400 text-xs mt-1 cursor-pointer relative">
          ID: {{ tx.transactionId?.slice(0, 8) || "N/A" }}
          <span
            class="absolute left-0 -top-5 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {{ tx.transactionId }}
          </span>
        </p>
      </div>

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
