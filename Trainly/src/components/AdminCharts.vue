<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
    <!-- 📅 Bookings This Week -->
    <div class="bg-white dark:bg-[#3b3b3b] dark:text-white shadow rounded-2xl p-4 chart-container">
      <h2 class="text-lg font-medium mb-3 text-gray-800 dark:text-white">
        Bookings This Week
      </h2>
      <Line v-if="bookingsData" :data="bookingsData" :options="chartOptions" />
      <p v-else class="dark:text-white text-gray-500 text-sm">Loading bookings...</p>
    </div>

    <!-- 💰 Revenue by Sport -->
    <div class="bg-white dark:bg-[#3b3b3b] dark:text-white shadow rounded-2xl p-4 chart-container">
      <h2 class="text-lg font-medium mb-3 text-gray-800 dark:text-white">
        Revenue by Sport
      </h2>
      <Bar v-if="revenueData" :data="revenueData" :options="chartOptions" class="dark:text-white" />
      <p v-else class="dark:text-white text-gray-500 text-sm">Loading revenue...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
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
import { db } from "@/Firebase/firebaseConfig.js";
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

// ===============================
// 🌙 إعداد الـ chartOptions حسب الـ dark mode
// ===============================
const chartOptions = computed(() => {
  const isDark = isDarkMode.value;
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#fff" : "#333",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#fff" : "#333" },
        grid: {
          color: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.05)",
        },
      },
      y: {
        ticks: { color: isDark ? "#fff" : "#333" },
        grid: {
          color: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.05)",
        },
      },
    },
  };
});
const isDarkMode = ref(document.documentElement.classList.contains("dark"));

const updateDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains("dark");
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
};
// لما المستخدم يغير الوضع (مثلاً يضغط زرار dark)
onMounted(() => {
  const observer = new MutationObserver(updateDarkMode);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  onUnmounted(() => observer.disconnect());
});

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
