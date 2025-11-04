<template>
  <div class="min-h-screen">
    <h1 class="text-2xl font-bold dark:text-white text-gray-800 mb-6">My Trainers & Plans</h1>

    <!-- حالة التحميل -->
    <div v-if="loading" class="text-center text-gray-500">Loading your bookings...</div>

    <div v-else-if="bookings.length === 0" class="text-center text-gray-500">
      You haven’t booked any trainers yet.
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <img
          :src="booking.plan?.image"
          alt="Plan Image"
          class="w-full h-48 object-cover"
        />

        <div class="p-4 flex flex-col dark:bg-[#3b3b3b] justify-between h-[calc(100%-12rem)]">
          <div class="flex items-center mb-3">
            <img
              :src="booking.trainer?.profilePicture || '/default-trainer.jpg'"
              alt="Trainer"
              class="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h2 class="text-lg font-semibold dark:text-white text-gray-800">
                {{ booking.trainer?.firstName }} {{ booking.trainer?.lastName }}
              </h2>
              <p class="text-sm dark:text-gray-300 text-gray-500">@{{ booking.trainer?.username }}</p>
            </div>
          </div>

          <div class="flex-1">
            <h3 class="text-base font-semibold dark:text-white text-gray-700 mb-1">
              {{ booking.plan?.title }}
            </h3>
            <p class="text-sm dark:text-gray-300 text-gray-600 line-clamp-2">{{ booking.plan?.description }}</p>

            <div class="mt-3 space-y-1">
              <p class="text-sm dark:text-gray-300 text-gray-700">
                💰 <strong>{{ booking.amount }} {{ booking.currency.toUpperCase() }}</strong>
              </p>
              <p class="text-sm dark:text-gray-300 text-gray-700">📆 Duration: {{ booking.plan?.duration }}</p>
              <p class="text-sm dark:text-gray-300 text-gray-500">
                🕒 Booked on: {{ formatDate(booking.createdAt) }}
              </p>
            </div>
          </div>

          <div class="mt-4 flex justify-between items-center">
            <span
              class="px-3 py-1 rounded-full text-xs font-medium capitalize bg-green-100 text-green-700"

            >
              {{ booking.status }}
            </span>

            <button
                @click="goToTrainer(booking)"
              class="text-sm dark:text-blue-300 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              View Trainer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/Firebase/firebaseConfig.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const bookings = ref([]);
const loading = ref(true);

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};

const goToTrainer = (booking) => {
  const trainerId = booking.trainerId || booking.trainer?.id || booking.trainer?.uid;

  console.log("Full booking object:", booking);
  console.log("Trainer ID:", trainerId);

  if (!trainerId) {
    console.error("No trainerId found in booking:", booking);
    alert("Trainer ID not available");
    return;
  }

  router.push({
    path: '/trainee/trainer',
    query: { uid: trainerId } // ⬅️ استخدم uid
  });
};

const loadBookings = async (userId) => {
  console.log("User UID:", userId);
  try {
    const q = query(
      collection(db, "bookings"),
      where("traineeId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const tempBookings = [];

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();

      if (!data.trainer && data.trainerId) {
        const trainerRef = doc(db, "trainers", data.trainerId);
        const trainerSnap = await getDoc(trainerRef);
        if (trainerSnap.exists()) data.trainer = trainerSnap.data();
      }

      if (!data.plan && data.planId) {
        const planRef = doc(db, "plans", data.planId);
        const planSnap = await getDoc(planRef);
        if (planSnap.exists()) data.plan = planSnap.data();
      }

      tempBookings.push({ id: docSnap.id, ...data });
    }

    bookings.value = tempBookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await loadBookings(user.uid);
    } else {
      loading.value = false;
    }
  });
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
