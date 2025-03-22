<template>
  <div class="messageDialog" @focus="inputFocus" @keydown.escape="$emit('close')">
    <Button class="closeBt" @click="$emit('close')">
      <Icon class="x" :size="1.5" />
    </Button>
    <section ref="messageSection">
      <Input ref="input" class="input" v-model="answer" :label="inputLabel" @keypress.enter="$emit('accept', answer)" @keypress.escape="$emit('close')" />
    </section>
    <footer>
      <Button class="confirmBt" @click="$emit('accept', answer)">Ok</Button>
      <Button class="cancelBt" @click="$emit('close')">Cancelar</Button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Input from '@/components/formElements/Input.vue'

const props = defineProps(['message'])
const input = ref()
const inputLabel = ref('')
const answer = ref('')
const msg = computed(() => {
  return props.message
})
const messageSection = ref()
watch(msg, () => {
  inputLabel.value = msg.value
})

onMounted(() => {
  inputLabel.value = msg.value
})

function inputFocus() {
  input.value.$el.focus()
}
</script>

<style scoped>
.messageDialog {
  width: 90%;
  max-width: 480px;
  height: fit-content;
  min-height: 180px;
  background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
  position: fixed;
  top: 33px;
  border-radius: .4rem;
  box-shadow: var(--dark-box-shadow);
  display: flex;
  flex-direction: column;
}

.light-theme .messageDialog {
  background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
  box-shadow: var(--light-box-shadow);
}

.closeBt {
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(17%, -17%);
  background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
  color: var(--danger-light);
  padding: 2px;
  display: grid;
  place-items: center;
}

.light-theme .closeBt {
  background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
}

section {
  flex: 1;
  padding: 27px 13px 13px;
}

.input {
  width: 100%;
}

footer {
  padding: 13px;
  display: flex;
  flex-direction: row;
  gap: 7px;
}

.confirmBt {
  flex: .25;
  margin-left: auto;
}

.cancelBt {
  flex: .25;
  background: linear-gradient(145deg, var(--neutral-light), var(--neutral));
}

.light-theme .cancelBt {
  background: linear-gradient(145deg, var(--dark-bg4), var(--neutral));
}
</style>