// Modelo do formulário de solicitação de projeto (popup multi-etapas).
// Independente de idioma. O conteúdo (perguntas/etapas/opções) fica em
// `form/pt.ts` e `form/en.ts`, ambos seguindo `FormContent`.
//
// FILOSOFIA: o formulário vira um briefing que o Rafael transforma num prompt
// de desenvolvimento. Perguntas detalhadas, ramificam pela escolha do cliente,
// e NUNCA falam de tecnologia — o cliente só descreve o problema/desejo.
//
// VOZ: `label` = pergunta que o Rafael faz (2ª pessoa). `mine` = rótulo na voz
// do CLIENTE (1ª pessoa), usado na mensagem final de WhatsApp. Idem
// `Step.title` (UI) vs `Step.mineTitle` (mensagem).

export type QuestionType = 'text' | 'textarea' | 'toggle' | 'tags' | 'color' | 'logo'

export interface Question {
  key: string // chave em form.answers (canônica ou `${tool}.slug`) — igual nos 2 idiomas
  label: string
  mine?: string
  help?: string
  type: QuestionType
  placeholder?: string
  required?: boolean
  rows?: number
  toggleLabels?: [string, string]
  options?: string[]
  reveal?: Question
}

export interface Step {
  id: string // igual nos 2 idiomas
  title: string
  mineTitle?: string
  intro?: string
  questions: Question[]
}

export interface ServiceType {
  id: string
  label: string
  description: string
}

export interface FormContent {
  serviceTypes: ServiceType[]
  tiktokServices: ServiceType[]
  tiktokToolDetails: Record<string, Question[]>
  siteSteps: Step[]
  tiktokChannelStep: Step
  genericSteps: Record<string, Step[]>
  linksStep: Step
}

export type AnswerValue = string | string[] | boolean
export type Answers = Record<string, AnswerValue | undefined>

export function isAnswered(answers: Answers, key: string): boolean {
  const v = answers[key]
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'boolean') return true
  return typeof v === 'string' && v.trim() !== ''
}

/** Rótulo de um item por id, na lista já resolvida pro idioma atual. */
export function labelOf(list: ServiceType[], id: string, fallback = id): string {
  return list.find((x) => x.id === id)?.label ?? fallback
}
