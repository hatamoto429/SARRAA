import { defineStore } from 'pinia'

// Store User ID ?

const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
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
  },
})

export default useUserStore
