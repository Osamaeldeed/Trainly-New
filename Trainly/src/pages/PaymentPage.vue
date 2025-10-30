<script>
export default {
  name: "PaymentPage",
};
</script>

<template>
  <section class="flex flex-col items-center justify-center min-h-screen bg-white">
    <div
      class="relative p-[4px] rounded-3xl bg-gradient-to-r from-green-500 to-sky-400 shadow-xl w-full max-w-2xl"
    >
      <div class="bg-white rounded-3xl p-12 text-center">
        <div class="flex justify-center mb-8">
          <img src="@/assets/images/success icon.png" alt="Success" class="w-28 h-28" />
        </div>

        <h1 class="text-4xl font-bold text-green-600 mb-3">Payment Successful!</h1>
        <p class="text-gray-800 mb-5 text-lg font-medium">
          Your payment has been completed successfully.
        </p>
        <p class="text-gray-500 mb-10 text-base">Click below to return to the home page.</p>

        <router-link
          to="/traineehome"
          class="cursor-pointer px-8 py-4 rounded-3xl bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white hover:opacity-90 transition text-xl font-semibold w-60 h-15"
        >
          Home Page
        </router-link>
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
