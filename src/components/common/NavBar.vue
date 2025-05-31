<template>
  <div class="navbar-container">
    <!-- Sandwich Menu -->
    <div class="nav-left">
      <button class="menu-icon" @click="toggleMenu">
        &#9776;
      </button>
    </div>

    <!-- Search Bar -->
    <div class="nav-center">
      <input type="text" class="search-bar" placeholder="Search..." v-model="searchText" @input="onSearch" />
    </div>

    <!-- Account Icon -->
    <div class="nav-right">
      <router-link to="/account" class="account-icon">
        <img src="@/components/icons/Account.png" alt="Account" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    toggleMenu() {
      console.log("Menu toggled");
    },
    onSearch() {
      this.$emit('search', this.searchText);
    }
  }
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  /* min-width: 50px; */
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-left {
  flex: 0 0 auto;
  padding-left: 200px;
}

.menu-icon {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding-right: 20px;
}

.search-bar {
  width: 600px;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #3b3936;
  box-sizing: border-box;
}

.nav-right {
  flex: 0 0 auto;
  padding-right: 200px;
}

.account-icon img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
