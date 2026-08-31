<script setup lang="ts">
import { computed, inject } from 'vue'
import { useT } from '~/composables/useT'

const props = defineProps<{ label?: string }>()

const t = useT()
const label = computed(() => props.label || t('prm.logoDefaultLabel'))

const ctx = inject('projectRequest') as {
  form: { answers: Record<string, unknown> }
}
const answers = ctx.form.answers as { hasLogo?: boolean; logoIdea?: string }
</script>

<template>
  <div class="prm-field">
    <span class="prm-field__label">{{ label }}</span>
    <div class="prm-toggle" data-prm-shake="hasLogo">
      <button
        type="button"
        class="prm-toggle__btn"
        :class="{ 'is-active': answers.hasLogo === true }"
        @click="answers.hasLogo = true"
      >
        {{ t('prm.logoYes') }}
      </button>
      <button
        type="button"
        class="prm-toggle__btn"
        :class="{ 'is-active': answers.hasLogo === false }"
        @click="answers.hasLogo = false"
      >
        {{ t('prm.logoNo') }}
      </button>
    </div>

    <div v-if="answers.hasLogo === true" class="prm-reveal">
      <span class="prm-field__hint">{{ t('prm.logoHaveHint') }}</span>
    </div>

    <div v-else-if="answers.hasLogo === false" class="prm-reveal prm-logo-idea">
      <label for="prm-logo-idea">
        {{ t('prm.logoIdeaLabel') }} <span class="prm-optional">{{ t('prm.optional') }}</span>
      </label>
      <textarea
        id="prm-logo-idea"
        v-model="answers.logoIdea"
        rows="2"
        :placeholder="t('prm.logoIdeaPlaceholder')"
      />
    </div>
  </div>
</template>

<style scoped>
.prm-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prm-field__label,
.prm-logo-idea label {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
}

.prm-field__hint {
  font-size: 0.78rem;
  color: var(--color-text-tertiary);
}

.prm-optional {
  color: var(--color-text-tertiary);
  font-weight: 400;
}

.prm-logo-idea {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.prm-logo-idea textarea {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9375rem;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.prm-logo-idea textarea:focus {
  outline: none;
  border-color: var(--color-border-strong);
}

.prm-toggle {
  display: flex;
  gap: 0.6rem;
}

.prm-toggle__btn {
  flex: 1;
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  padding: 0.65rem;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

.prm-toggle__btn:hover {
  border-color: var(--color-text);
}

.prm-toggle__btn.is-active {
  border-color: var(--color-text);
  background: var(--color-text);
  color: var(--color-bg);
}
</style>
