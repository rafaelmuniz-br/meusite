<script setup lang="ts">
import { policySections } from '~/data/policies'
</script>

<template>
  <div class="policy-accordion">
    <details v-for="(section, index) in policySections" :key="section.id" :id="section.id" :open="index === 0">
      <summary>
        <span class="policy-accordion__title">{{ section.title }}</span>
        <svg
          class="policy-accordion__chevron"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </summary>
      <div class="policy-accordion__body">
        <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p>
      </div>
    </details>
  </div>
</template>

<style scoped>
.policy-accordion {
  border-top: 1px solid var(--color-border);
}

details {
  border-bottom: 1px solid var(--color-border);
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 0;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary:focus-visible {
  outline: 1px solid var(--color-border-strong);
  outline-offset: 4px;
}

.policy-accordion__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

.policy-accordion__chevron {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
  transition: transform 0.25s ease;
}

details[open] .policy-accordion__chevron {
  transform: rotate(180deg);
}

.policy-accordion__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0 1.75rem;
  max-width: 68ch;
}

.policy-accordion__body p {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

@media (prefers-reduced-motion: no-preference) {
  details summary {
    transition: color 0.2s ease;
  }
}
</style>
