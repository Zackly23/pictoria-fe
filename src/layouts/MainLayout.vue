<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>
