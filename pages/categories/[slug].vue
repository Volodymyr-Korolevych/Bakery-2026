<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-4">
    <div v-if="pending" class="text-sm text-slate-500">Завантаження…</div>
    <div v-else-if="!category" class="text-sm text-red-600">Категорію не знайдено.</div>
    <div v-else>
      <h1 class="text-2xl font-semibold mb-2">{{ category.name }}</h1>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        <NuxtLink
          v-for="p in products"
          :key="p.id"
          :to="`/product/${p.slug}`"
          class="group rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          <div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
            <img
              v-if="p.image_url"
              :src= "imageUrl(p.image_url)"
              :alt="p.name"
              class="h-full w-full object-cover group-hover:scale-105 transition"
            />
          </div>
          <div class="font-medium mb-1">{{ p.name }}</div>
          <div class="text-sm text-slate-600 flex justify-between items-center">
            <span v-if="p.weight_grams">{{ p.weight_grams }} г</span>
            <span class="font-semibold text-amber-700">₴{{ p.price.toFixed(2) }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '~/composables/useCatalog'
const { isExternalUrl } = useStorageImages()

const route = useRoute()
const { fetchProductsByCategorySlug } = useCatalog()

const category = ref<Category | null>(null)
const products = ref<Product[]>([])
const pending = ref(true)

onMounted(async () => {
  const slug = route.params.slug as string
  const data = await fetchProductsByCategorySlug(slug)
  category.value = data.category as Category | null
  products.value = data.products as Product[]
  pending.value = false
})

const imageUrl = (path: string) => {
  return isExternalUrl(path) ? path : `/images/${path}`
}
</script>
