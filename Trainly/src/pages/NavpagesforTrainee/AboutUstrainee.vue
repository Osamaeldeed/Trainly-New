 <template>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Hero Section - About Trainly -->
    <section class="max-w-6xl mx-auto py-11">
      <div
        class="grid md:grid-cols-2 gap-0 items-center border-2 border-[#0D8BF2] rounded-3xl overflow-hidden bg-white dark:bg-[#3B3B3B]"
      >
        <div class="p-6">
          <h1 class="text-4xl text-black dark:text-white font-bold mb-4">
            {{ $t("about1") }}
            <span
              class="bg-linear-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent"
              >{{ $t("trainly") }}</span
            >
          </h1>
          <p class="text-lg text-black dark:text-white font-semibold mb-4">
            {{ $t("empowering") }}
          </p>
          <p class="text-black dark:text-white mb-4">
            {{ $t("aboutus1") }}
          </p>
          <p class="text-black dark:text-white mb-4">
            {{ $t("aboutus2") }}
          </p>
          <p class="text-black dark:text-white">
            {{ $t("aboutus3") }}
          </p>
        </div>
        <div class="md:h-full">
          <img
            src="@/assets/images/about1.png"
            alt="Fitness trainer"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="max-w-6xl mx-auto py-16">
      <div
        class="grid md:grid-cols-2 gap-0 items-center border-2 border-[#00C853F2] rounded-3xl overflow-hidden bg-white dark:bg-[#3B3B3B]"
      >
        <div class="md:h-full">
          <img
            src="@/assets/images/about2.png"
            alt="Tennis players"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-8">
          <h2 class="text-4xl text-black dark:text-white font-bold mb-6">{{ $t("ourvision") }}</h2>
          <p class="text-black dark:text-white mb-4 text-lg">
            {{ $t("aboutus5") }}
          </p>
          <p class="text-black dark:text-white">
            {{ $t("aboutus6") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl text-black dark:text-white font-bold text-center mb-12">
        {{ $t("ourmission") }}
      </h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <!-- For Trainees -->
        <div class="bg-[#D9EEFF] dark:bg-[#3B3B3B] rounded-2xl p-8">
          <img
            src="@/assets/images/about3.png"
            alt="For Trainees"
            class="w-[227] h-[151] rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-[#1351CD]">{{ $t("for trainees") }}</h3>
          <p class="text-black dark:text-white">
            {{ $t("aboutus7") }}
          </p>
        </div>

        <!-- For Trainers -->
        <div class="bg-[#D9EEFF] dark:bg-[#3B3B3B] rounded-2xl p-8">
          <img
            src="@/assets/images/about4.png"
            alt="For Trainers"
            class="w-[227] h-[151] rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-[#1351CD]">{{ $t("for trainers") }}</h3>
          <p class="text-black dark:text-white">
            {{ $t("aboutus8") }}
          </p>
        </div>

        <!-- Overall -->
        <div class="bg-[#D9EEFF] dark:bg-[#3B3B3B] rounded-2xl p-8">
          <img
            src="@/assets/images/about5.png"
            alt="Community"
            class="w-[227] h-[151] rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold mb-2 text-[#1351CD]">{{ $t("Overall") }}</h3>
          <p class="text-black dark:text-white">
            {{ $t("aboutus9") }}
          </p>
        </div>
      </div>
    </section>

    <!-- What We Offer -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl text-black dark:text-white font-bold text-center mb-12">
        {{ $t("aboutus10") }}
      </h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-[#B0F9CFF2] dark:bg-[#3B3B3B] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about6.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold text-black dark:text-white mb-2">{{ $t("aboutus11") }}</h3>
          <p class="text-sm text-black dark:text-white">
            {{ $t("aboutus12") }}
          </p>
        </div>

        <div class="bg-[#B0F9CFF2] dark:bg-[#3B3B3B] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about7.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold text-black dark:text-white mb-2">{{ $t("aboutus14") }}</h3>
          <p class="text-sm text-black dark:text-white">{{ $t("aboutus15") }}</p>
        </div>

        <div class="bg-[#B0F9CFF2] dark:bg-[#3B3B3B] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about8.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold text-black dark:text-white mb-2">{{ $t("aboutus16") }}</h3>
          <p class="text-sm text-black dark:text-white">{{ $t("aboutus17") }}</p>
        </div>

        <div class="bg-[#B0F9CFF2] dark:bg-[#3B3B3B] rounded-2xl p-6 text-center">
          <img
            src="@/assets/images/about9.png"
            alt="For Trainers"
            class="w-12 h-12 rounded-full mx-auto mb-4"
          />
          <h3 class="font-bold text-black dark:text-white mb-2">{{ $t("aboutus18") }}</h3>
          <p class="text-sm text-black dark:text-white">
            {{ $t("aboutus19") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Meet Our Team -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-4xl text-black dark:text-white font-bold text-center mb-4">{{ $t("meetourteam") }}</h2>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-8">{{ $t("meetourteamdesc") }}</p>

      <div class="flex flex-wrap justify-center gap-4">
        <div
          v-for="member in teamMembers"
          :key="member.name"
          class="bg-white dark:bg-[#3B3B3B] rounded-2xl p-4 border border-gray-200 shadow-sm w-[200px] text-center"
        >
          <img
            :src="getImageUrl(member.img)"
            :alt="member.name"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 class="text-lg font-semibold text-black dark:text-white">{{ member.name }}</h3>
        </div>
      </div>
    </section>

    <!-- For Trainees & Trainers -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-[#D9EEFFC2] dark:bg-[#3B3B3B] rounded-2xl p-12 text-center">
          <h2 class="text-3xl text-black dark:text-white font-bold mb-6">
            {{ $t("for trainees") }}
          </h2>
          <p class="text-black dark:text-white mb-4">
            {{ $t("aboutus20") }}
          </p>
          <p class="text-black dark:text-white">
            {{ $t("aboutus21") }}
          </p>
        </div>

        <div class="bg-[#D9EEFFC2] dark:bg-[#3B3B3B] rounded-2xl p-12 text-center">
          <h2 class="text-3xl text-black dark:text-white font-bold mb-6">
            {{ $t("for trainers") }}
          </h2>
          <p class="text-black dark:text-white mb-4">
            {{ $t("aboutus22") }}
          </p>
          <p class="text-black dark:text-white">
            {{ $t("aboutus23") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Join Community -->
    <section class="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 class="text-black dark:text-white text-4xl font-bold mb-6">
        {{ $t("jointhe") }}

        {{ $t("Community") }}
        <span class="bg-linear-to-r from-[#00C853] to-[#00B0FF] bg-clip-text text-transparent">{{
          $t("trainly")
        }}</span>
      </h2>
      <p class="text-black dark:text-white mb-2">{{ $t("aboutus24") }}</p>
      <p class="text-black dark:text-white mb-8">
        {{ $t("aboutus25") }}
      </p>
      <div class="flex justify-center">
        <router-link
          to="/signup"
          class="px-8 py-3 bg-linear-to-r from-[#00C853] to-[#00B0FF] rounded-full text-lg font-semibold text-white hover:shadow-xl transition-shadow cursor-pointer flex justify-center items-center"
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
  data() {
    return {
      teamMembers: [
        // Developers only: name + image filename. Replace img with your file in src/assets/images/
        { name: "Osama Eldeeb", img: "osama.jpg" },
        { name: "Bassam Khaled", img: "bassam.jpg" },
        { name: "Ganna Ayman", img: "ganna.jpeg" },
        { name: "Arwa Rabie", img: "arwa.png" },
        { name: "Maryam Hassan", img: "maryam.jpg" },
      ],
    };
  },
  methods: {
    getImageUrl(filename) {
      // Use public folder for team member images
      return `/images/${filename}`;
    },
  },
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
