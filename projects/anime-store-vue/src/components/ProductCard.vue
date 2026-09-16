<script setup lang="ts">
import { useRouter } from 'vue-router'

const { id, name, price, image } = defineProps<{
  id: string
  name: string
  price: number
  image: string
}>()

const router = useRouter()

const emit = defineEmits<{
  addToCart: [product: {
    id: string
    name: string
    price: number
    image: string
  }]
}>()

function addProductToCart() {
  emit('addToCart', {
    id,
    name,
    price,
    image
  })
}

function viewDetails() {
  router.push(`/products/${id}`)
}
</script>

<template>
  <div class="product-card">
    <img :src="image" :alt="name">

    <h2>{{ name }}</h2>

    <p>Price: Rs. {{ price }}</p>

    <button @click="viewDetails">View Details</button>
    <button @click="addProductToCart">Add to Cart</button>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  color: #111;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  min-height: 400px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  display: block;
}

.product-card h2 {
  font-size: 20px;
  font-family: Georgia, serif;
  margin: 12px 0 6px;
}

.product-card p {
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 12px;
}

.product-card button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background: #111;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
</style>