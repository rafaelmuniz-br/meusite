<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { preloaderPhrase, preloaderPhraseMobile } from '~/data/resume'

const STORAGE_KEY = 'rm-preloader-shown'
const TYPE_SPEED_MS = 45
const HOLD_MS = 400
const EXIT_MS = 600

const visible = ref(true)
const leaving = ref(false)
const progressActive = ref(false)
const typedLength = ref(0)

// Definido no onMounted conforme a largura da tela (mobile usa a versão Python).
const phrase = ref(preloaderPhrase)

const displayedText = computed(() => phrase.value.slice(0, typedLength.value))
const revealMs = computed(() => phrase.value.length * TYPE_SPEED_MS)

let typeTimer: ReturnType<typeof setInterval> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
let safetyTimer: ReturnType<typeof setTimeout> | undefined
let rafId: number | undefined

function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

function finish() {
  visible.value = false
  lockScroll(false)
}

onMounted(() => {
  let alreadyShown = false
  let prefersReduced = false

  try {
    if (window.matchMedia('(max-width: 768px)').matches) phrase.value = preloaderPhraseMobile
  } catch {
    /* matchMedia indisponível: mantém a frase padrão */
  }

  try {
    alreadyShown = sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    alreadyShown = false
  }

  try {
    prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    prefersReduced = false
  }

  if (alreadyShown || prefersReduced) {
    visible.value = false
    return
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* sessionStorage indisponível: preloader roda mesmo assim */
  }

  lockScroll(true)

  rafId = requestAnimationFrame(() => {
    progressActive.value = true
  })

  typeTimer = setInterval(() => {
    typedLength.value += 1
    if (typedLength.value >= phrase.value.length && typeTimer) {
      clearInterval(typeTimer)
    }
  }, TYPE_SPEED_MS)

  const totalBeforeExit = revealMs.value + HOLD_MS
  hideTimer = setTimeout(() => {
    leaving.value = true
  }, totalBeforeExit)

  // Rede de segurança: garante que o overlay some mesmo se a transição falhar.
  safetyTimer = setTimeout(finish, totalBeforeExit + EXIT_MS + 400)
})

onBeforeUnmount(() => {
  if (typeTimer) clearInterval(typeTimer)
  if (hideTimer) clearTimeout(hideTimer)
  if (safetyTimer) clearTimeout(safetyTimer)
  if (rafId) cancelAnimationFrame(rafId)
  lockScroll(false)
})
</script>

<template>
  <div
    v-if="visible"
    class="preloader"
    :class="{ 'preloader--leaving': leaving }"
    :style="{ transitionDuration: `${EXIT_MS}ms` }"
    aria-hidden="true"
    @transitionend="leaving && finish()"
  >
    <div class="preloader__center">
      <p class="preloader__terminal">
        <span class="preloader__prompt">&gt;</span>
        <span class="preloader__code">{{ displayedText }}</span><span class="preloader__cursor"></span>
      </p>

      <div class="preloader__track">
        <div
          class="preloader__bar"
          :style="{
            width: progressActive ? '100%' : '0%',
            transitionDuration: `${revealMs}ms`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;
  padding: 2rem;
}

.preloader--leaving {
  transform: translateY(-100%);
  opacity: 0.4;
}

.preloader__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  max-width: min(92vw, 640px);
}

.preloader__terminal {
  display: flex;
  align-items: center;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: clamp(0.8rem, 4.5vw, 1.4rem);
  white-space: nowrap;
}

.preloader__prompt {
  color: var(--color-text-tertiary);
  margin-right: 0.6em;
}

.preloader__code {
  color: var(--color-text);
}

.preloader__cursor {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  margin-left: 2px;
  background: var(--color-accent);
  animation: preloader-cursor-blink 1s step-end infinite;
}

@keyframes preloader-cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.preloader__track {
  width: min(220px, 60vw);
  height: 2px;
  background: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
}

.preloader__bar {
  height: 100%;
  background: var(--color-accent);
  transition-property: width;
  transition-timing-function: linear;
  border-radius: 999px;
}
</style>
