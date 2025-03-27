<template>
  <div class="error-container">
    <div class="error-tab">

      <h1 class="error">⚡ Error 404 ⚡</h1>

      <h1 class="message">This Page Does Not Exist <br> :&#40;</h1>

      <router-link to="/" class="redirect-button">
        <h1>Back To Login</h1>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  min-width: 400px;
  padding: 50px;
  border: 2px solid rgb(75, 31, 92);
  border-radius: 20px;
  background-color: rgba(165, 165, 165, 0.418);
}

.error-tab {
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
  color: rgb(30, 25, 32);
  font-size: 12px;
  font-weight: bold;
}
</style>
