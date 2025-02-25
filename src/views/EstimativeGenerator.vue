<template>
  <section ref="section">
    <Toolbar v-if='!printingEstimative' :estimative='estimative' @new='clearEstimative' @open='ifLoggedIn(openFilePicker)' @saveas='ifLoggedIn(saveNewEstimative)' @save='ifLoggedIn(saveEstimative)' @delete='ifLoggedIn(deleteEstimative)' @print='print' @share="shareEstimative" :readOnlyMode='readOnlyMode' />

    <div id="estimativeWrapper" ref="estimativeWrapper">
      <div id="estimative" :class="{ 'readonly': readOnlyMode }">
        <sup style="position: absolute; right: 17px; top: 17px; width: fit-content; font-size: .8rem;">{{ estimativeDate }}</sup>
        <header>
          <div>
            <div class="logoWrapper" @click='logoPicker.click()'>
              <Image v-if='estimative.value.company.logo' :src="`${estimative.value.company.logoUrl || estimative.value.company.logo}`" alt="Logotipo" :size="5" style="border-radius: .3rem;" />
              <div v-else class="logoPlaceholder placeholder">
                <Icon class="image" :size="5" />
              </div>
              <input type="file" accept="image/*" ref="logoPicker" id="logoPicker" @change="updateLogo" hidden />
            </div>
            <div class="title">
              <Input v-if="editingField == 'companyName'" v-model="estimative.value.company.name" placeholder="Nome da empresa" class="fieldEditor" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: 1.25rem" autofocus />
              <h1 v-else-if="estimative.value.company.name" @click="editingField = 'companyName'">
                {{ estimative.value.company.name }}</h1>
              <h1 v-else class="placeholder" @click="editingField = 'companyName'">Nome da empresa</h1>
              <Input v-if="editingField == 'companyAddress'" v-model="estimative.value.company.address" placeholder="Endereço" class="fieldEditor" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
              <sup v-else-if='estimative.value.company.address' @click="editingField = 'companyAddress'">
                <Icon class="map-pin" />
                {{ estimative.value.company.address }}
              </sup>
              <sup v-else class="placeholder" @click="editingField = 'companyAddress'">
                <Icon class="map-pin" />
                Endereço
              </sup>
              <Input v-if="editingField == 'companyCNPJ'" v-model="estimative.value.company.cnpj" placeholder="CNPJ / CPF" class="fieldEditor" @input="cpfCnpjMask" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
              <sup v-else-if='estimative.value.company.cnpj' @click="editingField = 'companyCNPJ'">
                <Icon class="credit-card" />
                {{ estimative.value.company.cnpj }}
              </sup>
              <sup v-else class="placeholder" @click="editingField = 'companyCNPJ'">
                <Icon class="credit-card" />
                CNPJ / CPF
              </sup>
            </div>
            <div class="contactWrapper">
              <Input v-if="editingField == 'companyPhone'" v-model="estimative.value.company.phone" placeholder="Telefone" class="fieldEditor" @input="phoneMask" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
              <span v-else-if='estimative.value.company.phone' @click="editingField = 'companyPhone'">
                <Icon class="message-circle" />
                {{ estimative.value.company.phone }}
              </span>
              <span v-else class="placeholder" @click="editingField = 'companyPhone'">
                <Icon class="message-circle" />
                Telefone
              </span>
              <Input v-if="editingField == 'companyEmail'" v-model="estimative.value.company.email" placeholder="E-mail" class="fieldEditor" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
              <span v-else-if='estimative.value.company.email' @click="editingField = 'companyEmail'">
                <Icon class="mail" />
                {{ estimative.value.company.email }}
              </span>
              <span v-else class="placeholder" @click="editingField = 'companyEmail'">
                <Icon class="mail" />
                E-mail
              </span>
            </div>
          </div>
          <div :class="`clientInfo ${showingClientInfo ? 'expanded' : ''}`">
            <div>
              <b>Cliente:</b>
              <div class="clientInfoWrapper">

                <Input v-if="editingField == 'clientName'" v-model="estimative.value.client.name" placeholder="Nome" class="fieldEditor" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: 1.05rem" autofocus />
                <span v-else-if='estimative.value.client.name' @click="editingField = 'clientName'" style="font-size: 1.05rem">
                  {{ estimative.value.client.name }}
                </span>
                <span v-else class="placeholder" @click="editingField = 'clientName'" style="font-size: 1.05rem">
                  Nome
                </span>
                <Input v-if="editingField == 'clientAddress'" v-model="estimative.value.client.address" placeholder="Endereço" class="fieldEditor" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
                <span v-else-if='estimative.value.client.address' @click="editingField = 'clientAddress'">
                  <Icon class="map-pin" />
                  {{ estimative.value.client.address }}
                </span>
                <span v-else class="placeholder" @click="editingField = 'clientAddress'">
                  <Icon class="map-pin" />
                  Endereço
                </span>
                <Input v-if="editingField == 'clientCNPJ'" v-model="estimative.value.client.cnpj" placeholder="CNPJ / CPF" class="fieldEditor" @input="cpfCnpjMask" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
                <span v-else-if='estimative.value.client.cnpj' @click="editingField = 'clientCNPJ'">
                  <Icon class="credit-card" />
                  {{ estimative.value.client.cnpj }}
                </span>
                <span v-else class="placeholder" @click="editingField = 'clientCNPJ'">
                  <Icon class="credit-card" />
                  CNPJ / CPF
                </span>

              </div>
              <div class="clientContactWrapper">

                <Input v-if="editingField == 'clientPhone'" v-model="estimative.value.client.phone" placeholder="Telefone" class="fieldEditor" @input="phoneMask" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
                <span v-else-if='estimative.value.client.phone' @click="editingField = 'clientPhone'">
                  <Icon class="message-circle" />
                  {{ estimative.value.client.phone }}
                </span>
                <span v-else class="placeholder" @click="editingField = 'clientPhone'">
                  <Icon class="message-circle" />
                  Telefone
                </span>
                <Input v-if="editingField == 'clientEmail'" v-model="estimative.value.client.email" placeholder="E-mail" class="fieldEditor" @keydown.enter="editingField = null" @blur="editingField = null" style="font-size: .9rem" autofocus />
                <span v-else-if='estimative.value.client.email' @click="editingField = 'clientEmail'">
                  <Icon class="mail" />
                  {{ estimative.value.client.email }}
                </span>
                <span v-else class="placeholder" @click="editingField = 'clientEmail'">
                  <Icon class="mail" />
                  E-mail
                </span>

              </div>
            </div>
            <span class="placeholder" style="margin: auto; width: fit-content; font-size: .75rem;" @click="showingClientInfo = !showingClientInfo">
              {{ showingClientInfo ? 'Ocultar' : 'Mostrar' }} informações do cliente
            </span>
          </div>
        </header>
        <h2>Orçamento de serviços</h2>
        <Table ref="table" class="table" templateColumns="minmax(220px, 1fr) 130px 35px" :scrollbars="false">
          <template #headingRow>
            <div>
              <Th title="Descrição" />
              <Th title="Valor" />
            </div>
          </template>
          <template #rows>
            <div v-for="(service, index) in estimative.value.services" :key="`service-${index}`" @click="setEditingRow(index)" @mouseenter="mouseIn = index" @mouseleave="mouseIn = -1">
              <div style="padding: 3px;" v-if="editingRow == index">
                <!-- <Input class="rowInput" v-model="service.description" @keypress.enter="saveEdition" @keydown.esc="cancelEdition" autofocus /> -->
                <Textarea class="rowInput" v-model="service.description" @keypress.enter="(e) => { if (!e.shiftKey) saveEdition() }" @keydown.esc="cancelEdition" autofocus style="resize: vertical;" :rows="service.description.split('\n').length" />
              </div>
              <Td v-else>{{ service.description }}</Td>

              <div style="padding: 3px;" v-if="editingRow == index">
                <Input class="rowInput" type="number" v-model="service.value" @input="updateTotalPrice" @keypress.enter="saveEdition" @keydown.esc="cancelEdition" />
              </div>
              <Td v-else>R$ {{ Number(service.value).toFixed(2) }}</Td>

              <div v-if="editingRow == index" class="rowButtons">
                <Button class="secondary rowButton" @click.stop="cancelEdition" title="Cancelar edição">
                  <Icon class="x" bold />
                </Button>
              </div>
              <div v-else-if="mouseIn == index" class="rowButtons">
                <Button class="danger rowButton rmRowButton" @click.stop="removeRow(index)" title="Excluir linha">
                  <Icon class="trash" bold />
                </Button>
              </div>
            </div>
            <div>
              <div style="padding: 17px 0; text-align: right">
                <b style="padding-right: 7px;">Total:</b>
              </div>
              <div style="padding: 17px 0;">
                <span>R$ {{ Number(estimative.value.totalValue).toFixed(2) }}</span>
              </div>
              <div></div>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <Button class="flat addRowButton" @click="addRow" v-if="!readOnlyMode">
      <Icon class="plus" :size="1.5" bold />
      Adicionar serviço
    </Button>
  </section>
  <FilePicker ref="filePicker" @openFile="openFile" />
  <AuthModal ref="authModal" />
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/main'
import { dispatchEvent } from '@/utils/events'

