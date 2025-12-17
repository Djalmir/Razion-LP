<template>
  <section id="inicio" style="padding: 117px 0 0; margin-bottom: 50px;">
    <div class="hero">
      <div>
        <h1>Tecnologia Limpa.<br /><span class="highlight">Resultados reais.</span></h1>
        <p>Criamos sistemas, dashboards, APIs e aplicações web com foco em performance, clareza e <b>resultado real</b>.<br />Um estúdio enxuto, <b>técnico</b> e direto ao ponto.</p>
      </div>
      <img src="/src/assets/undraw_engineering-team_13ax.svg" alt="engineering team">
    </div>
  </section>
</template>

<script setup>

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

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 17px;
  flex-wrap: wrap;
}

h1 {
  font-size: 1.95rem;
  color: var(--font2);
  text-align: center;
}

h1 .highlight {
  color: var(--primary);
}

p {
  margin: 17px 0 0;
  line-height: 1.7;
  font-size: 1.1rem;
  text-align: center;
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
  .hero {
    flex-direction: row;
  }

  .hero>* {
    flex: 1;
  }
}
</style>