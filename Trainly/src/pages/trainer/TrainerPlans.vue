<template>
  <div class="min-h-screen bg-linear-to-br p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white dark:bg-[#3B3B3B] shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8 mb-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">My Plans</h1>
            <p class="text-gray-500 dark:text-gray-200 mt-1 text-sm sm:text-base">Easily manage, edit, and organize all your training plans in one place</p>
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
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-white text-gray-400">🔍</span>
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
          <thead class="bg-blue-50  dark:bg-[#3B3B3B] border-b-2 border-blue-100">
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
              <td colspan="5" class="text-center p-12 text-gray-400 text-lg">
                No plans found
              </td>
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
                  :class="plan.status === 'Active'
                    ? 'text-green-600 bg-green-50'
                    : 'text-red-600 bg-red-50'"
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
        <div v-if="filteredPlans.length === 0" class="bg-white shadow-sm rounded-2xl p-8 text-center text-gray-400">
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
              :class="plan.status === 'Active'
                ? 'text-green-600 bg-green-50'
                : 'text-red-600 bg-red-50'"
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
    <div
      v-if="showUpgradeModal"
      class="fixed inset-0 z-60 flex items-center justify-center"
    >
      <!-- blur background -->
      <div class="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

      <div class="relative bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-3xl p-6 z-10">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-bold">Upgrade to add more plans</h3>
            <p class="text-sm text-gray-600 mt-1">
              You have reached the free plan limit (1 plan). Choose a subscription to create more plans.
            </p>
          </div>
          <button @click="closeUpgradeModal" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="opt in subscriptionOptions"
            :key="opt.id"
            class="border rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition"
            :class="{'ring-2 ring-blue-200': selectedSubscription && selectedSubscription.id === opt.id}"
            @click="selectedSubscription = opt"
          >
            <div>
              <div class="flex items-center justify-between">
                <div class="text-lg font-semibold">{{ opt.title }}</div>
                <div class="text-sm text-gray-500">{{ opt.priceLabel }}</div>
              </div>
              <p class="mt-3 text-sm text-gray-600">{{ opt.description }}</p>

              <ul class="mt-4 text-sm space-y-1 text-gray-700">
                <li>• Up to <span class="font-semibold">{{ opt.planLimit }}</span> plans</li>
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

    <!-- Create Plan Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="() => (showCreateModal = false)"
    >
      <div class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex justify-between items-center dark:bg-[#3B3B3B] p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 dark:bg-[#3B3B3B] p-2 rounded-lg">
              <span class="text-blue-600 text-xl">📋</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold dark:text-white text-gray-800 cursor-pointer">Create a New Plan</h2>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Title of The Plan</label>
              <input
                v-model="newPlan.title"
                type="text"
                placeholder="Enter the plan name"
                class="w-full px-4 py-2 border text-dark dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Status</label>
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
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Number of Sessions</label>
              <input
                v-model.number="newPlan.sessions"
                type="number"
                placeholder="24"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium dark:bg-[#3b3b3b] dark:text-white text-gray-600 mb-2">Duration</label>
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
              <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Price</label>
              <input
                v-model.number="newPlan.price"
                type="number"
                placeholder="$ 100"
                class="w-full px-4 py-2 border border-gray-300 text-dark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Location</label>
            <div class="flex gap-2">
              <input
                v-model="newPlan.location"
                type="text"
                placeholder="Description"
                class="flex-1 px-4 py-2 border border-gray-300 text-dark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                 onclick="window.open('https://www.google.com/maps?q=My+Location', '_blank')"
                 class="px-4 py-2 bg-gray-100  rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                📍
              </button>
            </div>
          </div>

          <!-- Description Field -->
          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Plan Description</label>
            <textarea
              v-model="newPlan.description"
              rows="3"
              placeholder="Enter a detailed description of the plan..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs dark:text-gray-300 text-gray-500 mt-1">This will be visible to trainees</p>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium dark:text-white text-gray-600 mb-2">Plan Image</label>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <label class="flex-1 cursor-pointer">
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors text-center">
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleImageSelect"
                      class="hidden"
                    />
                    <div class="flex flex-col items-center gap-2">
                      <span class="text-3xl">📸</span>
                      <span class="text-sm dark:text-gray-300 text-gray-600">Click to upload image</span>
                      <span class="text-xs dark:text-gray-200 text-gray-400">Max size: 5MB</span>
                    </div>
                  </div>
                </label>
              </div>

              <!-- Image Preview -->
              <div v-if="imagePreviewUrl" class="relative">
                <img
                  :src="imagePreviewUrl"
                  alt="Preview"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  @click="selectedImageFile = null; imagePreviewUrl = null"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-xs dark:text-gray-300 text-gray-500 mt-1">This will be visible to trainees</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t bg-gray-50 dark:bg-[#3B3B3B] sticky bottom-0">
          <button
            @click="showCreateModal = false; selectedImageFile = null; imagePreviewUrl = null"
            class="w-full sm:w-auto bg-white px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-400 transition-colors text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="attemptCreatePlan"
            :disabled="uploadingImage"
            class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ uploadingImage ? 'Uploading...' : 'Create a New Plan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Manage Plan Modal (unchanged) -->
    <div
      v-if="showManageModal"
      class="fixed inset-0 bg-white dark:bg-[#3B3B3B] bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showManageModal = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 dark:bg-[#3B3B3B] p-2 rounded-lg">
              <span class="text-blue-600 text-xl">📋</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-800">Plan Details</h2>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-4 sm:p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-1">
              <label class="block text-sm font-medium text-gray-600 mb-2">Title of The Plan</label>
              <input
                v-model="selectedPlan.title"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Active Clients</label>
              <input
                :value="selectedPlan.clientsCount || 0"
                type="text"
                disabled
                class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-[#3B3B3B] bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Status</label>
              <select
                v-model="selectedPlan.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Number of Sessions</label>
              <input
                v-model.number="selectedPlan.sessions"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">Duration</label>
              <select
                v-model="selectedPlan.duration"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
              <label class="block text-sm font-medium text-gray-600 mb-2">Price</label>
              <input
                v-model.number="selectedPlan.price"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Location</label>
            <input
              v-model="selectedPlan.location"
              type="text"
              placeholder="Description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Description Field -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Plan Description</label>
            <textarea
              v-model="selectedPlan.description"
              rows="3"
              placeholder="Enter a detailed description of the plan..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Plan Image</label>
            <div class="space-y-3">
              <!-- Current Image Preview -->
              <div v-if="selectedPlan.image && !imagePreviewUrl" class="relative">
                <img
                  :src="selectedPlan.image"
                  alt="Current plan image"
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <div class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Current Image
                </div>
              </div>

              <!-- Upload New Image -->
              <div class="flex items-center gap-3">
                <label class="flex-1 cursor-pointer">
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors text-center">
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleImageSelect"
                      class="hidden"
                    />
                    <div class="flex flex-col items-center gap-2">
                      <span class="text-3xl">📸</span>
                      <span class="text-sm text-gray-600">
                        {{ selectedPlan.image ? 'Change image' : 'Upload image' }}
                      </span>
                      <span class="text-xs text-gray-400">Max size: 5MB</span>
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
                  @click="selectedImageFile = null; imagePreviewUrl = null"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  New Image
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex flex-col sm:flex-row justify-between gap-3 p-4 sm:p-6 border-t bg-gray-50 sticky bottom-0">
          <button
            @click="confirmDelete"
            class="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors order-2 sm:order-1 cursor-pointer"
          >
            Delete Plan
          </button>
          <div class="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <button
              @click="showManageModal = false; selectedImageFile = null; imagePreviewUrl = null"
              class="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              @click="updatePlan"
              :disabled="uploadingImage"
              class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ uploadingImage ? 'Uploading...' : 'Save Changes' }}
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
      <div class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn text-center p-6 sm:p-8">
        <div class="flex justify-center mb-4">
          <div class="bg-red-100 p-3 sm:p-4 rounded-full">
            <span class="text-red-600 text-3xl sm:text-4xl">🗑️</span>
          </div>
        </div>
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">Are you sure you want to delete this plan?</h2>
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
      <div class="bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn text-center p-6 sm:p-8">
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
import { ref, computed, onMounted, onUnmounted } from "vue";
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
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "vue3-toastify";

export default {
  name: "TrainerPlans",
  setup() {
    // ----- CONFIG: ضع هنا عنوان السيرفر بتاعك -----
    const API_URL = "https://elenora-unexampled-carmon.ngrok-free.dev"; // غيّره لو لازم
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
    const selectedPlan = ref(null);
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
        priceId: "PRICE_ID_3_PLANS", // <<< استبدل الـ placeholder بقيمة Stripe Price ID الحقيقية
      },
      {
        id: "sub_pro_30",
        title: "Pro",
        price: 150,
        priceLabel: "$150 / month",
        planLimit: 6,
        description: "For growing trainers - up to 6 plans.",
        priceId: "PRICE_ID_6_PLANS", // <<< استبدل الـ placeholder بقيمة Stripe Price ID الحقيقية
      },
    ]);
    const selectedSubscription = ref(null);

    // حفظ unsubscribe للـ bookings listener علشان نقدر نعمل cleanup
    let bookingsUnsubscribe = null;

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
        if (!file.type.startsWith('image/')) {
          toast.error("Please select an image file", { position: "top-center", autoClose: 2000 });
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size should be less than 5MB", { position: "top-center", autoClose: 2000 });
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

    // helper: check active subscription
    const getActiveSubscription = async () => {
      if (!trainerUid.value) return null;
      try {
        const subsRef = collection(db, "subscribers");
        const q = query(subsRef, where("trainerUid", "==", trainerUid.value), where("subscriptionStatus", "==", "active"));
        const snap = await getDocs(q);
        if (!snap.empty) {
          // return the subscription with highest planLimit
          let best = null;
          snap.forEach(d => {
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

    // Attempt to create plan but check limits first
    const attemptCreatePlan = async () => {
      // count current plans
      const currentCount = plans.value.length;
      const willBe = currentCount + 1;

      // check active subscription
      let activeSub = null;
      try {
        activeSub = await getActiveSubscription();
      } catch (e) {
        console.warn("couldn't fetch active subscription", e);
      }

      // Determine allowed limit
      const allowedLimit = activeSub && activeSub.planLimit ? activeSub.planLimit : 1;

      if (willBe > allowedLimit) {
        // show upgrade modal
        showUpgradeModal.value = true;
        // pick default option (first)
        selectedSubscription.value = subscriptionOptions.value[0];
        return;
      }

      // else allowed -> create plan normally
      await createPlanCore();
    };

    // core create plan (image upload + addDoc)
    const createPlanCore = async () => {
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

      try {
        let imageUrl = null;
        if (selectedImageFile.value) {
          imageUrl = await uploadPlanImage();
          if (!imageUrl) {
            toast.error("Failed to upload image. Please try again.", { position: "top-center", autoClose: 2000 });
            return;
          }
        }

        await addDoc(collection(db, "plans"), {
          ...newPlan.value,
          image: imageUrl,
          trainer_uid: trainerUid.value,
          clientsCount: 0,
        });

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
        showCreateModal.value = false;
        showSuccess("The plan is created successfully");
        fetchPlans();
      } catch (err) {
        console.error("Error creating plan:", err);
        toast.error("Failed to create plan. Please try again.", { position: "top-center", autoClose: 2000 });
      }
    };

  // start subscription checkout flow (calls server to create checkout session and redirects)
    const startSubscriptionCheckout = async (opt) => {
      if (!trainerUid.value) {
        toast.error("User not authenticated", { position: "top-center", autoClose: 2000 });
        return;
      }
      try {
        // Get trainer data from Firestore
        const userRef = doc(db, "users", trainerUid.value);
        const userSnap = await getDoc(userRef);
        let trainerEmail = "";
        let trainerName = "";

        if (userSnap.exists()) {
          const userData = userSnap.data();
          trainerEmail = userData.email || "";
          trainerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
        }

        // store pending subscription locally so we can finalize after redirect
        const pending = {
          trainerUid: trainerUid.value,
          trainerEmail: trainerEmail,
          trainerName: trainerName,
          planType: opt.title,
          planLimit: opt.planLimit,
          price: opt.price,
          priceId: opt.priceId,
          priceLabel: opt.priceLabel,
          createdAt: Date.now()
        };
        localStorage.setItem("pendingSubscription", JSON.stringify(pending));

        // create checkout session on server
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
            planLimit: opt.planLimit.toString()
          },
          // success URL should return to this same page — we'll read localStorage to finalize
          success_url: `${window.location.origin + window.location.pathname}?sub_complete=1`,
          cancel_url: `${window.location.origin + window.location.pathname}?sub_canceled=1`
        };

        const res = await fetch(`${API_URL}/create-subscription-checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          console.error("create-subscription-checkout failed:", res.status, txt);
          throw new Error("Failed to create checkout session");
        }

        const data = await res.json();
        if (data.url) {
          // redirect user to Stripe checkout
          window.location.href = data.url;
        } else {
          console.error("Unexpected response from checkout session:", data);
          toast.error("Checkout not available. Contact support.", { position: "top-center", autoClose: 3000 });
        }
      } catch (err) {
        console.error("startSubscriptionCheckout error:", err);
        toast.error("Failed to start checkout. Try again.", { position: "top-center", autoClose: 3000 });
      }
    };

    // After user returns from checkout, finalize the pending subscription (optimistic)
    const finalizePendingSubscription = async () => {
      try {
        const raw = localStorage.getItem("pendingSubscription");
        if (!raw) return;
        const pending = JSON.parse(raw);

        // create subscribers doc
        await addDoc(collection(db, "subscribers"), {
          trainerUid: pending.trainerUid,
          planType: pending.planType,
          planLimit: pending.planLimit,
          price: pending.price,
          stripeSessionId: null,
          subscriptionStatus: "active",
          createdAt: serverTimestamp()
        });

        // cleanup and UI
        localStorage.removeItem("pendingSubscription");
        showUpgradeModal.value = false;
        showSuccess("Subscription activated — you can now add more plans!");
        // refresh plans/subscriptions
        fetchPlans();
      } catch (err) {
        console.error("finalizePendingSubscription error:", err);
      }
    };

    const closeUpgradeModal = () => {
      showUpgradeModal.value = false;
    };

    const openManageModal = (plan) => {
      selectedPlan.value = { ...plan };
      showManageModal.value = true;
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
            toast.error("Failed to upload image. Please try again.", { position: "top-center", autoClose: 2000 });
            return;
          }
        }

        await updateDoc(planRef, {
          title: selectedPlan.value.title,
          status: selectedPlan.value.status,
          location: selectedPlan.value.location,
          sessions: selectedPlan.value.sessions,
          duration: selectedPlan.value.duration,
          price: selectedPlan.value.price,
          description: selectedPlan.value.description,
          image: imageUrl,
        });

        selectedImageFile.value = null;
        imagePreviewUrl.value = null;
        showManageModal.value = false;
        showSuccess("The plan is updated successfully");
        fetchPlans();
      } catch (err) {
        console.error("Error updating plan:", err);
        toast.error("Failed to update plan. Please try again.", { position: "top-center", autoClose: 2000 });
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
        const matchesSearch = plan.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const matchesStatus =
          filterStatus.value === "All" || plan.status === filterStatus.value;
        return matchesSearch && matchesStatus;
      });
    });

    /**
     * --- new: startBookingsListener ---
     * (unchanged) نعمل listener على collection bookings بس للـ trainer الحالي
     */
    const startBookingsListener = () => {
      // safety
      if (!trainerUid.value) return;

      // clean existing listener
      if (bookingsUnsubscribe) {
        bookingsUnsubscribe();
        bookingsUnsubscribe = null;
      }

      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("trainerId", "==", trainerUid.value));
        bookingsUnsubscribe = onSnapshot(q, async (snapshot) => {
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
              data.traineeId ||
              data.traineeUid ||
              data.userId ||
              data.clientId ||
              null;

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
        }, (err) => {
          console.error("bookings onSnapshot error:", err);
        });
      } catch (err) {
        console.error("startBookingsListener error:", err);
      }
    };

    // cleanup on unmount
    onUnmounted(() => {
      if (bookingsUnsubscribe) {
        bookingsUnsubscribe();
        bookingsUnsubscribe = null;
      }
    });

    // on mount: auth + fetch plans + listener + finalize pending subscription if present
    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          trainerUid.value = user.uid;
          await fetchPlans();
          startBookingsListener();

          // if returned from Stripe checkout and we have pending subscription in localStorage -> finalize
          // We rely on localStorage pendingSubscription saved before redirect
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.has("sub_complete")) {
            // finalize pending subscription (optimistic)
            await finalizePendingSubscription();
            // remove query params to clean URL (nice-to-have)
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
      createPlanCore,
      openManageModal,
      updatePlan,
      confirmDelete,
      deletePlan,
      // upgrade modal
      showUpgradeModal,
      subscriptionOptions,
      selectedSubscription,
      startSubscriptionCheckout,
      closeUpgradeModal,
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
