<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, provide, reactive, ref, watch } from 'vue'
import { useProjectRequestModal } from '~/composables/useProjectRequestModal'
import {
  genericSteps,
  isAnswered,
  linksStep,
  siteSteps,
  tiktokChannelStep,
  tiktokLabel,
  tiktokToolDetails,
  type Question,
  type Step,
} from '~/data/projectRequest'
import ProjectRequestOnboarding from '~/components/ProjectRequestOnboarding.vue'
import ProjectRequestServiceType from '~/components/ProjectRequestServiceType.vue'
import ProjectRequestTiktokServices from '~/components/ProjectRequestTiktokServices.vue'
import ProjectRequestQuestionStep from '~/components/ProjectRequestQuestionStep.vue'
import ProjectRequestReview from '~/components/ProjectRequestReview.vue'

const { isOpen, close } = useProjectRequestModal()

// Estado único: tipo de serviço + um mapa plano de respostas (chave -> valor).
const form = reactive({
  serviceType: '' as string,
  answers: {} as Record<string, string | string[] | boolean | undefined>,
})

// Etapas "especiais" (render próprio, sem lista de perguntas).
const ONBOARDING: Step = { id: 'onboarding', title: '', questions: [] }
const SERVICE: Step = { id: 'service', title: 'Que tipo de projeto você precisa?', questions: [] }
const TIKTOK_TOOLS: Step = { id: 'tiktok-tools', title: 'O que você quer pra sua LIVE?', questions: [] }
const REVIEW: Step = { id: 'review', title: 'Revisão', questions: [] }
const SPECIAL = new Set(['onboarding', 'service', 'tiktok-tools', 'review'])

// Monta o fluxo conforme o serviço escolhido e (no TikTok) as ferramentas marcadas.
const flow = computed<Step[]>(() => {
  const s = form.serviceType
  const out: Step[] = [ONBOARDING, SERVICE]
  if (s === 'site') {
    out.push(...siteSteps)
  } else if (s === 'tiktok') {
    out.push(TIKTOK_TOOLS)
    const tools = (form.answers.tiktokTools as string[] | undefined) ?? []
    for (const id of tools) {
      out.push({
        id: `tt-${id}`,
        title: tiktokLabel(id),
        intro: 'Nenhuma pergunta aqui é obrigatória — é só pra eu entender bem o que você imagina.',
        questions: tiktokToolDetails[id] ?? [],
      })
    }
    out.push(tiktokChannelStep)
  } else if (s) {
    out.push(...(genericSteps[s] ?? genericSteps.outro))
  }
  if (s) out.push(linksStep)
  out.push(REVIEW)
  return out
})

const currentStepId = ref('onboarding')
const currentIndex = computed(() => {
  const idx = flow.value.findIndex((s) => s.id === currentStepId.value)
  return idx === -1 ? 0 : idx
})
const currentStep = computed(() => flow.value[currentIndex.value] ?? ONBOARDING)

// Chaves já perguntadas em etapas anteriores à de índice `idx` — base do "perguntar uma vez".
function keysBefore(idx: number): Set<string> {
  const set = new Set<string>()
  for (let i = 0; i < idx; i++) for (const q of flow.value[i].questions) set.add(q.key)
  return set
}
// Uma etapa é "vazia" quando todas as perguntas dela já foram feitas antes.
function stepEmpty(idx: number): boolean {
  const step = flow.value[idx]
  if (!step || SPECIAL.has(step.id)) return false
  const before = keysBefore(idx)
  return step.questions.every((q) => before.has(q.key))
}

const askedEarlier = computed(() => keysBefore(currentIndex.value))

const showProgress = computed(() => currentStep.value.id !== 'onboarding')
const etapaTotal = computed(() => flow.value.length - 1)
const etapaNumber = computed(() => currentIndex.value)
const progressPct = computed(() => Math.round((etapaNumber.value / Math.max(etapaTotal.value, 1)) * 100))

