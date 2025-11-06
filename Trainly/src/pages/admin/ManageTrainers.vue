<template>
  <div class="bg-white dark:bg-black w-full relative p-1 mb-15">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-medium dark:text-white text-gray-900">
        Manage Trainers
      </h1>
      <p class="text-gray-500 dark:text-gray-300 mt-1">
        View and manage all registered trainers
      </p>
    </header>

    <!-- Search & Filter -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3"
    >
      <h2 class="text-xl font-medium dark:text-white text-gray-900">
        Trainers List
      </h2>
      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search trainers..."
          class="flex-1 px-4 py-2 border dark:text-white border-gray-300 dark:bg-[#3b3b3b] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          v-model="filterStatus"
          class="px-4 py-2 pr-8 border border-gray-300 dark:text-white dark:bg-[#3b3b3b] cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>

    <!-- TABLE VIEW (desktop & tablet) -->
    <div
      class="hidden sm:block overflow-x-auto bg-white dark:bg-[#292929] shadow-lg rounded-xl"
    >
      <table class="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
        <thead class="dark:bg-[#292929] bg-blue-50">
          <tr class="text-gray-600 dark:text-white text-sm font-semibold">
            <th class="px-4 py-3 text-left">Trainer</th>
            <th class="px-4 py-3 text-left">Sport</th>
            <th class="px-4 py-3 text-left hidden md:table-cell">Email</th>
            <th class="px-4 py-3 text-center">Rating</th>
            <th class="px-4 py-3 text-center hidden sm:table-cell">Clients</th>
            <th class="px-4 py-3 text-center">Status</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="trainer in filteredTrainers"
            :key="trainer.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          >
            <!-- Trainer -->
            <td class="px-4 py-4 align-middle">
              <div class="flex items-center gap-3">
                <div
                  v-if="trainer.profilePicture"
                  class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                >
                  <img
                    :src="trainer.profilePicture"
                    alt="profile"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold uppercase"
                >
                  {{ getInitials(trainer.firstName, trainer.lastName) }}
                </div>
                <p
                  class="font-medium dark:text-white text-gray-800 whitespace-nowrap"
                >
                  {{ trainer.firstName }} {{ trainer.lastName }}
                </p>
              </div>
            </td>

            <!-- Sport -->
            <td class="px-4 py-4 dark:text-white text-gray-700 align-middle">
              {{ trainer.sport || "-" }}
            </td>

            <!-- Email -->
            <td
              class="px-4 py-4 dark:text-white text-gray-700 align-middle hidden md:table-cell"
            >
              {{ trainer.email }}
            </td>

            <!-- Rating -->
            <td
              class="px-4 py-4 dark:text-white text-gray-700 align-middle text-center"
            >
              <div class="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927C9.349 2.02 10.65 2.02 10.951 2.927l1.286 3.957a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.373 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.907-.755 1.658-1.54 1.118l-3.373-2.455a1 1 0 00-1.175 0l-3.373 2.455c-.785.54-1.84-.21-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.285-3.957z"
                  />
                </svg>
                <span>{{ trainer.rating || "-" }}</span>
              </div>
            </td>

            <!-- Clients -->
            <td
              class="px-4 py-4 dark:text-white text-gray-700 align-middle text-center hidden sm:table-cell"
            >
              {{ trainer.clients || 0 }}
            </td>

            <!-- Status -->
            <td class="px-4 py-4 text-center dark:text-white align-middle">
              <span
                class="px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize"
                :class="{
                  'bg-blue-500 text-white': trainer.status === 'active',
                  'bg-gray-200 text-gray-700': trainer.status === 'pending',
                  'bg-red-100 text-red-700': trainer.status === 'suspended',
                }"
              >
                {{ trainer.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-4 py-4 text-right align-middle relative">
              <button
                @click="toggleMenu(trainer.id, $event)"
                class="text-gray-500 dark:text-white cursor-pointer hover:text-gray-700 hover:scale-110"
              >
                ⋮
              </button>

              <!-- Dropdown -->
              <teleport to="body">
                <div
                  v-if="openMenuId === trainer.id"
                  :style="dropdownStyle"
                  class="fixed w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
                >
                  <button
                    @click="goToTrainer(trainer)"
                    class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    View Account
                  </button>

                  <button
                    v-if="trainer.status === 'pending'"
                    @click="openModal('accept', trainer)"
                    class="block w-full text-left px-4 py-2 cursor-pointer text-green-600 hover:bg-gray-100"
                  >
                    Accept
                  </button>
                  <button
                    v-if="trainer.status === 'active'"
                    @click="openModal('suspend', trainer)"
                    class="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Suspend
                  </button>
                  <button
                    @click="openModal('delete', trainer)"
                    class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </teleport>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MOBILE VIEW (cards) -->
    <div class="sm:hidden space-y-4">
      <div
        v-for="trainer in filteredTrainers"
        :key="trainer.id"
        class="p-4 bg-white rounded-xl shadow-md border border-gray-100 relative"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800">
              {{ trainer.firstName }} {{ trainer.lastName }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ trainer.sport || "No sport" }}
            </p>
            <p class="text-sm text-gray-500">
              Clients: {{ trainer.clients || 0 }}
            </p>
            <p class="text-sm text-gray-500">Rating: ⭐ {{ trainer.rating }}</p>
            <span
              class="mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-blue-500 text-white': trainer.status === 'active',
                'bg-gray-200 text-gray-700': trainer.status === 'pending',
                'bg-red-100 text-red-700': trainer.status === 'suspended',
              }"
            >
              {{ trainer.status }}
            </span>
          </div>

          <button
            @click="toggleMenu(trainer.id, $event)"
            class="text-gray-500 hover:text-gray-700 hover:scale-110"
          >
            ⋮
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation / Delete-Reason Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-[6px] flex items-center justify-center z-[9998]"
    >
      <div
        class="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-[90%] max-w-md text-center border border-gray-200"
      >
        <!-- Delete reason form -->
        <template v-if="modalType === 'delete' && modalState === 'confirm'">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">
            Delete Trainer Account
          </h2>
          <p class="text-gray-600 mb-3">
            Please write the reason for deleting
            {{ selectedTrainer.firstName }}’s account:
          </p>
          <textarea
            v-model="deleteReason"
            rows="4"
            placeholder="Type reason..."
            class="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
          ></textarea>
          <div class="flex justify-center gap-3">
            <button
              @click="confirmAction"
              class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
              Send & Delete
            </button>
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </template>

        <!-- Activate -->
        <template
          v-else-if="modalType === 'accept' && modalState === 'confirm'"
        >
          <h2 class="text-xl font-semibold mb-4 text-gray-800">
            Activate Trainer
          </h2>
          <p class="text-gray-600 mb-6">
            Are you sure you want to activate {{ selectedTrainer.firstName }}’s
            account?
          </p>
          <div class="flex justify-center gap-3">
            <button
              @click="confirmAction"
              class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm
            </button>
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </template>
        <!-- Suspend -->
        <div v-else-if="modalType === 'suspend' && modalState === 'confirm'">
  <h2 class="text-xl font-semibold mb-4 text-gray-800">
    Suspend Trainer Account
  </h2>
  <p class="text-gray-600 mb-4">
    Please provide a reason for suspending
    {{ selectedTrainer?.firstName }}’s account.
  </p>
  <textarea
    v-model="suspendReason"
    placeholder="Type reason..."
    class="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
    rows="3"
  ></textarea>
  <div class="flex justify-center gap-3">
    <button
      @click="confirmAction"
      class="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white"
    >
      Send & Suspend
    </button>
    <button
      @click="closeModal"
      class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
    >
      Cancel
    </button>
  </div>
