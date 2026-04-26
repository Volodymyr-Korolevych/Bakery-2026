<template>
  <div class="max-w-6xl mx-auto px-6 py-10 md:py-12 space-y-8">
    <h1 class="page-title">Кошик</h1>

    <div v-if="!cart.items.length" class="content-card text-sm text-slate-600">
      Кошик порожній. Додайте товари з каталогу.
    </div>

    <div v-else class="grid gap-6 md:grid-cols-[2fr,1fr] items-start">
      <div class="space-y-5">
        <div v-for="item in cart.items" :key="item.product_id" class="content-card flex items-center gap-5">
          <img :src="getImage(item.image_url)" :alt="item.name"
            class="h-24 w-24 rounded-xl border border-border object-cover bg-slate-100 shrink-0" />

          <div class="flex-1 min-w-0">
            <div class="text-xl font-semibold leading-tight text-textMain">
              {{ item.name }}
            </div>
            <div class="mt-1 text-sm text-slate-500" v-if="item.weight_grams">
              {{ item.weight_grams }} г
            </div>
          </div>

          <div class="flex items-center gap-5 text-sm shrink-0">
            <div class="qty-control">
              <button class="qty-btn" @click="dec(item.product_id)">-</button>
              <span class="qty-value">{{ item.qty }}</span>
              <button class="qty-btn" @click="inc(item.product_id)">+</button>
            </div>

            <div class="w-24 text-right text-lg font-semibold text-textMain">
              ₴{{ (item.price * item.qty).toFixed(2) }}
            </div>

            <button class="text-sm font-medium text-red-600 transition hover:text-red-700"
              @click="removeItem(item.product_id)">
              Вилучити
            </button>
          </div>
        </div>
      </div>

      <div class="summary-card space-y-6">
        <div class="space-y-3">
          <div class="flex justify-between text-base text-gray-700">
            <span>Кількість позицій</span>
            <span>{{ cart.items.length }}</span>
          </div>

          <div class="flex justify-between text-xl">
            <span class="font-medium text-textMain">Сума замовлення</span>
            <span class="font-semibold text-xl text-amber-700">
              ₴{{ total.toFixed(2) }}
            </span>
          </div>
        </div>

        <NuxtLink to="/checkout" class="btn-primary w-full">
          Оформити замовлення
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cart, total, updateQty, removeItem } = useCart()
const { isExternalUrl } = useStorageImages()

const getImage = (url: string | null) => {
  if (!url) return ''
  if (isExternalUrl(url)) return url
  return '/images/' + url
}

const inc = (id: number) => {
  const item = cart.value.items.find((i) => i.product_id === id)
  if (!item) return
  updateQty(id, item.qty + 1)
}

const dec = (id: number) => {
  const item = cart.value.items.find((i) => i.product_id === id)
  if (!item) return
  updateQty(id, item.qty - 1)
}
</script>
