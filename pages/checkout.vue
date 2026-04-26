<template>
  <div class="max-w-6xl mx-auto px-6 py-10 md:py-12 space-y-8">
    <h1 class="page-title">Оформлення замовлення</h1>

    <div v-if="!cart.items.length" class="text-sm text-slate-600">
      Кошик порожній. Спочатку додайте товари.
    </div>

    <div v-else class="grid gap-6 md:grid-cols-[2fr,1fr] items-start">

      <!-- ЛІВА КОЛОНКА -->
      <form class="content-card space-y-5" @submit.prevent="submit">

        <div>
          <label class="field-label">Телефон</label>

          <div class="h-11 flex items-center rounded-xl border border-border bg-gray-50 px-4 text-[15px] text-gray-700">
            {{ profilePhoneDisplay || 'Номер телефону не вказано' }}
          </div>

          <p class="mt-2 text-xs text-gray-500">
            Змінити номер телефону можна в обліковому записі.
          </p>
        </div>

        <div>
          <label class="field-label">Пункт самовивозу</label>

          <select v-model="pickupLocationId" class="field-select">
            <option :value="null">Оберіть пункт</option>
            <option v-for="loc in pickupLocations" :key="loc.id" :value="loc.id">
              {{ loc.name }} — {{ loc.address }}
            </option>
          </select>

          <p v-if="pickupError" class="mt-2 text-sm text-red-600">
            {{ pickupError }}
          </p>
        </div>

        <div>
          <label class="field-label">Коментар до замовлення</label>

          <textarea v-model="notes" rows="3" class="field-textarea" />
        </div>

        <p v-if="phoneError" class="text-sm text-red-600">
          {{ phoneError }}
        </p>

        <div class="pt-2">
          <button type="submit" class="btn-primary !py-2.5 !px-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!canSubmit">
            Підтвердити замовлення
          </button>
        </div>

        <p v-if="error" class="text-sm text-red-600">
          {{ error }}
        </p>
      </form>

      <!-- ПРАВА КОЛОНКА -->
      <div class="summary-card space-y-6 border border-border/70">

        <div class="space-y-5">
          <div v-for="item in cart.items" :key="item.product_id" class="flex items-center gap-3">
            <img :src="getImage(item.image_url)" :alt="item.name"
              class="h-12 w-12 rounded-lg border border-border object-cover bg-slate-100 shrink-0" />

            <div class="min-w-0 flex-1">
              <div class="text-[17px] font-medium leading-tight text-textMain">
                {{ item.name }}
              </div>

              <div class="text-[15px] text-slate-600 mt-1">
                {{ item.qty }} × ₴{{ item.price.toFixed(2) }}
                <span v-if="item.weight_grams" class="mx-1 text-slate-400">•</span>
                <span v-if="item.weight_grams">{{ item.weight_grams }} г</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-border pt-4 space-y-3">
          <div class="flex justify-between text-[15px] text-gray-600">
            <span>Кількість позицій</span>
            <span>{{ cart.items.length }}</span>
          </div>

          <div class="flex justify-between text-xl">
            <span class="font-medium text-textMain">Сума замовлення</span>
            <span class="font-semibold text-xl text-amber-700">
              ₴{{ total.toFixed(2) }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <div v-if="showSuccessPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="max-w-lg w-full rounded-3xl bg-white p-8 shadow-2xl text-center space-y-4">
        <div class="text-2xl font-semibold tracking-tight text-slate-900">
          Ваше замовлення прийняте
        </div>

        <p class="text-base leading-7 text-slate-700">
          Очікуйте підтвердження готовості замовлення в Особистому кабінеті
        </p>
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
const { isExternalUrl } = useStorageImages()
const { profile, loadUser } = useAuthUser()
const nuxtApp = useNuxtApp()
const router = useRouter()

type PickupLocation = {
  id: number
  name: string
  address: string
  work_hours: string | null
  is_active: boolean
}

const pickupLocationId = ref<number | null>(null)
const notes = ref<string | null>(null)
const pickupLocations = ref<PickupLocation[]>([])
const error = ref<string | null>(null)
const phoneError = ref<string | null>(null)
const pickupError = ref<string | null>(null)
const showSuccessPopup = ref(false)
let redirectTimer: ReturnType<typeof setTimeout> | null = null

const normalizePhone = (value: string) => {
  return value.replace(/[\s()-]/g, '')
}

const isValidPhone = (value: string) => {
  if (!value.trim()) return false
  const normalized = normalizePhone(value)
  return /^\+?[0-9]{10,15}$/.test(normalized)
}

const profilePhoneDisplay = computed(() => profile.value?.phone || '')

const canSubmit = computed(() => {
  return !!profile.value?.phone && isValidPhone(profile.value.phone) && pickupLocationId.value !== null
})

const getImage = (url: string | null) => {
  if (!url) return ''
  if (isExternalUrl(url)) return url
  return '/images/' + url
}

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
  phoneError.value = null
  pickupError.value = null

  const phone = profile.value?.phone || ''

  if (!phone) {
    phoneError.value = 'Вкажіть номер телефону в обліковому записі.'
    return
  }

  if (!isValidPhone(phone)) {
    phoneError.value = 'Номер телефону в обліковому записі некоректний.'
    return
  }

  if (pickupLocationId.value === null) {
    pickupError.value = 'Оберіть пункт самовивозу.'
    return
  }

  try {
    await placeOrder({
      phone: normalizePhone(phone),
      pickupLocationId: pickupLocationId.value,
      notes: notes.value
    })

    showSuccessPopup.value = true

    if (redirectTimer) clearTimeout(redirectTimer)
    redirectTimer = setTimeout(async () => {
      showSuccessPopup.value = false
      await router.push('/')
    }, 5000)
  } catch (e: any) {
    error.value = e.message || 'Не вдалося створити замовлення.'
  }
}

onMounted(async () => {
  await loadUser()
  await loadPickupLocations()
})

onBeforeUnmount(() => {
  if (redirectTimer) clearTimeout(redirectTimer)
})
</script>
