// Tipos do conteúdo da página /politicas-e-termos.
// Os textos ficam em `policies.pt.ts` / `policies.en.ts`.

export interface PolicySection {
  id: string // âncora — igual nos dois idiomas
  title: string
  paragraphs: string[]
}

export interface PoliciesContent {
  lastUpdated: string
  sections: PolicySection[]
}
