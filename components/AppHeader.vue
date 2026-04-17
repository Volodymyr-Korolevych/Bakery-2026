<template>
  <header
    class="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
    <div class="max-w-6xl mx-auto px-6">
      <div class="h-[76px] flex items-center justify-between gap-6">
        <NuxtLink to="/" class="flex items-center gap-3 font-semibold tracking-tight text-textMain shrink-0">
          <span
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold shadow-sm">
            B
          </span>
          <span class="text-[18px] leading-none">{{ siteName }}</span>
        </NuxtLink>

        <nav class="flex items-center gap-7 text-[15px] font-medium">
          <NuxtLink to="/categories" class="text-textMain hover:text-primary transition-colors"
            active-class="text-primary">
            Категорії
          </NuxtLink>

          <NuxtLink v-if="!isUserAdmin" to="/account" class="text-textMain hover:text-primary transition-colors"
            active-class="text-primary">
            Особистий кабінет
          </NuxtLink>

          <NuxtLink to="/cart"
            class="relative inline-flex items-center gap-2 text-textMain hover:text-primary transition-colors"
            active-class="text-primary">
            <span>Кошик</span>
            <span v-if="distinctItemsCount > 0"
              class="inline-flex min-w-[20px] h-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold leading-none text-white shadow-sm">
              {{ distinctItemsCount }}
            </span>
          </NuxtLink>

          <NuxtLink v-if="isUserAdmin" to="/admin"
            class="inline-flex items-center rounded-full border border-primary/50 px-3.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
            active-class="bg-primary/10">
            Адмін
          </NuxtLink>
        </nav>
      </div>
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