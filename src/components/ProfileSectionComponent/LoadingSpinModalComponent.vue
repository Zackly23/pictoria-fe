<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div
      class="bg-white/80 p-6 rounded-xl flex flex-col items-center shadow-2xl border border-gray-200"
    >
      <!-- Spinner cantik -->
      <div class="relative w-16 h-16">
        <div
          class="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"
        ></div>
        <div
          class="absolute inset-2 rounded-full border-4 border-t-transparent border-green-400 animate-[spin_1.5s_linear_infinite_reverse]"
        ></div>
      </div>

      <!-- Teks info -->
      <p class="mt-4 text-gray-800 font-semibold text-lg">Mengunggah Media...</p>
      <p class="text-gray-500 text-sm">Mohon tunggu, Album anda sedang disimpan</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
</script>
