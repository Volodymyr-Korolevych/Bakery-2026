<template>
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 class="text-2xl font-semibold tracking-tight mb-4">Оформлення замовлення</h1>
    <div v-if="!cart.items.length" class="text-sm text-slate-600">
      Кошик порожній. Спочатку додайте товари.
    </div>
    <div v-else class="grid gap-6 md:grid-cols-[2fr,1fr] items-start">
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Телефон *</label>
          <input
            v-model="phone"
            type="tel"
            class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Пункт самовивозу</label>
          <select
            v-model="pickupLocationId"
            class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option :value="null">Оберіть пункт</option>
            <option
              v-for="loc in pickupLocations"
              :key="loc.id"
              :value="loc.id"
            >
              {{ loc.name }} — {{ loc.address }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Коментар до замовлення</label>
          <textarea
            v-model="notes"
            rows="3"
            class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          Підтвердити замовлення
        </button>
        <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
        <p v-if="success" class="text-sm text-emerald-600 mt-2">Замовлення успішно створене.</p>
      </form>

      <div class="rounded-2xl border bg-white p-4 shadow-sm space-y-3 text-sm">
        <div class="flex justify-between">
          <span>Кількість позицій</span>
          <span>{{ cart.items.length }}</span>
        </div>
        <div class="flex justify-between">
          <span>Сума замовлення</span>
          <span class="font-semibold text-amber-700">₴{{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { cart, total } = useCart()
const { placeOrder } = useOrders()
const nuxtApp = useNuxtApp()

type PickupLocation = {
  id: number
  name: string
  address: string
  work_hours: string | null
  is_active: boolean
}

const phone = ref('')
const pickupLocationId = ref<number | null>(null)
const notes = ref<string | null>(null)
const pickupLocations = ref<PickupLocation[]>([])
const error = ref<string | null>(null)
const success = ref(false)

const loadPickupLocations = async () => {
  const { data, error: err } = await nuxtApp.$supabase
    .from('pickup_locations')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true })
  if (!err && data) {
    pickupLocations.value = data as PickupLocation[]
  }
}

const submit = async () => {
  error.value = null
  success.value = false
  try {
    await placeOrder({
      phone: phone.value,
      pickupLocationId: pickupLocationId.value,
      notes: notes.value
    })
    success.value = true
  } catch (e: any) {
    error.value = e.message || 'Не вдалося створити замовлення.'
  }
}

onMounted(loadPickupLocations)
</script>
