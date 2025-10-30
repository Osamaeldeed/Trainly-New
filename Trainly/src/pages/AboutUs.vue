<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section - About Trainly -->
    <section class="max-w-6xl mx-auto py-11">
      <div
        class="grid md:grid-cols-2 gap-5 items-center border-2 border-[#0D8BF2] rounded-3xl p-6 bg-gradient-to-br from-cyan-50 to-white"
      >
        <div>
          <h1 class="text-4xl font-bold mb-4">
            {{ $t("about1") }}
            <span
              class="bg-gradient-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent"
              >{{ $t("trainly") }}</span
            >
          </h1>
          <p class="text-lg font-semibold mb-4">{{ $t("empowering") }}</p>
          <p class="text-black mb-4">
            {{ $t("aboutus1") }}
          </p>
          <p class="text-black mb-4">
            {{ $t("aboutus2") }}
          </p>
          <p class="text-black">
            {{ $t("aboutus3") }}
          </p>
        </div>
        <div class="flex justify-start sm:justify-end">
          <img
            src="@/assets/images/about1.png"
            alt="Fitness trainer"
            class="max-w-xs sm:max-w-sm w-full"
          />
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="max-w-6xl mx-auto py-16">
      <div
        class="grid md:grid-cols-2 gap-8 items-center border-2 border-[#00C853F2] rounded-3xl p-8 bg-gradient-to-br from-green-50 to-white"
      >
        <div class="rounded-2xl overflow-hidden">
          <img
            src="@/assets/images/about2.png"
            alt="Tennis players"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 class="text-4xl font-bold mb-6">{{ $t("ourvision") }}</h2>
          <p class="text-black mb-4 text-lg">
            {{ $t("aboutus5") }}
          </p>
          <p class="text-black">
            {{ $t("aboutus6") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl font-bold text-center mb-12">{{ $t("ourmission") }}</h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <!-- For Trainees -->
        <div class="bg-[#D9EEFF] rounded-2xl p-8">
          <img
            src="@/assets/images/about3.png"
            alt="For Trainees"
            class="w-[227] h-[151] rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-[#1351CD]">{{ $t("for trainees") }}</h3>
          <p class="text-black">
            {{ $t("aboutus7") }}
          </p>
        </div>

        <!-- For Trainers -->
        <div class="bg-[#D9EEFF] rounded-2xl p-8">
          <img
            src="@/assets/images/about4.png"
            alt="For Trainers"
            class="w-[227] h-[151] rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-[#1351CD]">{{ $t("for trainers") }}</h3>
          <p class="text-black">
            {{ $t("aboutus8") }}
          </p>
        </div>

        <!-- Overall -->
        <div class="bg-[#D9EEFF] rounded-2xl p-8">
          <img
            src="@/assets/images/about5.png"
            alt="Community"
            class="w-[227] h-[151] rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-[#1351CD]">{{ $t("Overall") }}</h3>
          <p class="text-black">
            {{ $t("aboutus9") }}
          </p>
        </div>
      </div>
    </section>

    <!-- What We Offer -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl font-bold text-center mb-12">{{ $t("aboutus10") }}</h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-[#B0F9CFF2] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about6.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold mb-2">{{ $t("aboutus11") }}</h3>
          <p class="text-sm text-black">
            {{ $t("aboutus12") }}
          </p>
        </div>

        <div class="bg-[#B0F9CFF2] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about7.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold mb-2">{{ $t("aboutus14") }}</h3>
          <p class="text-sm text-black">{{ $t("aboutus15") }}</p>
        </div>

        <div class="bg-[#B0F9CFF2] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about8.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold mb-2">{{ $t("aboutus16") }}</h3>
          <p class="text-sm text-black">{{ $t("aboutus17") }}</p>
        </div>

        <div class="bg-[#B0F9CFF2] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about9.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold mb-2">{{ $t("aboutus18") }}</h3>
          <p class="text-sm text-black">
            {{ $t("aboutus19") }}
          </p>
        </div>
      </div>
    </section>

    <!-- For Trainees & Trainers -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-[#D9EEFFC2] rounded-2xl p-12 text-center">
          <h2 class="text-3xl font-bold mb-6">{{ $t("for trainees") }}</h2>
          <p class="text-black mb-4">
            {{ $t("aboutus20") }}
          </p>
          <p class="text-black">
            {{ $t("aboutus21") }}
          </p>
        </div>

        <div class="bg-[#D9EEFFC2] rounded-2xl p-12 text-center">
          <h2 class="text-3xl font-bold mb-6">{{ $t("for trainers") }}</h2>
          <p class="text-black mb-4">
            {{ $t("aboutus22") }}
          </p>
          <p class="text-black">
            {{ $t("aboutus23") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Join Community -->
    <section class="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 class="text-4xl font-bold mb-6">
        {{ $t("jointhe") }}

        {{ $t("Community") }}
        <span class="bg-gradient-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent">{{
          $t("trainly")
        }}</span>
      </h2>
      <p class="text-black mb-2">{{ $t("aboutus24") }}</p>
      <p class="text-black mb-8">
        {{ $t("aboutus25") }}
      </p>
      <div class="flex justify-center">
        <router-link
          to="/signup"
          class="px-8 py-3 bg-gradient-to-r from-[#00C853] to-[#00B0FF] rounded-full text-lg font-semibold text-white hover:shadow-xl transition-shadow cursor-pointer flex justify-center items-center"
        >
          {{ $t("startnow") }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "TrainlyAbout",
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
