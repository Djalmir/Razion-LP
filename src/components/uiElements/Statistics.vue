<template>
  <div class="statistics" v-show="userProfile && accessGranted">
    <div class="flexDiv">
      <span style="padding: 0 17px;">{{ totalRegisters }} acessos encontrados</span>
      <Input class="searchInput" placeholder="Pesquisar" v-model="search" :leftIcon="{ class: 'search' }" :rightIcon="{ class: 'x', vIf: search, action: () => search = '' }" />
    </div>
    <Table class="table" ref="table" templateColumns="minmax(111px, 1fr) minmax(90px, 1fr) minmax(190px, 1fr) minmax(170px, 1fr) repeat(2, minmax(200px, 1fr)) minmax(110px, 1fr) repeat(2, minmax(111px, 1fr)) minmax(70px, 1fr)" @nextPage="getNextPage">
      <template v-slot:headingRow ref="headingRow">
        <div class="titleRow">
          <b>Data</b>
          <b>Hora</b>
          <b>App</b>
          <b>Ip</b>
          <b>Usuário</b>
          <b>Navegador</b>
          <b>Linguagem</b>
          <b>Cidade</b>
          <b>Estado</b>
          <b>País</b>
        </div>
      </template>
      <template v-slot:rows ref="rows">
        <div v-for="access in accesses" :key="access._id" class="row">
          <span>
            <SpinnerText>{{ getDate(access.date) }}</SpinnerText>
          </span>
          <span>
            <SpinnerText>{{ getTime(access.date) }}</SpinnerText>
          </span>
          <span>
            <SpinnerText> {{ access.app }}</SpinnerText>
          </span>
          <span>
            <SpinnerText> {{ access.ip }} </SpinnerText>
          </span>
          <span>
            <SpinnerText>{{ access.user?.name || '-' }}</SpinnerText>
          </span>
          <span>
            <SpinnerText>{{ getBrowser(access.browser) }}</SpinnerText>
          </span>
          <span>
            <SpinnerText> {{ access.language }}</SpinnerText>
          </span>
          <span>
            <SpinnerText>{{ access.geolocation.city }}</SpinnerText>
          </span>
          <span>
            <SpinnerText>{{ access.geolocation.region }}</SpinnerText>
          </span>
          <span>
            <SpinnerText>{{ access.geolocation.country }}</SpinnerText>
          </span>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/main'
import Input from '@/components/formElements/Input.vue'
import Table from '@/components/uiElements/Table.vue'
import SpinnerText from '@/components/uiElements/SpinnerText.vue'
import authApi from '@/services/authApi.js'

const store = useStore()
const router = useRouter()
const userProfile = computed(() => store.userProfile)
const message = inject('Message').value

const accessGranted = ref(false)
const accesses = ref([])
const totalRegisters = ref(0)
const currentPage = ref(1)
const regPerPage = ref(30)
const search = ref('')
const sortBy = ref('_id')
const sortOrder = ref('desc')
const totalPages = ref(0)

let searchTimer
watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    accesses.value = []
    getStatistics()
  }, 500)
})

watch(userProfile, () => {
  if (userProfile.value)
    getStatistics()
})

onMounted(() => {
  if (userProfile.value)
    getStatistics()
})

async function getStatistics() {
  await authApi.razionStatistics({
    page: currentPage.value,
    limit: regPerPage.value,
    search: search.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value
  })
    .then((res) => {
      accesses.value = [...accesses.value, ...res.data.accesses]
      totalPages.value = res.data.totalPages
      totalRegisters.value = res.data.totalRegisters
      accessGranted.value = true
    })
    .catch((err) => {
      if (err.response.data.error == 'Acesso negado') {
        accessGranted.value = false
        router.push({ name: 'Home' })
      }
    })
}

function getDate(date) {
  return new Date(date).toLocaleDateString()
}

function getTime(date) {
  return new Date(date).toLocaleTimeString()
}

function getBrowser(userAgent) {
  let browser = "Desconhecido"

  if (userAgent.indexOf("Edg") > -1) {
    browser = "Microsoft Edge"
  } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1 && userAgent.indexOf("OPR") === -1) {
    browser = "Google Chrome"
  } else if (userAgent.indexOf("Firefox") > -1) {
    browser = "Mozilla Firefox"
  } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    browser = "Safari"
  } else if (userAgent.indexOf("OPR") > -1) {
    browser = "Opera"
  } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
    browser = "Internet Explorer"
  }

  let isMobile = false
  if (/android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) || /Opera Mini/i.test(userAgent) || /IEMobile/i.test(userAgent) || /Mobi|Tablet|Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    isMobile = true
  }

  return `${browser} | ${isMobile ? 'Mobile' : 'Desktop'}`
}

function getNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    getStatistics()
  }
}
</script>

<style scoped>
.statistics {
  width: 100%;
  max-height: calc(100vh - 73px);
  margin: 33px auto 0;
  display: grid;
  place-items: center;
  padding: 17px;
  gap: 17px;
  overflow: hidden;
}

.flexDiv {
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 7px;
  justify-content: space-between;
  margin: 0;
}

.searchInput {
  width: 100%;
  max-width: 480px;
}

.titleRow b {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 7px;
  cursor: pointer;
}

.titleRow b:not(:last-of-type) {
  border-right: 1px solid var(--light-font1);
}

.light-theme .titleRow b:not(:last-of-type) {
  border-right: 1px solid var(--dark-font1);
}

.titleRow b:active {
  filter: brightness(.5);
}

.row span {
  white-space: nowrap;
  padding: 7px;
}
</style>