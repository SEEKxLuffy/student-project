<script setup lang="ts">
import { useOrder } from '../composables/useOrder'

const { orders, loadOrders } = useOrder()

loadOrders()
</script>

<template>
  <section class="orders-page">

    <div v-if="orders.length > 0">

      <h1>My Orders</h1>

      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card"
      >

        <h2>Order Confirmed</h2>

        <p>
          <strong>Order ID:</strong> {{ order.id }}
        </p>
        <p>
  <strong>Status:</strong> {{ order.status }}
</p>

        <hr>

        <h2>Products</h2>

        <div
          v-for="product in order.products"
          :key="product.id"
          class="order-item"
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

        <h2>Total: Rs. {{ order.total }}</h2>

        <hr>

        <h2>Delivery Information</h2>

        <p>
          <strong>Name:</strong> {{ order.fullName }}
        </p>

        <p>
          <strong>Email:</strong> {{ order.email }}
        </p>

        <p>
          <strong>Phone:</strong> {{ order.phone }}
        </p>

        <p>
          <strong>Address:</strong> {{ order.address }}
        </p>

      </div>

    </div>

    <div v-else class="no-order">
      <h1>No Orders Yet</h1>
      <p>You haven't placed an order yet.</p>
    </div>

  </section>
</template>

<style scoped>
.my-orders-page {
  padding: 100px 40px 40px;
  background: #111;
  min-height: 100vh;
}

.orders-page > div {
  max-width: 700px;
  margin: 0 auto;
}

.orders-page h1 {
  margin-bottom: 30px;
}

.order-card {
  margin-bottom: 30px;
  padding: 30px;
  background: #1a1a1a;
  border-radius: 10px;
}

.order-card h2 {
  margin-bottom: 20px;
}

.order-card p {
  color: #ccc;
  margin-bottom: 8px;
}

.order-card hr {
  margin: 25px 0;
  border: none;
  border-top: 1px solid #333;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.order-item h3 {
  margin-bottom: 5px;
}

.order-item p {
  margin: 0;
}

.no-order {
  text-align: center;
}
</style>