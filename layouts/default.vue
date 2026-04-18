<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f7fa] to-[#eef2f7] text-textMain">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

