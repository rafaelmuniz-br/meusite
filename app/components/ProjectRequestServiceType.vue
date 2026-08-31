<script setup lang="ts">
import { inject } from 'vue'
import { useContent } from '~/composables/useContent'

const content = useContent()
const ctx = inject('projectRequest') as { form: { serviceType: string }; goNext: () => void }

function select(id: string) {
  ctx.form.serviceType = id
  ctx.goNext()
}
</script>

<template>
  <div class="prm-service-grid">
    <button
      v-for="option in content.form.serviceTypes"
      :key="option.id"
      type="button"
      class="prm-service-card"
      :class="{ 'is-selected': ctx.form.serviceType === option.id }"
      @click="select(option.id)"
    >
      <span class="prm-service-card__label">{{ option.label }}</span>
      <span class="prm-service-card__description">{{ option.description }}</span>
    </button>
  </div>
</template>

<style scoped>
.prm-service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
}

.prm-service-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem 1.4rem;
  background: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.14s ease;
}

.prm-service-card:hover,
.prm-service-card:focus-visible {
  border-color: var(--color-border-strong);
  background: var(--color-bg-elevated);
}

.prm-service-card:active {
  transform: scale(0.985);
}

.prm-service-card.is-selected {
  border-color: var(--color-text);
  background: var(--color-bg-elevated);
}

.prm-service-card__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.prm-service-card__description {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
</style>
