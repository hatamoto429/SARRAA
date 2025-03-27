<template>
  <div class="app-container">
    <img class="logo" src="@/assets/icons/Logo_1.jpeg" alt="logo" />
    <div class="main-container">
      <Background />
      <Footer />
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Background from './components/common/Background.vue'
import Footer from './components/common/Footer.vue'
import LoginPage from './views/LoginPage.vue'
import ErrorPage from './views/ErrorPage.vue'

export default {
  name: "App",
  components: {
    Background,
    Footer
  }
}
</script>

<style>
body,
html {
  height: 100%;
  overflow: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 40px;
}

.logo {
  align-items: center;
  width: 170px;
  border-radius: 25px;
}

.main-container {
  padding: 40px;
}

.content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
