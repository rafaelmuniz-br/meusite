<script setup lang="ts">
definePageMeta({ layout: 'resume' })

useSeoMeta({
  title: 'Contato — Rafael Muniz',
  description: 'Fale com Rafael Muniz diretamente pelo WhatsApp, e-mail ou LinkedIn.',
})
</script>

<template>
  <header class="contato-intro">
    <h1 class="section-title">Contato</h1>
    <p>Tem um projeto em mente, um problema ou só quer trocar uma ideia sobre tecnologia? Entre em contato!</p>
  </header>

  <ContactMethods />
  <ContactForm />
</template>

<style scoped>
.contato-intro {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* O <h1> usa a classe global .section-title (mesma de "Envie uma mensagem"),
   só zeramos o margin-bottom porque o espaçamento aqui vem do gap do flex. */
.contato-intro h1.section-title {
  margin-bottom: 0;
}

.contato-intro p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 55ch;
}
</style>
