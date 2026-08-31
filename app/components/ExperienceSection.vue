<script setup lang="ts">
import { useContent } from '~/composables/useContent'
import { useT } from '~/composables/useT'

const c = useContent()
const t = useT()
</script>

<template>
  <section id="experiencia" class="experience" aria-labelledby="experience-title">
    <h2 id="experience-title" class="section-title">{{ t('experience.title') }}</h2>
    <div class="experience__list">
      <ExperienceItem
        v-for="item in c.experiences"
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
