<template>
  <p v-bind="$attrs" :class="$attrs.class" :title="title">
    <slot></slot>
  </p>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  }
})
</script>

<style scoped>
p {
  white-space: nowrap;
  padding: 7px;
  white-space: pre-wrap;
}

p:first-of-type {
  padding-left: 17px;
}

p:last-of-type {
  padding-right: 17px;
}

abbr {
  text-decoration: none;
}
</style>