<template>
  <HomeLayout/>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HomeLayout from '@/templates/HomeLayout.vue'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.name !== 'Home')
    router.replace({ name: 'Home' })
  
})
</script>