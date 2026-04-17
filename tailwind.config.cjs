/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f5f7fa',
        card: '#ffffff',
        primary: '#f59e0b',
        primaryHover: '#d97706',
        textMain: '#111827',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      }
    }
  },
  plugins: []
}
