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
      <input type="text" class="search-bar" placeholder="Search..." />
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
  methods: {
    toggleMenu() {
      console.log("Menu toggled");
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
  width: 60%;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #3b3936;
}

.nav-right {
  flex: 0 0 auto;
}

.account-icon img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
