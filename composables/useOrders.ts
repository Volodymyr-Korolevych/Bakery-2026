import type { CartItem } from './useCart'

export type Order = {
  id: number
  user_id: string
  total: number
  pickup_location_id: number | null
  phone: string
  notes: string | null
  created_at: string
}

export type OrderItem = {
  id: number
  order_id: number
  product_id: number
  qty: number
  price: number
}

export const useOrders = () => {
  const nuxtApp = useNuxtApp()
  const { cart, clearCart, total } = useCart()
  const { user, profile, updateProfile } = useAuthUser()

  const placeOrder = async (payload: { phone: string; pickupLocationId: number | null; notes?: string | null }) => {
    if (!user.value) throw new Error('Необхідна авторизація')
    if (!cart.value.items.length) throw new Error('Кошик порожній')

    const { phone, pickupLocationId, notes = null } = payload
    const orderTotal = total.value

    const { data: order, error } = await nuxtApp.$supabase
      .from('orders')
      .insert({
        user_id: user.value.id,
        total: orderTotal,
        pickup_location_id: pickupLocationId,
        phone,
        notes
      })
      .select('*')
      .maybeSingle()

    if (error) throw error
    if (!order) throw new Error('Не вдалося створити замовлення')

    const orderItemsPayload = cart.value.items.map((item: CartItem) => ({
      order_id: order.id,
      product_id: item.product_id,
      qty: item.qty,
      price: item.price
    }))

    const { error: itemsError } = await nuxtApp.$supabase
      .from('order_items')
      .insert(orderItemsPayload)

    if (itemsError) throw itemsError

    if (!profile.value?.phone || profile.value.phone !== phone) {
      await updateProfile({ ...profile.value, phone } as any)
    }

    clearCart()
    return order as Order
  }

  const fetchMyOrders = async () => {
    const { data, error } = await nuxtApp.$supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Order[]
  }

  const fetchOrderWithItems = async (orderId: number) => {
    const { data: order, error } = await nuxtApp.$supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .maybeSingle()
    if (error) throw error

    const { data: items, error: itemsError } = await nuxtApp.$supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
    if (itemsError) throw itemsError

    return { order: order as Order | null, items: items as OrderItem[] }
  }

  return {
    placeOrder,
    fetchMyOrders,
    fetchOrderWithItems
  }
}
