<template>
  <div class="home-container">

    <!-- Title -->
    <h1 class="message">Congratulations, you are in!</h1>

    <div class="home-tab">

      <!-- Return Button-->
      <router-link to="/" class="redirect-button">
        <h1>Back To Login</h1>
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
  min-width: 400px;
  padding: 50px;
  border: 2px solid rgb(75, 31, 92);
  border-radius: 20px;
  background-color: rgba(165, 165, 165, 0.418);
  transition: transform 0.3s ease;
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
