<script setup lang="ts">
import { education } from '~/data/resume'
</script>

<template>
  <p class="education">{{ education.degree }} - {{ education.institution }}</p>
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
