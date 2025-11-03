<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-[#1e1e1e]">
    <!-- Mobile Filter Button -->
    <div
      v-if="userRole === 'trainee'"
      class="md:hidden sticky top-0 z-10 bg-white dark:bg-black border-b p-4"
    >
      <button
        type="button"
        @click="toggleMobileFilters"
        class="w-full bg-[#0D8BF2] hover:bg-blue-600 text-white dark:text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span>Filters</span>
      </button>
    </div>

    <!-- Mobile Filter Overlay -->
    <div
      v-if="userRole === 'trainee' && showMobileFilters"
      class="fixed inset-0 filter backdrop-blur-sm bg-opacity-50 z-20 md:hidden"
      @click="showMobileFilters = false"
    >
      <div
        class="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white dark:bg-black p-6 overflow-y-auto"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-semibold text-xl">Filter By</h2>
          <button
            type="button"
            @click="showMobileFilters = false"
            class="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="mb-6">
          <h3 class="text-blue-600 font-semibold mb-3">Sports</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="bodybuilding"
                v-model="filters.sport"
                class="cursor-pointer"
              />
              Bodybuilding
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="tennis" v-model="filters.sport" class="cursor-pointer" />
              Tennis
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="padel" v-model="filters.sport" class="cursor-pointer" />
              Padel
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="" v-model="filters.sport" class="cursor-pointer" /> All
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-blue-600 font-semibold mb-3">City</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="cairo" v-model="filters.city" class="cursor-pointer" />
              Cairo
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="giza" v-model="filters.city" class="cursor-pointer" /> Giza
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="alexandria"
                v-model="filters.city"
                class="cursor-pointer"
              />
              Alexandria
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="ismailia" v-model="filters.city" class="cursor-pointer" />
              Ismailia
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="" v-model="filters.city" class="cursor-pointer" /> All
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-blue-600 font-semibold mb-3">Ratings (min)</h3>
          <div class="space-y-2">
            <label
              v-for="n in [5, 4, 3, 2, 1]"
              :key="n"
              class="flex items-center gap-1 cursor-pointer"
            >
              <input
                type="radio"
                :value="n"
                v-model.number="filters.rating"
                class="cursor-pointer"
              />
              <span class="flex items-center text-yellow-500">
                <span v-for="i in n" :key="i">★</span>
              </span>
              <span class="text-sm text-gray-600 ml-2"> & Up</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                :value="0"
                v-model.number="filters.rating"
                class="cursor-pointer"
              />
              <span class="text-sm text-gray-600 ml-2">All</span>
            </label>
          </div>
        </div>

        <button
          type="button"
          @click="clearFilters"
          class="w-full mb-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition"
        >
          Clear Filters
        </button>

        <button
          type="button"
          @click="applyAndCloseMobile"
          class="w-full bg-[#0D8BF2] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition"
        >
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Desktop Sidebar Filters -->
    <aside
      class="hidden md:block w-64 bg-white dark:bg-[#3B3B3B] text-black dark:text-white rounded-xl m-4 p-6 border-[#0D8BF2] border-2 h-fit sticky top-4"
      v-if="userRole === 'trainee'"
    >
      <h2 class="font-semibold dark:text-gray-200 text-lg mb-4">Filter By</h2>

      <div class="mb-6">
        <h3 class="text-blue-600 dark:text-gray-200 font-semibold mb-2">Sports</h3>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="bodybuilding"
              v-model="filters.sport"
              class="cursor-pointer"
            />
            Bodybuilding
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="tennis" v-model="filters.sport" class="cursor-pointer" />
            Tennis
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="padel" v-model="filters.sport" class="cursor-pointer" />
            Padel
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="" v-model="filters.sport" class="cursor-pointer" /> All
          </label>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-blue-600 font-semibold dark:text-gray-200 mb-2">City</h3>
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="cairo" v-model="filters.city" class="cursor-pointer" /> Cairo
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="giza" v-model="filters.city" class="cursor-pointer" /> Giza
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="alexandria" v-model="filters.city" class="cursor-pointer" />
            Alexandria
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="ismailia" v-model="filters.city" class="cursor-pointer" />
            Ismailia
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" value="" v-model="filters.city" class="cursor-pointer" /> All
          </label>
        </div>
      </div>

      <div>
        <h3 class="text-blue-600 font-semibold dark:text-gray-200 mb-2">Ratings (min)</h3>
        <div class="space-y-1">
          <label
            v-for="n in [5, 4, 3, 2, 1]"
            :key="n"
            class="flex items-center gap-1 cursor-pointer"
          >
            <input type="radio" :value="n" v-model.number="filters.rating" class="cursor-pointer" />
            <span class="flex items-center text-yellow-500">
              <span v-for="i in n" :key="i">★</span>
            </span>
            <span class="text-sm text-gray-600 dark:text-gray-200 ml-2"> & Up</span>
          </label>
          <label class="flex items-center gap-1 cursor-pointer">
            <input type="radio" :value="0" v-model.number="filters.rating" class="cursor-pointer" />
            <span class="text-sm text-gray-600 dark:text-gray-200 ml-2">All</span>
          </label>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <button
        @click="clearFilters"
        class="w-full mt-6 bg-gray-300 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition cursor-pointer"
      >
        Clear Filters
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 justify-center mb-8">
      <div class="max-w-6xl mx-auto">
        <!-- Search input top -->
        <div class="flex justify-center mb-6">
          <div
            class="max-w-xl w-full flex items-center border rounded-full px-4 py-2 bg-white dark:bg-[#3B3B3B] text-black dark:text-white shadow-sm"
          >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search trainers by name or sport..."
              class="flex-1 outline-none placeholder-gray-400 px-2"
              @keyup.enter="onSearchClicked"
            />
            <button
              @click="onSearchClicked"
              type="button"
              class="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-black cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

        <div class="mb-4 text-center" v-if="displayQuery">
          <h2 class="font-semibold text-lg">
            Search Results for "<span class="text-blue-600">{{ displayQuery }}</span
            >"
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">
            {{ filteredTrainers.length }} trainer(s) found
          </p>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-pulse text-gray-500 dark:text-gray-300">
            Loading trainers...
          </div>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-500">{{ error }}</div>
          <button
            @click="fetchTrainers"
            class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>

        <div v-else>
          <div v-if="filteredTrainers.length === 0" class="text-center py-12 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-lg font-medium dark:text-gray-300">No trainers found</p>
            <p class="text-sm mt-2 dark:text-gray-300">Try adjusting your search or filters</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="trainer in filteredTrainers"
              :key="trainer.id"
              class="bg-white dark:bg-[#3B3B3B] rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-shadow"
            >
              <img
                :src="trainer.profilePicture || placeholder"
                alt="trainer profile"
                class="h-48 w-full object-cover"
                @error="handleImageError"
              />
              <div class="p-4">
                <h3 class="font-semibold text-lg truncate dark:text-white">
                  {{ trainer.firstName }} {{ trainer.lastName }}
                </h3>
                <p class="text-[#00B0FF] dark:text-gray-200 text-sm font-medium mb-2 capitalize">
                  {{ trainer.sport || "N/A" }}
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

                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-yellow-500">★</span>
                    <span class="font-semibold text-[#00B0FF]">
                      {{ trainer.avgRating !== null ? trainer.avgRating.toFixed(1) : "N/A" }}
                    </span>
                    <span class="text-gray-500 dark:text-gray-300 text-xs"
                      >({{ trainer.reviewsCount || 0 }})</span
                    >
                  </div>

                  <router-link
                    :to="{ path: '/viewtrainerprofile', query: { uid: trainer.id } }"
                    class="bg-[#00B0FF] dark:bg-[#1e1e1e] hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-[12px] text-sm transition"
                  >
                    View Profile
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const route = useRoute();
const router = useRouter();

const placeholder = "https://via.placeholder.com/400x300?text=No+Image";

// reactive state
const searchQuery = ref(route.query.q || "");
const displayQuery = ref(searchQuery.value || "");
const userRole = ref(null);
const userData = ref(null);
const loading = ref(true);
const error = ref(null);
const trainers = ref([]);

// <-- NEW: mobile drawer state for filters
const showMobileFilters = ref(false);

const filters = ref({
  sport: "",
  city: "",
  rating: 0,
});

// helpers
const normalize = (s) => (s || "").toString().trim().toLowerCase();

// --- NEW: mobile filter helpers
const applyAndCloseMobile = () => {
  showMobileFilters.value = false;
  // تحديث عرض الكويري لو حابب يظهر نص البحث بعد الضغط Apply
  displayQuery.value = searchQuery.value || "";
};

const toggleMobileFilters = () => {
  showMobileFilters.value = !showMobileFilters.value;
};
// --- end new

// fetch current user info (to determine role)
const fetchCurrentUser = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      userData.value = data;
      userRole.value = data.role;
    }
  } catch (e) {
    console.error("Error fetching user:", e);
  }
};

