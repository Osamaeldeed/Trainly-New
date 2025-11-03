<template>
  <section class="min-h-screen">
    <h2 class="text-3xl text-black dark:text-white font-[500] mb-2">Reviews</h2>
    <p class="text-gray-500 dark:text-gray-300 mb-10">
      Your clients’ reviews help you grow and improve
    </p>

    <!-- When there are no reviews -->
    <div
      v-if="reviews.length === 0"
      class="flex flex-col justify-center items-center dark:text-gray-400 text-gray-500 h-[60vh]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mb-4 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
      <p class="text-gray-500 dark:text-gray-300 text-lg">
        No reviews yet. Be the first to review!
      </p>
    </div>

    <!-- When there are reviews -->
    <div v-else>
      <!-- 🔹 Statistics Section -->
      <div
        class="bg-white dark:bg-[#3B3B3B] rounded-xl shadow-md p-8 flex flex-col md:flex-row justify-between items-center mb-10 border border-gray-400"
      >
        <!-- Average Rating -->
        <div class="flex flex-col items-center justify-center mb-6 md:mb-0">
          <span class="text-5xl font-bold text-[#00B0FF]">{{ avgRatingDisplay }}</span>
          <div class="flex text-yellow-400 text-2xl mt-1">
            <span v-for="n in 5" :key="n">{{ n <= Math.round(avgRating) ? "★" : "☆" }}</span>
          </div>
          <span class="text-gray-500 text-sm mt-1">
            Based on {{ reviewsCount }} review{{ reviewsCount !== 1 ? "s" : "" }}
          </span>
        </div>

        <!-- Rating Distribution Bars -->
        <div class="w-full md:w-1/2">
          <div v-for="n in [5, 4, 3, 2, 1]" :key="n" class="flex items-center gap-3 mb-2">
            <span class="w-3 text-sm font-medium text-gray-600">{{ n }}</span>
            <div class="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
              <div
                class="bg-orange-400 h-2 rounded-full transition-all duration-300"
                :style="{ width: getPercentage(n) + '%' }"
              ></div>
            </div>
            <span class="text-sm text-gray-500 w-4 text-right">{{ getCount(n) }}</span>
          </div>
        </div>
      </div>

      <!-- 🔹 Reviews List -->
      <div class="space-y-5">
        <div
          v-for="rev in reviews"
          :key="rev.id"
          class="bg-white dark:bg-[#3B3B3B] rounded-xl p-5 flex gap-4 shadow-lg shadow-gray-200 transition"
        >
          <img
            :src="rev.traineeProfilePic || placeholder"
            alt="user"
            class="w-12 h-12 rounded-full object-cover border"
          />
          <div class="flex-1">
            <div class="flex justify-between items-center mb-1">
              <h3 class="font-semibold dark:text-white text-gray-900">
                {{ rev.traineeName || "Anonymous" }}
              </h3>
              <p class="text-xs text-gray-400">{{ formatDate(rev.createdAt) }}</p>
            </div>
            <div class="flex items-center gap-2 mb-2">
              <div class="flex text-yellow-400 text-lg">
                <span v-for="n in 5" :key="n">
                  {{ n <= Math.round(rev.rating) ? "★" : "☆" }}
                </span>
              </div>
              <span class="text-gray-500 dark:text-gray-300 text-sm">({{ rev.rating }}/5)</span>
            </div>
            <p class="text-gray-700 dark:text-white leading-relaxed">{{ rev.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "@/Firebase/firebaseConfig.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "TrainerReviews",
  data() {
    return {
      reviews: [],
      avgRating: 0,
      reviewsCount: 0,
      ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      placeholder: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    };
  },
  computed: {
    avgRatingDisplay() {
      return this.avgRating.toFixed(1);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const d = date.toDate ? date.toDate() : new Date(date);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    getCount(star) {
      return this.ratingCounts[star] || 0;
    },
    getPercentage(star) {
      if (this.reviewsCount === 0) return 0;
      return (this.ratingCounts[star] / this.reviewsCount) * 100;
    },
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const trainerId = user.uid;

      try {
        const reviewsQuery = query(collection(db, "reviews"), where("trainerId", "==", trainerId));
        const snapshot = await getDocs(reviewsQuery);
        this.reviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Calculate average rating and total reviews
        if (this.reviews.length > 0) {
          const total = this.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
          this.avgRating = total / this.reviews.length;
          this.reviewsCount = this.reviews.length;

          // Count each rating level
          this.reviews.forEach((r) => {
            const rating = Math.round(r.rating || 0);
            if (rating >= 1 && rating <= 5) {
              this.ratingCounts[rating]++;
            }
          });
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    });
  },
};
</script>

<style scoped></style>
