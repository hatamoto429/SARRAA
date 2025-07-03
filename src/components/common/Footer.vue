<template>
  <footer class="footer">
    <div class="info">
      <p>&copy; SARRAA 2025 - Security AI for Real-Time Request and Attack Analysis</p>
      <div class="sarraa-toggle">
        <label>
          <input type="checkbox" v-model="useSarraaCheck" />
          Use SARRAA
        </label>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, watch } from 'vue'
import useUserStore from '@/store/userStore.js'

export default {
  name: "Footer",
  setup() {
    const userStore = useUserStore()

    const useSarraaCheck = computed({
      get: () => userStore.useSarraaCheck,
      set: (value) => userStore.setUseSarraaCheck(value)
    })

    watch(useSarraaCheck, (newVal) => {
      console.log(`SARRAA is now ${newVal ? 'ENABLED' : 'DISABLED'}`);
    })

    return {
      useSarraaCheck
    }
  }
}

</script>

<style scoped>
.footer {
  margin: auto;
  display: flex;
  justify-content: center;
  background-color: rgba(165, 165, 165, 0.418);
  border-top: 2px solid #1e1920;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.info p {
  flex: 3;
  text-align: left;
}

.sarraa-toggle {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
}

.checkbox {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.checkbox input {
  margin-right: 5px;
}
</style>
