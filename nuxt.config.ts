// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  // Usado só pelo ColorPicker (etapa "Identidade e conteúdo" do formulário de
  // solicitação de projeto) — não adotar o design system do Nuxt UI no resto
  // do site, que continua com CSS próprio.
  ui: {
    fonts: false,
    colorMode: false,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Rafael Muniz — Desenvolvedor Fullstack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Currículo profissional de Rafael Muniz, Desenvolvedor Fullstack com experiência em Vue.js, Nuxt, JavaScript, SQL e desenvolvimento web.',
        },
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: 'Rafael Muniz — Desenvolvedor Fullstack' },
        {
          property: 'og:description',
          content:
            'Currículo profissional de Rafael Muniz, Desenvolvedor Fullstack com experiência em Vue.js, Nuxt, JavaScript, SQL e desenvolvimento web.',
        },
        { property: 'og:locale', content: 'pt_BR' },
        // Caminho relativo por enquanto — troque por uma URL absoluta
        // (https://seu-dominio/og-image.png) assim que o site for publicado,
        // pois o WhatsApp exige URL absoluta para exibir a prévia.
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Rafael Muniz' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og-image.png' },
        { name: 'theme-color', content: '#090909' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      routes: ['/', '/contato', '/experiencia', '/politicas-e-termos'],
    },
  },
})
