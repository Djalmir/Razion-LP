<template>
	<div class="modalWrapper">
		<transition name="fade">
			<div class="modalShadow" v-if="showing" @click="$emit('close')"></div>
		</transition>
		<transition name="grow">
			<div class="modal" ref="modal" v-if="showing" @keydown.escape="$emit('close')" tabindex="0">
				<header class="modalHeader">
					<slot name="header"></slot>
				</header>
				<section>
					<slot></slot>
				</section>
				<footer class="modalFooter">
					<slot name="footer"></slot>
				</footer>
				<Button class="neutral closeModalBt" @click="$emit('close')">
					<Icon class="x" :size="1.5" />
				</Button>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const showing = ref(false)
const message = inject('Message').value

const modal = ref()

const props = defineProps({
	autoPadding: {
		type: Boolean,
		default: true
	}
})

const sectionPadding = computed(() => {
	if (!props.autoPadding)
		return '0'
	let showingHeader = modal.value?.querySelector('.modalHeader').children.length
	let showingFooter = modal.value?.querySelector('.modalFooter').children.length
	return `${showingHeader ? '51px' : '17px'} 17px ${showingFooter ? '69px' : '17px'} 17px`
})

function show() {
	message.closeAll()
	document.body.click()
	showing.value = true
	setTimeout(() => {
		let element = modal.value.querySelector('section input', 'section textarea', 'section select', 'section button')
		if (element) {
			element.focus()
		}
		else {
			modal.value.focus()
		}
	}, 200)
}

function close() {
	message.closeAll()
	document.body.click()
	showing.value = false
}

defineExpose({
	show,
	close
})

</script>

<style scoped>
.modalWrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	z-index: 3;
	pointer-events: none;
}

.modalShadow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--bg1-transparent);
	backdrop-filter: blur(2px);
	pointer-events: all;
}

.modal {
	position: relative;
	max-width: 90vw;
	background: linear-gradient(145deg, var(--bg3), var(--bg1));
	box-shadow: var(--box-shadow);
	border-radius: .3rem;
	pointer-events: all;
}

.modal .modalHeader:has(*) {
	width: 100%;
	padding: 7px 17px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	backdrop-filter: blur(5px);
	border-radius: .3rem .3rem 0 0;
	background: linear-gradient(145deg, var(--bg3-transparent), var(--bg1-transparent));
	box-shadow: var(--box-shadow);
	z-index: 2;
}

.modal section {
	padding: v-bind(sectionPadding);
	width: 100%;
	max-height: 90vh;
	overflow: auto;
}

.modal .modalFooter:has(*) {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	gap: 7px;
	padding: 7px 17px 17px;
	backdrop-filter: blur(5px);
	border-radius: 0 0 .3rem .3rem;
	background: linear-gradient(145deg, var(--bg3-transparent), var(--bg1-transparent));
	box-shadow: var(--box-shadow);
}

.modalFooter * {
	flex: 1;
}

.closeModalBt {
	position: absolute;
	top: 0;
	right: 0;
	padding: 2px;
	transform: translate(17%, -17%);
	display: grid;
	place-items: center;
	background: linear-gradient(145deg, var(--bg3), var(--bg1));
	color: var(--danger-light);
	z-index: 2;
}
</style>