<script setup>
import { ref } from 'vue'

// List FAQ
const faqs = ref([
  {
    question: "What is imgPID.id's free image hosting service?",
    answer:
      "imgPID.id is a free image hosting service that allows you to upload, store, and share images online. We provide direct links, embed codes, and various image sizes for your uploaded images.",
    open: false,
  },
  {
    question: 'Is there a limit to how many images I can upload?',
    answer:
      'No, there are no limits on the number of images you can upload. You can upload as many images as you need, completely free.',
    open: false,
  },
  {
    question: 'What image formats are supported?',
    answer:
      'We support all popular image formats including JPEG, PNG, GIF, WebP, BMP, and TIFF. Maximum file size is 32MB per image.',
    open: false,
  },
  {
    question: 'How long will my images be stored?',
    answer:
      'Images uploaded to imgPID.id are stored permanently. We do not delete images unless they violate our terms of service.',
    open: false,
  },
])

// Toggle logic
const toggleFAQ = (index) => {
  faqs.value = faqs.value.map((faq, i) => ({
    ...faq,
    open: i === index ? !faq.open : false,
  }))
}
</script>

<template>
  <section class="bg-gray-100 py-12 md:py-16">
    <div class="container">
      <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>

      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <button class="faq-question" @click="toggleFAQ(index)">
          {{ faq.question }}
          <span>{{ faq.open ? '−' : '+' }}</span>
        </button>
        <div class="faq-answer" v-show="faq.open">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 12px;
}

.faq-item {
  background: white;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.faq-question {
  padding: 1.25rem;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  padding: 0 1.25rem 1rem;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>
