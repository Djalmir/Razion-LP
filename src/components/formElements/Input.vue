<template>
	<label v-bind="$attrs">
		<span v-if="label">
			{{ label }}
		</span>
		<div class="inputWrapper">
			<Icon v-if="showLeftIcon" :class="`${leftIcon.class} icon`" @click="leftIcon.action" :size="leftIcon.size || 1.2"
				:style="leftIcon.style" :bold="leftIcon.bold"></Icon>
			<input ref="input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
			<Icon v-if="showRightIcon" :class="`${rightIcon.class} icon rightIcon`" @click="rightIcon.action"
				:size="rightIcon.size || 1.2" :style="rightIcon.style" :bold="rightIcon.bold"></Icon>
		</div>
	</label>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'
const props = defineProps(['modelValue', 'label', 'leftIcon', 'rightIcon'])
const input = ref()
const showLeftIcon = computed(() => {
	return props.leftIcon && (props.leftIcon.vIf != undefined ? props.leftIcon.vIf : true)
})
const leftPadding = computed(() => {
	return props.leftIcon ? '33px' : '7px'
})
const showRightIcon = computed(() => {
	return props.rightIcon && (props.rightIcon.vIf != undefined ? props.rightIcon.vIf : true)
})
const rightPadding = computed(() => {
	return props.rightIcon ? '33px' : '7px'
})

onMounted(() => {
	if (input.value.hasAttribute('autofocus')) {
		setTimeout(() => {
			input.value.focus()
		}, 0)
	}
})
</script>

<style scoped>
label {
	display: flex;
	flex-direction: column;
	gap: 3px;
	width: fit-content;
	margin: 7px 0 17px;
}

span {
	font-size: .9rem;
	padding-left: 7px;
	white-space: nowrap;
	font-weight: bold;
}

.inputWrapper {
	position: relative;
	width: 100%;
}

.inputWrapper .icon {
	position: absolute;
	top: 50%;
	left: 7px;
	transform: translateY(-50%);
	cursor: pointer;
}

.inputWrapper .icon.rightIcon {
	right: 7px;
	left: auto;
}

input {
	font-family: 'Roboto', sans-serif;
	font-size: 1rem;
	padding: 7px v-bind(rightPadding) 7px v-bind(leftPadding);
	border-radius: .3rem;
	box-shadow: var(--box-shadow-inset);
	background: linear-gradient(145deg, var(--bg2), var(--bg1));
	color: var(--font2);
	width: 100%;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
	-webkit-box-shadow: var(--box-shadow-inset), inset 0 0 0 1000px var(--bg1) !important;
	box-shadow: var(--box-shadow-inset), inset 0 0 0 1000px var(--bg1) !important;
	-webkit-text-fill-color: var(--font2) !important;
}

.light-theme input {
	background: linear-gradient(145deg, var(--bg4), var(--bg3));
}

.light-theme input:-webkit-autofill,
.light-theme input:-webkit-autofill:hover,
.light-theme input:-webkit-autofill:focus {
	-webkit-box-shadow: var(--box-shadow-inset), inset 0 0 0 1000px var(--bg4) !important;
	box-shadow: var(--box-shadow-inset), inset 0 0 0 1000px var(--bg4) !important;
}
</style>