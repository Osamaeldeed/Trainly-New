<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-10">
      <div class="text-center py-20">
        <div class="inline-block animate-pulse text-gray-500 text-lg">Loading trainer profile...</div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 py-10">
      <div class="text-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-500 text-lg font-medium">{{ error }}</p>
        <button
          @click="loadData"
          class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 py-10">
      <!-- HERO -->
      <div class="relative mb-10">
        <div class="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6 pl-36 pr-6 flex items-center shadow-sm">
          <!-- Profile Image -->
          <img
            :src="trainer.profilePicture || placeholder"
            alt="trainer profile"
            class="absolute -top-6 left-6 w-40 h-40 object-cover rounded-xl border-4 border-white shadow-xl"
            @error="handleImageError"
          />

          <div class="ml-28 w-full flex items-center justify-between flex-wrap gap-4">
            <div class="flex-1 min-w-0">
              <h1 class="text-3xl font-bold text-gray-900 mb-1">
                {{ trainer.firstName }} {{ trainer.lastName }}
              </h1>
              <p class="text-sky-600 font-medium text-lg mb-4">
                {{ trainer.sport ? capitalize(trainer.sport) + ' Coach' : 'Fitness Coach' }}
              </p>

              <div class="flex flex-wrap items-center gap-6 text-sm text-gray-700">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="font-semibold">Username:</span>
                  <span class="text-gray-600">@{{ trainer.username || trainer.userName || 'N/A' }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span class="font-semibold">Experience:</span>
                  <span class="text-gray-600">{{ getExperience() }} years</span>
                </div>

                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                    <circle cx="12" cy="9" r="2.5"></circle>
                  </svg>
                  <span class="capitalize">{{ getLocation() }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button
                @click="contactTrainer"
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold shadow-lg transition-all transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Trainer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Plans -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Training Plans</h2>
          <span class="text-sm text-gray-500">{{ plans.length }} plan(s) available</span>
        </div>

        <div v-if="plans.length === 0" class="text-center py-12 bg-white rounded-xl border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-500">No training plans available yet.</p>
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
              <h3 class="font-bold text-lg mb-2 text-gray-900">{{ plan.title || 'Untitled Plan' }}</h3>
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ plan.description || 'No description available.' }}</p>

              <div class="space-y-2 mb-4 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Duration:</span>
                  <span class="font-semibold text-gray-900">{{ plan.duration || 'N/A' }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Sessions:</span>
                  <span class="font-semibold text-gray-900">{{ plan.sessions || 'N/A' }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Price:</span>
                  <span class="font-bold text-green-600 text-lg">{{ formatPrice(plan.price) }}</span>
                </div>
              </div>

              <button
                @click="bookPlan(plan, $event)"
                :disabled="bookingPlanId === plan.id"
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="bookingPlanId === plan.id" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-if="bookingPlanId === plan.id">Processing...</span>
                <span v-else>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Certificates -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Certificates & Qualifications</h2>
          <span class="text-sm text-gray-500">{{ (trainer.certifications || []).length }} certificate(s)</span>
        </div>

        <div v-if="!(trainer.certifications && trainer.certifications.length)" class="text-center py-12 bg-white rounded-xl border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  <span v-for="n in 5" :key="n">{{ n <= Math.round(avgRating || 0) ? '★' : '☆' }}</span>
                </div>
              </div>
              <span class="text-gray-500 text-sm">({{ reviewsCount }} review{{ reviewsCount !== 1 ? 's' : '' }})</span>
            </div>
          </div>

          <button
            @click="openAddReview"
            class="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Review
          </button>
        </div>

        <div v-if="reviews.length === 0" class="text-center py-12 bg-white rounded-xl border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <p class="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
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
                    <div class="font-semibold text-gray-900">{{ rev.traineeName || rev.reviewerName || 'Anonymous' }}</div>
                    <div class="flex items-center gap-2 mt-1">
                      <div class="flex text-yellow-400">
                        <span v-for="n in 5" :key="n" class="text-lg">
                          {{ n <= Math.round(rev.rating || 0) ? '★' : '☆' }}
                        </span>
                      </div>
                      <span class="text-sm text-gray-500">({{ rev.rating || 0 }}/5)</span>
                    </div>
                  </div>
                  <div class="text-xs text-gray-400">{{ formatDate(rev.createdAt) }}</div>
                </div>

                <p class="text-gray-700 leading-relaxed mb-3">{{ rev.comment }}</p>

                <div v-if="rev.status || rev.sessionType" class="flex flex-wrap gap-3 text-xs">
                  <span v-if="rev.status" class="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    {{ capitalize(rev.status) }}
                  </span>
                  <span v-if="rev.sessionType" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {{ capitalize(rev.sessionType) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Add Review Modal -->
    <Teleport to="body">
      <div
        v-if="showAddReview"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        @click.self="closeAddReview"
      >
        <div class="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative animate-fade-in">
          <div class="p-6 border-b">
            <button
              @click="closeAddReview"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 class="text-2xl font-bold text-gray-900">Add Your Review</h3>
            <p class="text-sm text-gray-500 mt-1">Share your experience with this trainer</p>
          </div>

          <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
              <input
                v-model="newReview.reviewerName"
                type="text"
                placeholder="Enter your name"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Rating *</label>
              <div class="flex items-center gap-2">
                <select
                  v-model.number="newReview.rating"
                  class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
                </select>
                <div class="flex text-yellow-400 text-2xl">
                  <span v-for="n in 5" :key="n">{{ n <= newReview.rating ? '★' : '☆' }}</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Your Review *</label>
              <textarea
                v-model="newReview.comment"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition resize-none"
                rows="4"
                placeholder="Share your experience with this trainer..."
                required
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-semibold text-gray-700 mb-2 block">Phone (optional)</label>
                <input
                  v-model="newReview.phone"
                  type="tel"
                  placeholder="+20 123 456 7890"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label class="text-sm font-semibold text-gray-700 mb-2 block">Session Type (optional)</label>
                <select
                  v-model="newReview.sessionType"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select type</option>
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-6 border-t bg-gray-50 flex justify-end gap-3">
            <button
              @click="closeAddReview"
              class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium cursor-pointer"
              :disabled="addingReview"
            >
              Cancel
            </button>
            <button
              @click="submitReview"
              :disabled="addingReview || !canSubmitReview"
              class="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition font-semibold cursor-pointer"
            >
              <span v-if="addingReview">Adding...</span>
              <span v-else>Submit Review</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";

// Config — غيّر لو السيرفر مش على localhost:3000
const API_URL = 'http://localhost:3000';

// router / auth
const route = useRoute();
const router = useRouter();
const auth = getAuth();

// trainer uid source (query or params)
const uid = route.query.uid || route.params.uid || null;

// placeholders
const placeholder = "https://via.placeholder.com/400x300?text=No+Image";

// state
const trainer = ref({});
const plans = ref([]);
const reviews = ref([]);
const loading = ref(true);
const error = ref(null);
const bookingPlanId = ref(null); // loading state للزرار

const avgRating = ref(null);
const reviewsCount = ref(0);

// add-review modal state
const showAddReview = ref(false);
const addingReview = ref(false);
const newReview = ref({
  reviewerName: "",
  rating: 5,
  comment: "",
  phone: "",
  sessionType: "",
});

// computed helpers
const avgRatingDisplay = computed(() => (avgRating.value !== null ? avgRating.value.toFixed(1) : "N/A"));
const canSubmitReview = computed(() => newReview.value.reviewerName.trim() && newReview.value.comment.trim());

// ------------------ Fetch trainer doc ------------------
const fetchTrainer = async () => {
  if (!uid) {
    error.value = "No trainer ID provided";
    return;
  }

  try {
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      trainer.value = {
        id: snap.id,
        ...data,
        certifications: data.certifications || [],
      };
    } else {
      error.value = "Trainer not found";
      trainer.value = {};
    }
  } catch (err) {
    console.error("fetchTrainer error:", err);
    error.value = "Failed to load trainer profile";
    trainer.value = {};
  }
};

// ------------------ Fetch plans ------------------
const fetchPlans = async () => {
  plans.value = [];
  if (!uid) return;

  try {
    const pq = query(collection(db, "plans"), where("trainer_uid", "==", uid));
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
            trainer_uid: data.trainer_uid
          };
        })
        .filter((plan) => plan.status.toLowerCase() === "active");
    } else {
      console.log("No plans found for this trainer");
      plans.value = [];
    }
  } catch (err) {
    console.error("fetchPlans error:", err);
    plans.value = [];
  }
};

