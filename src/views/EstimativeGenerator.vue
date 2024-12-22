<template>
  <section ref="section">
    <div id="tools">

      <Button class="secondary headerButton" @click="clearEstimative">
        <Icon class="file" :size="1.5" />
        <b>Novo</b>
      </Button>

      <Button class="secondary headerButton" @click="openFilePicker">
        <Icon class="folder" :size="1.5" />
        <b>Abrir</b>
      </Button>

      <Button class="primary headerButton" @click="saveNewEstimative">
        <Icon class="plus" :size="1.5" />
        <b>Salvar como...</b>
      </Button>

      <Button class="primary headerButton" @click="saveEstimative" v-if="estimative.value._id">
        <Icon class="save" :size="1.5" />
        <b>Salvar</b>
      </Button>

      <Button class="danger headerButton" @click="deleteEstimative" v-if="estimative.value._id">
        <Icon class="trash" :size="1.5" />
        <b>Excluir</b>
      </Button>

      <Button class="secondary headerButton" style="margin-left: auto;" @click="print">
        <Icon class="printer" :size="1.5" />
        <b>Imprimir</b>
      </Button>
    </div>

    <div id="estimativeWrapper" ref="estimativeWrapper">
      <div id="estimative">
        <header>
          <Image :src="`${darkTheme ? '/logo.svg' : '/white-logo.svg'}`" alt="Razion" :size="5" />
          <div class="title">
            <h1>Razion Softwares</h1>
            <sup>
              <Icon class="message-circle" />
              (47) 9 8895-6620
            </sup>
          </div>
        </header>
        <sup style="margin: 17px 0 7px auto; display: block; width: fit-content; padding: 0 7px; font-size: .8rem;">{{ estimativeDate }}</sup>
        <h1>Orçamento de serviços</h1>
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
                <Input :class="`input ${editingRow == index ? 'focusInput' : ''}`" v-model="service.description" @keypress.enter="saveEdition" @keydown.esc="cancelEdition" />
              </div>
              <Td v-else>{{ service.description }}</Td>

              <div style="padding: 3px;" v-if="editingRow == index">
                <Input class="input" type="number" v-model="service.value" @input="updateTotalPrice" @keypress.enter="saveEdition" @keydown.esc="cancelEdition" />
              </div>
              <Td v-else>R$ {{ Number(service.value).toFixed(2) }}</Td>

              <div v-if="editingRow == index" class="rowButtons">
                <Button class="secondary rowButton" @click.stop="cancelEdition">
                  <Icon class="x" bold />
                </Button>
              </div>
              <div v-else-if="mouseIn == index" class="rowButtons">
                <Button class="danger rowButton rmRowButton" @click.stop="removeRow(index)">
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
    <Button class="addRowButton" @click="addRow">
      <Icon class="plus" :size="1.5" bold />
      Adicionar serviço
    </Button>
  </section>
  <FilePicker ref="filePicker" @openFile="openFile" />
</template>

<script setup>
import { ref, reactive, computed, inject } from 'vue'
import { useStore } from '@/stores/main'
import { dispatchEvent } from '@/utils/events'

import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Image from '@/components/uiElements/Image.vue'
import Input from '@/components/formElements/Input.vue'
import Table from '@/components/uiElements/Table.vue'
import Th from '@/components/componentElements/Table/Th.vue'
import Td from '@/components/componentElements/Table/Td.vue'
import FilePicker from '@/components/viewElements/EstimativeGenerator/FilePicker.vue'
import estimativeApi from '@/services/estimativeApi'
import { getDate } from '@/utils/date'

const store = useStore()
const darkTheme = computed(() => store.darkTheme)
const Dialog = inject('Dialog').value
const Message = inject('Message').value
const section = ref()
const estimativeWrapper = ref()
const table = ref()
const filePicker = ref()

