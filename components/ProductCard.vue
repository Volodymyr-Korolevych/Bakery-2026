<template>
  <div class="product-card group flex h-full flex-col">
    <NuxtLink :to="`/product/${product.slug}`" class="block">
      <div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
        <img v-if="resolvedImageUrl" :src="resolvedImageUrl" :alt="product.name"
          class="product-card-image mb-0 group-hover:scale-105 transition duration-200" />
      </div>

      <h3 class="product-title">
        {{ product.name }}
      </h3>

      <p v-if="product.weight_grams" class="product-meta">
        {{ product.weight_grams }} г
      </p>

      <div class="mt-4">
        <div class="product-price">
          ₴{{ Number(product.price).toFixed(2) }}
        </div>
      </div>
    </NuxtLink>

    <div class="mt-5">
      <button type="button" class="w-full" :class="isInCart ? 'btn-secondary opacity-80 cursor-default' : 'btn-primary'"
        :disabled="isInCart" @click="handleAddToCart">
        {{ isInCart ? 'Вже в кошику' : 'В кошик' }}
      </button>
    </div>
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