// fetch trainers + attach avg rating
const fetchTrainers = async () => {
  loading.value = true;
  error.value = null;
  trainers.value = [];

  try {
    const q = query(collection(db, "users"), where("role", "==", "trainer"));
    const snap = await getDocs(q);

    const list = [];
    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const t = {
        id: docSnap.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        profilePicture: data.profilePicture || "",
        sport: normalize(data.sport || ""),
        city: normalize(data.city || ""),
        country: data.country || "",
        avgRating: null,
        reviewsCount: 0,
      };
      list.push(t);
    }

    // attach ratings
    await Promise.all(
      list.map(async (t) => {
        try {
          const reviewsQ = query(collection(db, "reviews"), where("trainerId", "==", t.id));
          const reviewsSnap = await getDocs(reviewsQ);
          let total = 0;
          let count = 0;
          reviewsSnap.forEach((r) => {
            const rating = r.data().rating;
            if (typeof rating === "number" && rating >= 0 && rating <= 5) {
              total += rating;
              count++;
            }
          });
          t.avgRating = count > 0 ? total / count : null;
          t.reviewsCount = count;
        } catch (err) {
          console.error(`Error fetching reviews for trainer ${t.id}:`, err);
          t.avgRating = null;
          t.reviewsCount = 0;
        }
      }),
    );

    trainers.value = list;
  } catch (err) {
    console.error("Error fetching trainers:", err);
    error.value = "Failed to load trainers. Please try again.";
    trainers.value = [];
  } finally {
    loading.value = false;
  }
};

