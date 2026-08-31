<script setup lang="ts">
import { useT } from '~/composables/useT'

definePageMeta({ layout: 'resume' })

const t = useT()

useSeoMeta({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDesc'),
})
</script>

<template>
  <ProfessionalSummary />
  <ContactCta />
  <PortfolioSection />
</template>
