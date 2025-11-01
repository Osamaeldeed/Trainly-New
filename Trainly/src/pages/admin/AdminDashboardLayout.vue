<template>
  <div class="flex">
    <!-- Sidebar -->
    <SideBarAdmin />

    <!-- Main content -->
    <div class="flex-1 lg:ml-48 p-10 min-h-screen bg-white">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBarAdmin from "@/components/SideBarAdmin.vue";

export default {
  name: "AdminDashboardLayout",
  components: { SideBarAdmin },
};
</script>

<style scoped>
</style>
