<template>
  <section class="max-w-5xl mx-auto flex flex-col gap-12">
    <div class="">
      <h2 class="text-[24px] font-medium dark:text-white text-gray-900">
        Settings
      </h2>
      <p class="mt-2 text-[16px] dark:text-gray-300 text-gray-500">
        Manage your account settings and preferences here.
      </p>
    </div>
    <!-- ========= Personal Info Section ========= -->
    <div
      class="w-full border border-gray-200 rounded-3xl shadow-xl dark:bg-[#3B3B3B] bg-white p-7"
    >
      <div class="flex items-center gap-3 mb-6">
        <div
          class="bg-[#D9EEFF] dark:bg-[#3B3B3B] w-10 h-10 rounded-lg flex items-center justify-center mr-2 mt-1"
        >
          <img src="../../assets/images/page-1.png" alt="" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-medium dark:text-white text-gray-900">
            Personal Information
          </h2>
          <p class="text-sm dark:text-gray-300 text-gray-500">
            Update your personal details
          </p>
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
          <span class="text-sm dark:text-white text-gray-500"
            >Upload your photo</span
          >
        </div>

        <!-- Inputs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >First Name</label
            >
            <input
              v-model="formData.firstName"
              type="text"
              class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >Last Name</label
            >
            <input
              v-model="formData.lastName"
              type="text"
              class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >Gender</label
            >
            <select
              v-model="formData.gender"
              class="mt-2 w-full rounded-xl border text-black dark:text-white dark:bg-[#3b3b3b] border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >City</label
            >
            <input
              v-model="formData.city"
              type="text"
              class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >Country</label
            >
            <input
              v-model="formData.country"
              type="text"
              class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium dark:text-white text-gray-900"
              >Birthday</label
            >
            <input
              v-model="formData.birthdate"
              type="date"
              class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none scheme-light dark:scheme-dark dark:bg-[#3B3B3B] bg-gray-50"
            />
          </div>
        </div>

        <!-- Experience -->
        <div>
          <label class="block text-sm font-medium dark:text-white text-gray-900"
            >Years of Experience</label
          >
          <input
            v-model="formData.experience"
            type="number"
            class="mt-2 w-full rounded-xl border text-black dark:text-white border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Upload Certificate -->
        <div>
          <h2 class="text-sm font-medium dark:text-white text-gray-900 mt-8">
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
                class="cursor-pointer inline-block bg-blue-500 dark:bg-[#3B3B3B] text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition text-sm"
              >
                Upload
              </label>
              <p class="text-xs dark:text-gray-300 text-gray-500 mt-2">
                PDF, PNG, JPG, JPEG up to 10MB
              </p>

              <!-- Certificate List with Remove Buttons -->
              <div
                v-if="formData.certifications && formData.certifications.length"
                class="mt-4 space-y-2"
              >
                <div
                  v-for="(cert, index) in formData.certifications"
                  :key="index"
                  class="flex items-center justify-between dark:bg-gray-300 bg-gray-50 p-3 rounded-lg"
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
      class="w-full border border-gray-200 rounded-3xl shadow-xl dark:bg-[#3B3B3B] bg-white p-7"
    >
      <div class="flex">
        <div
          class="bg-[#D9EEFF] dark:bg-[#3B3B3B] w-10 h-10 rounded-lg flex items-center justify-center mr-2 mt-1"
        >
          <img src="../../assets/images/security.png" alt="" class="w-5 h-5" />
        </div>

        <div>
          <h2 class="text-xl dark:text-white font-[500] mb-1">Security</h2>
          <p
            class="mb-6 font-[400] text-[13px] dark:text-gray-300 text-gray-500"
          >
            Manage your password and security settings
          </p>
        </div>
      </div>

      <form class="max-w-[95%] ps-[50px]" @submit.prevent="onSubmit">
        <!-- Current password -->
        <div class="mb-5">
          <label
            class="block mb-2 text-sm font-medium dark:text-white text-gray-900"
            >Current Password</label
          >
          <div class="relative">
            <input
              :type="showCurrent ? 'text' : 'password'"
              v-model="form.current"
              class="shadow-xs border border-gray-300 dark:text-white text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
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
          <label
            class="block mb-2 text-sm font-medium dark:text-white text-gray-900"
            >New Password</label
          >
          <div class="relative">
            <input
              :type="showNew ? 'text' : 'password'"
              v-model="form.new"
              class="shadow-xs border border-gray-300 dark:text-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
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
          <label
            class="block mb-2 text-sm font-medium dark:text-white text-gray-900"
            >Confirm Password</label
          >
          <div class="relative">
            <input
              :type="showRepeat ? 'text' : 'password'"
              v-model="form.repeat"
              class="shadow-xs border border-gray-300 text-black dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
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

    <!-- ========= Subscription Section ========= -->
    <div
      v-for="(sub, index) in subscriptions"
      :key="index"
      class="w-full border border-gray-200 rounded-3xl shadow-xl dark:bg-[#3B3B3B] bg-white p-8"
    >
      <!-- Header -->
      <div class="flex items-start mb-8">
        <div
          class="bg-[#D9EEFF] dark:bg-[#3B3B3B] w-11 h-11 rounded-xl flex items-center justify-center mr-3"
        >
          <img
            src="../../assets/images/stash_plan-duotone.png"
            alt="security icon"
            class="w-5 h-5"
          />
        </div>
        <div>
          <h2 class="text-xl font-[500] mb-1 dark:text-white text-gray-800">
            Subscription
          </h2>
          <p class="text-sm dark:text-gray-300 text-gray-500">
            Manage your current subscription and plan details here.
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-col md:flex-row justify-between gap-10">
        <!-- Left side: Plan details -->
        <div
          class="flex-1 bg-[#F9FAFB] dark:bg-[#3B3B3B] p-6 rounded-2xl border border-gray-100"
        >
          <h3 class="text-lg font-medium mb-3 dark:text-white text-gray-800">
            Current Plan: {{ sub.planType }}
          </h3>

          <ul class="space-y-3 text-gray-600 dark:text-gray-300 text-sm">
            <li>
              <span class="font-medium dark:text-gray-300 text-gray-800">
                ${{ sub.price }}/{{ sub.currency }}
              </span>
            </li>
            <li>
              Next renewal:
              <span class="font-medium dark:text-gray-300">
                {{ formatDate(sub.nextBillingDate) }}
              </span>
            </li>

            <ul class="space-y-2 text-gray-600 dark:text-gray-100 text-sm mt-4">
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
                {{ sub.planLimit }} plans/month
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
                Status: {{ sub.status }}
              </li>

              <!-- Replace the third green check with a conditional alert -->
              <li class="flex items-center gap-2">
                <!-- ✅ حالة الـ upgrade -->
                <template v-if="sub.planChangeScheduled && !sub.cancelNotice">
                  <div
                    class="flex items-start gap-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-md p-3 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-yellow-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01M5.22 19h13.56a2 2 0 001.73-3l-6.78-11.73a2 2 0 00-3.46 0L3.5 16a2 2 0 001.72 3z"
                      />
                    </svg>
                    <span class="text-yellow-700 text-sm font-medium">
                      Your plan will change to
                      <strong>{{ sub.nextPlan }}</strong> next month.
                    </span>
                  </div>
                </template>

                <!-- ⚠️ حالة الـ cancel -->
                <template v-else-if="sub.cancelNotice">
                  <div
                    class="flex items-start gap-2 bg-yellow-50 border-l-4 border-yellow-400 rounded-md p-3 w-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-yellow-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01M5.22 19h13.56a2 2 0 001.73-3l-6.78-11.73a2 2 0 00-3.46 0L3.5 16a2 2 0 001.72 3z"
                      />
                    </svg>
                    <span class="text-yellow-700 text-sm font-medium">
                      Your upcoming plan change has been canceled. It will
                      remain active until your current plan ends.
                    </span>
                  </div>
                </template>

                <!-- ✅ الحالة العادية -->
                <template v-else>
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
                  Trainer: {{ sub.trainerName }}
                </template>
              </li>
            </ul>
          </ul>
        </div>

        <!-- Right side: Buttons -->
        <div class="flex flex-col justify-center items-stretch gap-3 md:w-1/3">
          <!-- Upgrade -->
          <button
            @click="openPlanModal(sub)"
            class="text-white bg-[#00B0FF] hover:bg-[#36ace2] focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
          >
            Upgrade Plan
          </button>

          <!-- Cancel Subscription -->
          <button
            @click="cancelPlanChange(sub)"
            class="border border-red-500 text-red-500 hover:bg-red-50 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: Plan chooser -->
    
    <div 
      v-if="planModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        <button
          class="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
          @click="closePlanModal"
        >
          ✕
        </button>

        <h2 class="text-xl font-semibold mb-4">Upgrade to add more plans</h2>
        <p class="text-gray-500 mb-8">
          You have reached your current plan limit ({{
            activeSubscriptionForModal.planLimit || "—"
          }}
          plans). Choose a subscription to upgrade. The new plan will activate
          at your next billing date.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="plan in plans"
            :key="plan.type"
            class="border rounded-2xl p-6 transition shadow-sm"
            :class="{
              'bg-gray-100 opacity-80 cursor-not-allowed':
                plan.type === activeSubscriptionForModal.planType,
              'hover:shadow-md':
                plan.type !== activeSubscriptionForModal.planType,
            }"
          >
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-semibold text-gray-800">
                {{ plan.type }}
              </h3>
              <span class="text-gray-700 font-medium"
                >${{ plan.price }} / month</span
              >
            </div>

            <p class="text-gray-500 mb-4 text-sm">{{ plan.description }}</p>

            <ul class="text-gray-600 text-sm mb-4 space-y-1">
              <li>Up to {{ plan.limit }} plans</li>
              <li>Billed monthly</li>
            </ul>

            <button
              :disabled="plan.type === activeSubscriptionForModal.planType"
              @click="selectPlanForSubscription(plan)"
              class="w-full py-2 rounded-lg font-medium text-white transition"
              :class="
                plan.type === activeSubscriptionForModal.planType
                  ? 'bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              "
            >
              {{
                plan.type === activeSubscriptionForModal.planType
                  ? "Current Plan"
                  : `Select $${plan.price} / month`
              }}
            </button>
          </div>
        </div>

        <p class="text-xs text-gray-400 mt-6 text-center">
          After payment, your new plan will be activated on your next billing
          cycle.
        </p>
      </div>
    </div>

    <!-- MODAL: success confirmation -->
    <div
      v-if="planSelectedModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <div
        class="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center border border-gray-200"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          Plan Change Scheduled
        </h3>
        <p class="text-sm text-gray-500 mb-6">
          Your plan will switch to
          <span class="font-medium text-gray-800">{{ planSelectedName }}</span>
          on your next renewal date.
        </p>
        <button
          @click="closePlanSelectedModal"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          OK
        </button>
      </div>
    </div>

    <!-- MODAL: cancel confirmation -->
    <div
      v-if="cancelModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
    >
      <div
        class="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Confirm Cancellation
        </h3>
        <p class="text-sm text-gray-500 mb-6">
          Are you sure you want to cancel your subscription?
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="confirmCancel"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Yes, Cancel
          </button>
          <button
            @click="closeCancelModal"
            class="border border-gray-300 text-gray-600 hover:bg-gray-100 px-6 py-2 rounded-lg transition"
          >
            No, Keep it
          </button>
        </div>
      </div>
    </div>

    <!-- ========= Payment Section ========= -->
    <div
      class="w-full border border-gray-200 rounded-3xl shadow-xl dark:bg-[#3B3B3B] bg-white p-8"
    >
      <!-- Header -->
      <div class="flex items-start mb-8">
        <div
          class="bg-[#D9EEFF] dark:bg-[#3B3B3B] w-11 h-11 rounded-xl flex items-center justify-center mr-3"
        >
          <img
            src="../../assets/images/streamline-flex-color_subscription-cashflow-flat.png"
            alt="payment icon"
            class="w-5 h-5"
          />
        </div>
        <div>
          <h2 class="text-xl font-medium mb-1 dark:text-white text-gray-800">
            Payment Management
          </h2>
          <p class="text-sm dark:text-gray-300 text-gray-500">
            Manage your payment methods and track your total income.
          </p>
        </div>
      </div>

      <!-- Green Income Card -->
      <div
        class="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white p-4 rounded-2xl shadow-md mb-10"
      >
        <p class="text-sm opacity-90">Total Income</p>
        <h3 class="text-3xl font-semibold mt-1 mb-1">
          ${{ totalIncome.toFixed(2) }}
        </h3>
        <p class="text-sm opacity-90">
          This month:
          <span class="font-medium">+${{ monthlyIncome.toFixed(2) }}</span>
        </p>
      </div>

      <div class="flex flex-col md:flex-row justify-between gap-10">
        <!-- Payment Methods -->
        <div
          class="flex-1 bg-[#F9FAFB] dark:bg-[#3B3B3B] p-6 rounded-2xl border border-gray-100"
        >
          <h3 class="text-lg font-semibold mb-4 dark:text-white text-gray-800">
            Payment Methods
          </h3>

          <!-- Card Example -->
          <div
            class="flex items-center gap-4 bg-white dark:bg-[#242424] border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
          >
            <img src="../../assets/images/i.png" alt="card" class="w-8 h-8" />
            <div>
              <p class="font-medium dark:text-white text-gray-800">
                •••• •••• •••• 4242
              </p>
              <p class="text-sm dark:text-gray-300 text-gray-500">
                Expires 12/25
              </p>
            </div>
          </div>

          <!-- Withdraw Button -->
          <button
            @click="openWithdrawModal"
            class="border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-6 py-3 w-full transition"
          >
            Withdraw Earnings
          </button>
        </div>

        <!-- Recent Transactions -->
        <div
          class="flex-1 bg-[#F9FAFB] dark:bg-[#3B3B3B] p-6 rounded-2xl border border-gray-100"
        >
          <h3 class="text-lg font-semibold mb-4 dark:text-white text-gray-800">
            Recent Transactions
          </h3>

          <div
            v-if="getDisplayedTransactions().length"
            class="flex flex-col gap-4"
          >
            <div
              v-for="(t, i) in getDisplayedTransactions()"
              :key="i"
              class="flex justify-between items-center dark:bg-[#242424] bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
            >
              <div>
                <p class="font-medium dark:text-white text-gray-800">
                  {{ t.title }}
                </p>
                <p class="text-sm dark:text-gray-300 text-gray-500">
                  {{ t.date }}
                </p>
              </div>
              <p
                :class="t.amount > 0 ? 'text-green-600' : 'text-red-500'"
                class="font-semibold"
              >
                {{ t.amount > 0 ? "+" : "" }}${{ t.amount.toFixed(2) }}
              </p>
            </div>
          </div>

          <p
            v-else
            class="text-gray-500 dark:text-gray-400 text-sm text-center mt-4"
          >
            No recent transactions yet.
          </p>

          <!-- ✅ Show All Button -->
          <div class="text-center mt-4">
            <button
              v-if="recentTransactions.length > 3"
              @click="toggleShowAll"
              class="text-sm text-blue-600 hover:underline"
            >
              {{ showAllTransactions ? "Show Less" : "Show All" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Withdraw Modal -->
      <div
        v-if="withdrawModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50"
        style="
          background-color: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(6px);
        "
      >
        <div
          class="bg-white dark:bg-[#242424] p-6 rounded-2xl shadow-lg w-80 text-center border border-gray-200"
        >
          <h3 class="text-lg font-semibold mb-3 dark:text-white text-gray-900">
            Withdrawal Requested
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Your earnings will be transferred to your account within 24 hours.
          </p>
          <button
            @click="withdrawModalOpen = false"
            class="bg-[#2e72f0] text-white px-6 py-2 rounded-lg hover:bg-[#7994ec] transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db, storage } from "@/Firebase/firebaseConfig.js";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
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
      // ===============================
      // 🧠 General Data
      // ===============================
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
        totalIncome: 0,
        monthlyIncome: 0,
        recentTransactions: [],
      },
      newProfilePhoto: null,
      newCertificate: null,

      // ===============================
      // 🔐 Password Section
      // ===============================
      form: { current: "", new: "", repeat: "" },
      showCurrent: false,
      showNew: false,
      showRepeat: false,

      // ========= Subscription Data =========
      subscriptions: [],
      plans: [],
      planModalOpen: false,
      planSelectedModalOpen: false,
      cancelModalOpen: false,

      // ========= Payment Data =========
      totalIncome: 0,
      monthlyIncome: 0,
      recentTransactions: [],
      showAllTransactions: false,

      // ✅ Fix: use unique variable name for withdraw modal
      withdrawModalOpen: false,

      // ========= Misc =========
      activeSubscriptionForModal: {},
      planSelectedName: "",
    };
  },

  // ===============================
  // ⚙️ Mounted Lifecycle
  // ===============================
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.userId = user.uid;
      await this.fetchTrainerData();
      await this.fetchSubscriptions();
      await this.fetchPaymentData(); // ✅ load payment info

      // check for saved plan change or cancel notice
      const stored = this.checkStoredPlanChange();
      if (stored) {
        this.subscriptions.forEach((sub) => {
          sub.planChangeScheduled = true;
          sub.nextPlan = stored;
        });
      }

      const cancelNotice = localStorage.getItem("canceledPlanNotice");
      if (cancelNotice) {
        const parsed = JSON.parse(cancelNotice);
        const now = new Date();
        if (new Date(parsed.expiresAt) > now) {
          this.subscriptions.forEach((sub) => (sub.cancelNotice = true));
        } else {
          localStorage.removeItem("canceledPlanNotice");
        }
      }
    } else {
      alert("No user found. Please log in again.");
      this.$router.push("/login");
    }
  },

  methods: {
    // ===============================
    // 👤 Fetch Trainer Data
    // ===============================
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

    // ===============================
    // 🧾 Fetch Subscriptions
    // ===============================
    async fetchSubscriptions() {
      try {
        const querySnapshot = await getDocs(collection(db, "subscriptions"));
        const allSubs = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        this.subscriptions = allSubs.filter(
          (s) => s.trainerUid === this.userId
        );
      } catch (error) {
        console.error("Error loading subscriptions:", error);
      }
    },

    // ===============================
    // 💰 Fetch Payment Data
    // ===============================
    async fetchPaymentData() {
      try {
        if (!this.userId) return;

        let totalIncome = 0;
        let monthlyIncome = 0;
        const transactions = [];

        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // ✅ Trainer income from Bookings
        const bookingsSnapshot = await getDocs(collection(db, "bookings"));
        bookingsSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.trainerId === this.userId) {
            const amount = Number(data.amount || 0);
            totalIncome += amount;
            if (data.createdAt?.toDate() > monthStart) {
              monthlyIncome += amount;
            }
            transactions.push({
              title: "Trainee Subscription",
              date: this.formatDate(data.createdAt),
              amount: amount,
              type: "income",
            });
          }
        });

        // 🔴 Platform fees from Subscriptions
        const subsSnapshot = await getDocs(collection(db, "subscriptions"));
        subsSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.trainerUid === this.userId) {
            const platformFee = Number(data.price || 0);
            totalIncome -= platformFee; // خصم النسبة من الإجمالي
            transactions.push({
              title: "Platform Fee",
              date: this.formatDate(data.createdAt),
              amount: -platformFee,
              type: "expense",
            });
          }
        });

        this.totalIncome = totalIncome;
        this.monthlyIncome = monthlyIncome;
        this.recentTransactions = transactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    },

    // ===============================
    // 💸 Withdraw Modal (✅ مُعدّل)
    // ===============================
    openWithdrawModal() {
      this.withdrawModalOpen = true;
    },
    closeWithdrawModal() {
      this.withdrawModalOpen = false;
    },

    // ===============================
    // 🕓 Utility: Date Formatting
    // ===============================
    formatDate(timestamp) {
      try {
        if (!timestamp) return "";
        if (timestamp && typeof timestamp.toDate === "function") {
          const date = timestamp.toDate();
          return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
        const d = new Date(timestamp);
        if (!isNaN(d)) {
          return d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
        return "";
      } catch {
        return "";
      }
    },

    // ✅ جديد: عرض آخر 3 فقط + زر "Show All"
    getDisplayedTransactions() {
      if (this.showAllTransactions) {
        return this.recentTransactions;
      }
      return this.recentTransactions.slice(0, 3);
    },
    toggleShowAll() {
      this.showAllTransactions = !this.showAllTransactions;
    },

    // باقي الأكواد القديمة تحت هنا بدون أي تعديل
    async uploadFile(file, type) {
      if (!file) return null;
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpg",
        "image/jpeg",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, PNG, JPG, and JPEG files are allowed.");
        return null;
      }
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

    async removeCertificate(index) {
      try {
        if (!this.userId || !this.formData.certifications) return;
        this.formData.certifications.splice(index, 1);
        const userRef = doc(db, "users", this.userId);
        await updateDoc(userRef, {
          certifications: this.formData.certifications,
        });
      } catch (error) {
        console.error("Error removing certificate:", error);
        alert("Failed to remove certificate.");
      }
    },

    async updateTrainer() {
      try {
        if (!this.userId) {
          alert("No user found!");
          return;
        }
        const updateData = {};
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
        Object.assign(updateData, this.formData);
        const docRef = doc(db, "users", this.userId);
        await updateDoc(docRef, updateData);
        this.newProfilePhoto = null;
        this.newCertificate = null;
        this.showSuccessModal();
      } catch (error) {
        console.error("Error updating trainer data:", error);
        alert("An error occurred. Please try again.");
      }
    },

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
      document
        .getElementById("closeSuccessModal")
        .addEventListener("click", () => modal.remove());
    },

    // 🗑️ Delete Account
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

    // ===============================
    // 🛠️ Miscellaneous (Passwords, Plans)
    // ===============================
    toggle(field) {
      if (field === "current") this.showCurrent = !this.showCurrent;
      else if (field === "new") this.showNew = !this.showNew;
      else if (field === "repeat") this.showRepeat = !this.showRepeat;
    },

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

    openPlanModal(sub) {
      this.activeSubscriptionForModal = sub || {};
      this.planModalOpen = true;
    },
    closePlanModal() {
      this.planModalOpen = false;
      this.activeSubscriptionForModal = {};
    },
    selectPlanForSubscription(plan) {
      this.planSelectedName = plan.type;
      this.planModalOpen = false;
      this.planSelectedModalOpen = true;
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      const scheduledChange = {
        planName: plan.type,
        expiresAt: expiry.toISOString(),
      };
      localStorage.setItem(
        "scheduledPlanChange",
        JSON.stringify(scheduledChange)
      );
      this.activeSubscriptionForModal.planChangeScheduled = true;
      this.activeSubscriptionForModal.nextPlan = plan.type;
    },
    closePlanSelectedModal() {
      this.planSelectedModalOpen = false;
      this.planSelectedName = null;
    },
    checkStoredPlanChange() {
      const data = localStorage.getItem("scheduledPlanChange");
      if (!data) return null;
      const parsed = JSON.parse(data);
      const now = new Date();
      if (new Date(parsed.expiresAt) < now) {
        localStorage.removeItem("scheduledPlanChange");
        return null;
      }
      return parsed.planName;
    },
    cancelPlanChange() {
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
        Cancel scheduled plan change?
      </h2>
      <p class="text-gray-500 mb-6 text-sm">
        Are you sure you want to cancel your upcoming plan change?
      </p>
      <div class="flex justify-center gap-4">
        <button id="confirmCancelPlan" class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
          Yes, Cancel
        </button>
        <button id="closeCancelModal" class="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
          Keep Plan
        </button>
      </div>
    </div>
  `;
      document.body.appendChild(modal);
      const confirmBtn = document.getElementById("confirmCancelPlan");
      const closeBtn = document.getElementById("closeCancelModal");
      closeBtn.addEventListener("click", () => modal.remove());
      confirmBtn.addEventListener("click", () => {
        localStorage.removeItem("scheduledPlanChange");
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);
        const cancelNotice = {
          canceled: true,
          expiresAt: expiry.toISOString(),
        };
        localStorage.setItem(
          "canceledPlanNotice",
          JSON.stringify(cancelNotice)
        );
        this.subscriptions.forEach((sub) => {
          sub.planChangeScheduled = false;
          sub.nextPlan = null;
          sub.cancelNotice = true;
        });
        modal.remove();
      });
    },
  },
};
</script>


<style scoped>
/* small fade effect could be added if needed */
</style>

