<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <h1 class="text-xl font-semibold">Оформлення замовлення</h1>

    <div v-if="cart.items.length === 0" class="text-sm text-slate-500">
      Кошик порожній
    </div>

    <div v-else class="space-y-6">
      <!-- список товарів -->
      <div class="space-y-3">
        <div
          v-for="item in cart.items"
          :key="item.product_id"
          class="flex items-center gap-4 border rounded-xl p-3"
        >
          <img
            :src="getImage(item.image_url)"
            class="w-16 h-16 object-cover rounded-lg border"
          />

          <div class="flex-1">
            <div class="text-sm font-medium">{{ item.name }}</div>
            <div class="text-xs text-slate-500">
              {{ item.weight_grams }} г
            </div>
          </div>

          <div class="text-sm">
            {{ item.qty }} × ₴{{ item.price.toFixed(2) }}
          </div>

          <div class="text-sm font-semibold">
            ₴{{ (item.price * item.qty).toFixed(2) }}
          </div>
        </div>
      </div>

      <!-- підсумок -->
      <div class="border-t pt-4 space-y-2">
        <div class="flex justify-between text-sm">
          <span>Кількість позицій:</span>
          <span>{{ cart.items.length }}</span>
        </div>

        <div class="flex justify-between text-lg font-semibold">
          <span>До оплати:</span>
          <span>₴{{ total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- кнопка -->
      <button
        class="rounded-full bg-amber-500 text-white px-5 py-2 text-sm hover:bg-amber-600"
        @click="submitOrder"
      >
        Підтвердити замовлення
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cart, clearCart, total } = useCart()
const { isExternalUrl } = useStorageImages()

const getImage = (url: string | null) => {
  if (!url) return ''
  if (isExternalUrl(url)) return url
  return '/images/' + url
}

const submitOrder = () => {
  alert('Замовлення оформлено (demo)')
  clearCart()
  navigateTo('/')
}
</script>
