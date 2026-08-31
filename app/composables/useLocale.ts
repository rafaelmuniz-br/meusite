import { readonly, ref } from 'vue'

export const LOCALES = ['pt', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (LOCALES as readonly string[]).includes(v)
}

// Singleton de módulo — o estado de idioma é global no app.
const locale = ref<Locale>('pt')
const switching = ref(false) // overlay de transição (SignaturePreloader) ativo?
const switchPhrase = ref('') // texto que o preloader "digita" durante a troca

const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' }

/**
 * Aplica o idioma sem animação (usado no init pelo plugin).
 */
export function applyLocale(next: Locale) {
  locale.value = next
  if (import.meta.client) document.documentElement.lang = htmlLang[next]
}

export function useLocale() {
  const cookie = useCookie<Locale>('rm-locale', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })

  /**
   * Troca de idioma disparada pelo usuário — cobre a tela com o preloader,
   * troca por baixo, revela a página traduzida.
   */
  function setLocale(next: Locale) {
    if (next === locale.value || switching.value) return
    cookie.value = next
    switchPhrase.value = `setLocale("${next}")`
    switching.value = true
    // A troca real acontece com a tela já coberta pelo overlay.
    window.setTimeout(() => applyLocale(next), 260)
  }

  return {
    locale: readonly(locale),
    setLocale,
    switching,
    switchPhrase: readonly(switchPhrase),
    LOCALES,
  }
}
