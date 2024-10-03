<template>
  <div tab-id="general" tab-title="Geral">
    <div class="flexDiv" style="margin-bottom: 33px;">
      <sup class="flexDiv">
        <b>ID:</b>
        <p>{{ access._id }}</p>
      </sup>
      <sup class="flexDiv" style="justify-content: flex-end;">
        <b>Data:</b>
        <p>{{ getDate(access.date) }}</p> |
        <b>Hora:</b>
        <p>{{ getTime(access.date) }}</p>
      </sup>
    </div>
    <div class="flexDiv">
      <div class="flexDiv centered">
        <b>App:</b>
        <p>{{ access.app }}</p>
      </div>
      <div class="flexDiv centered">
        <b>IP:</b>
        <p>{{ access.ip }}</p>
      </div>
    </div>
    <div class="flexDiv">
      <div class="flexDiv centered">
        <b>Usuário:</b>
        <p>{{ access.user?.name || '-' }}</p>
      </div>
      <div class="flexDiv centered">
        <b>Linguagem:</b>
        <p>{{ access.language }}</p>
      </div>
    </div>
    <div class="flexDiv centered" style="margin-top: 33px;">
      <b>Navegador:</b>
      <p>{{ access.browser }}</p>
    </div>
  </div>
</template>

<script setup>
import { getDate, getTime } from '@/utils/date'

const props = defineProps({
  access: Object,
  required: true
})
</script>

<style scoped>
.flexDiv {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  margin: 0 0 7px;
  min-width: 200px;
}

.centered {
  justify-content: center;
  text-align: center;
}
</style>