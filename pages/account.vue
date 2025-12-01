<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-8">
    <div v-if="!user" class="grid gap-8 md:grid-cols-2">
      <form class="space-y-4" @submit.prevent="login">
        <h1 class="text-xl font-semibold">Вхід</h1>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Email</label>
          <input
            v-model="loginEmail"
            type="email"
            required
            class="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Пароль</label>
          <input
            v-model="loginPassword"
            type="password"
            required
            class="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          Увійти
        </button>
        <p v-if="authError" class="text-sm text-red-600 mt-2">{{ authError }}</p>
      </form>

      <form class="space-y-4" @submit.prevent="register">
        <h2 class="text-xl font-semibold">Реєстрація</h2>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Ім’я</label>
            <input
              v-model="firstName"
              type="text"
              required
              class="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Прізвище</label>
            <input
              v-model="lastName"
              type="text"
              required
              class="w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Email</label>
          <input
            v-model="regEmail"
            type="email"
            required
            class="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Пароль</label>
          <input
            v-model="regPassword"
            type="password"
            required
            class="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Зареєструватися
        </button>
      </form>
    </div>

    <div v-else class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight">Обліковий запис</h1>
          <p class="text-sm text-slate-600">
            {{ profile?.first_name }} {{ profile?.last_name }} ({{ user.email }})
          </p>
        </div>
        <button
          class="text-sm text-slate-600 hover:text-red-600"
          @click="handleSignOut"
        >
          Вийти
        </button>
      </div>

      <div class="grid gap-8 md:grid-cols-2 items-start">
        <section class="space-y-4 rounded-2xl border bg-white p-4 shadow-sm text-sm">
          <h2 class="text-base font-semibold">Профіль</h2>
          <form class="space-y-3" @submit.prevent="saveProfile">
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Ім’я</label>
              <input
                v-model="profileFirstName"
                type="text"
                class="w-full rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Прізвище</label>
              <input
                v-model="profileLastName"
                type="text"
                class="w-full rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-600 mb-1">Телефон</label>
              <input
                v-model="profilePhone"
                type="tel"
                class="w-full rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              class="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-medium text-white hover:bg-amber-600"
            >
              Зберегти зміни
            </button>
          </form>
        </section>

        <section class="space-y-3 rounded-2xl border bg-white p-4 shadow-sm text-sm">
          <h2 class="text-base font-semibold">Мої замовлення</h2>
          <div v-if="!orders.length" class="text-sm text-slate-600">
            Ви ще не робили замовлень.
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="order in orders"
              :key="order.id"
              class="flex items-center justify-between rounded-xl border px-3 py-2"
            >
              <div>
                <div class="font-medium">Замовлення №{{ order.id }}</div>
                <div class="text-xs text-slate-500">
                  {{ new Date(order.created_at).toLocaleString() }}
                </div>
              </div>
              <div class="text-right text-sm">
                <div class="font-semibold text-amber-700">
                  ₴{{ order.total.toFixed(2) }}
                </div>
                <div class="text-xs text-slate-500">{{ order.phone }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, profile, loadUser, signIn, signUp, signOut, updateProfile } = useAuthUser()
const { fetchMyOrders } = useOrders()

const config = useRuntimeConfig()
const router = useRouter()

const adminEmails = (config.adminEmails || '')
  .split(',')
  .map((e: string) => e.trim())
  .filter(Boolean)

const isAdminEmail = (email: string | null | undefined) => {
  if (!email) return false
  return adminEmails.includes(email)
}

const orders = ref<any[]>([])

const loginEmail = ref('')
const loginPassword = ref('')
const regEmail = ref('')
const regPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const authError = ref<string | null>(null)

const profileFirstName = ref('')
const profileLastName = ref('')
const profilePhone = ref('')

const redirectIfAdmin = async () => {
  if (user.value && isAdminEmail(user.value.email)) {
    await router.push('/admin')
    return true
  }
  return false
}

const initAuthed = async () => {
  await loadUser()
  if (!user.value) return

  // Якщо це адмінський email — одразу переводимо в режим адміна
  const redirected = await redirectIfAdmin()
  if (redirected) {
    return
  }

  if (profile.value) {
    profileFirstName.value = profile.value.first_name || ''
    profileLastName.value = profile.value.last_name || ''
    profilePhone.value = profile.value.phone || ''
  }
  orders.value = await fetchMyOrders()
}

const login = async () => {
  authError.value = null
  try {
    await signIn({ email: loginEmail.value, password: loginPassword.value })
    await initAuthed()
  } catch (e: any) {
    authError.value = e.message || 'Помилка входу'
  }
}

const register = async () => {
  authError.value = null
  try {
    await signUp({
      email: regEmail.value,
      password: regPassword.value,
      firstName: firstName.value,
      lastName: lastName.value
    })
    await initAuthed()
  } catch (e: any) {
    authError.value = e.message || 'Помилка реєстрації'
  }
}

const saveProfile = async () => {
  if (!profile.value) return
  await updateProfile({
    id: profile.value.id,
    first_name: profileFirstName.value,
    last_name: profileLastName.value,
    phone: profilePhone.value,
    created_at: profile.value.created_at
  })
  await initAuthed()
}

const handleSignOut = async () => {
  await signOut()
  await router.push('/account')
}

onMounted(async () => {
  await initAuthed()
})
</script>
