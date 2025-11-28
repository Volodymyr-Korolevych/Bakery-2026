// Nuxt 3 config for Bakery-2026
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/tailwind.css'],
    // FIX: переносимо PostCSS-конфігурацію сюди, як радить Nuxt
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    // not exposed to client
    
    public: {
      adminEmails: process.env.NUXT_ADMIN_EMAILS || '',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Bakery-2026'
    }
  },
  typescript: {
    strict: false
  },
  compatibilityDate: '2025-11-28'
})
