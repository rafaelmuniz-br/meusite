<script setup lang="ts">
import { useT } from '~/composables/useT'
import { useLocale } from '~/composables/useLocale'

const t = useT()
const { locale } = useLocale()

// Head reativo ao idioma. O HTML pré-renderado sai em PT (fallback do `t`);
// no cliente, trocar o idioma re-renderiza título / descrição / og.
useHead(() => ({
  htmlAttrs: { lang: locale.value === 'en' ? 'en' : 'pt-BR' },
  title: t('seo.homeTitle'),
  meta: [
    { name: 'description', content: t('seo.homeDesc') },
    { property: 'og:title', content: t('seo.homeTitle') },
    { property: 'og:description', content: t('seo.homeDesc') },
    { property: 'og:locale', content: t('seo.ogLocale') },
  ],
}))
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <SignaturePreloader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
