<template>
  <div>
    <!-- Welcome Header -->
    <div
      class="bg-white dark:bg-[#3b3b3b] p-6 rounded-2xl shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          :src="trainer.profilePicture || 'https://via.placeholder.com/122'"
          alt="profile"
          class="w-[100px] h-[100px] sm:w-[122px] sm:h-[122px] rounded-full object-cover"
        />
        <div class="text-center dark:text-white sm:text-left">
          <h2 class="text-lg sm:text-xl font-semibold dark:text-white text-gray-800">
            Welcome back, {{ trainer.firstName }} {{ trainer.lastName }}!
          </h2>
          <p class="text-sm dark:text-white text-gray-500">Let’s track your performance today.</p>
        </div>
      </div>
    </div>

    <!-- Dashboard Stats -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        class="bg-white dark:bg-[#3b3b3b] dark:text-white p-6 rounded-bl-2xl rounded-br-2xl shadow-sm text-center border-t-6 border-[#0D8BF2]"
      >
        <div class="flex items-center gap-2">
          <h3 class="text-[#0D8BF2] text-md font-medium mr-18">Total Clients</h3>
          <img src="@/assets/images/Group 142.png" alt="email" class="w-[40px] h-[40px]" />
        </div>
        <p class="text-2xl dark:text-white font-medium text-gray-800 text-left">
          {{ totalClients }}
        </p>
        <router-link
          to="/trainer/clients"
          class="block text-[#2d8fff] text-sm mt-1 underline text-right cursor-pointer dark:text-[#6ab8ff] dark:hover:text-[#8ed0ff] hover:text-[#0D8BF2]"
        >
          Show all
        </router-link>
      </div>

      <div
        class="bg-white dark:bg-[#3b3b3b] p-6 rounded-bl-2xl rounded-br-2xl shadow-sm border-t-6 border-[#0D8BF2]"
      >
        <div class="flex items-center gap-2">
          <h3 class="text-[#0D8BF2] text-md font-medium mr-18">Total Income</h3>
          <img src="@/assets/images/Group 147.png" alt="email" class="w-[40px] h-[40px]" />
        </div>
        <p class="text-2xl font-medium dark:text-white text-gray-800">{{ totalIncome }} $</p>
        <router-link
          to="/trainer/settings"
          class="block text-[#2d8fff] text-sm mt-1 underline text-right cursor-pointer dark:text-[#6ab8ff] dark:hover:text-[#8ed0ff] hover:text-[#0D8BF2]"
        >
          Show all
        </router-link>
      </div>

      <div
        class="bg-white dark:bg-[#3b3b3b] p-6 rounded-bl-2xl rounded-br-2xl shadow-sm border-t-6 border-[#0D8BF2]"
      >
        <div class="flex items-center gap-2">
          <h3 class="text-[#0D8BF2] text-md font-medium mr-13">Average Rating</h3>
          <img src="@/assets/images/Group 144.png" alt="email" class="w-[40px] h-[40px]" />
        </div>

        <p class="text-2xl font-medium dark:text-white text-gray-800 flex items-center gap-1">
          {{ averageRating }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#FBBF24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="none"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 01.99 0l2.373 5.061a.563.563 0 00.424.307l5.59.812a.563.563 0 01.312.96l-4.04 3.944a.563.563 0 00-.162.498l.955 5.56a.563.563 0 01-.817.593L12 18.347l-5.008 2.634a.563.563 0 01-.817-.592l.955-5.561a.563.563 0 00-.162-.498L2.93 10.64a.563.563 0 01.312-.96l5.59-.812a.563.563 0 00.424-.307L11.48 3.5z"
            />
          </svg>
        </p>

        <router-link
          to="/trainer/reviews"
          class="block text-[#2d8fff] text-sm mt-1 underline text-right cursor-pointer dark:text-[#6ab8ff] dark:hover:text-[#8ed0ff] hover:text-[#0D8BF2]"
        >
          Show all
        </router-link>
      </div>

      <div
        class="bg-white dark:bg-[#3b3b3b] p-6 rounded-bl-2xl rounded-br-2xl shadow-sm border-t-6 border-[#0D8BF2]"
      >
        <div class="flex items-center gap-2">
          <h3 class="text-[#0D8BF2] text-md font-medium mr-13">Total Plans</h3>
          <img src="@/assets/images/Group 143.png" alt="email" class="w-[40px] h-[40px]" />
        </div>
        <p class="text-2xl font-medium dark:text-white text-gray-800">{{ plans.length }}</p>
        <router-link
          to="/trainer/plans"
          class="block text-[#2d8fff] text-sm mt-1 underline text-right cursor-pointer dark:text-[#6ab8ff] dark:hover:text-[#8ed0ff] hover:text-[#0D8BF2]"
        >
          Show all
        </router-link>
      </div>
    </section>

    <!-- Main Grid (Plans + Reviews) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 🗂️ Your Plans Box -->
      <div
        class="bg-white dark:bg-[#3b3b3b] p-6 rounded-bl-2xl rounded-br-2xl shadow-sm border-t-6 border-[#0D8BF2]"
      >
        <h3 class="text-xl font-medium dark:text-white text-gray-800 mb-4">Your Plans</h3>

        <div v-if="plans.length" class="space-y-3">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition"
          >
            <div>
              <h4 class="font-medium dark:text-white text-gray-800">{{ plan.title }}</h4>
              <p class="text-sm dark:text-gray-300 text-gray-500">
                {{ plan.duration }} • {{ plan.sessions }} sessions
              </p>
            </div>
            <p class="text-[#00B0FF] font-medium">${{ plan.price }}</p>
          </div>
        </div>

        <p v-else class="text-gray-400 text-sm text-center mt-4">No plans yet.</p>
      </div>

      <!-- ⭐ Recent Reviews Box -->
      <div
        class="bg-white dark:bg-[#3b3b3b] p-6 rounded-bl-2xl rounded-br-2xl shadow-sm border-t-6 border-[#0D8BF2]"
      >
        <h3 class="text-xl font-medium dark:text-white text-gray-800 mb-4">Recent Reviews</h3>

        <div v-if="reviews.length" class="space-y-3">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="border border-gray-200 rounded-xl p-4 hover:dark:bg-[#4b4b4b] hover:bg-gray-50 transition"
          >
            <div class="flex items-center gap-3 mb-2">
              <img
                :src="review.traineeProfilePic"
                alt="Trainee"
                class="w-[40px] h-[40px] rounded-full object-cover"
              />
              <div>
                <p class="font-medium dark:text-white text-gray-800">
                  {{ review.traineeName }}
                </p>
                <p class="text-xs dark:text-gray-200 text-gray-500">
                  Rating: ⭐ {{ review.rating }}
                </p>
              </div>
            </div>
            <p class="text-sm dark:text-gray-300 text-gray-600">“{{ review.comment }}”</p>
          </div>
        </div>

        <p v-else class="text-gray-400 dark:text-white text-sm text-center mt-4">No reviews yet.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/Firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

export default {
  name: "TrainerDashboard",
  data() {
    return {
      trainer: {
        firstName: "",
        lastName: "",
        profilePicture: "",
      },
      plans: [],
      reviews: [],
      totalClients: 0,
      totalIncome: 0,
      averageRating: 0,
    };
  },

  methods: {
    async fetchTrainerData(uid) {
      try {
        // 🔹 Fetch trainer info
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          this.trainer = userSnap.data();
        }

        // 🔹 Fetch trainer's plans
        const plansRef = collection(db, "plans");
        const plansQuery = query(plansRef, where("trainer_uid", "==", uid));
        const plansSnap = await getDocs(plansQuery);
        this.plans = plansSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔹 Fetch trainer reviews
        const reviewsRef = collection(db, "reviews");
        const reviewsQuery = query(reviewsRef, where("trainerId", "==", uid));
        const reviewsSnap = await getDocs(reviewsQuery);
        this.reviews = reviewsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔹 Calculate average rating
        if (this.reviews.length > 0) {
          const total = this.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
          this.averageRating = (total / this.reviews.length).toFixed(1);
        }

        // 🔹 Fetch total clients + income based on actual subscriptions
        // 🔹 Fetch total clients + income based on actual paid subscriptions
        const bookingsRef = collection(db, "bookings");
        const bookingsQuery = query(
          bookingsRef,
          where("trainerId", "==", uid),
          where("status", "==", "paid"),
        );
        const bookingsSnap = await getDocs(bookingsQuery);

        const traineeIds = new Set();
        let totalIncome = 0;

        bookingsSnap.forEach((doc) => {
          const b = doc.data();

          // Ensure only unique trainees are counted
          const traineeId = b.traineeId || b.trainee?.uid;
          if (traineeId) traineeIds.add(traineeId);

          // Normalize amount (Stripe often stores in cents)
          let amount = b.amount;
          if (amount && amount > 1000) amount = amount / 100;

          // Only add amount if it exists; otherwise use plan.price ONCE
          if (amount) {
            totalIncome += amount;
          } else if (b.plan?.price) {
            totalIncome += b.plan.price;
          }
        });

        this.totalClients = traineeIds.size;
        this.totalIncome = Math.round(totalIncome);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchTrainerData(user.uid);
      } else {
        console.warn("No trainer logged in.");
      }
    });
  },
};
</script>

<style scoped>
/* smooth fade-in for sections */
section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style scoped>
/* smooth fade-in for sections */
section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