</div>


        <!-- Message after action -->
        <template v-else-if="modalState === 'message'">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">
            {{ modalMessageTitle }}
          </h2>
          <p class="text-gray-600">{{ modalMessageText }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { db } from "@/Firebase/firebaseConfig.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "vue-router";

const trainers = ref([]);
const searchQuery = ref("");
const filterStatus = ref("");
const openMenuId = ref(null);
const dropdownStyle = ref({});

const showModal = ref(false);
const modalType = ref("");
const selectedTrainer = ref(null);
const modalState = ref("confirm");
const modalMessageTitle = ref("");
const modalMessageText = ref("");
const suspendReason = ref("");

// new: delete reason used in delete modal
const deleteReason = ref("");

const router = useRouter();
const goToTrainer = (trainer) => {
  const trainerId = trainer.id || trainer.uid;

  console.log("Full trainer object:", trainer);
  console.log("Trainer ID:", trainerId);

  if (!trainerId) {
    console.error("No trainerId found in trainer object:", trainer);
    alert("Trainer ID not available");
    return;
  }

  router.push({
    path: "/admin/trainer",
    query: { uid: trainerId },
  });
};

// 🔹 تصفية المدربين
const filteredTrainers = computed(() =>
  trainers.value.filter((trainer) => {
    const matchName = `${trainer.firstName} ${trainer.lastName}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchStatus = filterStatus.value
      ? trainer.status === filterStatus.value
      : true;
    return matchName && matchStatus;
  })
);

// 🔹 فتح القائمة المنسدلة بشكل مضبوط
const toggleMenu = (id, event) => {
  if (openMenuId.value === id) {
    openMenuId.value = null;
    return;
  }

  const rect = event.target.getBoundingClientRect();
  dropdownStyle.value = {
    top: `${rect.bottom + 6}px`,
    left: `${rect.right - 160}px`,
  };
  openMenuId.value = id;
};

// 🔹 قفل الدروب داون عند الضغط خارجها
document.addEventListener("click", (e) => {
  const isMenuButton = e.target.closest("button");
  if (!isMenuButton) {
    openMenuId.value = null;
  }
});

// 🔹 فتح المودال
const openModal = (type, trainer) => {
  modalType.value = type;
  selectedTrainer.value = trainer;
  showModal.value = true;
  modalState.value = "confirm";
  openMenuId.value = null;

  // ✅ تحديد الرسالة حسب نوع الإجراء
  if (type === "delete") {
    modalMessageTitle.value = "Confirm Deletion";
    modalMessageText.value = `Are you sure you want to delete ${trainer.firstName}'s account? This action cannot be undone.`;
  } else if (type === "accept") {
    modalMessageTitle.value = "Activate Trainer";
    modalMessageText.value = `Are you sure you want to activate ${trainer.firstName}'s account?`;
  } else if (type === "suspend") {
    modalMessageTitle.value = "Suspend Trainer";
    modalMessageText.value = `Are you sure you want to suspend ${trainer.firstName}'s account?`;
  }
};

// 🔹 غلق المودال
const closeModal = () => {
  showModal.value = false;
  selectedTrainer.value = null;
  deleteReason.value = "";
  modalState.value = "confirm";
  modalMessageTitle.value = "";
  modalMessageText.value = "";
};

// ------------------ helper: send email via backend ------------------
const sendEmail = async (to, subject, message) => {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, message }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Email send failed:", res.status, text);
      throw new Error("Email failed to send");
    }
  } catch (err) {
    console.error("Email error:", err);
    // still let caller handle it — don't block UI silently
    throw err;
  }
};

