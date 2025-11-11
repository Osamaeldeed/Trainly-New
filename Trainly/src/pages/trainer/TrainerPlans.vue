<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white dark:bg-[#3B3B3B] shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8 mb-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">My Plans</h1>
            <p class="text-gray-500 dark:text-gray-200 mt-1 text-sm sm:text-base">
              Easily manage, edit, and organize all your training plans in one place
            </p>
          </div>
          <button
            @click="showCreateModal = true"
            class="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
          >
            <span class="text-xl">+</span>
            <span class="hidden sm:inline cursor-pointer">Create New Plan</span>
            <span class="sm:hidden">New Plan</span>
          </button>
        </div>

        <!-- Search & Filter -->
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <div class="relative flex-1">
            <span
              class="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-white text-gray-400"
              >🔍</span
            >
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Plans.."
              class="w-full pl-12 pr-4 py-3 border dark:text-white border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            v-model="filterStatus"
            class="px-4 sm:px-6 py-3 border dark:text-white border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#3B3B3B] cursor-pointer"
          >
            <option value="All">All Plans</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <!-- Table Section - Desktop -->
      <div class="bg-white dark:bg-[#3B3B3B] shadow-sm rounded-2xl overflow-hidden hidden md:block">
        <table class="w-full">
          <thead class="bg-blue-50 dark:bg-[#3B3B3B] border-b-2 border-blue-100">
            <tr>
              <th class="text-left p-5 font-semibold dark:text-white text-gray-700">Plan Title</th>
              <th class="text-left p-5 font-semibold dark:text-white text-gray-700">Duration</th>
              <th class="text-left p-5 font-semibold dark:text-white text-gray-700">Clients</th>
              <th class="text-left p-5 font-semibold dark:text-white text-gray-700">Status</th>
              <th class="text-left p-5 font-semibold dark:text-white text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredPlans.length === 0">
              <td colspan="5" class="text-center p-12 text-gray-400 text-lg">No plans found</td>
            </tr>
            <tr
              v-for="plan in filteredPlans"
              :key="plan.id"
              class="border-b border-gray-100 hover:bg-gray-50 hover:dark:bg-gray-500 transition-colors"
            >
              <td class="p-5">
                <div class="flex items-center gap-3">
                  <div class="bg-blue-100 dark:bg-[#3B3B3B] p-2 rounded-lg">
                    <span class="text-blue-600 text-xl">📋</span>
                  </div>
                  <span class="font-medium dark:text-gray-200 text-gray-800">{{ plan.title }}</span>
                </div>
              </td>
              <td class="p-5 dark:text-gray-300 text-gray-600">{{ plan.duration }}</td>
              <td class="p-5 dark:text-gray-300 text-gray-600">{{ plan.clientsCount || 0 }}</td>
              <td class="p-5">
                <span
                  :class="
                    plan.status === 'Active'
                      ? 'text-green-600 bg-green-50'
                      : 'text-red-600 bg-red-50'
                  "
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ plan.status }}
                </span>
              </td>
              <td class="p-5">
                <button
                  @click="openManageModal(plan)"
                  class="bg-blue-600 dark:bg-black text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                >
                  Manage Plans
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards Section - Mobile & Tablet -->
      <div class="md:hidden space-y-4">
        <div
          v-if="filteredPlans.length === 0"
          class="bg-white shadow-sm rounded-2xl p-8 text-center text-gray-400"
        >
          No plans found
        </div>
        <div
          v-for="plan in filteredPlans"
          :key="plan.id"
          class="bg-white dark:bg-[#3B3B3B] shadow-sm rounded-2xl p-4 sm:p-6 hover:shadow-md hover:dark:bg-gray-200 transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3 flex-1">
              <div class="bg-blue-100 dark:bg-[#3B3B3B] p-2 rounded-lg">
                <span class="text-blue-600 text-xl">📋</span>
              </div>
              <span class="font-medium text-gray-800 text-lg">{{ plan.title }}</span>
            </div>
            <span
              :class="
                plan.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              "
              class="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
            >
              {{ plan.status }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div>
              <span class="text-gray-500">Duration:</span>
              <span class="text-gray-800 font-medium ml-1">{{ plan.duration }}</span>
            </div>
            <div>
              <span class="text-gray-500">Clients:</span>
              <span class="text-gray-800 font-medium ml-1">{{ plan.clientsCount || 0 }}</span>
            </div>
          </div>
          <button
            @click="openManageModal(plan)"
            class="w-full bg-blue-600 dark:bg-[#3B3B3B] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Manage Plans
          </button>
        </div>
      </div>
    </div>

    <!-- ================= Upgrade Modal (shown when over free limit) ================= -->
    <div v-if="showUpgradeModal" class="fixed inset-0 z-60 flex items-center justify-center">
      <!-- blur background -->
      <div class="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

      <div
        class="relative bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-3xl p-6 z-10"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-bold">Upgrade to add more plans</h3>
            <p class="text-sm text-gray-600 mt-1">
              You have reached the free plan limit (1 plan). Choose a subscription to create more
              plans.
            </p>
          </div>
          <button @click="closeUpgradeModal" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="opt in subscriptionOptions"
            :key="opt.id"
            class="border rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition"
            :class="{
              'ring-2 ring-blue-200': selectedSubscription && selectedSubscription.id === opt.id,
            }"
            @click="selectedSubscription = opt"
          >
            <div>
              <div class="flex items-center justify-between">
                <div class="text-lg font-semibold">{{ opt.title }}</div>
                <div class="text-sm text-gray-500">{{ opt.priceLabel }}</div>
              </div>
              <p class="mt-3 text-sm text-gray-600">{{ opt.description }}</p>

              <ul class="mt-4 text-sm space-y-1 text-gray-700">
                <li>
                  • Up to <span class="font-semibold">{{ opt.planLimit }}</span> plans
                </li>
                <li>• Billed monthly</li>
                <li v-if="opt.extra" class="text-gray-600">• {{ opt.extra }}</li>
              </ul>
            </div>

            <div class="mt-5">
              <button
                @click.stop="startSubscriptionCheckout(opt)"
                class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Subscribe - {{ opt.priceLabel }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 text-xs text-gray-500">
          After payment you'll be returned to your Plans page and your account will be updated.
        </div>
      </div>
    </div>

    <!-- ================= Create Plan Modal with AI ================= -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="() => (showCreateModal = false)"
    >
      <div
        class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-2xl animate-fadeIn max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex justify-between items-center dark:bg-[#3B3B3B] p-4 sm:p-6 border-b sticky top-0 bg-white z-10"
        >
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 dark:bg-[#3B3B3B] p-2 rounded-lg">
              <span class="text-blue-600 text-xl">📋</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold dark:text-white text-gray-800 cursor-pointer">
              Create a New Plan
            </h2>
          </div>
          <button
            @click="showCreateModal = false"
            class="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Title of The Plan</label
              >
              <input
                v-model="newPlan.title"
                type="text"
                placeholder="Enter the plan name"
                class="w-full px-4 py-2 border text-dark dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Status</label
              >
              <select
                v-model="newPlan.status"
                class="w-full px-4 py-2 border dark:bg-[#3b3b3b] text-dark dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Number of Sessions</label
              >
              <input
                v-model.number="newPlan.sessions"
                type="number"
                placeholder="24"
                class="w-full px-4 py-2 border border-gray-400 text-dark dark:bg-[#3b3b3b] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>
            <div>
              <label
                class="block text-sm font-medium dark:bg-[#3b3b3b] dark:text-white text-gray-600 mb-2"
                >Duration</label
              >
              <select
                v-model="newPlan.duration"
                class="w-full px-4 py-2 border border-gray-400 text-dark dark:bg-[#3b3b3b] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="" disabled>Select duration</option>
                <option value="3 weeks">3 weeks</option>
                <option value="6 weeks">6 weeks</option>
                <option value="8 weeks">8 weeks</option>
                <option value="12 weeks">12 weeks</option>
                <option value="20 weeks">20 weeks</option>
                <option value="30 weeks">30 weeks</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Price</label
              >
              <input
                v-model.number="newPlan.price"
                type="number"
                placeholder="$ 100"
                class="w-full px-4 py-2 border border-gray-300 text-dark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
              >Location</label
            >
            <div class="flex gap-2">
              <input
                v-model="newPlan.location"
                type="text"
                placeholder="Google Maps Link"
                class="flex-1 px-4 py-2 border border-gray-300 text-dark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onclick="window.open('https://www.google.com/maps?q=My+Location', '_blank')"
                class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                📍
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
              >Plan Description</label
            >
            <textarea
              v-model="newPlan.description"
              rows="3"
              placeholder="Enter a detailed description of the plan..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs dark:text-gray-300 text-gray-500 mt-1">
              This will be visible to trainees
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
              >Plan Image</label
            >
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <label class="flex-1 cursor-pointer">
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors text-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleImageSelect"
                      class="hidden"
                    />
                    <div class="flex flex-col items-center gap-2">
                      <span class="text-3xl">📸</span>
                      <span class="text-sm dark:text-gray-300 text-gray-600"
                        >Click to upload image</span
                      >
                      <span class="text-xs dark:text-gray-200 text-gray-400">Max size: 5MB</span>
                    </div>
                  </div>
                </label>
              </div>

              <div v-if="imagePreviewUrl" class="relative">
                <img
                  :src="imagePreviewUrl"
                  alt="Preview"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  @click="
                    selectedImageFile = null;
                    imagePreviewUrl = null;
                  "
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  type="button"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-xs dark:text-gray-300 text-gray-500 mt-1">
              This will be visible to trainees
            </p>
          </div>

          <!-- 🆕 AI Welcome Message Section -->
          <div class="border-t pt-4 mt-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🤖</span>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    AI Welcome Message Generator
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-300">
                    Generate a personalized welcome message for new trainees
                  </p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="useAIWelcome"
                  @change="toggleAIWelcome"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>

            <div v-if="useAIWelcome" class="space-y-4 animate-fadeIn">
              <div class="bg-blue-50 dark:bg-[#797979] border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800">
                  <strong>📝 Instructions:</strong> Fill in the training schedule below. The AI will
                  generate a professional welcome message that will be automatically sent to
                  trainees when they subscribe to this plan.
                </p>
              </div>

              <!-- Training Schedule Table -->
              <div v-if="trainingWeeks.length > 0" class="space-y-3">
                <h4 class="font-semibold text-gray-700 dark:text-white">
                  Training Schedule ({{ trainingWeeks.length }} weeks)
                </h4>

                <div class="space-y-3 max-h-96 overflow-y-auto">
                  <div
                    v-for="(week, index) in trainingWeeks"
                    :key="index"
                    class="bg-gray-50 dark:bg-[#3B3B3B] border border-gray-200 rounded-lg p-4"
                  >
                    <h5 class="font-medium text-gray-800 dark:text-white mb-3">
                      Week {{ week.weekNumber }}
                    </h5>
                    <div class="grid grid-cols-1 gap-3">
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                          >Sessions per week</label
                        >
                        <input
                          v-model="week.sessions"
                          type="text"
                          placeholder="e.g., 3 sessions"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                          >Exercises/Focus</label
                        >
                        <input
                          v-model="week.exercises"
                          type="text"
                          placeholder="e.g., Upper body strength, Cardio"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                          >Notes (optional)</label
                        >
                        <input
                          v-model="week.notes"
                          type="text"
                          placeholder="e.g., Focus on form, Rest day on Sunday"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  @click="generateAIMessage"
                  :disabled="generatingAI"
                  class="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <span v-if="generatingAI" class="animate-spin">⚙️</span>
                  <span v-else>✨</span>
                  <span>{{ generatingAI ? "Generating..." : "Generate AI Welcome Message" }}</span>
                </button>
              </div>

              <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p class="text-sm text-yellow-800">
                  ⚠️ Please select a duration first to generate the training schedule.
                </p>
              </div>

              <!-- AI Message Preview -->
              <div v-if="showAIPreview && aiGeneratedMessage" class="space-y-3 animate-fadeIn">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-gray-700 dark:text-white">
                    Generated Message Preview
                  </h4>
                  <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded"
                    >✓ Generated</span
                  >
                </div>
                <div
                  class="bg-white dark:bg-[#3B3B3B] border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto"
                >
                  <textarea
                    v-model="aiGeneratedMessage"
                    rows="10"
                    class="w-full text-sm text-gray-700 dark:text-white focus:outline-none resize-none"
                    placeholder="AI generated message will appear here..."
                  ></textarea>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-300">
                  💡 You can edit the message above before creating the plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t bg-gray-50 dark:bg-[#3B3B3B] sticky bottom-0"
        >
          <button
            @click="
              showCreateModal = false;
              selectedImageFile = null;
              imagePreviewUrl = null;
              useAIWelcome = false;
              trainingWeeks = [];
              aiGeneratedMessage = '';
              showAIPreview = false;
            "
            class="w-full sm:w-auto bg-white px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-400 transition-colors text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="attemptCreatePlan"
            :disabled="uploadingImage || generatingAI"
            class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ uploadingImage ? "Uploading..." : generatingAI ? "Generating..." : "Create Plan" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Manage Plan Modal (UPDATED WITH AI SECTION) -->
    <div
      v-if="showManageModal"
      class="fixed inset-0 bg-white dark:bg-[#010101] bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showManageModal = false"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-fadeIn max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex justify-between items-center dark:bg-[#3B3B3B] p-4 sm:p-6 border-b sticky top-0 bg-white z-10"
        >
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 dark:bg-[#3B3B3B] p-2 rounded-lg">
              <span class="text-blue-600 dark:text-white text-xl">📋</span>
            </div>
            <h2 class="text-lg sm:text-xl dark:text-white font-bold text-gray-800">Plan Details</h2>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 dark:bg-[#3B3B3B] space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-1">
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Title of The Plan</label
              >
              <input
                v-model="selectedPlan.title"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Active Clients</label
              >
              <input
                :value="selectedPlan.clientsCount || 0"
                type="text"
                disabled
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:text-white dark:bg-[#3B3B3B] bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Status</label
              >
              <select
                v-model="selectedPlan.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-[#3b3b3b] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Number of Sessions</label
              >
              <input
                v-model.number="selectedPlan.sessions"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Duration</label
              >
              <select
                v-model="selectedPlan.duration"
                @change="onManageDurationChange"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-[#3b3b3b] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="3 weeks">3 weeks</option>
                <option value="6 weeks">6 weeks</option>
                <option value="8 weeks">8 weeks</option>
                <option value="12 weeks">12 weeks</option>
                <option value="20 weeks">20 weeks</option>
                <option value="30 weeks">30 weeks</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
                >Price</label
              >
              <input
                v-model.number="selectedPlan.price"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
              >Location</label
            >
            <input
              v-model="selectedPlan.location"
              type="text"
              placeholder="Description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Description Field -->
          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
              >Plan Description</label
            >
            <textarea
              v-model="selectedPlan.description"
              rows="3"
              placeholder="Enter a detailed description of the plan..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2"
              >Plan Image</label
            >
            <div class="space-y-3">
              <!-- Current Image Preview -->
              <div v-if="selectedPlan.image && !imagePreviewUrl" class="relative">
                <img
                  :src="selectedPlan.image"
                  alt="Current plan image"
                  class="w-full h-48 object-cover rounded-lg dark:text-white border border-gray-200"
                />
                <div
                  class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded"
                >
                  Current Image
                </div>
              </div>

              <!-- Upload New Image -->
              <div class="flex items-center gap-3">
                <label class="flex-1 cursor-pointer">
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-lg dark:text-white p-4 hover:border-blue-500 transition-colors text-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleImageSelect"
                      class="hidden"
                    />
                    <div class="flex flex-col items-center gap-2">
                      <span class="text-3xl">📸</span>
                      <span class="text-sm dark:text-gray-200 text-gray-600">
                        {{ selectedPlan.image ? "Change image" : "Upload image" }}
                      </span>
                      <span class="text-xs dark:text-gray-300 text-gray-400">Max size: 5MB</span>
                    </div>
                  </div>
                </label>
              </div>

              <!-- New Image Preview -->
              <div v-if="imagePreviewUrl" class="relative">
                <img
                  :src="imagePreviewUrl"
                  alt="New preview"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  @click="
                    selectedImageFile = null;
                    imagePreviewUrl = null;
                  "
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  type="button"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  New Image
                </div>
              </div>
            </div>
          </div>

          <!-- ================= Manage AI Section (IMPROVED) ================= -->
          <div class="border-t pt-4 mt-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🤖</span>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    AI Welcome Message
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-300">
                    Generate a personalized welcome message for trainees
                  </p>
                </div>
              </div>

              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="manageUseAI" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>

            <div v-if="manageUseAI" class="space-y-4 animate-fadeIn">
              <div class="bg-blue-50 dark:bg-[#797979] border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800 dark:text-white">
                  <strong>📝 Instructions:</strong> Review or update the training schedule below.
                  You can regenerate the AI message or edit it directly.
                </p>
              </div>

              <!-- Training Schedule Table (SAME AS CREATE PLAN) -->
              <div v-if="manageTrainingWeeks.length > 0" class="space-y-3">
                <h4 class="font-semibold text-gray-700 dark:text-white">
                  Training Schedule ({{ manageTrainingWeeks.length }} weeks)
                </h4>

                <div class="space-y-3 max-h-96 overflow-y-auto">
                  <div
                    v-for="(week, index) in manageTrainingWeeks"
                    :key="index"
                    class="bg-gray-50 dark:bg-[#3B3B3B] border border-gray-200 rounded-lg p-4"
                  >
                    <h5 class="font-medium text-gray-800 dark:text-white mb-3">
                      Week {{ week.weekNumber }}
                    </h5>
                    <div class="grid grid-cols-1 gap-3">
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                        >
                          Sessions per week
                        </label>
                        <input
                          v-model="week.sessions"
                          type="text"
                          placeholder="e.g., 3 sessions"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:text-white dark:bg-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                        >
                          Exercises/Focus
                        </label>
                        <input
                          v-model="week.exercises"
                          type="text"
                          placeholder="e.g., Upper body strength, Cardio"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:text-white dark:bg-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                        >
                          Notes (optional)
                        </label>
                        <input
                          v-model="week.notes"
                          type="text"
                          placeholder="e.g., Focus on form, Rest day on Sunday"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:text-white dark:bg-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Generate & Save Buttons -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    @click="generateManageAIMessage"
                    :disabled="manageGeneratingAI"
                    class="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    <span v-if="manageGeneratingAI" class="animate-spin">⚙️</span>
                    <span v-else>✨</span>
                    <span>{{
                      manageGeneratingAI ? "Generating..." : "Regenerate AI Message"
                    }}</span>
                  </button>

                  <button
                    @click="saveAiToPlan"
                    :disabled="!manageAiGeneratedMessage || manageSavingAI"
                    class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    <span v-if="manageSavingAI" class="animate-spin">⚙️</span>
                    <span v-else>💾</span>
                    <span>{{ manageSavingAI ? "Saving..." : "Save AI Message" }}</span>
                  </button>
                </div>
              </div>

              <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p class="text-sm text-yellow-800">
                  ⚠️ No training schedule available. Please select a duration first.
                </p>
              </div>

              <!-- AI Message Preview (SAME AS CREATE PLAN) -->
              <div
                v-if="manageAIPreview && manageAiGeneratedMessage"
                class="space-y-3 animate-fadeIn"
              >
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-gray-700 dark:text-white">
                    Generated Message Preview
                  </h4>
                  <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    ✓ Last saved:
                    {{
                      selectedPlan.aiGeneratedAt
                        ? formatRelativeDate(selectedPlan.aiGeneratedAt)
                        : "Never"
                    }}
                  </span>
                </div>
                <div
                  class="bg-white dark:bg-[#3B3B3B] border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto"
                >
                  <textarea
                    v-model="manageAiGeneratedMessage"
                    rows="10"
                    class="w-full text-sm text-gray-700 dark:text-white focus:outline-none resize-none bg-transparent"
                    placeholder="AI generated message will appear here..."
                  ></textarea>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-300">
                  💡 You can edit the message above before saving.
                </p>
              </div>
            </div>

            <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p class="text-sm text-yellow-800">
                ⚠️ AI is disabled for this plan. Toggle the switch above to enable AI features.
              </p>
            </div>
          </div>
          <!-- ================= end manage ai ================= -->
          <!-- ================= end manage ai ================= -->
        </div>

        <!-- Modal Footer -->
        <div
          class="flex flex-col sm:flex-row justify-between gap-3 p-4 dark:bg-[#3b3b3b] sm:p-6 border-t bg-gray-50 sticky bottom-0"
        >
          <button
            @click="confirmDelete"
            class="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors order-2 sm:order-1 cursor-pointer"
          >
            Delete Plan
          </button>
          <div class="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <button
              @click="
                showManageModal = false;
                selectedImageFile = null;
                imagePreviewUrl = null;
              "
              class="w-full sm:w-auto px-6 py-2 border dark:bg-white border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              @click="updatePlan"
              :disabled="uploadingImage"
              class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ uploadingImage ? "Uploading..." : "Save Changes" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-white dark:bg-[#3B3B3B] bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showDeleteModal = false"
    >
      <div
        class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn text-center p-6 sm:p-8"
      >
        <div class="flex justify-center mb-4">
          <div class="bg-red-100 p-3 sm:p-4 rounded-full">
            <span class="text-red-600 text-3xl sm:text-4xl">🗑️</span>
          </div>
        </div>
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          Are you sure you want to delete this plan?
        </h2>
        <p class="text-sm sm:text-base text-gray-500 mb-6">This action cannot be undone.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            @click="showDeleteModal = false"
            class="w-full sm:w-auto px-6 sm:px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="deletePlan"
            class="w-full sm:w-auto px-6 sm:px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-white dark:bg-[#3B3B3B] bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn text-center p-6 sm:p-8"
      >
        <div class="flex justify-center mb-4">
          <div class="bg-green-100 p-3 sm:p-4 rounded-full">
            <span class="text-green-600 text-4xl sm:text-5xl">✓</span>
          </div>
        </div>
        <h2 class="text-lg sm:text-xl font-bold text-gray-800">{{ successMessage }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  deleteField,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "vue3-toastify";

export default {
  name: "TrainerPlans",
  setup() {
    // ----- CONFIG: ضع هنا عنوان السيرفر بتاعك -----
    const API_URL = import.meta.env.VITE_BACKEND_URL || "https://magnificent-optimism-production-4cdd.up.railway.app";
    // --------------------------------------------

    const db = getFirestore();
    const auth = getAuth();
    const storage = getStorage();
    const trainerUid = ref(null);

    const plans = ref([]);
    const showCreateModal = ref(false);
    const showManageModal = ref(false);
    const showDeleteModal = ref(false);
    const showSuccessModal = ref(false);
    const successMessage = ref("");
    const searchQuery = ref("");
    const filterStatus = ref("All");
    const selectedPlan = ref({});
    const uploadingImage = ref(false);
    const selectedImageFile = ref(null);
    const imagePreviewUrl = ref(null);

    const newPlan = ref({
      title: "",
      status: "Active",
      location: "",
      sessions: 0,
      duration: "",
      price: 0,
      description: "",
      image: null,
    });

    // AI Welcome Message Feature (Create)
    const useAIWelcome = ref(false);
    const trainingWeeks = ref([]);
    const generatingAI = ref(false);
    const aiGeneratedMessage = ref("");
    const showAIPreview = ref(false);

    // Manage-specific AI state
    const manageUseAI = ref(false);
    const manageTrainingWeeks = ref([]);
    const manageGeneratingAI = ref(false);
    const manageAiGeneratedMessage = ref("");
    const manageAIPreview = ref(false);
    const manageSavingAI = ref(false);

    // Upgrade modal state
    const showUpgradeModal = ref(false);
    const subscriptionOptions = ref([
      {
        id: "sub_basic_10",
        title: "Starter",
        price: 100,
        priceLabel: "$100 / month",
        planLimit: 3,
        description: "Ideal for trainers starting out - up to 3 plans.",
        priceId: "PRICE_ID_3_PLANS",
      },
      {
        id: "sub_pro_30",
        title: "Pro",
        price: 150,
        priceLabel: "$150 / month",
        planLimit: 6,
        description: "For growing trainers - up to 6 plans.",
        priceId: "PRICE_ID_6_PLANS",
      },
    ]);
    const selectedSubscription = ref(null);

    let bookingsUnsubscribe = null;

    // Watch duration changes to auto-generate weeks structure (Create)
    watch(
      () => newPlan.value.duration,
      (newDuration) => {
        if (!newDuration || !useAIWelcome.value) return;

        const weeksMatch = newDuration.match(/(\d+)\s*week/i);
        if (weeksMatch) {
          const numWeeks = parseInt(weeksMatch[1]);
          trainingWeeks.value = Array.from({ length: numWeeks }, (_, i) => ({
            weekNumber: i + 1,
            sessions: "",
            exercises: "",
            notes: "",
          }));
        }
      },
    );

    const fetchPlans = async () => {
      if (!trainerUid.value) return;
      const plansRef = collection(db, "plans");
      const q = query(plansRef, where("trainer_uid", "==", trainerUid.value));
      const snapshot = await getDocs(q);
      plans.value = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    };

    const handleImageSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file", { position: "top-center", autoClose: 2000 });
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size should be less than 5MB", {
            position: "top-center",
            autoClose: 2000,
          });
          return;
        }
        selectedImageFile.value = file;
        imagePreviewUrl.value = URL.createObjectURL(file);
      }
    };

    const uploadPlanImage = async () => {
      if (!selectedImageFile.value) return null;

      uploadingImage.value = true;
      try {
        const timestamp = Date.now();
        const fileName = `plans/${trainerUid.value}/${timestamp}_${selectedImageFile.value.name}`;
        const imageRef = storageRef(storage, fileName);

        await uploadBytes(imageRef, selectedImageFile.value);
        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image", { position: "top-center", autoClose: 2000 });
        return null;
      } finally {
        uploadingImage.value = false;
      }
    };

    const getActiveSubscription = async () => {
      if (!trainerUid.value) return null;
      try {
        const subsRef = collection(db, "subscribers");
        const q = query(
          subsRef,
          where("trainerUid", "==", trainerUid.value),
          where("subscriptionStatus", "==", "active"),
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          let best = null;
          snap.forEach((d) => {
            const data = d.data();
            if (!best || (data.planLimit && data.planLimit > (best.planLimit || 0))) {
              best = { id: d.id, ...data };
            }
          });
          return best;
        }
      } catch (err) {
        console.error("getActiveSubscription error:", err);
      }
      return null;
    };

    const attemptCreatePlan = async () => {
      const currentCount = plans.value.length;
      const willBe = currentCount + 1;

      let activeSub = null;
      try {
        activeSub = await getActiveSubscription();
      } catch (e) {
        console.warn("couldn't fetch active subscription", e);
      }

      const allowedLimit = activeSub && activeSub.planLimit ? activeSub.planLimit : 1;

      if (willBe > allowedLimit) {
        showUpgradeModal.value = true;
        selectedSubscription.value = subscriptionOptions.value[0];
        return;
      }

      await createPlanCoreWithAI();
    };

    // Toggle AI Welcome feature (Create)
    const toggleAIWelcome = () => {
      if (useAIWelcome.value && newPlan.value.duration) {
        const weeksMatch = newPlan.value.duration.match(/(\d+)\s*week/i);
        if (weeksMatch) {
          const numWeeks = parseInt(weeksMatch[1]);
          trainingWeeks.value = Array.from({ length: numWeeks }, (_, i) => ({
            weekNumber: i + 1,
            sessions: "",
            exercises: "",
            notes: "",
          }));
        }
      } else {
        trainingWeeks.value = [];
        aiGeneratedMessage.value = "";
        showAIPreview.value = false;
      }
    };

    // Generate AI Welcome Message (Create)
    const generateAIMessage = async () => {
      if (!newPlan.value.title.trim()) {
        toast.error("Please enter a plan title first", { position: "top-center", autoClose: 2000 });
        return;
      }

      if (!newPlan.value.duration) {
        toast.error("Please select a duration first", { position: "top-center", autoClose: 2000 });
        return;
      }

      const hasContent = trainingWeeks.value.some((w) => w.sessions || w.exercises);
      if (!hasContent) {
        toast.error("Please fill in at least some training details", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      generatingAI.value = true;

      try {
        const userRef = doc(db, "users", trainerUid.value);
        const userSnap = await getDoc(userRef);
        let trainerName = "Your Trainer";
        let trainerPhone = "";

        if (userSnap.exists()) {
          const userData = userSnap.data();
          trainerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
          trainerPhone = userData.phone || "";
        }

        const payload = {
          planTitle: newPlan.value.title,
          weeks: trainingWeeks.value,
          trainerName: trainerName,
          trainerPhone: trainerPhone,
          location: newPlan.value.location || "",
        };

        const response = await fetch(`${API_URL}/generate-welcome-message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to generate AI message");
        }

        const data = await response.json();
        aiGeneratedMessage.value = data.message;
        showAIPreview.value = true;

        toast.success("AI message generated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error generating AI message:", error);
        toast.error("Failed to generate AI message. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        generatingAI.value = false;
      }
    };

    const createPlanCoreWithAI = async () => {
      if (!newPlan.value.title.trim()) {
        toast.error("Please enter a plan title", { position: "top-center", autoClose: 2000 });
        return;
      }
      if (!newPlan.value.duration) {
        toast.error("Please select a duration", { position: "top-center", autoClose: 2000 });
        return;
      }
      if (!newPlan.value.sessions || newPlan.value.sessions <= 0) {
        toast.error("Please enter number of sessions", { position: "top-center", autoClose: 2000 });
        return;
      }
      if (!newPlan.value.price || newPlan.value.price <= 0) {
        toast.error("Please enter a valid price", { position: "top-center", autoClose: 2000 });
        return;
      }

      if (useAIWelcome.value && !aiGeneratedMessage.value) {
        toast.error("Please generate the AI welcome message first", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      try {
        let imageUrl = null;
        if (selectedImageFile.value) {
          imageUrl = await uploadPlanImage();
          if (!imageUrl) {
            toast.error("Failed to upload image. Please try again.", {
              position: "top-center",
              autoClose: 2000,
            });
            return;
          }
        }

        const planData = {
          ...newPlan.value,
          image: imageUrl,
          trainer_uid: trainerUid.value,
          clientsCount: 0,
        };

        if (useAIWelcome.value && aiGeneratedMessage.value) {
          planData.aiWelcomeMessage = aiGeneratedMessage.value;
          planData.hasAIWelcome = true;
          // store weeks structure to help manage later
          planData.weeks = trainingWeeks.value;
          planData.aiGeneratedAt = serverTimestamp();
        }

        await addDoc(collection(db, "plans"), planData);

        newPlan.value = {
          title: "",
          status: "Active",
          location: "",
          sessions: 0,
          duration: "",
          price: 0,
          description: "",
          image: null,
        };
        selectedImageFile.value = null;
        imagePreviewUrl.value = null;
        useAIWelcome.value = false;
        trainingWeeks.value = [];
        aiGeneratedMessage.value = "";
        showAIPreview.value = false;
        showCreateModal.value = false;

        showSuccess("The plan is created successfully");
        fetchPlans();
      } catch (err) {
        console.error("Error creating plan:", err);
        toast.error("Failed to create plan. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    const startSubscriptionCheckout = async (opt) => {
      if (!trainerUid.value) {
        toast.error("User not authenticated", { position: "top-center", autoClose: 2000 });
        return;
      }
      try {
        const userRef = doc(db, "users", trainerUid.value);
        const userSnap = await getDoc(userRef);
        let trainerEmail = "";
        let trainerName = "";

        if (userSnap.exists()) {
          const userData = userSnap.data();
          trainerEmail = userData.email || "";
          trainerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
        }

        const pending = {
          trainerUid: trainerUid.value,
          trainerEmail: trainerEmail,
          trainerName: trainerName,
          planType: opt.title,
          planLimit: opt.planLimit,
          price: opt.price,
          priceId: opt.priceId,
          priceLabel: opt.priceLabel,
          createdAt: Date.now(),
        };
        localStorage.setItem("pendingSubscription", JSON.stringify(pending));

        const payload = {
          mode: "subscription",
          priceId: opt.priceId,
          trainerUid: trainerUid.value,
          trainerEmail: trainerEmail,
          trainerName: trainerName,
          planType: opt.title,
          planLimit: opt.planLimit,
          price: opt.price,
          metadata: {
            purpose: "trainer_subscription",
            trainerUid: trainerUid.value,
            planId: opt.id,
            planType: opt.title,
            planLimit: opt.planLimit.toString(),
          },
          success_url: `${window.location.origin + window.location.pathname}?sub_complete=1`,
          cancel_url: `${window.location.origin + window.location.pathname}?sub_canceled=1`,
        };

        const res = await fetch(`${API_URL}/create-subscription-checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          console.error("create-subscription-checkout failed:", res.status, txt);
          throw new Error("Failed to create checkout session");
        }

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("Unexpected response from checkout session:", data);
          toast.error("Checkout not available. Contact support.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error("startSubscriptionCheckout error:", err);
        toast.error("Failed to start checkout. Try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    };

    const finalizePendingSubscription = async () => {
      try {
        const raw = localStorage.getItem("pendingSubscription");
        if (!raw) return;
        const pending = JSON.parse(raw);

        await addDoc(collection(db, "subscribers"), {
          trainerUid: pending.trainerUid,
          planType: pending.planType,
          planLimit: pending.planLimit,
          price: pending.price,
          stripeSessionId: null,
          subscriptionStatus: "active",
          createdAt: serverTimestamp(),
        });

        localStorage.removeItem("pendingSubscription");
        showUpgradeModal.value = false;
        showSuccess("Subscription activated — you can now add more plans!");
        fetchPlans();
      } catch (err) {
        console.error("finalizePendingSubscription error:", err);
      }
    };

    const closeUpgradeModal = () => {
      showUpgradeModal.value = false;
    };

    const onManageDurationChange = () => {
      // regenerate manageTrainingWeeks if duration changed and AI enabled
      if (!selectedPlan.value.duration) {
        manageTrainingWeeks.value = [];
        return;
      }
      const weeksMatch = selectedPlan.value.duration.match(/(\d+)\s*week/i);
      if (weeksMatch) {
        const numWeeks = parseInt(weeksMatch[1]);
        manageTrainingWeeks.value = Array.from({ length: numWeeks }, (_, i) => ({
          weekNumber: i + 1,
          sessions: "",
          exercises: "",
          notes: "",
        }));
      } else {
        manageTrainingWeeks.value = [];
      }
    };

    const openManageModal = (plan) => {
      selectedPlan.value = { ...plan }; // shallow clone
      showManageModal.value = true;

      // populate manage AI state from plan
      manageUseAI.value = !!(plan.aiWelcomeMessage || plan.hasAIWelcome);
      manageAiGeneratedMessage.value = plan.aiWelcomeMessage || "";
      manageAIPreview.value = !!manageAiGeneratedMessage.value;

      // populate weeks: prefer stored plan.weeks, otherwise derive from duration
      if (plan.weeks && Array.isArray(plan.weeks) && plan.weeks.length > 0) {
        manageTrainingWeeks.value = plan.weeks.map((w, idx) => ({
          weekNumber: w.weekNumber || idx + 1,
          sessions: w.sessions || "",
          exercises: w.exercises || "",
          notes: w.notes || "",
        }));
      } else {
        // derive from duration
        const weeksMatch = (plan.duration || "").match(/(\d+)\s*week/i);
        if (weeksMatch) {
          const numWeeks = parseInt(weeksMatch[1]);
          manageTrainingWeeks.value = Array.from({ length: numWeeks }, (_, i) => ({
            weekNumber: i + 1,
            sessions: "",
            exercises: "",
            notes: "",
          }));
        } else {
          manageTrainingWeeks.value = [];
        }
      }
    };

    // Generate AI message for Manage (calls server endpoint that also stores it)
    // Generate AI message for Manage (calls server endpoint that also stores it)
    const generateManageAIMessage = async () => {
      if (!selectedPlan.value || !selectedPlan.value.id) return;
      manageGeneratingAI.value = true;
      try {
        // We only send weeks because server now handles trainer info + location
        const payload = {
          weeks: manageTrainingWeeks.value.map((w, index) => ({
            weekNumber: index + 1,
            sessions: w.sessions || "",
            exercises: w.exercises || "",
            notes: w.notes || "",
          })),
        };

        const res = await fetch(`${API_URL}/plans/${selectedPlan.value.id}/generate-ai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const t = await res.text().catch(() => "");
          console.error("generate-ai failed:", res.status, t);
          throw new Error("Failed to generate AI for plan");
        }

        const json = await res.json();
        if (json.success && json.aiMessage) {
          manageAiGeneratedMessage.value = json.aiMessage;
          manageAIPreview.value = true;
          manageUseAI.value = true;
          selectedPlan.value.aiWelcomeMessage = json.aiMessage;
          selectedPlan.value.hasAIWelcome = true;
          toast.success("AI message generated and saved to plan", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          throw new Error("AI generation returned no message");
        }
      } catch (err) {
        console.error("generateManageAIMessage error:", err);
        toast.error("Failed to generate AI message. Try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        manageGeneratingAI.value = false;
      }
    };

    // Save AI text manually to plan (without other changes)
    const saveAiToPlan = async () => {
      if (!selectedPlan.value || !selectedPlan.value.id) return;
      if (!manageAiGeneratedMessage.value) {
        toast.error("Message is empty", { position: "top-center", autoClose: 2000 });
        return;
      }
      manageSavingAI.value = true;
      try {
        const res = await fetch(`${API_URL}/plans/${selectedPlan.value.id}/set-ai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aiWelcomeMessage: manageAiGeneratedMessage.value }),
        });
        if (!res.ok) {
          const t = await res.text().catch(() => "");
          console.error("set-ai failed:", res.status, t);
          throw new Error("Failed to save AI to plan");
        }
        const json = await res.json();
        if (json.success) {
          selectedPlan.value.aiWelcomeMessage = manageAiGeneratedMessage.value;
          selectedPlan.value.hasAIWelcome = true;
          selectedPlan.value.aiGeneratedAt = new Date().toISOString();
          toast.success("AI message saved to plan", { position: "top-center", autoClose: 2000 });
          // refresh plans
          fetchPlans();
        } else {
          throw new Error("Save AI returned failure");
        }
      } catch (err) {
        console.error("saveAiToPlan error:", err);
        toast.error("Failed to save AI. Try again.", { position: "top-center", autoClose: 3000 });
      } finally {
        manageSavingAI.value = false;
      }
    };

    const updatePlan = async () => {
      if (!selectedPlan.value) return;
      if (!selectedPlan.value.title.trim()) {
        toast.error("Please enter a plan title", { position: "top-center", autoClose: 2000 });
        return;
      }

      try {
        const planRef = doc(db, "plans", selectedPlan.value.id);

        let imageUrl = selectedPlan.value.image;
        if (selectedImageFile.value) {
          imageUrl = await uploadPlanImage();
          if (!imageUrl) {
            toast.error("Failed to upload image. Please try again.", {
              position: "top-center",
              autoClose: 2000,
            });
            return;
          }
        }

        // prepare update payload
        const updatePayload = {
          title: selectedPlan.value.title,
          status: selectedPlan.value.status,
          location: selectedPlan.value.location,
          sessions: selectedPlan.value.sessions,
          duration: selectedPlan.value.duration,
          price: selectedPlan.value.price,
          description: selectedPlan.value.description,
          image: imageUrl,
        };

        // store weeks if AI is used (helps regenerate later)
        if (
          manageUseAI.value &&
          manageTrainingWeeks.value &&
          manageTrainingWeeks.value.length > 0
        ) {
          updatePayload.weeks = manageTrainingWeeks.value.map((w) => ({
            weekNumber: w.weekNumber,
            sessions: w.sessions,
            exercises: w.exercises,
            notes: w.notes,
          }));
        }

        // AI fields handling
        if (manageUseAI.value) {
          // prefer current edited message, else keep existing
          updatePayload.aiWelcomeMessage =
            manageAiGeneratedMessage.value || selectedPlan.value.aiWelcomeMessage || "";
          updatePayload.hasAIWelcome = true;
          updatePayload.aiGeneratedAt = serverTimestamp();
        } else {
          // remove the field from firestore
          updatePayload.aiWelcomeMessage = deleteField();
          updatePayload.hasAIWelcome = false;
        }

        await updateDoc(planRef, updatePayload);

        selectedImageFile.value = null;
        imagePreviewUrl.value = null;
        showManageModal.value = false;
        showSuccess("The plan is updated successfully");
        fetchPlans();
      } catch (err) {
        console.error("Error updating plan:", err);
        toast.error("Failed to update plan. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    const confirmDelete = () => {
      showManageModal.value = false;
      showDeleteModal.value = true;
    };

    const deletePlan = async () => {
      if (!selectedPlan.value) return;

      await deleteDoc(doc(db, "plans", selectedPlan.value.id));
      showDeleteModal.value = false;
      showSuccess("The plan is deleted successfully");
      fetchPlans();
    };

    const showSuccess = (message) => {
      successMessage.value = message;
      showSuccessModal.value = true;
      setTimeout(() => {
        showSuccessModal.value = false;
      }, 2000);
    };

    const filteredPlans = computed(() => {
      return plans.value.filter((plan) => {
        const matchesSearch = plan.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = filterStatus.value === "All" || plan.status === filterStatus.value;
        return matchesSearch && matchesStatus;
      });
    });

    const startBookingsListener = () => {
      if (!trainerUid.value) return;

      if (bookingsUnsubscribe) {
        bookingsUnsubscribe();
        bookingsUnsubscribe = null;
      }

      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("trainerId", "==", trainerUid.value));
        bookingsUnsubscribe = onSnapshot(
          q,
          async (snapshot) => {
            const countsMap = new Map();

            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const planId =
                data.planId ||
                data.plan_id ||
                (data.plan && (data.plan.id || data.plan.planId)) ||
                data.plan?.planId ||
                null;
              const traineeId =
                data.traineeId || data.traineeUid || data.userId || data.clientId || null;

              if (!planId) return;

              if (!countsMap.has(planId)) countsMap.set(planId, new Set());
              if (traineeId) countsMap.get(planId).add(String(traineeId));
              else countsMap.get(planId).add(docSnap.id);
            });

            const updates = [];
            plans.value.forEach((plan) => {
              const newCount = countsMap.has(plan.id) ? countsMap.get(plan.id).size : 0;
              const oldCount = plan.clientsCount || 0;
              if (newCount !== oldCount) {
                plan.clientsCount = newCount;
                updates.push({ planId: plan.id, clientsCount: newCount });
              }
            });

            for (const u of updates) {
              try {
                const planRef = doc(db, "plans", u.planId);
                await updateDoc(planRef, { clientsCount: u.clientsCount });
                console.log(`Updated clientsCount for plan ${u.planId} => ${u.clientsCount}`);
              } catch (err) {
                console.error("Failed to update clientsCount for plan", u.planId, err);
              }
            }
          },
          (err) => {
            console.error("bookings onSnapshot error:", err);
          },
        );
      } catch (err) {
        console.error("startBookingsListener error:", err);
      }
    };

    // small helper to render readable timestamp
    const formatRelativeDate = (ts) => {
      try {
        if (!ts) return "—";
        const d = typeof ts === "object" && ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleString();
      } catch {
        return "—";
      }
    };

    onUnmounted(() => {
      if (bookingsUnsubscribe) {
        bookingsUnsubscribe();
        bookingsUnsubscribe = null;
      }
    });

    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          trainerUid.value = user.uid;
          await fetchPlans();
          startBookingsListener();

          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.has("sub_complete")) {
            await finalizePendingSubscription();
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
        } else {
          console.warn("No user logged in");
        }
      });
    });

    return {
      plans,
      newPlan,
      searchQuery,
      filterStatus,
      filteredPlans,
      showCreateModal,
      showManageModal,
      showDeleteModal,
      showSuccessModal,
      successMessage,
      selectedPlan,
      uploadingImage,
      selectedImageFile,
      imagePreviewUrl,
      handleImageSelect,
      attemptCreatePlan,
      openManageModal,
      updatePlan,
      confirmDelete,
      deletePlan,
      showUpgradeModal,
      subscriptionOptions,
      selectedSubscription,
      startSubscriptionCheckout,
      closeUpgradeModal,
      // AI Create
      useAIWelcome,
      trainingWeeks,
      generatingAI,
      aiGeneratedMessage,
      showAIPreview,
      toggleAIWelcome,
      generateAIMessage,
      // Manage AI
      manageUseAI,
      manageTrainingWeeks,
      manageGeneratingAI,
      manageAiGeneratedMessage,
      manageAIPreview,
      manageSavingAI,
      generateManageAIMessage,
      saveAiToPlan,
      onManageDurationChange,
      // helpers
      formatRelativeDate,
    };
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
