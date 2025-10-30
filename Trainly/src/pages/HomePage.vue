<template>
<div>
 <section class="w-[90%] md:w-[85%] mx-auto mt-10 mb-12 relative">
  <div
    class="relative flex flex-col justify-center items-center text-center text-white h-[200px] md:h-[377px] border-4 border-black rounded-3xl overflow-hidden shadow-lg"
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
  class="relative mx-auto flex items-center bg-white rounded-xl border-2 border-black shadow-md overflow-hidden w-[90%] md:w-[80%]"
>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Search here..."
    class="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 outline-none"
    @keyup.enter="goToSearch"
  />
  <button
    @click="goToSearch"
    class="absolute right-2 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
  >
    <svg
      class="w-5 h-5 text-black"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
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
        <div :class="[
          'text-white text-center py-3 rounded-xl font-bold text-2xl mb-10 shadow-md',
          sport === 'bodybuilding'
            ? 'bg-gradient-to-l from-[#166534] to-[#00C853]'
            : sport === 'tennis'
              ? 'bg-gradient-to-l from-[#B76908] to-[#FF9209]'
              : 'bg-gradient-to-l from-[#076DBF] to-[#00B0FF]'
        ]">
          {{ formatTitle(sport) }}
        </div>

        <!-- Carousel wrapper (relative) -->
        <div class="relative">
          <!-- Left Arrow (circular, vertically centered) -->
          <button @click="scrollLeft(sport)" class="absolute -left-10 top-1/2 -translate-y-1/2
bg-white/60 hover:bg-white text-gray-700
rounded-full w-10 h-10 flex items-center justify-center
shadow-lg z-20 transition-transform hover:scale-105 cursor-pointer" aria-label="Scroll left ">
            <img src="@/assets/images/left arrow.png" alt="left" class="w-4 h-4" />
          </button>

          <!-- Cards container (scrollable) -->
          <div :ref="(el) => (scrollRefs[sport] = el)"
            class="flex overflow-x-auto scrollbar-hide space-x-8 scroll-smooth px-12 py-6">
            <div v-for="trainer in group" :key="trainer.uid"
              class="relative w-[300px] h-[400px] flex-shrink-0 bg-white rounded-[25px] border border-gray-200 shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] overflow-hidden">
              <!-- Trainer Image -->
              <img :src="trainer.profilePicture || 'https://via.placeholder.com/300x200?text=No+Image'"
                :alt="trainer.firstName" class="w-full h-[230px] object-cover" />

              <!-- Trainer Info -->
              <div class="flex-1 p-5 text-left">
                <h3 class="text-[20px] font-semibold text-gray-800 mb-1">
                  {{ trainer.firstName }} {{ trainer.lastName }}
                </h3>
                <p class="text-[#00B0FF] text-md font-medium mb-2 capitalize">
                  {{ trainer.sport }}
                </p>

                <p class="text-gray-500 text-sm mb-2 flex items-center">
                  <img src="@/assets/images/mi_location.png" alt="location" class="inline w-4 h-4 mr-2" />
                  {{ trainer.city }}, {{ trainer.country }}
                </p>

                <p class="text-gray-600 text-sm flex items-center">
                  <img src="@/assets/images/line-md_star-filled.png" alt="star" class="inline w-4 h-4 mr-2" />
                  <span class="font-semibold text-[#00B0FF]">
                    {{ trainer.avgRating ? trainer.avgRating.toFixed(1) : "N/A" }}
                  </span>
                </p>
              </div>

              <!-- View Profile Button at bottom-right -->
              <div class="absolute bottom-4 right-4">
                <router-link
                  :to="{ path: '/viewtrainerprofile', query: { uid: trainer.uid } }"
                  class="bg-[#00B0FF] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-[15px] transition cursor-pointer">
                  View Profile
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right Arrow (circular, vertically centered) -->
          <button @click="scrollRight(sport)"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-white/80 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-20 transition-transform hover:scale-105"
            aria-label="Scroll right">
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

const bgImage = new URL("@/assets/images/homepage.png", import.meta.url).href;
const scrollRefs = ref({});
const trainers = ref({ bodybuilding: [], tennis: [], padel: [] });

const scrollLeft = (sport) => {
  const el = scrollRefs.value[sport];
  if (el) el.scrollBy({ left: -350, behavior: "smooth" });
};

const scrollRight = (sport) => {
  const el = scrollRefs.value[sport];
  if (el) el.scrollBy({ left: 350, behavior: "smooth" });
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
