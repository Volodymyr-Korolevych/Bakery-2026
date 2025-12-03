<template>
  <div class="max-w-4xl mx-auto px-4 py-10 space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Адмін-панель</h1>
      <p class="text-sm text-slate-600">
        Оберіть розділ для керування даними пекарні.
      </p>
    </header>

    <div class="grid md:grid-cols-2 gap-4">
      <NuxtLink
        to="/admin/categories"
        class="group rounded-2xl border bg-white p-4 hover:shadow-sm transition-shadow flex flex-col gap-2"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Категорії</h2>
          <span class="text-xs text-slate-400 group-hover:text-amber-500">→</span>
        </div>
        <p class="text-xs text-slate-500">
          Перелік категорій товарів, зображення категорій, сортування та статус активності.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/admin/products"
        class="group rounded-2xl border bg-white p-4 hover:shadow-sm transition-shadow flex flex-col gap-2"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Продукти</h2>
          <span class="text-xs text-slate-400 group-hover:text-amber-500">→</span>
        </div>
        <p class="text-xs text-slate-500">
          Створення та редагування продуктів: ціна, опис, вага, фото, належність до категорії.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/admin/pickup"
        class="group rounded-2xl border bg-white p-4 hover:shadow-sm transition-shadow flex flex-col gap-2"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Точки самовивозу</h2>
          <span class="text-xs text-slate-400 group-hover:text-amber-500">→</span>
        </div>
        <p class="text-xs text-slate-500">
          Адреси, години роботи та статуси точок видачі замовлень.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/admin/orders"
        class="group rounded-2xl border bg-white p-4 hover:shadow-sm transition-shadow flex flex-col gap-2"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold">Замовлення</h2>
          <span class="text-xs text-slate-400 group-hover:text-amber-500">→</span>
        </div>
        <p class="text-xs text-slate-500">
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
</script>
