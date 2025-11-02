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
        const matchesSearch = client.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus =
          this.filterStatus === "all" ||
          client.bookingStatus.toLowerCase() === this.filterStatus.toLowerCase();
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

      const q = query(collection(db, "bookings"), where("trainer.uid", "==", trainerUid));

      onSnapshot(
        q,
        (snapshot) => {
          this.clients = snapshot.docs.map((doc) => {
            const data = doc.data();
            const startDate = data.createdAt?.toDate ? data.createdAt.toDate() : null;

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
              name: `${data.trainee?.firstName || ""} ${data.trainee?.lastName || ""}`.trim(),
              image: data.trainee?.profilePicture || "",
              plan: data.plan?.title || "N/A",
              duration: durationText || "N/A",
              sessions: data.sessions || data.plan?.sessions || 0,
              startDate: startDate ? startDate.toLocaleDateString() : "Not specified",
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
        },
      );
    },
  },
};
</script>

<template>
  <div class="">
    <div class="p-0">
      <!-- ✅ العنوان -->
      <div class="grid grid-cols-1 gap-4 mb-4">
        <div class="flex flex-col items-start h-23 rounded-sm dark:bg-black bg-white">
          <h1 class="text-black dark:text-white text-2xl font-semibold">Clients</h1>
          <p class="text-md dark:text-gray-200 text-gray-400 mt-2">
            Manage and track all your clients in one place.
          </p>
        </div>
      </div>

      <!-- ✅ شريط البحث -->
      <div class="grid grid-cols-12 gap-10 mb-4">
        <div class="col-span-8">
          <div class="relative w-full">
            <img
              src="@/assets/images/ic_outline-search.png"
              alt="search icon"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Clients"
              class="border border-gray-300 rounded-xl text-black dark:text-white dark:bg-[#3B3B3B] pl-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <!-- ✅ Header إضافي لو محتاج -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Clients</h1>
        <p class="text-gray-500 dark:text-gray-300 mt-2">
          Manage and track all your clients easily.
        </p>
      </div>
    </div>
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
  <div v-if="loading" class="text-center text-gray-400 py-10">Loading clients...</div>

  <!-- No Data -->
  <div v-else-if="!clients.length" class="text-center text-gray-400 py-10">No clients found.</div>

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
      </div>
      <div class="col-span-4">
        <!-- ✅ قائمة الاختيار -->
        <select
          class="border border-gray-300 rounded-xl text-black dark:text-white px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#3B3B3B] bg-white cursor-pointer"
          required
        >
          <option value="">اختر الحالة</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <!-- ✅ الحالة الحالية -->
        <span
          :class="{
            'bg-green-100 text-green-700': client.bookingStatus === 'Active',
            'bg-red-100 text-red-700': client.bookingStatus === 'Expired',
            'bg-yellow-100 text-yellow-700': client.bookingStatus === 'Pending',
            'bg-gray-100 text-gray-700': client.bookingStatus === 'Unpaid',
          }"
          class="text-xs font-medium px-3 py-1 rounded-full mt-2 inline-block"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Card -->
      <div
        class="flex flex-col border border-gray-200 dark:bg-[#3b3b3b] rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
      >
        <!-- Profile -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              src="@/assets/images/cup.png"
              alt="User"
              class="w-12 h-12 rounded-full object-cover mr-3 border"
            />
            <h2 class="text-lg font-semibold dark:text-white text-gray-800">Sara Ahmed</h2>
          </div>
          <span class="text-green-500 text-sm font-semibold">In Progress</span>
        </div>

        <!-- Details -->
        <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
          <p class="text-gray-500 dark:text-gray-200">Plan Name</p>
          <p class="font-medium dark:text-gray-300">Strength Building</p>

          <p class="text-gray-500 dark:text-gray-200">Duration</p>
          <p class="font-medium dark:text-gray-300">8 weeks</p>

          <p class="text-gray-500 dark:text-gray-200">Sessions</p>
          <p class="font-medium dark:text-gray-300">2</p>

          <p class="text-gray-500 dark:text-gray-200">Starting Date</p>
          <p class="font-medium dark:text-gray-300">1/10/2025</p>

          <p class="text-gray-500 dark:text-gray-200">Expiring Date</p>
          <p class="font-medium dark:text-gray-300">1/12/2025</p>
        </div>
      </div>

      <!-- Example of expired -->
      <div
        class="flex flex-col border border-gray-200 rounded-2xl p-6 dark:bg-[#3b3b3b] shadow-sm hover:shadow-md transition relative"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              src="@/assets/images/cup.png"
              alt="User"
              class="w-12 h-12 rounded-full object-cover mr-3 border"
            />
            <h2 class="text-lg font-semibold dark:text-white text-gray-800">Noha Selim</h2>
          </div>
          <span class="text-red-500 text-sm font-semibold">Expired</span>
        </div>

        <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
          <p class="text-gray-500 dark:text-gray-200">Plan Name</p>
          <p class="font-medium dark:text-gray-300">Strength Building</p>
          <p class="text-gray-500 dark:text-gray-200">Duration</p>
          <p class="font-medium dark:text-gray-300">8 weeks</p>

          <p class="text-gray-500 dark:text-gray-200">Sessions</p>
          <p class="font-medium dark:text-gray-300">2</p>
          <p class="text-gray-500 dark:text-gray-200">Starting Date</p>
          <p class="font-medium dark:text-gray-300">1/10/2025</p>

          <p class="text-gray-500 dark:text-gray-200">Expiring Date</p>
          <p class="font-medium dark:text-gray-300">1/12/2025</p>
        </div>
      </div>
      <div
        class="flex flex-col border border-gray-200 rounded-2xl p-6 dark:bg-[#3b3b3b] shadow-sm hover:shadow-md transition relative"
      >
        <!-- Profile -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              src="@/assets/images/cup.png"
              alt="User"
              class="w-12 h-12 rounded-full object-cover mr-3 border"
            />
            <h2 class="text-lg font-semibold dark:text-white text-gray-800">Sara Ahmed</h2>
          </div>
          <span class="text-green-500 text-sm font-semibold">In Progress</span>
        </div>

        <!-- Details -->
        <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
          <p class="text-gray-500 dark:text-gray-200">Plan Name</p>
          <p class="font-medium dark:text-gray-300">Strength Building</p>

          <p class="text-gray-500 dark:text-gray-200">Duration</p>
          <p class="font-medium dark:text-gray-300">8 weeks</p>

          <p class="text-gray-500 dark:text-gray-200">Sessions</p>
          <p class="font-medium dark:text-gray-300">2</p>

          <p class="text-gray-500 dark:text-gray-200">Starting Date</p>
          <p class="font-medium dark:text-gray-300">1/10/2025</p>

          <p class="text-gray-500 dark:text-gray-200">Expiring Date</p>
          <p class="font-medium dark:text-gray-300">1/12/2025</p>
        </div>
      </div>

      <!-- Example of expired -->
      <div
        class="flex flex-col border border-gray-200 rounded-2xl p-6 dark:bg-[#3b3b3b] shadow-sm hover:shadow-md transition relative"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              src="@/assets/images/cup.png"
              alt="User"
              class="w-12 h-12 rounded-full object-cover mr-3 border"
            />
            <h2 class="text-lg font-semibold dark:text-white text-gray-800">Noha Selim</h2>
          </div>
          <span class="text-red-500 text-sm font-semibold">Expired</span>
        </div>

        <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
          <p class="text-gray-500 dark:text-gray-200">Plan Name</p>
          <p class="font-medium dark:text-gray-300">Strength Building</p>

          <p class="text-gray-500 dark:text-gray-200">Duration</p>
          <p class="font-medium dark:text-gray-300">8 weeks</p>

          <p class="text-gray-500 dark:text-gray-200">Sessions</p>
          <p class="font-medium dark:text-gray-300">2</p>

          <p class="text-gray-500 dark:text-gray-200">Starting Date</p>
          <p class="font-medium dark:text-gray-300">1/10/2025</p>

          <p class="text-gray-500 dark:text-gray-200">Expiring Date</p>
          <p class="font-medium dark:text-gray-300">1/12/2025</p>
        </div>
      </div>
      <div
        class="flex flex-col border border-gray-200 rounded-2xl p-6 dark:bg-[#3b3b3b] shadow-sm hover:shadow-md transition relative"
      >
        <!-- Profile -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              src="@/assets/images/cup.png"
              alt="User"
              class="w-12 h-12 rounded-full object-cover mr-3 border"
            />
            <h2 class="text-lg font-semibold dark:text-white text-gray-800">Sara Ahmed</h2>
          </div>
          <span class="text-green-500 text-sm font-semibold">In Progress</span>
        </div>

        <!-- Details -->
        <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
          <p class="text-gray-500 dark:text-gray-200">Plan Name</p>
          <p class="font-medium dark:text-gray-300">Strength Building</p>

          <p class="text-gray-500 dark:text-gray-200">Duration</p>
          <p class="font-medium dark:text-gray-300">8 weeks</p>

          <p class="text-gray-500 dark:text-gray-200">Sessions</p>
          <p class="font-medium dark:text-gray-300">2</p>

          <p class="text-gray-500 dark:text-gray-200">Starting Date</p>
          <p class="font-medium dark:text-gray-300">1/10/2025</p>

          <p class="text-gray-500 dark:text-gray-200">Expiring Date</p>
          <p class="font-medium dark:text-gray-300">1/12/2025</p>
        </div>
      </div>

      <!-- Example of expired -->
      <div
        class="flex flex-col border border-gray-200 rounded-2xl p-6 dark:bg-[#3b3b3b] shadow-sm hover:shadow-md transition relative"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <img
              src="@/assets/images/cup.png"
              alt="User"
              class="w-12 h-12 rounded-full object-cover mr-3 border"
            />
            <h2 class="text-lg font-semibold dark:text-white text-gray-800">Noha Selim</h2>
          </div>
          <span class="text-red-500 text-sm font-semibold">Expired</span>
        </div>

        <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
          <p class="text-gray-500 dark:text-gray-200">Plan Name</p>
          <p class="font-medium dark:text-gray-300">Strength Building</p>

          <p class="text-gray-500 dark:text-gray-200">Duration</p>
          <p class="font-medium dark:text-gray-300">8 weeks</p>

          <p class="text-gray-500 dark:text-gray-200">Sessions</p>
          <p class="font-medium dark:text-gray-300">2</p>

          <p class="text-gray-500 dark:text-gray-200">Starting Date</p>
          <p class="font-medium dark:text-gray-300">1/10/2025</p>

          <p class="text-gray-500 dark:text-gray-200">Expiring Date</p>
          <p class="font-medium dark:text-gray-300">1/12/2025</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