// clear all filters
const clearFilters = () => {
  filters.value = {
    sport: "",
    city: "",
    rating: 0,
  };
};

// handle image loading errors
const handleImageError = (e) => {
  e.target.src = placeholder;
};

// get current logged-in user to set role
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchCurrentUser(user.uid);
      await fetchTrainers();
    } else {
      loading.value = false;
    }
  });
});

// computed: apply search + filters
const filteredTrainers = computed(() => {
  const q = normalize(searchQuery.value || "");
  const selSport = normalize(filters.value.sport || "");
  const selCity = normalize(filters.value.city || "");
  const minRating = Number(filters.value.rating || 0);

  return trainers.value.filter((t) => {
    const name = normalize(`${t.firstName} ${t.lastName}`);
    const sport = normalize(t.sport);
    const city = normalize(t.city);

    // search matching: name or sport contains query
    const matchesSearch = !q || name.includes(q) || sport.includes(q);
    const matchesSport = !selSport || sport === selSport;
    const matchesCity = !selCity || city === selCity;
    const ratingValue = t.avgRating || 0;
    const matchesRating = minRating === 0 || ratingValue >= minRating;

    return matchesSearch && matchesSport && matchesCity && matchesRating;
  });
});

// when user clicks search: update route.query
const onSearchClicked = () => {
  const q = (searchQuery.value || "").trim();
  displayQuery.value = q;
  if (q) {
    router.push({ name: "search", query: { q } });
  } else {
    router.push({ name: "search" });
  }
};

// react to route query changes
watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ || "";
    displayQuery.value = searchQuery.value || "";
  },
  { immediate: true },
);
</script>

<style scoped>
input[type="radio"] {
  accent-color: #3b82f6;
}
</style>
