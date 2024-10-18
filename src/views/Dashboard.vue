<template>
  <section>
    <Statistics ref="statistics" />
  </section>
</template>

<script setup>
import Statistics from '@/components/viewElements/Dashboard/Statistics.vue'
</script>

<style scoped>
section {
  position: absolute;
  inset: 47px 0 0 0;
  width: 100%;
  margin: 0 auto;
  padding: 7px;
  gap: 17px;
}
</style>