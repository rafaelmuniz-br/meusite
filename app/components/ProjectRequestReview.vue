<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue'
import { serviceLabel, tiktokLabel, type Question, type Step } from '~/data/projectRequest'
import { whatsappNumber } from '~/data/resume'

type Answers = Record<string, string | string[] | boolean | undefined>

const ctx = inject('projectRequest') as {
  form: { serviceType: string; answers: Answers }
  goBack: () => void
  flow: ComputedRef<Step[]>
}
const form = ctx.form

// Rótulo enxuto pra mensagem: corta a pergunta antes do "?", do ":" ou da 2ª frase,
// e tira pontuação final — pra não jogar o texto de ajuda dentro do label na mensagem.
function shortLabel(label: string): string {
  let s = label
  const q = s.indexOf('?')
  if (q !== -1) s = s.slice(0, q)
  else if (s.includes(':')) s = s.slice(0, s.indexOf(':'))
  else if (s.includes('. ')) s = s.slice(0, s.indexOf('. '))
  return s.replace(/[\s.:?]+$/, '').trim()
}

function fmtAnswer(q: Question, a: Answers): string | null {
  if (q.type === 'logo') {
    if (a.hasLogo === true) return 'Já tem logo — vai enviar o arquivo pelo WhatsApp'
    if (a.hasLogo === false) {
      const idea = ((a.logoIdea as string) || '').trim()
      return idea ? `Não tem logo — ideia: ${idea}` : 'Não tem logo — desenvolver do zero'
    }
    return null
  }
  if (q.type === 'color') {
    const swatches = Array.isArray(a[q.key]) ? (a[q.key] as string[]) : []
    const note = ((a.colorsNote as string) || '').trim()
    const all = [...swatches, note].filter(Boolean)
    return all.length ? all.join(', ') : null
  }
  if (q.type === 'tags') {
    const picked = Array.isArray(a[q.key]) ? [...(a[q.key] as string[])] : []
    const outro = ((a[q.key + '__outro'] as string) || '').trim()
    if (outro) picked.push(outro)
    return picked.length ? picked.join(', ') : null
  }
  if (q.type === 'toggle') {
    const v = a[q.key]
    if (v !== true && v !== false) return null
    let s = v ? (q.toggleLabels ? q.toggleLabels[0] : 'Sim') : q.toggleLabels ? q.toggleLabels[1] : 'Não'
    if (v === true && q.reveal) {
      const rv = ((a[q.reveal.key] as string) || '').trim()
      if (rv) s += ` — ${rv}`
    }
    return s
  }
  const t = ((a[q.key] as string) || '').trim()
  return t || null
}

function buildMessage(): string {
  const lines: string[] = []
  lines.push(`Olá, Rafael! Tenho interesse em *${serviceLabel(form.serviceType)}*.`, '')

  if (form.serviceType === 'tiktok') {
    const tools = (form.answers.tiktokTools as string[] | undefined) ?? []
    if (tools.length) lines.push(`Ferramentas de LIVE: ${tools.map(tiktokLabel).join(', ')}`, '')
  }

  const seen = new Set<string>()
  for (const step of ctx.flow.value) {
    if (['onboarding', 'service', 'tiktok-tools', 'review'].includes(step.id)) continue
    const block: string[] = []
    for (const q of step.questions) {
      if (seen.has(q.key)) continue
      seen.add(q.key)
      const val = fmtAnswer(q, form.answers)
      if (val) block.push(`${shortLabel(q.label)}: ${val}`)
    }
    if (block.length) lines.push(`*${step.title}*`, ...block, '')
  }

  return lines.join('\n').trim()
}

const messageLines = computed(() => buildMessage().split('\n'))

function send() {
  const text = buildMessage()
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="prm-review">
    <p class="prm-review__intro">Confira o resumo antes de enviar. Você pode voltar pra ajustar qualquer coisa.</p>

    <div class="prm-review__preview">
      <span
        v-for="(line, i) in messageLines"
        :key="i"
        class="prm-review__line"
        :style="{ animationDelay: Math.min(i, 14) * 28 + 'ms' }"
        >{{ line || ' ' }}</span
      >
    </div>

    <div class="prm-review__actions">
      <button type="button" class="prm-btn prm-btn--ghost" @click="ctx.goBack">Voltar</button>
      <button type="button" class="prm-btn prm-btn--primary" @click="send">
        Enviar via WhatsApp
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M17.47 14.38c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.53-.01-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.14.19 2 3.06 4.86 4.29.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z"
          />
          <path
            d="M12.02 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 1.68.44 3.28 1.24 4.68L2.5 21.5l4.95-1.3a9.46 9.46 0 0 0 4.57 1.17h.01c5.25 0 9.5-4.25 9.5-9.5s-4.25-9.37-9.51-9.37Zm0 17.28h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .78.8-2.92-.19-.3a7.86 7.86 0 0 1-1.21-4.19c0-4.36 3.55-7.9 7.91-7.9 2.11 0 4.09.82 5.59 2.32a7.86 7.86 0 0 1 2.31 5.59c0 4.36-3.55 7.89-7.88 7.89Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.prm-review {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.prm-review__intro {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.prm-review__preview {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 1.25rem;
  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--color-text);
}
/* cada linha do resumo é um <span> em bloco — ver .prm-review__line no main.css
   (traz display:block, white-space:pre-wrap e a animação de cascata) */

.prm-review__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.prm-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

@media (max-width: 480px) {
  .prm-review__actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }
}
</style>
