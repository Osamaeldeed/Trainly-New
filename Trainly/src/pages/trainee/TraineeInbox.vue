<template>
  <div
    class="page-root flex items-start justify-center min-h-screen rounded-2xl dark:bg-[#1c1c1c] bg-blue-100 py-6"
  >
    <!-- البوكس الكبير -->
    <div
      class="inbox-wrapper w-full max-w-7xl bg-light-blue dark:text-white dark:bg-[#3B3B3B] rounded-2xl shadow-strong overflow-hidden flex"
      :class="{ 'flex-col': isStacked }"
    >
      <!-- Trainers Sidebar -->
      <aside
        class="clients-column bg-white dark:bg-[#3B3B3B] dark:text-white border-r border-gray-200 flex flex-col"
        :class="{
          'w-80': !isStacked,
          'w-full': isStacked && mobilePane === 'trainers',
          hidden: isStacked && mobilePane !== 'trainers',
        }"
      >
        <div class="p-6 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Chats</h1>
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 transform dark:text-white -translate-y-1/2 text-gray-400"
              >🔍</span
            >
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search trainers..."
              class="w-full pl-10 pr-4 py-2 border dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingTrainers" class="flex-1 flex items-center justify-center p-6">
            <div class="text-center">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"
              ></div>
              <p class="text-gray-500 dark:text-white text-sm">Loading trainers...</p>
            </div>
          </div>

          <div
            v-else-if="filteredTrainers.length === 0"
            class="flex-1 flex items-center justify-center p-6"
          >
            <div class="text-center dark:text-white text-gray-400">
              <p class="text-lg mb-2">📭</p>
              <p>No trainers found</p>
            </div>
          </div>

          <div>
            <button
              v-for="trainer in filteredTrainers"
              :key="trainer.id"
              @click="onTrainerClick(trainer)"
              :class="[
                'w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:bg-[#3B3B3B] dark:text-white transition-colors border-b border-gray-100 cursor-pointer',
                selectedTrainer?.id === trainer.id ? 'bg-blue-50' : '',
              ]"
            >
              <img
                :src="
                  trainer.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=random`
                "
                :alt="trainer.name"
                class="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0 dark:text-white text-left">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="font-semibold dark:text-white text-gray-900 truncate">
                    {{ trainer.name }}
                  </h3>
                  <span
                    v-if="trainer.lastMessageTime"
                    class="text-xs dark:text-white text-gray-500 flex-shrink-0 ml-2"
                  >
                    {{ formatTime(trainer.lastMessageTime) }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm dark:text-white text-gray-600 truncate">
                    {{ trainer.lastMessage || "Start a conversation" }}
                  </p>
                  <span
                    v-if="trainer.unreadCount > 0"
                    class="unread-dot ml-2 flex-shrink-0"
                    :title="trainer.unreadCount ? `${trainer.unreadCount} unread` : ''"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      <!-- Messages Panel -->
      <section
        class="flex-1 flex flex-col"
        :class="{
          'w-full': isStacked && mobilePane === 'chat',
          hidden: isStacked && selectedTrainer && mobilePane !== 'chat',
        }"
      >
        <!-- top bar for mobile -->
        <div
          v-if="isStacked"
          class="mobile-top bg-white dark:text-white dark:bg-[#3B3B3B] border-b border-gray-200 p-3 flex items-center gap-3"
        >
          <button
            v-if="selectedTrainer"
            @click="mobilePane = 'trainers'"
            class="p-2 rounded-md dark:text-white hover:bg-gray-100"
          >
            ←
          </button>
          <div v-if="selectedTrainer" class="flex items-center gap-3">
            <img
              :src="
                selectedTrainer.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTrainer.name)}&background=random`
              "
              :alt="selectedTrainer.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div class="font-semibold dark:text-white text-gray-900 text-sm">
                {{ selectedTrainer.name }}
              </div>
              <div class="text-xs dark:text-white text-gray-500">
                {{ selectedTrainer.email || "Trainer" }}
              </div>
            </div>
          </div>
        </div>

        <!-- desktop header -->
        <div
          v-else
          class="bg-white dark:bg-[#3B3B3B] dark:text-white border-b border-gray-200 p-4 flex items-center gap-3"
        >
          <img
            v-if="selectedTrainer"
            :src="
              selectedTrainer.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTrainer.name)}&background=random`
            "
            :alt="selectedTrainer.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 class="font-semibold dark:text-white text-gray-900">
              {{ selectedTrainer ? selectedTrainer.name : "Select a trainer" }}
            </h2>
            <p class="text-sm dark:text-white text-gray-500">
              {{ selectedTrainer ? selectedTrainer.email || "Trainer" : "" }}
            </p>
          </div>
        </div>

        <!-- messages area -->
        <div class="flex-1 flex flex-col">
          <div
            ref="messagesContainer"
            class="messages-container flex-1 overflow-y-auto p-6 space-y-4 dark:bg-[#3B3B3B] bg-gray-50"
          >
            <div v-if="!selectedTrainer" class="flex-1 flex items-center justify-center">
              <div class="text-center dark:text-white text-gray-400">
                <div
                  class="w-24 h-24 bg-gray-200 dark:bg-[#3B3B3B] rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <span class="text-5xl">💬</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Select a trainer</h3>
                <p>Choose a trainer from the sidebar to start messaging</p>
              </div>
            </div>

            <div v-else>
              <div v-if="loadingMessages" class="flex-1 flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>

              <div
                v-else-if="messages.length === 0"
                class="flex-1 flex items-center justify-center"
              >
                <div class="text-center dark:text-white text-gray-400">
                  <p class="text-lg mb-2">👋</p>
                  <p>No messages yet. Start the conversation!</p>
                </div>
              </div>

              <div v-else>
                <div
                  v-for="msg in messages"
                  :key="msg.id"
                  :class="[
                    'flex',
                    msg.senderId === this.traineeId ? 'justify-end' : 'justify-start',
                  ]"
                >
                  <div class="flex items-start gap-3 max-w-2xl w-full">
                    <img
                      v-if="msg.senderId !== this.traineeId"
                      :src="
                        selectedTrainer.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTrainer.name)}&background=random`
                      "
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                    />
                    <div
                      :class="[
                        'flex flex-col',
                        msg.senderId === this.traineeId
                          ? 'items-end ml-auto'
                          : 'items-start mr-auto',
                      ]"
                      style="max-width: 70%"
                    >
                      <div
                        :class="[
                          'message-box dark:bg-black rounded-2xl px-5 py-3 break-words',
                          msg.senderId === this.traineeId
                            ? 'bg-blue-600 text-white dark:bg-[#090909] dark:text-white rounded-br-sm'
                            : 'bg-white dark:bg-[#1c1c1c] dark:text-white text-gray-900 rounded-bl-sm',
                        ]"
                      >
                        <p class="text-sm dark:text-white whitespace-pre-wrap">{{ msg.text }}</p>
                      </div>
                      <p class="text-xs dark:text-white text-gray-500 mt-2">
                        {{ formatTime(msg.timestamp) }}
                      </p>
                    </div>
                    <img
                      v-if="msg.senderId === this.traineeId"
                      :src="
                        auth && auth.currentUser && auth.currentUser.photoURL
                          ? auth.currentUser.photoURL
                          : null
                      "
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- input -->
        <div v-if="selectedTrainer" class="bg-white dark:bg-[#3B3B3B] border-t border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <input
              type="text"
              v-model="messageInput"
              @keyup.enter="sendMessage"
              placeholder="Type your message here..."
              :disabled="sending"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              @click="sendMessage"
              :disabled="!messageInput.trim() || sending"
              class="bg-blue-600 dark:bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              <span class="text-xl">✈️</span>
              <span class="hidden sm:inline">{{ sending ? "Sending..." : "Send" }}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "vue3-toastify";

