<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

function login() {
  if (username.value === 'admin' && password.value === '1234') {
    localStorage.setItem('adminLoggedIn', 'true')
    router.push('/admin')
  } else {
    alert('Invalid username or password')
  }
}
</script>

<template>
  <section class="login-page">

    <div class="login-box">

      <h1>Admin Login</h1>

      <input
        v-model="username"
        type="text"
        placeholder="Username"
      >

      <input
        v-model="password"
        type="password"
        placeholder="Password"
      >

      <button @click="login">
        Login
      </button>

    </div>

  </section>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
  color: white;
}

.login-box {
  width: 350px;
  padding: 30px;
  background: #1a1a1a;
  border-radius: 10px;
  text-align: center;
}

.login-box h1 {
  margin-bottom: 25px;
}

.login-box input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #111;
  color: white;
  font-size: 14px;
}

.login-box input:focus {
  outline: none;
  border-color: #555;
}

.login-box button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-box button:hover {
  background: #444;
}
</style>