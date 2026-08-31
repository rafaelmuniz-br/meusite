<script setup lang="ts">
import { inject } from 'vue'
import { useContent } from '~/composables/useContent'
import { useT } from '~/composables/useT'

const content = useContent()
const t = useT()

const ctx = inject('projectRequest') as { form: { answers: Record<string, unknown> } }
if (!Array.isArray(ctx.form.answers.tiktokTools)) ctx.form.answers.tiktokTools = []
const selected = ctx.form.answers.tiktokTools as string[]

function toggle(id: string) {
  const i = selected.indexOf(id)
  if (i === -1) selected.push(id)
  else selected.splice(i, 1)
}
</script>

<template>
  <div class="prm-tiktok">
    <p class="prm-tiktok__intro">{{ t('prm.tiktokServicesIntro') }}</p>

    <div class="prm-tiktok__grid" data-prm-shake="tiktokTools">
      <button
        v-for="option in content.form.tiktokServices"
        :key="option.id"
        type="button"
        class="prm-tiktok-card"
        :class="{ 'is-selected': selected.includes(option.id) }"
        :aria-pressed="selected.includes(option.id)"
        @click="toggle(option.id)"
      >
        <span class="prm-tiktok-card__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="prm-tiktok-card__text">
          <span class="prm-tiktok-card__label">{{ option.label }}</span>
          <span class="prm-tiktok-card__description">{{ option.description }}</span>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.prm-tiktok {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.prm-tiktok__intro {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.prm-tiktok__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
}

.prm-tiktok-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem 1.15rem;
  background: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.12s ease;
}

.prm-tiktok-card:hover,
.prm-tiktok-card:focus-visible {
  border-color: var(--color-border-strong);
  background: var(--color-bg-elevated);
}

.prm-tiktok-card:active {
  transform: scale(0.99);
}

.prm-tiktok-card.is-selected {
  border-color: var(--color-text);
  background: var(--color-bg-elevated);
}

.prm-tiktok-card__check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 0.1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.prm-tiktok-card.is-selected .prm-tiktok-card__check {
  background: var(--color-text);
  border-color: var(--color-text);
  color: var(--color-bg);
  animation: prm-pop 0.24s ease;
}

.prm-tiktok-card__text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.prm-tiktok-card__label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.prm-tiktok-card__description {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
</style>
