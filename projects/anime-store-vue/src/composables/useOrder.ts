import { ref } from 'vue'

type Order = {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  products: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }[]
  total: number
  status: string
}

const orders = ref<Order[]>([])

export function useOrder() {

  function saveOrder(newOrder: Omit<Order, 'status'>) {
    const orderWithStatus: Order = {
      ...newOrder,
      status: 'Order Placed'
    }

    orders.value.push(orderWithStatus)

    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  function loadOrders() {
    const savedOrders = localStorage.getItem('orders')

    if (savedOrders) {
      const savedOrdersList = JSON.parse(savedOrders)

      orders.value = savedOrdersList.map((order: Order) => {
        return {
          ...order,
          status: order.status || 'Order Placed'
        }
      })
    }
  }
  function updateOrderStatus(orderId: string, newStatus: string) {
  const order = orders.value.find(item => item.id === orderId)

  if (!order) return

  order.status = newStatus

  localStorage.setItem('orders', JSON.stringify(orders.value))
}
function deleteOrder(orderId: string) {
  orders.value = orders.value.filter(order => order.id !== orderId)

  localStorage.setItem('orders', JSON.stringify(orders.value))
}

  return {
    orders,
    saveOrder,
    loadOrders,
    updateOrderStatus,
    deleteOrder
  }
}