<script setup lang="ts">
import { useContent } from '~/composables/useContent'
import { useT } from '~/composables/useT'

const c = useContent()
const t = useT()
</script>

<template>
  <section id="portfolio" class="portfolio" aria-labelledby="portfolio-title">
    <h2 id="portfolio-title" class="section-title">{{ t('portfolio.title') }}</h2>

    <div class="portfolio__grid">
      <PortfolioCard
        v-for="(item, index) in c.portfolio"
        :key="item.slug"
        :name="item.name"
        :description="item.description"
        :status="item.status"
        :url="item.url"
        :logo="item.logo"
        :bg-color="item.bgColor"
        :logo-scale="item.logoScale ?? 1"
        :index="index"
      />
    </div>
  </section>
</template>

<style scoped>
.portfolio {
  scroll-margin-top: 2rem;
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: stretch;
  gap: 1.25rem;
}
</style>
