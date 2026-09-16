<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const { cart } = useCart()
const router = useRouter()

const total = computed(() => {
  return cart.value.reduce((sum, product) => {
    return sum + product.price * product.quantity
  }, 0)
})

function decreaseQuantity(productId: string) {
  const product = cart.value.find(item => item.id === productId)

  if (!product) return

  if (product.quantity > 1) {
    product.quantity--
  } else {
    cart.value = cart.value.filter(item => item.id !== productId)
  }
}

function removeFromCart(productId: string) {
  cart.value = cart.value.filter(item => item.id !== productId)
}
function checkout() {
  router.push('/checkout')
}
</script>

<template>
  <section class="cart-page">
    <h1>Cart</h1>

    <div v-if="cart.length === 0">
      <p>Your cart is empty.</p>
    </div>

    <div v-else class="cart-items">

      <div
        v-for="product in cart"
        :key="product.id"
        class="cart-item"
      >

        <img
          :src="product.image"
          :alt="product.name"
        >

        <div class="cart-info">
          <h2>{{ product.name }}</h2>

          <p>Rs. {{ product.price }} × {{ product.quantity }}</p>

          <p class="subtotal">
            Subtotal: Rs. {{ product.price * product.quantity }}
          </p>

          <div class="quantity-controls">
            <button @click="decreaseQuantity(product.id)">
              −
            </button>

            <span>{{ product.quantity }}</span>

            <button @click="product.quantity++">
              +
            </button>
          </div>

          <button
            class="remove-button"
            @click="removeFromCart(product.id)"
          >
            Remove
          </button>
        </div>

      </div>

      <div class="cart-total">
  <h2>Total: Rs. {{ total }}</h2>

  <button class="checkout-button" @click="checkout">
  Checkout
</button>
</div>

    </div>
  </section>
</template>

<style scoped>
.cart-page {
  padding: 40px;
  background: #111;
  min-height: 100vh;
}

.cart-page h1 {
  margin-bottom: 30px;
}

.cart-items {
  max-width: 900px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 20px;
  margin-bottom: 20px;
  background: #1a1a1a;
  border-radius: 10px;
}

.cart-item img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.cart-info {
  flex: 1;
}

.cart-info h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.cart-info p {
  font-size: 14px;
  margin-bottom: 5px;
  color: #ccc;
}

.subtotal {
  font-weight: bold;
  color: white !important;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 12px;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.quantity-controls button:hover {
  background: #444;
}

.quantity-controls span {
  min-width: 20px;
  text-align: center;
  font-size: 16px;
}

.remove-button {
  margin-top: 12px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  cursor: pointer;
}

.remove-button:hover {
  background: #444;
}

.cart-total {
  margin-top: 30px;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 10px;
  text-align: left;
}

.cart-total h2 {
  font-size: 26px;
  font-family: Arial, sans-serif;
  font-weight: bold;
}
.checkout-button {
  margin-top: 15px;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.checkout-button:hover {
  background: #444;
}
</style>