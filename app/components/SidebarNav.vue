<script setup lang="ts">
import { useRoute } from 'vue-router'

const navItems = [
  { label: 'Portfólio', to: '/' },
  { label: 'Contato', to: '/contato' },
  { label: 'Experiência', to: '/experiencia' },
]

const route = useRoute()

// Cada item do menu corresponde a uma página inteira, então o item ativo é
// simplesmente o que bate com a rota atual — sem scroll-spy.
function isActive(to: string) {
  return route.path === to
}

// Clicar num link que já é a página atual não dispara navegação (nem o
// scrollBehavior do Nuxt), então rolamos manualmente até o topo nesse caso.
function handleClick(to: string, event: MouseEvent) {
  if (route.path === to) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="sidebar-nav" aria-label="Seções da página">
    <ul>
      <li v-for="item in navItems" :key="item.to">
        <NuxtLink
          :to="item.to"
          :class="{ 'is-active': isActive(item.to) }"
          @click="handleClick(item.to, $event)"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  width: 100%;
  margin-top: 2.25rem;
}

.sidebar-nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.sidebar-nav a {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
  padding-left: 0.85rem;
  border-left: 1px solid var(--color-border);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.sidebar-nav a:hover,
.sidebar-nav a:focus-visible {
  color: var(--color-text-secondary);
}

.sidebar-nav a.is-active {
  color: var(--color-text);
  border-left-color: var(--color-text);
}

@media (max-width: 768px) {
  .sidebar-nav ul {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem 1.25rem;
    justify-content: center;
  }

  .sidebar-nav a {
    border-left: none;
    padding-left: 0;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid var(--color-border);
  }

  .sidebar-nav a.is-active {
    border-left-color: transparent;
    border-bottom-color: var(--color-text);
  }
}
</style>
