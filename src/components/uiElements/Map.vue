<template>
  <div ref="mapContainer" v-bind="$attrs">
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
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

onBeforeMount(() => {
  styles.value = document.createElement('link')
  styles.value.rel = 'stylesheet'
  styles.value.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  styles.value.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
  styles.value.crossOrigin = ''
  document.querySelector('head').append(styles.value)
})

onMounted(() => {
  map.value = L.map(mapContainer.value).setView([props.lat, props.lng], props.zoom)

  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  const stadiaLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    // attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
  })

  const baseMaps = {
    "OpenStreetMap": osmLayer,
    "Stadia": stadiaLayer
  }

  // L.control.layers(baseMaps).addTo(map.value)

  baseMaps["Stadia"].addTo(map.value)

  if (props.marker)
    L.marker([props.lat, props.lng]).addTo(map.value)
})

onBeforeUnmount(() => {
  document.querySelector('head').removeChild(styles.value)
  styles.value = null
})
</script>
