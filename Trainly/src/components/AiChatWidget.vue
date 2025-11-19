<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-opacity-30 dark:bg-opacity-50 z-50"
        @click.self="closeChat"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4 translate-x-4"
          enter-to-class="opacity-100 translate-y-0 translate-x-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0 translate-x-0"
          leave-to-class="opacity-0 translate-y-4 translate-x-4"
        >
          <div
            v-if="isOpen"
          :class="[
            'fixed w-[calc(100%-2rem)] sm:w-[400px] md:w-[420px] lg:w-[450px] h-[calc(100vh-8rem)] sm:h-[600px] md:h-[650px] max-h-[85vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700',
            $i18n.locale === 'ar' ? 'bottom-4 left-4 md:bottom-6 md:left-6' : 'bottom-4 right-4 md:bottom-6 md:right-6'
          ]"
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white rounded-t-lg">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 sm:h-6 sm:w-6"
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
                <h3 class="text-base sm:text-lg font-semibold">{{ $t('Ai Assistant') }}</h3>
              </div>
              <div class="flex items-center gap-2">
                <!-- Clear Chat Button -->
                <button
                  v-if="messages.length > 0"
                  @click.stop="clearChat"
                  type="button"
                  class="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-white/10"
                  aria-label="Clear Chat"
                  title="Clear Chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <!-- Close Button -->
                <button
                  @click="closeChat"
                  class="text-white hover:text-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 cursor-pointer"
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
            </div>

            <!-- Messages Container -->
            <div
              ref="messagesContainer"
              class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-900"
            >
              <!-- Welcome Message -->
              <div v-if="messages.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 mx-auto mb-3 text-blue-500"
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
                <p class="text-lg font-medium mb-2">{{ $t('hiThere') }}</p>
                <p class="text-sm">{{ $t('assistantIntro') }}</p>
                <ul class="text-sm mt-3 space-y-1 text-right">
                  <li>{{ $t('sportsTips') }}</li>
                  <li>{{ $t('searchTrainers') }}</li>
                  <li>{{ $t('foodRecipes') }}</li>
                </ul>
              </div>

              <!-- Messages -->
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="[
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start',
                ]"
              >
                <!-- Regular message -->
                <div
                  v-if="!message.trainers"
                  :class="[
                    'max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3',
                    message.role === 'user'
                      ? 'bg-blue-500 dark:bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700',
                  ]"
                >
                  <p class="text-xs sm:text-sm whitespace-pre-wrap break-words">{{ message.content }}</p>
                  <p
                    v-if="message.timestamp"
                    :class="[
                      'text-xs mt-1',
                      message.role === 'user' ? 'text-blue-100 dark:text-blue-200' : 'text-gray-500 dark:text-gray-400',
                    ]"
                  >
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>

                <!-- Trainer recommendation message -->
                <div
                  v-else
                  class="max-w-[95%] sm:max-w-[90%] rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                >
                  <p class="text-xs sm:text-sm whitespace-pre-wrap mb-3 font-medium">{{ message.content }}</p>

                  <!-- Trainer Cards -->
                  <div class="space-y-2 sm:space-y-3">
                    <div
                      v-for="(trainer, trainerIndex) in message.trainers"
                      :key="trainerIndex"
                      class="border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow"
                    >
                      <div class="flex items-start justify-between mb-2">
                        <div class="flex-1">
                          <h4 class="font-semibold text-sm sm:text-base text-blue-600 dark:text-blue-400">
                            {{ trainerIndex + 1 }}. {{ trainer.name }}
                          </h4>
                          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{{ trainer.city }}</p>
                        </div>
                      </div>

                      <div class="space-y-1 text-xs sm:text-sm mb-2 sm:mb-3">
                        <p>
                          <span class="font-medium">{{ $t('sport') }}</span>
                          {{ trainer.sports?.join(", ") || "غير محدد" }}
                        </p>
                        <p>
                          <span class="font-medium">{{ $t('rating') }}</span>
                          <span class="text-yellow-500">★</span>
                          {{ trainer.averageRating ? trainer.averageRating.toFixed(1) : "N/A" }}
                        </p>
                        <p v-if="trainer.plans && trainer.plans.length > 0">
                          <span class="font-medium">{{ $t('price') }}</span>
                          {{ $t('from') }} ${{ Math.min(...trainer.plans.map((p) => p.price || 0)) }}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          <span class="font-medium">{{ $t('matchScore') }}</span>
                          {{ trainer.matchScore || 0 }}%
                        </p>
                      </div>

                      <button
                        @click="goToTrainerProfile(trainer.id)"
                        class="w-full mt-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium cursor-pointer"
                      >
                        {{ $t('viewTrainerProfile') }}
                      </button>
                    </div>
                  </div>

                  <p
                    v-if="message.timestamp"
                    class="text-xs mt-3 text-gray-500 dark:text-gray-400"
                  >
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
              </div>

              <!-- Loading Indicator -->
              <div v-if="isLoading" class="flex justify-start">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-gray-700">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-2 sm:p-3 text-red-700 dark:text-red-300 text-xs sm:text-sm">
                {{ error }}
              </div>
            </div>

            <!-- Input Area -->
            <div class="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
              <div class="flex gap-2">
                <input
                  ref="messageInput"
                  v-model="inputMessage"
                  @keyup.enter="sendMessage"
                  type="text"
                  :placeholder="$t('askQuestion')"
                  class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                  :disabled="isLoading"
                />
                <button
                  @click="sendMessage"
                  :disabled="!inputMessage.trim() || isLoading"
                  class="px-4 sm:px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base cursor-pointer"
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Clear Chat Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showConfirmModal"
          class="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-[60] flex items-center justify-center p-4"
          @click.self="cancelClearChat"
        >
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="showConfirmModal"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center justify-center mb-4">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 sm:h-7 sm:w-7 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
                {{ $t('confirmDeletion') }}
              </h3>

              <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-6">
                {{ $t('deleteAllMessages') }}
              </p>

              <div class="flex gap-3 sm:gap-4">
                  <button
                    @click="cancelClearChat"
                    class="flex-1 px-4 py-2.5 sm:py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors text-sm sm:text-base font-medium cursor-pointer"
                  >
                    {{ $t('cancel') }}
                  </button>
                  <button
                    @click="confirmClearChat"
                    class="flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#00C853] to-[#00B0FF] hover:opacity-90 text-white rounded-lg transition-all text-sm sm:text-base font-medium shadow-lg cursor-pointer"
                  >
                    {{ $t('delete') }}
                  </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </Teleport>
