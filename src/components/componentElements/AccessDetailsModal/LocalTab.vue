<template>
  <div tab-id="local" tab-title="Local" tab-icon="map-pin" style="position: relative;">
    <div class="mapContainer" ref="mapContainer" v-if="showingMap" tabindex="0" @keydown.esc.stop.prevent="showingMap = false">
      <Map :lat="getLatitude(access.geolocation.loc)" :lng="getLongitude(access.geolocation.loc)" :marker="true" :zoom="10" class="map" />
      <Button class="closeMapButton" @click="showingMap = false">
        <Icon class="x" :size="1.5" />
      </Button>
    </div>
    <div v-else>
      <div class="flexDiv">
        <sup class="flexDiv">
          <b>Local:</b>
          <p>{{ access.geolocation.loc || '-' }}</p>
        </sup>
        <sup class="flexDiv" style="justify-content: flex-end;">
          <b>Fuso Horário:</b>
          <p>{{ access.geolocation.timezone || '-' }}</p>
        </sup>
      </div>
      <div class="flexDiv centered" style="margin-top: 33px;">
        <b>Hostname:</b>
        <p>{{ access.geolocation.hostname || '-' }}</p>
      </div>
      <div class="flexDiv centered">
        <b>Organização:</b>
        <p>{{ access.geolocation.org || '-' }}</p>
      </div>
      <div class="flexDiv" style="margin-top: 33px;">
        <div class="flexDiv centered">
          <b>CEP:</b>
          <p>{{ access.geolocation.postal || '-' }}</p>
        </div>
        <div class="flexDiv centered">
          <b>Cidade:</b>
          <p>{{ access.geolocation.city || '-' }}</p>
        </div>
      </div>
      <div class="flexDiv" style="margin-bottom: 17px;">
        <div class="flexDiv centered">
          <b>Estado:</b>
          <p>{{ access.geolocation.region || '-' }}</p>
        </div>
        <div class="flexDiv centered">
          <b>País:</b>
          <p>{{ access.geolocation.country || '-' }}</p>
        </div>
      </div>
      <Button @click="showingMap = true" style="margin: 33px auto; display: block;">Ver no mapa</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Map from '@/components/uiElements/Map.vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps({
  access: Object,
  required: true
})

const mapContainer = ref()

const showingMap = ref(false)
watch(showingMap, () => {
  setTimeout(() => {

    if (showingMap.value)
      mapContainer.value.focus()
  }, 0)
})

function getLatitude(loc) {
  if (!loc)
    return 0

  return Number(loc.split(',')[0])
}

function getLongitude(loc) {
  if (!loc)
    return 0

  return Number(loc.split(',')[1])
}
</script>

<style scoped>
.flexDiv {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  margin: 0 0 7px;
}

.centered {
  justify-content: center;
  text-align: center;
}

.mapContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: .3rem;
  z-index: 0;
}

.closeMapButton {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  transform: translate(17%, -17%);
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--bg3), var(--bg1));
  color: var(--danger-light);
  z-index: 1;
}
</style>