<template>
  <div
    class="bg-white shadow-3xl dark:bg-black min-h-screen flex flex-col items-center py-12 px-4 sm:px-8"
  >
    <!-- Hero Section -->
    <div
      class="max-w-5xl w-full bg-white dark:bg-[#3B3B3B] rounded-2xl shadow-sm p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between mb-12"
    >
      <!-- Left Text -->
      <div class="sm:w-1/2 text-center">
        <h2 class="text-2xl text-black dark:text-white sm:text-3xl font-semibold mb-2">
          {{ $t("sports1") }}
          <span class="bg-linear-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent">{{
            $t("trainly")
          }}</span>
        </h2>
        <p class="text-black dark:text-white font-semibold mb-4">{{ $t("sports2") }}</p>
        <p class="text-black dark:text-white text-sm sm:text-base leading-relaxed font-medium">
          {{ $t("sports3") }}
        </p>
      </div>

      <div class="sm:w-1/2 mt-6 sm:mt-0 flex justify-center">
        <img
          src="@/assets/images/sport.png"
          alt="Explore Sports"
          class="max-w-xs sm:max-w-sm w-full"
        />
      </div>
    </div>

    <!-- GYM & Fitness Section -->
    <div
      class="max-w-5xl w-full bg-white dark:bg-[#3B3B3B] rounded-xl overflow-hidden shadow-md flex flex-col sm:flex-row mb-12 border-gray-200 p-0 relative"
    >
      <img
        src="@/assets/images/sport1.png"
        alt="Gym and Fitness"
        class="w-full sm:w-1/2 object-cover"
      />
      <div class="absolute inset-0 border-5 border-[#586369] rounded-xl pointer-events-none"></div>
      <div class="p-8 flex flex-col justify-center sm:w-1/2 relative z-10">
        <h3 class="text-xl text-black dark:text-white font-bold mb-2">{{ $t("gym") }}</h3>
        <p class="text-black dark:text-white font-semibold mb-3">{{ $t("sports5") }}</p>
        <p class="text-black dark:text-white font-medium text-sm leading-relaxed">
          {{ $t("sports6") }}
        </p>
      </div>
    </div>

    <!-- Padel Section -->
    <div
      class="max-w-5xl w-full bg-white dark:bg-[#3B3B3B] rounded-xl overflow-hidden shadow-md flex flex-col sm:flex-row mb-12 border-gray-200 p-0 relative"
    >
      <div class="absolute inset-0 border-5 border-[#010707] rounded-xl pointer-events-none"></div>

      <div class="p-8 flex flex-col justify-center sm:w-1/2 relative z-10">
        <h3 class="text-xl text-black dark:text-white font-bold mb-2">{{ $t("padel") }}</h3>
        <p class="text-black dark:text-white font-semibold mb-3">{{ $t("sports8") }}</p>
        <p class="text-black dark:text-white font-medium text-sm leading-relaxed">
          {{ $t("sports9") }}
        </p>
      </div>
      <img
        src="@/assets/images/sport2.png"
        alt="Padel"
        class="w-full sm:w-1/2 object-cover relative z-10"
      />
    </div>

    <!-- Tennis Section -->
    <div
      class="max-w-5xl w-full bg-white dark:bg-[#3B3B3B] rounded-xl overflow-hidden shadow-md flex flex-col sm:flex-row mb-12 border border-gray-200 p-0 relative"
    >
      <div class="absolute inset-0 border-5 border-[#6C2B08] rounded-xl pointer-events-none"></div>
      <img src="@/assets/images/sport3.png" alt="Tennis" class="w-full sm:w-1/2 object-cover" />
      <div class="p-8 flex flex-col justify-center sm:w-1/2 relative z-10">
        <h3 class="text-xl text-black dark:text-white font-bold mb-2">{{ $t("tennis") }}</h3>
        <p class="text-black dark:text-white font-semibold mb-3">{{ $t("sports10") }}</p>
        <p class="text-black dark:text-white font-medium text-sm leading-relaxed">
          {{ $t("sports11") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SportS",
};
</script>

<style scoped>
img {
  transition: transform 0.4s ease;
}
img:hover {
  transform: scale(1.03);
}
</style>
