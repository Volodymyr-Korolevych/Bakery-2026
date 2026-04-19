<template>
  <div class="max-w-6xl mx-auto px-6 py-10 md:py-14">
    <div class="max-w-4xl">
     <header class="flex items-start justify-between gap-6">
        <div class="space-y-3">
          <h1 class="page-title mb-0">Адмін-панель</h1>
          <p class="page-subtitle max-w-2xl">
            Оберіть розділ для керування даними пекарні
          </p>
        </div>

        <button class="btn-outline-accent text-sm px-3 py-1.5" @click="handleSignOut">
          Вийти
        </button>
      </header>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      <NuxtLink to="/admin/categories" class="admin-panel-card group min-h-[150px] flex flex-col justify-between">
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-2xl font-semibold text-textMain">
            Категорії
          </h2>
          <span class="text-lg text-slate-300 transition group-hover:text-primary">
            →
          </span>
        </div>

        <p class="text-base leading-7 text-slate-600">
          Перелік категорій товарів, зображення категорій, сортування та статус активності.
        </p>
      </NuxtLink>

      <NuxtLink to="/admin/products" class="admin-panel-card group min-h-[150px] flex flex-col justify-between">
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-2xl font-semibold text-textMain">
            Продукти
          </h2>
          <span class="text-lg text-slate-300 transition group-hover:text-primary">
            →
          </span>
        </div>

        <p class="text-base leading-7 text-slate-600">
          Створення та редагування продуктів: ціна, опис, вага, фото, належність до категорії.
        </p>
      </NuxtLink>

      <NuxtLink to="/admin/pickup" class="admin-panel-card group min-h-[150px] flex flex-col justify-between">
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-2xl font-semibold text-textMain">
            Точки самовивозу
          </h2>
          <span class="text-lg text-slate-300 transition group-hover:text-primary">
            →
          </span>
        </div>

        <p class="text-base leading-7 text-slate-600">
          Адреси, години роботи та статуси точок видачі замовлень.
        </p>
      </NuxtLink>

      <NuxtLink to="/admin/orders" class="admin-panel-card group min-h-[150px] flex flex-col justify-between">
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-2xl font-semibold text-textMain">
            Замовлення
          </h2>
          <span class="text-lg text-slate-300 transition group-hover:text-primary">
            →
          </span>
        </div>

        <p class="text-base leading-7 text-slate-600">
          Перегляд списку замовлень та складу кожного замовлення.
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})
const router = useRouter()
const {  signOut } = useAuthUser()

const handleSignOut = async () => {
  +

  await signOut()
  await router.push('/account')
}
</script>
