<script setup lang="ts">
withDefaults(
  defineProps<{
    period: string
    duration?: string
    role: string
    company?: string
    summary: string
    highlights?: string[]
  }>(),
  { duration: '', company: '', highlights: () => [] }
)
</script>

<template>
  <article class="experience-item">
    <div class="experience-item__period">
      <span>{{ period }}</span>
      <span v-if="duration" class="experience-item__duration">{{ duration }}</span>
    </div>

    <div class="experience-item__body">
      <h3 class="experience-item__title">
        <span>{{ role }}</span
        ><template v-if="company"><span class="experience-item__dash">&nbsp;—&nbsp;</span>{{ company }}</template>
      </h3>
      <p class="experience-item__summary">{{ summary }}</p>

      <details v-if="highlights.length" class="experience-item__details">
        <summary>
          <span>Atividades e resultados</span>
          <svg
            class="experience-item__chevron"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </summary>
        <ul class="experience-item__list">
          <li v-for="(item, i) in highlights" :key="i">{{ item }}</li>
        </ul>
      </details>
    </div>
  </article>
</template>

<style scoped>
.experience-item {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 2rem;
  padding: 1.75rem 0;
  border-top: 1px solid var(--color-border);
}

.experience-item:first-child {
  border-top: 1px solid var(--color-border);
}

.experience-item__period {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  padding-top: 0.15rem;
}

.experience-item__duration {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  opacity: 0.75;
}

.experience-item__title {
  font-size: 1.0625rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.experience-item__dash {
  color: var(--color-text-tertiary);
  font-weight: 400;
}

.experience-item__summary {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 60ch;
}

.experience-item__details {
  margin-top: 0.9rem;
  max-width: 62ch;
}

.experience-item__details summary {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  list-style: none;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-text-tertiary);
  transition: color 0.2s ease;
}

.experience-item__details summary::-webkit-details-marker {
  display: none;
}

.experience-item__details summary:hover,
.experience-item__details summary:focus-visible {
  color: var(--color-text-secondary);
}

.experience-item__chevron {
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.experience-item__details[open] .experience-item__chevron {
  transform: rotate(180deg);
}

.experience-item__list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: 0.9rem 0 0;
  padding-left: 1.1rem;
  list-style: disc;
}

.experience-item__list li {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.experience-item__list li::marker {
  color: var(--color-text-tertiary);
}

@media (prefers-reduced-motion: no-preference) {
  .experience-item__details[open] .experience-item__list {
    animation: experience-reveal 0.3s ease both;
  }
}

@keyframes experience-reveal {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .experience-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1.5rem 0;
  }

  .experience-item__period {
    flex-direction: row;
    gap: 0.5rem;
    align-items: baseline;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
}
</style>
