<template>
  <div id="tools">
    <div>
      <Button class="flat headerButton" @click="$emit('new')">
        <Icon class="file" :size="1.25" />
        <b>Novo</b>
      </Button>

      <Button class="flat headerButton" @click="$emit('open')">
        <Icon class="folder" :size="1.25" />
        <b>Abrir</b>
      </Button>

      <Button v-if="!readOnlyMode" class="flat headerButton primary" @click="$emit('saveas')">
        <Icon class="plus" :size="1.25" />
        <b>Salvar como...</b>
      </Button>

      <Button v-if="!readOnlyMode && estimative.value._id" class="flat headerButton primary" @click="$emit('save')">
        <Icon class="save" :size="1.25" />
        <b>Salvar</b>
      </Button>

      <Button v-if="!readOnlyMode && estimative.value._id" class="flat headerButton danger" @click="$emit('delete')">
        <Icon class="trash" :size="1.25" />
        <b>Excluir</b>
      </Button>

      <Button class="flat headerButton" @click="$emit('print')" style='margin-left: auto;'>
        <Icon class="printer" :size="1.25" />
        <b>Imprimir</b>
      </Button>

      <Button v-if="!readOnlyMode && estimative.value._id" class="flat headerButton primary" @click="$emit('share')">
        <Icon class="share-2" :size="1.25" />
        <b>Compartilhar</b>
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps(['estimative', 'readOnlyMode'])

</script>

<style scoped>
#tools {
  background: var(--dark-bg1);
  box-shadow: var(--dark-box-shadow);
  overflow: auto;
}

.light-theme #tools {
  background: var(--light-bg1);
  box-shadow: var(--light-box-shadow);
}

#tools div {
  display: flex;
  gap: 7px;
  min-width: 100%;
  width: fit-content;
  padding: 7px 33px;
}

Button.headerButton {
  padding: 3px 7px;
  border-radius: .3rem;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1.25em 0px;
  overflow: hidden;
  align-items: center;
  gap: 7px;
  transition: .2s ease;
}

Button.headerButton:hover {
  background: var(--secondary);
  color: var(--dark-font2);
  box-shadow: var(--dark-box-shadow) !important;
  grid-template-columns: 1.25em 81px;
}

Button.headerButton.primary:hover {
  background: var(--primary);
}

Button.headerButton.danger:hover {
  background: var(--danger);
}

Button.headerButton.success:hover {
  background: var(--success);
}

Button.headerButton:active {
  box-shadow: var(--inset-dark-box-shadow) !important;
}

b {
  overflow: hidden;
  white-space: nowrap;
  font-size: .75rem;
}
</style>