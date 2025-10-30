<script>
export default {
  name: "ForgetPassword1",
};
</script>


<template>
  <section class="flex min-h-screen justify-center items-center bg-white relative overflow-hidden">
    <div class="flex w-full h-full">

      <!-- الصورة الجانبية (للكبير فقط) -->
      <div class="hidden lg:flex w-[45%] h-screen items-center justify-center">
        <img
          src="@/assets/images/pic3.jpg"
          alt="Payment Illustration"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- الصورة الخلفية في التابلت -->
      <div class="absolute inset-0 hidden md:flex lg:hidden">
        <img
          src="@/assets/images/pic3.jpg"
          alt="Background"
          class="w-full h-full object-cover blur-md brightness-75"
        />
      </div>

      <!-- العمود اللي فيه اللوجو والفورم -->
      <div class="flex flex-col w-full justify-center lg:w-2/3 relative z-10">

        <!-- اللوجو -->
        <div class="hidden lg:flex ml-13 mb-5">
          <img
            src="@/assets/images/Project LOGO.png"
            alt="Project Logo"
            class="w-40 h-13 mx-10"
          />
        </div>

        <!-- الفورم -->
        <div
          class="relative w-4/5 mx-auto flex flex-col items-center justify-center
          bg-transparent md:bg-white lg:bg-transparent
          md:rounded-3xl p-8 md:p-10 text-center"
        >
          <div class="w-full">
            <div class="flex justify-center">
              <img
                src="@/assets/images/reset pass icon.png"
                alt="Reset Password"
                class="w-17 h-17"
              />
            </div>

            <form action="">
              <h1 class="text-2xl font-bold text-black-600 mb-3 mt-5">
                {{ $t('forgotPasswordTitle') }}
              </h1>

              <p class="text-gray-900 mb-5 font-normal">
                {{ $t('forgotPasswordDesc') }}
              </p>

              <input
                type="email"
                :placeholder="$t('forgotPasswordPlaceholder')"
                class="border border-gray-300 rounded-2xl px-4 py-3 mb-6 w-[70%] mx-auto focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <br />

              <button
                @click="$router.push('/forgetpassword2')"
                type="submit"
                class="cursor-pointer px-10 py-1 rounded-4xl bg-gradient-to-r from-[#00C853] to-[#00B0FF] text-white hover:opacity-90 transition text-lg font-semibold w-[45%] h-12 mb-5"
              >
                {{ $t('submitButton') }}
              </button>
            </form>

            <router-link to="/login" class="text-gray-600">
              {{ $t('backToLogin') }}
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
