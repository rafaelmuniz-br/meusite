<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Step } from '~/data/projectRequest'

const props = defineProps<{ step: Step; askedEarlier: Set<string> }>()

const ctx = inject('projectRequest') as { form: { answers: Record<string, unknown> } }
const answers = ctx.form.answers as Record<string, string | string[] | boolean | undefined>

const visible = computed(() => props.step.questions.filter((q) => !props.askedEarlier.has(q.key)))

function arr(key: string): string[] {
  if (!Array.isArray(answers[key])) answers[key] = []
  return answers[key] as string[]
}
function toggleTag(key: string, opt: string) {
  const list = arr(key)
  const i = list.indexOf(opt)
  if (i === -1) list.push(opt)
  else list.splice(i, 1)
}
function isOn(key: string, opt: string) {
  return Array.isArray(answers[key]) && (answers[key] as string[]).includes(opt)
}
</script>

<template>
  <div class="prm-fields">
    <p v-if="step.intro" class="prm-step-intro">{{ step.intro }}</p>

    <template v-for="q in visible" :key="q.key">
      <!-- text -->
      <div v-if="q.type === 'text'" class="prm-field">
        <label :for="'prm-q-' + q.key">
          {{ q.label }}<span v-if="!q.required" class="prm-opt"> (opcional)</span>
        </label>
        <span v-if="q.help" class="prm-help">{{ q.help }}</span>
        <input :id="'prm-q-' + q.key" v-model="answers[q.key]" type="text" :placeholder="q.placeholder" />
      </div>

      <!-- textarea -->
      <div v-else-if="q.type === 'textarea'" class="prm-field">
        <label :for="'prm-q-' + q.key">
          {{ q.label }}<span v-if="!q.required" class="prm-opt"> (opcional)</span>
        </label>
        <span v-if="q.help" class="prm-help">{{ q.help }}</span>
        <textarea
          :id="'prm-q-' + q.key"
          v-model="answers[q.key]"
          :rows="q.rows || 3"
          :placeholder="q.placeholder"
        />
      </div>

      <!-- toggle (+ reveal) -->
      <div v-else-if="q.type === 'toggle'" class="prm-field">
        <span class="prm-field__label">{{ q.label }}</span>
        <div class="prm-toggle" :data-prm-shake="q.key">
          <button
            type="button"
            class="prm-toggle__btn"
            :class="{ 'is-active': answers[q.key] === true }"
            @click="answers[q.key] = true"
          >
            {{ q.toggleLabels ? q.toggleLabels[0] : 'Sim' }}
          </button>
          <button
            type="button"
            class="prm-toggle__btn"
            :class="{ 'is-active': answers[q.key] === false }"
            @click="answers[q.key] = false"
          >
            {{ q.toggleLabels ? q.toggleLabels[1] : 'Não' }}
          </button>
        </div>
        <div v-if="q.reveal && answers[q.key] === true" class="prm-reveal">
          <div class="prm-field">
            <label :for="'prm-q-' + q.reveal.key">{{ q.reveal.label }}</label>
            <textarea
              v-if="q.reveal.type === 'textarea'"
              :id="'prm-q-' + q.reveal.key"
              v-model="answers[q.reveal.key]"
              :rows="q.reveal.rows || 2"
              :placeholder="q.reveal.placeholder"
            />
            <input
              v-else
              :id="'prm-q-' + q.reveal.key"
              v-model="answers[q.reveal.key]"
              type="text"
              :placeholder="q.reveal.placeholder"
            />
          </div>
        </div>
      </div>

      <!-- tags -->
      <div v-else-if="q.type === 'tags'" class="prm-field">
        <span class="prm-field__label">
          {{ q.label }}<span class="prm-opt"> (marque quantas quiser)</span>
        </span>
        <span v-if="q.help" class="prm-help">{{ q.help }}</span>
        <div class="prm-tags" :data-prm-shake="q.key">
          <button
            v-for="opt in q.options"
            :key="opt"
            type="button"
            class="prm-tag"
            :class="{ 'is-on': isOn(q.key, opt) }"
            :aria-pressed="isOn(q.key, opt)"
            @click="toggleTag(q.key, opt)"
          >
            {{ opt }}
          </button>
        </div>
        <input
          v-model="answers[q.key + '__outro']"
          type="text"
          class="prm-tags__outro"
          placeholder="outro (descreva)"
        />
      </div>

      <!-- color -->
      <div v-else-if="q.type === 'color'" class="prm-field">
        <span class="prm-field__label">{{ q.label }} <span class="prm-opt">(opcional)</span></span>
        <ProjectRequestColorSwatches :field="q.key" />
        <input
          v-model="answers.colorsNote"
          type="text"
          class="prm-colors-extra"
          placeholder="ou descreva outra cor / observação"
        />
      </div>

      <!-- logo -->
      <div v-else-if="q.type === 'logo'" class="prm-field">
        <ProjectRequestLogoQuestion :label="q.label" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.prm-fields {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.prm-step-intro {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.prm-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prm-field label,
.prm-field__label {
  font-size: 0.85rem;
  color: var(--color-text);
  line-height: 1.45;
}

.prm-opt {
  color: var(--color-text-tertiary);
  font-weight: 400;
}

.prm-help {
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--color-text-tertiary);
  margin-top: -0.15rem;
}

.prm-field input,
.prm-field textarea {
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

.prm-field input:focus,
.prm-field textarea:focus {
  outline: none;
  border-color: var(--color-border-strong);
}

.prm-colors-extra {
  margin-top: 0.5rem;
}

/* toggle Sim/Não */
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

/* tags */
.prm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prm-tag {
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease, transform 0.12s ease;
}

.prm-tag:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

.prm-tag:active {
  transform: scale(0.96);
}

.prm-tag.is-on {
  border-color: var(--color-text);
  background: var(--color-text);
  color: var(--color-bg);
}

.prm-tags__outro {
  margin-top: 0.6rem;
}
</style>
