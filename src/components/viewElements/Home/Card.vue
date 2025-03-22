<template>
  <div :class="`card ${url ? 'clickable' : ''}`" @click="url && accessLink()">
    <img :src="src" :alt="alt">
    <b v-if="title">{{ title }}</b>
    <p v-if="description">{{ description }}</p>
    <div class="cardTag" v-if="tagText">
      <b>{{ tagText }}</b>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from '@/components/uiElements/Button.vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  tagText: {
    type: String
  },
  tagClass: {
    type: String,
    default: 'secondary'
  }
})

const tagBackground = computed(() => {
  return `linear-gradient(145deg, var(--${props.tagClass}-light), var(--${props.tagClass}))`
})

const tagColor = computed(() => {
  let lightBackgrounds = ['success', 'secondary', 'neutral']
  return lightBackgrounds.includes(props.tagClass) ? 'var(--light-font1)' : 'var(--dark-font2)'
})

function accessLink() {
  window.open(props.url, '_blank')
}

</script>

<style scoped>
.card {
  flex: 1;
  min-width: 260px;
  position: relative;
  overflow: hidden;
  user-select: none;
  border-radius: .3rem;
  background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
  box-shadow: var(--dark-box-shadow);
  padding: 7px;
}

.card.clickable {
  cursor: pointer;
}

.light-theme .card {
  background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
  box-shadow: var(--light-box-shadow);
}

.card.clickable:hover {
  filter: brightness(1.1);
  box-shadow: var(--hover-dark-box-shadow);
}

.light-theme .card.clickable:hover {
  box-shadow: var(--hover-light-box-shadow);
}

.card.clickable:active {
  filter: brightness(.9);
  box-shadow: var(--inset-dark-box-shadow);
}

.light-theme .card.clickable:active {
  box-shadow: var(--inset-light-box-shadow);
}

.card img {
  display: block;
  max-width: 320px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  border-radius: .3rem;
  -webkit-user-drag: none;
  pointer-events: none;
}

.card b {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 7px;
  text-align: center;
}

.card p {
  margin: 0 7px 7px;
  text-align: center;
  font-size: .95rem;
}

.cardTag {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  border-radius: .3rem;
  background: v-bind(tagBackground);
  color: v-bind(tagColor);
  box-shadow: var(--dark-box-shadow);
  display: grid;
  place-items: center;
  transform: translate(36%, 130%) rotate(45deg);
}

.light-theme .cardTag {
  box-shadow: var(--light-box-shadow);
}

.cardTag b {
  user-select: none;
  font-size: .8rem;
  margin: auto;
}
</style>