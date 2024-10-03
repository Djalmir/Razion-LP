<template>
  <b @click="$emit('click')">
    {{ title }}
    <Icon class="chevron-up" :size="1.25" v-if="showChevron" />
  </b>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showChevron: {
    type: Boolean,
    default: false
  },
  chevronRotation: {
    type: String
  }
})

const emit = defineEmits(['click'])
const title = computed(() => props.title)
const showChevron = computed(() => props.showChevron)
const chevronRotation = computed(() => props.chevronRotation)
</script>

<style scoped>
b {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  justify-content: space-between;
}

b:not(:last-of-type) {
  border-right: 1px solid var(--light-font1);
}

.light-theme b:not(:last-of-type) {
  border-right: 1px solid var(--dark-font1);
}

b:active {
  filter: brightness(.5);
}

.chevron-up {
  transform: rotateX(v-bind(chevronRotation));
  transition: transform .2s;
}
</style>