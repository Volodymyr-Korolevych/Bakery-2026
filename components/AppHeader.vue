<template>
  <header class="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
    <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-semibold tracking-tight"
      >
        <span
          class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold"
        >
          B
        </span>
        <span>{{ siteName }}</span>
      </NuxtLink>

      <nav class="flex items-center gap-4 text-sm">
        <NuxtLink to="/categories" class="hover:text-amber-600">
          Категорії
        </NuxtLink>

        <NuxtLink v-if="!isUserAdmin"  to="/account" class="hover:text-amber-600">
          Особистий кабінет
        </NuxtLink>

        <NuxtLink to="/cart" class="relative inline-flex items-center gap-1 hover:text-amber-600">
          <span>Кошик</span>
          <span
            v-if="distinctItemsCount > 0"
            class="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[11px] font-medium text-white"
          >
            {{ distinctItemsCount }}
          </span>
        </NuxtLink>

        <NuxtLink
          v-if="isUserAdmin"
          to="/admin"
          class="inline-flex items-center rounded-full border border-amber-500 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50"
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
