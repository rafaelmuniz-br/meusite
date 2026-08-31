// Árvore de conteúdo traduzível, por idioma. Consumida via `useContent()`.
// Cada idioma tem: currículo (resume.*.ts) + políticas + formulário.

import type { Locale } from '~/composables/useLocale'
import type { ResumeContent } from './resume'
import type { PoliciesContent } from './policies'
import type { FormContent } from './form/types'
import { resumePt } from './resume.pt'
import { resumeEn } from './resume.en'
import { policiesPt } from './policies.pt'
import { policiesEn } from './policies.en'
import { formPt } from './form/pt'
import { formEn } from './form/en'

export interface SiteContent extends ResumeContent {
  policies: PoliciesContent
  form: FormContent
}

export const CONTENT: Record<Locale, SiteContent> = {
  pt: { ...resumePt, policies: policiesPt, form: formPt },
  en: { ...resumeEn, policies: policiesEn, form: formEn },
}
