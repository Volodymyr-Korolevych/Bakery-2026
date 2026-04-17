<template>
  <header class="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 font-semibold tracking-tight text-textMain"
      >
        <span
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold shadow-sm"
        >
          B
        </span>
        <span class="text-lg">{{ siteName }}</span>
      </NuxtLink>

      <nav class="flex items-center gap-6 text-sm">
        <NuxtLink to="/categories" class="text-textSecondary hover:text-textMain transition">
          Категорії
        </NuxtLink>

        <NuxtLink v-if="!isUserAdmin" to="/account" class="text-textSecondary hover:text-textMain transition">
          Особистий кабінет
        </NuxtLink>

        <NuxtLink to="/cart" class="relative inline-flex items-center gap-2 text-textSecondary hover:text-textMain transition">
          <span>Кошик</span>
          <span
            v-if="distinctItemsCount > 0"
            class="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-white"
          >
            {{ distinctItemsCount }}
          </span>
        </NuxtLink>

        <NuxtLink
          v-if="isUserAdmin"
          to="/admin"
          class="border border-border text-textMain px-5 py-2.5 rounded-lg hover:bg-gray-100 transition text-sm"
        >
          Адмін
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = config.public.siteName

const { loadUser, isUserAdmin } = useAuthUser()
const { distinctItemsCount } = useCart()

onMounted(async () => {
  await loadUser()
})
</script>
