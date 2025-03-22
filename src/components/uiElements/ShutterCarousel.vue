<template>
  <ul type="none" ref="ul">
    <li v-for="slide, index in slides" @click="() => { if (currentSlide != index) goToSlide(index) }">
      <img :src="slide.src" :alt="slide.alt">
    </li>
  </ul>
  <transition name="awaitAndFade">
    <div class="legend">
      <a :href="slides[currentSlide].url" target="_blank">{{ slides[currentSlide].title }}</a>
      <p>{{ slides[currentSlide].description }}</p>
      <Button class="primary appAccessBtn" v-if="slides[currentSlide].url" @click="openLink(slides[currentSlide].url)">Acessar</Button>
      <Button class="primary appAccessBtn" v-else disabled>Em breve</Button>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import Button from '@/components/uiElements/Button.vue'

const ul = ref()
const props = defineProps({
  slides: {
    type: Array
  }
})

const currentSlide = ref(props.slides.length > 1 ? 1 : 0)
const templateColumns = computed(() => {
  return props.slides.map((s, index) => {
    return index === currentSlide.value ? '1fr' :
      index === currentSlide.value - 1 || index === currentSlide.value + 1 ? '.17fr' : '0fr'
  }).join(' ')
})
const slideTimer = ref()

onMounted(() => {
  resetTimer()
})

function openLink(url) {
  window.open(url, '_blank')
}

function goToSlide(index) {
  Array.from(ul.value.querySelectorAll('.legend')).map((legend) => {
    legend.style.display = 'none'
  })
  if (props.slides.length < 3) {
    currentSlide.value = index
    resetTimer()
  }
  else {
    if (index == 0) {
      ul.value.style.transition = 'none'
      props.slides.unshift(props.slides.pop())
      currentSlide.value = 2

      setTimeout(() => {
        ul.value.style.transition = ''
        index = 1
        currentSlide.value = index
      }, 0)
    }
    else if (index == ul.value.children.length - 1) {
      ul.value.style.transition = 'none'
      props.slides.push(props.slides.shift())
      currentSlide.value = ul.value.children.length - 3

      setTimeout(() => {
        ul.value.style.transition = ''
        index = ul.value.children.length - 2
        currentSlide.value = index
      }, 0)
    }
    else {
      currentSlide.value = index
    }
    resetTimer()
  }
  setTimeout(() => {
    Array.from(ul.value.querySelectorAll('.legend')).map((legend) => {
      legend.style.display = ''
    })
  }, 0)
}

function resetTimer() {
  clearInterval(slideTimer.value)
  slideTimer.value = setInterval(() => {
    if (currentSlide.value >= ul.value.children.length - 1)
      goToSlide(0)
    else
      goToSlide(currentSlide.value + 1)
  }, 7500)
}

onBeforeUnmount(() => {
  clearInterval(slideTimer.value)
})

</script>

<style scoped>
ul {
  display: grid;
  gap: 7px;
  grid-template-columns: v-bind(templateColumns);
  transition: .3s ease-in-out;
  height: 33vh;
  width: 100%;
  min-height: 220px;
  overflow: hidden;
}

@media (min-width: 720px) {
  ul {
    min-height: 310px;
    height: 50vh;
  }
}

@media (min-width: 1024px) {
  ul {
    min-height: 470px;
  }
}

li {
  position: relative;
  border-radius: .3rem;
  cursor: pointer;
  filter: drop-shadow(var(--dark-box-shadow));
  display: grid;
  place-items: center;
}

.light-theme li {
  filter: drop-shadow(var(--light-box-shadow));
}

img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: fit;
  z-index: -1;
  user-select: none;
  -webkit-user-drag: none;
}

.legend {
  width: 100%;
  padding: 7px 17px;
  /* background: var(--dark-bg1-transparent);
  border-top: 1px solid var(--primary);
  backdrop-filter: blur(20px); */
}

/* .light-theme .legend {
  background: var(--light-bg4-transparent);
  color: var(--light-font1);
} */

.legend a {
  display: block;
  margin: 0 0 7px 7px;
  font-size: 1.3rem;
  font-weight: bold;
  /* text-decoration: underline var(--secondary); */
  color: var(--dark-font2);
}

.light-theme .legend a {
  color: var(--light-font1);
}

.appAccessBtn {
  margin: 17px 0 0 auto;
  display: block;
  font-size: 1rem;
  padding: 3px 17px;
}

.awaitAndFade-leave-active,
.awaitAndFade-enter-active {
  transition: opacity .2s ease;
}

.awaitAndFade-enter-active {
  transition-delay: .3s;
}

.awaitAndFade-enter-from,
.awaitAndFade-leave-to {
  opacity: 0;
}
</style>