<template>
	<div class="messageDialog" @focus="confirmBtFocus" @keydown.escape="$emit('close')">
		<Button class="closeBt" @click="$emit('close')">
			<Icon class="x" :size="1.5" />
		</Button>
		<section ref="messageSection"></section>
		<footer>
			<Button class="confirmBt" @click="$emit('accept')">Sim</Button>
			<Button class="cancelBt" @click="$emit('close')">Não</Button>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps(['message'])
const msg = computed(() => {
	return props.message
})
const messageSection = ref()
watch(msg, () => {
	messageSection.value.innerHTML = msg.value
})

onMounted(() => {
	messageSection.value.innerHTML = msg.value
})

function confirmBtFocus() {
	document.querySelector('.confirmBt').focus()
}
</script>

<style scoped>
.messageDialog {
	width: 90%;
	max-width: 480px;
	height: fit-content;
	min-height: 180px;
	background: linear-gradient(145deg, var(--bg2), var(--bg1));
	position: fixed;
	top: 33px;
	border-radius: .4rem;
	box-shadow: var(--box-shadow);
	display: flex;
	flex-direction: column;
}

.closeBt {
	position: absolute;
	top: 0px;
	right: 0px;
	transform: translate(17%, -17%);
	background: linear-gradient(145deg, var(--bg3), var(--bg1));
	color: var(--danger-light);
	padding: 2px;
	display: grid;
	place-items: center;
}

section {
	flex: 1;
	padding: 27px 13px 13px;
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
	color: var(--light-font1);
}

.cancelBt {
	flex: .25;
	background: linear-gradient(145deg, var(--neutral-light), var(--neutral));
	color: var(--light-font1);
}
</style>