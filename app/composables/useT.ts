import { ui } from '~/data/ui'
import { useLocale } from '~/composables/useLocale'

type Vars = Record<string, string | number>

function interpolate(str: string, vars?: Vars): string {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
}

/**
 * Tradução de strings de UI. `const t = useT()` → `t('nav.portfolio')`,
 * `t('prm.stepOf', { n: 2, total: 6 })`. Cai pro PT se a chave faltar em EN.
 */
export function useT() {
  const { locale } = useLocale()
  return (key: string, vars?: Vars): string => {
    const dict = ui[locale.value] ?? ui.pt
    const raw = dict[key] ?? ui.pt[key] ?? key
    return interpolate(raw, vars)
  }
}
