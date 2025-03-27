<template>
  <div class="background">
    <img class="background-image" src="@/assets/images/background2.jpg" alt="background" />
  </div>
</template>

<script>
export default {
  name: "Background",
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* configure image position */
  width: 100%;
  height: 100%;
  z-index: -10;
}

.background-image {
  opacity: 0.9;
  width: 100%;
  height: 100%;
}
</style>
