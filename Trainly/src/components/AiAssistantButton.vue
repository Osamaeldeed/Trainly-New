<template>
  <div>
    <div v-if="isTrainee && !isExcludedRoute" class="fixed bottom-6 right-6 z-50">
      <button
        @click="toggleChat"
        class="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00C853] to-[#00B0FF] hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        :class="{ 'ring-4 ring-[#00C853]/30': isChatOpen }"
        aria-label="AI Assistant"
      >
        <svg
          v-if="!isChatOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
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
      <!-- AI Assistant Label -->
      <div class="absolute -top-1 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        AI Assistant
      </div>
    </div>
    <!-- Chat Widget -->
    <Teleport to="body">
      <AiChatWidget
        v-if="isTrainee"
        :is-open="isChatOpen"
        @close="isChatOpen = false"
      />
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import AiChatWidget from "./AiChatWidget.vue";

export default {
  name: "AiAssistantButton",
  components: {
    AiChatWidget,
  },
  setup() {
    const route = useRoute();
    const isChatOpen = ref(false);
    const currentUser = ref(null);
    const userRole = ref(null);
    const loading = ref(true);

    // Check if current user is a trainee
    const isTrainee = computed(() => {
      return userRole.value === "trainee";
    });

    // Public/excluded routes (hide button)
    const excludedPaths = [
      "/",
      "/login",
      "/signup",
      "/terms",
      "/terms-and-conditions",
      "/aboutus",
      "/contactus",
      "/sports",
      "/forgot-password",
      "/reset-password",
    ];

    const isExcludedRoute = computed(() => {
      const p = (route.path || "").toLowerCase();
      return excludedPaths.includes(p);
    });

    // Toggle chat widget
    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
    };

    // Fetch current user and role
    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          currentUser.value = user;
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              userRole.value = userData.role || null;
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
          }
        } else {
          currentUser.value = null;
          userRole.value = null;
        }
        loading.value = false;
      });
    });

    return {
      isChatOpen,
      isTrainee,
      isExcludedRoute,
      toggleChat,
      loading,
      currentUser,
    };
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>

