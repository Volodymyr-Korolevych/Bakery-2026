<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <h1 class="text-xl font-semibold">Кошик</h1>

    <div v-if="cart.items.length === 0" class="text-sm text-slate-500">
      Кошик порожній
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cart.items"
        :key="item.product_id"
        class="flex items-center gap-4 border rounded-xl p-3"
      >
        <img
          :src="getImage(item.image_url)"
          class="w-20 h-20 object-cover rounded-lg border"
        />

        <div class="flex-1">
          <div class="font-medium">{{ item.name }}</div>
          <div class="text-xs text-slate-500">
            {{ item.weight_grams }} г
          </div>

          <div class="text-sm mt-1">
            ₴{{ item.price.toFixed(2) }} × {{ item.qty }}
          </div>
        </div>

        <div class="text-sm font-semibold">
          ₴{{ (item.price * item.qty).toFixed(2) }}
        </div>

        <button
          class="text-xs text-red-500"
          @click="removeItem(item.product_id)"
        >
          Видалити
        </button>
      </div>

      <div class="flex justify-between font-semibold text-lg pt-4 border-t">
        <span>Разом:</span>
        <span>₴{{ total.toFixed(2) }}</span>
      </div>

      <NuxtLink
        to="/checkout"
        class="inline-flex rounded-full bg-amber-500 text-white px-5 py-2 text-sm hover:bg-amber-600"
      >
        Оформити замовлення
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cart, removeItem, total } = useCart()
const { isExternalUrl } = useStorageImages()

const getImage = (url: string | null) => {
  if (!url) return ''
  if (isExternalUrl(url)) return url
  return '/images/' + url
}
</script>
