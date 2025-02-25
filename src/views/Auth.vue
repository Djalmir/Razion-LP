<template>
  <section>
    <AuthBox @loggedIn="login" @signedUp="signup" />
  </section>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/main'
import AuthBox from '@/components/uiElements/AuthBox.vue'

const router = useRouter()
const store = useStore()
const message = inject('Message').value

async function login(data, msg = { success: `Olá, ${data.name.split(' ')[0]}! Que bom te ver de novo! 😊` }) {
  let userProfile = data
  store.setUserProfile(userProfile)

  await router.push({ name: 'Home' })

  if (msg) {
    message.show(msg)
  }
}

function signup(data) {
  login(data, { success: `Boas vindas, ${data.name.split(' ')[0]}! É muito bom ter você conosco! 😊` })
}
</script>

<style scoped>
section {
  width: 90%;
	margin: 0 auto;
	display: grid;
	place-items: center;
	gap: 17px;
  padding: 133px 0;
}
</style>