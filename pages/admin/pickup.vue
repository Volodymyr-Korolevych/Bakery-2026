<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <header class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold tracking-tight">Точки самовивозу</h1>
        <p class="text-xs text-slate-600">
          Керування адресами та годинами роботи точок видачі.
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
          <h2 class="text-sm font-semibold">Перелік локацій</h2>
          <button
            class="text-xs rounded-full border px-3 py-1 hover:bg-slate-50"
            @click="startNewPickup"
          >
            + Нова локація
          </button>
        </div>

        <div class="rounded-2xl border bg-white overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left">ID</th>
                <th class="px-3 py-2 text-left">Назва</th>
                <th class="px-3 py-2 text-left">Адреса</th>
                <th class="px-3 py-2 text-left">Години роботи</th>
                <th class="px-3 py-2 text-left">Активна</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="loc in pickupLocations"
                :key="loc.id"
                class="border-t hover:bg-slate-50/60 cursor-pointer"
                @click="selectPickup(loc)"
              >
                <td class="px-3 py-2 text-xs text-slate-500">#{{ loc.id }}</td>
                <td class="px-3 py-2">{{ loc.name }}</td>
                <td class="px-3 py-2 text-xs text-slate-500">{{ loc.address }}</td>
                <td class="px-3 py-2 text-xs">{{ loc.work_hours }}</td>
                <td class="px-3 py-2 text-xs">
                  <span
                    class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px]"
                    :class="loc.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
                  >
                    {{ loc.is_active ? 'Так' : 'Ні' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4 rounded-2xl border bg-white p-4 shadow-sm text-sm">
        <h3 class="text-base font-semibold">
          {{ pickupForm.id ? 'Редагування локації' : 'Нова локація' }}
        </h3>

        <form class="space-y-3" @submit.prevent="savePickup">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Назва</label>
            <input
              v-model="pickupForm.name"
              type="text"
              required
              class="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Адреса</label>
            <textarea
              v-model="pickupForm.address"
              rows="2"
              required
              class="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Години роботи</label>
            <input
              v-model="pickupForm.work_hours"
              type="text"
              class="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
          <div class="flex items-center gap-2">
            <input
              id="pickup-active"
              v-model="pickupForm.is_active"
              type="checkbox"
              class="h-4 w-4 rounded border"
            />
            <label for="pickup-active" class="text-xs text-slate-700">Активна</label>
          </div>

          <div class="flex items-center justify-between pt-2">
            <button
              type="submit"
              class="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-medium text-white hover:bg-amber-600"
            >
              Зберегти
            </button>
            <button
              v-if="pickupForm.id"
              type="button"
              class="text-xs text-red-600 hover:text-red-700"
              @click="deletePickup"
            >
              Видалити
            </button>
          </div>
        </form>
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

type PickupLocation = {
  id: number
  name: string
  address: string
  work_hours: string | null
  is_active: boolean
}

const pickupLocations = ref<PickupLocation[]>([])
const pickupForm = reactive<Partial<PickupLocation>>({
  id: undefined,
  name: '',
  address: '',
  work_hours: '',
  is_active: true
})

const loadPickupLocations = async () => {
  const { data, error } = await supabase
    .from('pickup_locations')
    .select('*')
    .order('id', { ascending: true })
  if (error) {
    console.error('loadPickupLocations', error)
    return
  }
  pickupLocations.value = data as PickupLocation[]
}

const startNewPickup = () => {
  Object.assign(pickupForm, {
    id: undefined,
    name: '',
    address: '',
    work_hours: '',
    is_active: true
  })
}

const selectPickup = (loc: PickupLocation) => {
  Object.assign(pickupForm, loc)
}

const savePickup = async () => {
  try {
    const payload = {
      name: pickupForm.name,
      address: pickupForm.address,
      work_hours: pickupForm.work_hours ?? '',
      is_active: pickupForm.is_active ?? true
    }

    if (pickupForm.id) {
      const { error } = await supabase
        .from('pickup_locations')
        .update(payload)
        .eq('id', pickupForm.id)
      if (error) throw error
    } else {
      const { data, error } = await supabase
        .from('pickup_locations')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      Object.assign(pickupForm, data)
    }

    await loadPickupLocations()
  } catch (e) {
    console.error('savePickup error', e)
  }
}

const deletePickup = async () => {
  if (!pickupForm.id) return
  if (!confirm('Видалити цю локацію?')) return

  try {
    const { error } = await supabase
      .from('pickup_locations')
      .delete()
      .eq('id', pickupForm.id)
    if (error) throw error
    startNewPickup()
    await loadPickupLocations()
  } catch (e) {
    console.error('deletePickup error', e)
  }
}

onMounted(async () => {
  await loadPickupLocations()
})
</script>
