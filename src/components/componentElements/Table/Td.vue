<template>
  <span v-bind="$attrs" :class="$attrs.class">
    <SpinnerText>
      <abbr :title="abbr">
        <slot></slot>
      </abbr>
    </SpinnerText>
  </span>
</template>

<script setup>
import SpinnerText from '@/components/uiElements/SpinnerText.vue'
const props = defineProps({
  abbr: {
    type: String
  }
})
</script>

<style scoped>
span {
  white-space: nowrap;
  padding: 7px;
}

abbr {
  text-decoration: none;
}
</style>