<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { profile } from '~/data/resume'

const imgFailed = ref(false)
const photoEl = useTemplateRef<HTMLImageElement>('photoEl')

function checkPhoto() {
  const el = photoEl.value
  if (el && el.complete && el.naturalWidth === 0) imgFailed.value = true
}

onMounted(checkPhoto)
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__inner">
      <div class="sidebar__photo">
        <img
          ref="photoEl"
          v-show="!imgFailed"
          :src="profile.photo"
          :alt="profile.name"
          @error="imgFailed = true"
          @load="checkPhoto"
        />
        <div v-if="imgFailed" class="sidebar__photo-fallback" aria-hidden="true">
          {{ profile.initials }}
        </div>
      </div>

      <h1 class="sidebar__name">{{ profile.name }}</h1>

      <ContactInfo />
      <Education />
      <SidebarNav />

      <footer class="sidebar__footer">
        <NuxtLink class="sidebar__footer-link" to="/politicas-e-termos">Políticas e Termos</NuxtLink>
      </footer>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  background: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border);
  padding: 3.5rem 2.75rem;
  display: flex;
}

.sidebar__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  width: 100%;
}

.sidebar__photo {
  width: 118px;
  height: 118px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.85);
  margin-bottom: 1.75rem;
  flex-shrink: 0;
}

.sidebar__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar__photo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
}

.sidebar__name {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin-bottom: 2.25rem;
}

.sidebar__footer {
  margin-top: auto;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.78rem;
  color: var(--color-text-tertiary);
}

.sidebar__footer-link {
  color: var(--color-text-tertiary);
  transition: color 0.15s ease;
}

.sidebar__footer-link:hover,
.sidebar__footer-link:focus-visible {
  color: var(--color-text-secondary);
}

@media (max-width: 1000px) {
  .sidebar {
    padding: 3rem 2rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: 2.75rem 1.5rem 2.5rem;
  }

  .sidebar__inner {
    align-items: center;
    text-align: center;
  }

  .sidebar__photo {
    width: 104px;
    height: 104px;
    margin-bottom: 1.5rem;
  }

  .sidebar__name {
    font-size: 1.6rem;
    margin-bottom: 1.75rem;
  }

  .sidebar__footer {
    margin-top: 1.75rem;
    padding-top: 0;
    align-items: center;
  }
}
</style>
