
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Checkout from '../views/Checkout.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'
import MyOrders from '../views/MyOrders.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ApiTest from '../views/ApiTest.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/products', component: Products },
  { path: '/products/:id', component: ProductDetails },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/order-confirmation', component: OrderConfirmation },
  { path: '/my-orders', component: MyOrders },
  { path: '/admin', component: Admin },
  { path: '/api-test', component: ApiTest },
]
})

router.beforeEach((to) => {
  const userLoggedIn = localStorage.getItem('userLoggedIn')
  const adminLoggedIn = localStorage.getItem('adminLoggedIn')

  // Pages that anyone can access
  if (to.path === '/login' || to.path === '/register') {
    return
  }

  // Admin page requires admin login
  if (to.path === '/admin') {
    if (adminLoggedIn !== 'true') {
      return '/login'
    }

    return
  }

  // All other pages require either user or admin login
  if (userLoggedIn !== 'true' && adminLoggedIn !== 'true') {
    return '/login'
  }
})
export default router
