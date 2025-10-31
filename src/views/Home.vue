<template>
  <Header @showLogin="AuthModal.show()" />
  <section id="inicio" class="flexSection" style="margin: 111px auto 33px;">
    <div>
      <h1>Boas-vindas à Razion!</h1>
      <p>Acreditamos que a tecnologia deve ser uma aliada poderosa na sua rotina. Por isso, reunimos diversas ferramentas intuitivas e eficientes para facilitar seu trabalho, melhorar sua organização e aumentar sua produtividade. Seja para gerenciar tarefas, criar orçamentos ou otimizar arquivos, nossas soluções foram desenvolvidas para atender desde estudantes a profissionais e equipes que buscam performance máxima.</p>
    </div>
    <img src="/src/assets/undraw_engineering-team_13ax.svg" alt="engineering team">
  </section>
  <section id="ferramentas" class="toolsAndServices">
    <div>
      <h2>Nossas Ferramentas</h2>
      <p>Para ajudar você e sua equipe a alcançar seus objetivos, desenvolvemos ferramentas poderosas e fáceis de usar.<br />
        Cada ferramenta foi projetada para ser simples e intuitiva, ajudando você a focar no que realmente importa:<br />a <b>execução das suas ideias</b>.<br /><span style="display:block; margin-top: 7px;">Confira:</span>
      </p>
    </div>
    <!-- <ShutterCarousel :slides="tools" /> -->
    <div class="cardGrid">
      <Card v-for="tool in tools" :title="tool.title" :description="tool.description" :src="tool.src" :alt="tool.alt" :url="tool.url" :tagText="tool.tagText" :tagClass="tool.tagClass" />
    </div>
  </section>
  <section id="cta1">
    <div class="ctaWrapper">
      <div>
        <h2>Comece agora!</h2>
        <p>Experimente agora as nossas ferramentas e descubra como é possível otimizar seu tempo, organizar melhor suas tarefas e simplificar processos do seu dia a dia.</p>
      </div>
      <div class="ctaBtns">
        <Button class="secondary ctaBtn" @click="AuthModal.show(null, 'signup')">Criar conta gratuita!</Button>
      </div>
    </div>
  </section>
  <section id="servicos" class="toolsAndServices">
    <div>
      <h2>Nossos Serviços</h2>
      <p>Nossa equipe de especialistas tem o conhecimento e a experiência necessários para ajudar você e sua equipe a atingir seus objetivos.</p>
    </div>
    <div class="cardGrid">
      <Card v-for="service in services" :title="service.title" :description="service.description" :src="service.src" :alt="service.alt" :url="service.url" :tagText="service.tagText" :tagClass="service.tagClass" />
    </div>
  </section>
  <section id="sobre" class="flexSection">
    <div>
      <h2>Sobre a Razion</h2>
      <p>Desde 2016 na área de desenvolvimento web, a Razion tem o objetivo de ajudar empresas e pessoas a alcançar seus objetivos na internet.</p>
      <p>Estamos comprometidos em fornecer ferramentas minimalistas e poderosas, possibilitando que você e sua equipe se concentrem no que realmente importa: a <b>execução das suas ideias</b>.</p>
    </div>
    <img src="/src/assets/Razion logo.svg" alt="Razion logo" style="transform: scale(.5);">
  </section>
  <section id="contatos">
    <div>
      <h2>Contatos</h2>
      <p>Fale conosco por qualquer um dos meios abaixo:</p>
    </div>
    <div class="cardGrid">
      <Card v-for="contact in contacts" :title="contact.title" :description="contact.description" :src="contact.src" :alt="contact.alt" :url="contact.url" :tagText="contact.tagText" :tagClass="contact.tagClass" />
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/main'
import Header from '@/components/viewElements/Home/Header.vue'
import Footer from '@/components/viewElements/Home/Footer.vue'
// import ShutterCarousel from '@/components/uiElements/ShutterCarousel.vue'
import Card from '@/components/viewElements/Home/Card.vue'
import Button from '@/components/uiElements/Button.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()
const AuthModal = inject('AuthModal').value

