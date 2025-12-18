<template>
	<div class="tabs">
		<header>
			<nav>
				<Button v-for="selector in tabSelectors" :key="selector.id" :class="`${currentTab == selector.id ? 'active' : ''} selector`" @click.stop="showTab(selector.id)" @mousedown.stop>
					<Icon v-if="selector.icon" :class="selector.icon" :size="1.25" />
					<span v-if="selector.title">{{ selector.title }}</span>
				</Button>
			</nav>
		</header>
		<transition name="growDown">
			<section ref="section">
				<slot />
			</section>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

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
	filter: drop-shadow(var(--box-shadow));
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

nav .selector {
	flex: 1;
	max-width: 240px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	padding: 3px 5px;
	border-radius: .5rem .5rem 0 0;
	box-shadow: none;
	color: var(--font2);
	background: var(--bg3);
	filter: brightness(.8);
}

nav .selector:hover {
	filter: brightness(.9);
	color: var(--font1);
	z-index: 1;
}

nav .selector:active {
	filter: brightness(.85);
	box-shadow: none;
}

nav .selector.active,
nav .selector.active:hover {
	color: var(--primary);
	position: relative;
	filter: brightness(1);
	z-index: 2;
}

nav .selector.active:before {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: .5rem;
	height: .5rem;
	border-radius: 0 0 50% 0;
	box-shadow: 0 5px 0 0 var(--bg3);
	transform: translateX(-100%);
	pointer-events: none;
}

nav .selector.active:after {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	width: .5rem;
	height: .5rem;
	border-radius: 0 0 0 50%;
	box-shadow: 0 5px 0 0 var(--bg3);
	transform: translateX(100%);
	pointer-events: none;
}

section {
	border-radius: .3rem;
	background: linear-gradient(180deg, var(--bg3), var(--bg1));
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