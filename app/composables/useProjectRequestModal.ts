import { ref } from 'vue'

// Estado compartilhado (singleton) do modal de solicitação de projeto —
// permite abrir a partir de qualquer componente sem prop drilling.
const isOpen = ref(false)

export function useProjectRequestModal() {
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close }
}
