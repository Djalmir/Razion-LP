<template>
  <section id="projetos" class="toolsAndServices">
    <SectionHeader kicker="Projetos da Razion" title="Tecnologia construída para nós — e para nossos clientes." description="Desenvolvemos aplicações internas, soluções sob medida e fornecemos consultoria técnica para diferentes necessidades." />
    <div class="cardGrid">
      <Card v-for="tool in tools" :title="tool.title" :description="tool.description" :src="tool.src" :alt="tool.alt" :url="tool.url" :tagText="tool.tagText" :tagClass="tool.tagClass" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from '@/components/uiElements/SectionHeader.vue'
import Card from '@/components/viewElements/Home/Card.vue'

const toolWingsWidth = ref(0)
const tools = ref([
  {
    src: 'TaskBoard logo.svg', alt: 'TaskBoard logo',
    /*title: 'TaskBoard',*/ url: null,
    description: 'Visualize seu fluxo de trabalho, acompanhe prazos e colabore com sua equipe em tempo real com este Kanban minimalista e intuitivo.',
    tagText: 'Beta', tagClass: 'primary'
  },
  {
    src: 'Precify logo.svg', alt: 'Precify logo',
    /*title: 'Precify',*/ url: null,
    description: 'Crie orçamentos personalizados de forma rápida e profissional. Automatize cálculos e gere documentos prontos para envio.',
    tagText: 'Beta', tagClass: 'primary'
  },
  {
    src: 'Compresso logo.svg', alt: 'Compresso logo',
    /*title: 'Compresso',*/ url: null,
    description: 'Comprima suas imagens sem comprometer a qualidade, facilitando compartilhamentos e otimização de sites.',
    tagText: 'Em breve'
  },
  {
    src: 'ConverThor logo.svg', alt: 'ConverThor logo',
    /*title: 'ConverThor',*/ url: null,
    description: 'Converta diferentes formatos de arquivos com rapidez e precisão, garantindo compatibilidade em qualquer plataforma.',
    tagText: 'Em breve'
  },
  {
    src: 'Vox logo.svg', alt: 'Vox logo',
    /*title: 'Vox',*/ url: null,
    description: 'Comunique-se com sua equipe em tempo real. Compartilhe informações, faça reuniões e colabore sem complicações.',
    tagText: 'Em breve'
  },
])

onMounted(() => {
  updateWingsWidth()
  window.addEventListener('resize', updateWingsWidth)
})

function updateWingsWidth() {
  toolWingsWidth.value = document.querySelector('section#projetos')?.getBoundingClientRect().left + 'px'
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
  filter: drop-shadow(0 0 7px #000000d0);;
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