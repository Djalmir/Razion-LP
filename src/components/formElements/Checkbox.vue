<template>
	<label>
		<input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" :class="`${props.class ? props.class : ''} ${props.pin ? 'pin' : ''}`" v-bind="$attrs" />
		<span>
			{{ label }}
		</span>
	</label>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	label: {
		type: String,
		default: ''
	},
	rounded: {
		type: Boolean,
		default: false
	},
	class: {
		type: String,
	},
	pin: {
		type: Boolean,
		default: false
	}
})
const borderRadius = computed(() => {
	if (props.rounded || props.pin)
		return '50%'
	return '0.15em'
})
</script>

<style scoped>
label {
	width: fit-content;
	display: flex;
	align-items: center;
	gap: 7px;
	cursor: pointer;
	user-select: none;
}

input {
	appearance: none;
	background: var(--bg1);
	margin: 0;
	font: inherit;
	width: 1.2rem;
	min-width: 1.2rem;
	height: 1.2rem;
	min-height: 1.2rem;
	border-radius: v-bind(borderRadius);
	box-shadow: var(--box-shadow-inset);
	display: grid;
	place-content: center;
	transition: .15s;
	cursor: pointer;
}

.light-theme input {
	background: var(--bg4);
}

input:hover,
input:focus {
	filter: brightness(1.2);
}

input:active {
	filter: brightness(.8);
}

input:checked {
	background: var(--primary-transparent);
}

input::before {
	content: "";
	width: .7rem;
	height: .7rem;
	transform: scale(0);
	transition: .15s ease-in-out;
	box-shadow: inset 1rem 1rem var(--primary-light);
	clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.light-theme input::before {
	box-shadow: inset 1rem 1rem var(--primary);
}

input.pin:checked {
	background: radial-gradient(var(--primary) 33%, var(--bg-2)33%);
}

input.pin::before {
	clip-path: none;
	box-shadow: none;
	width: .5em;
	height: .5em;
}

input:checked::before {
	transform: scale(1);
}
</style>