import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Image from '@/components/uiElements/Image.vue'
import Input from '@/components/formElements/Input.vue'
import Textarea from '@/components/formElements/Textarea.vue'
import Table from '@/components/uiElements/Table.vue'
import Th from '@/components/componentElements/Table/Th.vue'
import Td from '@/components/componentElements/Table/Td.vue'
import FilePicker from '@/components/viewElements/EstimativeGenerator/FilePicker.vue'
import Toolbar from '@/components/viewElements/EstimativeGenerator/Toolbar.vue'
import AuthModal from '@/components/uiElements/AuthModal.vue'
import estimativeApi from '@/services/estimativeApi'
import { getDate } from '@/utils/date'
import { cpfCnpjMask, phoneMask } from '@/utils/masks'

const store = useStore()
const userProfile = computed(() => store.userProfile)
const Dialog = inject('Dialog').value
const Message = inject('Message').value
const router = useRouter()
const route = useRoute()
const section = ref()
const estimativeWrapper = ref()
const table = ref()
const filePicker = ref()
const logoPicker = ref()
const authModal = ref()
const printingEstimative = ref(false)
const showingClientInfo = ref(false)
const readOnlyMode = ref(false)

const estimative = reactive({
  value: {
    _id: null,
    company: {
      logo: '',
      name: '',
      phone: '',
      email: '',
      cnpj: '',
      address: ''
    },
    client: {
      name: '',
      phone: '',
      email: '',
      cnpj: '',
      address: '',
    },
    name: '',
    services: [],
    totalValue: 0,
  }
})
const oldEstimative = ref(JSON.parse(JSON.stringify(estimative.value)))
const changedEstimative = computed(() => JSON.stringify(estimative.value) != JSON.stringify(oldEstimative.value))
const estimativeDate = computed(() => {
  if (estimative.value._id)
    return getDate(estimative.value.updatedAt)
  else
    return new Date().toLocaleDateString('pt-BR')
})
const editingField = ref(null)
const editingRow = ref(null)
const oldValues = ref({ description: '', value: '' })
const mouseIn = ref(-1)

