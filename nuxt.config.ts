// Nuxt 3 config for Bakery-2026
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  css: ['@/assets/css/tailwind.css'],

  // PostCSS-конфігурація без окремого postcss.config.cjs
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Bakery-2026',
      // Список email-ів адміністраторів доступний на клієнті
      adminEmails: process.env.NUXT_ADMIN_EMAILS || ''
    }
  },

  typescript: {
    strict: false
  }
})
