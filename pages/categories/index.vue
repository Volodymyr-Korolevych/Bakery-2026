<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-4">
    <h1 class="text-2xl font-semibold tracking-tight mb-2">Категорії продукції</h1>
    <p class="text-sm text-slate-600 mb-4">
      Оберіть категорію, щоб переглянути асортимент.
    </p>
    <CategoriesGrid />
  </div>
</template>

<script setup lang="ts">
const CategoriesGrid = defineAsyncComponent(() => import('~/components/CategoriesGrid.vue'))
</script>
