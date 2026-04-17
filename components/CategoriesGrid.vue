<template>
  <div>
    <div v-if="pending" class="text-sm text-textSecondary">Завантаження категорій…</div>
    <div v-else-if="error" class="text-sm text-red-600">Помилка завантаження категорій.</div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/categories/${cat.slug}`"
        class="bg-card rounded-xl shadow-sm border border-border p-4 hover:shadow-md transition group"
      >
        <div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
          <img
            v-if="cat.image_url"
            :src="imageUrl(cat.image_url)"
            :alt="cat.name"
            class="h-full w-full object-cover group-hover:scale-105 transition"
          />
        </div>

        <div class="text-base font-semibold text-textMain">
          {{ cat.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/composables/useCatalog'
const { isExternalUrl } = useStorageImages()

const { fetchCategories } = useCatalog()
const categories = ref<Category[]>([])
const pending = ref(true)
const error = ref<Error | null>(null)

const imageUrl = (path: string) => {
  return isExternalUrl(path) ? path : `/images/${path}`
}

onMounted(async () => {
  try {
    categories.value = await fetchCategories()
  } catch (e: any) {
    error.value = e
  } finally {
    pending.value = false
  }
})
</script>
