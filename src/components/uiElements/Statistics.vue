<template>
  <div class="statistics" v-show="userProfile && accessGranted">
    <div class="flexDiv">

      <Switch v-model="showMyAccesses" left-icon="check" right-icon="x">
        <template v-slot:right-label>
          Exibir meus acessos
        </template>
      </Switch>
      <div class="flexDiv" style="width: fit-content; margin:0 0 17px auto;">
        <Input label="A partir de" type="date" v-model="minDate" style="flex: 1; min-width: 130px;" />
        <Input label="Até" type="date" v-model="maxDate" style="flex: 1; min-width: 130px;" />
      </div>
    </div>
    <div class="flexDiv" style="flex-wrap: wrap-reverse;">
      <span style="padding: 0 7px; font-size: .8rem; margin-top: auto;">
        {{ totalRegisters > 0 ? totalRegisters : 'Nenhum' }} acesso{{ totalRegisters > 1 ? 's' : '' }} encontrado{{ totalRegisters > 1 ? 's' : '' }}
      </span>
      <Input class="searchInput" placeholder="Pesquisar" v-model="search" :leftIcon="{ class: 'search' }" :rightIcon="{ class: 'x', vIf: search, action: () => search = '' }" />
    </div>
    <Table class="table" ref="table" templateColumns="minmax(171px, 1fr) minmax(190px, 1fr) minmax(170px, 1fr) repeat(2, minmax(200px, 1fr)) minmax(110px, 1fr) repeat(2, minmax(111px, 1fr)) minmax(70px, 1fr)" @nextPage="getNextPage">
      <template v-slot:headingRow ref="headingRow">
        <div class="titleRow">
          <b @click="() => { sortBy = 'date'; toggleSortOrder() }">
            Data
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'date'" />
          </b>
          <b @click="() => { sortBy = 'app'; toggleSortOrder() }">
            App
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'app'" />
          </b>
          <b @click="() => { sortBy = 'ip'; toggleSortOrder() }">
            Ip
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'ip'" />
          </b>
          <b @click="() => { sortBy = 'user.name'; toggleSortOrder() }">
            Usuário
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'user.name'" />
          </b>
          <b @click="() => { sortBy = 'browser'; toggleSortOrder() }">
            Navegador
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'browser'" />
          </b>
          <b @click="() => { sortBy = 'language'; toggleSortOrder() }">
            Linguagem
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'language'" />
          </b>
          <b @click="() => { sortBy = 'geolocation.city'; toggleSortOrder() }">
            Cidade
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'geolocation.city'" />
          </b>
          <b @click="() => { sortBy = 'geolocation.region'; toggleSortOrder() }">
            Estado
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'geolocation.region'" />
          </b>
          <b @click="() => { sortBy = 'geolocation.country'; toggleSortOrder() }">
            País
            <Icon class="chevron-up" :size="1.25" v-if="sortBy === 'geolocation.country'" />
          </b>
        </div>
      </template>
      <template v-slot:rows ref="rows">
        <div v-for="access in accesses" :key="access._id" class="row">
          <span>
            <SpinnerText>{{ getDate(access.date) }} - {{ getTime(access.date) }}</SpinnerText>
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
import Icon from '@/components/uiElements/Icon.vue'
import authApi from '@/services/authApi.js'
import Switch from '@/components/formElements/Switch.vue'

const store = useStore()
const router = useRouter()
const userProfile = computed(() => store.userProfile)
const message = inject('Message').value

const accessGranted = ref(false)
const accesses = ref([])
const totalRegisters = ref(0)
const currentPage = ref(1)
const regPerPage = ref(30)
const showMyAccesses = ref(false)
const search = ref('')
const sortBy = ref('date')
const sortOrder = ref('desc')
const minDate = ref(null)
const maxDate = ref(null)
const totalPages = ref(0)

const sortChevronRotation = computed(() => sortOrder.value === 'asc' ? '180deg' : '0deg')

let searchTimer
watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    clearAndUpdate()
  }, 500)
})

let dateTimer
watch(minDate, () => {
  clearTimeout(dateTimer)
  dateTimer = setTimeout(() => {
    clearAndUpdate()
  }, 500)
})

watch(maxDate, () => {
  clearTimeout(dateTimer)
  dateTimer = setTimeout(() => {
    clearAndUpdate()
  }, 500)
})

watch(showMyAccesses, () => {
  clearAndUpdate()
})

watch(userProfile, () => {
  if (userProfile.value)
    getStatistics()
})

onMounted(() => {
  if (userProfile.value)
    getStatistics()
})

function clearAndUpdate() {
  currentPage.value = 1
  accesses.value = []
  getStatistics()
}

async function getStatistics() {
  await authApi.razionStatistics({
    page: currentPage.value,
    limit: regPerPage.value,
    search: search.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
    minDate: minDate.value,
    maxDate: maxDate.value,
    showMyAccesses: showMyAccesses.value
  })
    .then((res) => {
      accesses.value = [...accesses.value, ...res.data.accesses]
      totalPages.value = res.data.totalPages
      totalRegisters.value = res.data.totalRegisters
      accessGranted.value = true
    })
    .catch((err) => {
      if (err.response?.data.error == 'Acesso negado') {
        accessGranted.value = false
        router.push({ name: 'Home' })
      }
    })
}

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  clearAndUpdate()
}

function getDate(date) {
  return new Date(date).toLocaleDateString()
}

function getTime(date) {
  return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
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
  margin: 0 auto;
  padding: 17px;
  overflow: hidden;
}

.flexDiv {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  justify-content: space-between;
  margin: 7px 0;
}


.searchInput {
  flex: 1;
  min-width: 200px;
  max-width: 480px;
  margin: 0;
}

.table {
  margin-top: 17px;
}

.titleRow b {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  justify-content: space-between;
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

.chevron-up {
  transform: rotateX(v-bind(sortChevronRotation));
  transition: transform .2s;
}

.row span {
  white-space: nowrap;
  padding: 7px;
}
</style>