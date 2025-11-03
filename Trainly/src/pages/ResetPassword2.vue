<script>
export default {
  name: "ResetPassword2",
};
</script>

<template>
  <section class="flex justify-center bg-white">
    <div class="flex w-full h-full overflow-hidden">
      <!-- الصورة -->
      <div class="w-[40%] h-full flex items-center justify-center bg-gray-100">
        <img
          src="@/assets/images/pic4.png"
          alt="Payment Illustration"
          class="w-full h-screen object-cover"
        />
      </div>

      <!-- النصوص -->
      <div class="w-[60%] h-full flex flex-col">
        <div class="flex ml-18">
          <img
            src="@/assets/images/Project LOGO.png"
            alt="Project Logo"
            class="w-40 h-13 mb-15 mt-7"
          />
        </div>

        <div
          class="relative p-[4px] rounded-3xl bg-linear-to-r from-green-500 to-sky-400 shadow-xl w-4/5 h-[60vh] flex mx-auto"
        >
          <div class="bg-white rounded-3xl p-10 text-center w-full h-full overflow-auto pb-1">
            <div class="flex justify-center">
              <img src="@/assets/images/success icon.png" alt="Success" class="w-30 h-30" />
            </div>

            <!-- النصوص المترجمة -->
            <h1 class="text-2xl font-bold text-black-600 mb-7 mt-10">
              {{ $t("passwordResetSuccess") }}
            </h1>

            <router-link to="/">
              <button
                type="submit"
                class="cursor-pointer px-10 py-1 rounded-4xl bg-linear-to-r from-green-500 to-sky-400 text-white hover:opacity-90 transition text-lg font-semibold w-60 h-12 mb-5"
              >
                {{ $t("login") }}
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
:root {
  --primary: #00c853;
  --secondry: #00b0ffb2;
}
</style>
