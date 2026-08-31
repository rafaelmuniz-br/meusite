<script setup lang="ts">
import { skills } from '~/data/resume'
import { useT } from '~/composables/useT'

const t = useT()
</script>

<template>
  <section id="habilidades" class="skills" aria-labelledby="skills-title">
    <h2 id="skills-title" class="section-title">{{ t('skills.title') }}</h2>
    <ul class="skills__list">
      <li v-for="skill in skills" :key="skill" class="skills__badge">{{ skill }}</li>
    </ul>
  </section>
</template>

<style scoped>
.skills {
  scroll-margin-top: 2rem;
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skills__badge {
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  padding: 0.55rem 1.15rem;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  background: transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.skills__badge:hover {
  color: var(--color-text);
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
