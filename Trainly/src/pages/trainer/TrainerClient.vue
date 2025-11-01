<script>
import { db } from "@/Firebase/firebaseConfig.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "TrainerClient",
  data() {
    return {
      clients: [],
      searchQuery: "",
      filterStatus: "all",
      loading: true,
    };
  },
  computed: {
    filteredClients() {
      return this.clients.filter((client) => {
        const matchesSearch = client.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesStatus =
          this.filterStatus === "all" ||
          client.bookingStatus.toLowerCase() ===
            this.filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
      });
    },
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    fetchBookings() {
  const auth = getAuth();
  const trainerUid = auth.currentUser?.uid;

  if (!trainerUid) {
    console.error("Trainer not logged in.");
    this.loading = false;
    return;
  }

  const q = query(
    collection(db, "bookings"),
    where("trainer.uid", "==", trainerUid)
  );

  onSnapshot(
    q,
    (snapshot) => {
      this.clients = snapshot.docs.map((doc) => {
        const data = doc.data();
        const startDate = data.createdAt?.toDate
          ? data.createdAt.toDate()
          : null;

        // استخراج الأسابيع من النص "6 weeks"
        let weeks = 0;
        const durationText = data.duration || data.plan?.duration;
        if (durationText) {
          const match = durationText.match(/\d+/);
          if (match) weeks = parseInt(match[0]);
        }

        // حساب تاريخ النهاية
        let endDate = null;
        if (startDate && weeks) {
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + weeks * 7);
        }

        // حساب الحالة تلقائيًا
        let bookingStatus = "Active";
        const today = new Date();
        if (endDate && today > endDate) {
          bookingStatus = "Expired";
        } else if (data.status?.toLowerCase() === "unpaid") {
          bookingStatus = "Unpaid";
        } else if (data.status?.toLowerCase() === "pending") {
          bookingStatus = "Pending";
        }

        return {
          id: doc.id,
          name: `${data.trainee?.firstName || ""} ${
            data.trainee?.lastName || ""
          }`.trim(),
          image: data.trainee?.profilePicture || "",
          plan: data.plan?.title || "N/A",
          duration: durationText || "N/A",
          sessions: data.sessions || data.plan?.sessions || 0,
          startDate: startDate
            ? startDate.toLocaleDateString()
            : "Not specified",
          endDate: endDate ? endDate.toLocaleDateString() : "Not specified",
          price: data.amount || 0,
          bookingStatus,
        };
      });
      this.loading = false;
    },
    (error) => {
      console.error("Error fetching bookings:", error);
      this.loading = false;
    }
  );
},

  },
};
</script>

<template>
  <div class="">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Clients</h1>
      <p class="text-gray-500 mt-2">
        Manage and track all your clients easily.
      </p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Clients..."
        class="border border-gray-300 rounded-xl pl-4 py-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <select
        v-model="filterStatus"
        class="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
      >
        <option value="all">All Clients</option>
        <option value="active">Active</option>
        <option value="expired">Expired</option>
        <option value="unpaid">Unpaid</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-400 py-10">
      Loading clients...
    </div>

    <!-- No Data -->
    <div v-else-if="!clients.length" class="text-center text-gray-400 py-10">
      No clients found.
    </div>

    <!-- Clients Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="client in filteredClients"
        :key="client.id"
        class="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-3">
            <img
              :src="client.image"
              alt="User"
              class="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h2 class="text-lg font-semibold text-gray-800 leading-tight">
                {{ client.name }}
              </h2>
              <p class="text-sm text-gray-500">{{ client.plan }}</p>
            </div>
          </div>

          <span
            :class="{
              'bg-green-100 text-green-700': client.bookingStatus === 'Active',
              'bg-red-100 text-red-700': client.bookingStatus === 'Expired',
              'bg-yellow-100 text-yellow-700': client.bookingStatus === 'Pending',
              'bg-gray-100 text-gray-700': client.bookingStatus === 'Unpaid',
            }"
            class="text-xs font-medium px-3 py-1 rounded-full"
          >
            {{ client.bookingStatus }}
          </span>
        </div>

        <!-- Details -->
        <div class="text-sm text-gray-700 space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-500">Duration:</span>
            <span class="font-medium">{{ client.duration }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">Sessions:</span>
            <span class="font-medium">{{ client.sessions }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">Start Date:</span>
            <span class="font-medium">{{ client.startDate }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">End Date:</span>
            <span class="font-medium">{{ client.endDate }}</span>
          </div>

          <div class="flex justify-between border-t border-gray-300 pt-2 mt-2">
            <span class="text-gray-500">Amount:</span>
            <span class="font-semibold text-blue-600">${{ client.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


