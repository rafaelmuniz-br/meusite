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
      // lang / title / description / og:title / og:description / og:locale são
      // definidos reativamente em app.vue (useHead) pra acompanhar o idioma.
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Rafael Muniz — Desenvolvedor Fullstack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:type', content: 'profile' },
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
    // O Netlify força o preset "netlify-static"; fixamos "static" pra buildar
    // igual ao ambiente local (que funciona) e servir .output/public como
    // site estático puro.
    preset: 'static',
    prerender: {
      routes: ['/', '/contato', '/experiencia', '/politicas-e-termos'],
      // 1 rota por vez — reduz pico de memória no builder do Netlify.
      concurrency: 1,
      // Se uma rota falhar no ambiente do Netlify, não aborta o generate
      // inteiro: .output/public ainda é gerado e o erro aparece no log.
      failOnError: false,
    },
  },
})
