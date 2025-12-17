<template>
  <section id="sobre" class="about">
    <div>
      <SectionHeader kicker="Sobre a Razion" title="Um estúdio independente de desenvolvimento web." />
      <p>
        A <b>Razion</b> nasceu da visão de construir tecnologia de forma simples, precisa e inteligente.
        Somos um time pequeno, técnico e profundamente envolvido em cada etapa: arquitetura,
        desenvolvimento, UX, testes, infraestrutura e manutenção.
      </p>
      <p>
        Não trabalhamos com burocracia ou complicação desnecessária. Priorizamos clareza,
        comunicação direta e entregas que fazem sentido para nossos clientes.
      </p>
    </div>
    <img src="/src/assets/Razion logo.svg" alt="Razion logo" style="transform: scale(.5);">
  </section>
</template>

<script setup>
import SectionHeader from '@/components/uiElements/SectionHeader.vue'
</script>

<style scoped>
section {
  width: 90vw;
  max-width: 1024px;
  margin: 0 auto;
  min-height: calc(100vh - 48px);
  padding: 33px 0;
  display: grid;
  place-items: center;
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 17px;
  flex-wrap: wrap;
}

p {
  margin: 17px 0 0;
  line-height: 1.7;
  font-size: 1.1rem;
}

img {
  flex: 1;
  width: 75vw;
  max-width: 380px;
  display: block;
  margin: 17px 0 0 7px;
  filter: drop-shadow(1px 1px 1px var(--neutral));
  user-select: none;
  -webkit-user-drag: none;
}

@media (min-width: 960px) {
  .about {
    flex-direction: row;
  }

  .about>* {
    flex: 1;
  }
}
</style>