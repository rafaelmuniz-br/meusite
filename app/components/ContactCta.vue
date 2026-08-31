<script setup lang="ts">
import { useProjectRequestModal } from '~/composables/useProjectRequestModal'

const { open } = useProjectRequestModal()
</script>

<template>
  <section class="contact-cta" aria-labelledby="contact-cta-title">
    <h2 id="contact-cta-title" class="contact-cta__text">Vamos conversar sobre o seu projeto?</h2>
    <div class="contact-cta__actions">
      <NuxtLink class="contact-cta__button contact-cta__button--secondary" to="/contato">
        Enviar mensagem
      </NuxtLink>
      <button type="button" class="contact-cta__button contact-cta__button--primary" @click="open">
        Descrever projeto
      </button>
    </div>
  </section>
</template>

<style scoped>
.contact-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2.25rem;
  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.contact-cta__text {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-text);
  max-width: 32ch;
}

.contact-cta__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.contact-cta__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-shrink: 0;
  border-radius: 999px;
  padding: 0.75rem 1.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.contact-cta__button--primary {
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
}

.contact-cta__button--primary:hover,
.contact-cta__button--primary:focus-visible {
  opacity: 0.85;
}

.contact-cta__button--secondary {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-strong);
}

.contact-cta__button--secondary:hover,
.contact-cta__button--secondary:focus-visible {
  color: var(--color-text);
  border-color: var(--color-text);
}

@media (max-width: 480px) {
  .contact-cta {
    padding: 1.75rem;
  }

  .contact-cta__actions {
    width: 100%;
    flex-direction: column-reverse;
  }

  .contact-cta__button {
    width: 100%;
  }
}
</style>
