<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useT } from '~/composables/useT'

const t = useT()

const props = withDefaults(
  defineProps<{
    name: string
    description: string
    status?: string
    url: string
    logo: string
    bgColor: string
    logoScale?: number
    index: number
  }>(),
  { logoScale: 1 }
)

const imgFailed = ref(false)
const photoEl = useTemplateRef<HTMLImageElement>('photoEl')
const cardEl = useTemplateRef<HTMLAnchorElement>('cardEl')

function checkPhoto() {
  const el = photoEl.value
  if (el && el.complete && el.naturalWidth === 0) imgFailed.value = true
}

onMounted(checkPhoto)

// Animação de entrada: o card aparece com fade + slide-up ao rolar até ele,
// com um atraso escalonado por índice para não entrarem todos de uma vez.
const isVisible = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (cardEl.value) observer.observe(cardEl.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <a
    ref="cardEl"
    class="portfolio-card"
    :class="{ 'is-visible': isVisible }"
    :style="{ transitionDelay: `${props.index * 90}ms` }"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="portfolio-card__content">
      <h3 class="portfolio-card__title">{{ name }}</h3>
      <p class="portfolio-card__description">{{ description }}</p>
      <p v-if="status" class="portfolio-card__status">{{ status }}</p>
      <span class="portfolio-card__link">
        {{ t('portfolio.visit') }}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="portfolio-card__hint portfolio-card__hint--hover">
        {{ t('portfolio.hoverHint') }}
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="portfolio-card__hint portfolio-card__hint--touch">
        {{ t('portfolio.dragHint') }}
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>

    <div class="portfolio-card__photo" :style="{ backgroundColor: bgColor }">
      <img
        ref="photoEl"
        v-show="!imgFailed"
        :src="logo"
        :alt="name"
        loading="lazy"
        draggable="false"
        :style="{ transform: `scale(${logoScale})` }"
        @error="imgFailed = true"
        @load="checkPhoto"
      />
      <div v-if="imgFailed" class="portfolio-card__photo-fallback" aria-hidden="true">{{ name }}</div>
    </div>
  </a>
</template>

<style scoped>
.portfolio-card {
  position: relative;
  display: flex;
  min-width: 0;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-bg-elevated);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  transition: border-color 0.25s ease, opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  transform: translateY(22px);
}

.portfolio-card::-webkit-scrollbar {
  display: none;
}

.portfolio-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.portfolio-card:hover,
.portfolio-card:focus-visible {
  border-color: var(--color-border-strong);
}

.portfolio-card__content,
.portfolio-card__photo {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

.portfolio-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.75rem;
}

.portfolio-card__title {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.35;
}

.portfolio-card__description {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.portfolio-card__status {
  font-size: 0.8125rem;
  font-style: italic;
  color: var(--color-text-tertiary);
}

.portfolio-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: auto;
  padding-top: 0.35rem;
}

.portfolio-card__hint {
  display: none;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

.portfolio-card__hint--touch {
  display: inline-flex;
}

.portfolio-card__photo {
  position: relative;
  box-sizing: border-box;
  padding: 2.5rem;
}

.portfolio-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.portfolio-card__photo-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-tertiary);
  background: var(--color-bg-elevated);
}

/* Mouse real: painéis empilhados, crossfade suave no hover. */
@media (hover: hover) and (pointer: fine) {
  .portfolio-card {
    display: block;
    overflow: hidden;
  }

  .portfolio-card__content {
    height: 100%;
    box-sizing: border-box;
  }

  .portfolio-card__hint--touch {
    display: none;
  }

  .portfolio-card__hint--hover {
    display: inline-flex;
  }

  .portfolio-card__content,
  .portfolio-card__photo {
    transition: opacity 0.35s ease;
  }

  .portfolio-card__photo {
    position: absolute;
    inset: 0;
    opacity: 0;
  }

  .portfolio-card:hover .portfolio-card__photo,
  .portfolio-card:focus-visible .portfolio-card__photo {
    opacity: 1;
  }

  .portfolio-card:hover .portfolio-card__content,
  .portfolio-card:focus-visible .portfolio-card__content {
    opacity: 0;
  }
}
</style>
