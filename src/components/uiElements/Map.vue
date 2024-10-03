<template>
  <div ref="mapContainer" v-bind="$attrs">
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'

const mapContainer = ref()
const map = ref()
const styles = ref(null)

const props = defineProps({
  lat: {
    type: Number,
    default: 0
  },
  lng: {
    type: Number,
    default: 0
  },
  zoom: {
    type: Number,
    default: 1
  },
  marker: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  styles.value = document.createElement('link')
  styles.value.rel = 'stylesheet'
  styles.value.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  styles.value.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
  styles.value.crossOrigin = ''
  document.querySelector('head').append(styles.value)

  map.value = L.map(mapContainer.value).setView([props.lat, props.lng], props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value)

  if (props.marker)
    L.marker([props.lat, props.lng]).addTo(map.value)

})

onBeforeUnmount(() => {
  document.querySelector('head').removeChild(styles.value)
  styles.value = null
})
</script>
