<template>
  <section>
    <AuthBox @loggedIn="login" @signedUp="signup" v-if="!userProfile" style="margin-top: 133px"/>
    <Statistics ref="statistics"/>
  </section>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import AuthBox from '@/components/uiElements/AuthBox.vue'
import Statistics from '@/components/uiElements/Statistics.vue'
import { useStore } from '@/stores/main'

const store = useStore()
const statistics = ref()
const message = inject('Message').value
const userProfile = computed(() => store.userProfile)

async function login(data, welcomeBack = true) {
  let userProfile = data
  store.setUserProfile(userProfile)

  if (welcomeBack) {
    message.show({ success: `Olá, ${data.name.split(' ')[0]}! Que bom te ver de novo! 😊` })
  }
}

function signup(data) {
  login(data, false)
    .then(() => {
      message.show({ success: `Boas vindas, ${data.name.split(' ')[0]}! É muito bom ter você conosco! 😊` })
    })
}
</script>

<style scoped>
section {
  position: absolute;
  inset: 47px 0 0 0;
  width: 100%;
  margin: 0 auto;
  padding: 7px;
  gap: 17px;
}
</style>