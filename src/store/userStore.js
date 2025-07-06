import { defineStore } from 'pinia'

// Store User ID ?

const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    admin: false,
    useSarraaCheck: false,
  }),
  actions: {
    setCredentials(username, admin) {
      this.username = username
      this.admin = admin
    },
    clearCredentials() {
      this.username = ''
      this.admin = false
    },
    setUseSarraaCheck(value) {
      this.useSarraaCheck = value
    },
  },
})

export default useUserStore
