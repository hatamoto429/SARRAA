<template>
  <router-link :to="`/product/${name}`" class="product-card">
    <div class="flip-wrapper">
      <div class="flip-card" :style="{ backgroundImage: `url(${img})` }"></div>
    </div>
    <p class="product-name">{{ name }}</p>
  </router-link>
</template>

<script>
export default {
  name: "StyledSlot",
  props: ['name', 'img']
};
</script>

<style scoped>
.product-card {
  text-decoration: none;
  color: inherit;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flip-wrapper {
  height: 300px;
  width: 100%;
  perspective: 1000px;
}

.flip-card {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  border: 2px solid black;
  transition: transform 0.5s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flip-card:hover {
  transform: rotate3d(1, 1, 0, 30deg);
  box-shadow: 20px 20px 20px rgba(255, 242, 168, 0.2);
}

.product-name {
  margin-top: 10px;
  font-size: 1rem;
  text-align: center;
  color: white;
  font-size: larger;
  font-weight: bold;
}
</style>
