<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Товари</h1>
        <p class="text-sm text-slate-600">Список товарів пекарні.</p>
      </div>
      <button
        class="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
      >
        + Новий товар
      </button>
    </div>
    <div class="rounded-2xl border bg-white p-4 shadow-sm text-sm text-slate-600">
      Тут буде реалізація сучасної таблиці та правої панелі для створення/редагування товарів.
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})
</script>
