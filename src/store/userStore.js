import { defineStore } from 'pinia'

// Store User ID ?

const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    useSarraaCheck: false,
  }),
  actions: {
    setCredentials(username, password) {
      this.username = username
      this.password = password
    },
    clearCredentials() {
      this.username = ''
      this.password = ''
    },
    setUseSarraaCheck(value) {
      this.useSarraaCheck = value
    },
  },
})

export default useUserStore
