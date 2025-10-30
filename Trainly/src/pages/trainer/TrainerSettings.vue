<template>
  <section class="max-w-5xl mx-auto flex flex-col gap-12">
    <div class="">
      <h2 class="text-[24px] font-medium text-gray-900">Settings</h2>
      <p class="mt-2 text-[16px] text-gray-500">
        Manage your account settings and preferences here.
      </p>
    </div>
    <!-- ========= Personal Info Section ========= -->
    <div
      class="w-full border border-gray-200 rounded-3xl shadow-xl bg-white p-7"
    >
      <div class="flex items-center gap-3 mb-6">
        <div
          class="bg-[#D9EEFF] w-10 h-10 rounded-lg flex items-center justify-center mr-2 mt-1"
        >
          <img src="../../assets/images/page-1.png" alt="" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-medium text-gray-900">
            Personal Information
          </h2>
          <p class="text-sm text-gray-500">Update your personal details</p>
        </div>
      </div>

      <form class="space-y-10 mx-15" @submit.prevent="updateTrainer">
        <!-- Profile Photo -->
        <div class="flex flex-col items-center mb-10">
          <label
            for="profilePhoto"
            class="w-23 h-23 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 transition relative"
          >
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
            <input
              id="profilePhoto"
              type="file"
              class="hidden"
              @change="newProfilePhoto = $event.target.files[0]"
            />

            <img
              v-if="formData.profilePicture"
              :src="formData.profilePicture"
              class="absolute top-0 left-0 w-full h-full rounded-full object-cover"
            />
          </label>
          <span class="text-sm text-gray-500">Upload your photo</span>
        </div>

        <!-- Inputs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-900"
              >First Name</label
            >
            <input
              v-model="formData.firstName"
              type="text"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900"
              >Last Name</label
            >
            <input
              v-model="formData.lastName"
              type="text"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900">Email</label>
            <input
              v-model="formData.email"
              type="email"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900"
              >Gender</label
            >
            <select
              v-model="formData.gender"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <!-- City / Country / Birthday -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-900">City</label>
            <input
              v-model="formData.city"
              type="text"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900"
              >Country</label
            >
            <input
              v-model="formData.country"
              type="text"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900"
              >Birthday</label
            >
            <input
              v-model="formData.birthdate"
              type="date"
              class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
            />
          </div>
        </div>

        <!-- Experience -->
        <div>
          <label class="block text-sm font-medium text-gray-900"
            >Years of Experience</label
          >
          <input
            v-model="formData.experience"
            type="number"
            class="mt-2 w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Upload Certificate -->
        <!-- Upload Certificate -->
        <div>
          <h2 class="text-sm font-medium text-gray-900 mt-8">
            Upload Certificate
          </h2>
          <div
            class="flex text-center border-2 border-dashed border-gray-300 p-5 rounded-xl hover:border-blue-400 transition mt-3"
          >
            <div class="flex-1">
              <input
                id="certificate"
                type="file"
                class="hidden"
                @change="newCertificate = $event.target.files[0]"
              />
              <label
                for="certificate"
                class="cursor-pointer inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition text-sm"
              >
                Upload
              </label>
              <p class="text-xs text-gray-500 mt-2">PDF, JPG up to 10MB</p>

              <!-- Certificate List with Remove Buttons -->
              <div
                v-if="formData.certifications && formData.certifications.length"
                class="mt-4 space-y-2"
              >
                <div
                  v-for="(cert, index) in formData.certifications"
                  :key="index"
                  class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <a
                    :href="cert"
                    target="_blank"
                    class="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    📄 Certificate {{ index + 1 }}
                  </a>
                  <button
                    type="button"
                    @click="removeCertificate(index)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 transition cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div
          class="flex flex-col md:flex-row mt-10 justify-between w-full gap-4 md:gap-0"
        >
          <button
            type="submit"
            class="text-white bg-[#00B0FF] hover:bg-[#36ace2] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm py-2 px-6 rounded-lg transition mx-auto md:mx-0"
          >
            Save Changes
          </button>
          <button
            type="button"
            @click="deleteAccount"
            class="border-2 border-red-500 text-red-500 font-medium text-sm cursor-pointer py-2 px-6 rounded-lg hover:bg-red-50 transition mx-auto md:mx-0"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>

    <!-- ========= Security Section ========= -->
    <div
      class="w-full border border-gray-200 rounded-3xl shadow-xl bg-white p-7"
    >
      <div class="flex">
        <div
          class="bg-[#D9EEFF] w-10 h-10 rounded-lg flex items-center justify-center mr-2 mt-1"
        >
          <img src="../../assets/images/security.png" alt="" class="w-5 h-5" />
        </div>

        <div>
          <h2 class="text-xl font-[500] mb-1">Security</h2>
          <p class="mb-6 font-[400] text-[13px] text-gray-500">
            Manage your password and security settings
          </p>
        </div>
      </div>

      <form class="max-w-[95%] ps-[50px]" @submit.prevent="onSubmit">
        <!-- Current password -->
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Current Password</label
          >
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
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274
                4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >New Password</label
          >
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
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Confirm Password</label
          >
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

        <p
          v-if="message"
          class="text-sm mt-3 text-center"
          :class="messageColor"
        >
          {{ message }}
        </p>
      </form>
    </div>

    <!-- ========= subsecribtion Section ========= -->
    <div
      class="w-full border border-gray-200 rounded-3xl shadow-xl bg-white p-8"
    >
      <!-- Header -->
      <div class="flex items-start mb-8">
        <div
          class="bg-[#D9EEFF] w-11 h-11 rounded-xl flex items-center justify-center mr-3"
        >
          <img
            src="../../assets/images/stash_plan-duotone.png"
            alt="security icon"
            class="w-5 h-5"
          />
        </div>
        <div>
          <h2 class="text-xl font-[500] mb-1 text-gray-800">Subscription</h2>
          <p class="text-sm text-gray-500">
            Manage your current subscription and plan details here.
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-col md:flex-row justify-between gap-10">
        <!-- Left side: Plan details -->
        <div class="flex-1 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
          <h3 class="text-lg font-medium mb-3 text-gray-800">Current Plan</h3>
          <ul class="space-y-3 text-gray-600 text-sm">
            <li><span class="font-medium text-gray-800">$29.99/month</span></li>
            <li>
              Next renewal: <span class="font-medium">November 15, 2025</span>
            </li>
            <ul class="space-y-2 text-gray-600 text-sm mt-4">
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                6 plans/month
              </li>

              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unlimited clients
              </li>

              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Priority support
              </li>
            </ul>
          </ul>
        </div>

        <!-- Right side: Full-width Buttons -->
        <div class="flex flex-col justify-center items-stretch gap-3 md:w-1/3">
          <button
            class="text-white bg-[#00B0FF] hover:bg-[#36ace2] focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
          >
            Upgrade Plan
          </button>

          <button
            class="border border-gray-300 text-gray-800 bg-[#f7f8f8] hover:bg-[#eaf3f7] focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
          >
            Downgrade Plan
          </button>

          <button
            class="text-red-500 hover:text-red-600 border border-red-200 bg-[#fff5f5] font-medium rounded-lg text-sm px-6 py-3 w-full transition"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>

    <!-- ========= payment Section ========= -->
 <div class="w-full border border-gray-200 rounded-3xl shadow-xl bg-white p-8">
  <!-- Header -->
  <div class="flex items-start mb-8">
    <div class="bg-[#D9EEFF] w-11 h-11 rounded-xl flex items-center justify-center mr-3">
      <img
        src="../../assets/images/streamline-flex-color_subscription-cashflow-flat.png"
        alt="payment icon"
        class="w-5 h-5"
      />
    </div>
    <div>
      <h2 class="text-xl font-medium mb-1 text-gray-800">Payment Management</h2>
      <p class="text-sm text-gray-500">
        Manage your payment methods and track your total income.
      </p>
    </div>
  </div>

  <!-- Green Income Section (Full Width) -->
  <div class="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white p-4 rounded-2xl shadow-md mb-10">
    <p class="text-sm opacity-90">Total Income</p>
    <h3 class="text-3xl font-semibold mt-1 mb-1">$12,450.00</h3>
    <p class="text-sm opacity-90">This month: <span class="font-medium">+$2,340.00</span></p>
  </div>

  <!-- Content Section -->
  <div class="flex flex-col md:flex-row justify-between gap-10">
    <!-- Left side: Payment Methods -->
    <div class="flex-1 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Payment Methods</h3>

      <!-- Card Method -->
     <!-- Card Method -->
