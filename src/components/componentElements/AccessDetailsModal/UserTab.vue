<template>
  <div tab-id="user" tab-title="Usuário" tab-icon="user" v-if="access.user">
    <div class="wrapper">
      <div class="flexDiv">
        <div id="pictureWrapper">
          <div id="pictureInnerWrapper">
            <Image v-if="access.user.profilePicture" :src="access.user.profilePicture" alt="Profile picture" :size="4.5" @click="profilePictureModal.show()" />
            <Icon v-else class="user" :size="4.5" />
          </div>
        </div>
        <div class="info">
          <b>Nome</b>
          <span>{{ access.user.name }}</span>
        </div>
      </div>
      <div class="info" style="margin-bottom: 17px;">
        <b>Email</b>
        <span>{{ access.user.email }}</span>
      </div>
      <div class="flexDiv">
        <div class="info">
          <b>Telefone</b>
          <span>{{ access.user.phone }}</span>
        </div>
        <div class="info">
          <b>Data de nascimento</b>
          <span>{{ getDate(access.user.birthDate) }}</span>
        </div>
      </div>

      <div class="flexDiv" style="align-items: flex-end; justify-content: space-between;">
        <fieldset>
          <legend>Sexo</legend>
          <div class="flexDiv">
            <label v-if="access.user.sex == 'M'">
              <span style="padding-left:7px">Masculino</span>
            </label>
            <label v-else>
              <span style="padding-left:7px">Feminino</span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import Image from '@/components/uiElements/Image.vue'
import Icon from '@/components/uiElements/Icon.vue'
import { getDate } from '@/utils/date'

const props = defineProps({
  access: Object,
  required: true
})

const profilePictureModal = inject('profilePictureModal')
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: fit-content;
  margin: 17px auto;
}

.flexDiv {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin-bottom: 17px;
}

.info {
  flex: 1;
  margin: 0;
  min-width: 135px;
  overflow: auto;
}

.info b {
  display: block;
  position: sticky;
  top: 0;
  left: 0;
  margin: 0;
  font-size: .9rem;
  font-weight: bold;
  padding-left: 7px;
  white-space: nowrap;
}

.info span {
  font-size: 1rem;
  white-space: nowrap;
  display: block;
  padding: 0 0 0 7px;
  width: 0;
}

#pictureWrapper {
  width: 73px;
  height: 73px;
  border-radius: 50%;
  background: var(--dark-bg2);
  box-shadow: var(--dark-box-shadow);
  position: relative;
}

.light-theme #pictureWrapper {
  background: var(--light-bg2);
  box-shadow: var(--light-box-shadow);
}

#pictureInnerWrapper {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

legend {
  margin-bottom: 3px;
  font-size: .9rem;
  font-weight: bold;
  padding-left: 7px;
}
</style>