<template>
    <footer class="border-t bg-white text-xs text-slate-500">
        <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between">
            <span>© {{ year }} {{ siteName }}</span>
            <span>Дипломний проєкт Bakery-2026</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteName = config.public.siteName
const year = new Date().getFullYear()
</script>
