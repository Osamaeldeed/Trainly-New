<template>
  <div
    class="page-root flex items-start justify-center min-h-screen rounded-2xl dark:bg-[#535353] bg-blue-100 py-6"
  >
    <!-- البوكس الكبير -->
    <div
      class="inbox-wrapper w-full max-w-7xl bg-light-blue dark:bg-[#3B3B3B] rounded-2xl shadow-strong overflow-hidden flex"
      :class="{ 'flex-col': isStacked }"
    >
      <!-- Clients Sidebar -->
      <aside
        class="clients-column bg-white dark:bg-[#3B3B3B] border-r border-gray-200 flex flex-col"
        :class="{
          'w-80': !isStacked,
          'w-full': isStacked && mobilePane === 'clients',
          hidden: isStacked && mobilePane !== 'clients',
        }"
      >
        <div class="p-6 border-b border-gray-200">
          <h1 class="text-2xl font-bold dark:text-white text-gray-900 mb-4">Chats</h1>
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white text-gray-400"
              >🔍</span
            >
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search clients..."
              class="w-full pl-10 pr-4 py-2 border text-dark dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingClients" class="flex-1 flex items-center justify-center p-6">
            <div class="text-center">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"
              ></div>
              <p class="text-gray-500 dark:text-white text-sm">Loading clients...</p>
            </div>
          </div>

          <div
            v-else-if="filteredClients.length === 0"
            class="flex-1 flex items-center justify-center p-6"
          >
            <div class="text-center text-gray-400">
              <p class="text-lg mb-2">📭</p>
              <p>No clients found</p>
            </div>
          </div>

          <div>
            <button
              v-for="client in filteredClients"
              :key="client.id"
              @click="onClientClick(client)"
              :class="[
                'w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer',
                selectedClient?.id === client.id ? 'bg-blue-50 dark:bg-[#191919]' : '',
              ]"
            >
              <img
                :src="
                  client.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=random`
                "
                :alt="client.name"
                class="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0 text-left">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white truncate">
                    {{ client.name }}
                  </h3>
                  <span
                    v-if="client.lastMessageTime"
                    class="text-xs text-gray-500 flex-shrink-0 ml-2"
                  >
                    {{ formatTime(client.lastMessageTime) }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm dark:text-white text-gray-600 truncate">
                    {{ client.lastMessage || "Start a conversation" }}
                  </p>
                  <span
                    v-if="client.unreadCount > 0"
                    class="unread-dot ml-2 flex-shrink-0"
                    :title="client.unreadCount ? `${client.unreadCount} unread` : ''"
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
          hidden: isStacked && selectedClient && mobilePane !== 'chat',
        }"
      >
        <!-- top bar for mobile -->
        <div
          v-if="isStacked"
          class="mobile-top bg-white dark:bg-[#3B3B3B] border-b border-gray-200 p-3 flex items-center gap-3"
        >
          <button
            v-if="selectedClient"
            @click="mobilePane = 'clients'"
            class="p-2 rounded-md hover:bg-gray-100"
          >
            ←
          </button>
          <div v-if="selectedClient" class="flex items-center gap-3">
            <img
              :src="
                selectedClient.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name)}&background=random`
              "
              :alt="selectedClient.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div class="font-semibold dark:text-white text-gray-900 text-sm">
                {{ selectedClient.name }}
              </div>
              <div class="text-xs dark:text-white text-gray-500">
                {{ selectedClient.email || "Client" }}
              </div>
            </div>
          </div>
        </div>

        <!-- desktop header -->
        <div
          v-else
          class="bg-white dark:bg-[#3B3B3B] border-b border-gray-200 p-4 flex items-center gap-3"
        >
          <img
            v-if="selectedClient"
            :src="
              selectedClient.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name)}&background=random`
            "
            :alt="selectedClient.name"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 class="font-semibold dark:text-white text-gray-900">
              {{ selectedClient ? selectedClient.name : "Select a client" }}
            </h2>
            <p class="text-sm dark:text-gray-300 text-gray-500">
              {{ selectedClient ? selectedClient.email || "Client" : "" }}
            </p>
          </div>
        </div>

        <!-- ✅ messages area fixed height + internal scroll -->
        <div class="flex-1 flex flex-col">
          <!-- messages container: flex-1 so it fills available height, scrolls internally -->
          <div
            ref="messagesContainer"
            class="messages-container flex-1 overflow-y-auto p-6 space-y-4 dark:bg-[#3b3b3b] bg-gray-50"
          >
            <div v-if="!selectedClient" class="flex-1 flex items-center justify-center">
              <div class="text-center dark:text-white text-gray-400">
                <div
                  class="w-24 h-24 bg-gray-200 dark:bg-[#3B3B3B] rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <span class="text-5xl">💬</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Select a client</h3>
                <p>Choose a client from the sidebar to start messaging</p>
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
                  :class="['flex', msg.senderId === trainerId ? 'justify-end' : 'justify-start']"
                >
                  <div class="flex items-start gap-3 max-w-2xl w-full">
                    <img
                      v-if="msg.senderId !== trainerId"
                      :src="
                        selectedClient.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name)}&background=random`
                      "
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                      alt=""
                    />
                    <div
                      :class="[
                        'flex flex-col',
                        msg.senderId === trainerId ? 'items-end ml-auto' : 'items-start mr-auto',
                      ]"
                      style="max-width: 70%"
                    >
                      <div
                        :class="[
                          'message-box rounded-2xl px-5 py-3 break-words',
                          msg.senderId === trainerId
                            ? 'bg-blue-600 text-white dark:bg-[#090909] dark:text-white rounded-br-sm'
                            : 'bg-white dark:bg-[#1c1c1c] dark:text-white text-gray-900 rounded-bl-sm',
                        ]"
                      >
                        <p class="text-sm whitespace-pre-wrap">{{ msg.text }}</p>
                      </div>

                      <p class="text-xs text-gray-500 mt-2">{{ formatTime(msg.timestamp) }}</p>
                    </div>
                    <img
                      v-if="msg.senderId === trainerId"
                      :src="
                        auth && auth.currentUser && auth.currentUser.photoURL
                          ? auth.currentUser.photoURL
                          : null
                      "
                      class="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- input -->
        <div v-if="selectedClient" class="bg-white dark:bg-[#3B3B3B] border-t border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <input
              type="text"
              v-model="messageInput"
              @keyup.enter="sendMessage"
              placeholder="Type your message here..."
              :disabled="sending"
              class="flex-1 px-4 py-3 border dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              @click="sendMessage"
              :disabled="!messageInput.trim() || sending"
              class="bg-blue-600 dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
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
  name: "TrainerInbox",
  data() {
    return {
      db: getFirestore(),
      auth: getAuth(),
      trainerId: null,
      clients: [],
      messages: [],
      selectedClient: null,
      messageInput: "",
      searchQuery: "",
      loadingClients: true,
      loadingMessages: false,
      sending: false,
      conversationsUnsubscribe: null,
      messagesUnsubscribe: null,
      // responsive helpers
      isStacked: false, // true on narrow screens (mobile)
      mobilePane: "clients", // which pane to show on stacked: 'clients' | 'chat'
    };
  },
  computed: {
    filteredClients() {
      if (!this.searchQuery) return this.clients;
      const q = this.searchQuery.toLowerCase();
      return this.clients.filter(
        (client) =>
          client.name.toLowerCase().includes(q) ||
          (client.email && client.email.toLowerCase().includes(q)),
      );
    },
  },
  methods: {
    handleResize() {
      // stacked layout under 768px (mobile)
      this.isStacked = window.innerWidth < 768;
      // if switching to stacked and a client is selected, show chat by default
      if (this.isStacked && this.selectedClient) {
        this.mobilePane = "chat";
      } else if (!this.isStacked) {
        this.mobilePane = "clients";
      }
    },

    onClientClick(client) {
      this.selectClient(client);
      if (this.isStacked) {
        this.mobilePane = "chat";
      }
    },

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

    // Load clients from bookings
    async loadClients() {
      if (!this.trainerId) return;
      try {
        const bookingsRef = collection(this.db, "bookings");
        const q = query(bookingsRef, where("trainerId", "==", this.trainerId));
        const snapshot = await getDocs(q);
        const traineesMap = new Map();
        for (const docSnap of snapshot.docs) {
          const booking = docSnap.data();
          const traineeId = booking.traineeId || booking.trainee?.id;
          if (traineeId && !traineesMap.has(traineeId)) {
            let traineeData = booking.trainee || {};
            const hasImageInBooking = !!(
              traineeData.profilePicture ||
              traineeData.avatar ||
              traineeData.profileImage
            );
            const hasNameInBooking = !!(traineeData.firstName || traineeData.name);
            if (!hasImageInBooking || !hasNameInBooking) {
              const userData = await this.getUserData(traineeId);
              if (userData) {
                traineeData = { ...userData, ...traineeData };
              }
            }
            const name =
              traineeData.name ||
              `${traineeData.firstName || ""} ${traineeData.lastName || ""}`.trim() ||
              "Unknown Client";
            const avatar =
              traineeData.profilePicture || traineeData.avatar || traineeData.profileImage || null;
            traineesMap.set(traineeId, {
              id: traineeId,
              name: name,
              email: traineeData.email || "",
              avatar: avatar,
              lastMessage: "",
              lastMessageTime: null,
              unreadCount: 0,
            });
          }
        }
        this.clients = Array.from(traineesMap.values());
        await this.loadConversationsData();
        this.loadingClients = false;
      } catch (error) {
        console.error("Error loading clients:", error);
        toast.error("Failed to load clients", { position: "top-center", autoClose: 2000 });
        this.loadingClients = false;
      }
    },

    async loadConversationsData() {
      if (!this.trainerId || this.clients.length === 0) return;
      try {
        const conversationsRef = collection(this.db, "conversations");
        const q = query(conversationsRef, where("participants", "array-contains", this.trainerId));
        const snapshot = await getDocs(q);
        snapshot.forEach((docSnap) => {
          const conv = docSnap.data();
          const traineeId = conv.participants.find((p) => p !== this.trainerId);
          const client = this.clients.find((c) => c.id === traineeId);
          if (client) {
            client.conversationId = docSnap.id;
            client.lastMessage = conv.lastMessage || "";
            client.lastMessageTime = conv.lastMessageTime || null;
            client.unreadCount = conv.unreadCount?.[this.trainerId] || 0;
            if (conv.traineeInfo && conv.traineeInfo.avatar) {
              client.avatar = client.avatar || conv.traineeInfo.avatar;
            }
          }
        });
        this.clients.sort((a, b) => {
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
      if (!this.trainerId) return;
      const conversationsRef = collection(this.db, "conversations");
      const q = query(conversationsRef, where("participants", "array-contains", this.trainerId));
      this.conversationsUnsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const conv = change.doc.data();
          const traineeId = conv.participants.find((p) => p !== this.trainerId);
          const client = this.clients.find((c) => c.id === traineeId);
          if (client) {
            client.conversationId = change.doc.id;
            client.lastMessage = conv.lastMessage || "";
            client.lastMessageTime = conv.lastMessageTime || null;
            client.unreadCount = conv.unreadCount?.[this.trainerId] || 0;
            if (conv.traineeInfo && conv.traineeInfo.avatar) {
              client.avatar = client.avatar || conv.traineeInfo.avatar;
            }
          }
        });
        this.clients.sort((a, b) => {
          if (!a.lastMessageTime) return 1;
          if (!b.lastMessageTime) return -1;
          return b.lastMessageTime.toDate() - a.lastMessageTime.toDate();
        });
      });
    },

    async selectClient(client) {
      this.selectedClient = client;
      if (!client.conversationId) {
        await this.createConversation(client);
      }
      if (client.conversationId) {
        this.loadMessages(client.conversationId);
        this.markAsRead(client.conversationId);
      }
    },

    async createConversation(client) {
      try {
        const trainerDocRef = doc(this.db, "users", this.trainerId);
        const trainerDoc = await getDoc(trainerDocRef);
        const trainerData = trainerDoc.exists() ? trainerDoc.data() : {};
        const conversationsRef = collection(this.db, "conversations");
        const newConvRef = await addDoc(conversationsRef, {
          participants: [this.trainerId, client.id].sort(),
          traineeInfo: {
            id: client.id,
            name: client.name,
            avatar: client.avatar || null,
          },
          trainerInfo: {
            id: this.trainerId,
            name:
              `${trainerData.firstName || ""} ${trainerData.lastName || ""}`.trim() || "Trainer",
            avatar:
              trainerData.profilePicture || trainerData.avatar || trainerData.profileImage || null,
          },
          lastMessage: "",
          lastMessageTime: serverTimestamp(),
          unreadCount: {
            [this.trainerId]: 0,
            [client.id]: 0,
          },
          createdAt: serverTimestamp(),
        });
        client.conversationId = newConvRef.id;
      } catch (error) {
        console.error("Error creating conversation:", error);
        toast.error("Failed to create conversation", { position: "top-center", autoClose: 2000 });
      }
    },

    loadMessages(conversationId) {
      if (this.messagesUnsubscribe) this.messagesUnsubscribe();
      this.loadingMessages = true;
      this.messages = [];
      const messagesRef = collection(this.db, "conversations", conversationId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      this.messagesUnsubscribe = onSnapshot(
        q,
        (snapshot) => {
          this.messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          this.loadingMessages = false;
          this.scrollToBottom();
        },
        (error) => {
          console.error("Error loading messages:", error);
          this.loadingMessages = false;
        },
      );
    },

    async markAsRead(conversationId) {
      try {
        const conversationRef = doc(this.db, "conversations", conversationId);
        await updateDoc(conversationRef, { [`unreadCount.${this.trainerId}`]: 0 });
        if (this.selectedClient) this.selectedClient.unreadCount = 0;
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    },

    async sendMessage() {
      if (!this.messageInput.trim() || !this.selectedClient || this.sending) return;
      this.sending = true;
      const messageText = this.messageInput.trim();
      this.messageInput = "";
      try {
        const conversationId = this.selectedClient.conversationId;
        const messagesRef = collection(this.db, "conversations", conversationId, "messages");
        await addDoc(messagesRef, {
          senderId: this.trainerId,
          text: messageText,
          timestamp: serverTimestamp(),
          read: false,
        });
        const conversationRef = doc(this.db, "conversations", conversationId);
        const currentUnread = this.selectedClient.unreadCount || 0;
        await updateDoc(conversationRef, {
          lastMessage: messageText,
          lastMessageTime: serverTimestamp(),
          [`unreadCount.${this.selectedClient.id}`]: currentUnread + 1,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message", { position: "top-center", autoClose: 2000 });
        this.messageInput = messageText;
      } finally {
        this.sending = false;
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          try {
            container.scrollTop = container.scrollHeight;
          } catch {
            // ignore
          }
        }
      });
    },
  },

  mounted() {
    const user = this.auth.currentUser;
    if (user) {
      this.trainerId = user.uid;
      this.loadClients();
    } else {
      toast.error("Please login first", { position: "top-center", autoClose: 2000 });
      this.loadingClients = false;
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
/* colours and box style */
.bg-light-blue {
  background: #eef6ff;
}

/* MAIN BOX */
.inbox-wrapper {
  background: #eef6ff; /* الأزرق الفاتح */
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(2, 6, 23, 0.08);
  height: 100vh; /* ثابت على طول الشاشة */
  display: flex;
  flex-direction: row;
  overflow: hidden; /* يمنع أي تمدد غريب */
}

/* Sidebar + chat layout flex children can shrink */
.clients-column,
section.flex-1,
.clients-column > .flex-1,
section .flex-1 {
  min-height: 0;
}

/* الرسائل نفسها هي اللي Scroll ONLY */
.messages-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
}

/* message box style */
.message-box {
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
  border-radius: 14px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

/* root page adjustments */
.page-root {
  padding-left: 16px;
  padding-right: 16px;
}

/* Responsive tuning */
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
    height: 100vh; /* ثابت حتى على الموبايل */
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

/* small blue dot for unread indicator */
.unread-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2563eb;
  display: inline-block;
  vertical-align: middle;
}

/* Scrollbar design */
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
</style>
