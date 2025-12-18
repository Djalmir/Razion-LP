<template>
  <MainMenu ref="mainMenu" @toggleTheme="changeTheme">
    <RazionMenu v-if="hasPermissions" />
    <MenuItem pathName="EstimativeGenerator" label="Orçamentos" icon="file-text" />
  </MainMenu>
  <Header v-if="showHeader" @toggleTheme="changeTheme" :autoHide="autoHideHeader" />
  <RouterView />
  <Dialog ref="dialog" />
  <AuthModal ref="authModal" />
  <Message ref="message" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/main'
import Header from '@/components/uiElements/Header.vue'
import MainMenu from '@/components/uiElements/MainMenu.vue'
import RazionMenu from '@/components/uiElements/RazionMenu.vue'
import MenuItem from '@/components/uiElements/MenuItem.vue'
import Dialog from '@/components/uiElements/Dialog.vue'
import AuthModal from '@/components/uiElements/AuthModal.vue'
import Message from '@/components/uiElements/Message.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
const dialog = ref()
provide('Dialog', dialog)
const authModal = ref()
provide('AuthModal', authModal)
const message = ref()
provide('Message', message)
const prefersDark = ref(window.matchMedia("(prefers-color-scheme: dark)"))

const hasPermissions = computed(() => store.userProfile?.role === 'owner' || store.userProfile?.role === 'admin')
const showHeader = computed(() => {
  const removeHeaderPathNames = ['Home', 'Privacy', 'Terms']
  return !printingEstimative.value && !removeHeaderPathNames.includes(route.name)
})
const autoHideHeader = computed(() => {
  const autoHidePathNames = ['Home']
  return autoHidePathNames.includes(route.name)
})
const printingEstimative = ref(false)

onMounted(() => {
  if (!prefersDark.value.matches) {
    changeTheme()
  }
  prefersDark.value.addEventListener('change', e => {
    if (store.darkTheme !== e.matches) {
      changeTheme()
    }
  })

  window.addEventListener('showMessage', showMessage)
  window.addEventListener('printingEstimative', updatePrintingEstimative)
  window.addEventListener('showAuthModal', authModal.value.show)
  window.addEventListener('logout', logout)

  let userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null
  fetch(`${import.meta.env.VITE_BASE_URL}auth/access`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app: location.host,
      user: userProfile,
      browser: navigator.userAgent,
      language: navigator.language
    })
  })
})

function changeTheme() {
  store.toggleTheme()
  setTimeout(() => {
    if (store.darkTheme) {
      document.documentElement.classList.replace('light-theme', 'dark-theme')
      document.querySelector("[name=theme-color]").setAttribute("content", "#242424")
      document.querySelector("link[rel='icon']").setAttribute("href", "/razion-gold-logo.svg")
    }
    else {
      document.documentElement.classList.replace('dark-theme', 'light-theme')
      document.querySelector("[name=theme-color]").setAttribute("content", "#dddddd")
      document.querySelector("link[rel=icon]").setAttribute("href", "/razion-logo.svg")
    }
  }, 0)
}

function showMessage(msg) {
  message.value.show(msg.detail)
}

function updatePrintingEstimative(e) {
  printingEstimative.value = e.detail
}

function logout() {
  store.setUserProfile(null)
  router.push({ name: 'Home' })
}

onBeforeUnmount(() => {
  window.removeEventListener('showMessage', showMessage)
  window.removeEventListener('printingEstimative', updatePrintingEstimative)
  window.removeEventListener('showAuthModal', authModal.value.show)
  window.removeEventListener('logout', logout)
})
</script>
