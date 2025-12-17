<template>
  <section id="cta1">
    <div class="ctaWrapper">
      <div>
        <h2>Tem um projeto em mente?</h2>
        <p>Conte brevemente o que você precisa e vamos avaliar juntos.</p>
      </div>
      <div class="ctaBtns">
        <Button @click="scrollToSection('contatos')" class="secondary ctaBtn">Entrar em contato</Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '@/components/uiElements/Button.vue'

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  element.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  min-height: auto;
  padding: 17px 0;
  background: linear-gradient(145deg, var(--primary-transparent), var(--primary));
}

.light-theme section {
  background: linear-gradient(145deg, var(--primary-light), var(--primary) 33%);
}

.ctaWrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 17px;
  justify-content: center;
  padding: 0 7px;
  width: 80vw;
  max-width: 1024px;
}

.ctaWrapper>div:first-child {
  flex: 1.2;
}

h2 {
  font-size: 1.75rem;
  color: var(--light-font2);
}

p {
  margin: 17px 0 0;
  line-height: 1.5;
  font-size: 1.1rem;
  color: var(--light-font2);
}

.ctaBtns {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: center;
  flex: 1;
}

.ctaBtn {
  font-size: 1.1rem;
  font-weight: bold;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 7px 17px;
  width: 100%;
  max-width: 320px;
}

@media (min-width: 960px) {
  .ctaWrapper {
    flex-direction: row;
    align-items: center;
    padding: 17px 7px;
  }

  .ctaBtns {
    justify-content: flex-end;
  }
}
</style>