<template>
  <header class="header">
    <p v-if="kicker" class="kicker">{{ kicker }}</p>
    <h2 class="title">{{ title }}</h2>
    <p v-if="description" class="description">{{ description }}</p>
  </header>
</template>

<script setup>
defineProps({
  kicker: { type: String, default: null },
  title: { type: String, required: true },
  description: { type: String, default: null }
})
</script>

<style scoped>
.header {
  margin: 2rem 0;
}

.kicker {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--font2);
  margin-bottom: 0.4rem;
}

.title {
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--font2);
  margin-bottom: 0.8rem;
}

.description {
  font-size: 1rem;
  color: var(--font1);
  line-height: 1.6;
}
</style>
