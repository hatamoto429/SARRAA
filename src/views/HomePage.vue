<template>
  <div class="home-container">
    <!-- Nav Bar Content -->
    <div class="navBar">
      <NavBar @search="handleSearch" />
    </div>

    <!-- Loading Spinner Simulation -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <!-- Home Tab Content -->
    <div v-else class="home-tab">
      <div id="product-list">
        <SlotComponent v-for="x in filteredProducts" :key="x.name" :name="x.name">
          <img :src="x.img" alt="product image" />
          <h1 class="product-title">{{ x.name }}</h1>
        </SlotComponent>
      </div>
    </div>
  </div>
</template>

<script>
import SlotComp from '@/components/common/ProductCard.vue'
import NavBar from '@/components/common/NavBar.vue'
import HeadphonesImg from '@/assets/product_img/Headphones.png'

export default {
  components: {
    'SlotComponent': SlotComp,
    'NavBar': NavBar
  },
  name: "HomePage",
  data() {
    return {
      loading: true,
      searchQuery: '',
      products: [
        { name: 'Phone', img: HeadphonesImg },
        { name: 'Laptop', img: HeadphonesImg },
        { name: 'Headphones', img: HeadphonesImg },
        { name: 'Tablet', img: HeadphonesImg },
        { name: 'Camera', img: HeadphonesImg },
        { name: 'TV', img: HeadphonesImg },
        { name: 'Charger', img: HeadphonesImg },
        { name: 'Gift Card', img: HeadphonesImg }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 700);
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      return this.products.filter(p =>
        p.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 700);
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95vw;
  height: 33vw;
  border-radius: 10px;
  overflow: hidden;
}

.home-tab {
  /* border: 2px solid black; */
  flex: 1;
}

.navBar {
  width: 100%;
}

#product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  height: 29vw;
  overflow-y: auto;
  text-decoration: none;
}

#product-list img {
  display: block;
  margin: 5% auto 0;
  width: 50%;
}

.product-title {
  text-align: center;
  color: black;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #871a79;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
