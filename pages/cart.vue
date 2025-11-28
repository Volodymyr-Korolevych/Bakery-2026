<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <h1 class="text-2xl font-semibold tracking-tight mb-2">Кошик</h1>
    <div v-if="!cart.items.length" class="text-sm text-slate-600">
      Кошик порожній. Додайте товари з каталогу.
    </div>
    <div v-else class="grid gap-6 md:grid-cols-[2fr,1fr] items-start">
      <div class="space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.product_id"
          class="flex items-center justify_between rounded-2xl border bg-white px-4 py-3 shadow-sm"
        >
          <div>
            <div class="font-medium">{{ item.name }}</div>
            <div class="text-xs text-slate-500" v-if="item.weight_grams">
              {{ item.weight_grams }} г
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <div class="flex items-center border rounded-full overflow-hidden">
              <button class="px-2" @click="dec(item.product_id)">-</button>
              <span class="px-3 border-l border-r">{{ item.qty }}</span>
              <button class="px-2" @click="inc(item.product_id)">+</button>
            </div>
            <div class="w-20 text-right">
              ₴{{ (item.price * item.qty).toFixed(2) }}
            </div>
            <button class="text-xs text-red-600" @click="removeItem(item.product_id)">Прибрати</button>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border bg-white p-4 shadow-sm space-y-3 text-sm">
        <div class="flex justify-between">
          <span>Сума замовлення</span>
          <span class="font-semibold text-amber-700">₴{{ total.toFixed(2) }}</span>
        </div>
        <NuxtLink
          to="/checkout"
          class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          Оформити замовлення
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cart, total, updateQty, removeItem } = useCart()

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
