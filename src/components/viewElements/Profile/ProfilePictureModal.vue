<template>
	<Modal ref="modal" @close="close">
		<img :src="src" :alt="alt" />
	</Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/uiElements/Modal.vue'

const modal = ref()

const props = defineProps({
	src: {
		type: [String, null],
		required: true
	},
	alt: {
		type: String,
		required: true
	}
})

function show() {
	modal.value.show()
}

function close() {
	modal.value.close()
}

defineExpose({
	show
})
</script>

<style scoped>
img {
	max-width: calc(100vw - 131px);
	max-height: calc(100vh - 131px);
	object-position: center;
	object-fit: cover;
	border-radius: .3rem;
}
</style>