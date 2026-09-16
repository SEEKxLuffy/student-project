<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function register() {
  if (
  !email.value.includes('@') ||
  !email.value.includes('.') ||
  email.value.includes(' ')
) {
  alert('Please enter a valid email address.')
  return
}
if (name.value.length < 3) {
  alert('Name must be at least 3 characters.')
  return
}

  if (password.value.length < 4) {
    alert('Password must be at least 4 characters.')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  const savedUser = localStorage.getItem('user')

  if (savedUser) {
    const existingUser = JSON.parse(savedUser)

    if (email.value === existingUser.email) {
      alert('An account with this email already exists.')
      return
    }
  }

  const user = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  localStorage.setItem('user', JSON.stringify(user))

  alert('Account created successfully!')

  router.push('/login')
}
</script>

<template>
  <section class="register-page">
    <div class="register-box">
      <h1>Create Account</h1>

      <input
        v-model="name"
        type="text"
        placeholder="Full Name"
      >

      <input
        v-model="email"
        type="email"
        placeholder="Email"
      >

      <input
        v-model="password"
        type="password"
        placeholder="Password"
      >
      <input
  v-model="confirmPassword"
  type="password"
  placeholder="Confirm Password"
>

      <button @click="register">
        Create Account
      </button>

      <p>
        Already have an account?
        <RouterLink to="/login">
          Login
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
  color: white;
}

.register-box {
  width: 350px;
  padding: 30px;
  background: #1a1a1a;
  border-radius: 10px;
  text-align: center;
}

.register-box h1 {
  margin-bottom: 25px;
}

.register-box input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;

  border: 1px solid #333;
  border-radius: 5px;

  background: #111;
  color: white;
  font-size: 14px;
}

.register-box input:focus {
  outline: none;
  border-color: #555;
}

.register-box button {
  width: 100%;
  padding: 12px;

  border: none;
  border-radius: 5px;

  background: #333;
  color: white;

  font-size: 16px;
  cursor: pointer;
}

.register-box button:hover {
  background: #444;
}

.register-box p {
  margin-top: 20px;
  font-size: 14px;
}

.register-box a {
  color: #ff6b6b;
  text-decoration: none;
}
</style>