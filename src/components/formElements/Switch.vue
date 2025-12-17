<template>
	<label @click="handleClick">
		<slot name="left-label"></slot>
		<div class="switchContainer" tabindex="0">
			<Icon v-if="leftIcon" :class="leftIcon" bold></Icon>
			<div class="switch"></div>
			<Icon v-if="rightIcon" :class="rightIcon" bold></Icon>
		</div>
		<slot name="right-label"></slot>
	</label>
</template>

<script setup>
import { computed, watch } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps(['leftIcon', 'rightIcon', 'modelValue', 'switchColors'])
const emit = defineEmits(['update:modelValue'])
const checked = computed(() => { return props.modelValue })
watch(checked, () => {
	emit('update:modelValue', checked.value)
})
function handleClick() {
	emit('update:modelValue', !checked.value)
}

const switchTranslate = computed(() => {
	return checked.value ? 'calc(100% + 3px)' : '0'
})

const switchBg = computed(() => {
	if (props.switchColors) {
		if (Array.isArray(props.switchColors))
			return checked.value ? props.switchColors[1] : props.switchColors[0]
		return checked.value ? 'var(--primary)' : 'var(--neutral)'
	}
	else
		return 'var(--primary)'
})


</script>

<style scoped>
label {
	display: flex;
	align-items: center;
	gap: 7px;
	cursor: pointer;
	text-align: left;
	width: fit-content;
}

label:hover .switchContainer {
	background: var(--bg2);
}

.switchContainer {
	display: flex;
	align-items: center;
	gap: 7px;
	cursor: pointer;
	padding: 5px 7px;
	border-radius: 1rem;
	background-color: var(--bg1);
	position: relative;
	box-shadow: var(--box-shadow-inset);
	width: fit-content;
	min-width: 51px;
	min-height: 27px;
}

.light-theme .switchContainer {
	background-color: var(--bg2);
	box-shadow: var(--box-shadow-inset);
}

.light-theme label:hover .switchContainer {
	background-color: var(--bg3);
}

.switch {
	min-width: 21px;
	min-height: 21px;
	border-radius: 50%;
	background-color: v-bind(switchBg);
	position: absolute;
	top: 50%;
	left: 3px;
	transition: transform .2s;
	box-shadow: var(--dark-box-shadow);
	transform: translate(v-bind(switchTranslate), -50%) scale(1);
	transform-origin: center center;
}

.switchContainer:active .switch {
	transform: translate(v-bind(switchTranslate), -50%) scale(.9);
}
</style>