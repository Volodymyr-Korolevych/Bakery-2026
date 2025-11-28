<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-10">
    <section class="grid gap-6 md:grid-cols-2 items-center">
      <div class="space-y-4">
        <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
          Свіжа випічка щодня
        </h1>
        <p class="text-slate-600">
          Онлайн-замовлення продукції пекарні з самовивозом. Оберіть улюблений хліб, булочки та десерти — заберіть у зручний час.
        </p>
        <div class="flex gap-3">
          <NuxtLink
            to="/categories"
            class="inline-flex items-center rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            Перейти до каталогу
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Про пекарню
          </NuxtLink>
        </div>
      </div>
      <div class="rounded-3xl border bg-white shadow-sm p-6 text-sm text-slate-600">
        <p class="font-medium mb-2">Дипломний проєкт Bakery-2026</p>
        <p>Це демонстраційний веб-застосунок для замовлення продукції пекарні з самовивозом. Реалізовано на Nuxt 3, Supabase та Tailwind CSS.</p>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-4">Категорії</h2>
      <CategoriesGrid />
    </section>
  </div>
</template>

<script setup lang="ts">
const CategoriesGrid = defineAsyncComponent(() => import('~/components/CategoriesGrid.vue'))
</script>
