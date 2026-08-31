<script setup lang="ts">
import { computed, inject, ref } from 'vue'

// `field` diz qual chave de `form.answers` guarda o array de cores selecionadas.
const props = withDefaults(defineProps<{ field?: string }>(), { field: 'colorSwatches' })

const ctx = inject('projectRequest') as { form: { answers: Record<string, unknown> } }
if (!Array.isArray(ctx.form.answers[props.field])) ctx.form.answers[props.field] = []
const list = computed<string[]>(() => ctx.form.answers[props.field] as string[])

const tab = ref<'swatches' | 'precise'>('swatches')
const preciseHex = ref('#2563EB')

// Gera uma rampa de cores (escala de cinza + matiz x luminosidade) no estilo
// de seletores de cor de ferramentas de design — em vez de uma lista curada
// fixa, calculada uma vez a partir de HSL.
function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100
  const lN = l / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = sN * Math.min(lN, 1 - lN)
  const f = (n: number) => lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(255 * x).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase()
}

const grayRow = [97, 82, 67, 52, 37, 20, 5].map((l) => hslToHex(0, 0, l))
const hueCount = 11
const hues = Array.from({ length: hueCount }, (_, i) => Math.round((i * 360) / hueCount))
const lightnessRows = [82, 68, 54, 40, 27]
const hueGrid = lightnessRows.map((l) => hues.map((h) => hslToHex(h, 72, l)))

function isSelected(hex: string) {
  return list.value.includes(hex)
}

function toggle(hex: string) {
  const idx = list.value.indexOf(hex)
  if (idx === -1) list.value.push(hex)
  else list.value.splice(idx, 1)
}

function addPrecise() {
  const hex = preciseHex.value.toUpperCase()
  if (!list.value.includes(hex)) list.value.push(hex)
}

function remove(hex: string) {
  const idx = list.value.indexOf(hex)
  if (idx !== -1) list.value.splice(idx, 1)
}

const selectedChips = computed(() => list.value)
</script>

<template>
  <div class="prm-color-picker">
    <div class="prm-color-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        class="prm-color-tab"
        :class="{ 'is-active': tab === 'swatches' }"
        @click="tab = 'swatches'"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
        Amostras
      </button>
      <button
        type="button"
        role="tab"
        class="prm-color-tab"
        :class="{ 'is-active': tab === 'precise' }"
        @click="tab = 'precise'"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h10M4 18h13" stroke-linecap="round" />
          <circle cx="18" cy="6" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="19" cy="18" r="1.6" fill="currentColor" stroke="none" />
        </svg>
        Cor precisa
      </button>
    </div>

    <div class="prm-color-body">
      <div class="prm-color-panel">
        <div v-if="tab === 'swatches'" class="prm-swatches">
          <div class="prm-swatch-row prm-swatch-row--gray">
            <button
              v-for="hex in grayRow"
              :key="hex"
              type="button"
              class="prm-swatch"
              :class="{ 'is-selected': isSelected(hex) }"
              :style="{ backgroundColor: hex }"
              :aria-pressed="isSelected(hex)"
              :title="hex"
              @click="toggle(hex)"
            />
          </div>
          <div v-for="(row, ri) in hueGrid" :key="ri" class="prm-swatch-row">
            <button
              v-for="hex in row"
              :key="hex"
              type="button"
              class="prm-swatch"
              :class="{ 'is-selected': isSelected(hex) }"
              :style="{ backgroundColor: hex }"
              :aria-pressed="isSelected(hex)"
              :title="hex"
              @click="toggle(hex)"
            />
          </div>
        </div>

        <div v-else class="prm-precise">
          <UColorPicker v-model="preciseHex" class="prm-precise__picker" :ui="{ root: 'w-full', picker: 'w-full items-stretch' }" />
          <div class="prm-precise__row">
            <span class="prm-precise__preview" :style="{ backgroundColor: preciseHex }" />
            <input v-model="preciseHex" type="text" class="prm-precise__input" />
            <button type="button" class="prm-precise__add" aria-label="Adicionar cor" @click="addPrecise">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4">
                <path d="M12 5v14M5 12h14" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <aside class="prm-color-selected">
        <p class="prm-color-selected__title">Selecionadas</p>
        <div v-if="selectedChips.length" class="prm-chips">
          <button
            v-for="hex in selectedChips"
            :key="hex"
            type="button"
            class="prm-chip"
            :aria-label="`Remover ${hex}`"
            @click="remove(hex)"
          >
            <span class="prm-chip__dot" :style="{ backgroundColor: hex }" />
            {{ hex }}
          </button>
        </div>
        <p v-else class="prm-color-selected__empty">Nenhuma cor ainda.</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.prm-color-picker {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 440px;
}

