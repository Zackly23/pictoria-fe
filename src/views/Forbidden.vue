<template>
  <div class="page-wrapper">
    <!-- Animated floating warning icons -->
    <div class="warning-elements">
      <div class="warning-element" v-for="(icon, i) in warningIcons" :key="i" v-text="icon"></div>
    </div>

    <!-- Moving barrier lines -->
    <div class="barrier-lines">
      <div class="barrier-line" v-for="n in 3" :key="n"></div>
    </div>

    <!-- Main content -->
    <div class="container">
      <div ref="lockIcon" class="lock-icon">🔒</div>
      <div class="error-code">403</div>
      <div class="error-message">Access Forbidden</div>
      <div class="error-description">
        You don't have permission to access this resource.
        This area is restricted and requires proper authorization to enter.
      </div>
      <!-- <div class="security-badge" @click="resetGlow">🛡️ SECURE ZONE</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const lockIcon = ref(null)
const warningIcons = ref(['⚠️', '🔒', '⛔', '🚫', '⚠️', '🔐'])

let intervalId

const resetGlow = (e) => {
  const el = e.target
  el.style.animation = 'none'
  setTimeout(() => {
    el.style.animation = 'glow 3s ease-in-out infinite alternate'
  }, 100)
}

const handleMouseMove = (e) => {
  if (!lockIcon.value) return
  const rect = lockIcon.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = (e.clientX - centerX) / 100
  const deltaY = (e.clientY - centerY) / 100
  lockIcon.value.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX}deg)`
}

const animateWarningIcons = () => {
  const icons = ['⚠️', '🔒', '⛔', '🚫', '🔐', '🚨']
  warningIcons.value = warningIcons.value.map(() =>
    Math.random() > 0.8 ? icons[Math.floor(Math.random() * icons.length)] : icons[~~(Math.random() * icons.length)]
  )
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  intervalId = setInterval(animateWarningIcons, 4000)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearInterval(intervalId)
})
</script>

<style scoped>
.page-wrapper {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff3838 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

/* Container styles */
.container {
  text-align: center;
  color: white;
  z-index: 10;
  position: relative;
}

.lock-icon {
  font-size: clamp(4rem, 10vw, 8rem);
  margin-bottom: 2rem;
  animation: shake 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
}

.error-code {
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: bold;
  line-height: 0.8;
  margin-bottom: 2rem;
  text-shadow: 0 10px 30px rgba(0,0,0,0.4);
  animation: pulse 2s ease-in-out infinite;
}

.error-message {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  opacity: 0.95;
  font-weight: 600;
}

.error-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin-bottom: 3rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Warning icons */
.warning-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.warning-element {
  position: absolute;
  color: rgba(255,255,255,0.1);
  font-size: 2rem;
  animation: float 4s ease-in-out infinite;
}
.warning-element:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
.warning-element:nth-child(2) { top: 70%; right: 15%; animation-delay: 1.5s; }
.warning-element:nth-child(3) { top: 85%; left: 25%; animation-delay: 3s; }
.warning-element:nth-child(4) { top: 25%; right: 25%; animation-delay: 2s; }
.warning-element:nth-child(5) { top: 50%; left: 5%; animation-delay: 4s; }
.warning-element:nth-child(6) { top: 40%; right: 8%; animation-delay: 0.5s; }

/* Scanning barrier lines */
.barrier-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.barrier-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  height: 2px;
  width: 100%;
  animation: scan 3s linear infinite;
}
.barrier-line:nth-child(1) { top: 20%; animation-delay: 0s; }
.barrier-line:nth-child(2) { top: 60%; animation-delay: 1s; }
.barrier-line:nth-child(3) { top: 80%; animation-delay: 2s; }

/* Badge */
.security-badge {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50px;
  padding: 10px 20px;
  margin-top: 2rem;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  animation: glow 3s ease-in-out infinite alternate;
}

/* Animations */
@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(-3deg); }
  20% { transform: rotate(3deg); }
  30% { transform: rotate(-3deg); }
  40% { transform: rotate(3deg); }
  50% { transform: rotate(0deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  33% { transform: translateY(-15px) rotate(120deg); opacity: 0.6; }
  66% { transform: translateY(-30px) rotate(240deg); opacity: 0.4; }
}

@keyframes scan {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes glow {
  from { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
  to   { box-shadow: 0 0 30px rgba(255,255,255,0.4); }
}
</style>
