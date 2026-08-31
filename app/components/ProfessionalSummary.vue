<script setup lang="ts">
import { computed } from 'vue'
import { summary } from '~/data/resume'

const lines = computed(() => summary.text.split('\n'))
</script>

<template>
  <section id="sobre" class="summary" aria-labelledby="summary-title">
    <h2 id="summary-title" class="section-title">Sobre mim</h2>
    <p class="summary__text">
      <template v-for="(line, i) in lines" :key="i">
        {{ line }}<br v-if="i < lines.length - 1" />
      </template>
      <span class="summary__highlight">{{ summary.highlight }}</span>
    </p>
  </section>
</template>

<style scoped>
.summary {
  scroll-margin-top: 2rem;
}

.summary__text {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 62ch;
}

.summary__highlight {
  color: var(--color-text);
}
</style>