export default {
  name: "TraineeInbox",
  data() {
    return {
      db: getFirestore(),
      auth: getAuth(),
      traineeId: null,
      trainers: [],
      messages: [],
      selectedTrainer: null,
      messageInput: "",
      searchQuery: "",
      loadingTrainers: true,
      loadingMessages: false,
      sending: false,
      conversationsUnsubscribe: null,
      messagesUnsubscribe: null,
      // responsive helpers
      isStacked: false,
      mobilePane: "trainers",
    };
  },
  computed: {
    filteredTrainers() {
      if (!this.searchQuery) return this.trainers;
      const q = this.searchQuery.toLowerCase();
      return this.trainers.filter(
        (t) => t.name.toLowerCase().includes(q) || (t.email && t.email.toLowerCase().includes(q)),
      );
    },
  },
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return "";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes} min ago`;
      if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
      return date.toLocaleDateString();
    },

    async getUserData(userId) {
      try {
        const userDocRef = doc(this.db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() ? userDoc.data() : null;
      } catch (err) {
        console.warn("getUserData error", err);
        return null;
      }
    },

    // Load trainers from bookings where this trainee subscribed
    async loadTrainers() {
      if (!this.traineeId) return;
      try {
        const bookingsRef = collection(this.db, "bookings");
        const q = query(bookingsRef, where("traineeId", "==", this.traineeId));
        const snapshot = await getDocs(q);
        const trainersMap = new Map();
        for (const docSnap of snapshot.docs) {
          const booking = docSnap.data();
          const trainerId = booking.trainerId || booking.trainer?.id;
          if (trainerId && !trainersMap.has(trainerId)) {
            let trainerData = booking.trainer || {};
            const hasImageInBooking = !!(
              trainerData.profilePicture ||
              trainerData.avatar ||
              trainerData.profileImage
            );
            const hasNameInBooking = !!(trainerData.firstName || trainerData.name);
            if (!hasImageInBooking || !hasNameInBooking) {
              const userData = await this.getUserData(trainerId);
              if (userData) trainerData = { ...userData, ...trainerData };
            }
            const name =
              trainerData.name ||
              `${trainerData.firstName || ""} ${trainerData.lastName || ""}`.trim() ||
              "Unknown Trainer";
            const avatar =
              trainerData.profilePicture || trainerData.avatar || trainerData.profileImage || null;
            trainersMap.set(trainerId, {
              id: trainerId,
              name,
              email: trainerData.email || "",
              avatar,
              lastMessage: "",
              lastMessageTime: null,
              unreadCount: 0,
            });
          }
        }
        this.trainers = Array.from(trainersMap.values());
        await this.loadConversationsData();
        this.loadingTrainers = false;
      } catch (error) {
        console.error("Error loading trainers:", error);
        toast.error("Failed to load trainers", { position: "top-center", autoClose: 2000 });
        this.loadingTrainers = false;
      }
    },

    // Load conversations info related to this trainee
    async loadConversationsData() {
      if (!this.traineeId || this.trainers.length === 0) return;
      try {
        const conversationsRef = collection(this.db, "conversations");
        const q = query(conversationsRef, where("participants", "array-contains", this.traineeId));
        const snapshot = await getDocs(q);
        snapshot.forEach((docSnap) => {
          const conv = docSnap.data();
          const otherId = conv.participants.find((p) => p !== this.traineeId);
          const trainer = this.trainers.find((t) => t.id === otherId);
          if (trainer) {
            trainer.conversationId = docSnap.id;
            trainer.lastMessage = conv.lastMessage || "";
            trainer.lastMessageTime = conv.lastMessageTime || null;
            trainer.unreadCount = conv.unreadCount?.[this.traineeId] || 0;
            if (conv.trainerInfo && conv.trainerInfo.avatar) {
              trainer.avatar = trainer.avatar || conv.trainerInfo.avatar;
            }
          }
        });
        // sort
        this.trainers.sort((a, b) => {
          if (!a.lastMessageTime) return 1;
          if (!b.lastMessageTime) return -1;
          return b.lastMessageTime.toDate() - a.lastMessageTime.toDate();
        });
        this.setupConversationsListener();
      } catch (error) {
        console.error("Error loading conversations data:", error);
      }
    },

    setupConversationsListener() {
      if (!this.traineeId) return;
      const conversationsRef = collection(this.db, "conversations");
      const q = query(conversationsRef, where("participants", "array-contains", this.traineeId));
      this.conversationsUnsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const conv = change.doc.data();
          const otherId = conv.participants.find((p) => p !== this.traineeId);
          const trainer = this.trainers.find((t) => t.id === otherId);
          if (trainer) {
            trainer.conversationId = change.doc.id;
            trainer.lastMessage = conv.lastMessage || "";
            trainer.lastMessageTime = conv.lastMessageTime || null;
            trainer.unreadCount = conv.unreadCount?.[this.traineeId] || 0;
            if (conv.trainerInfo && conv.trainerInfo.avatar) {
              trainer.avatar = trainer.avatar || conv.trainerInfo.avatar;
            }
          }
        });
        this.trainers.sort((a, b) => {
          if (!a.lastMessageTime) return 1;
          if (!b.lastMessageTime) return -1;
          return b.lastMessageTime.toDate() - a.lastMessageTime.toDate();
        });
      });
    },

    // Select trainer and load messages
    async onTrainerClick(trainer) {
      this.selectTrainer(trainer);
      if (this.isStacked) this.mobilePane = "chat";
    },

    async selectTrainer(trainer) {
      this.selectedTrainer = trainer;
      if (!trainer.conversationId) {
        await this.createConversation(trainer);
      }
      if (trainer.conversationId) {
        this.loadMessages(trainer.conversationId);
        this.markAsRead(trainer.conversationId);
      }
    },

    // Create new conversation document (participants sorted)
    async createConversation(trainer) {
      try {
        const traineeDocRef = doc(this.db, "users", this.traineeId);
        const traineeDoc = await getDoc(traineeDocRef);
        const traineeData = traineeDoc.exists() ? traineeDoc.data() : {};
        const conversationsRef = collection(this.db, "conversations");
        const newConvRef = await addDoc(conversationsRef, {
          participants: [this.traineeId, trainer.id].sort(),
          trainerInfo: {
            id: trainer.id,
            name: trainer.name,
            avatar: trainer.avatar || null,
          },
          traineeInfo: {
            id: this.traineeId,
            name:
              `${traineeData.firstName || ""} ${traineeData.lastName || ""}`.trim() || "Trainee",
            avatar:
              traineeData.profilePicture || traineeData.avatar || traineeData.profileImage || null,
          },
          lastMessage: "",
          lastMessageTime: serverTimestamp(),
          unreadCount: {
            [this.traineeId]: 0,
            [trainer.id]: 0,
          },
          createdAt: serverTimestamp(),
        });
        trainer.conversationId = newConvRef.id;
      } catch (error) {
        console.error("Error creating conversation:", error);
        toast.error("Failed to create conversation", { position: "top-center", autoClose: 2000 });
      }
    },

    // Load messages for conversation
    loadMessages(conversationId) {
      if (this.messagesUnsubscribe) this.messagesUnsubscribe();
      this.loadingMessages = true;
      this.messages = [];
      const messagesRef = collection(this.db, "conversations", conversationId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      this.messagesUnsubscribe = onSnapshot(
        q,
        (snapshot) => {
          this.messages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          this.loadingMessages = false;
          this.scrollToBottom();
        },
        (error) => {
          console.error("Error loading messages:", error);
          this.loadingMessages = false;
        },
      );
    },

    // Mark as read for trainee
    async markAsRead(conversationId) {
      try {
        const conversationRef = doc(this.db, "conversations", conversationId);
        await updateDoc(conversationRef, { [`unreadCount.${this.traineeId}`]: 0 });
        if (this.selectedTrainer) this.selectedTrainer.unreadCount = 0;
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    },

    // Send message as trainee
    async sendMessage() {
      if (!this.messageInput.trim() || !this.selectedTrainer || this.sending) return;
      this.sending = true;
      const text = this.messageInput.trim();
      this.messageInput = "";
      try {
        const convId = this.selectedTrainer.conversationId;
        const messagesRef = collection(this.db, "conversations", convId, "messages");
        await addDoc(messagesRef, {
          senderId: this.traineeId,
          text,
          timestamp: serverTimestamp(),
          read: false,
        });
        const conversationRef = doc(this.db, "conversations", convId);
        const currentUnread = this.selectedTrainer.unreadCount || 0;
        // increment trainer's unread
        await updateDoc(conversationRef, {
          lastMessage: text,
          lastMessageTime: serverTimestamp(),
          [`unreadCount.${this.selectedTrainer.id}`]: currentUnread + 1,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message", { position: "top-center", autoClose: 2000 });
        this.messageInput = text;
      } finally {
        this.sending = false;
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const c = this.$refs.messagesContainer;
        if (c) {
          try {
            c.scrollTop = c.scrollHeight;
          } catch {
            //ignore
          }
        }
      });
    },

    handleResize() {
      this.isStacked = window.innerWidth < 768;
      if (this.isStacked && this.selectedTrainer) this.mobilePane = "chat";
      else if (!this.isStacked) this.mobilePane = "trainers";
    },
  },

  mounted() {
    const user = this.auth.currentUser;
    if (user) {
      this.traineeId = user.uid;
      this.loadTrainers();
    } else {
      toast.error("Please login first", { position: "top-center", autoClose: 2000 });
      this.loadingTrainers = false;
    }

    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    if (this.conversationsUnsubscribe) this.conversationsUnsubscribe();
    if (this.messagesUnsubscribe) this.messagesUnsubscribe();
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
/* نفس ستايل Trainer page عشان الشكل يطابق تمام */
.bg-light-blue {
  background: #eef6ff;
}
.inbox-wrapper {
  background: #eef6ff;
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(2, 6, 23, 0.08);
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

/* small blue dot for unread indicator */
.unread-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2563eb;
  display: inline-block;
  vertical-align: middle;
}
.clients-column,
section.flex-1,
.clients-column > .flex-1,
section .flex-1 {
  min-height: 0;
}
.messages-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
}
.message-box {
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
  border-radius: 14px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}
.page-root {
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 1280px) {
  .clients-column {
    min-width: 320px;
    max-width: 360px;
  }
}
@media (min-width: 768px) and (max-width: 1279px) {
  .clients-column {
    min-width: 280px;
    max-width: 320px;
  }
  .inbox-wrapper {
    border-radius: 18px;
  }
  .message-box {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
@media (max-width: 767px) {
  .inbox-wrapper {
    flex-direction: column;
    border-radius: 14px;
    height: 100vh;
  }
  .clients-column {
    border-right: none;
    border-bottom: 1px solid #eef2f7;
  }
  .mobile-top {
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .message-box {
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    border-radius: 12px;
  }
  .page-root {
    padding-left: 8px;
    padding-right: 8px;
  }
}
@media (max-width: 420px) {
  .inbox-wrapper {
    margin: 8px;
  }
  .clients-column .p-6 {
    padding: 12px;
  }
  input::placeholder {
    opacity: 0.9;
  }
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}
.messages-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.messages-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.messages-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
/* ============ DESKTOP (default) ============ */
/* الشغل اللي عندك هو اللي هيشتغل هنا */

/* ============ TABLET ============ */
@media (max-width: 1024px) {
  .inbox-wrapper {
    max-width: 100%;
  }

  .clients-column {
    width: 260px !important;
  }
}

/* ============ MOBILE ============ */
@media (max-width: 768px) {
  .page-root {
    padding: 0;
  }

  .inbox-wrapper {
    flex-direction: column;
    height: 100vh;
    border-radius: 0;
  }

  .clients-column {
    width: 100% !important;
    height: 100%;
  }

  .messages-container {
    height: calc(100vh - 140px);
  }

  section.flex-1 {
    width: 100% !important;
    height: 100%;
  }
}

/* Small mobile optimization */
@media (max-width: 360px) {
  .page-root {
    padding-left: 6px;
    padding-right: 6px;
  }

  .inbox-wrapper {
    border-radius: 12px;
  }

  .client-item {
    padding: 10px;
  }

  .messages-container {
    padding: 10px;
  }

  .input-area {
    padding: 10px;
  }

  .message-box {
    max-width: 80%;
  }
}


</style>
