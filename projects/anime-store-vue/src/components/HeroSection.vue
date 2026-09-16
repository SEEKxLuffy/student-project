<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProducts() {
  router.push('/products')
}
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Welcome to OTAKUVAULT</h1>

      <p>
        Discover your favorite anime figures, collectibles, and merchandise.
      </p>

      <button @click="goToProducts">Shop Now</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 500px;
  padding: 100px 60px;
  display: flex;
  align-items: center;
  background: #1a1a1a;
}

.hero-content {
  max-width: 600px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 30px;
}

.hero button {
  padding: 12px 25px;
  border: none;
  background: #111;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>