import { ref, watch } from 'vue'

type CartProduct = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

const savedCart = localStorage.getItem('cart')

const cart = ref<CartProduct[]>(
  savedCart ? JSON.parse(savedCart) : []
)
watch(
  cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true }
)

export function useCart() {
  return {
    cart
  }
}