onMounted(() => {
  if (route.params.estimativeId) {
    readOnlyMode.value = true
    estimativeApi.get(route.params.estimativeId)
      .then((res) => {
        estimative.value = res.data
        oldEstimative.value = JSON.parse(JSON.stringify(estimative.value))
        let client = estimative.value.client
        if (client.name || client.cnpj || client.phone || client.email || client.address)
          showingClientInfo.value = true
        document.querySelectorAll('.placeholder').forEach(el => {
          el.style.display = 'none'
        })
      })
  }
})

function ifLoggedIn(callback) {
  if (userProfile.value)
    callback()
  else {
    authModal.value.show(callback)
    Message.show({ error: 'Você precisa fazer login para executar esta ação' })
  }
}

function updateLogo() {
  const file = document.getElementById('logoPicker').files[0]
  if (file) {
    estimative.value.company.logoUrl = null
    estimative.value.company.logo = URL.createObjectURL(file)
  }
}

async function clearEstimative(withoutConfirm = false) {
  if (withoutConfirm || !changedEstimative.value || await Dialog.confirm(/*html*/`<b>Tem certeza que deseja iniciar um novo orçamento?</b><p style="margin-top: 7px;">Alterações não salvas serão perdidas.</p>`)) {
    document.querySelector('#logoPicker').value = ''
    estimative.value = {
      _id: null,
      company: {
        logo: '',
        name: '',
        phone: '',
        email: '',
        cnpj: '',
        address: '',
      },
      client: {
        name: '',
        phone: '',
        email: '',
        cnpj: '',
        address: '',
      },
      name: '',
      services: [],
      totalValue: 0
    }
    oldEstimative.value = JSON.parse(JSON.stringify(estimative.value))
    readOnlyMode.value = false
    document.querySelectorAll('.placeholder').forEach(el => {
      el.style.display = ''
    })
    router.replace({ name: 'EstimativeGenerator' })
  }
}