<div
  class="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm"
>
  <img src="../../assets/images/i.png" alt="card" class="w-8 h-8" />
  <div>
    <p class="font-medium text-gray-800">•••• •••• •••• 4242</p>
    <p class="text-sm text-gray-500">Expires 12/25</p>
  </div>
</div>

<!-- PayPal Method -->
<div
  class="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
>
  <img src="../../assets/images/ip.png" alt="paypal" class="w-8 h-8 opacity-90" />
  <div class="flex flex-col w-full">
    <p class="font-medium text-gray-800 mb-1">PayPal Account</p>
    <input
      v-model="formData.email" class="text-sm text-gray-500">
  </div>
</div>


      <!-- Buttons -->
      <div class="flex flex-col gap-3">
        <button
          class="text-white bg-[#22C55E] hover:bg-[#16A34A] focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
        >
          Add Payment Method
        </button>

        <button
          class="border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
        >
          Withdraw Earnings
        </button>
      </div>
    </div>

    <!-- Right side: Recent Transactions -->
    <div class="flex-1 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Recent Transactions</h3>

      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div>
            <p class="font-medium text-gray-800">Training Session</p>
            <p class="text-sm text-gray-500">Oct 15, 2025</p>
          </div>
          <p class="text-green-600 font-semibold">+$80.00</p>
        </div>

        <div class="flex justify-between items-center bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div>
            <p class="font-medium text-gray-800">Monthly Membership</p>
            <p class="text-sm text-gray-500">Oct 12, 2025</p>
          </div>
          <p class="text-green-600 font-semibold">+$150.00</p>
        </div>

        <div class="flex justify-between items-center bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div>
            <p class="font-medium text-gray-800">Platform Fee</p>
            <p class="text-sm text-gray-500">Oct 11, 2025</p>
          </div>
          <p class="text-red-500 font-semibold">- $15.00</p>
        </div>
      </div>
    </div>
  </div>
