<template>
  <div class="min-h-screen bg-gray-50 border-1 border-gray-200 p-4 md:p-6 lg:p-8 rounded-2xl">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
        <h1 class="text-2xl font-semibold mb-1">Manage All Reviews</h1>
        <p class="text-gray-500 mb-6">View, filter, and remove trainee reviews for trainers</p>

      <!-- Search + Rating Filter -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <!-- Search -->
          <div class="flex-1 relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by trainee or trainer..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Rating Filter -->
    <div class="relative w-48">
  <select
    v-model="ratingFilter"
    class="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    <option value="all">All Ratings</option>
    <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
  </select>
  <!-- SVG Arrow -->
  <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
</div>

        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-4">
        <div
          v-for="review in filteredReviews"
          :key="review.id"
          class="bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <!-- Left Section: User Info + Review -->
            <div class="flex gap-4 flex-1">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <img
                  v-if="review.traineeProfilePic"
                  :src="review.traineeProfilePic"
                  alt="Trainee Photo"
                  class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <span class="text-gray-500 text-lg font-semibold">
                    {{ review.traineeName.charAt(0) }}
                  </span>
                </div>
              </div>

              <!-- Review Content -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <span class="font-semibold text-gray-900 text-base md:text-lg">
                    {{ review.traineeName }}
                  </span>
                  <span class="text-gray-500 text-sm">reviewed</span>
                  <span class="font-semibold text-gray-900 text-base md:text-lg">
                    {{ review.trainerName }}
                  </span>

                  <!-- Stars -->
                  <div class="flex gap-1 items-center">
                    <svg
                      v-for="star in review.rating"
                      :key="star"
                      class="w-5 h-5 fill-[#FFA534]"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                      />
                    </svg>
                    <span class="text-[#FFA534] font-medium ml-1 text-sm">{{ review.rating }}</span>
                  </div>
                </div>

                <!-- Review Text -->
                <p class="text-gray-700 text-sm md:text-base mb-3">
                  {{ review.comment }}
                </p>

                <!-- Session Info -->
                <div class="flex flex-wrap gap-2 text-xs md:text-sm text-gray-500">
                  <span>Session: {{ review.sessionType }}</span>
                  <span>•</span>
                  <span>{{ formatDate(review.createdAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Right Section: Actions -->
            <div class="flex lg:flex-col gap-2 justify-end lg:justify-start">
              <button
                @click="confirmDelete(review)"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredReviews.length === 0"
          class="bg-white rounded-lg shadow-sm p-8 text-center"
        >
          <p class="text-gray-500 text-lg">No reviews found</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Delete Review</h3>
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div class="flex gap-3 justify-end">
              <button
                @click="cancelDelete"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                @click="deleteReview"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig.js";

const reviews = ref([]);
const searchQuery = ref("");
const ratingFilter = ref("all");
const showDeleteModal = ref(false);
const reviewToDelete = ref(null);

const fetchReviews = async () => {
  try {
    const snapshot = await getDocs(collection(db, "reviews"));
    reviews.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      comment: doc.data().comment,
      createdAt: doc.data().createdAt,
      rating: doc.data().rating,
      sessionType: doc.data().sessionType,
      traineeName: doc.data().traineeName,
      traineeProfilePic: doc.data().traineeProfilePic,
      trainerName: doc.data().trainerName,
      trainerProfilePic: doc.data().trainerProfilePic,
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

onMounted(fetchReviews);

const filteredReviews = computed(() => {
  let filtered = reviews.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (review) =>
        review.traineeName.toLowerCase().includes(query) ||
        review.trainerName.toLowerCase().includes(query)
    );
  }

  if (ratingFilter.value !== "all") {
    filtered = filtered.filter((review) => review.rating === parseInt(ratingFilter.value));
  }

  return filtered;
});

const confirmDelete = (review) => {
  reviewToDelete.value = review;
  showDeleteModal.value = true;
};

const deleteReview = async () => {
  if (reviewToDelete.value) {
    try {
      await deleteDoc(doc(db, "reviews", reviewToDelete.value.id));
      reviews.value = reviews.value.filter(r => r.id !== reviewToDelete.value.id);
      showDeleteModal.value = false;
      reviewToDelete.value = null;
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  reviewToDelete.value = null;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
</script>
