<script setup lang="ts">
import { computed } from 'vue'
import { useOrder } from '../composables/useOrder'

const { orders, loadOrders } = useOrder()

loadOrders()

const order = computed(() => {
  return orders.value[orders.value.length - 1]
})
</script>

<template>
  <section class="confirmation-page">

    <div v-if="order">

      <h1>Order Confirmed!</h1>

      <p>
        Thank you for your order, {{ order.fullName }}.
      </p>

      <p>
        Order ID: {{ order.id }}
      </p>

      <hr>

      <h2>Order Details</h2>

      <div
        v-for="product in order.products"
        :key="product.id"
        class="order-item"
      >
        <div>
          <h3>{{ product.name }}</h3>

          <p>
            Quantity: {{ product.quantity }}
          </p>
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

    <div v-else class="no-order">
      <h1>No Order Found</h1>

      <p>
        You haven't placed an order yet.
      </p>
    </div>

  </section>
</template>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  padding: 40px;
  background: #111;
  color: white;
}

.confirmation-page > div {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background: #1a1a1a;
  border-radius: 10px;
}

.confirmation-page h1 {
  margin-bottom: 15px;
}

.confirmation-page h2 {
  margin: 25px 0 15px;
}

.confirmation-page p {
  color: #ccc;
  margin-bottom: 8px;
}

.confirmation-page hr {
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