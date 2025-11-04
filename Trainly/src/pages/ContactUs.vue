<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <div class="max-w-6xl mx-auto mt-10">
      <!-- Header Section -->
      <div
        class="bg-linear-to-r from-green-200 to-green-100 dark:from-[#3B3B3B] dark:to-[#1E1E1E] rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between"
      >
        <div class="mb-6 md:mb-0">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {{ $t("contactus") }}
          </h1>
          <p class="text-black dark:text-white font-semibold mb-2">{{ $t("contactus1") }}</p>
          <p class="text-black dark:text-white font-medium text-sm max-w-md">
            {{ $t("contactus2") }}
          </p>
        </div>
        <img src="@/assets/images/contactus.png" alt="Contact Us" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 mb-16 items-start">
        <!-- Contact Form -->
        <div class="bg-white dark:bg-[#3B3B3B] rounded-[32px] shadow-md p-8 sm:p-12">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {{ $t("sendamessage") }}
          </h2>
          <p class="text-gray-400 text-sm mb-6">
            {{ $t("contactus3") }}
          </p>

          <form @submit.prevent="submitForm">
            <div class="mb-5">
              <label class="block text-gray-700 dark:text-white text-sm font-medium mb-2">{{
                $t("name")
              }}</label>
              <input
                type="text"
                v-model="formData.name"
                :placeholder="$t('contactus18')"
                required
                class="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 dark:bg-[#3B3B3B] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div class="mb-5">
              <label class="block text-gray-700 dark:text-white text-sm font-medium mb-2">{{
                $t("email")
              }}</label>
              <input
                type="email"
                required
                v-model="formData.email"
                :placeholder="$t('email')"
                class="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 dark:bg-[#3B3B3B] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 dark:text-white text-sm font-medium mb-2">{{
                $t("message")
              }}</label>
              <textarea
                v-model="formData.message"
                :placeholder="$t('contactus17')"
                rows="5"
                required
                class="w-full px-4 py-3 bg-gray-50 text-black border border-gray-200 dark:bg-[#3B3B3B] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 dark:placeholder-gray-400"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-green-500 hover:bg-green-600 text-black dark:text-white font-semibold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
            >
              {{ $t("sendmessage") }}
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6">
              {{ $t("ContactInformation") }}
            </h2>

            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-black rounded-full flex items-center justify-center mr-4 shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-white mb-1">{{ $t("EmailSupport") }}</p>
                  <p class="text-gray-800 dark:text-white font-medium">info@Trainly.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-black rounded-full flex items-center justify-center mr-4 shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-white mb-1">{{ $t("PhoneSupport") }}</p>
                  <p class="text-gray-800 dark:text-white font-medium" dir="ltr">
                    +1 (800) 123-4567
                  </p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-black rounded-full flex items-center justify-center mr-4 shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-blue-600 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-white mb-1">{{ $t("WorkingHours") }}</p>
                  <p class="text-gray-800 dark:text-white font-medium">{{ $t("contactus12") }}</p>
                  <p class="text-gray-600 dark:text-white text-sm">{{ $t("contactus13") }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Fast Response Card -->
          <div class="bg-green-50 dark:bg-[#3B3B3B] rounded-2xl p-6 border border-green-200">
            <div class="flex items-center mb-3">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <h3 class="font-bold text-gray-800 dark:text-white">{{ $t("contactus14") }}</h3>
            </div>
            <p class="text-gray-700 dark:text-white text-sm">
              {{ $t("contactus15") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-sm p-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          {{ $t("contactus16") }}
        </h2>

        <div class="flex flex-wrap justify-center gap-8 md:gap-12">
          <div v-for="member in teamMembers" :key="member.name" class="flex flex-col items-center">
            <div
              class="w-20 h-20 bg-gray-200 dark:bg-black rounded-full mb-3 overflow-hidden flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-gray-400 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p class="text-gray-800 dark:text-white font-medium text-sm text-center">
              {{ member.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      teamMembers: [
        { name: "Bassam Khaled" },
        { name: "Osama Eldeeb" },
        { name: "Ganna Ayman" },
        { name: "Arwa Rabie" },
        { name: "Maryam Hassan" },
      ],
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted:", this.formData);
      this.formData = {
        name: "",
        email: "",
        message: "",
      };
    },
  },
};
</script>

<style scoped></style>
