<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'
import { useCart } from '../composables/useCart'

const route = useRoute()

const productId = route.params.id

const product = products.find(item => item.id === productId)
const { cart } = useCart()

const quantity = ref(1)
function addToCart() {
  if (!product) return

  const existingProduct = cart.value.find(item => item.id === product.id)

  if (existingProduct) {
    existingProduct.quantity += quantity.value
  } else {
    cart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity.value
    })
  }

  alert('Product added to cart!')
}
</script>

<template>
  <section v-if="product" class="product-details">
    <img :src="product.image" :alt="product.name">

    <div class="product-info">
      <h1>{{ product.name }}</h1>

      <p class="price">Rs. {{ product.price }}</p>
      <div class="quantity-controls">
  <button @click="quantity--" :disabled="quantity === 1">−</button>

  <span>{{ quantity }}</span>

  <button @click="quantity++">+</button>
</div>
<button class="add-to-cart-button" @click="addToCart">
  Add to Cart
</button>

      <p>{{ product.shortDescription }}</p>

      <hr>

      <p><strong>Origin:</strong> {{ product.origin }}</p>
      <p><strong>Height:</strong> {{ product.height }}</p>
      <p><strong>Width:</strong> {{ product.width }}</p>
      <p><strong>Weight:</strong> {{ product.weight }}</p>
      <p><strong>Material:</strong> {{ product.material }}</p>

      <h2>Description</h2>
      <p>{{ product.description }}</p>
    </div>
  </section>

  <p v-else>Product not found.</p>
</template>

<style scoped>
.product-details {
  display: flex;
  gap: 40px;
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.product-details img {
  width: 400px;
  height: 400px;
  object-fit: contain;
}

.product-info {
  flex: 1;
}

.product-info h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.product-info hr {
  margin: 20px 0;
}

.product-info h2 {
  margin-top: 25px;
}

.add-to-cart-button {
  margin-top: 15px;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background: #444;
}
</style>