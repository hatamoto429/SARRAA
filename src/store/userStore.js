import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    admin: false,
    useSarraaCheck: false,
  }),
  actions: {
    setUser({ username, isAdmin }) {
      this.username = username
      this.admin = isAdmin
    },
    clearUser() {
      this.username = ''
      this.admin = false
    },
    setUseSarraaCheck(value) {
      this.useSarraaCheck = value
    },
  },
})

export default useUserStore
