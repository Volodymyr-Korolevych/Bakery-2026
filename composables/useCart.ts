export type CartItem = {
  product_id: number
  name: string
  slug: string
  price: number
  weight_grams: number | null
  image_url: string | null
  qty: number
}

type CartState = {
  items: CartItem[]
}

const STORAGE_KEY = 'bakery-2026-cart'

export const useCart = () => {
  const cart = useState<CartState>('cart', () => ({ items: [] }))

  const loadFromStorage = () => {
    if (process.client) {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          cart.value = JSON.parse(raw)
        } catch {
          cart.value = { items: [] }
        }
      }
    }
  }

  const persist = () => {
    if (process.client) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.value))
    }
  }

  const addItem = (item: Omit<CartItem, 'qty'>, qty = 1) => {
    const existing = cart.value.items.find((i) => i.product_id === item.product_id)
    if (existing) {
      existing.qty += qty
    } else {
      cart.value.items.push({ ...item, qty })
    }
    persist()
  }

  const removeItem = (productId: number) => {
    cart.value.items = cart.value.items.filter((i) => i.product_id !== productId)
    persist()
  }

  const updateQty = (productId: number, qty: number) => {
    const item = cart.value.items.find((i) => i.product_id === productId)
    if (!item) return
    item.qty = Math.max(1, qty)
    persist()
  }

  const clearCart = () => {
    cart.value.items = []
    persist()
  }

  const total = computed(() =>
    cart.value.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  if (process.client && cart.value.items.length === 0) {
    loadFromStorage()
  }

  return {
    cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    total
  }
}
