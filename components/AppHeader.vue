<template>
  <header
    class="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
    <div class="max-w-6xl mx-auto px-6">
      <div class="h-[76px] flex items-center justify-between gap-6">
        <NuxtLink to="/" class="flex items-center gap-3 font-semibold tracking-tight text-textMain shrink-0">
         <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-sm"
            aria-hidden="true">
           <svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20V6" stroke="#7C3A00" stroke-width="1.8" stroke-linecap="round" />

              <path d="M12 8.2C9.7 8.2 7.7 6.9 6.8 4.8C9.4 4.7 11.3 5.8 12 8.2Z" fill="#FFF7D6" stroke="#7C3A00"
                stroke-width="0.9" />
              <path d="M12 11.4C9.3 11.4 7.1 10 6 7.7C8.9 7.5 11.1 8.8 12 11.4Z" fill="#FFE8A3" stroke="#7C3A00"
                stroke-width="0.9" />
              <path d="M12 14.8C9.3 14.8 7.1 13.4 6 11.1C8.9 10.9 11.1 12.2 12 14.8Z" fill="#FFF7D6" stroke="#7C3A00"
                stroke-width="0.9" />

              <path d="M12 8.2C14.3 8.2 16.3 6.9 17.2 4.8C14.6 4.7 12.7 5.8 12 8.2Z" fill="#FFF7D6" stroke="#7C3A00"
                stroke-width="0.9" />
              <path d="M12 11.4C14.7 11.4 16.9 10 18 7.7C15.1 7.5 12.9 8.8 12 11.4Z" fill="#FFE8A3" stroke="#7C3A00"
                stroke-width="0.9" />
              <path d="M12 14.8C14.7 14.8 16.9 13.4 18 11.1C15.1 10.9 12.9 12.2 12 14.8Z" fill="#FFF7D6"
                stroke="#7C3A00" stroke-width="0.9" />
            </svg>
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