<template>
  <div>
    <!-- Welcome Header -->
    <div
      class="w-full relative mb-10 bg-gradient-to-r from-[#D9EEFF] to-[#AEE2FF] rounded-2xl shadow-md p-6 flex items-center justify-between overflow-hidden"
    >
      <div class="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

      <div class="flex items-center gap-5 relative z-10">
        <div class="bg-white shadow-sm p-3 rounded-full">
          <img src="../../assets/images/hand.png" alt="User icon" class="w-10 h-10" />
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">Welcome back, {{ userData.name }}!</h2>

          <p class="text-sm text-gray-600 mt-1">Ready to crush your fitness goals today? 💪</p>
        </div>
      </div>
    </div>

    <section class="w-full flex flex-col gap-10">
      <div class="">
        <h2 class="text-[24px] font-medium text-gray-900">Settings</h2>
        <p class="mt-2 text-[16px] text-gray-500">
          Manage your account settings and preferences here.
        </p>
      </div>

      <form
        @submit.prevent="showConfirmUpdateModal"
        class="p-15 border border-gray-200 rounded-3xl shadow-xl bg-white flex flex-col items-center"
      >
        <div class="flex items-center gap-3 mb-6 self-start">
          <div class="bg-[#f4f8fc] w-10 h-10 rounded-lg flex items-center justify-center mr-2 mt-1">
            <img src="../../assets/images/page-1.png" alt="" class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
            <p class="text-sm text-gray-500">Update your personal details</p>
          </div>
        </div>

        <!-- Upload Profile Photo -->
        <div class="flex flex-col items-center mb-10">
          <label
            for="profilePhoto"
            class="w-24 h-24 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-500 transition bg-gray-50 overflow-hidden"
          >
            <img
              v-if="previewImage"
              :src="previewImage"
              alt="Preview"
              class="w-full h-full object-cover rounded-full"
            />
            <div v-else class="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-gray-400 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span class="text-xs text-gray-500">Upload your photo</span>
            </div>
            <input
              id="profilePhoto"
              type="file"
              class="hidden"
              accept="image/*"
              @change="handleFileUpload"
            />
          </label>
        </div>

        <!-- Personal Info -->
        <div class="w-full space-y-10">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-15">
            <div>
              <label for="first-name" class="block text-sm font-medium text-gray-900"
                >First Name</label
              >
              <input
                id="first-name"
                v-model="formData.firstName"
                type="text"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label for="last-name" class="block text-sm font-medium text-gray-900">Last Name</label>
              <input
                id="last-name"
                v-model="formData.lastName"
                type="text"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label for="gender" class="block text-sm font-medium text-gray-900">Gender</label>
              <select
                id="gender"
                v-model="formData.gender"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <!-- City / Country / Birthday -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mx-15">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-900">City</label>
              <input
                id="city"
                v-model="formData.city"
                type="text"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label for="country" class="block text-sm font-medium text-gray-900">Country</label>
              <input
                id="country"
                v-model="formData.country"
                type="text"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label for="birthday" class="block text-sm font-medium text-gray-900">Birthday</label>
              <input
                id="birthday"
                v-model="formData.birthdate"
                type="date"
                class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col md:flex-row mt-10 flex-wrap justify-between items-center w-full">
          <button
            type="submit"
            class="text-white bg-[#00B0FF] hover:bg-[#36ace2] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center mx-15 mb-2"
          >
            Save Changes
          </button>
          <button
          type='button'
            @click="deleteAccount"
            class="border-2 border-red-500 text-red-500 font-medium text-sm cursor-pointer py-2 px-6 rounded-lg hover:bg-red-50 transition mx-15"
          >
            Delete Account
          </button>
        </div>
      </form>

      <!-- ========= Security Section ========= -->
      <div class="w-full border border-gray-200 rounded-3xl shadow-xl bg-white p-10">
        <div class="flex mx-5">
          <div class="bg-[#f4f8fc] w-10 h-10 rounded-lg flex items-center justify-center mr-2 mt-1">
            <img src="../../assets/images/security.png" alt="" class="w-5 h-5" />
          </div>

          <div>
            <h2 class="text-xl font-[500] mb-1">Security</h2>
            <p class="mb-6 font-[400] text-[13px] text-gray-500">
              Manage your password and security settings
            </p>
          </div>
        </div>

        <form class="max-w-[95%] mx-17" @submit.prevent="onSubmit">
          <!-- Current password -->
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
            <div class="relative">
              <input
                :type="showCurrent ? 'text' : 'password'"
                v-model="form.current"
                class="shadow-xs border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                required
              />
              <button
                type="button"
                @click="toggle('current')"
                class="absolute inset-y-0 right-2 flex items-center justify-center px-2 text-gray-500"
              >
                <svg
                  v-if="!showCurrent"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477
                  0-8.268-2.943-9.542-7a9.965 9.965 0 012.223-3.583M3 3l18 18"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.88 9.88a3 3 0 104.24 4.24"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- New password -->
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900">New Password</label>
            <div class="relative">
              <input
                :type="showNew ? 'text' : 'password'"
                v-model="form.new"
                class="shadow-xs border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                required
                minlength="8"
              />
              <button
                type="button"
                @click="toggle('new')"
                class="absolute inset-y-0 right-2 flex items-center justify-center px-2 text-gray-500"
              >
                <svg
                  v-if="!showNew"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477
                  0 8.268 2.943 9.542 7-1.274 4.057-5.065
                  7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M13.875 18.825A10.05 10.05 0 0112
                  19c-4.477 0-8.268-2.943-9.542-7a9.965
                  9.965 0 012.223-3.583M3 3l18 18"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.88 9.88a3 3 0 104.24 4.24"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Repeat password -->
          <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
            <div class="relative">
              <input
                :type="showRepeat ? 'text' : 'password'"
                v-model="form.repeat"
                class="shadow-xs border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                required
                minlength="8"
              />
              <button
                type="button"
                @click="toggle('repeat')"
                class="absolute inset-y-0 right-2 flex items-center justify-center px-2 text-gray-500"
              >
                <svg
                  v-if="!showRepeat"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12
                  5c4.477 0 8.268 2.943 9.542 7-1.274
                  4.057-5.065 7-9.542 7-4.477
                  0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
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
                    d="M13.875 18.825A10.05 10.05 0 0112
                  19c-4.477 0-8.268-2.943-9.542-7a9.965
                  9.965 0 012.223-3.583M3 3l18 18"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.88 9.88a3 3 0 104.24 4.24"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="text-white mt-5 bg-[#00B0FF] hover:bg-[#36ace2] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto md:mx-0 block"
          >
            Update Password
          </button>

          <p v-if="message" class="text-sm mt-3 text-center" :class="messageColor">
            {{ message }}
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { db, storage } from "@/Firebase/firebaseConfig.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "TraineeSettings",

  data() {
    return {
      userId: null,
      previewImage: null,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        city: "",
        country: "",
        birthdate: "",
        experience: "",
        profilePicture: null,
      },
      showCurrent: false,
      showNew: false,
      showRepeat: false,
      form: { current: "", new: "", repeat: "" },
      userData: {},
    };
  },

  mounted() {
    const auth = getAuth();
    // keep auth listener as in your file (you asked not to touch password; auth check can remain)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userId = user.uid;
        this.userData = {
          name: user.displayName || user.email?.split("@")[0] || "User",
          uid: user.uid,
          email: user.email,
          photo: user.photoURL,
        };
        await this.fetchUserData();
      }
    });
  },

  methods: {
    // 🟢 Fetch user data
    async fetchUserData() {
      try {
        if (!this.userId) return;
        const userRef = doc(db, "users", this.userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          this.formData = { ...this.formData, ...docSnap.data() };
          if (docSnap.data().profilePicture) {
            this.previewImage = docSnap.data().profilePicture;
          }

          const firstName = this.formData.firstName || "User";
          this.userData.name = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        } else {
          console.log("No such user document found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    // 🟢 Upload new profile image
    handleFileUpload(e) {
      const file = e.target.files[0];
      this.formData.profilePicture = file;
      this.previewImage = URL.createObjectURL(file);
    },

    // NEW: show confirm modal before performing update (same style as delete modal)
    showConfirmUpdateModal() {
      const confirmBox = document.createElement("div");
      confirmBox.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "z-50");
      confirmBox.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      confirmBox.style.backdropFilter = "blur(3px)";

      confirmBox.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full mx-4 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Confirm changes
          </h2>
          <p class="text-gray-500 mb-6 text-sm">
            Are you sure you want to save these changes to your profile?
          </p>
          <div class="flex justify-center gap-4">
            <button id="confirmUpdateYes" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Yes
            </button>
            <button id="confirmUpdateNo" class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(confirmBox);

      const yesBtn = document.getElementById("confirmUpdateYes");
      const noBtn = document.getElementById("confirmUpdateNo");

      noBtn.addEventListener("click", () => confirmBox.remove());

      yesBtn.addEventListener("click", async () => {
        // close confirm modal first
        confirmBox.remove();
        // perform the update
        await this.performUpdate();
      });
    },

    // do the actual upload + firestore update, then show success modal
    async performUpdate() {
      try {
        if (!this.userId) return;

        const userRef = doc(db, "users", this.userId);
        let imageUrl = null;

        if (this.formData.profilePicture instanceof File) {
          const imageRef = ref(storage, `profilePictures/${this.userId}`);
          await uploadBytes(imageRef, this.formData.profilePicture);
          imageUrl = await getDownloadURL(imageRef);
        }

        await updateDoc(userRef, {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          gender: this.formData.gender,
          city: this.formData.city,
          country: this.formData.country,
          birthdate: this.formData.birthdate,
          experience: this.formData.experience,
          ...(imageUrl && { profilePicture: imageUrl }),
        });

        // Success modal (same visual style as delete modal)
        const modal = document.createElement("div");
        modal.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "z-50");
        modal.style.backgroundColor = "rgba(0,0,0,0.3)";
        modal.innerHTML = `
          <div class="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full mx-4 border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Your data has been updated successfully
            </h2>
            <button id="closeUpdateModal" class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
              OK
            </button>
          </div>
        `;
        document.body.appendChild(modal);
        document.getElementById("closeUpdateModal").addEventListener("click", () => modal.remove());
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update data!");
      }
    },

    // NOTE: keep password logic untouched (you asked not to touch it)
    toggle(field) {
      if (field === "current") this.showCurrent = !this.showCurrent;
      else if (field === "new") this.showNew = !this.showNew;
      else if (field === "repeat") this.showRepeat = !this.showRepeat;
    },

    async onSubmit() {
      // keep password handling as-is (no changes)
      if (this.form.new !== this.form.repeat) {
        alert("New password and confirmation do not match!");
        return;
      }

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("No user is signed in!");
        return;
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, this.form.current);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.form.new);

        alert("Password updated successfully!");
        this.form.current = this.form.new = this.form.repeat = "";
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },

    // Delete account modal & flow unchanged (kept as in your file)
    async deleteAccount() {
      const confirmBox = document.createElement("div");
      confirmBox.classList.add(
        "fixed", "inset-0", "flex", "items-center", "justify-center", "z-50"
      );
      confirmBox.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      confirmBox.style.backdropFilter = "blur(3px)";

      confirmBox.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full mx-4 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to delete your account?
          </h2>
          <p class="text-gray-500 mb-6 text-sm">
            This action cannot be undone.
          </p>
          <div class="flex justify-center gap-4">
            <button id="confirmDelete" class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
              Yes, Delete
            </button>
            <button id="cancelDelete" class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(confirmBox);

      const confirmBtn = document.getElementById("confirmDelete");
      const cancelBtn = document.getElementById("cancelDelete");

      cancelBtn.addEventListener("click", () => confirmBox.remove());

      confirmBtn.addEventListener("click", async () => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;

          if (!user) {
            confirmBox.remove();
            return;
          }

          const userRef = doc(db, "users", user.uid);
          await deleteDoc(userRef);
          await user.delete();

          confirmBox.remove();
          this.$router.push("/");
        } catch (error) {
          console.error("Error deleting account:", error);
          confirmBox.remove();
          alert("Failed to delete account!");
        }
      });
    },
  },
};
</script>





<style scoped></style>
