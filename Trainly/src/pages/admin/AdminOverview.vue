<template>
  <main class="min-h-screen bg-white dark:bg-gray-900 ">
    <!-- Header -->
    <section>
      <div>
        <h2 class="text-[24px] font-medium text-gray-900 dark:text-white">
          Dashboard Overview
        </h2>
        <p class="mt-2 text-[16px] text-gray-500 dark:text-gray-400">
          Welcome back, here's what's happening today
        </p>
      </div>

      <!-- Cards Section -->
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h3 class="text-gray-700 dark:text-gray-300 font-medium text-[16px]">
            Total Trainers
          </h3>
          <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            {{ totalTrainers }}
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h3 class="text-gray-700 dark:text-gray-300 font-medium text-[16px]">
            Total Trainees
          </h3>
          <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            {{ totalTrainees }}
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h3 class="text-gray-700 dark:text-gray-300 font-medium text-[16px]">
            Active Plans
          </h3>
          <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            {{ activePlans }}
          </p>
          <p class="text-yellow-500 text-sm mt-1">
            {{ pendingPlans }} pending approval
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h3 class="text-gray-700 dark:text-gray-300 font-medium text-[16px]">
            Monthly Revenue
          </h3>
          <p class="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            ${{ totalRevenue }}
          </p>
        </div>
      </div>
    </section>

    <!-- Charts -->
    <section class="mt-10">
      <AdminCharts />
    </section>

    <!-- 🆕 Recent Activity Section -->
    <section class="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>

      <div v-if="activities.length" class="space-y-4">
        <div
          v-for="(activity, i) in activities"
          :key="i"
          class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <div class="flex items-center gap-4">
            <img
              :src="activity.image || 'https://via.placeholder.com/40'"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ activity.name }}
              </p>

              <p class="text-sm text-gray-400 capitalize">
                <!-- نوع الأكشن -->
                <span
                  class="px-2 py-0.5 rounded-md text-xs font-medium"
                  :class="{
                    'bg-blue-100 text-blue-800': activity.type === 'signup',
                    'bg-green-100 text-green-800': activity.type === 'booking',
                    'bg-purple-100 text-purple-800': activity.type === 'subscription',
                    'bg-red-100 text-red-800': activity.type === 'delete'
                  }"
                >
                  {{ activity.type }}
                </span>

                • {{ activity.action }}
              </p>
            </div>
          </div>
          <div class="text-right text-sm text-gray-400">
            {{ activity.timeAgo }}
          </div>
        </div>
      </div>

      <p v-else class="text-gray-500 dark:text-gray-300">No recent activity yet.</p>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/Firebase/firebaseConfig.js";
import AdminCharts from "@/components/AdminCharts.vue";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

const totalTrainers = ref(0);
const totalTrainees = ref(0);
const totalRevenue = ref(0);
const activePlans = ref(0);
const pendingPlans = ref(0);
const activities = ref([]);

// 🧮 Dashboard
const loadDashboardData = async () => {
  const usersSnap = await getDocs(collection(db, "users"));
  let trainers = 0;
  let trainees = 0;
  usersSnap.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.role === "trainer") trainers++;
    if (data.role === "trainee") trainees++;
  });
  totalTrainers.value = trainers;
  totalTrainees.value = trainees;

  const subsSnap = await getDocs(collection(db, "subscriptions"));
  let revenue = 0;
  subsSnap.forEach((docSnap) => {
    const data = docSnap.data();
    revenue += Number(data.price) || 0;
  });
  totalRevenue.value = revenue.toFixed(2);

  const plansSnap = await getDocs(collection(db, "plans"));
  let active = 0;
  let pending = 0;
  plansSnap.forEach((docSnap) => {
    const data = docSnap.data();
    const status = (data.status || "").toLowerCase().trim();
    if (status === "active") active++;
    if (status === "pending") pending++;
  });
  activePlans.value = active;
  pendingPlans.value = pending;
};

// 🆕 Recent Activity
const fetchActivities = async () => {
  const allActivities = [];

  // 🟦 1️⃣ Signups
  const usersSnap = await getDocs(
    query(collection(db, "users"), orderBy("createdAt", "desc"), limit(5))
  );
  usersSnap.forEach((u) => {
    const user = u.data();
    if (user.createdAt) {
      allActivities.push({
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        image: user.profilePicture,
        role: user.role,
        type: "signup",
        action: `Signed up as a ${user.role}`,
        createdAt: user.createdAt.toDate(),
      });
    }
  });

  // 🟩 2️⃣ Subscriptions
  const subsSnap = await getDocs(
    query(collection(db, "subscriptions"), orderBy("createdAt", "desc"), limit(5))
  );

  for (const s of subsSnap.docs) {
    const sub = s.data();
    let trainerImage = null;
    let trainerName = sub.trainerName || "";
    if (sub.trainerUid) {
      const trainerDoc = await getDoc(doc(db, "users", sub.trainerUid));
      if (trainerDoc.exists()) {
        const trainerData = trainerDoc.data();
        trainerImage = trainerData.profilePicture || null;
        if (!trainerName && trainerData.firstName)
          trainerName = `${trainerData.firstName} ${trainerData.lastName || ""}`;
      }
    }

    if (sub.createdAt) {
      allActivities.push({
        name: trainerName,
        image: trainerImage || "https://via.placeholder.com/40",
        role: "trainer",
        type: "subscription",
        action: `Subscribed to ${sub.planType} plan`,
        createdAt: sub.createdAt.toDate(),
      });
    }
  }

  // 🟨 3️⃣ Bookings
  const bookingsSnap = await getDocs(
    query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5))
  );
  for (const b of bookingsSnap.docs) {
    const booking = b.data();
    const traineeDoc = await getDoc(doc(db, "users", booking.trainee?.uid || booking.traineeId));
    const trainerDoc = await getDoc(doc(db, "users", booking.trainer?.uid || booking.trainerId));
    const trainee = traineeDoc.exists() ? traineeDoc.data() : null;
    const trainer = trainerDoc.exists() ? trainerDoc.data() : null;

    if (booking.createdAt && trainee && trainer) {
      allActivities.push({
        name: `${trainee.firstName} ${trainee.lastName}`,
        image: trainee.profilePicture,
        role: "trainee",
        type: "booking",
        action: `Booked ${trainer.firstName}'s ${booking.plan?.title || "plan"}`,
        createdAt: booking.createdAt.toDate(),
      });
    }
  }

  // 🟥 4️⃣ Deleted Accounts
  const deleteSnap = await getDocs(
    query(collection(db, "activities"), orderBy("createdAt", "desc"), limit(5))
  );
  deleteSnap.forEach((d) => {
    const del = d.data();
    if (del.type === "delete" && del.createdAt) {
      allActivities.push({
        name: del.name,
        image: del.image || "https://via.placeholder.com/40",
        role: del.role,
        type: "delete",
        action: del.action || `${del.role} account deleted`,
        createdAt: del.createdAt.toDate(),
      });
    }
  });

  // ترتيبهم بالوقت
  const sorted = allActivities.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  activities.value = sorted.map((a) => ({
    ...a,
    timeAgo: formatDistanceToNow(a.createdAt, { addSuffix: true }),
  }));
};

onMounted(async () => {
  await loadDashboardData();
  await fetchActivities();
});
</script>
