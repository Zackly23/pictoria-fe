<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const errorCode = ref(null)

function handleMouseMove(e) {
  if (!errorCode.value) return
  const rect = errorCode.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const deltaX = (e.clientX - centerX) / 50
  const deltaY = (e.clientY - centerY) / 50

  errorCode.value.style.transform = `translate(${deltaX}px, ${deltaY}px)`
}

function updateFloatingColors() {
  const elements = document.querySelectorAll('.floating-element')
  elements.forEach((el) => {
    const hue = Math.random() * 360
    el.style.background = `hsla(${hue}, 50%, 70%, 0.1)`
  })
}

let intervalId

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  intervalId = setInterval(updateFloatingColors, 3000)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearInterval(intervalId)
})
</script>

<template>
  <div class="main-container">
  <div class="floating-elements ">
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <div class="floating-element"></div>
  </div>

  <div class="container">
    <div ref="errorCode" class="error-code">404</div>
    <div class="error-message">Oops! Page Not Found</div>
    <div class="error-description">
      The page you're looking for seems to have vanished into the digital void. It might have been
      moved, deleted, or perhaps it never existed at all.
    </div>
  </div>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-container {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.container {
  text-align: center;
  color: white;
  z-index: 10;
  position: relative;
}

.error-code {
  font-size: clamp(8rem, 20vw, 15rem);
  font-weight: bold;
  line-height: 0.8;
  margin-bottom: 2rem;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: glitch 2s infinite;
}

.error-message {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.error-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin-bottom: 3rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.floating-element:nth-child(1) {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-element:nth-child(2) {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.floating-element:nth-child(3) {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.floating-element:nth-child(4) {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0.8;
  }
}

@keyframes glitch {
  0% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  10% {
    transform: translate(-2px, 2px);
    filter: hue-rotate(90deg);
  }
  20% {
    transform: translate(-4px, -2px);
    filter: hue-rotate(180deg);
  }
  30% {
    transform: translate(4px, 2px);
    filter: hue-rotate(270deg);
  }
  40% {
    transform: translate(2px, -2px);
    filter: hue-rotate(360deg);
  }
  50% {
    transform: translate(-2px, 2px);
    filter: hue-rotate(0deg);
  }
  60% {
    transform: translate(-4px, -2px);
    filter: hue-rotate(90deg);
  }
  70% {
    transform: translate(4px, 2px);
    filter: hue-rotate(180deg);
  }
  80% {
    transform: translate(-2px, -2px);
    filter: hue-rotate(270deg);
  }
  90% {
    transform: translate(2px, 2px);
    filter: hue-rotate(360deg);
  }
  100% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
}
</style>
