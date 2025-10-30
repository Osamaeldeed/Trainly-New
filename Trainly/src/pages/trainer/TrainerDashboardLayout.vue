<template>
  <div class="flex">
    <SideBar />

    <div class="flex-1 lg:ml-64 p-10 min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
    export default {
        name: "TrainerDashboardLayout",

    }
</script>

<style scoped>

</style>
