export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    baseURL: '/YoYo/',
    head: {
      title: 'YoYo House',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/jpg', href: '/logo.jpg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/global.css'],
  modules: ['@nuxt/image'],

  nitro: {
    preset: 'github_pages'
  },


  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY
    }
  }
})