<script setup lang="ts">
import { contacts } from '~/data/resume'
</script>

<template>
  <div class="contact-methods">
    <a
      v-for="item in contacts"
      :key="item.label"
      class="contact-methods__card"
      :href="item.href"
      :target="item.external ? '_blank' : undefined"
      :rel="item.external ? 'noopener noreferrer' : undefined"
    >
      <span class="contact-methods__label">{{ item.label }}</span>
      <span class="contact-methods__value">{{ item.value }}</span>
    </a>
  </div>
</template>

<style scoped>
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.contact-methods__card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.contact-methods__card:hover,
.contact-methods__card:focus-visible {
  border-color: var(--color-border-strong);
  background: var(--color-bg-elevated);
}

.contact-methods__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.contact-methods__value {
  font-size: 0.9375rem;
  color: var(--color-text);
  overflow-wrap: anywhere;
}
</style>
