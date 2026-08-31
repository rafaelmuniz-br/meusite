<script setup lang="ts">
import { useContent } from '~/composables/useContent'
import { useT } from '~/composables/useT'

const c = useContent()
const t = useT()

useSeoMeta({
  title: () => t('seo.policiesTitle'),
  description: () => t('seo.policiesDesc'),
})
</script>

<template>
  <div class="policies-page">
    <div class="policies-page__inner">
      <div class="policies-page__topbar">
        <NuxtLink class="policies-page__back" to="/">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ t('policies.back') }}
        </NuxtLink>
        <LanguageToggle />
      </div>

      <header class="policies-page__header">
        <h1>{{ t('policies.title') }}</h1>
        <p>{{ t('policies.intro') }}</p>
        <p class="policies-page__updated">{{ t('policies.updated', { date: c.policies.lastUpdated }) }}</p>
      </header>

      <PolicyAccordion />
    </div>
  </div>
</template>

<style scoped>
.policies-page {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 3.5rem 3.5rem 5rem;
  display: flex;
  justify-content: center;
}

.policies-page__inner {
  width: 100%;
  max-width: 720px;
}

.policies-page__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.policies-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.policies-page__back:hover,
.policies-page__back:focus-visible {
  color: var(--color-text);
}

.policies-page__header {
  margin-bottom: 2.5rem;
}

.policies-page__header h1 {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.policies-page__header p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 62ch;
}

.policies-page__updated {
  margin-top: 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

@media (max-width: 900px) {
  .policies-page {
    padding: 2.75rem 1.5rem 4rem;
  }
}

@media (max-width: 480px) {
  .policies-page {
    padding: 2.25rem 1.25rem 3.5rem;
  }

  .policies-page__header h1 {
    font-size: 1.6rem;
  }
}
</style>
