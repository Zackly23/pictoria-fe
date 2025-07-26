<script setup>
import HeroSectionComponent from '@/components/HomeComponent/HeroSectionComponent.vue'
import FeatureSectionComponent from '@/components/HomeComponent/FeatureSectionComponent.vue'
import ImageUploadSectionComponent from '@/components/HomeComponent/ImageUploadSectionComponent.vue'
import PopularImageSectionComponent from '@/components/HomeComponent/PopularImageSectionComponent.vue'
import GallerySectionComponent from '@/components/HomeComponent/GallerySectionComponent.vue'
// import TestimonialSectionComponent from '@/components/HomeComponent/TestimonialSectionComponent.vue'
import FAQSectionComponent from '@/components/HomeComponent/FAQSectionComponent.vue'
</script>

<template>
  <!-- Hero Section -->
  <HeroSectionComponent />

  <!-- Features Section -->
  <FeatureSectionComponent />

  <!-- Popular Images Section -->
  <PopularImageSectionComponent />

  <!-- Upload Section -->
  <ImageUploadSectionComponent />

  <!-- Gallery Section -->
  <GallerySectionComponent />

  <!-- Testimonials Section -->
  <!-- <TestimonialSectionComponent /> -->
  <!-- FAQ  -->
  <FAQSectionComponent />
</template>