function requiredMissing(): Question | null {
  const step = currentStep.value
  const before = keysBefore(currentIndex.value)
  return (
    step.questions.find((q) => q.required && !before.has(q.key) && !isAnswered(form.answers, q.key)) ?? null
  )
}

const canProceed = computed(() => {
  const step = currentStep.value
  if (step.id === 'service') return form.serviceType !== ''
  if (step.id === 'tiktok-tools') return ((form.answers.tiktokTools as string[] | undefined)?.length ?? 0) > 0
  if (SPECIAL.has(step.id)) return true
  return requiredMissing() === null
})

// Direção da troca de etapa (A) — define qual keyframe de entrada a nova etapa usa.
const stepDir = ref<'fwd' | 'back'>('fwd')
const stepAnimClass = computed(() => (stepDir.value === 'fwd' ? 'prm-step-in-fwd' : 'prm-step-in-back'))

// Pulso rápido na barra de progresso ao concluir uma etapa (F).
const panelEl = ref<HTMLElement | null>(null)
const progressPulse = ref(false)
watch(currentIndex, (to, from) => {
  if (showProgress.value && to > from) {
    progressPulse.value = true
    window.setTimeout(() => (progressPulse.value = false), 700)
  }
})

function goNext() {
  stepDir.value = 'fwd'
  let i = currentIndex.value + 1
  while (i < flow.value.length && stepEmpty(i)) i++
  if (i < flow.value.length) currentStepId.value = flow.value[i].id
}

function goBack() {
  stepDir.value = 'back'
  let i = currentIndex.value - 1
  while (i > 0 && stepEmpty(i)) i--
  if (i >= 0) currentStepId.value = flow.value[i].id
}

// Seletor do primeiro campo obrigatório vazio — pro shake (G).
function missingFieldSelector(): string | null {
  if (currentStep.value.id === 'tiktok-tools') return '[data-prm-shake="tiktokTools"]'
  const q = requiredMissing()
  if (!q) return null
  return q.type === 'tags' || q.type === 'toggle' || q.type === 'logo'
    ? `[data-prm-shake="${q.key}"]`
    : `[id="prm-q-${q.key}"]`
}

function shake(el: HTMLElement) {
  el.classList.remove('prm-shake')
  void el.offsetWidth
  el.classList.add('prm-shake')
  el.addEventListener('animationend', () => el.classList.remove('prm-shake'), { once: true })
}

function attemptNext() {
  if (canProceed.value) {
    goNext()
    return
  }
  const sel = missingFieldSelector()
  const el = sel && panelEl.value?.querySelector<HTMLElement>(sel)
  if (el) {
    shake(el)
    const focusable = el.matches('input, textarea, select')
      ? el
      : el.querySelector<HTMLElement>('input, textarea, select, button')
    focusable?.focus({ preventScroll: true })
  }
}

function resetAndClose() {
  close()
  // pequeno atraso pra não "piscar" o conteúdo revertendo enquanto o modal ainda fecha
  setTimeout(() => {
    currentStepId.value = 'onboarding'
    stepDir.value = 'fwd'
    form.serviceType = ''
    for (const k of Object.keys(form.answers)) delete form.answers[k]
  }, 300)
}

provide('projectRequest', { form, goNext, goBack, flow })

function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') resetAndClose()
}

