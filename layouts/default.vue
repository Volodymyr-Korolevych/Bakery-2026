<template>
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <AppHeader />

        <main class="flex-1">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>
