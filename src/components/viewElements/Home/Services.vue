<template>
  <section id="servicos" class="toolsAndServices">
    <SectionHeader kicker="O que fazemos" title="Desenvolvimento web claro, moderno e funcional." description="Nossa equipe de especialistas tem o conhecimento e a experiência necessários para ajudar você e sua equipe a atingir seus objetivos." />
    <!-- <div>
      <h2>Nossos Serviços</h2>
      <p>Nossa equipe de especialistas tem o conhecimento e a experiência necessários para ajudar você e sua equipe a atingir seus objetivos.</p>
    </div> -->
    <div class="cardGrid">
      <Card v-for="service in services" :title="service.title" :description="service.description" :src="service.src" :alt="service.alt" :url="service.url" :tagText="service.tagText" :tagClass="service.tagClass" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from '@/components/uiElements/SectionHeader.vue'
import Card from '@/components/viewElements/Home/Card.vue'

const toolWingsWidth = ref(0)
const services = ref([
  {
    src: 'code.svg', alt: 'code',
    title: 'Desenvolvimento Web',
    description: 'Sistemas completos, painéis administrativos, ferramentas internas e aplicativos voltados ao fluxo real da sua empresa.'
  },
  {
    src: 'cloud.svg', alt: 'infra',
    title: 'Infraestrutura & Deploy',
    description: 'Ambientes de produção completos: VPS, Nginx, SSL, logs, PM2, processos de build e monitoramento.'
  },
  {
    src: 'messages.svg', alt: 'messages',
    title: 'Consultoria',
    description: 'Consultoria técnica em projetos de sites e aplicativos web.'
  }
])

onMounted(() => {
  updateWingsWidth()
  window.addEventListener('resize', updateWingsWidth)
})

function updateWingsWidth() {
  toolWingsWidth.value = document.querySelector('section#servicos')?.getBoundingClientRect().left + 'px'
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWingsWidth)
})

</script>

<style scoped>
section.toolsAndServices {
  width: 90vw;
  max-width: 1024px;
  margin: 0 auto;
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  gap: 17px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 0;
  background: var(--bg2);
  color: var(--font1);
  filter: drop-shadow(0 0 7px #000000d0);
  ;
}

section.toolsAndServices::before {
  content: '';
  position: absolute;
  right: 100%;
  width: v-bind(toolWingsWidth);
  height: 100%;
  background: linear-gradient(to right, var(--bg1), var(--bg2));
}

section.toolsAndServices::after {
  content: '';
  position: absolute;
  left: 100%;
  width: v-bind(toolWingsWidth);
  height: 100%;
  background: linear-gradient(to left, var(--bg1), var(--bg2));
}

.cardGrid {
  width: calc(100% - 7px);
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  padding: 7px 0;
}
</style>