async function openFilePicker() {
  if (!changedEstimative.value || await Dialog.confirm(/*html*/`<b>Tem certeza que deseja abrir outro orçamento?</b><p style="margin-top: 7px;">Alterações não salvas serão perdidas.</p>`)) {
    filePicker.value.show()
  }
}

function openFile(file) {
  editingRow.value = null
  document.querySelector('#logoPicker').value = ''
  estimative.value = file
  oldEstimative.value = JSON.parse(JSON.stringify(estimative.value))
  readOnlyMode.value = false
  document.querySelectorAll('.placeholder').forEach(el => {
    el.style.display = ''
  })
  router.replace({ name: 'EstimativeGenerator' })
}

function addRow() {
  estimative.value.services.push({ description: '', value: 0 })
  setEditingRow(estimative.value.services.length - 1)
}

function setEditingRow(index) {
  if (index !== editingRow.value) {
    editingRow.value = index
    oldValues.value = JSON.parse(JSON.stringify(estimative.value.services[index]))
  }
}

function cancelEdition() {
  estimative.value.services[editingRow.value] = oldValues.value
  editingRow.value = null
  updateTotalPrice()
}

function saveEdition() {
  editingRow.value = null
  updateTotalPrice()
  document.querySelector('.addRowButton').focus()
}

function removeRow(index) {
  estimative.value.services.splice(index, 1)
  updateTotalPrice()
  document.querySelector('.addRowButton').focus()
}

function updateTotalPrice() {
  estimative.value.totalValue = 0
  for (let i = 0; i < estimative.value.services.length; i++) {
    estimative.value.totalValue += parseFloat(estimative.value.services[i].value)
  }
}

async function saveNewEstimative() {
  let name = await Dialog.prompt('Qual é o nome do orçamento?')
  if (name) {
    estimative.value.name = name
    let file = document.getElementById('logoPicker').files[0]
    if (!file && estimative.value.company.logoUrl) {
      const blob = await fetch(estimative.value.company.logoUrl).then(r => r.blob())
      file = new File([blob], estimative.value.company.logo, { type: 'image/png' })
    }
    let body = new FormData()

    body.append('name', name)
    if (file)
      body.append('logo', file)
    body.append('company', JSON.stringify(estimative.value.company))
    body.append('client', JSON.stringify(estimative.value.client))
    body.append('services', JSON.stringify(estimative.value.services))
    body.append('totalValue', estimative.value.totalValue)

    estimativeApi.create(body)
      .then(async (res) => {
        if (res.data.existingEstimative) {
          if (await Dialog.confirm(/*html*/`<b>Já existe um orçamento com esse nome.</b><p style="margin-top: 7px;">Deseja sobreescrever?</p>`)) {
            estimative.value._id = res.data.existingEstimative._id
            overwriteEstimative()
          }
        }
        else {
          estimative.value._id = res.data._id
          oldEstimative.value = JSON.parse(JSON.stringify(estimative.value))
          Message.show({ success: 'Orçamento salvo com sucesso!' })
        }
        document.querySelector('#logoPicker').value = ''
      })
  }
}

async function saveEstimative() {
  let file = document.getElementById('logoPicker').files[0]
  let body = new FormData()

  if (file)
    body.append('logo', file)
  body.append('company', JSON.stringify(estimative.value.company))
  body.append('client', JSON.stringify(estimative.value.client))
  body.append('services', JSON.stringify(estimative.value.services))
  body.append('totalValue', estimative.value.totalValue)
  estimativeApi.update(estimative.value._id, body)
    .then(() => {
      oldEstimative.value = JSON.parse(JSON.stringify(estimative.value))
      Message.show({ success: 'Orçamento salvo com sucesso!' })
      document.querySelector('#logoPicker').value = ''
    })
}

async function deleteEstimative() {
  if (await Dialog.confirm(/*html*/`<b>Tem certeza que deseja remover este orçamento?</b><p style="margin-top: 7px;">Esta ação não poderá ser desfeita.</p>`)) {
    estimativeApi.delete(estimative.value._id)
      .then(() => {
        clearEstimative(true)
        Message.show({ success: 'Orçamento removido com sucesso!' })
      })
  }
}

