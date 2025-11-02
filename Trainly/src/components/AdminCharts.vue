<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
    <!-- 📅 Bookings This Week -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 chart-container">
      <h2 class="text-lg font-medium mb-3 text-gray-800 dark:text-white">
        Bookings This Week
      </h2>
      <Line v-if="bookingsData" :data="bookingsData" :options="chartOptions" />
      <p v-else class="text-gray-500 text-sm">Loading bookings...</p>
    </div>

    <!-- 💰 Revenue by Sport -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 chart-container">
      <h2 class="text-lg font-medium mb-3 text-gray-800 dark:text-white">
        Revenue by Sport
      </h2>
      <Bar v-if="revenueData" :data="revenueData" :options="chartOptions" />
      <p v-else class="text-gray-500 text-sm">Loading revenue...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line, Bar } from "vue-chartjs";

import { db } from "@/Firebase/firebaseConfig.js"; // 🔥 عدل المسار حسب مشروعك
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// تسجيل العناصر المستخدمة في Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

// إعداد الـ Charts Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0,0,0,0.05)" },
    },
    x: {
      grid: { display: false },
    },
  },
};

// ===============================
// 📊 BOOKINGS CHART (الأسبوع الحالي)
// ===============================
const bookingsData = ref(null);

const getWeekRange = () => {
  const now = new Date();
  const first = new Date(now);
  first.setDate(now.getDate() - now.getDay());
  first.setHours(0, 0, 0, 0);

  const last = new Date(first);
  last.setDate(first.getDate() + 7);
  last.setHours(23, 59, 59, 999);

  return { first, last };
};

const fetchBookings = async () => {
  const { first, last } = getWeekRange();
  const bookingsSnap = await getDocs(collection(db, "bookings"));

  const dailyCount = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

  bookingsSnap.forEach((doc) => {
    const data = doc.data();
    if (data.createdAt) {
      const date = data.createdAt.toDate();
      if (date >= first && date <= last) {
        const day = date.toLocaleString("en-US", { weekday: "short" });
        if (dailyCount[day] !== undefined) dailyCount[day]++;
      }
    }
  });

  bookingsData.value = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Bookings",
        data: Object.values(dailyCount),
        borderColor: "#00BFFF",
        backgroundColor: "rgba(0, 191, 255, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#00BFFF",
      },
    ],
  };

  console.log("📅 Bookings this week:", dailyCount);
};

// ===============================
// 💸 REVENUE BY SPORT
// ===============================
const revenueData = ref(null);

const fetchRevenueBySport = async () => {
  const revenueBySport = {};
  const subsSnap = await getDocs(collection(db, "subscriptions"));

  await Promise.all(
    subsSnap.docs.map(async (subDoc) => {
      const subData = subDoc.data();
      const trainerUid = subData.trainerUid;
      const price = Number(subData.price) || 0;

      if (!trainerUid) return;

      const userRef = doc(db, "users", trainerUid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const sport = userSnap.data().sport || "Other";
        revenueBySport[sport] = (revenueBySport[sport] || 0) + price;
      }
    })
  );

  revenueData.value = {
    labels: Object.keys(revenueBySport),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(revenueBySport),
        backgroundColor: "#00BFFF",
        borderRadius: 10,
      },
    ],
  };

  console.log("💰 Revenue by sport:", revenueBySport);
};

// ===============================
// 🚀 Load on Mounted
// ===============================
onMounted(async () => {
  await Promise.all([fetchBookings(), fetchRevenueBySport()]);
});
</script>

<style scoped>
.chart-container {
  height: 320px;
}
</style>
