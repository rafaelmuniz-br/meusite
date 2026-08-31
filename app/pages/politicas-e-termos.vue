<script setup lang="ts">
import { policiesLastUpdated } from '~/data/policies'

useSeoMeta({
  title: 'Políticas e Termos — Rafael Muniz',
  description:
    'Política de Privacidade, Termos de Uso, Portfólio e Projetos Desenvolvidos e Aviso de Cookies do currículo online de Rafael Muniz.',
})
</script>

<template>
  <div class="policies-page">
    <div class="policies-page__inner">
      <NuxtLink class="policies-page__back" to="/">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Voltar para o currículo
      </NuxtLink>

      <header class="policies-page__header">
        <h1>Políticas e Termos</h1>
        <p>
          Este site é o currículo pessoal e online de Rafael Muniz. Aqui você encontra, de forma
          direta, o que ele faz com informações, como funciona o contato e o que rege o uso do
          conteúdo.
        </p>
        <p class="policies-page__updated">Última atualização: {{ policiesLastUpdated }}</p>
      </header>

      <PolicyAccordion />
    </div>
  </div>
</template>

<style scoped>
.policies-page {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 3.5rem 3.5rem 5rem;
  display: flex;
  justify-content: center;
}

.policies-page__inner {
  width: 100%;
  max-width: 720px;
}

.policies-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
  transition: color 0.15s ease;
}

.policies-page__back:hover,
.policies-page__back:focus-visible {
  color: var(--color-text);
}

.policies-page__header {
  margin-bottom: 2.5rem;
}

.policies-page__header h1 {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

.policies-page__header p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 62ch;
}

.policies-page__updated {
  margin-top: 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

@media (max-width: 900px) {
  .policies-page {
    padding: 2.75rem 1.5rem 4rem;
  }
}

@media (max-width: 480px) {
  .policies-page {
    padding: 2.25rem 1.25rem 3.5rem;
  }

  .policies-page__header h1 {
    font-size: 1.6rem;
  }
}
</style>
