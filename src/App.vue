<template>
  <div class="app-container">

    <!-- Logo -->
    <div class="logo-container">
      <img class="logo" src="@/assets/icons/Logo_1.jpeg" :class="{ 'logo-moved': logoMoved }" alt="logo" />
    </div>

    <!-- Main -->
    <div class="main-container">
      <Background />
      <Footer />
      <main class="content">
        <router-view @hook:mounted="onRouteChange" />
      </main>
    </div>

  </div>
</template>

<script>
import Background from './components/common/Background.vue'
import Footer from './components/common/Footer.vue'

export default {
  name: "App",
  components: {
    Background,
    Footer
  },
  data() {
    return {
      logoMoved: false
    }
  },
  watch: {
    $route(to) {
      this.logoMoved = to.path !== '/login';
    }
  },
  mounted() {
    this.logoMoved = this.$route.path !== '/login';
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
  padding-top: 40px;
  position: relative;
}

.logo-container {
  z-index: 1000;
}

.logo {
  width: 170px;
  border-radius: 25px;
  transition: transform 0.8s ease-in-out, width 0.8s ease-in-out;

}

.logo-moved {
  transform: translateX(-45vw) rotate(360deg);
  width: 100px;
}

.main-container {
  padding: 40px;
}

.content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
