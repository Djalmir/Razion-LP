<template>
  <Modal ref="modal" @close="close" class="accessDetailsModal">
    <template #header>
      <b style="font-size: 1.15rem;">Detalhes do acesso</b>
    </template>
    <Tabs class="tabs">
      <GeneralTab :access="access" />
      <LocalTab :access="access" />
      <UserTab :access="access" />
    </Tabs>
  </Modal>
  <ProfilePictureModal v-if="access.user" ref="profilePictureModal" :src="access.user.profilePicture" alt="Profile picture" />
</template>

<script setup>
import { ref, provide } from 'vue'
import Modal from '@/components/uiElements/Modal.vue'
import Tabs from '@/components/uiElements/Tabs.vue'
import GeneralTab from '@/components/componentElements/AccessDetailsModal/GeneralTab.vue'
import LocalTab from '@/components/componentElements/AccessDetailsModal/LocalTab.vue'
import UserTab from '@/components/componentElements/AccessDetailsModal/UserTab.vue'
import ProfilePictureModal from '@/components/viewElements/Profile/ProfilePictureModal.vue'

const modal = ref()
const profilePictureModal = ref()
provide('profilePictureModal', profilePictureModal)
const access = ref({})

function show(details) {
  access.value = details
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
[tab-id] {
  padding: 17px;
  overflow: auto;
  width: calc(90vw - 34px);
  max-width: 720px;
  height: 65dvh;
  max-height: 430px;
}
</style>