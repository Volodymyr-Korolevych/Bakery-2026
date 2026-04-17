<template>
  <footer class="border-t border-border bg-card">
    <div class="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <span class="text-sm text-textSecondary">© {{ year }} {{ siteName }}</span>
      <span class="text-sm text-textSecondary">Дипломний проєкт Bakery-2026</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = config.public.siteName
const year = new Date().getFullYear()
</script>
