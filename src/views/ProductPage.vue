<template>
  <!-- Product Page -->
  <div class="product-detail">
    <div v-if="loading">Loading product details...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-main">
      <img :src="product.img" class="product-img" alt="Product image" />

      <!-- Product Details -->
      <div class="product-info">
        <!-- SAFE VERSION - Vue Moustache Syntax Escapes HTML with {{  }} -> Plain Text
        <h1 class="title">{{ product.name }}</h1>
        <p class="desc">{{ product.description }}</p>
        <p class="price">Price: <strong>${{ product.price }}</strong></p>
        <p class="stock">In Stock: <strong>{{ product.stock }}</strong></p>
        <button class="buy-btn">Buy Now</button>
        -->
        <div class="product-info">
          <h1 class="title" v-html="product.name"></h1>
          <p class="desc" v-html="product.description"></p>
          <p class="price">Price: <strong v-html="product.price"></strong></p>
          <p class="stock">In Stock: <strong v-html="product.stock"></strong></p>
          <button class="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>

    <!-- Create button only visible with admin privileges -->
    <button v-if="userStore.isAdmin" @click="goToCreateForm">
      Create New Product
    </button>
    <ActionBar />
  </div>
</template>

<script>
import useUserStore from "@/store/userStore.js"
import checkDynamicContent from "@/utils/sarraaCheck.js"

import PhoneImg from '@/assets/product_img/Phone.png'
import LaptopImg from '@/assets/product_img/Laptop.png'
import HeadphonesImg from '@/assets/product_img/Headphones.png'
import TabletImg from '@/assets/product_img/Tablet.png'
import CameraImg from '@/assets/product_img/Camera.png'
import TVImg from '@/assets/product_img/TV.png'
import ChargerImg from '@/assets/product_img/Charger.png'
import GiftCardImg from '@/assets/product_img/GiftCard.png'
import ActionBar from '@/components/common/ActionBar.vue'

const imageMap = {
  Phone: PhoneImg,
  Laptop: LaptopImg,
  Headphones: HeadphonesImg,
  Tablet: TabletImg,
  Camera: CameraImg,
  TV: TVImg,
  Charger: ChargerImg,
  'Gift Card': GiftCardImg
}

export default {
  name: 'ProductPage',
  components: {
    ActionBar
  },
  data() {
    return {
      product: {
        name: '',
        img: '',
        description: '',
        price: 0,
        stock: 0,
      },
      loading: true,
      error: null
    }
  },
  async mounted() {
    // Run product load + SARRAA check sequentially
    const { name } = this.$route.params

    try {
      const encodedName = encodeURIComponent(name)
      const response = await fetch(`http://localhost:5002/api/products/${encodedName}`)

      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`)
      }

      const data = await response.json()

      // Map to product with fallbacks
      this.product = {
        name: data.name || 'Unknown Product',
        img: imageMap[data.name] || HeadphonesImg,
        description: data.description || 'No details available.',
        price: data.price || 0,
        stock: data.stock || 0,
      }

      // Now perform SARRAA check on vulnerable fields
      await this.performSarraaCheckOnProductFields()

    } catch (err) {
      this.error = err.message
      this.product = {
        name: 'Unknown Product',
        img: HeadphonesImg,
        description: 'Failed to load product details.',
        price: 0,
        stock: 0,
      }
    } finally {
      this.loading = false
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    }
  },
  methods: {
    goToCreateForm() {
      this.$router.push({ name: 'CreateProduct' })
    },

    // perform sarraa check on product field loading
    async performSarraaCheckOnProductFields() {
      // Only perform check if userStore.useSarraaCheck is enabled
      if (!this.userStore.useSarraaCheck) {
        console.log('SARRAA disabled, skipping checks on product fields.')
        return
      }

      // Fields to check for malicious content
      const fieldsToCheck = {
        name: this.product.name,
        description: this.product.description,
        // price and stock are numbers, but just in case convert to string and check
        price: this.product.price.toString(),
        stock: this.product.stock.toString(),
      }

      try {
        for (const [field, value] of Object.entries(fieldsToCheck)) {
          console.log(`SARRAA checking field "${field}":`, value)
          const prediction = await checkDynamicContent(value)
          console.log(`SARRAA prediction for "${field}":`, prediction)
          if (prediction === 'malicious') {
            alert(`SARRAA - FAILED: Malicious content detected in product field "${field}". Redirecting to home.`)
            this.$router.push('/home')
            return
          }
        }
        alert('SARRAA - PASSED: No malicious content detected in product fields.')
      } catch (error) {
        console.error('SARRAA check failed:', error)
        alert('Error during security check. Redirecting to home.')
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-main {
  display: flex;
  min-width: 700px;
  min-height: 450px;
  gap: 100px;
  background-color: #ececec;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-img {
  width: 250px;
  height: auto;
  object-fit: contain;
  border: 1px solid black;
  border-radius: 15px;
  background: rgb(255, 255, 255);
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: black;
}

.desc {
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #333;
}

.price {
  margin: 10px 0;
  font-size: 1.3rem;
  color: #871a79;
}

.stock {
  margin: 10px 0;
  font-size: 1.3rem;
  color: #871a79;
}

.buy-btn {
  padding: 12px 20px;
  background-color: #871a79;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
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

.return-options {
  display: flex;
  flex-direction: row;
}
</style>
