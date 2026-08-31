<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <p class="site-footer__copy">© {{ year }} Rafael Muniz</p>
    <NuxtLink class="site-footer__link" to="/politicas-e-termos">Políticas e Termos</NuxtLink>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 2rem;
  flex-wrap: wrap;
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);
}

.site-footer__copy {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

.site-footer__link {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.site-footer__link:hover,
.site-footer__link:focus-visible {
  color: var(--color-text);
}
</style>
