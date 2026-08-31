import { applyLocale, isLocale, type Locale } from '~/composables/useLocale'

// Resolve o idioma inicial no cliente:
//  1. cookie `rm-locale` (escolha manual anterior)
//  2. senão, idioma do navegador (en* -> en, resto -> pt) e grava o cookie
// O HTML é pré-renderado em PT; se o resultado for EN, o texto corrige no
// primeiro tick (patch de hidratação — silencioso em produção). A animação
// completa de troca só roda quando o usuário clica no seletor.
export default defineNuxtPlugin(() => {
  const cookie = useCookie<Locale>('rm-locale', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  })

  let resolved: Locale = 'pt'
  if (isLocale(cookie.value)) {
    resolved = cookie.value
  } else {
    const nav = navigator.language?.toLowerCase() ?? ''
    resolved = nav.startsWith('en') ? 'en' : 'pt'
    cookie.value = resolved
  }

  applyLocale(resolved)
})