const estimative = reactive({
  value: {
    _id: null,
    name: '',
    services: [],
    totalValue: 0,
  }
})
const estimativeDate = computed(() => {
  if (estimative.value._id)
    return getDate(estimative.value.updatedAt)
  else
    return new Date().toLocaleDateString('pt-BR')
})
const editingRow = ref(null)
const oldValues = ref({ description: '', value: '' })
const mouseIn = ref(-1)

async function clearEstimative() {
  if (!estimative.value.services.length)
    return
  else if (await Dialog.confirm(/*html*/`<b>Tem certeza que deseja iniciar um novo orçamento?</b><p style="margin-top: 7px;">Alterações não salvas serão perdidas.</p>`)) {
    estimative.value = {
      _id: null,
      name: '',
      services: [],
      totalValue: 0
    }
  }
}

async function openFilePicker() {
  if (!estimative.value.services.length)
    filePicker.value.show()
  else if (await Dialog.confirm(/*html*/`<b>Tem certeza que deseja abrir outro orçamento?</b><p style="margin-top: 7px;">Alterações não salvas serão perdidas.</p>`)) {
    filePicker.value.show()
  }
}

function openFile(file) {
  editingRow.value = null
  estimative.value = file
}

function addRow() {
  estimative.value.services.push({ description: '', value: 0 })
  setEditingRow(estimative.value.services.length - 1)
}

function setEditingRow(index) {
  if (index !== editingRow.value) {
    editingRow.value = index
    oldValues.value = JSON.parse(JSON.stringify(estimative.value.services[index]))
    setTimeout(() => {
      document.querySelector('.focusInput').focus()
    }, 0)
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
}

function removeRow(index) {
  estimative.value.services.splice(index, 1)
  updateTotalPrice()
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
    estimativeApi.create(estimative.value)
      .then(async (res) => {
        if (res.data.existingEstimative) {
          if (await Dialog.confirm(/*html*/`<b>Já existe um orçamento com esse nome.</b><p style="margin-top: 7px;">Deseja sobreescrever?</p>`)) {
            estimative.value._id = res.data.existingEstimative._id
            overwriteEstimative()
          }
        }
        else {
          estimative.value._id = res.data._id
          Message.show({ success: 'Orçamento salvo com sucesso!' })
        }
      })
  }
}

async function saveEstimative() {
  if (await Dialog.confirm(/*html*/`<b>Tem certeza que deseja sobreescrever o orçamento?</b>`)) {
    overwriteEstimative()
  }
}

function overwriteEstimative() {
  estimativeApi.update(estimative.value._id, estimative.value)
    .then(() => {
      Message.show({ success: 'Orçamento salvo com sucesso!' })
    })
}

async function deleteEstimative() {
  if (await Dialog.confirm(/*html*/`<b>Tem certeza que deseja remover este orçamento?</b><p style="margin-top: 7px;">Esta ação não poderá ser desfeita.</p>`)) {
    estimativeApi.delete(estimative.value._id)
      .then(() => {
        estimative.value = {
          _id: null,
          name: '',
          services: [],
          totalValue: 0
        }
        Message.show({ success: 'Orçamento removido com sucesso!' })
      })
  }
}

function print() {
  dispatchEvent('printingEstimative', true)

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
      dispatchEvent('printingEstimative', false)
      estimativeWrapper.value.style = ''
    }, 0)
  }, 0)
}
</script>

<style scoped>
section {
  width: 100%;
  padding: 51px 0 0;
  gap: 17px;
}

#tools {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding: 17px 17px 0;
}

Button.headerButton {
  padding: 3px 7px;
  display: flex;
  gap: 7px;
  align-items: center;
}

#estimativeWrapper {
  width: 90vw;
  max-width: 800px;
  height: fit-content;
  margin: 7px auto;
  padding: 7px;
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

#estimative header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 17px;
  gap: 17px;
}

#estimative header div.title {
  flex: 1;
}

h1 {
  text-align: center;
}

sup {
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
}

.table {
  margin-top: 33px;
  border-radius: .5rem;
  overflow: hidden;
}

.input {
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

.addRowButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 17px auto 333px;
  padding: 3px 17px;
  font-size: 1rem;
}
</style>