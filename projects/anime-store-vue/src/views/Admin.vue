<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrder } from '../composables/useOrder'

const {
  orders,
  loadOrders,
  updateOrderStatus,
  deleteOrder
} = useOrder()

const router = useRouter()
loadOrders()

const searchText = ref('')
const selectedStatus = ref('All')

const filteredOrders = computed(() => {
  return orders.value.filter(order => {

    const matchesSearch =
      order.id.toLowerCase().includes(searchText.value.toLowerCase()) ||
      order.fullName.toLowerCase().includes(searchText.value.toLowerCase()) ||
      order.email.toLowerCase().includes(searchText.value.toLowerCase()) ||
      order.phone.includes(searchText.value)

    const matchesStatus =
      selectedStatus.value === 'All' ||
      order.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const processingOrders = computed(() => {
  return orders.value.filter(order => order.status === 'Processing').length
})

const deliveredOrders = computed(() => {
  return orders.value.filter(order => order.status === 'Delivered').length
})

const totalRevenue = computed(() => {
  return orders.value.reduce((total, order) => {
    return total + order.total
  }, 0)
})

function changeStatus(orderId: string, status: string) {
  updateOrderStatus(orderId, status)
}
function logout() {
  localStorage.removeItem('adminLoggedIn')
  router.push('/admin-login')
}

function deleteOrderWithConfirmation(orderId: string) {
  const confirmDelete = confirm('Are you sure you want to delete this order?')

  if (confirmDelete) {
    deleteOrder(orderId)
  }
}
</script>

<template>
  <section class="admin-page">

    <h1>Admin Dashboard</h1>
    <button class="logout-button" @click="logout">
  Logout
</button>
    <div class="search-section">

  <input
    v-model="searchText"
    type="text"
    placeholder="Search orders..."
  >

  <select v-model="selectedStatus">
    <option value="All">All Orders</option>
    <option value="Order Placed">Order Placed</option>
    <option value="Processing">Processing</option>
    <option value="Delivered">Delivered</option>
  </select>

</div>

    <!-- Dashboard Statistics -->
    <div class="dashboard-stats">

      <div class="stat-card">
        <h2>{{ orders.length }}</h2>
        <p>Total Orders</p>
      </div>

      <div class="stat-card">
        <h2>{{ processingOrders }}</h2>
        <p>Processing</p>
      </div>

      <div class="stat-card">
        <h2>{{ deliveredOrders }}</h2>
        <p>Delivered</p>
      </div>

      <div class="stat-card">
  <h2>Rs. {{ totalRevenue }}</h2>
  <p>Total Revenue</p>
</div>

    </div>

    <!-- No Orders -->
    <div v-if="orders.length === 0">
      <p>No orders yet.</p>
    </div>

    <!-- Orders -->
    <div
      v-for="order in filteredOrders"
      :key="order.id"
      class="order-card"
    >

      <h2>{{ order.id }}</h2>

      <p>
  Customer: {{ order.fullName }}
</p>

<p>
  Email: {{ order.email }}
</p>

<p>
  Phone: {{ order.phone }}
</p>

<p>
  Address: {{ order.address }}
</p>

<p>
  Total: Rs. {{ order.total }}
</p>

      <!-- Products -->
      <div class="order-products">

        <p><strong>Products:</strong></p>

        <div
          v-for="product in order.products"
          :key="product.id"
          class="admin-product"
        >

          <img
            :src="product.image"
            :alt="product.name"
          >

          <div class="product-info">

            <p class="product-name">
              {{ product.name }}
            </p>

            <p>
              Quantity: {{ product.quantity }}
            </p>

            <p>
              Price: Rs. {{ product.price }}
            </p>

          </div>

        </div>

      </div>

      <!-- Order Status -->
      <div class="status-section">

        <label>
          Order Status
        </label>

        <select
          :value="order.status"
          @change="
            changeStatus(
              order.id,
              ($event.target as HTMLSelectElement).value
            )
          "
        >

          <option value="Order Placed">
            Order Placed
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Delivered">
            Delivered
          </option>

        </select>
          <button
          class="delete-button"
          @click="deleteOrderWithConfirmation(order.id)"
          >
          Delete Order
         </button>

      </div>

    </div>

  </section>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 40px;
  background: #111;
  color: white;
}

.admin-page h1 {
  margin-bottom: 30px;
}

.admin-page > p {
  color: #ccc;
  margin-bottom: 30px;
}

/* ==============================
   DASHBOARD STATISTICS
============================== */

.dashboard-stats {
  display: flex;
  gap: 20px;
  max-width: 700px;
  margin: 0 auto 30px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 10px;
  text-align: center;
}

.stat-card h2 {
  font-size: 28px;
  margin-bottom: 5px;
}

.stat-card p {
  color: #ccc;
  margin: 0;
}

/* ==============================
   ORDER CARD
============================== */

.order-card {
  max-width: 700px;
  margin: 0 auto 20px;
  padding: 25px;
  background: #1a1a1a;
  border-radius: 10px;
}

.order-card h2 {
  margin-bottom: 15px;
}

.order-card > p {
  color: #ccc;
  margin-bottom: 8px;
}

/* ==============================
   ORDER PRODUCTS
============================== */

.order-products {
  margin-top: 20px;
}

.order-products > p {
  margin-bottom: 12px;
}

.admin-product {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  margin-bottom: 10px;
  background: #111;
  border-radius: 8px;
}

.admin-product img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: white;
  border-radius: 5px;
}

.product-info {
  flex: 1;
}

.product-info p {
  color: #ccc;
  margin-bottom: 5px;
}

.product-info .product-name {
  color: white;
  font-weight: bold;
  font-size: 16px;
}

/* ==============================
   STATUS
============================== */

.status-section {
  margin-top: 20px;
}

.status-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.status-section select {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

/* ==============================
   MOBILE
============================== */

@media (max-width: 700px) {

  .admin-page {
    padding: 20px;
  }

  .dashboard-stats {
    flex-direction: column;
  }

  .admin-product {
    align-items: flex-start;
  }
  .admin-product {
  flex-direction: column;
  text-align: center;
}

.admin-product img {
  width: 100px;
  height: 100px;
}

.product-info {
  width: 100%;
}

}
/* ==============================
   ORDER CARD IMPROVEMENTS
============================== */

.order-card {
  border: 1px solid #333;
}

.order-card h2 {
  font-size: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333;
}

.order-products {
  padding-top: 5px;
  border-top: 1px solid #333;
}

.order-products > p {
  font-size: 16px;
  color: white;
  margin-bottom: 15px;
}

.admin-product {
  border: 1px solid #333;
}

.status-section {
  padding-top: 15px;
  border-top: 1px solid #333;
}
/* ==============================
   DELETE ORDER BUTTON
============================== */

.delete-button {
  margin-top: 12px;
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.delete-button:hover {
  background: #444;
}

.search-section {
  max-width: 700px;
  margin: 0 auto 30px;
}

.search-section input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #1a1a1a;
  color: white;
  font-size: 14px;
}

.search-section input::placeholder {
  color: #888;
}

.search-section input:focus {
  outline: none;
  border-color: #555;
}
.search-section select {
  width: 100%;
  margin-top: 10px;
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #1a1a1a;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.logout-button {
  padding: 10px 20px;
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.logout-button:hover {
  background: #444;
}
</style>