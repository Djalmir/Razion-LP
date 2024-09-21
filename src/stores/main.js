import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    title: 'Razion Softwares',
    darkTheme: true,
    userProfile: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null,
    showingMenu: false
  }),
  actions: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme
    },
    setUserProfile(userProfile) {
			if (userProfile)
				localStorage.setItem('userProfile', JSON.stringify(userProfile))
			else
				localStorage.removeItem('userProfile')
      this.userProfile = userProfile
		},
    toggleMenu() {
      this.showingMenu = !this.showingMenu
    }
  },
  getters: {}
})
