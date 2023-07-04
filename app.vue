<template>
  <!-- DEFAULT LAYOUT. "/layouts/default.vue" -->
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <!-- MAIN PAGE -->
    <!-- "./pages/index.vue" -->
    <NuxtPage />
  </NuxtLayout>
</template>


<style>
/* Page animation */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>