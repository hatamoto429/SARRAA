<template>
  <div class="home-container">

    <!-- Title -->
    <h1 class="message">Congratulations, you are in!</h1>

    <div class="home-tab">

      <!-- Return Button-->
      <router-link to="/" class="redirect-button">
        <h1>Back To Login</h1>
      </router-link>
      <router-link to="/account" class="account-button">
        <h1>To Account</h1>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  padding: 30px;
}

.home-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.error {
  text-align: center;
  font-size: 45px;
}

.message {
  text-align: center;
}

.redirect-button {
  color: rgb(0, 0, 0);
  padding: 20px;
  font-size: 12px;
  font-weight: bold;
  transition: font-size 0.3s ease;
}

.redirect-button:hover {
  transform: scale(1.2);
}
</style>
