// Dados do currículo INDEPENDENTES de idioma + os tipos do conteúdo traduzível.
// Os textos que traduzem ficam em `resume.pt.ts` / `resume.en.ts`.

export const profile = {
  name: 'Rafael Muniz',
  photo: '/profile.jpg',
  initials: 'RM',
}

// `labelKey` aponta pro dicionário de UI (`data/ui.ts`) — o rótulo traduz, o resto não.
export const contacts = [
  {
    labelKey: 'contact.email',
    value: 'rafael.s.m.muniz@gmail.com',
    href: 'mailto:rafael.s.m.muniz@gmail.com',
  },
  {
    labelKey: 'contact.phone',
    value: '(71) 99105-5569',
    href: 'tel:+5571991055569',
  },
  {
    labelKey: 'contact.linkedin',
    value: 'rafael-muniz-88b417245',
    href: 'https://www.linkedin.com/in/rafael-muniz-88b417245',
    external: true,
  },
] as const

// Número usado pelos formulários de contato (WhatsApp), formato internacional sem símbolos.
export const whatsappNumber = '5571991055569'

// Habilidades técnicas — termos que não traduzem.
export const skills = [
  'Vue.js / Nuxt',
  'JavaScript / HTML / CSS',
  'Java',
  'ASP',
  'Docker / Git',
  'Python / Power BI',
  'SQL / MySQL / SQL Server',
  'APIs REST',
  'WordPress',
  'AVA Moodle',
  'Scrum / Kanban',
  'Figma / UI/UX',
]

// Texto "digitado" no preloader de assinatura (efeito terminal). Código, não traduz.
// Desktop: Java. Mobile (<= 768px): Python, mais curto — cabe melhor na tela.
export const preloaderPhrase = 'System.out.println("Rafael Muniz");'
export const preloaderPhraseMobile = 'print("Rafael Muniz")'

// ---------------------------------------------------------------------------
// Tipos do conteúdo traduzível (resume.pt.ts / resume.en.ts seguem esta forma)
// ---------------------------------------------------------------------------

export interface Experience {
  period: string
  role: string
  company: string
  duration?: string
  summary: string
  highlights: string[]
}

export interface PortfolioItem {
  slug: string
  name: string
  description: string
  status: string
  url: string
  logo: string
  bgColor: string
  logoScale?: number
}

export interface ResumeContent {
  education: { degree: string; institution: string }
  // "text" usa "\n" pra quebra de linha; "highlight" é a parte final em destaque.
  summary: { text: string; highlight: string }
  experiences: Experience[]
  portfolio: PortfolioItem[]
}
