<script setup>
import { ref } from 'vue'

const currentCategory = ref('Nature')
const categories = ref([
  'Nature',
  'Architecture',
  'Travel',
  'Food',
  'People',
  'Animals',
  'Technology',
])

const props = defineProps({
  currentCategory: {
    type: String,
    default: 'Nature',
  },
})

const emits = defineEmits(['change-category'])

const changeCurrentCategory = (cat) => {
  console.log('before : ')
  console.log('props : ', props.currentCategory)
  console.log('current category : ', currentCategory.value)
  console.log('')

  currentCategory.value = cat
  emits('change-category', cat)

  console.log('after : ')
  console.log('props : ', props.currentCategory)
  console.log('current category : ', currentCategory.value)
}
</script>

<template>
  <!-- Category pills -->
  <section class="container mx-auto px-4 py-4">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        class="px-4 py-1.5 rounded-full text-sm font-medium transition"
        :class="
          props.currentCategory === category
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        "
        @click="changeCurrentCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </section>
</template>
