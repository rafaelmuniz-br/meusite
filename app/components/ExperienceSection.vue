<script setup lang="ts">
import { experiences } from '~/data/resume'
</script>

<template>
  <section id="experiencia" class="experience" aria-labelledby="experience-title">
    <h2 id="experience-title" class="section-title">Experiência Profissional</h2>
    <div class="experience__list">
      <ExperienceItem
        v-for="item in experiences"
        :key="item.role + item.company"
        v-bind="item"
      />
    </div>
  </section>
</template>

<style scoped>
.experience {
  scroll-margin-top: 2rem;
}

.experience__list {
  border-bottom: 1px solid var(--color-border);
}
</style>
