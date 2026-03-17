<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-4">
    <div v-if="pending" class="text-sm text-slate-500">Завантаження…</div>

    <div v-else-if="!category" class="text-sm text-red-600">
      Категорію не знайдено.
    </div>

    <div v-else>
      <h1 class="text-2xl font-semibold mb-2">{{ category.name }}</h1>

      <div v-if="products.length === 0" class="text-sm text-slate-500 mt-4">
        У цій категорії поки немає товарів.
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        <ProductCard
          v-for="p in products"
          :key="p.id"
          :product="p"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '~/composables/useCatalog'
import ProductCard from '~/components/ProductCard.vue'

const route = useRoute()
const { fetchProductsByCategorySlug } = useCatalog()

const category = ref<Category | null>(null)
const products = ref<Product[]>([])
const pending = ref(true)

onMounted(async () => {
  try {
    const slug = route.params.slug as string
    const data = await fetchProductsByCategorySlug(slug)
    category.value = data.category as Category | null
    products.value = data.products as Product[]
  } finally {
    pending.value = false
  }
})
</script>
