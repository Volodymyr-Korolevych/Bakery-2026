<template>
  <div class="max-w-4xl mx-auto px-4 py-10 space-y-10">
    <section class="space-y-4">
      <h1 class="text-3xl font-semibold tracking-tight">Про пекарню</h1>
      <p class="text-base leading-7 text-slate-700 max-w-2xl">
        Ми робимо випічку щодня і не у великих об’ємах.
        Нам важливо, щоб вона була свіжою — не «на склад», а на сьогодні.
      </p>
    </section>

    <section class="grid gap-6 md:grid-cols-3">
      <div class="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <h2 class="text-lg font-semibold">Інгредієнти</h2>
        <p class="text-sm leading-6 text-slate-700">
          Ми використовуємо звичайні, зрозумілі інгредієнти хорошої якості.
          Без штучних добавок, ароматизаторів і зайвої «хімії».
        </p>
        <p class="text-sm leading-6 text-slate-700">
          Те, що можна зробити простіше — ми не ускладнюємо.
        </p>
      </div>

      <div class="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <h2 class="text-lg font-semibold">Як ми працюємо</h2>
        <p class="text-sm leading-6 text-slate-700">
          Печемо невеликими партіями.
          Тому щось може закінчитися раніше, але це означає, що воно не лежить довго.
        </p>
        <p class="text-sm leading-6 text-slate-700">
          Ми не прагнемо до однаковості в кожній деталі — важливіше,
          щоб випічка була живою і смачною.
        </p>
      </div>

      <div class="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
        <h2 class="text-lg font-semibold">Самовивіз</h2>
        <p class="text-sm leading-6 text-slate-700">
          Замовлення можна забрати в одній із точок самовивозу.
          Ви обираєте її під час оформлення.
        </p>
        <p class="text-sm leading-6 text-slate-700">
          Це швидше і простіше, ніж чекати або стояти в черзі.
        </p>
      </div>
    </section>

    <section class="rounded-2xl border bg-amber-50 p-6">
      <p class="text-base leading-7 text-slate-800">
        Ми робимо випічку так, як самі хотіли б її купувати.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Про пекарню'
})
</script>
