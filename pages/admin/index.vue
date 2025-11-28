<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-4">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight mb-2">Адмін-панель</h1>
      <p class="text-sm text-slate-600 mb-4">
        Виберіть розділ для керування даними пекарні.
      </p>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <NuxtLink to="/admin/products" class="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="font-semibold mb-1">Товари</div>
        <p class="text-xs text-slate-600">Додавання, редагування та приховування товарів.</p>
      </NuxtLink>
      <NuxtLink to="/admin/categories" class="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="font-semibold mb-1">Категорії</div>
        <p class="text-xs text-slate-600">Керування категоріями каталогу.</p>
      </NuxtLink>
      <NuxtLink to="/admin/orders" class="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="font-semibold mb-1">Замовлення</div>
        <p class="text-xs text-slate-600">Перегляд усіх замовлень.</p>
      </NuxtLink>
      <NuxtLink to="/admin/pickups" class="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
        <div class="font-semibold mb-1">Точки самовивозу</div>
        <p class="text-xs text-slate-600">Адреси та години роботи.</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})
</script>
