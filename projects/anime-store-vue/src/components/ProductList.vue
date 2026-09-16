<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import { products } from '../data/products'
import { useCart } from '../composables/useCart'

const { cart } = useCart()

const searchText = ref('')
const selectedOrigin = ref('All')

const filteredProducts = computed(() => {
  return products.filter(product => {
    const search = searchText.value.toLowerCase()

    return (
      product.name.toLowerCase().includes(search) ||
      product.origin.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    )
  })
})

function addToCart(product: {
  id: string
  name: string
  price: number
  image: string
}) {
  const existingProduct = cart.value.find(item => item.id === product.id)

  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    })
  }

  console.log('Cart:', cart.value)
}
</script>
<template>
  <section class="product-list">
  <div class="product-heading">
    <h2>Anime Products</h2>
    <p>Total products: {{ filteredProducts.length }}</p>

    <input
      v-model="searchText"
      type="text"
      placeholder="Search products..."
      class="search-input"
    >
  </div>

    <div v-if="filteredProducts.length > 0" class="products-grid">
  <ProductCard
    v-for="product in filteredProducts"
    :key="product.id"
    :id="product.id"
    :name="product.name"
    :price="product.price"
    :image="product.image"
    @add-to-cart="addToCart"
  />
</div>

<div v-else class="no-products">
  <h2>No products found.</h2>
  <p>Try searching for another anime or product.</p>
</div>

  </section>
</template>

<style scoped>

.product-list {
  padding: 40px;
  background: #111;
  min-height: 100vh;
}
.product-heading {
  text-align: center;
  margin-bottom: 30px;
}

.product-heading h2 {
  margin-bottom: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 250px);
  gap: 30px;
  justify-content: center;
}
@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 250px);
  }
}

@media (max-width: 600px) {
  .product-list {
    padding: 20px;
  }

  .products-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
.search-input {
  width: 350px;
  max-width: 100%;
  padding: 12px 15px;
  margin-top: 15px;

  border: 1px solid #333;
  border-radius: 6px;

  background: #1a1a1a;
  color: white;

  font-size: 14px;
}

.search-input::placeholder {
  color: #999;
}

.search-input:focus {
  outline: none;
  border-color: #555;
}
.no-products {
  text-align: center;
  padding: 60px 20px;
  color: #ccc;
}

.no-products h2 {
  margin-bottom: 10px;
  color: white;
}

.no-products p {
  font-size: 14px;
}
</style>