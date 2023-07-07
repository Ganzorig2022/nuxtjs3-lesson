// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      firebase_url: process.env.FIRESTORE_DATABASE_URL, // .env
      firebase_api_key: process.env.FIREBASE_AUTH_API_KEY // .env
    }
  },

  css: ['@/assets/styles/main.css'],

  modules: [
    '@pinia/nuxt', // global Pinia store
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' } // animation
  },

  plugins:['~/plugins/dateFilter.js'], // helper function
  
})
