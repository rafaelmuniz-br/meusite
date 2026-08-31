<script setup lang="ts">
import { useT } from '~/composables/useT'

definePageMeta({ layout: 'resume' })

const t = useT()

useSeoMeta({
  title: () => t('seo.experienciaTitle'),
  description: () => t('seo.experienciaDesc'),
})
</script>

<template>
  <ExperienceSection />
  <SkillsSection />
</template>
