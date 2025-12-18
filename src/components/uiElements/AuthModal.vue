<template>
  <transition name="fade">
    <div class="modalShadow" v-if="showing" @click="$emit('close')"></div>
  </transition>
  <transition name="grow">
    <section @click='close' v-if="showing">
      <AuthBox @loggedIn="login" @signedUp="signup" @click.stop :view="openingView" />
    </section>
  </transition>
</template>

<script setup>
import AuthBox from '@/components/uiElements/AuthBox.vue'
import { ref } from 'vue'
import { useStore } from '@/stores/main'
import { dispatchEvent } from '@/utils/events'

const store = useStore()
const showing = ref(false)
const callback = ref(null)
const openingView = ref('login')

function show(cb, view = 'login') {
  openingView.value = view
  if (cb)
    callback.value = cb
  showing.value = true
  dispatchEvent('closeAllMessages')
}

function login(data, msg = { success: `Olá, ${data.name.split(' ')[0]}! Que bom te ver de novo! 😊` }) {
  let userProfile = data
  store.setUserProfile(userProfile)
  close()
  if (callback.value && typeof callback.value === 'function')
    callback.value()
  setTimeout(() => {
    if (msg)
      dispatchEvent('showMessage', msg)
  }, 0)
}

function signup(data) {
  login(data, { success: `Boas vindas, ${data.name.split(' ')[0]}! É muito bom ter você conosco! 😊` })
}

function close() {
  showing.value = false
  dispatchEvent('closeAllMessages')
}

defineExpose({ show })
</script>

<style scoped>
.modalShadow {
  position: fixed;
  inset: 0;
  background: var(--bg1-transparent);
  backdrop-filter: blur(5px);
  z-index: 3;
  transition-delay: .2s;
}

section {
  position: fixed;
  inset: 0;
  padding: 133px 0;
  z-index: 3;
  overflow: auto;
}
</style>