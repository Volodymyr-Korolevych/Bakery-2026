<template>
  <div class="group rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
    <NuxtLink :to="`/product/${product.slug}`" class="block">
      <div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
        <img
          v-if="resolvedImageUrl"
          :src="resolvedImageUrl"
          :alt="product.name"
          class="h-full w-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div class="font-medium mb-1">{{ product.name }}</div>

      <div class="text-sm text-slate-600 flex justify-between items-center mb-3">
        <span v-if="product.weight_grams">{{ product.weight_grams }} г</span>
        <span class="font-semibold text-amber-700">₴{{ Number(product.price).toFixed(2) }}</span>
      </div>
    </NuxtLink>

    <button
      type="button"
      class="inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition"
      :class="isInCart
        ? 'bg-slate-200 text-slate-700 cursor-default'
        : 'bg-amber-500 text-white hover:bg-amber-600'"
      :disabled="isInCart"
      @click="handleAddToCart"
    >
      {{ isInCart ? 'Вже в кошику' : 'В кошик' }}
    </button>
  </div>
</template>

<script setup lang="ts">
type ProductCardItem = {
  id: number
  category_id: number
  name: string
  slug: string
  price: number
  description: string | null
  image_url: string | null
  stock: number
  weight_grams: number | null
  is_active: boolean
}

const props = defineProps<{
  product: ProductCardItem
}>()

const { addItem, hasProduct } = useCart()
const { isExternalUrl } = useStorageImages()

const isInCart = computed(() => hasProduct(props.product.id))

const resolvedImageUrl = computed(() => {
  if (!props.product.image_url) return ''
  if (isExternalUrl(props.product.image_url)) return props.product.image_url
  return `/images/${props.product.image_url}`
})

const handleAddToCart = () => {
  if (isInCart.value) return

  addItem({
    product_id: props.product.id,
    name: props.product.name,
    slug: props.product.slug,
    price: props.product.price,
    weight_grams: props.product.weight_grams,
    image_url: props.product.image_url
  })
}
</script>
