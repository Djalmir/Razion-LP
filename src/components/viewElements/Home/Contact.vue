<template>
  <section id="contatos">
    <SectionHeader
      kicker="Contato"
      title="Vamos conversar sobre seu projeto?"
      description="Explique brevemente o que você precisa. Respondemos rapidamente!"
    />
    <div class="cardGrid">
      <Card v-for="contact in contacts" :title="contact.title" :description="contact.description" :src="contact.src" :alt="contact.alt" :url="contact.url" :tagText="contact.tagText" :tagClass="contact.tagClass" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeader from '@/components/uiElements/SectionHeader.vue'
import Card from '@/components/viewElements/Home/Card.vue'

const contacts = ref([
  {
    src: 'whatsapp.svg', alt: 'whatsapp',
    title: 'WhatsApp',
    description: 'Entre em contato conosco pelo WhatsApp.',
    url: 'https://wa.me/5547988956620'
  },
  {
    src: 'Telegram.svg', alt: 'message',
    title: 'Telegram',
    description: 'Entre em contato conosco pelo Telegram.',
    url: 'https://t.me/RazionSoftwares'
  },
  {
    src: 'email.svg', alt: 'email',
    title: 'Email',
    description: 'Envie-nos um e-mail e responderemos o mais breve possivel tirando todas as suas dúvidas.',
    url: 'mailto:djalmir_miodutzki@hotmail.com'
  }
])

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

.cardGrid {
  width: calc(100% - 7px);
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  padding: 7px 0;
}
</style>