watch(isOpen, (open) => {
  lockScroll(open)
  if (open) {
    window.addEventListener('keydown', onKeydown)
    nextTick(() => panelEl.value?.querySelector<HTMLElement>('.prm-btn--primary')?.focus())
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="prm-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="currentStep.title || 'Solicitar projeto'"
    >
      <div ref="panelEl" class="prm-panel">
        <header class="prm-header">
          <div class="prm-header__meta">
            <span v-if="showProgress" :key="'l' + currentStepId" class="prm-step-label prm-meta-anim">
              Etapa {{ etapaNumber }} de {{ etapaTotal }}
            </span>
            <h2 v-if="currentStep.title" :key="'t' + currentStepId" class="prm-title prm-meta-anim">
              {{ currentStep.title }}
            </h2>
          </div>
          <button class="prm-close" type="button" aria-label="Fechar" @click="resetAndClose">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <div v-if="showProgress" class="prm-progress" :class="{ 'prm-progress--pulse': progressPulse }">
          <div class="prm-progress__bar" :style="{ width: progressPct + '%' }" />
        </div>

        <div class="prm-body">
          <div :key="currentStepId" class="prm-step prm-stagger" :class="stepAnimClass">
            <ProjectRequestOnboarding v-if="currentStep.id === 'onboarding'" />
            <ProjectRequestServiceType v-else-if="currentStep.id === 'service'" />
            <ProjectRequestTiktokServices v-else-if="currentStep.id === 'tiktok-tools'" />
            <ProjectRequestReview v-else-if="currentStep.id === 'review'" />
            <ProjectRequestQuestionStep v-else :step="currentStep" :asked-earlier="askedEarlier" />
          </div>
        </div>

        <footer v-if="currentStep.id !== 'review'" class="prm-footer">
          <button
            v-if="currentIndex > 0"
            type="button"
            class="prm-btn prm-btn--ghost"
            @click="goBack"
          >
            Voltar
          </button>
          <span v-else />
          <button
            type="button"
            class="prm-btn prm-btn--primary"
            :class="{ 'prm-btn--blocked': !canProceed }"
            :aria-disabled="!canProceed"
            @click="attemptNext"
          >
            {{ currentStep.id === 'onboarding' ? 'Começar' : 'Próximo' }}
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.prm-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
}

.prm-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.prm-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 2.5rem 2rem 0;
  flex-shrink: 0;
}

.prm-header__meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prm-step-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
}

.prm-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Troca suave do "Etapa X de Y" e do título ao mudar de etapa (F) —
   re-render por :key dispara a animação, sem depender de transitionend */
.prm-meta-anim {
  animation: prm-fade-up 0.24s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.prm-close {
  flex-shrink: 0;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  border-radius: 999px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s ease;
}

.prm-close:hover,
.prm-close:focus-visible {
  opacity: 0.85;
}

.prm-progress {
  position: relative;
  height: 2px;
  background: var(--color-border);
  margin: 1.5rem 2rem 0;
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
}

.prm-progress__bar {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 999px;
}

/* F. brilho que atravessa a barra quando uma etapa é concluída */
.prm-progress::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.55),
    transparent
  );
  opacity: 0;
}

.prm-progress--pulse::after {
  animation: prm-progress-shine 0.7s ease;
}

@keyframes prm-progress-shine {
  0% {
    transform: translateX(-100%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.prm-body {
  position: relative;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.75rem 2rem 2rem;
}

.prm-step {
  outline: none;
}

.prm-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 2rem 2rem;
  border-top: 1px solid var(--color-border);
}

.prm-btn {
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.75rem 1.6rem;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}

.prm-btn--primary {
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
}

.prm-btn--primary:hover,
.prm-btn--primary:focus-visible {
  opacity: 0.85;
}

/* "Próximo" quando ainda falta preencher: fica apagado mas continua clicável
   (o clique dispara o shake no campo faltante em vez de não fazer nada). */
.prm-btn--blocked {
  opacity: 0.35;
}

.prm-btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.prm-btn--ghost:hover,
.prm-btn--ghost:focus-visible {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

@media (min-width: 901px) {
  .prm-overlay {
    left: clamp(300px, 30vw, 400px);
    border-left: 1px solid var(--color-border);
  }

  /* no desktop o modal já começa depois da sidebar — não precisa centralizar
     o painel dentro do resto, ele ocupa toda a largura disponível */
  .prm-panel {
    max-width: none;
    margin: 0;
  }
}
</style>
