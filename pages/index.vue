<template>
  <div class="max-w-6xl mx-auto px-6 py-10 space-y-10">
    <section class="grid gap-6 md:grid-cols-2 items-center">
      <div class="space-y-6">
        <div class="space-y-4">
          <h1 class="text-3xl md:text-4xl font-bold text-textMain">
            Свіжа випічка щодня
          </h1>
          <p class="text-base text-textSecondary max-w-xl">
            Онлайн-замовлення продукції пекарні з самовивозом. Оберіть улюблену випічку та заберіть її у зручний час.
          </p>
        </div>

        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/categories"
            class="bg-primary hover:bg-primaryHover text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            Перейти до каталогу
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="border border-border text-textMain px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
          >
            Про пекарню
          </NuxtLink>
        </div>
      </div>

      <div class="bg-card rounded-xl shadow-sm border border-border p-6">
        <p class="text-xl font-semibold mb-3 text-textMain">Пекарня «Зерно»</p>
        <p class="text-base text-textSecondary">
          Невелика пекарня зі свіжою випічкою, простим замовленням і самовивозом у зручній точці.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-textMain">Категорії</h2>
      <CategoriesGrid />
    </section>
  </div>
</template>

<script setup lang="ts">
const CategoriesGrid = defineAsyncComponent(() => import('~/components/CategoriesGrid.vue'))
</script>
