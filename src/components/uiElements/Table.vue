<template>
	<div class="tableWrapper" ref="tableWrapper">
		<div v-if="showLoading" class="loaderWrapper">
			<div class="loaderDiv">
				<Icon class="loader" :size="2" />
				Carregando...
			</div>
		</div>
		<div class="table">
			<div class="headingRow" ref="headingRow">
				<slot name="headingRow"></slot>
			</div>
			<div class="rows" ref="rows">
				<slot name="rows"></slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps({
	templateColumns: {
		type: String,
		default: "minmax(220px, 1fr) minmax(120px, .5fr) minmax(180px, 1fr) 1fr",
	},
	scrollbars: {
		type: Boolean,
		default: true
	},
	growOnHover: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const tableWrapper = ref()
const rows = ref()
const observer = ref()
const windowHeight = computed(() => window.innerHeight)
const bounding = computed(() => tableWrapper.value.getBoundingClientRect())
const rowsWrapperHeight = computed(() => windowHeight.value - bounding.value.top - 62 + 'px')
const showLoading = computed(() => props.loading)
const rowPadding = computed(() => {
	if (props.growOnHover)
		return '17px 0'
	else
		return '0'
})
const templateColumns = computed(() => props.templateColumns)
const emit = defineEmits(['nextPage'])
const renderingTable = ref(true)

const rowCount = ref(0)

function handleRowsChange() {
	rowCount.value = rows.value?.children?.length || 0
	nextTick(() => renderingTable.value = false)
}

onMounted(() => {
	tableWrapper.value.addEventListener('scroll', getNextPage)

	if (rows.value) {
		observer.value = new MutationObserver(handleRowsChange)
		observer.value.observe(rows.value, { childList: true })
		handleRowsChange()
	}

	setTimeout(() => {
		if (props.scrollbars) {
			tableWrapper.value.style.overflow = 'auto'
			tableWrapper.value.style.paddingBottom = '70px'
			tableWrapper.value.style.height = rowsWrapperHeight.value
			rows.value.style.paddingBottom = '25vh'
		}
	}, 0)
})

function getNextPage() {
	if (tableWrapper.value.scrollTop + tableWrapper.value.clientHeight > tableWrapper.value.scrollHeight * .7 && !renderingTable.value) {
		renderingTable.value = true
		emit('nextPage')
	}
}

onBeforeUnmount(() => {
	tableWrapper.value.removeEventListener('scroll', getNextPage)
	observer.value?.disconnect()
})
</script>

<style scoped>
.tableWrapper {
	width: 100%;
	position: relative;
	user-select: none;
}

.headingRow {
	position: sticky;
	top: 0;
	left: 0;
	min-width: fit-content;
	z-index: 1;
	background: linear-gradient(145deg, var(--bg2), var(--bg1));
	box-shadow: var(--box-shadow);
	display: grid;
	grid-template-columns: v-bind(templateColumns);
	color: var(--font2);
}

.rows {
	min-width: fit-content;
}

.rows>* {
	display: grid;
	grid-template-columns: v-bind(templateColumns);
	background: var(--bg1);
	color: var(--font1);
	cursor: pointer;
	transition: .1s;
}

.rows>*:nth-child(odd) {
	background: var(--bg3);
}

.rows>*:hover {
	filter: brightness(1.2);
	padding: v-bind(rowPadding);
}

.rows>*:active {
	filter: brightness(.7);
}

.loaderWrapper {
	position: absolute;
	inset: 0;
	display: grid;
	place-items: center;
}

.loaderDiv {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: .5rem;
	width: fit-content;
}
</style>
