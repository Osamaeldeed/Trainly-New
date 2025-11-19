<template>
  <div class="bg-white dark:bg-black">
    <section class="w-full mx-auto mt-10 mb-12 relative">
      <div
        class="relative flex flex-col justify-center items-center text-center text-white h-[200px] md:h-[377px] overflow-hidden shadow-lg"
        :style="{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Content -->
        <div class="relative z-10 w-full max-w-3xl px-4">
          <h1 class="text-md md:text-3xl font-bold mb-4">
            Achieve Your Fitness Goals with Top Trainers
          </h1>
          <p class="text-sm md:text-l mb-8">
            Connect with expert coaches in gym, tennis, and padel — all in one platform.
          </p>

          <!-- Search Bar -->
          <div
            class="relative mx-auto flex items-center bg-white dark:bg-[#3B3B3B] rounded-xl shadow-md overflow-hidden w-[90%] md:w-[80%]"
            :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }"
          >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Coach name, Sport..."
              class="flex-1 px-5 py-3 text-gray-800 dark:text-white placeholder-gray-400 outline-none"
              :class="{ 'text-right': $i18n.locale === 'ar' }"
              @keyup.enter="goToSearch"
            />
            <button
              @click="goToSearch"
              class="absolute hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
              :class="{ 'right-2': $i18n.locale !== 'ar', 'left-2': $i18n.locale === 'ar' }"
            >
              <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Trainers Section -->
    <div class="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div v-for="(group, sport) in trainers" :key="sport">
        <!-- Section Header -->
        <div
          :class="[
            'text-white text-center py-3 rounded-xl font-bold text-2xl mb-10 shadow-md',
            sport === 'bodybuilding'
              ? 'bg-gradient-to-l from-[#166534] to-[#00C853]'
              : sport === 'tennis'
                ? 'bg-gradient-to-l from-[#B76908] to-[#FF9209]'
                : 'bg-gradient-to-l from-[#076DBF] to-[#00B0FF]',
          ]"
        >
          {{ formatTitle(sport) }}
        </div>

        <!-- Carousel wrapper (relative) -->
        <div class="relative">
          <!-- Left Arrow (circular, vertically centered) -->
          <button
            @click="scrollLeft(sport)"
            class="absolute top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-20 transition-transform hover:scale-105 cursor-pointer"
            :class="{ 'left-3 md:-left-10': $i18n.locale !== 'ar', 'right-3 md:-right-10': $i18n.locale === 'ar' }"
            aria-label="Scroll left"
          >
            <img src="@/assets/images/left arrow.png" alt="left" class="w-4 h-4" />
          </button>

          <!-- Cards container (scrollable) -->
          <div
            :ref="(el) => (scrollRefs[sport] = el)"
            class="flex overflow-x-auto scrollbar-hide scroll-smooth px-12 py-6"
            :class="{ 'space-x-8': $i18n.locale !== 'ar', 'space-x-reverse': $i18n.locale === 'ar' }"
          >
            <div
              v-for="trainer in group"
              :key="trainer.uid"
              class="relative w-[300px] h-[400px] shrink-0 bg-white dark:bg-[#3B3B3B] rounded-[25px] border border-gray-200 shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] overflow-hidden"
            >
              <!-- Trainer Image -->
              <img
                :src="trainer.profilePicture || 'https://via.placeholder.com/300x200?text=No+Image'"
                :alt="trainer.firstName"
                class="w-full h-[230px] object-cover"
              />

              <!-- Trainer Info -->
              <div class="flex-1 p-5">
                <h3 class="text-[20px] font-semibold text-gray-800 dark:text-white mb-1" :class="{ 'text-right': $i18n.locale === 'ar' }">
                  {{ trainer.firstName }} {{ trainer.lastName }}
                </h3>
                <p class="text-[#00B0FF] dark:text-gray-200 text-md font-medium mb-2 capitalize" :class="{ 'text-right': $i18n.locale === 'ar' }">
                  {{ trainer.sport }}
                </p>

                <div class="flex items-center text-sm text-gray-700 mb-2" v-if="trainer.city">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="capitalize dark:text-gray-200"
                    >{{ trainer.city }}{{ trainer.country ? `, ${trainer.country}` : "" }}</span
                  >
                </div>

                <div class="flex items-center justify-between mt-3" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                  <div class="flex items-center gap-2 text-sm" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                    <span class="text-yellow-500">★</span>
                    <span class="font-semibold text-[#00B0FF]">
                      {{ trainer.avgRating !== null ? trainer.avgRating.toFixed(1) : "N/A" }}
                    </span>
                    <span class="text-gray-500 dark:text-gray-300 text-xs"
                      >({{ trainer.reviewsCount || 0 }})</span
                    >
                  </div>

                  <router-link
                    :to="{ path: '/viewtrainerprofile', query: { uid: trainer.uid } }"
                    class="bg-[#00B0FF] dark:bg-[#1e1e1e] hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-[12px] text-sm transition"
                  >
                    View Profile
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Arrow (circular, vertically centered) -->
          <button
            @click="scrollRight(sport)"
            class="absolute top-1/2 -translate-y-1/2 cursor-pointer bg-white/80 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-20 transition-transform hover:scale-105"
            :class="{ 'right-3': $i18n.locale !== 'ar', 'left-3': $i18n.locale === 'ar' }"
            aria-label="Scroll right"
          >
            <img src="@/assets/images/right arrow.png" alt="right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const bgImage = new URL("@/assets/images/homepage.png", import.meta.url).href;
