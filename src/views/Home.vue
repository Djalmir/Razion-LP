<template>
  <section @click="redirect" @touchstart="redirect">
    <div class="container">
      <div class="shadow"></div>
      <img :src="logo" alt="Razion">
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/main'

const router = useRouter()
const store = useStore()

const mousePos = ref({ x: undefined, y: undefined })
const mouseDown = ref(false)
const imgScale = computed(() => mouseDown.value ? .95 : 1)
const imgRotate = computed(() => {
  const { x, y } = mousePos.value
  const rotateX = ((y - window.innerHeight / 2) / window.innerHeight) * -30
  const rotateY = ((x - window.innerWidth / 2) / window.innerWidth) * 50
  return `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})
const logo = computed(() => store.darkTheme ? '/logo.svg' : '/white-logo.svg')

onMounted(() => {
  window.addEventListener('mousemove', updateMousePos)
  window.addEventListener('touchmove', updateMousePos)
  window.addEventListener('mousedown', () => mouseDown.value = true)
  window.addEventListener('mouseup', () => mouseDown.value = false)
  window.addEventListener('touchstart', () => mouseDown.value = true)
  window.addEventListener('touchend', () => mouseDown.value = false)
})

function updateMousePos(e) {
  mousePos.value = { x: e.touches ? e.touches[e.touches.length - 1].clientX : e.clientX, y: e.touches ? e.touches[e.touches.length - 1].clientY : e.clientY }
}

let clickCount = 0
let redirectTimer
function redirect() {
  clickCount++
  if (!redirectTimer) {
    redirectTimer = setTimeout(() => {
      if (clickCount >= 5) {
        router.push({ name: 'Dashboard' })
      }
      else {
        clearTimeout(redirectTimer)
        redirectTimer = null
        clickCount = 0
      }
    }, 600)
  }

}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updateMousePos)
  window.removeEventListener('touchmove', updateMousePos)
  window.removeEventListener('mousedown', () => mouseDown.value = true)
  window.removeEventListener('mouseup', () => mouseDown.value = false)
  window.removeEventListener('touchstart', () => mouseDown.value = true)
  window.removeEventListener('touchend', () => mouseDown.value = false)
})

</script>

<style scoped>
section {
  display: grid;
  place-items: center;
  min-height: 100vh;
  perspective: 1000px;
}

.container {
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  transform-style: preserve-3d;
  transform-origin: center center;
  transform: v-bind(imgRotate);
  position: relative
}

.shadow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 0 0 133px 33px var(--primary);
  animation: pulseShadow 2s ease-in-out infinite;
}

img {
  width: 60vw;
  max-width: 400px;
  max-height: 90vh;
  aspect-ratio: 1/1;
  filter: drop-shadow(var(--dark-box-shadow));
  transform: scale(v-bind(imgScale));
  transition: .1s;
}

@keyframes pulseShadow {
  0% {
    box-shadow: 0 0 133px 77px var(--primary);
  }

  50% {
    box-shadow: 0 0 333px 133px var(--primary);
  }

  100% {
    box-shadow: 0 0 133px 77px var(--primary);
  }
}
</style>