</template>

<script>
import { ref, watch, nextTick, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import { API_URL } from "@/config/api";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

export default {
  name: "AiChatWidget",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const { locale, t } = useI18n();
    const messages = ref([]);
    const messageInput = ref(null);
    const inputMessage = ref("");
    const isLoading = ref(false);
    const error = ref(null);
    const messagesContainer = ref(null);
    const conversationId = ref(null);
    const showConfirmModal = ref(false);

    // Navigate to trainer profile
    const goToTrainerProfile = (trainerId) => {
      if (!trainerId) {
        console.error("❌ No trainer ID provided");
        return;
      }

      console.log("🔗 Navigating to trainer profile:", trainerId);

      // Close chat first
      emit("close");

      // Use setTimeout to ensure chat closes before navigation
      setTimeout(() => {
        // Build URL with trainer ID
        const url = `/viewtrainerprofile?uid=${trainerId}`;
        console.log("🔗 Navigation URL:", url);

        // Force full page reload using window.location.href
        // This ensures the page refreshes and loads the new trainer profile
        window.location.href = url;
      }, 100); // Small delay to ensure chat closes properly
    };

    // Save chat to Firestore
    const saveChatToFirestore = async (userId, messages) => {
      if (!userId) {
        console.warn("⚠️ No userId provided to saveChatToFirestore");
        return;
      }

      if (!messages || messages.length === 0) {
        console.log("ℹ️ No messages to save");
        return;
      }

      try {
        console.log("💾 Saving chat to Firestore for user:", userId, "Messages:", messages.length);
        const chatRef = doc(db, "user_chats", userId);

        const chatData = {
          messages: messages,
          lastUpdated: serverTimestamp(),
        };

        // Only add conversationId if it exists
        if (conversationId.value) {
          chatData.conversationId = conversationId.value;
        }

        await setDoc(chatRef, chatData, { merge: true });
        console.log("✅ Chat saved to Firestore successfully");
      } catch (error) {
        console.error("❌ Error saving chat to Firestore:", error);
        console.error("Error stack:", error.stack);
      }
    };

    // Load chat from Firestore
    const loadChatFromFirestore = async (userId) => {
      if (!userId) {
        console.warn("⚠️ No userId provided to loadChatFromFirestore");
        return;
      }

      try {
        console.log("📥 Loading chat from Firestore for user:", userId);
        const chatRef = doc(db, "user_chats", userId);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
          const chatData = chatSnap.data();
          console.log("📥 Chat data found:", chatData);

          if (chatData.messages && Array.isArray(chatData.messages) && chatData.messages.length > 0) {
            messages.value = chatData.messages;
            conversationId.value = chatData.conversationId || null;
            console.log("✅ Chat loaded from Firestore:", messages.value.length, "messages");
            console.log("✅ Conversation ID:", conversationId.value);

            // Wait for DOM update then scroll
            await nextTick();
            await scrollToBottom();
          } else {
            console.log("ℹ️ No messages found in chat data");
          }
        } else {
          console.log("ℹ️ No chat document found for user:", userId);
        }
      } catch (error) {
        console.error("❌ Error loading chat from Firestore:", error);
        console.error("Error stack:", error.stack);
      }
    };

    // Clear chat with toast confirmation
    const clearChat = () => {
      console.log("🗑️ Clear chat button clicked");
      // Show confirmation modal
      showConfirmModal.value = true;
      console.log("✅ showConfirmModal set to:", showConfirmModal.value);
    };

    // Confirm clear chat
    const confirmClearChat = async () => {
      showConfirmModal.value = false;

      const auth = getAuth();
      const user = auth.currentUser;

      messages.value = [];
      conversationId.value = null;

      // Delete from Firestore
      if (user) {
        try {
          const chatRef = doc(db, "user_chats", user.uid);
          await setDoc(chatRef, {
            messages: [],
            lastUpdated: serverTimestamp(),
            conversationId: null,
          }, { merge: true });
          console.log("✅ Chat cleared from Firestore");

        } catch (error) {
          console.error("❌ Error clearing chat from Firestore:", error);
          toast.error("An error occurred while deleting messages ❌", {
            position: "top-center",
            timeout: 3000,
            theme: "auto",
            style: {
              background: "linear-gradient(to right, #ef4444, #dc2626)",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px 24px",
              fontSize: "15px",
              fontWeight: "600",
            },
          });
        }
      }

      // Focus input after clearing
      focusInput();
    };

    // Cancel clear chat
    const cancelClearChat = () => {
      showConfirmModal.value = false;
    };

    // Focus input function
    const focusInput = async () => {
      await nextTick();
      if (messageInput.value) {
        messageInput.value.focus();
      }
    };

    // Close chat
    const closeChat = () => {
      emit("close");
    };

    // Format timestamp
    const formatTime = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      const localeCode = locale.value === 'ar' ? 'ar-EG' : 'en-US';
      return date.toLocaleTimeString(localeCode, {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Scroll to bottom
    const scrollToBottom = async () => {
      await nextTick();
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    // Send message
    const sendMessage = async () => {
      const message = inputMessage.value.trim();
      if (!message || isLoading.value) return;

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error(" User not authenticated" );
      }

      // Add user message
      messages.value.push({
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      });

      // Save chat to Firestore after adding user message
      await saveChatToFirestore(user.uid, messages.value);

      inputMessage.value = "";
      isLoading.value = true;
      error.value = null;

      await scrollToBottom();

      try {

         // Check if message is asking for trainers (more specific patterns)
         // Support both Arabic and English keywords for trainers/coaches
         const trainerKeywords = /(مدرب|مدربين|مدربة|trainer|trainers|coach|coaches|اقترح.*مدرب|ابحث.*مدرب|عايز.*مدرب|أريد.*مدرب|بحث.*مدرب|i want.*coach|i want.*trainer|find.*coach|find.*trainer|looking for.*coach|looking for.*trainer)/i.test(message);

         // Extract filters only if it's a trainer request
         let filters = {};
         let hasFilters = false;

         if (trainerKeywords) {
           filters = extractFiltersFromMessage(message);
           hasFilters = filters.sport || filters.city || filters.maxPrice;
         }

         // Only use trainer recommendation if explicitly asking for trainers
         if (trainerKeywords || hasFilters) {
           // Extract filters from message and use trainer recommendation
           await handleTrainerRecommendation(message, user.uid, filters);
         } else {
           // Regular chat message - always use Gemini for general questions
           await handleChatMessage(message, user.uid);
         }
      } catch (err) {
        console.error("Error sending message:", err);
        error.value = t('errorOccurred');
        messages.value.push({
          role: "assistant",
          content: t('errorOccurred'),
          timestamp: new Date().toISOString(),
        });
      } finally {
        isLoading.value = false;
        await scrollToBottom();
        // Focus input again after sending message
        focusInput();
      }
    };

    // Handle regular chat message
        const handleChatMessage = async (message, userId) => {
            const response = await fetch(`${API_URL}/api/ai/chat`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                message,
                conversationId: conversationId.value,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.error || "Failed to get AI response");
            }

            const data = await response.json();
            conversationId.value = data.conversationId || conversationId.value;

            messages.value.push({
              role: "assistant",
              content: data.reply,
              timestamp: new Date().toISOString(),
            });

            // Save chat to Firestore after adding assistant message
            await saveChatToFirestore(userId, messages.value);
        };

     // Handle trainer recommendation
     const handleTrainerRecommendation = async (message, userId, extractedFilters = null) => {
         // Use provided filters or extract from message
         const filters = extractedFilters || extractFiltersFromMessage(message);

         console.log("🔍 Extracted filters:", JSON.stringify(filters));

        const response = await fetch(`${API_URL}/api/ai/recommend-trainers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            filters,
            limit: 5,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("❌ Error from /api/ai/recommend-trainers:", errorData);
          throw new Error(errorData.error || "فشل في البحث عن المدربين");
        }

        const data = await response.json();
        const trainers = data.trainers || [];

        if (trainers.length === 0) {
          messages.value.push({
            role: "assistant",
            content: t('noTrainersFound'),
            timestamp: new Date().toISOString(),
          });
        } else {
          // Create a message with trainer cards
          const trainerMessage = {
            role: "assistant",
            content: t('foundTrainers', { count: trainers.length, plural: trainers.length > 1 ? 's' : '' }),
            trainers: trainers, // Store trainers data for rendering
            timestamp: new Date().toISOString(),
          };

          messages.value.push(trainerMessage);

          // Save chat to Firestore after adding trainer recommendations
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            await saveChatToFirestore(user.uid, messages.value);
          }
        }
    };

     // Extract filters from Arabic/English message (improved version)
     // Only extract if message is explicitly asking for trainers
     const extractFiltersFromMessage = (message) => {
       const filters = {};
       const normalizedMessage = message.toLowerCase();

       // Skip extraction if message is about diet/nutrition (not trainers)
       const dietKeywords = /(نظام غذائي|diet|nutrition|غذاء|تغذية|رجيم|diet plan|meal plan)/i;
       if (dietKeywords.test(message)) {
         return filters; // Return empty filters
       }

       // Extract sport - comprehensive list with all variations
       const sportMappings = {
         // Tennis: تنس, tennis, كرة المضرب
         "tennis": ["تنس", "tennis", "كرة المضرب", "كرة مضرب", "table tennis"],
         // Padel: بادل, padel
         "padel": ["بيدل", "padel", "بادل"],
         // Bodybuilding/Fitness: bodybuilding, fitness, fit, gym, cardio, فيتنس, فيت, جيم, كارديو, رفع أثقال, weight lifting
         "bodybuilding": ["bodybuilding", "fitness", "fit", "gym", "cardio", "فيتنس", "فيت", "جيم", "كارديو", "رفع أثقال", "weight lifting", "weights", "كمال أجسام", "lifting", "strength"],
         "football": ["كرة قدم", "football", "soccer", "كورة"],
         "yoga": ["يوجا", "yoga", "pilates", "بيلاتس"],
         "basketball": ["كرة سلة", "basketball", "باسكت"],
         "swimming": ["سباحة", "swimming", "swim"],
         "boxing": ["ملاكمة", "boxing", "box"],
       };

       // First check for English patterns like "want [sport] coach" or "[sport] coach"
       // Pattern 1: "i want padel coach" or "i want tennis coach"
       const wantSportMatch = normalizedMessage.match(/(?:want|need|looking for|find|search for)\s+([a-z]+)\s+(?:coach|trainer)/i);
       if (wantSportMatch && !filters.sport) {
         const sportName = wantSportMatch[1].toLowerCase();
         console.log("🔍 Extracted sport from 'want [sport] coach' pattern:", sportName);
         for (const [sportKey, variations] of Object.entries(sportMappings)) {
           for (const variation of variations) {
             const vLower = variation.toLowerCase();
             if (vLower === sportName || sportName.includes(vLower) || vLower.includes(sportName)) {
               filters.sport = sportKey;
               console.log(`✅ Matched sport: ${sportName} → ${sportKey}`);
               break;
             }
           }
           if (filters.sport) break;
         }
       }

       // Pattern 2: "[sport] coach" (e.g., "padel coach", "tennis coach")
       if (!filters.sport) {
         const sportCoachMatch = normalizedMessage.match(/([a-z]+)\s+(?:coach|trainer)/i);
         if (sportCoachMatch) {
           const sportName = sportCoachMatch[1].toLowerCase();
           console.log("🔍 Extracted sport from '[sport] coach' pattern:", sportName);
           for (const [sportKey, variations] of Object.entries(sportMappings)) {
             for (const variation of variations) {
               const vLower = variation.toLowerCase();
               if (vLower === sportName || sportName.includes(vLower) || vLower.includes(sportName)) {
                 filters.sport = sportKey;
                 console.log(`✅ Matched sport: ${sportName} → ${sportKey}`);
                 break;
               }
             }
             if (filters.sport) break;
           }
         }
       }

       // Pattern 3: Check for sport anywhere in the message (fallback)
       if (!filters.sport) {
         for (const [sportKey, variations] of Object.entries(sportMappings)) {
           for (const variation of variations) {
             if (normalizedMessage.includes(variation.toLowerCase())) {
               filters.sport = sportKey; // Use English key for consistency
               console.log(`✅ Matched sport from message: ${variation} → ${sportKey}`);
               break;
             }
           }
           if (filters.sport) break;
         }
       }

       // Extract city - more comprehensive list
       const cityMappings = {
         "Cairo": ["القاهرة", "cairo", "القاهره", "القاهرة", "القاهره", "cai", "cahira", "القاھره", "القاھيرة", "القاھره", "القاھيرة"],
         "Alexandria": ["الإسكندرية", "alexandria", "الإسكندريه", "اسكندرية", "alex", "اسكندريه", "الاسكندرية", "الاسكندريه"],
         "Giza": ["الجيزة", "giza", "الجيزه"],
         "Mansoura": ["المنصورة", "mansoura", "منصورة"],
         "Tanta": ["طنطا", "tanta"],
         "Ismailia": ["الإسماعيلية", "ismailia", "إسماعيلية", "اسماعيلية", "ismailiya", "الاسماعيلية", "الاسماعيليه"],
         "Suez": ["السويس", "suez", "السويس"],
       };

       // First check for "in [city]" pattern in English (most common pattern)
       const inCityMatch = normalizedMessage.match(/in\s+([a-z]+)/i);
       if (inCityMatch && !filters.city) {
         const cityName = inCityMatch[1].toLowerCase();
         console.log("🔍 Extracted city from 'in [city]' pattern:", cityName);
         for (const [cityKey, variations] of Object.entries(cityMappings)) {
           for (const variation of variations) {
             const vLower = variation.toLowerCase();
             if (vLower === cityName || cityName.includes(vLower) || vLower.includes(cityName)) {
               filters.city = cityKey;
               console.log(`✅ Matched city: ${cityName} → ${cityKey}`);
               break;
             }
           }
           if (filters.city) break;
         }
       }

       // Also check for city in the message normally (Arabic or English anywhere in message)
       if (!filters.city) {
         for (const [cityKey, variations] of Object.entries(cityMappings)) {
           for (const variation of variations) {
             if (normalizedMessage.includes(variation.toLowerCase())) {
               filters.city = cityKey; // Use English key for consistency
               console.log(`✅ Matched city from message: ${variation} → ${cityKey}`);
               break;
             }
           }
           if (filters.city) break;
         }
       }

       // Extract max price - improved patterns
       // Pattern 1: "أقل من 1000" or "less than 1000"
       const priceMatch1 = message.match(/(?:أقل\s*من|less\s*than|under|max|حد\s*أقصى|حد\s*أقصى|maximum)\s*(\d+)/i);
       if (priceMatch1) {
         filters.maxPrice = parseFloat(priceMatch1[1]);
       } else {
         // Pattern 2: "1000" or "$1000" or "1000 جنيه" or "1000 دولار"
         const priceMatch2 = message.match(/(\d+)\s*(?:جنيه|دولار|dollar|egp|usd|\$)?/i);
         if (priceMatch2) {
           const price = parseFloat(priceMatch2[1]);
           // Only use if it's a reasonable price (between 100 and 10000)
           if (price >= 100 && price <= 10000) {
             filters.maxPrice = price;
           }
         }
       }

       return filters;
     };

    // Suggest trainers button handler
    const suggestTrainers = () => {
      inputMessage.value = "اقترح مدربين";
      sendMessage();
    };

    // Watch for messages changes to scroll
    watch(
      () => messages.value.length,
      () => {
        scrollToBottom();
      }
    );

    // Watch for isOpen to focus input when chat opens and load chat
    watch(
      () => props.isOpen,
      async (isOpen) => {
        if (isOpen) {
          console.log("🔓 Chat opened, loading messages...");

          // Load chat from Firestore when chat opens
          const auth = getAuth();
          const user = auth.currentUser;

          if (user) {
            console.log("👤 User found:", user.uid);
            await loadChatFromFirestore(user.uid);
          } else {
            console.warn("⚠️ No user found when opening chat");
          }

          // Focus input when chat opens - wait a bit for animation
          setTimeout(() => {
            focusInput();
          }, 300);
        } else {
          console.log("🔒 Chat closed");
        }
      },
      { immediate: true } // Run immediately if chat is already open
    );

    // Initialize auth state and load chat when component mounts
    onMounted(() => {
      console.log("🚀 AiChatWidget mounted");

      const auth = getAuth();

      // Load chat immediately if user is already logged in and chat is open
      const currentUser = auth.currentUser;
      if (currentUser && props.isOpen) {
        console.log("👤 User already logged in, loading chat immediately");
        loadChatFromFirestore(currentUser.uid);
      }

      // Also listen for auth state changes
      onAuthStateChanged(auth, async (user) => {
        if (user && props.isOpen) {
          console.log("👤 Auth state changed, user logged in:", user.uid);
          await loadChatFromFirestore(user.uid);
        }
      });

      if (props.isOpen) {
        setTimeout(() => {
          focusInput();
        }, 300);
      }
    });

    return {
      messages,
      inputMessage,
      messageInput,
      isLoading,
      error,
      messagesContainer,
      sendMessage,
      closeChat,
      formatTime,
      suggestTrainers,
      focusInput,
      goToTrainerProfile,
      clearChat,
      confirmClearChat,
      cancelClearChat,
      showConfirmModal,
      saveChatToFirestore,
      loadChatFromFirestore,
      t,
    };
  },
};
</script>

<style scoped>
/* Custom scrollbar */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

