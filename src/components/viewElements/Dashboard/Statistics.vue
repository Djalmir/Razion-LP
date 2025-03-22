<template>
  <div class="statistics" v-show="userProfile && accessGranted">
    <div class="flexDiv" style="justify-content: flex-end; margin:0 0 17px; gap: 17px;">
      <Switch v-model="showMyAccesses" left-icon="check" right-icon="x" style="transform: translateY(11px);" :switchColors="['var(--neutral)', 'var(--primary)']">
        <template v-slot:left-label>
          <b style="font-size: .9rem;">
            Exibir meus acessos
          </b>
        </template>
      </Switch>
      <div class="flexDiv" style="width: fit-content; gap: 9px 7px;">
        <Input label="A partir de" type="date" v-model="minDate" style="flex: 1; min-width: 130px; margin: 0;" />
        <Input label="Até" type="date" v-model="maxDate" style="flex: 1; min-width: 130px; margin: 0;" />
      </div>
    </div>
    <div class="flexDiv" style="flex-wrap: wrap-reverse;">
      <span style="padding: 0 7px; font-size: .8rem; margin-top: auto;">
        {{ totalRegisters > 0 ? totalRegisters : 'Nenhum' }} acesso{{ totalRegisters > 1 ? 's' : '' }} encontrado{{ totalRegisters > 1 ? 's' : '' }}
      </span>
      <Input class="searchInput" placeholder="Pesquisar" v-model="search" :leftIcon="{ class: 'search' }" :rightIcon="{ class: 'x', vIf: search, action: () => search = '' }" />
    </div>
    <Table class="table" ref="table" templateColumns="minmax(171px, 1fr) minmax(190px, 1fr) minmax(170px, 1fr) repeat(2, minmax(200px, 1fr)) minmax(110px, 1fr) repeat(2, minmax(111px, 1fr)) minmax(70px, 1fr)" @nextPage="getNextPage" :growOnHover="true">
      <template #headingRow>
        <div class="titleRow">
          <Th title="Data" sortValue="date" @click="setSortBy('date')" :showChevron="sortBy == 'date'" :chevronRotation="sortChevronRotation" />
          <Th title="App" sortValue="app" @click="setSortBy('app')" :showChevron="sortBy == 'app'" :chevronRotation="sortChevronRotation" />
          <Th title="IP" sortValue="ip" @click="setSortBy('ip')" :showChevron="sortBy == 'ip'" :chevronRotation="sortChevronRotation" />
          <Th title="Usuário" sortValue="user.name" @click="setSortBy('user.name')" :showChevron="sortBy == 'user.name'" :chevronRotation="sortChevronRotation" />
          <Th title="Navegador" sortValue="browser" @click="setSortBy('browser')" :showChevron="sortBy == 'browser'" :chevronRotation="sortChevronRotation" />
          <Th title="Linguagem" sortValue="language" @click="setSortBy('language')" :showChevron="sortBy == 'language'" :chevronRotation="sortChevronRotation" />
          <Th title="Cidade" sortValue="geolocation.city" @click="setSortBy('geolocation.city')" :showChevron="sortBy == 'geolocation.city'" :chevronRotation="sortChevronRotation" />
          <Th title="Estado" sortValue="geolocation.region" @click="setSortBy('geolocation.region')" :showChevron="sortBy == 'geolocation.region'" :chevronRotation="sortChevronRotation" />
          <Th title="País" sortValue="geolocation.country" @click="setSortBy('geolocation.country')" :showChevron="sortBy == 'geolocation.country'" :chevronRotation="sortChevronRotation" />
        </div>
      </template>
      <template #rows>
        <div v-for="access in accesses" :key="access._id" :class="`row ${showingAccess == access ? 'active' : ''}`" @click="() => { showingAccess = access; detailsModal.show(access) }">
          <Td>{{ getDate(access.date) }} - {{ getTime(access.date) }}</Td>
          <Td>{{ access.app }}</Td>
          <Td>{{ access.ip }}</Td>
          <Td>{{ access.user?.name || '-' }}</Td>
          <Td :title="access.browser">{{ getBrowser(access.browser) }}</Td>
          <Td>{{ access.language }}</Td>
          <Td>{{ access.geolocation.city }}</Td>
          <Td>{{ access.geolocation.region }}</Td>
          <Td>{{ access.geolocation.country }}</Td>
        </div>
      </template>
    </Table>
  </div>
  <AccessDetailsModal ref="detailsModal" @closeModal="rmShowingAccess" />
</template>

<script setup>
import { ref, computed, inject, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/main'
import Input from '@/components/formElements/Input.vue'
import Table from '@/components/uiElements/Table.vue'
import Th from '@/components/componentElements/Table/Th.vue'
import Td from '@/components/componentElements/Table/Td.vue'
import authApi from '@/services/authApi.js'
import Switch from '@/components/formElements/Switch.vue'
import AccessDetailsModal from '@/components/viewElements/Dashboard/AccessDetailsModal.vue'
import { getDate, getTime } from '@/utils/date'

const store = useStore()
const router = useRouter()
const detailsModal = ref()
const userProfile = computed(() => store.userProfile)

const accessGranted = ref(false)
const accesses = ref([])
const showingAccess = ref(null)
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

function setSortBy(value) {
  if (value == sortBy.value) {
    toggleSortOrder()
  }
  else {
    sortBy.value = value
    clearAndUpdate()
  }
}

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  clearAndUpdate()
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

function rmShowingAccess() {
  let row = document.querySelector('.row.active')
  setTimeout(() => {
    row.classList.remove('active')
  }, 500)
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

.row {
  transition: all .1s, background .35s !important;
}

.row.active {
  background: var(--primary) !important;
  color: var(--dark-font2) !important;
}
</style>