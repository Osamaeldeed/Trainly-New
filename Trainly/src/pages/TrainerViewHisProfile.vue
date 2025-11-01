<template>
  <div class="min-h-screen bg-gray-50 pb-10">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-10">
      <div class="text-center py-20">
        <div class="inline-block animate-pulse text-gray-500 text-lg">Loading your profile...</div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 py-10">
      <div class="text-center py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto mb-4 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-red-500 text-lg font-medium">{{ error }}</p>
        <button
          @click="retryLoad"
          class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 py-10">
      <!-- Info Banner -->
      <div class="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 class="font-semibold text-blue-900 mb-1">Preview Mode</h3>
          <p class="text-sm text-blue-700">
            This is how your clients see your profile. Want to make changes? Go to your
            <router-link
              to="/trainer/settings"
              class="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer"
            >
              Profile Settings
            </router-link>
            or Add new
            <router-link
              to="/trainer/plans"
              class="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer"
            >
              Plans
            </router-link>
          </p>
        </div>
      </div>

      <!-- HERO -->
      <div class="relative mb-10">
        <div
          class="bg-linear-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6 pl-36 pr-6 flex items-center shadow-sm"
        >
          <!-- Profile Image -->
          <img
            :src="trainer.profilePicture || placeholder"
            alt="trainer profile"
            class="absolute -top-6 left-6 w-40 h-40 object-cover rounded-xl border-4 border-white shadow-xl"
            @error="handleImageError"
          />

          <div class="ml-28 w-full">
            <h1 class="text-3xl font-bold text-gray-900 mb-1">
              {{ trainer.firstName }} {{ trainer.lastName }}
            </h1>
            <p class="text-sky-600 font-medium text-lg mb-4">
              {{ trainer.sport ? capitalize(trainer.sport) + " Coach" : "Fitness Coach" }}
            </p>

            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-700">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="font-semibold">Username:</span>
                <span class="text-gray-600"
                  >@{{ trainer.username || trainer.userName || "N/A" }}</span
                >
              </div>

              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span class="font-semibold">Experience:</span>
                <span class="text-gray-600">{{ getExperience() }} years</span>
              </div>

              <div class="flex items-center gap-2 text-gray-600">
                <svg
                  class="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  ></path>
                  <circle cx="12" cy="9" r="2.5"></circle>
                </svg>
                <span class="capitalize">{{ getLocation() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Plans -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Your Training Plans</h2>
          <span class="text-sm text-gray-500">{{ plans.length }} plan(s) available</span>
        </div>

        <div v-if="plans.length === 0" class="text-center py-12 bg-white rounded-xl border">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="text-gray-500">No training plans created yet.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="bg-white rounded-xl overflow-hidden shadow-md border hover:shadow-xl transition-all"
          >
            <div class="h-48 overflow-hidden bg-gray-100">
              <img
                :src="plan.image || placeholder"
                alt="plan image"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
            </div>

            <div class="p-5">
              <h3 class="font-bold text-lg mb-2 text-gray-900">
                {{ plan.title || "Untitled Plan" }}
              </h3>
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                {{ plan.description || "No description available." }}
              </p>

              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Duration:</span>
                  <span class="font-semibold text-gray-900">{{ plan.duration || "N/A" }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Sessions:</span>
                  <span class="font-semibold text-gray-900">{{ plan.sessions || "N/A" }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Price:</span>
                  <span class="font-bold text-green-600 text-lg">{{
                    formatPrice(plan.price)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Certificates -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Your Certificates & Qualifications</h2>
          <span class="text-sm text-gray-500"
            >{{ (trainer.certifications || []).length }} certificate(s)</span
          >
        </div>

        <div
          v-if="!(trainer.certifications && trainer.certifications.length)"
          class="text-center py-12 bg-white rounded-xl border"
        >
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-500">No certificates uploaded yet.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="(cert, idx) in trainer.certifications"
            :key="idx"
            class="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer"
            @click="viewCertificate(cert)"
          >
            <img
              :src="cert"
              alt="certificate"
              class="w-full h-56 object-contain bg-gray-50 p-2"
              @error="handleImageError"
            />
          </div>
        </div>
      </section>

      <!-- Reviews -->
      <section class="mb-20">
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h2>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="text-3xl font-bold text-sky-600">{{ avgRatingDisplay }}</span>
                <div class="flex text-yellow-400 text-xl">
                  <span v-for="n in 5" :key="n">{{
                    n <= Math.round(avgRating || 0) ? "★" : "☆"
                  }}</span>
                </div>
              </div>
              <span class="text-gray-500 text-sm"
                >({{ reviewsCount }} review{{ reviewsCount !== 1 ? "s" : "" }})</span
              >
            </div>
          </div>
        </div>

        <div v-if="reviews.length === 0" class="text-center py-12 bg-white rounded-xl border">
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
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p class="text-gray-500 text-lg">No reviews yet.</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="rev in reviews"
            :key="rev.id"
            class="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start gap-4">
              <img
                :src="rev.traineeProfilePic || rev.reviewerPhoto || placeholder"
                alt="reviewer"
                class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                @error="handleImageError"
              />

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div>
                    <div class="font-semibold text-gray-900">
                      {{ rev.traineeName || rev.reviewerName || "Anonymous" }}
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                      <div class="flex text-yellow-400">
                        <span v-for="n in 5" :key="n" class="text-lg">
                          {{ n <= Math.round(rev.rating || 0) ? "★" : "☆" }}
                        </span>
                      </div>
                      <span class="text-sm text-gray-500">({{ rev.rating || 0 }}/5)</span>
                    </div>
                  </div>
                  <div class="text-xs text-gray-400">{{ formatDate(rev.createdAt) }}</div>
                </div>

                <p class="text-gray-700 leading-relaxed mb-3">{{ rev.comment }}</p>

                <div v-if="rev.status || rev.sessionType" class="flex flex-wrap gap-3 text-xs">
                  <span
                    v-if="rev.status"
                    class="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium"
                  >
                    {{ capitalize(rev.status) }}
                  </span>
                  <span
                    v-if="rev.sessionType"
                    class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium"
                  >
                    {{ capitalize(rev.sessionType) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";

// auth
const auth = getAuth();

// Get current user's UID (trainer viewing their own profile)
const uid = ref(null);

// placeholders
const placeholder = "https://via.placeholder.com/400x300?text=No+Image";

// state
const trainer = ref({});
const plans = ref([]);
const reviews = ref([]);
const loading = ref(true);
const error = ref(null);

const avgRating = ref(null);
const reviewsCount = ref(0);

// computed helpers
const avgRatingDisplay = computed(() =>
  avgRating.value !== null ? avgRating.value.toFixed(1) : "N/A",
);

// ------------------ Fetch trainer doc ------------------
const fetchTrainer = async () => {
  if (!uid.value) {
    error.value = "You must be logged in to view your profile";
    return;
  }

  try {
    const docRef = doc(db, "users", uid.value);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      trainer.value = {
        id: snap.id,
        ...data,
        certifications: data.certifications || [],
      };
    } else {
      error.value = "Profile not found";
      trainer.value = {};
    }
  } catch (err) {
    console.error("fetchTrainer error:", err);
    error.value = "Failed to load your profile";
    trainer.value = {};
  }
};

// ------------------ Fetch plans ------------------
const fetchPlans = async () => {
  plans.value = [];
  if (!uid.value) return;

  try {
    const pq = query(collection(db, "plans"), where("trainer_uid", "==", uid.value));
    const snap = await getDocs(pq);

    if (!snap.empty) {
      plans.value = snap.docs
        .map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: data.title || "Untitled Plan",
            description: data.description || "",
            duration: data.duration || "N/A",
            sessions: data.sessions || "N/A",
            price: data.price || 0,
            status: data.status || "active",
            location: data.location || "",
            image: data.image || data.planImage || null,
            clientsCount: data.clientsCount || 0,
            trainer_uid: data.trainer_uid,
          };
        })
        .filter((plan) => plan.status.toLowerCase() === "active");
    }
  } catch (err) {
    console.error("fetchPlans error:", err);
    plans.value = [];
  }
};

// ------------------ Fetch reviews ------------------
const fetchReviews = async () => {
  if (!uid.value) return;

  reviews.value = [];
  avgRating.value = null;
  reviewsCount.value = 0;

  try {
    let snap = null;

    // Try top-level "reviews" collection first
    try {
      const q = query(collection(db, "reviews"), where("trainerId", "==", uid.value));
      snap = await getDocs(q);
    } catch {
      snap = null;
    }

    // Fallback to subcollection
    if (!snap || snap.empty) {
      try {
        const subQ = query(collection(db, `users/${uid.value}/reviews`));
        snap = await getDocs(subQ);
      } catch {
        snap = null;
      }
    }

    if (snap && !snap.empty) {
      const list = [];
      snap.forEach((d) => {
        const data = d.data();
        const rating =
          typeof data.rating === "number" ? data.rating : data.rate ? Number(data.rate) : 0;

        list.push({
          id: d.id,
          comment: data.comment || data.text || "",
          rating,
          createdAt: data.createdAt ?? null,
          status: data.status || null,
          traineeId: data.traineeId || data.reviewerUid || null,
          traineeName: data.traineeName || data.reviewerName || null,
          traineeProfilePic: data.traineeProfilePic || data.reviewerPhoto || null,
          trainerId: data.trainerId || null,
          trainerName: data.trainerName || null,
          trainerProfilePic: data.trainerProfilePic || null,
          sessionType: data.sessionType || null,
        });
      });

      // Sort by date
      list.sort((a, b) => {
        const toMillis = (x) => {
          if (!x) return 0;
          if (x.toDate && typeof x.toDate === "function") return x.toDate().getTime();
          const t = new Date(x);
          return isNaN(t.getTime()) ? 0 : t.getTime();
        };
        return toMillis(b.createdAt) - toMillis(a.createdAt);
      });

      reviews.value = list;

      // Compute average
      let total = 0;
      let count = 0;
      list.forEach((r) => {
        if (typeof r.rating === "number" && r.rating > 0) {
          total += r.rating;
          count++;
        }
      });
      avgRating.value = count > 0 ? total / count : null;
      reviewsCount.value = count;
    }
  } catch (err) {
    console.error("fetchReviews error:", err);
  }
};

// ------------------ Overall load ------------------
const loadData = async () => {
  loading.value = true;
  error.value = null;

  // Get current user's UID
  const user = auth.currentUser;
  if (!user) {
    error.value = "Please login to view your profile";
    loading.value = false;
    return;
  }

  uid.value = user.uid;

  await fetchTrainer();
  if (!error.value) {
    await Promise.all([fetchPlans(), fetchReviews()]);
  }

  loading.value = false;
};

const retryLoad = () => {
  loadData();
};

onMounted(() => {
  loadData();
});

// ------------------ Helpers ------------------
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "");
const getExperience = () => {
  const exp = trainer.value.experience ?? trainer.value.yearsOfExperience;
  return exp !== null && exp !== undefined ? exp : "N/A";
};
const getLocation = () => {
  const city = trainer.value.city;
  const country = trainer.value.country;
  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return "Location not specified";
};
const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "N/A";
  return `$${Number(price).toFixed(2)}`;
};
const formatDate = (ts) => {
  if (!ts) return "N/A";
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "N/A";
  }
};
const handleImageError = (e) => {
  e.target.src = placeholder;
};
const viewCertificate = (certUrl) => window.open(certUrl, "_blank");
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  text-overflow: ellipsis;
}
</style>
