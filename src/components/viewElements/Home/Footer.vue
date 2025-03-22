<template>
  <footer>
    <div id="footerWrapper">
      <div>
        <RouterLink :to="{ name: 'Terms' }" target="_blank">Termos de uso</RouterLink><br />
      </div>
      <div style="text-align: center;">
        {{ currentYear }} &copy; Razion
      </div>
      <div style="text-align: right;">
        <RouterLink :to="{ name: 'Privacy' }" target="_blank">Politica de Privacidade</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
footer {
  padding: 17px 17px 7px;
  background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
  box-shadow: 0 0 7px #000000d0;
}

.light-theme footer {
  background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
  box-shadow: 0 0 7px #00000080;
}

#footerWrapper {
  width: 90vw;
  max-width: 1024px;
  margin: auto;
  display: flex;
  align-items: flex-start;
}

#footerWrapper>div {
  flex: 1;
  margin: 7px 0;
}

a:nth-of-type(2) {
  display: block;
  margin-top: 7px;
}
</style>