// 🔹 تنفيذ الإجراء (Accept / Delete / Suspend)
const confirmAction = async () => {
  if (!selectedTrainer.value) return;
  const trainer = selectedTrainer.value;
  const trainerRef = doc(db, "users", trainer.id);

  try {
    if (modalType.value === "delete") {
      if (!deleteReason.value.trim()) {
        alert("Please provide a reason before sending.");
        return;
      }

      // 1) send deletion email
      try {
        await sendEmail(
          trainer.email,
          "Your Trainer Account Has Been Deleted",
          `Hello ${trainer.firstName},\n\nYour trainer account has been deleted for the following reason:\n\n"${deleteReason.value}"\n\nIf you believe this is a mistake, please contact support.\n\nBest regards,\nAdmin Team`
        );
      } catch (emailErr) {
        // If email fails, warn admin but continue with deletion if desired.
        // Here we stop and show error so admin can retry or check backend.
        alert("Failed to send deletion email. Check console for details.");
        console.error("Deletion email error:", emailErr);
        return;
      }

      // 2) delete trainer doc
      await deleteDoc(trainerRef);
      trainers.value = trainers.value.filter((t) => t.id !== trainer.id);

      modalMessageTitle.value = "Trainer Deleted";
      modalMessageText.value = `${trainer.firstName}'s account has been deleted and an email has been sent.`;
      
    } else if (modalType.value === "accept") {
      // 1) update status
      await updateDoc(trainerRef, { status: "active" });
      // Update local copy in trainers list if present
      const idx = trainers.value.findIndex((t) => t.id === trainer.id);
      if (idx !== -1) trainers.value[idx].status = "active";
      // keep selectedTrainer in sync
      trainer.status = "active";

      // 2) send activation email
      try {
        await sendEmail(
          trainer.email,
          "Your Trainer Account Has Been Activated",
          `Hello ${trainer.firstName},\n\nYour trainer account has been successfully activated. You can now log in and start managing your sessions.\n\nBest regards,\nAdmin Team`
        );
      } catch (emailErr) {
        alert("Failed to send activation email. Check console for details.");
        console.error("Activation email error:", emailErr);
        return;
      }

      modalMessageTitle.value = "Trainer Activated";
      modalMessageText.value = `${trainer.firstName}'s account is now active and an email has been sent.`;
    } else if (modalType.value === "suspend") {
  if (!suspendReason.value.trim()) return alert("Please provide a reason");

  try {
    await sendEmail(
      trainer.email,
      "Your Trainer Account Has Been Suspended",
      `Hello ${trainer.firstName},\n\nYour trainer account has been suspended for the following reason:\n\n"${suspendReason.value}"\n\nIf you believe this is a mistake, please contact support.\n\nBest,\nAdmin Team`
    );
  } catch (emailErr) {
    alert("Failed to send suspension email. Check console for details.");
    console.error("Suspension email error:", emailErr);
    return;
  }

  await updateDoc(trainerRef, { status: "suspended" });
  // Update locally if needed
  const idx = trainers.value.findIndex((t) => t.id === trainer.id);
  if (idx !== -1) trainers.value[idx].status = "suspended";
  trainer.status = "suspended";

  modalMessageTitle.value = "Trainer Suspended";
  modalMessageText.value = `${trainer.firstName}'s account has been suspended and an email has been sent.`;
  suspendReason.value = "";
}

    modalState.value = "message";
    // reset delete reason after successful action
    deleteReason.value = "";

    // auto-close after short delay so admin can read message
    setTimeout(() => {
      showModal.value = false;
      modalState.value = "confirm";
      modalType.value = "";
      selectedTrainer.value = null;
      modalMessageTitle.value = "";
      modalMessageText.value = "";
    }, 2000);
  } catch (error) {
    console.error("Error in confirmAction:", error);
    alert("An error occurred. Check console for details.");
  }
};