</div>


  </section>
</template>

<script>
import { db, storage } from "@/Firebase/firebaseConfig.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { toast } from "vue3-toastify";

export default {
  name: "TrainerSettings",

  data() {
    return {
      userId: null,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        city: "",
        country: "",
        birthdate: "",
        experience: "",
        profilePicture: "",
        certifications: [],
        phone: "",
        sport: "",
        role: "",
        status: "",
        username: "",
      },
      newProfilePhoto: null,
      newCertificate: null,

      // password section (unchanged)
      form: { current: "", new: "", repeat: "" },
      showCurrent: false,
      showNew: false,
      showRepeat: false,
    };
  },

  async mounted() {
    // get uid automatically since user is already signed in
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.userId = user.uid;
      await this.fetchTrainerData();
    } else {
      // fallback: if for any reason there's no currentUser, ask to login
      alert("No user found. Please log in again.");
      this.$router.push("/login");
    }
  },

  methods: {
    // fetch trainer data from Firestore
    async fetchTrainerData() {
      try {
        if (!this.userId) return;
        const docRef = doc(db, "users", this.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.formData = docSnap.data();
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error);
        alert("An error occurred while loading your data.");
      }
    },

    // upload file to storage and return download URL
    async uploadFile(file, type) {
      if (!file) return null;
      try {
        const fileRef = storageRef(
          storage,
          `users/${this.userId}/${type}-${Date.now()}-${file.name}`
        );
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      } catch (error) {
        console.error("File upload failed:", error);
        alert("File upload failed. Please try again.");
        return null;
      }
    },

    // remove certificate from local array and Firestore (doesn't delete file in storage)
    async removeCertificate(index) {
      try {
        if (!this.userId || !this.formData.certifications) return;

        // remove locally
        this.formData.certifications.splice(index, 1);

        // update firestore
        const userRef = doc(db, "users", this.userId);
        await updateDoc(userRef, {
          certifications: this.formData.certifications,
        });
      } catch (error) {
        console.error("Error removing certificate:", error);
        alert("Failed to remove certificate.");
      }
    },

    // main update function for profile (no toasts here)
    async updateTrainer() {
      try {
        if (!this.userId) {
          alert("No user found!");
          return;
        }

        const updateData = {};

        // handle new profile photo
        if (this.newProfilePhoto) {
          const photoUrl = await this.uploadFile(
            this.newProfilePhoto,
            "profilePhoto"
          );
          if (photoUrl) {
            updateData.profilePicture = photoUrl;
            this.formData.profilePicture = photoUrl;
          }
        }

        // handle new certificate
        if (this.newCertificate) {
          const certUrl = await this.uploadFile(
            this.newCertificate,
            "certificate"
          );
          if (certUrl) {
            if (!this.formData.certifications)
              this.formData.certifications = [];
            this.formData.certifications.push(certUrl);
            updateData.certifications = this.formData.certifications;
          }
        }

        // add/edit textual fields
        Object.assign(updateData, {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          gender: this.formData.gender,
          city: this.formData.city,
          country: this.formData.country,
          birthdate: this.formData.birthdate,
          experience: this.formData.experience,
          phone: this.formData.phone,
          sport: this.formData.sport,
          role: this.formData.role,
          status: this.formData.status,
          username: this.formData.username,
        });

        const docRef = doc(db, "users", this.userId);
        await updateDoc(docRef, updateData);

        // reset file inputs
        this.newProfilePhoto = null;
        this.newCertificate = null;

        // show success modal (same style as delete confirm)
        this.showSuccessModal();
      } catch (error) {
        console.error("Error updating trainer data:", error);
        alert("An error occurred. Please try again.");
      }
    },

    // success modal (same structure as confirmBox but single OK button)
    showSuccessModal() {
      const modal = document.createElement("div");
      modal.classList.add(
        "fixed",
        "inset-0",
        "flex",
        "items-center",
        "justify-center",
        "z-50"
      );
      modal.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      modal.style.backdropFilter = "blur(3px)";

      modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full mx-4 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Profile Updated Successfully
          </h2>
          <p class="text-gray-500 mb-6 text-sm">
            Your information has been saved.
          </p>
          <div class="flex justify-center">
            <button id="closeSuccessModal" class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
              OK
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeBtn = document.getElementById("closeSuccessModal");
      closeBtn.addEventListener("click", () => modal.remove());
    },

    // delete account (keeps original behavior but uses alert for errors)
    async deleteAccount() {
      const confirmBox = document.createElement("div");
      confirmBox.classList.add(
        "fixed",
        "inset-0",
        "flex",
        "items-center",
        "justify-center",
        "z-50"
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
            alert("No user found!");
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
          alert("Failed to delete account. Please try again.");
        }
      });
    },

    // -----------------------
    // PASSWORD SECTION (unchanged, still uses toast)
    // -----------------------

    // show/hide password fields
    toggle(field) {
      if (field === "current") this.showCurrent = !this.showCurrent;
      else if (field === "new") this.showNew = !this.showNew;
      else if (field === "repeat") this.showRepeat = !this.showRepeat;
    },

    // update password (keeps toast notifications)
    async onSubmit() {
      if (this.form.new !== this.form.repeat) {
        toast.error("New password and confirmation do not match!");
        return;
      }

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("No user is signed in!");
        return;
      }

      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          this.form.current
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.form.new);

        toast.success("Password updated successfully");
        this.form.current = this.form.new = this.form.repeat = "";
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    },
  },
};
</script>


