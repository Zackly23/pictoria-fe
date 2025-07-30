<script setup>
import { ref } from 'vue'

// List FAQ
const faqs = ref([
  {
    question: 'What is Pixovault?',
    answer:
      'Pixovault is a media hosting platform that helps you easily store, organize, and share your photos and videos in albums — fast, secure, and flexible.',
    open: false,
  },
  {
    question: 'How much storage do I get for free?',
    answer:
      'You get 5 GB of free storage when you sign up. Need more? Upgrade to Advanced (50 GB) or Enterprise (Unlimited).',
    open: false,
  },
  {
    question: 'What file formats are supported?',
    answer:
      'Pixovault supports all major image and video formats, including JPG, PNG, GIF, WebP, MP4, MOV, and more.',
    open: false,
  },
  {
    question: 'How long will my media be stored?',
    answer:
      'Your media is stored for as long as you want — as long as you access your account at least once every 90 days.',
    open: false,
  },
  {
    question: 'Can I control who sees my albums?',
    answer:
      'Yes! Pixovault gives you full control over album visibility. Choose between Public, Private, or Restricted (only specific emails you allow can view).',
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