// 🔹 تحميل البيانات
onMounted(async () => {
  try {
    const trainersSnapshot = await getDocs(collection(db, "users"));
    const bookingsSnapshot = await getDocs(collection(db, "bookings"));
    const reviewsSnapshot = await getDocs(collection(db, "reviews"));

    const allTrainers = trainersSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((user) => user.role === "trainer");

    const bookings = bookingsSnapshot.docs.map((doc) => doc.data());
    const reviews = reviewsSnapshot.docs.map((doc) => doc.data());

    allTrainers.forEach((trainer) => {
      const trainerBookings = bookings.filter(
        (b) => b.trainerId === trainer.uid || b.trainerId === trainer.id
      );
      trainer.clients = trainerBookings.length;

      const trainerReviews = reviews.filter(
        (r) => r.trainerId === trainer.uid || r.trainerId === trainer.id
      );
      if (trainerReviews.length > 0) {
        const totalRating = trainerReviews.reduce(
          (sum, r) => sum + (r.rating || 0),
          0
        );
        trainer.rating = (totalRating / trainerReviews.length).toFixed(1);
      } else {
        trainer.rating = "-";
      }
    });

    trainers.value = allTrainers;
  } catch (error) {
    console.error("Error fetching trainers:", error);
  }
});
</script>

<style scoped>
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
</style>
