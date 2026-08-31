<script setup lang="ts">
import { useT } from '~/composables/useT'

const t = useT()
</script>

<template>
  <div class="prm-onboarding">
    <h1 class="prm-onboarding__title">{{ t('prm.onboardingTitle') }}</h1>
    <!-- p1 traz um <strong> — string controlada no dicionário (ui.ts) -->
    <p v-html="t('prm.onboardingP1')" />
    <p>{{ t('prm.onboardingP2') }}</p>
    <p>{{ t('prm.onboardingP3') }}</p>
  </div>
</template>

<style scoped>
.prm-onboarding {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.prm-onboarding__title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.25rem;
}

.prm-onboarding p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 52ch;
}
</style>
