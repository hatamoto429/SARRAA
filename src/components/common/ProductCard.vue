<template>
  <div class="container">
    <div class="flip-wrapper">
      <div class="flip-card">
        <div class="slot-box">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StyledSlot"
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px 80px 0px 80px;
}

.flip-wrapper {
  height: 300px;
  width: 200px;
  perspective: 1000px;
}

.flip-card {
  transition: all 0.5s ease;
  border-radius: 15px;
  background-position: center;
}

.flip-card:hover {
  transform: rotate3d(1, 1, 0, 30deg);
}

.slot-box {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: white;
  border: 2px solid black;
  padding: 10px;
  border-radius: 15px;
  transition: box-shadow 0.3s;
}

.slot-box:hover {
  box-shadow: 20px 20px 20px rgba(255, 242, 168, 0.2);
}
</style>
