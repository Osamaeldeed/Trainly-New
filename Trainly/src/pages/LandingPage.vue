<template>
 <div>
  <section
    class="relative w-full h-[450px] md:h-[600px] lg:h-[796px] max-w-full mx-auto overflow-visible mt-1 bg-sec1-sm"
  >
    <div class="flex md:px-[70px] h-full justify-between">
      <div
        class="flex-1 pt-8 flex flex-col items-center md:items-start md:justify-start relative z-10 mt-13"
      >
        <h1 class="text-3xl lg:text-5xl font-bold mt-0 lg:mt-10">
          {{ $t("welcomeTitle") }} <span class="text-gradient">{{ $t("trainly") }}</span>
        </h1>
        <h2 class="text-xl lg:text-2xl tracking-wide lg:tracking-widest mt-3">
          {{ $t("yourJourney") }}
        </h2>
        <h2 class="text-2xl lg:text-4xl font-medium mt-0 md:mt-3 text-gradient">
          {{ $t("findTrainer") }}
        </h2>

        <p class="text-sm text-center md:text-left lg:text-xl mt-4 mb-2">
          {{ $t("description1") }}<br />
          {{ $t("description2") }}
        </p>
        <button
          @click="$router.push('/signup')"
          class="mt-6 px-6 py-1 lg:py-1 cursor-pointer rounded-3xl bg-primary text-white hover:opacity-90 transition text-lg md:text-2xl font-light lg:font-medium md:w-60 md:h-12 w-[40%]"
        >
          {{ $t("startJourney") }}
        </button>
      </div>

      <div class="hidden md:flex relative overflow-hidden md:flex-1 md:mt-[225px] lg:mt-[10px]">
        <div class="absolute"></div>
        <img
          src="@/assets/images/pic1.png"
          alt="Trainer Image"
          class="w-full h-full object-contain relative z-10"
        />
      </div>
    </div>

    <div class="hidden absolute bottom-0 left-0 w-full lg:flex justify-center z-30">
      <img
        src="@/assets/images/Rectangle1.png"
        alt=""
        class="w-full object-cover translate-y-1/2"
      />
    </div>
  </section>

  <section
    class="relative max-w-full pb-10 md:pb-0 h-auto md:h-[650px] lg:h-[796px] mx-auto overflow-hidden mt-0 lg:mt-10 bg-sec2-sm md:bg-sec2"
  >
    <div class="flex h-full">
      <div class="hidden lg:flex flex-1 relative">
        <div class="absolute inset-0"></div>
        <img
          src="@/assets/images/pic2.png"
          alt="Trainer Image"
          class="w-full h-full object-contain relative z-10"
        />
      </div>
      <div
        class="flex-1 px-[10px] pt-10 flex flex-col items-center relative z-10 mt-0 lg:mt-10 mx-auto"
      >
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-1 md:mt-10">
          {{ $t("whyChoose") }} <span class="text-gradient">{{ $t("trainly") }}</span>{{ $t("questionMark") }}
        </h1>
        <p class="text-sm text-center lg:text-xl mt-4 mb-7">
          {{ $t("whyChooseDesc1") }} <br />
          {{ $t("whyChooseDesc2") }}
        </p>
        <div class="grid grid-cols-2 md:grid-cols-2 gap-5 w-[60%] md:w-[70%] lg:w-[80%]">
          <!-- Card 1 -->
          <div
            class="bg-[#C3F7E3] rounded-2xl p-3 md:p-4 shadow-md flex flex-col md:gap-2 h-[200px]"
          >
            <img
              src="@/assets/images/octicon_goal-16.png"
              alt="icon"
              class="align-left w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 mt-1"
            />
            <div>
              <h3 class="font-semibold text-[12px] md:text-[17px] mb-1 leading-tight">
                {{ $t("personalizedTrainingTitle") }}
              </h3>
              <p class="text-[10px] md:text-[15px] text-gray-900 leading-snug">
                {{ $t("personalizedTrainingDesc") }}
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-[#C3F7E3] rounded-2xl p-3 md:p-4 shadow-md flex flex-col gap-2 h-[200px]">
            <img
              src="@/assets/images/Vector-1.png"
              alt="icon"
              class="align-left w-4 h-4 md:w-8 md:h-8 mt-1"
            />
            <div>
              <h3 class="font-semibold text-[12px] md:text-[17px] mb-1 leading-tight">
                {{ $t("certifiedTrainersTitle") }}
              </h3>
              <p class="text-[10px] md:text-[15px] text-gray-900 leading-snug">
                {{ $t("certifiedTrainersDesc") }}
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-[#C3F7E3] rounded-2xl p-3 md:p-4 shadow-md flex flex-col gap-2 h-[200px]">
            <img
              src="@/assets/images/Vector2.png"
              alt="icon"
              class="align-left w-4 h-4 md:w-8 md:h-8 mt-1"
            />
            <div>
              <h3 class="font-semibold text-[12px] md:text-[17px] mb-1 leading-tight">
                {{ $t("flexibleSchedulingTitle") }}
              </h3>
              <p class="text-[10px] md:text-[15px] text-gray-900 leading-snug">
                {{ $t("flexibleSchedulingDesc") }}
              </p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="bg-[#C3F7E3] rounded-2xl p-3 md:p-4 shadow-md flex flex-col gap-2 h-[200px]">
            <img
              src="@/assets/images/solar_cup-bold.png"
              alt="icon"
              class="align-left w-4 h-4 md:w-8 md:h-8 mt-1"
            />
            <div>
              <h3 class="font-semibold text-[12px] md:text-[17px] mb-1 leading-tight">
                {{ $t("progressTrackingTitle") }}
              </h3>
              <p class="text-[10px] md:text-[15px] text-gray-900 leading-snug">
                {{ $t("progressTrackingDesc") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden absolute -bottom-13 pt-[300px] left-0 w-full lg:flex justify-center z-30">
      <img
        src="@/assets/images/Rectangle2.png"
        alt=""
        class="w-full object-cover translate-y-1/2"
      />
    </div>
  </section>

  <section class="relative bg-white pb-[30px] lg:pb-[100px] pt-20 overflow-hidden">
    <h2 class="text-3xl font-[600] mb-6 text-center">{{ $t("featureTitle") }}</h2>

    <div
      class="flex flex-wrap justify-center md:justify-evenly items-center gap-5 text-center mx-auto"
    >
      <!-- Feature Card 1 -->
      <div class="features-card">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-[35%] h-[15%] mb-2 mt-6"
            src="@/assets/images/card-1.png"
            alt="card image"
          />
          <h5 class="mb-1 text-[15px] md:text-[20px] font-[700] text-[#1351CD] leading-[150%]">
            {{ $t("feature1Title") }}
          </h5>
          <p
            class="text-[15px] lg:text-[17px] text-[#000000] font-[350] leading-[150%] text-center"
          >
            {{ $t("feature1Desc") }}
          </p>
        </div>
      </div>

      <!-- Feature Card 2 -->
      <div class="features-card">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-[35%] h-[15%] mb-2 mt-6"
            src="@/assets/images/card-2.png"
            alt="card image"
          />
          <h5 class="mb-1 text-[15px] md:text-[20px] font-[700] text-[#1351CD] leading-[150%]">
            {{ $t("feature2Title") }}
          </h5>
          <p
            class="text-[15px] lg:text-[17px] text-[#000000] font-[350] leading-[150%] text-center"
          >
            {{ $t("feature2Desc") }}
          </p>
        </div>
      </div>

      <!-- Feature Card 3 -->
      <div class="features-card">
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-[35%] h-[15%] mb-2 mt-6"
            src="@/assets/images/card-3.png"
            alt="card image"
          />
          <h5 class="mb-1 text-[15px] md:text-[20px] font-[700] text-[#1351CD] leading-[150%]">
            {{ $t("feature3Title") }}
          </h5>
          <p
            class="text-[15px] lg:text-[17px] text-[#000000] font-[350] leading-[150%] text-center"
          >
            {{ $t("feature3Desc") }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section
    class="bg-[#8CDAFE99] w-full h-[570px] md:h-[772px] lg:h-[795px] md:pt-[20px] lg:pt-[100px]"
  >
    <h2 class="text-[30px] lg:text-[45px] font-[600] text-center mb-17 pt-10 md:pt-0">
      {{ $t("howItWorks") }}
    </h2>

    <div class="relative flex flex-col items-center w-full mx-auto">
      <div
        class="absolute top-[-40px] bottom-[-40px] w-[4px] bg-gradient-to-b from-[#00C853F2] to-[#0D8BF2] h-[456px] md:h-[680px] lg:h-[600px]"
      ></div>

      <!-- Step 1 -->
      <div class="relative flex items-center md:mb-17 w-full px-[5%] md:px-[10%]">
        <div class="w-1/2 text-end md:pe-12 pe-7">
          <h3 class="text-md md:text-xl font-semibold">{{ $t("step1Title") }}</h3>
          <p class="text-gray-700 leading-[150%] text-[13px] md:text-[17px]">
            {{ $t("step1Desc") }} <br />
            {{ $t("step1Desc2") }}
          </p>
        </div>
        <div class="img-box">
          <img src="@/assets/images/user.png" alt="icon" />
        </div>
        <div class="w-1/2"></div>
      </div>

      <!-- Step 2 -->
      <div class="relative flex items-center md:mb-17 w-full px-[5%] md:px-[10%]">
        <div class="w-1/2"></div>
        <div class="img-box">
          <img src="@/assets/images/search.png" alt="icon" />
        </div>
        <div class="w-1/2 ps-7 md:ps-12">
          <h3 class="text-md md:text-xl font-semibold">{{ $t("step2Title") }}</h3>
          <p class="text-gray-700 leading-[150%] text-[13px] md:text-[17px]">
            {{ $t("step2Desc") }} <br />
            {{ $t("step2Desc2") }}
          </p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="relative flex items-center md:mb-17 mb-2 w-full px-[5%] md:px-[10%]">
        <div class="w-1/2 text-end md:pe-12 pe-7">
          <h3 class="text-md md:text-xl font-semibold">{{ $t("step3Title") }}</h3>
          <p class="text-gray-700 leading-[150%] text-[13px] md:text-[17px]">
            {{ $t("step3Desc") }}
            <br />
            {{ $t("step3Desc2") }}
          </p>
        </div>
        <div class="img-box">
          <img src="@/assets/images/vector-step3.png" alt="icon" />
        </div>
        <div class="w-1/2"></div>
      </div>

      <!-- Step 4 -->
      <div class="relative flex items-center md:mb-17 w-full px-[5%] md:px-[10%]">
        <div class="w-1/2"></div>
        <div class="img-box">
          <img src="@/assets/images/cup.png" alt="icon" />
        </div>
        <div class="w-1/2 ps-8 md:ps-12">
          <h3 class="text-md md:text-xl font-semibold">{{ $t("step4Title") }}</h3>
          <p class="text-gray-700 leading-[150%] text-[13px] md:text-[17px]">
            {{ $t("step4Desc") }}
            <br />
            {{ $t("step4Desc2") }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section>
    <div class="flex flex-col justify-center items-center mt-20">
      <h5 class="font-[600] text-[20px] md:text-[30px] mb-3">
        {{ $t("readyTitle") }}
      </h5>
      <p class="font-[400] text-[14px] md:text-[16px] mb-8 md:text-left text-center">
        {{ $t("readyDesc") }}
      </p>
      <router-link
        to="/signup"
        class="mb-10 w-[40%] md:w-60 h-10 md:h-15 rounded-3xl bg-primary text-white hover:opacity-90 transition md:text-xl font-medium cursor-pointer flex justify-center items-center"
      >
        {{ $t("getStarted") }}
      </router-link>
    </div>
  </section>
</div>
</template>

<style>
:root {
  --primary: #00c853;
  --secondry: #00b0ffb2;
  --third: #ffffff;
  --fourth: #7ae2a5f2;
}

.bg-primary {
  background: linear-gradient(to right, var(--primary), var(--secondry));
}

.bg-sec1 {
  background-image: linear-gradient(
    to left,
    var(--secondry) 0%,
    var(--secondry) 20%,
    var(--third) 60%
  );
}
.bg-sec1-sm {
  background-image: linear-gradient(
    to top,
    var(--secondry) 0%,
    var(--secondry) 20%,
    var(--third) 60%
  );
}
.bg-sec1-md {
  background-image: linear-gradient(
    to left,
    var(--secondry) 0%,
    var(--secondry) 20%,
    var(--third) 60%
  );
}

.bg-sec2 {
  background: linear-gradient(to right, var(--fourth) 0%, var(--fourth) 20%, var(--third) 60%);
}
.bg-sec2-sm {
  background: linear-gradient(to top, var(--fourth) 0%, var(--fourth) 5%, var(--third) 50%);
}

.text-gradient {
  background: linear-gradient(to right, var(--primary), var(--secondry));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script>
export default {
  name: "LandingPage",
};
</script>
