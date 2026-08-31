import { computed, type ComputedRef } from 'vue'
import { CONTENT, type SiteContent } from '~/data/content'
import { useLocale } from '~/composables/useLocale'

/**
 * Árvore de conteúdo traduzível, reativa ao idioma atual.
 * `const c = useContent()` → no template `c.experiences`, no script `c.value.experiences`.
 */
export function useContent(): ComputedRef<SiteContent> {
  const { locale } = useLocale()
  return computed(() => CONTENT[locale.value])
}
