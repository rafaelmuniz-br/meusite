<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'
import { useT } from '~/composables/useT'

const { locale, setLocale, LOCALES } = useLocale()
const t = useT()

const LABELS: Record<string, string> = { pt: 'PT', en: 'EN' }
</script>

<template>
  <div class="lang-toggle" role="group" :aria-label="t('lang.aria')">
    <button
      v-for="code in LOCALES"
      :key="code"
      type="button"
      class="lang-toggle__btn"
      :class="{ 'is-active': locale === code }"
      :aria-pressed="locale === code"
      @click="setLocale(code)"
    >
      {{ LABELS[code] }}
    </button>
  </div>
</template>

<style scoped>
.lang-toggle {
  display: inline-flex;
  gap: 0.3rem;
}

.lang-toggle__btn {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.2rem 0.55rem;
  background: transparent;
  color: var(--color-text-tertiary);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.lang-toggle__btn:hover,
.lang-toggle__btn:focus-visible {
  color: var(--color-text-secondary);
  border-color: var(--color-border-strong);
}

.lang-toggle__btn.is-active {
  border-color: var(--color-text);
  background: var(--color-text);
  color: var(--color-bg);
}
</style>