function print() {
  printingEstimative.value = true
  dispatchEvent('printingEstimative', true)

  Array.from(document.querySelectorAll('.placeholder')).map((el) => {
    el.style.opacity = '0'
  })
  if (!showingClientInfo.value) {
    document.querySelector('.clientInfo').style.display = 'none'
  }

  estimativeWrapper.value.style = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: unset;
    height: 100vh;
    margin: 0;
    z-index: 9999;
  `
  setTimeout(() => {
    window.print()
    setTimeout(() => {
      printingEstimative.value = false
      dispatchEvent('printingEstimative', false)
      estimativeWrapper.value.style = ''
      Array.from(document.querySelectorAll('.placeholder')).map((el) => {
        el.style.opacity = '1'
      })
      if (!showingClientInfo.value) {
        document.querySelector('.clientInfo').style.display = ''
      }
    }, 0)
  }, 0)
}

async function shareEstimative() {
  router.replace({ name: 'EstimativeGenerator' })
  const url = window.location.href
  const text = `${url}/${estimative.value._id}`
  navigator.clipboard.writeText(text).then(() => {
    Dialog.showMessage({ message: 'Link copiado para a área de transferência' })
  }).catch((err) => {
    console.error(err)
    Dialog.showMessage({ error: 'Erro ao copiar link.' })
  })
}
</script>

<style scoped>
section {
  width: 100%;
  padding: 45px 0 0;
  gap: 17px;
}

#estimativeWrapper {
  width: 90vw;
  max-width: 800px;
  height: fit-content;
  margin: 7px auto;
  padding: 7px;
  position: relative;
}

#estimative {
  background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
  box-shadow: var(--dark-box-shadow);
  border-radius: .5rem;
  padding: 7px;
}

.light-theme #estimative {
  background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
  box-shadow: var(--light-box-shadow);
}

header {
  display: flex;
  flex-direction: column;
  padding: 7px 0 0;
  gap: 7px;
}

header div {
  display: flex;
  gap: 7px;
}

header div.logoWrapper {
  flex: .5;
  display: grid;
  place-items: center;
  cursor: pointer;
  user-select: none;
  aspect-ratio: 1 / 1;
}

.placeholder {
  border: 2px dotted var(--secondary);
  border-radius: .5rem;
  cursor: pointer;
  opacity: .5;
  padding: 3px 7px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 7px;
  user-select: none;
}

.placeholder:hover {
  filter: brightness(1.2);
  transform: scale(1.025);
}

.placeholder:active {
  filter: brightness(.8);
  transform: scale(.98);
}

.fieldEditor {
  width: 100%;
  margin: 0;
}

header div.logoPlaceholder {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
}

header div.title {
  flex: 1.9;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

header div.title sup {
  font-size: .9rem;
  cursor: pointer;
}

header div.contactWrapper {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: .9rem;
}

header div.contactWrapper span {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px;
  cursor: pointer;
}

header div.clientInfo {
  display: grid;
  grid-template-rows: 0fr auto;
  transition: .2s;
  margin-top: 17px;
}

header div.clientInfo.expanded {
  grid-template-rows: 1fr auto;
}

header div.clientInfo>div {
  overflow: hidden;
  display: flex;
  gap: 7px;
}

header div.clientInfo>div>b {
  flex: .5;
  text-align: center;
}

header div.clientInfo>div .clientInfoWrapper {
  flex: 1.9;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

header div.clientInfo>div .clientContactWrapper {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 7px;
}

header div.clientInfo>div .clientInfoWrapper span,
header div.clientInfo>div .clientContactWrapper span {
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  font-size: .85rem;
}



h1,
h1.placeholder {
  padding: 3px;
  cursor: pointer;
}

h2,
h2.placeholder {
  display: block;
  margin: 17px 0 0;
  padding: 3px;
  cursor: pointer;
  text-align: center;
}

sup {
  display: flex;
  gap: 7px;
  padding: 3px;
  align-items: center;
  /* justify-content: center; */
}

.table {
  margin-top: 7px;
  border-radius: .5rem;
  overflow: hidden;
}

.rowInput {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.rowButtons {
  display: grid;
  place-items: center;
  padding: 4px 0;
}

.rowButton {
  padding: 3px;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
}

Button.addRowButton.flat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 17px auto 333px;
  padding: 3px 17px;
  font-size: 1rem;
  min-width: fit-content;
  width: 70vw;
  max-width: 600px;
  color: var(--primary);
}

#estimative.readonly * {
  cursor: default !important;
  pointer-events: none;
}
</style>