<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold tracking-tight">Замовлення</h1>
        <p class="text-xs text-slate-600">
          Перегляд списку замовлень та складу кожного замовлення.
        </p>
      </div>
      <NuxtLink
        to="/admin"
        class="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2"
      >
        ← до панелі
      </NuxtLink>
    </header>

    <div class="grid md:grid-cols-[2fr,1.4fr] gap-6 items-start">
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Список замовлень</h2>
        </div>

        <div class="rounded-2xl border bg-white overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left">ID</th>
                <th class="px-3 py-2 text-left">Дата</th>
                <th class="px-3 py-2 text-left">Телефон</th>
                <th class="px-3 py-2 text-left">Самовивіз</th>
                <th class="px-3 py-2 text-right">Сума</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ord in orders"
                :key="ord.id"
                class="border-t hover:bg-slate-50/60 cursor-pointer"
                @click="selectOrder(ord)"
              >
                <td class="px-3 py-2 text-xs text-slate-500">#{{ ord.id }}</td>
                <td class="px-3 py-2 text-xs">
                  {{ new Date(ord.created_at).toLocaleString() }}
                </td>
                <td class="px-3 py-2 text-xs">{{ ord.phone }}</td>
                <td class="px-3 py-2 text-xs">
                  {{ pickupNameById(ord.pickup_location_id) }}
                </td>
                <td class="px-3 py-2 text-xs text-right">
                  ₴{{ Number(ord.total).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4 rounded-2xl border bg-white p-4 shadow-sm text-sm">
        <h3 class="text-base font-semibold">Деталі замовлення</h3>

        <div v-if="!selectedOrder">
          <p class="text-sm text-slate-500">
            Оберіть замовлення ліворуч, щоб переглянути деталі.
          </p>
        </div>
        <div v-else class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium">Замовлення #{{ selectedOrder.id }}</div>
              <div class="text-xs text-slate-500">
                {{ new Date(selectedOrder.created_at).toLocaleString() }}
              </div>
            </div>
            <div class="text-right text-sm">
              <div class="font-semibold text-amber-700">
                ₴{{ Number(selectedOrder.total).toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="text-xs text-slate-600">
            <div><span class="font-medium">Телефон:</span> {{ selectedOrder.phone }}</div>
            <div v-if="selectedOrder.notes">
              <span class="font-medium">Коментар:</span> {{ selectedOrder.notes }}
            </div>
          </div>

          <div class="pt-2 border-t mt-2">
            <h4 class="text-xs font-semibold text-slate-700 mb-2">Позиції</h4>
            <div v-if="orderItems.length === 0" class="text-xs text-slate-500">
              Позицій немає.
            </div>
            <ul v-else class="space-y-1 text-xs">
              <li
                v-for="item in orderItems"
                :key="item.id"
                class="flex items-center justify-between"
              >
                <span>
                  {{ productNameById(item.product_id) }}
                  <span class="text-slate-400">× {{ item.qty }}</span>
                </span>
                <span>₴{{ Number(item.price).toFixed(2) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

const nuxtApp = useNuxtApp()
const supabase = nuxtApp.$supabase

type Order = {
  id: number
  user_id: string
  total: number
  pickup_location_id: number | null
  phone: string
  notes: string | null
  created_at: string
}

type OrderItem = {
  id: number
  order_id: number
  product_id: number
  qty: number
  price: number
}

type PickupLocation = {
  id: number
  name: string
}

type Product = {
  id: number
  name: string
}

const orders = ref<Order[]>([])
const selectedOrder = ref<Order | null>(null)
const orderItems = ref<OrderItem[]>([])
const pickupLocations = ref<PickupLocation[]>([])
const products = ref<Product[]>([])

const loadOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('loadOrders', error)
    return
  }
  orders.value = data as Order[]
}

const loadOrderItems = async (orderId: number) => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId)
  if (error) {
    console.error('loadOrderItems', error)
    return
  }
  orderItems.value = data as OrderItem[]
}

const loadPickupLocations = async () => {
  const { data, error } = await supabase
    .from('pickup_locations')
    .select('id, name')
  if (error) {
    console.error('loadPickupLocations', error)
    return
  }
  pickupLocations.value = data as PickupLocation[]
}

const loadProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name')
  if (error) {
    console.error('loadProducts', error)
    return
  }
  products.value = data as Product[]
}

const selectOrder = async (ord: Order) => {
  selectedOrder.value = ord
  await loadOrderItems(ord.id)
}

const pickupNameById = (id: number | null | undefined) => {
  if (!id) return '—'
  const loc = pickupLocations.value.find(l => l.id === id)
  return loc ? loc.name : '—'
}

const productNameById = (id: number) => {
  const prod = products.value.find(p => p.id === id)
  return prod ? prod.name : `#${id}`
}

onMounted(async () => {
  await Promise.all([
    loadOrders(),
    loadPickupLocations(),
    loadProducts()
  ])
})
</script>
