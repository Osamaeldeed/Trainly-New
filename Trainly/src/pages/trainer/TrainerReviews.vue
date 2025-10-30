<template>
  <section class="p-0 min-h-screen mx-auto">
    <h2 class="text-3xl font-[500] mb-6">Reviews</h2>

    <div v-if="reviews.length === 0" class="text-center text-gray-500">
      No reviews yet.
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition mx-auto"
      >
        <h3 class="text-xl font-medium mb-1"></h3>
        <p class="text-yellow-500 mb-2">⭐ {{ review.rating }} /5</p>
        <p class="text-gray-600 italic mb-3">{{ review.comment }}</p>
        <p class="text-sm text-gray-400">Trainer ID: </p>
        <p class="text-sm text-gray-400">

        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from "@/Firebase/firebaseConfig.js";
import { collection, getDocs } from 'firebase/firestore';

    export default {
        name: "TrainerReviews",
        data() {
            return {
                reviews: [],

            };
        },
        async mounted() {
            try {
                const getReviewsResponse = await getDocs(collection(db, "reviews"));
                this.reviews = getReviewsResponse.docs.map((doc) => ({
                    id:doc.id,
                    ...doc.data()
                }
            ));
                console.log(this.reviews);

            } catch (error) {
                console.error("An error occurred:", error);
            } finally {
                //Any
            }

        },

    }
</script>

<style scoped>

</style>
