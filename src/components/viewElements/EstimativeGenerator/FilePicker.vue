<template>
  <Modal ref="modal" @close="close">
    <template v-slot:header>
      <h1>Abrir orçamento</h1>
    </template>
    <div id="filePicker">
      <Table templateColumns="3fr 1fr" class="table" :scrollbars="false">
        <template #headingRow>
          <Th title="Nome" />
          <Th title="Preço" />
        </template>
        <template #rows>
          <div v-for="file in files" @click="selectedFile = file" @dblclick="open(file)" :class="`row ${selectedFile == file ? 'active' : ''}`">
            <Td>{{ file.name }}</Td>
            <Td>R${{ Number(file.totalValue).toFixed(2) }}</Td>
          </div>
        </template>
      </Table>
    </div>
    <template v-slot:footer>
      <Button :disabled="!selectedFile" @click="open">Abrir</Button>
      <Button class="neutral" @click="close">Cancelar</Button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import estimativeApi from '@/services/estimativeApi'
import Modal from '@/components/uiElements/Modal.vue'
import Button from '@/components/uiElements/Button.vue'
import Table from '@/components/uiElements/Table.vue'
import Th from '@/components/componentElements/Table/Th.vue'
import Td from '@/components/componentElements/Table/Td.vue'

const modal = ref()

const files = ref([])
const selectedFile = ref(null)

const emit = defineEmits(['openFile'])

function show() {
  modal.value.show()
  estimativeApi.list()
    .then((res) => {
      files.value = res.data
    })
}

function open(file) {
  emit('openFile', selectedFile.value || file)
  close()
}

function close() {
  selectedFile.value = null
  modal.value.close()
}

defineExpose({ show })
</script>

<style scoped>
h1 {
  font-size: 1.25rem;
}

#filePicker {
  width: 90vw;
  max-width: 800px;
  min-height: 70px;
  max-height: 70vh;
}

.table {
  border-radius: .5rem;
  overflow: hidden;
}

.table .row {
  transition: all .1s, background .35s;
}

.table .row.active {
  background: var(--primary);
  color: var(--light-font1);
}
</style>