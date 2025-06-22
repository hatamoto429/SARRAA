<template>
  <div class="action-bar">
    <router-link to="/home" class="button">← Back To Home</router-link>
    <router-link to="/" class="button">← Back To Login</router-link>
  </div>
</template>

<script>
export default {
  name: "ActionBar"
};
</script>

<style scoped>
.action-bar {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  padding: 10px;
  min-width: 140px;
  border-radius: 25px;
  gap: 10px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
  user-select: none;
}

.button:hover {
  background-color: #686868;
  color: #fff;
  transform: scale(1.1);
}
</style>
