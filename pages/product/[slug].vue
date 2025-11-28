<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="pending" class="text-sm text-slate-500">Завантаження…</div>
    <div v-else-if="!product" class="text-sm text-red-600">Товар не знайдено.</div>
    <div v-else class="grid gap-8 md:grid-cols-2">
      <div class="rounded-3xl border bg-white p-4 shadow-sm">
        <div class="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
          <img
            v-if="product.image_url"
            :src="product.image_url"
            :alt="product.name"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
      <div class="space-y-4">
        <h1 class="text-2xl font-semibold tracking-tight">{{ product.name }}</h1>
        <p v-if="product.description" class="text-sm text-slate-700">
          {{ product.description }}
        </p>
        <div class="flex items-center gap-4 text-sm text-slate-600">
          <span v-if="product.weight_grams">Вага: {{ product.weight_grams }} г</span>
        </div>
        <div class="text-xl font-semibold text-amber-700">
          ₴{{ product.price.toFixed(2) }}
        </div>
        <button
          type="button"
          class="inline-flex items-center rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600"
          @click="handleAddToCart"
        >
          Додати в кошик
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useCatalog'

const route = useRoute()
const { fetchProductBySlug } = useCatalog()
const { addItem } = useCart()

const product = ref<Product | null>(null)
const pending = ref(true)

const handleAddToCart = () => {
  if (!product.value) return
  addItem({
    product_id: product.value.id,
    name: product.value.name,
    slug: product.value.slug,
    price: product.value.price,
    weight_grams: product.value.weight_grams,
    image_url: product.value.image_url
  })
}

onMounted(async () => {
  const slug = route.params.slug as string
  product.value = await fetchProductBySlug(slug)
  pending.value = false
})
</script>
