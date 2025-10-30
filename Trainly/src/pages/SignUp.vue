<template>
  <div class="min-h-screen relative flex items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-20">
    <!-- Background image layer (blur on small screens, normal on desktop) -->
    <div
      class="absolute inset-0 bg-cover bg-center transition-all duration-300"
      style="background-image: url('/src/assets/images/signup.png')"
      aria-hidden="true"
    ></div>

    <!-- optional dim overlay on small screens to increase contrast -->
    <div class="absolute inset-0 bg-black/25 lg:bg-transparent pointer-events-none"></div>

    <!-- Card (form) -->
    <!-- centered on small/tablet via mx-auto; on desktop it's left-aligned because parent uses lg:justify-start and lg:px-20 -->
    <div class="relative z-10 w-full max-w-md bg-white bg-opacity-95 rounded-lg p-3 mx-auto lg:mx-0">
      <div class="bg-white rounded-lg p-4">
        <!-- Brand -->
        <div class="mb-4">
          <span
            class="text-2xl font-bold bg-gradient-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent"
          >
            Trainly
          </span>
        </div>

        <h2 class="text-xl font-semibold mb-5">Create Your Account</h2>

        <!-- Error Message -->
        <div
          v-if="errors.general"
          class="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-700 text-sm"
        >
          {{ errors.general }}
        </div>

        <!-- Step Indicator -->
        <div class="flex justify-center items-center mb-4">
          <div v-for="step in 3" :key="step" class="flex items-center">
            <div
              class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              :class="currentStep >= step ? 'bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white scale-110' : 'bg-gray-300 text-gray-500'"
            >
              {{ step }}
            </div>
            <div
              v-if="step < 3"
              class="w-10 h-0.5 mx-1 transition-all duration-300"
              :class="currentStep > step ? 'bg-gradient-to-r from-[#00C853] to-[#00B0FF]' : 'bg-gray-300'"
            ></div>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit">
          <!-- Step 1 -->
          <div v-show="currentStep === 1" class="animate-fade-in">
            <!-- Role Selection -->
            <div class="mb-5">
              <div class="flex gap-2">
                <!-- Trainee -->
                <div class="flex-1">
                  <input
                    type="radio"
                    id="trainee"
                    v-model="formData.role"
                    value="trainee"
                    class="hidden"
                  />
                  <label
                    for="trainee"
                    class="flex flex-col items-center cursor-pointer text-center transition-all duration-300 rounded-md"
                    :class="formData.role === 'trainee' ? 'border-green-500 bg-green-50 transform -translate-y-1 scale-105 shadow-md' : ''"
                  >
                    <span
                      class="w-full p-3 text-lg rounded-md transition-all duration-300"
                      :class="formData.role === 'trainee' ? 'bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white' : 'bg-[#E9F5EE] text-black'"
                    >
                      I'm a Trainee
                    </span>
                  </label>
                </div>

                <!-- Trainer -->
                <div class="flex-1">
                  <input
                    type="radio"
                    id="trainer"
                    v-model="formData.role"
                    value="trainer"
                    class="hidden"
                  />
                  <label
                    for="trainer"
                    class="flex flex-col items-center cursor-pointer text-center transition-all duration-300 rounded-md"
                    :class="formData.role === 'trainer' ? 'border-green-500 bg-green-50 transform -translate-y-1 scale-105 shadow-md' : ''"
                  >
                    <span
                      class="w-full p-3 text-lg rounded-md transition-all duration-300"
                      :class="formData.role === 'trainer' ? 'bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white' : 'bg-[#E9F5EE] text-black'"
                    >
                      I'm a Trainer
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Name Fields (responsive: stacked on small, side-by-side on sm+) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label for="first-name" class="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  v-model="formData.firstName"
                  placeholder="Enter name"
                  class="w-full p-2 border rounded-md shadow-sm text-sm box-border"
                  :class="errors.firstName ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label for="last-name" class="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  v-model="formData.lastName"
                  placeholder="Enter name"
                  class="w-full p-2 border rounded-md shadow-sm text-sm box-border"
                  :class="errors.lastName ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <!-- Birthday and Gender (responsive) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label for="birthdate" class="block text-sm mb-1">Birthday</label>
                <input
                  type="date"
                  id="birthdate"
                  v-model="formData.birthdate"
                  class="w-full p-2 border rounded-md shadow-sm text-sm box-border"
                  :class="errors.birthdate ? 'border-red-500' : 'border-gray-300'"
                  :max="maxBirthdate"
                />
                <p v-if="errors.birthdate" class="text-red-500 text-xs mt-1">
                  {{ errors.birthdate }}
                </p>
              </div>

              <div>
                <label for="gender" class="block text-sm mb-1">Gender</label>
                <select
                  id="gender"
                  v-model="formData.gender"
                  class="cursor-pointer w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                  :class="errors.gender ? 'border-red-500' : 'border-gray-300'"
                >
                  <option value="" disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p v-if="errors.gender" class="text-red-500 text-xs mt-1">
                  {{ errors.gender }}
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="mb-4">
              <label for="email" class="block text-sm mb-1">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="Enter email"
                class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                :class="errors.email ? 'border-red-500' : 'border-gray-300'"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Passwords (responsive) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <div>
                <label for="password" class="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="formData.password"
                  placeholder="Enter password"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                  :class="errors.password ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                  {{ errors.password }}
                </p>
              </div>

              <div>
                <label for="confirm-password" class="block text-sm mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  v-model="formData.confirmPassword"
                  placeholder="Enter password"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                  :class="errors.confirmPassword ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>

            <p class="text-xs text-gray-600 mb-4">
              *At least 8 characters mixed between letters, numbers and symbols
            </p>

            <div class="text-sm mb-5">
              Already have an account?
              <router-link to="/login" class="text-blue-500 underline">Log in</router-link>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                type="button"
                @click="nextStep"
                :disabled="isLoading"
                class="cursor-pointer flex-1 p-2 bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white rounded-md transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Step 2 -->
          <div v-show="currentStep === 2" class="animate-fade-in">
            <!-- Phone Number -->
            <div class="mb-4">
              <label for="phone" class="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                placeholder="Enter phone number"
                class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                :class="errors.phone ? 'border-red-500' : 'border-gray-300'"
              />
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                {{ errors.phone }}
              </p>
            </div>

            <!-- City and Country -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label for="city" class="block text-sm mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  v-model="formData.city"
                  placeholder="Enter a city"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                  :class="errors.city ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.city" class="text-red-500 text-xs mt-1">
                  {{ errors.city }}
                </p>
              </div>

              <div>
                <label for="country" class="block text-sm mb-1">Country</label>
                <input
                  type="text"
                  id="country"
                  v-model="formData.country"
                  placeholder="Enter a country"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                  :class="errors.country ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.country" class="text-red-500 text-xs mt-1">
                  {{ errors.country }}
                </p>
              </div>
            </div>

            <!-- Trainer Only Section -->
            <div v-if="formData.role === 'trainer'" class="border-t border-gray-300 pt-4 mt-4 animate-slide-down">
              <div class="mb-4">
                <label for="sport" class="block text-sm mb-1">Sport</label>
                <select
                  id="sport"
                  v-model="formData.sport"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm cursor-pointer box-border"
                  :class="errors.sport ? 'border-red-500' : 'border-gray-300'"
                >
                  <option value="" disabled>Select your sport</option>
                  <option value="bodybuilding">Bodybuilding</option>
                  <option value="padel">Padel</option>
                  <option value="tennis">Tennis</option>
                </select>
                <p v-if="errors.sport" class="text-red-500 text-xs mt-1">
                  {{ errors.sport }}
                </p>
              </div>

              <div class="mb-4">
                <label for="experience" class="block text-sm mb-1">Years of Experience</label>
                <input
                  type="number"
                  id="experience"
                  v-model="formData.experience"
                  min="0"
                  max="50"
                  placeholder="Enter years"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                  :class="errors.experience ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.experience" class="text-red-500 text-xs mt-1">
                  {{ errors.experience }}
                </p>
              </div>

              <div class="mb-4">
                <label class="block text-sm mb-1">Upload Certifications</label>
                <label
                  for="certifications"
                  class="inline-block px-3 py-2 bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white text-sm rounded-md cursor-pointer transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5"
                >
                  Choose Files
                </label>
                <input
                  type="file"
                  id="certifications"
                  @change="handleCertificationsUpload"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  class="hidden"
                />
                <div v-if="certificationsError" class="text-red-500 text-xs mt-1">
                  {{ certificationsError }}
                </div>
                <div class="mt-2">
                  <div v-for="(file, index) in certifications" :key="index" class="flex items-center justify-between p-2 bg-gray-100 rounded-md text-sm mb-1">
                    <span class="flex-1 truncate">{{ file.name }}</span>
                    <button type="button" @click="removeCertification(index)" class="text-red-500 text-lg ml-2 hover:text-red-700">×</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                type="button"
                @click="prevStep"
                :disabled="isLoading"
                class="cursor-pointer flex-1 p-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="button"
                @click="nextStep"
                :disabled="isLoading"
                class="cursor-pointer flex-1 p-2 bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white rounded-md transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Step 3 -->
          <div v-show="currentStep === 3" class="animate-fade-in">
            <!-- Profile Picture Upload -->
            <div class="text-center mb-6">
              <div class="mb-4">
                <div
                  class="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto mb-4 overflow-hidden cursor-pointer transition-all duration-300 hover:border-green-500"
                  @click="$refs.profilePicture.click()"
                >
                  <div v-if="!profilePicturePreview" class="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                    <span class="text-5xl">👤</span>
                  </div>
                  <img v-else :src="profilePicturePreview" alt="Profile Preview" class="w-full h-full object-cover" />
                </div>
                <label for="profile-picture" class="inline-block px-3 py-2 bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white text-sm rounded-md cursor-pointer transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5">
                  Choose Profile Picture
                </label>
                <input type="file" id="profile-picture" ref="profilePicture" @change="handleProfilePictureUpload" accept="image/*" class="hidden" />
                <p v-if="errors.profilePicture" class="text-red-500 text-xs mt-2">
                  {{ errors.profilePicture }}
                </p>
              </div>
            </div>

            <!-- Username -->
            <div class="mb-4">
              <label for="username" class="block text-sm mb-1">Username</label>
              <input
                type="text"
                id="username"
                v-model="formData.username"
                @input="checkUsernameAvailability"
                placeholder="Choose a username"
                class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm box-border"
                :class="errors.username ? 'border-red-500' : 'border-gray-300'"
              />
              <p v-if="errors.username" class="text-red-500 text-xs mt-1">
                {{ errors.username }}
              </p>
              <div class="text-xs mt-1 min-h-4" :class="usernameStatus === 'available' ? 'text-green-500' : usernameStatus === 'taken' ? 'text-red-500' : ''">
                {{ usernameMessage }}
              </div>
              <p class="text-xs text-gray-600 mt-2">
                *Upload your profile picture and choose your username to complete your registration.
                Once you're done, your account will be reviewed by the admin — you'll be notified as
                soon as it's approved!
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                type="button"
                @click="prevStep"
                :disabled="isLoading"
                class="cursor-pointer flex-1 p-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="cursor-pointer flex-1 p-2 bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white rounded-md transition-all duration-300 hover:opacity-90 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Creating...' : 'Create Account' }}
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Success Popup (kept same) -->
      <div v-if="showSuccess" class="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50 animate-fade-in">
        <div class="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-scale-in border-4 border-blue-400">
          <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
          </div>

          <h2 class="text-2xl font-bold text-green-600 mb-4">Thank you for signing up! 🎉</h2>

          <template v-if="formData.role === 'trainer'">
            <p class="text-gray-700 mb-2 leading-relaxed">Your information is currently being reviewed by our admin team.</p>
            <p class="text-gray-700 mb-2 leading-relaxed">If your details are valid, your account will be activated within 48 hours.</p>
            <p class="text-gray-600 mb-6 leading-relaxed">You'll receive an email once your account is approved.</p>
          </template>

          <template v-else>
            <p class="text-gray-700 mb-2 leading-relaxed">Your account has been created successfully!</p>
            <p class="text-gray-700 mb-2 leading-relaxed">You can now log in and start exploring your profile.</p>
            <p class="text-gray-600 mb-6 leading-relaxed">Welcome to Trainly! 🚀</p>
          </template>

          <button @click="closeSuccessModal" class="cursor-pointer w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { auth, db, storage } from "../Firebase/firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser
} from "firebase/auth";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  runTransaction
} from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "RegistrationForm",
  data() {
    return {
      currentStep: 1,
      totalSteps: 3,
      showSuccess: false,
      isLoading: false,
      formData: {
        role: "trainee",
        firstName: "",
        lastName: "",
        birthdate: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        city: "",
        country: "",
        username: "",
        sport: "",
        experience: "",
      },
      errors: {},
      profilePicture: null,
      profilePicturePreview: null,
      certifications: [],
      certificationsError: "",
      usernameStatus: "",
      usernameMessage: "",
      usernameTimeout: null,
    };
  },
  computed: {
    maxBirthdate() {
      // Set max date to 13 years ago (minimum age requirement)
      const date = new Date();
      date.setFullYear(date.getFullYear() - 13);
      return date.toISOString().split('T')[0];
    }
  },
  methods: {
    nextStep() {
      if (!this.validateStep(this.currentStep)) {
        return;
      }

      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.errors.general = "";
      }
    },
    validateStep(step) {
      this.errors = {};
      switch (step) {
        case 1:
          return this.validateStep1();
        case 2:
          return this.validateStep2();
        case 3:
          return this.validateStep3();
        default:
          return true;
      }
    },
    validateStep1() {
      const required = [
        "firstName",
        "lastName",
        "birthdate",
        "gender",
        "email",
        "password",
        "confirmPassword",
      ];
      let valid = true;

      for (const field of required) {
        if (!this.formData[field]) {
          this.errors[field] = "This field is required";
          valid = false;
        }
      }

      if (!valid) return false;

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.errors.email = "Please enter a valid email address";
        return false;
      }

      // Validate age (minimum 13 years old)
      const birthDate = new Date(this.formData.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        this.errors.birthdate = "You must be at least 13 years old";
        return false;
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-]).{8,}$/;
      if (!passwordRegex.test(this.formData.password)) {
        this.errors.password = "Password must be 8+ characters with letters, numbers, and symbols";
        return false;
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
        return false;
      }

      return true;
    },
    validateStep2() {
      this.errors = {};
      const required = ["phone", "city", "country"];
      let valid = true;

      for (const field of required) {
        if (!this.formData[field]) {
          this.errors[field] = "This field is required";
          valid = false;
        }
      }

      // Validate phone format (basic)
      const phoneRegex = /^[\d\s\-+()]{10,}$/;
      if (this.formData.phone && !phoneRegex.test(this.formData.phone)) {
        this.errors.phone = "Please enter a valid phone number";
        valid = false;
      }

      // Validate trainer-specific fields
      if (this.formData.role === "trainer") {
        if (!this.formData.sport) {
          this.errors.sport = "This field is required";
          valid = false;
        }
        if (!this.formData.experience) {
          this.errors.experience = "This field is required";
          valid = false;
        }
        if (parseInt(this.formData.experience) < 0 || parseInt(this.formData.experience) > 50) {
          this.errors.experience = "Experience must be between 0 and 50 years";
          valid = false;
        }
        if (this.certifications.length === 0) {
          this.certificationsError = "Please upload at least one certification file";
          valid = false;
        } else {
          this.certificationsError = "";
        }
      }

      return valid;
    },
    validateStep3() {
      this.errors = {};
      if (!this.formData.username || this.formData.username.trim().length < 3) {
        this.errors.username = "Username must be at least 3 characters";
        return false;
      }
      if (this.usernameStatus !== "available") {
        this.errors.username = "Please choose an available username";
        return false;
      }
      return true;
    },
    handleProfilePictureUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          this.errors.profilePicture = "Please select a valid image file";
          event.target.value = "";
          this.profilePicture = null;
          this.profilePicturePreview = null;
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          this.errors.profilePicture = "Image size must be less than 5MB";
          event.target.value = "";
          this.profilePicture = null;
          this.profilePicturePreview = null;
          return;
        }
        this.profilePicture = file;
        this.errors.profilePicture = "";
        const reader = new FileReader();
        reader.onload = (e) => (this.profilePicturePreview = e.target.result);
        reader.readAsDataURL(file);
      }
    },
    handleCertificationsUpload(event) {
      const files = Array.from(event.target.files);
      const validFiles = [];

      for (const file of files) {
        // Validate file size (max 10MB per file)
        if (file.size > 10 * 1024 * 1024) {
          this.certificationsError = `File ${file.name} exceeds 10MB limit`;
          event.target.value = "";
          return;
        }
        validFiles.push(file);
      }

      this.certifications = validFiles;
      this.certificationsError = "";
    },
    removeCertification(index) {
      this.certifications.splice(index, 1);
      if (this.certifications.length === 0) {
        const input = document.getElementById("certifications");
        if (input) input.value = "";
      }
    },
    checkUsernameAvailability() {
      if (this.usernameTimeout) clearTimeout(this.usernameTimeout);

      const username = this.formData.username.trim();

      // Clear status if username is too short
      if (username.length < 3) {
        this.usernameStatus = "";
        this.usernameMessage = "";
        return;
      }

      // Validate username format
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        this.usernameStatus = "invalid";
        this.usernameMessage = "Username can only contain letters, numbers, and underscores";
        return;
      }

      this.usernameStatus = "checking";
      this.usernameMessage = "Checking availability...";

      this.usernameTimeout = setTimeout(async () => {
        try {
          const usernamesRef = collection(db, "usernames");
          const q = query(usernamesRef, where("__name__", "==", username));
          const querySnapshot = await getDocs(q);
          const available = querySnapshot.empty;

          this.usernameStatus = available ? "available" : "taken";
          this.usernameMessage = available
            ? "✓ Username is available"
            : "✗ Username is already taken";
        } catch (err) {
          console.error("Username check error:", err);
          this.usernameStatus = "error";
          this.usernameMessage = "Error checking username";
        }
      }, 500);
    },
    async handleSubmit() {
      // Validate final step
      if (!this.validateStep(this.currentStep)) return;

      // Prevent double submit
      if (this.isLoading) return;
      this.isLoading = true;
      this.errors.general = "";

      let authUser = null;

      try {
        // Validate username
        const usernameTrim = this.formData.username.trim();
        if (!usernameTrim || usernameTrim.length < 3) {
          this.errors.username = "Username is required and must be at least 3 characters";
          this.currentStep = 3;
          this.isLoading = false;
          return;
        }

        // Prevent admin role creation from client
        if (this.formData.role === "admin") {
          this.errors.general = "Invalid role selection";
          this.isLoading = false;
          return;
        }

        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.formData.email,
          this.formData.password
        );
        authUser = userCredential.user;

        // Upload profile picture
        let profilePicUrl = null;
        if (this.profilePicture) {
          const picRef = storageRef(
            storage,
            `profilePictures/${authUser.uid}/${Date.now()}_${this.profilePicture.name}`
          );
          await uploadBytes(picRef, this.profilePicture, {
            contentType: this.profilePicture.type
          });
          profilePicUrl = await getDownloadURL(picRef);
        }

        // Upload certifications for trainers
        const certificationsUrls = [];
        if (this.formData.role === "trainer" && this.certifications.length > 0) {
          for (const file of this.certifications) {
            const certRef = storageRef(
              storage,
              `certifications/${authUser.uid}/${Date.now()}_${file.name}`
            );
            await uploadBytes(certRef, file, {
              contentType: file.type
            });
            const url = await getDownloadURL(certRef);
            certificationsUrls.push(url);
          }
        }

        // Atomic transaction to reserve username and create user document
        const usernameDocRef = doc(db, "usernames", usernameTrim);
        const userDocRef = doc(db, "users", authUser.uid);

        await runTransaction(db, async (transaction) => {
          const usernameSnap = await transaction.get(usernameDocRef);

          if (usernameSnap.exists()) {
            throw new Error("USERNAME_TAKEN");
          }

          // Reserve username
          transaction.set(usernameDocRef, {
            uid: authUser.uid,
            createdAt: serverTimestamp(),
          });

          // Create user document
          transaction.set(userDocRef, {
            uid: authUser.uid,
            role: this.formData.role,
            firstName: this.formData.firstName.trim(),
            lastName: this.formData.lastName.trim(),
            birthdate: this.formData.birthdate,
            gender: this.formData.gender,
            email: this.formData.email.toLowerCase().trim(),
            phone: this.formData.phone.trim(),
            city: this.formData.city.trim(),
            country: this.formData.country.trim(),
            username: usernameTrim,
            sport: this.formData.sport || null,
            experience: this.formData.experience ? parseInt(this.formData.experience) : null,
            profilePicture: profilePicUrl || null,
            certifications: certificationsUrls,
            status: this.formData.role === "trainer" ? "pending" : "active",
            createdAt: serverTimestamp(),
          });
        });

        // Update auth profile
        await updateProfile(authUser, {
          displayName: usernameTrim,
          photoURL: profilePicUrl || null,
        });

        // Show success modal
        this.showSuccess = true;

      } catch (error) {
        console.error("Sign up error:", error);

        // Clean up auth user if transaction failed
        if (authUser) {
          try {
            await deleteUser(authUser);
          } catch (delErr) {
            console.warn("Failed to delete auth user after error:", delErr);
          }
        }

        // Handle specific errors
        if (error.message === "USERNAME_TAKEN") {
          this.errors.username = "Username is already taken";
          this.usernameStatus = "taken";
          this.currentStep = 3;
        } else if (error.code === "auth/email-already-in-use") {
          this.errors.general = "This email is already registered";
          this.currentStep = 1;
        } else if (error.code === "auth/invalid-email") {
          this.errors.general = "Invalid email address";
          this.currentStep = 1;
        } else if (error.code === "auth/weak-password") {
          this.errors.general = "Password is too weak. Use at least 8 characters";
          this.currentStep = 1;
        } else if (error.code === "auth/network-request-failed") {
          this.errors.general = "Network error. Please check your connection";
        } else {
          this.errors.general = error.message || "Failed to create account. Please try again";
        }
      } finally {
        this.isLoading = false;
      }
    },
    closeSuccessModal() {
      this.showSuccess = false;
      // Redirect based on role
      if (this.formData.role === "trainer") {
        this.$router.push("/");
      } else {
        this.$router.push("/login");
      }
    },
  },
  beforeUnmount() {
    // Clear timeout on component destruction
    if (this.usernameTimeout) {
      clearTimeout(this.usernameTimeout);
    }
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
