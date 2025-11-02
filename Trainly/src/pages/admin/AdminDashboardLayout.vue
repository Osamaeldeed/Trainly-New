<template>
  <div class="flex">
    <SideBarAdmin />

    <div class="flex-1 lg:ml-64 p-10 min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
    export default {
        name: "AdminDashboardLayout",

    }
</script>

<style scoped>
</style>
