<template>
  <header>
    <div>
      <a href="#inicio">
        <img src="/src/assets/Razion logo 2.svg" alt="Razion Logo" />
      </a>
      <div class="menuContainer" ref="menuContainer">
        <Button class="flat menuBt" @click="toggleMenu" v-if="showMenuBt">
          <Icon class="menu" :size="1.5" bold />
        </Button>
        <div v-else></div>
        <nav>
          <a href="#inicio" @click="toggleMenu">Início</a>
          <a href="#projetos" @click="toggleMenu">Projetos</a>
          <a href="#servicos" @click="toggleMenu">Serviços</a>
          <a href="#sobre" @click="toggleMenu">Sobre</a>
          <a href="#contatos" @click="toggleMenu">Contatos</a>
          <Switch class="themeSwitch" v-model="darkTheme" leftIcon="moon" rightIcon="sun" />
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from '@/stores/main.js'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Switch from '@/components/formElements/Switch.vue'

const headerPadding = ref('33px 0')
const menuContainer = ref()

const windowWidth = ref(window.innerWidth)
const showMenuBt = computed(() => windowWidth.value < 960)
const store = useStore()
const storeDarkTheme = computed(() => store.darkTheme)
const darkTheme = ref(store.darkTheme)
watch(storeDarkTheme, () => darkTheme.value = storeDarkTheme.value)
watch(darkTheme, () => {
  updateTheme()
})

onMounted(() => {
  window.addEventListener('scroll', updatePadding)
  window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
})

function updateTheme() {
  if (darkTheme.value) {
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
  }
}

function updatePadding() {
  if (window.scrollY > 0) {
    headerPadding.value = '7px 0'
  }
  else {
    headerPadding.value = '33px 0'
  }
}

function toggleMenu() {
  menuContainer.value.classList.toggle('showing')
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updatePadding)
  window.removeEventListener('resize', () => windowWidth.value = window.innerWidth)
})

</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  backdrop-filter: blur(5px);
  background: linear-gradient(145deg, var(--bg3-transparent), var(--bg1-transparent));
  box-shadow: var(--box-shadow);
  user-select: none;
}

header>div {
  margin: auto;
  width: 90vw;
  max-width: 1024px;
  display: flex;
  gap: 17px;
  justify-content: space-between;
  padding: v-bind(headerPadding);
  font-size: .85rem;
  transition: padding .3s ease;
}

img {
  height: 2rem;
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
}

.menuContainer {
  display: grid;
  grid-template-rows: 28px 0fr;
  gap: 0px;
  transition: .3s ease;
}

.menuContainer.showing {
  grid-template-rows: 28px 1fr;
  gap: 17px;
}

.menuContainer .menuBt {
  margin-left: auto;
  padding: 0;
  display: grid;
  place-items: center flex-end;
  width: 100%;
  overflow: hidden;
}

nav {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 17px;
  text-transform: uppercase;
  overflow: hidden;
}

nav a {
  color: var(--font1);
}

.light-theme nav a {
  color: var(--font2);
}

@media (min-width: 960px) {
  .menuContainer,
  .menuContainer.showing {
    grid-template-rows: 1fr;
    grid-template-columns: 0fr 1fr;
  }

  .menuContainer nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 17px;
  }

  .themeSwitch {
    margin-left: 17px;
  }
}
</style>