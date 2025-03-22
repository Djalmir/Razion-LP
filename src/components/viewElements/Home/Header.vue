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
          <a href="#ferramentas" @click="toggleMenu">Ferramentas</a>
          <a href="#servicos" @click="toggleMenu">Serviços</a>
          <a href="#sobre" @click="toggleMenu">Sobre</a>
          <a href="#contatos" @click="toggleMenu">Contatos</a>
          <a href="#" @click="$emit('showLogin')" class="loginBtn" ref="loginBtn">
            <Icon class="login" :size="1.1" />
            Entrar
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const headerPadding = ref('33px 0')
const menuContainer = ref()
const loginBtn = ref()
const loginBtnWidth = computed(() => loginBtn.value?.offsetWidth + 'px')

const windowWidth = ref(window.innerWidth)
const showMenuBt = computed(() => windowWidth.value < 960)

onMounted(() => {
  window.addEventListener('scroll', updatePadding)
  window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
})

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
  background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg1-transparent));
  box-shadow: var(--dark-box-shadow);
  user-select: none;
}

.light-theme header {
  background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg1-transparent));
  box-shadow: var(--light-box-shadow);
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
  color: var(--dark-font1);
}

.light-theme nav a {
  color: var(--light-font2);
}

.loginBtn {
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--primary);
  border-radius: .3rem;
  padding: 7px;
  transition: .2s ease-out;
  box-shadow: inset 0 0 0 var(--primary);
}

.loginBtn:hover {
  /* background: var(--primary); */
  transition: .2s ease-in;
  box-shadow: inset 0 0 v-bind(loginBtnWidth) var(--primary);
  color: var(--dark-bg1);
}
</style>