// ------------------ Fetch reviews ------------------
const fetchReviews = async () => {
  if (!uid) return;

  reviews.value = [];
  avgRating.value = null;
  reviewsCount.value = 0;

  try {
    let snap = null;

    try {
      const q = query(collection(db, "reviews"), where("trainerId", "==", uid));
      snap = await getDocs(q);
    } catch  {
      snap = null;
    }

    if (!snap || snap.empty) {
      try {
        const subQ = query(collection(db, `users/${uid}/reviews`));
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
          typeof data.rating === "number"
            ? data.rating
            : data.rate
            ? Number(data.rate)
            : 0;

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
    } else {
      reviews.value = [];
      avgRating.value = null;
      reviewsCount.value = 0;
    }
  } catch (err) {
    console.error("fetchReviews error:", err);
  }
};

// ------------------ Overall load ------------------
const loadData = async () => {
  loading.value = true;
  error.value = null;

  if (!uid) {
    error.value = "No trainer ID provided";
    loading.value = false;
    return;
  }

  await fetchTrainer();
  if (!error.value) {
    await Promise.all([fetchPlans(), fetchReviews()]);
  }

  loading.value = false;
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

// ------------------ Book Plan (مع Stripe Hosted Checkout على السيرفر) ------------------
const bookPlan = async (plan) => {
  const user = auth.currentUser;

  if (!user) {
    alert('Please login to book a plan');
    router.push({ name: 'login' });
    return;
  }

  if (!plan || !plan.id) {
    alert('Invalid plan selected');
    return;
  }

  // set loading state on the button
  bookingPlanId.value = plan.id;

  try {
    const payload = {
      planId: plan.id,
      trainerId: uid,
      traineeId: user.uid,
      planDetails: {
        name: plan.title,
        description: plan.description,
        duration: plan.duration,
        sessions: plan.sessions,
        price: Number(plan.price || 0),
        image: plan.image || null
      }
    };

    console.log('📤 create-checkout-session ->', `${API_URL}/create-checkout-session`, payload);

    const response = await fetch(`${API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('📥 Response status:', response.status);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text().catch(() => '');
      console.error('❌ Server returned non-JSON response:', text);
      throw new Error('Server error: Expected JSON response but got non-JSON');
    }

    const data = await response.json();
    console.log('✅ Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || `Server error: ${response.status}`);
    }

    if (!data.url && !data.sessionId) {
      console.error('❌ No URL or sessionId in response:', data);
      throw new Error('No checkout URL returned from server');
    }

    // redirect to the provided URL (recommended — server creates session.url)
    if (data.url) {
      window.location.href = data.url;
      return;
    }

    // fallback if server only returned sessionId (not used here)
    if (data.sessionId) {
      throw new Error('Session created but client-side redirect via sessionId not implemented.');
    }

  } catch (error) {
    console.error('❌ Booking error:', error);
    alert(`Failed to start booking process: ${error.message || error}`);
    bookingPlanId.value = null;
  }
};

// ------------------ Contact / booking fallback ------------------
const contactTrainer = () => {
  if (trainer.value.email) {
    window.location.href = `mailto:${trainer.value.email}`;
    return;
  }
  router.push({ name: "chat", query: { trainerId: uid } }).catch(() => {
    alert("Contact info not available");
  });
};

// ------------------ Add review ------------------
const openAddReview = () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login to add a review.");
    router.push({ name: "login" });
    return;
  }
  if (user.displayName) newReview.value.reviewerName = user.displayName;
  showAddReview.value = true;
};

const closeAddReview = () => {
  showAddReview.value = false;
  newReview.value = { reviewerName: "", rating: 5, comment: "", phone: "", sessionType: "" };
};

const submitReview = async () => {
  if (!uid) {
    alert("No trainer specified");
    return;
  }
  if (!canSubmitReview.value) {
    alert("Please enter your name and comment");
    return;
  }

  addingReview.value = true;

  try {
    const user = auth.currentUser;
    let traineeName = newReview.value.reviewerName.trim();
    let traineeProfilePic = null;
    let traineeId = null;

    if (user) {
      traineeId = user.uid;
      try {
        const uDoc = await getDoc(doc(db, "users", user.uid));
        if (uDoc.exists()) {
          const ud = uDoc.data();
          if (ud.firstName) traineeName = `${ud.firstName} ${ud.lastName || ""}`.trim();
          traineeProfilePic = ud.profilePicture || ud.profilePic || null;
        }
      } catch (e) {
        console.warn("Could not fetch user profile:", e);
      }
    }

    const payloadForServer = {
      comment: newReview.value.comment.trim(),
      rating: Number(newReview.value.rating),
      createdAt: serverTimestamp(),
      status: "approved",
      traineeId,
      traineeName,
      traineeProfilePic,
      trainerId: uid,
      trainerName: `${trainer.value.firstName || ""} ${trainer.value.lastName || ""}`.trim(),
      trainerProfilePic: trainer.value.profilePicture || null,
      phone: newReview.value.phone || null,
      sessionType: newReview.value.sessionType || null,
    };

    const localCreatedAt = new Date();
    const localRev = {
      id: "local-" + Date.now(),
      ...payloadForServer,
      createdAt: localCreatedAt,
    };

    reviews.value.unshift(localRev);

    {
      let total = 0, count = 0;
      reviews.value.forEach(r => {
        const rr = typeof r.rating === "number" ? r.rating : 0;
        if (rr > 0) { total += rr; count++; }
      });
      avgRating.value = count > 0 ? total / count : null;
      reviewsCount.value = count;
    }

    let docRef = null;
    try {
      docRef = await addDoc(collection(db, "reviews"), payloadForServer);
    } catch {
      docRef = await addDoc(collection(db, `users/${uid}/reviews`), payloadForServer);
    }

    if (docRef) {
      const idx = reviews.value.findIndex(r => r.id && String(r.id).startsWith("local-"));
      if (idx !== -1) reviews.value[idx].id = docRef.id;
      setTimeout(() => { fetchReviews().catch(() => {}); }, 1200);
    }

    closeAddReview();
  } catch (err) {
    console.error("submitReview error:", err);
    alert("Failed to submit review. Please try again.");
    reviews.value = reviews.value.filter(r => !(r.id && String(r.id).startsWith("local-")));
    {
      let total = 0, count = 0;
      reviews.value.forEach(r => {
        const rr = typeof r.rating === "number" ? r.rating : 0;
        if (rr > 0) { total += rr; count++; }
      });
      avgRating.value = count > 0 ? total / count : null;
      reviewsCount.value = count;
    }
  } finally {
    addingReview.value = false;
  }
};
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

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
