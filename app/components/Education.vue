<script setup lang="ts">
import { useContent } from '~/composables/useContent'

const c = useContent()
</script>

<template>
  <p class="education">{{ c.education.degree }} - {{ c.education.institution }}</p>
</template>

<style scoped>
.education {
  width: 100%;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.45;
  text-align: left;
  margin-top: 1.5rem;
}
</style>
