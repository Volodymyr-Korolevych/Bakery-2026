<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
    <header class="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
      <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold tracking-tight">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold">
            B
          </span>
          <span>{{ siteName }}</span>
        </NuxtLink>
        <nav class="flex items-center gap-4 text-sm">
          <NuxtLink to="/categories" class="hover:text-amber-600">Категорії</NuxtLink>
          <NuxtLink to="/account" class="hover:text-amber-600">Обліковий запис</NuxtLink>
          <NuxtLink to="/cart" class="relative hover:text-amber-600">
            Кошик
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t bg-white text-xs text-slate-500">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between">
        <span>© {{ new Date().getFullYear() }} {{ siteName }}</span>
        <span>Дипломний проєкт Bakery-2026</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = config.public.siteName
</script>
