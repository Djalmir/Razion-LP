<template>
	<button :disabled="loading" ref="self" :class="props.class" v-bind="$attrs">
		<div v-if="loading && type == 'submit'" style="display: grid; place-items: center;">
			<Icon class="loader" />
		</div>
		<slot v-else></slot>
	</button>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'

const self = ref()
const props = defineProps({
	type: {
		type: String
	},
	class: {
		type: String,
		default: 'primary'
	}
})

const linearGradient = computed(() => {
	const styleClasses = ['primary', 'secondary', 'neutral', 'danger', 'success']
	let classList = props.class.split(' ')
	let className = classList.find(c => styleClasses.includes(c)) || 'primary'
	return `linear-gradient(145deg, var(--${ className }-light), var(--${ className }))`
})

const loading = ref(false)

window.addEventListener('setLoading', (e) => {
	if (props.type == 'submit' && (document.activeElement == self.value || !e.detail))
		loading.value = e.detail ? true : false
})
</script>

<style scoped>
button {
	width: fit-content;
	background: v-bind(linearGradient);
	color: var(--font2);
	padding: .5rem 1rem;
	border-radius: .3rem;
	cursor: pointer;
	box-shadow: var(--box-shadow);
	user-select: none;
	white-space: nowrap;
	font-weight: bold;
}

.secondary,
.success {
	color: var(--dark-font1);
}

button:hover:not(:disabled),
button:focus:not(:disabled) {
	filter: brightness(1.2);
	box-shadow: var(--box-shadow-hover);
}

button:active:not(:disabled) {
	filter: brightness(.8);
	box-shadow: var(--box-shadow-inset);
}

button:disabled {
	opacity: .5;
	cursor: not-allowed;
	background: linear-gradient(145deg, var(--bg2), var(--bg1));
}

.light-theme button:disabled {
	background: linear-gradient(145deg, var(--bg4), var(--bg2));
}

button.outline {
	background: transparent;
	color: var(--font1);
}

button.flat {
	background: transparent;
	color: var(--font1);
	box-shadow: none;
}

button.flat:hover:not(:disabled),
button.flat:active:not(:disabled) {
	box-shadow: none;
} 
</style>