<template>
  <div class="app-container">

    <!-- Background & Footer -->
    <Background />
    <AppFooter />

    <!-- Logo -->
    <div class="logo-container">
      <router-link to="/login">
        <img class="logo" src="@/assets/icons/Logo_1.jpeg" :class="{ 'logo-moved': logoMoved }" alt="logo" />
      </router-link>
      <div class="app-title" v-show="showTitle" :style="{ opacity: showTitle ? 1 : 0 }">Welcome to SARRAA</div>
    </div>


    <!-- Main -->
    <div class="main-container">
      <main class="content" :class="{ 'content-scaled': contentScaled }">
        <router-view />
      </main>
    </div>

  </div>
</template>

<script>
import Background from './components/common/Background.vue'
import Footer from './components/common/Footer.vue'
import checkDynamicContent from '@/utils/sarraaCheck.js'
import useUserStore from "@/store/userStore.js"

export default {
  name: "App",
  components: {
    Background,
    AppFooter: Footer
  },
  data() {
    return {
      logoMoved: false,
      showTitle: false,
      contentScaled: false
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    }
  },
  watch: {
    $route(to) {
      this.updateUiStates(to);
      this.performSarraaCheckOnUrl(to.fullPath);
      console.log("route changes")
    }
  },
  mounted() {
    this.updateUiStates(this.$route);
    this.performSarraaCheckOnUrl(this.$route.fullPath);
  },
  methods: {
    // perform sarraa check on URL enter, redirect or reload
    async performSarraaCheckOnUrl(url) {
      if (!this.userStore.useSarraaCheck) {
        console.log('SARRAA disabled, skipping URL XSS check.');
        return;
      }

      try {
        const prediction = await checkDynamicContent(url);
        if (prediction === 'malicious') {
          alert('Malicious URL manipulation detected! Redirecting ...');
          this.$router.replace('/login');
        }
      } catch (error) {
        console.error('URL security check failed:', error);
      }
    },
    updateUiStates(to) {
      const isLogin = to.path === '/login';
      this.logoMoved = !isLogin;
      this.contentScaled = !isLogin;
      this.showTitle = !isLogin;
    }
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
  position: relative;
}

.logo-container {
  position: relative;
  z-index: 1000;
  align-items: center;
  flex-direction: row;
  height: 160px;
  width: auto;
  padding-top: 20px;
  padding-bottom: 40px;
}

.logo {
  width: 170px;
  border-radius: 25px;
  transition: transform 0.8s ease-in-out, width 0.8s ease-in-out;
  display: flex;
  flex-direction: column;
}

.logo-moved {
  transform: translateX(-40vw) rotate(360deg);
  width: 70px;
}

.app-title {
  position: relative;
  font-size: 2rem;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
}

.main-container {
  padding: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 15px;
  background-color: #3b39368e;
  transition: width 0.8s ease-in-out, height 0.5s ease-in-out;
  width: 550px;
  height: 550px;
}

.content-scaled {
  width: 95vw;
  height: 33vw;
}
</style>
