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
        <SlotComponent v-for="x in filteredProducts" :key="x.name" :name="x.name" :img="x.img" />
        <!-- New Button only for Admins -->
        <button v-if="userStore.admin" class="create-button" @click="goToCreateForm">
          Create New Product
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import SlotComp from '@/components/common/ProductCard.vue'
import NavBar from '@/components/common/NavBar.vue'
import useUserStore from '@/store/userStore'

import PhoneImg from '@/assets/product_img/Phone.png'
import LaptopImg from '@/assets/product_img/Laptop.png'
import HeadphonesImg from '@/assets/product_img/Headphones.png'
import TabletImg from '@/assets/product_img/Tablet.png'
import CameraImg from '@/assets/product_img/Camera.png'
import TVImg from '@/assets/product_img/TV.png'
import ChargerImg from '@/assets/product_img/Charger.png'
import GiftCardImg from '@/assets/product_img/GiftCard.png'

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
        { name: 'Phone', img: PhoneImg },
        { name: 'Laptop', img: LaptopImg },
        { name: 'Headphones', img: HeadphonesImg },
        { name: 'Tablet', img: TabletImg },
        { name: 'Camera', img: CameraImg },
        { name: 'TV', img: TVImg },
        { name: 'Charger', img: ChargerImg },
        { name: 'Gift Card', img: GiftCardImg }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      return this.products.filter(p =>
        p.name.toLowerCase().includes(query)
      );
    },
    userStore() {
      return useUserStore()
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    goToCreateForm() {
      this.$router.push("/createproduct")
    }
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 95vw;
  height: 100vh;
  border-radius: 10px;
  overflow: hidden;
}

.home-tab {
  width: 100%;
  display: flex;
  justify-content: center;
}

.navBar {
  width: 100%;
}

#product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
  height: 55vh;
  width: 100%;
  overflow-y: auto;
  margin: 0 auto;
  place-items: center;
}

#product-list img {
  display: block;
  margin: 5% auto 0;
  width: 50%;
}

.create-button {
  margin-top: 20px;
  padding: 20px;
  background-color: #871a79;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
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