const toolWingsWidth = ref(0)
const tools = computed(() => ([
  {
    src: 'TaskBoard logo.svg', alt: 'TaskBoard logo',
    /*title: 'TaskBoard',*/ url: 'https://taskboard.razion.games',
    description: 'Visualize seu fluxo de trabalho, acompanhe prazos e colabore com sua equipe em tempo real com este Kanban minimalista e intuitivo.',
    tagText: 'Beta', tagClass: 'primary'
  },
  {
    src: 'Precify logo.svg', alt: 'Precify logo',
    /*title: 'Precify',*/ url: 'https://apps.razion.games/estimativeGenerator',
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
]))
const services = computed(() => ([
  {
    src: 'code.svg', alt: 'code',
    title: 'Desenvolvimento',
    description: 'Desenvolvimento de sites e aplicativos web sob encomenda.'
  },
  {
    src: 'messages.svg', alt: 'messages',
    title: 'Consultoria',
    description: 'Consultoria técnica em projetos de sites e aplicativos web.'
  }
]))
const contacts = computed(() => ([
  {
    src: 'email.svg', alt: 'email',
    title: 'Email',
    description: 'Envie-nos um e-mail e responderemos o mais breve possivel tirando todas as suas dúvidas.',
    url: 'mailto:djalmir_miodutzki@hotmail.com'
  },
  {
    src: 'Telegram.svg', alt: 'message',
    title: 'Telegram',
    description: 'Entre em contato conosco pelo Telegram.',
    url: 'https://t.me/RazionSoftwares'
  }
]))

onMounted(() => {
  updateWingsWidth()
  if (route.name !== 'Home')
    router.replace({ name: 'Home' })
  window.addEventListener('resize', updateWingsWidth)
})

function updateWingsWidth() {
  toolWingsWidth.value = document.querySelector('section#ferramentas')?.getBoundingClientRect().left + 'px'
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWingsWidth)
})

</script>

<style scoped>
section {
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
}

section.flexSection {
  align-items: center;
}

h1 {
  font-size: 1.95rem;
  color: var(--dark-font2);
}

h2 {
  font-size: 1.75rem;
  color: var(--dark-font2);
}

.light-theme h1,
.light-theme h2 {
  color: var(--light-font1);
}

p {
  margin: 17px 0 0;
  line-height: 1.5;
  font-size: 1.1rem;
}

img {
  flex: 1;
  width: 75vw;
  max-width: 380px;
  display: block;
  margin: 17px 0 0 7px;
  filter: drop-shadow(1px 1px 1px var(--neutral));
}

section.toolsAndServices {
  background: var(--dark-bg2);
  color: var(--dark-font1);
  padding: 17px 0;
  position: relative;
  filter: drop-shadow(0 0 7px #000000d0);
  flex-direction: column;
  /* align-items: stretch; */
  /* min-height: 70vh; */
}

.light-theme section.toolsAndServices {
  background: var(--light-bg2);
  color: var(--light-font2);
  filter: drop-shadow(0 0 7px #00000080);
}

section.toolsAndServices::before {
  content: '';
  position: absolute;
  right: 100%;
  width: v-bind(toolWingsWidth);
  height: 100%;
  background: linear-gradient(to right, var(--dark-bg1), var(--dark-bg2));
}

.light-theme section.toolsAndServices::before {
  background: linear-gradient(to right, var(--light-bg1), var(--light-bg2));
}

section.toolsAndServices::after {
  content: '';
  position: absolute;
  left: 100%;
  width: v-bind(toolWingsWidth);
  height: 100%;
  background: linear-gradient(to left, var(--dark-bg1), var(--dark-bg2));
}

.light-theme section.toolsAndServices::after {
  background: linear-gradient(to left, var(--light-bg1), var(--light-bg2));
}

.cardGrid {
  width: calc(100% - 7px);
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  padding: 7px 0;
}

section#cta1 {
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  min-height: auto;
  padding: 17px 0;
  background: linear-gradient(145deg, var(--primary-transparent), var(--primary));
}

section#cta1 .ctaWrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 17px;
  align-items: center;
  justify-content: center;
  width: 80vw;
  max-width: 960px;
}

section#cta1 .ctaWrapper>div {
  flex: 1;
}

section#cta1 .ctaWrapper h2,
section#cta1 .ctaWrapper p {
  color: var(--dark-font2);
}

.light-theme section#cta1 .ctaWrapper h2,
.light-theme section#cta1 .ctaWrapper p {
  color: var(--light-font1);
}

.ctaBtns {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: flex-end;
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
  max-width: 320px;
}

#contatos {
  flex-direction: column;
}

@media (min-width: 960px) {
  section {
    flex-direction: row;
  }

  section.flexSection>* {
    flex: 1;
  }

  section#cta1 .ctaWrapper {
    flex-direction: row;
  }
}
</style>