const scrollRefs = ref({});
const trainers = ref({ bodybuilding: [], tennis: [], padel: [] });

const scrollLeft = (sport) => {
  const el = scrollRefs.value[sport];
  if (el) {
    const direction = locale.value === 'ar' ? 350 : -350;
    el.scrollBy({ left: direction, behavior: "smooth" });
  }
};

const scrollRight = (sport) => {
  const el = scrollRefs.value[sport];
  if (el) {
    const direction = locale.value === 'ar' ? -350 : 350;
    el.scrollBy({ left: direction, behavior: "smooth" });
  }
};

const formatTitle = (key) => {
  const titles = { bodybuilding: "Bodybuilding", tennis: "Tennis", padel: "Padel" };
  return titles[key] || key;
};
import { useRouter } from "vue-router";
const router = useRouter();
const searchQuery = ref("");

const goToSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "search", query: { q: searchQuery.value } });
  } else {
    router.push({ name: "search" });
  }
};

// ✅ Fetch trainers and their average ratings
const fetchTrainers = async () => {
  try {
    const q = query(collection(db, "users"), where("role", "==", "trainer"));
    const snapshot = await getDocs(q);

    const data = { bodybuilding: [], tennis: [], padel: [] };

    // First, collect trainers
    const trainersList = [];
    snapshot.forEach((doc) => {
      const trainer = { uid: doc.id, ...doc.data() };
      trainersList.push(trainer);
    });

    // Then fetch reviews for each trainer
    for (const trainer of trainersList) {
      const reviewsQuery = query(collection(db, "reviews"), where("trainerId", "==", trainer.uid));
      const reviewsSnap = await getDocs(reviewsQuery);

      let total = 0;
      let count = 0;

      reviewsSnap.forEach((r) => {
        const rating = r.data().rating;
        if (rating) {
          total += rating;
          count++;
        }
      });

      trainer.avgRating = count > 0 ? total / count : null;
      trainer.reviewsCount = count;

      // Add trainer to proper category
      const sport = trainer.sport?.toLowerCase();
      if (sport === "bodybuilding") data.bodybuilding.push(trainer);
      else if (sport === "tennis") data.tennis.push(trainer);
      else if (sport === "padel") data.padel.push(trainer);
    }

    trainers.value = data;
    console.log("✅ Trainers fetched with ratings:", data);
  } catch (error) {
    console.error("❌ Error fetching trainers:", error);
  }
};

onMounted(fetchTrainers);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
