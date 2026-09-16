<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCart } from '../composables/useCart'
import { useRouter } from 'vue-router'

const { cart } = useCart()

const router = useRouter()

const userLoggedIn = ref(false)
const adminLoggedIn = ref(false)

function checkLoginStatus() {
  userLoggedIn.value = localStorage.getItem('userLoggedIn') === 'true'
  adminLoggedIn.value = localStorage.getItem('adminLoggedIn') === 'true'
}

function handleLogin() {
  checkLoginStatus()
}

checkLoginStatus()

window.addEventListener('login', handleLogin)

const cartCount = computed(() => {
  return cart.value.reduce((total, product) => {
    return total + product.quantity
  }, 0)
})

function logout() {
  localStorage.removeItem('userLoggedIn')
  localStorage.removeItem('adminLoggedIn')

  checkLoginStatus()

  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      OTAKUVAULT
    </div>

    <div class="nav-links">
      <RouterLink to="/" class="nav-link">
        Home
      </RouterLink>

      <RouterLink to="/products" class="nav-link">
        Products
      </RouterLink>

      <RouterLink to="/cart" class="nav-link">
        Cart ({{ cartCount }})
      </RouterLink>

      <RouterLink
        v-if="userLoggedIn"
        to="/my-orders"
        class="nav-link"
      >
        My Orders
      </RouterLink>

      <RouterLink
        v-if="!userLoggedIn && !adminLoggedIn"
        to="/login"
        class="nav-link"
      >
        Login
      </RouterLink>

      <RouterLink
        v-if="!userLoggedIn && !adminLoggedIn"
        to="/register"
        class="nav-link"
      >
        Register
      </RouterLink>

      <button
        v-if="userLoggedIn || adminLoggedIn"
        class="logout-button"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 95%;
  margin: 15px auto;
  padding: 20px 40px;

  position: sticky;
  top: 15px;

  background: rgba(17, 17, 17, 0.95);
  color: white;

  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  backdrop-filter: blur(8px);

  z-index: 1000;
}

.logo {
  font-family: Georgia, serif;
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  color: white;
  text-decoration: none;

  font-family: Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;

  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ff6b6b;
}

.nav-link.router-link-active {
  color: #ff6b6b;
  font-weight: bold;
}

.logout-button {
  border: none;
  background: none;
  color: white;

  font-family: Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;

  cursor: pointer;
}

.logout-button:hover {
  color: #ff6b6b;
}

@media (max-width: 900px) {
  .navbar {
    padding: 18px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    gap: 18px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link,
  .logout-button {
    font-size: 14px;
  }
}
</style>