<script>
export default {
  name: "TrainerClient",
};
</script>

<template>
  <div class="">
    <div class="p-0">
      <div class="grid grid-cols-1 gap-4 mb-4">
        <div
          class="flex flex-col items-left  h-23 rounded-sm bg-white"
        >
          <h1 class="text-2xl">Clients</h1>

          <p class="text-md text-gray-400 mt-2">
            Manage and track all your clients in one place.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-10 mb-4">
        <div class="col-span-8">
          <div class="relative w-full">
            <img
              src="@/assets/images/ic_outline-search.png"
              alt="search icon"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Clients"
              class="border border-gray-300 rounded-xl pl-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div class="col-span-4">
          <select
            class="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-400"
            required
          >
            <option value="all">All Clients</option>
            <option value="active">Active Clients</option>
            <option value="inactive">Inactive Clients</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Card -->
        <div
          class="flex flex-col border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
        >
          <!-- Profile -->
          <div class="flex items-center justify-between  mb-4 ">
            <div class="flex items-center">
              <img
                src="@/assets/images/cup.png"
                alt="User"
                class="w-12 h-12 rounded-full object-cover mr-3 border-1"
              />
              <h2 class="text-lg font-semibold text-gray-800">Sara Ahmed</h2>
            </div>
            <span class="text-green-500 text-sm font-semibold "
              >In Progress</span
            >
          </div>

          <!-- Details -->
          <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
            <p class="text-gray-500">Plan Name</p>
            <p class="font-medium">Strength Building</p>

            <p class="text-gray-500">Duration</p>
            <p class="font-medium">8 weeks</p>

            <p class="text-gray-500">Sessions</p>
            <p class="font-medium">2</p>

            <p class="text-gray-500">Starting Date</p>
            <p class="font-medium">1/10/2025</p>

            <p class="text-gray-500">Expiring Date</p>
            <p class="font-medium">1/12/2025</p>
          </div>
        </div>

        <!-- Example of expired -->
        <div
          class="flex flex-col border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="@/assets/images/cup.png"
                alt="User"
                class="w-12 h-12 rounded-full object-cover mr-3 border-1"
              />
              <h2 class="text-lg font-semibold text-gray-800">Noha Selim</h2>
            </div>
            <span class="text-red-500 text-sm font-semibold">Expired</span>
          </div>

          <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
            <p class="text-gray-500">Plan Name</p>
            <p class="font-medium">Strength Building</p>

            <p class="text-gray-500">Duration</p>
            <p class="font-medium">8 weeks</p>

            <p class="text-gray-500">Sessions</p>
            <p class="font-medium">2</p>

            <p class="text-gray-500">Starting Date</p>
            <p class="font-medium">1/10/2025</p>

            <p class="text-gray-500">Expiring Date</p>
            <p class="font-medium">1/12/2025</p>
          </div>
        </div>
        <div
          class="flex flex-col border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
        >
          <!-- Profile -->
          <div class="flex items-center justify-between  mb-4 ">
            <div class="flex items-center">
              <img
                src="@/assets/images/cup.png"
                alt="User"
                class="w-12 h-12 rounded-full object-cover mr-3 border-1"
              />
              <h2 class="text-lg font-semibold text-gray-800">Sara Ahmed</h2>
            </div>
            <span class="text-green-500 text-sm font-semibold "
              >In Progress</span
            >
          </div>

          <!-- Details -->
          <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
            <p class="text-gray-500">Plan Name</p>
            <p class="font-medium">Strength Building</p>

            <p class="text-gray-500">Duration</p>
            <p class="font-medium">8 weeks</p>

            <p class="text-gray-500">Sessions</p>
            <p class="font-medium">2</p>

            <p class="text-gray-500">Starting Date</p>
            <p class="font-medium">1/10/2025</p>

            <p class="text-gray-500">Expiring Date</p>
            <p class="font-medium">1/12/2025</p>
          </div>
        </div>

        <!-- Example of expired -->
        <div
          class="flex flex-col border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="@/assets/images/cup.png"
                alt="User"
                class="w-12 h-12 rounded-full object-cover mr-3 border-1"
              />
              <h2 class="text-lg font-semibold text-gray-800">Noha Selim</h2>
            </div>
            <span class="text-red-500 text-sm font-semibold">Expired</span>
          </div>

          <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
            <p class="text-gray-500">Plan Name</p>
            <p class="font-medium">Strength Building</p>

            <p class="text-gray-500">Duration</p>
            <p class="font-medium">8 weeks</p>

            <p class="text-gray-500">Sessions</p>
            <p class="font-medium">2</p>

            <p class="text-gray-500">Starting Date</p>
            <p class="font-medium">1/10/2025</p>

            <p class="text-gray-500">Expiring Date</p>
            <p class="font-medium">1/12/2025</p>
          </div>
        </div>
        <div
          class="flex flex-col border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
        >
          <!-- Profile -->
          <div class="flex items-center justify-between  mb-4 ">
            <div class="flex items-center">
              <img
                src="@/assets/images/cup.png"
                alt="User"
                class="w-12 h-12 rounded-full object-cover mr-3 border-1"
              />
              <h2 class="text-lg font-semibold text-gray-800">Sara Ahmed</h2>
            </div>
            <span class="text-green-500 text-sm font-semibold "
              >In Progress</span
            >
          </div>

          <!-- Details -->
          <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
            <p class="text-gray-500">Plan Name</p>
            <p class="font-medium">Strength Building</p>

            <p class="text-gray-500">Duration</p>
            <p class="font-medium">8 weeks</p>

            <p class="text-gray-500">Sessions</p>
            <p class="font-medium">2</p>

            <p class="text-gray-500">Starting Date</p>
            <p class="font-medium">1/10/2025</p>

            <p class="text-gray-500">Expiring Date</p>
            <p class="font-medium">1/12/2025</p>
          </div>
        </div>

        <!-- Example of expired -->
        <div
          class="flex flex-col border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="@/assets/images/cup.png"
                alt="User"
                class="w-12 h-12 rounded-full object-cover mr-3 border-1"
              />
              <h2 class="text-lg font-semibold text-gray-800">Noha Selim</h2>
            </div>
            <span class="text-red-500 text-sm font-semibold">Expired</span>
          </div>

          <div class="grid grid-cols-2 gap-x-10 text-sm text-gray-700 ml-15 gap-y-3">
            <p class="text-gray-500">Plan Name</p>
            <p class="font-medium">Strength Building</p>

            <p class="text-gray-500">Duration</p>
            <p class="font-medium">8 weeks</p>

            <p class="text-gray-500">Sessions</p>
            <p class="font-medium">2</p>

            <p class="text-gray-500">Starting Date</p>
            <p class="font-medium">1/10/2025</p>

            <p class="text-gray-500">Expiring Date</p>
            <p class="font-medium">1/12/2025</p>
          </div>
        </div>
       
      </div>
      
    </div>
  </div>
</template>

   <style></style>