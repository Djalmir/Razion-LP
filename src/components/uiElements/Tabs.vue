<template>
	<div class="tabs">
		<header ref="header">
			<nav>
				<Button v-for="selector in tabSelectors" :key="selector.id" :class="`${currentTab == selector.id ? 'active' : ''} selector`" @click.stop="showTab(selector.id)" @mousedown.stop>
					<Icon v-if="selector.icon" :class="selector.icon" :size=".95" />
					<span v-if="selector.title">{{ selector.title }}</span>
				</Button>
			</nav>
		</header>
		<transition name="growDown">
			<section ref="section">
				<slot></slot>
			</section>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const header = ref()
const section = ref()
const observer = ref()

const tabSelectors = ref([])
const currentTab = ref(null)
watch(currentTab, (n, o) => {

	let oldTab = section.value.querySelector(`[tab-id=${o}]`)
	if (oldTab) {
		oldTab.classList.remove('active')
		oldTab.style.display = 'none'
	}

	let newTab = section.value.querySelector(`[tab-id=${n}]`)
	newTab.classList.add('active')
	newTab.style.display = 'block'
})

onMounted(() => {
	initObserver()
	setTabs()
})

function initObserver() {
	let config = {
		childList: true
	}

	observer.value = new MutationObserver(() => {
		setTabs()
	})
	observer.value.observe(section.value, config)
}

function setTabs() {
	let tabs = Array.from(section.value.querySelectorAll('[tab-id]'))
	if (!tabs.length)
		return console.error('No tabs found. Each tab must have a [tab-id] attribute.')

	tabSelectors.value = tabs.map((tab) => {
		tab.style.display = 'none'
		return {
			id: tab.getAttribute('tab-id'),
			icon: tab.getAttribute('tab-icon'),
			title: tab.getAttribute('tab-title')
		}
	})
	currentTab.value = tabSelectors.value[0].id
}

function showTab(id) {
	currentTab.value = id
}

</script>

<style scoped>
.tabs {
	filter: drop-shadow(var(--dark-box-shadow));
}

.light-theme .tabs {
	filter: drop-shadow(var(--light-box-shadow));
}

header {
	width: 100%;
	overflow: auto;
	padding: 0 11px;
}

nav {
	display: flex;
	align-items: center;
}

.selector {
	flex: 1;
	max-width: 240px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	padding: 3px 5px;
	border-radius: .5rem .5rem 0 0;
	box-shadow: none;
	color: var(--dark-font1);
	background: var(--dark-bg3);
	filter: brightness(.8);
}

.light-theme .selector {
	color: var(--light-font1);
	background: var(--light-bg3);
}

.selector:hover {
	filter: brightness(.9);
	color: var(--dark-font1);
	z-index: 1;
}

.light-theme .selector:hover {
	color: var(--light-font1);
}

.selector:active {
	filter: brightness(.85);
	box-shadow: none;
}

.selector.active,
.selector.active:hover {
	color: var(--primary);
	position: relative;
	filter: brightness(1);
	z-index: 2;
}

.selector.active:before {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: .5rem;
	height: .5rem;
	border-radius: 0 0 50% 0;
	box-shadow: 0 5px 0 0 var(--dark-bg3);
	transform: translateX(-100%);
	pointer-events: none;
}

.light-theme .selector.active:before {
	box-shadow: 0 5px 0 0 var(--light-bg3);
}

.selector.active:after {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	width: .5rem;
	height: .5rem;
	border-radius: 0 0 0 50%;
	box-shadow: 0 5px 0 0 var(--dark-bg3);
	transform: translateX(100%);
	pointer-events: none;
}

.light-theme .selector.active:after {
	box-shadow: 0 5px 0 0 var(--light-bg3);
}

section {
	border-radius: .3rem;
	background: linear-gradient(180deg, var(--dark-bg3), var(--dark-bg1));
}

.light-theme section {
	background: linear-gradient(180deg, var(--light-bg3), var(--light-bg1));
}

.growDown-enter-active,
.growDown-leave-active {
	transition: .1s;
	transform-origin: top;
}

.growDown-enter-from,
.growDown-leave-to {
	transform: scaleY(0);
}
</style>