.prm-color-tabs {
  display: flex;
  gap: 0.6rem;
}

.prm-color-tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
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

.prm-color-tab:hover {
  border-color: var(--color-text);
}

.prm-color-tab.is-active {
  border-color: var(--color-text);
  background: var(--color-text);
  color: var(--color-bg);
}

.prm-color-body {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.prm-color-panel {
  flex: 1;
  min-width: 0;
}

.prm-swatches {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.prm-swatch-row {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 6px;
}

.prm-swatch-row--gray {
  grid-template-columns: repeat(7, 1fr);
}

.prm-swatch {
  aspect-ratio: 1;
  border-radius: 6px;
  border: none;
  outline-offset: 2px;
  transition: outline-color 0.12s ease, transform 0.12s ease;
}

.prm-swatch:hover {
  transform: scale(1.08);
}

.prm-swatch:active {
  transform: scale(0.92);
}

.prm-swatch.is-selected {
  outline: 2px solid var(--color-text);
  animation: prm-pop 0.24s ease;
}

.prm-precise {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  align-items: stretch;
}

.prm-precise__picker {
  width: 100%;
}

/* O ColorPicker do Nuxt UI usa classes Tailwind fixas (w-42/h-42 etc.) pro
   quadrado de saturação/luminosidade — sobrescrevemos direto pra ele esticar
   até a largura do painel de amostras, mantendo proporção 1:1 via
   aspect-ratio (a barra de matiz ao lado acompanha a altura automaticamente,
   já que o container é flex com stretch). */
.prm-precise__picker :deep([data-slot='picker']) {
  width: 100%;
}

.prm-precise__picker :deep([data-slot='selector']) {
  width: auto !important;
  height: auto !important;
  flex: 1 1 auto;
  max-width: 260px;
  aspect-ratio: 1 / 1;
}

.prm-precise__picker :deep([data-slot='track']) {
  width: 10px !important;
  height: auto !important;
  flex: 0 0 10px;
}

.prm-precise__row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  max-width: 224px;
}

.prm-precise__preview {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--color-border-strong);
  flex-shrink: 0;
}

.prm-precise__input {
  flex: 1;
  min-width: 0;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.55rem 0.8rem;
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.875rem;
}

.prm-precise__input:focus {
  outline: none;
  border-color: var(--color-border-strong);
}

.prm-precise__add {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.prm-precise__add:hover {
  opacity: 0.85;
}

.prm-color-selected {
  flex-shrink: 0;
  min-width: 112px;
  max-width: 210px;
  border-left: 1px solid var(--color-border);
  padding-left: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prm-color-selected__title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.prm-color-selected__empty {
  font-size: 0.78rem;
  color: var(--color-text-tertiary);
  line-height: 1.5;
}

.prm-chips {
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  /* ~5 chips por coluna; ao passar disso, abre nova coluna à direita */
  max-height: 10.5rem;
  gap: 0.45rem 0.6rem;
}

.prm-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  padding: 0.3rem 0.5rem;
  font-size: 0.68rem;
  color: var(--color-text);
  background: transparent;
  cursor: pointer;
  width: fit-content;
  max-width: 100%;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.prm-chip:hover {
  border-color: var(--color-text);
  background: var(--color-bg-elevated);
}

.prm-chip__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .prm-color-body {
    flex-direction: column;
    align-items: stretch;
  }

  .prm-color-selected {
    width: 100%;
    border-left: none;
    padding-left: 0;
    border-top: 1px solid var(--color-border);
    padding-top: 1rem;
  }

  .prm-chips {
    flex-flow: row wrap;
    max-height: none;
  }
}
</style>
