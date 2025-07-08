<template>
  <!-- Create Product Page -->
  <div class="product-detail">
    <div class="product-main">
      <!-- Static image for new product -->
      <img :src="NewProductImg" class="product-img" alt="New Product Image" />

      <div class="product-info">
        <h1 class="title">Create New Product</h1>

        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" v-model="product.name" type="text" placeholder="Product Name" />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="product.description" placeholder="Product Description"></textarea>
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input id="price" v-model.number="product.price" type="number" min="0" step="0.01"
            placeholder="Product Price" />
        </div>

        <div class="form-group">
          <label for="stock">Stock:</label>
          <input id="stock" v-model.number="product.stock" type="number" min="0" step="1"
            placeholder="Stock Quantity" />
        </div>

        <!-- Create Product Button-->
        <button @click="createProduct" class="create-btn">Create Product</button>
      </div>
    </div>
    <ActionBar />
  </div>
</template>

<script>
import NewProductImg from '@/assets/product_img/NewProduct.png'
import ActionBar from '@/components/common/ActionBar.vue'

export default {
  name: 'CreateProductPage',
  components: {
    ActionBar,
  },
  data() {
    return {
      NewProductImg,
      product: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
      },
    }
  },
  methods: {
    async createProduct() {
      try {
        const response = await fetch('http://192.168.0.2:5002/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.product),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to create product')
        }

        alert('Product created successfully!')
        this.$router.push("/home")
      } catch (err) {
        alert(`Error: ${err.message}`)
      }
    },
  },
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
  justify-content: flex-start;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: black;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #000000;
}

.create-btn {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #871a79;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.create-btn:hover {
  background-color: #6d1463;
}
</style>
