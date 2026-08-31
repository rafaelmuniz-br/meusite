<script setup lang="ts">
import { contacts } from '~/data/resume'
import { useT } from '~/composables/useT'

const t = useT()
</script>

<template>
  <ul class="contact-info">
    <li v-for="item in contacts" :key="item.labelKey" class="contact-info__row">
      <span class="contact-info__label">{{ t(item.labelKey) }}</span>
      <a
        class="contact-info__value"
        :href="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
      >
        {{ item.value }}
      </a>
    </li>
  </ul>
</template>

<style scoped>
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  text-align: left;
}

.contact-info__row {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  font-size: 0.875rem;
}

.contact-info__label {
  color: var(--color-text-tertiary);
  min-width: 3.75rem;
  flex-shrink: 0;
}

.contact-info__value {
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
  overflow-wrap: anywhere;
}

.contact-info__value:hover,
.contact-info__value:focus-visible {
  color: var(--color-text);
}
</style>
