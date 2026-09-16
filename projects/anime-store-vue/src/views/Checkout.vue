<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useOrder } from '../composables/useOrder'

const { cart } = useCart()
const router = useRouter()
if (cart.value.length === 0) {
  alert('Your cart is empty.')
  router.push('/cart')
}
const { saveOrder } = useOrder()


const fullName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')

const total = computed(() => {
  return cart.value.reduce((sum, product) => {
    return sum + product.price * product.quantity
  }, 0)
})

function placeOrder() {
  // Name validation
  if (!fullName.value) {
    alert('Please enter your name.')
    return
  }

  if (fullName.value.length < 3) {
    alert('Name must be at least 3 characters.')
    return
  }

  // Email validation
  if (!email.value) {
    alert('Please enter your email.')
    return
  }

  if (email.value.includes(' ')) {
    alert('Email cannot contain spaces.')
    return
  }

  const emailParts = email.value.split('@')

  if (emailParts.length !== 2) {
    alert('Email must contain one @ symbol.')
    return
  }

  const emailName = emailParts[0] || ''
const emailDomain = emailParts[1] || ''

  if (!emailName) {
    alert('Please enter something before @.')
    return
  }

  if (!emailDomain.includes('.')) {
    alert('Please enter a valid email domain.')
    return
  }

  const domainParts = emailDomain.split('.')

  if (!domainParts[0] || !domainParts[1]) {
    alert('Please enter a valid email address.')
    return
  }

  // Phone validation
  if (!phone.value) {
    alert('Please enter your phone number.')
    return
  }

  if (phone.value.length !== 10) {
    alert('Phone number must be exactly 10 digits.')
    return
  }

  if (isNaN(Number(phone.value))) {
    alert('Phone number must contain only numbers.')
    return
  }

  if (!phone.value.startsWith('9')) {
    alert('Phone number must start with 9.')
    return
  }

  // Address validation
  if (!address.value) {
    alert('Please enter your address.')
    return
  }

  if (address.value.length < 10) {
    alert('Address must be at least 10 characters.')
    return
  }

  saveOrder({
  id: 'ORD-' + Date.now(),
  fullName: fullName.value,
  email: email.value,
  phone: phone.value,
  address: address.value,
  products: [...cart.value],
  total: total.value
})

alert('Order placed successfully!')
router.push('/order-confirmation')
}
</script>

<template>
  <section class="checkout-page">

    <h1>Checkout</h1>

    <div class="checkout-form">
      <h2>Customer Information</h2>

      <label>
        Full Name
        <input
  v-model="fullName"
  type="text"
  placeholder="Enter your full name"
>
      </label>

      <label>
        Email
        <input
  v-model="email"
  type="email"
  placeholder="Enter your email"
>
</label>

      <label>
        Phone
        <input
  v-model="phone"
  type="tel"
  placeholder="Enter your phone number"
>
      </label>

      <label>
        Address
        <textarea
  v-model="address"
  placeholder="Enter your address"
></textarea>
      </label>
    </div>

    <div class="order-summary">
      <h2>Order Summary</h2>

      <div
        v-for="product in cart"
        :key="product.id"
        class="summary-item"
      >
        <div>
          <h3>{{ product.name }}</h3>
          <p>Quantity: {{ product.quantity }}</p>
        </div>

        <p>
          Rs. {{ product.price * product.quantity }}
        </p>
      </div>

      <hr>

      <h2>Total: Rs. {{ total }}</h2>
      <button
  class="place-order-button"
  @click="placeOrder"
>
  Place Order
</button>
    </div>

  </section>
</template>

<style scoped>
.checkout-page {
  min-height: 100vh;
  padding: 40px;
  background: #111;
  color: white;
}

.checkout-page h1 {
  max-width: 1000px;
  margin: 0 auto 30px;
}

.checkout-form {
  max-width: 600px;
  margin: 0 auto 30px;
  padding: 30px;
  background: #1a1a1a;
  border-radius: 10px;
}

.checkout-form h2 {
  margin-bottom: 25px;
}

.checkout-form label {
  display: block;
  margin-bottom: 20px;
}

.checkout-form input,
.checkout-form textarea {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 14px;
}

.checkout-form textarea {
  min-height: 100px;
  resize: vertical;
}

.checkout-form input::placeholder,
.checkout-form textarea::placeholder {
  color: #aaa;
}

/* Order Summary */

.order-summary {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: #1a1a1a;
  border-radius: 10px;
}

.order-summary h2 {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

.summary-item h3 {
  font-size: 17px;
  margin-bottom: 5px;
}

.summary-item p {
  margin: 0;
  color: #ccc;
}

.order-summary hr {
  margin: 15px 0;
  border: none;
  border-top: 1px solid #333;
}

.order-summary > h2:last-child {
  margin-bottom: 0;
}
.place-order-button {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.place-order-button:hover {
  background: #444;
}
</style>