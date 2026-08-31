<script setup lang="ts">
import { ref } from 'vue'
import { whatsappNumber } from '~/data/resume'
import { useT } from '~/composables/useT'

const t = useT()

const name = ref('')
const message = ref('')
const touched = ref(false)

function submit() {
  touched.value = true
  if (!name.value.trim() || !message.value.trim()) return

  const greeting = t('contactForm.waGreeting', { name: name.value.trim() })
  const text = `${greeting}\n\n${message.value.trim()}`
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="contato" class="contact-form" aria-labelledby="contact-title">
    <h2 id="contact-title" class="section-title">{{ t('contactForm.title') }}</h2>
    <p class="contact-form__intro">{{ t('contactForm.intro') }}</p>

    <form class="contact-form__form" novalidate @submit.prevent="submit">
      <div class="contact-form__field">
        <label for="contact-name">{{ t('contactForm.name') }}</label>
        <input
          id="contact-name"
          v-model="name"
          type="text"
          autocomplete="name"
          :aria-invalid="touched && !name.trim()"
        />
        <span v-if="touched && !name.trim()" class="contact-form__error">{{ t('contactForm.nameError') }}</span>
      </div>

      <div class="contact-form__field">
        <label for="contact-message">{{ t('contactForm.message') }}</label>
        <textarea
          id="contact-message"
          v-model="message"
          rows="4"
          :aria-invalid="touched && !message.trim()"
        />
        <span v-if="touched && !message.trim()" class="contact-form__error">{{ t('contactForm.messageError') }}</span>
      </div>

      <button type="submit" class="contact-form__submit">
        {{ t('contactForm.submit') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M17.47 14.38c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.53-.01-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.14.19 2 3.06 4.86 4.29.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z"
          />
          <path
            d="M12.02 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 1.68.44 3.28 1.24 4.68L2.5 21.5l4.95-1.3a9.46 9.46 0 0 0 4.57 1.17h.01c5.25 0 9.5-4.25 9.5-9.5s-4.25-9.37-9.51-9.37Zm0 17.28h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .78.8-2.92-.19-.3a7.86 7.86 0 0 1-1.21-4.19c0-4.36 3.55-7.9 7.91-7.9 2.11 0 4.09.82 5.59 2.32a7.86 7.86 0 0 1 2.31 5.59c0 4.36-3.55 7.89-7.88 7.89Z"
          />
        </svg>
      </button>
    </form>
  </section>
</template>

<style scoped>
.contact-form {
  scroll-margin-top: 2rem;
}

.contact-form__intro {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.75rem;
  max-width: 55ch;
}

.contact-form__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 480px;
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-form__field label {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
  letter-spacing: 0.02em;
}

.contact-form__field input,
.contact-form__field textarea {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9375rem;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.contact-form__field input:focus,
.contact-form__field textarea:focus {
  outline: none;
  border-color: var(--color-border-strong);
}

.contact-form__field input[aria-invalid='true'],
.contact-form__field textarea[aria-invalid='true'] {
  border-color: rgba(255, 255, 255, 0.4);
}

.contact-form__error {
  font-size: 0.78rem;
  color: var(--color-text-secondary);
}

.contact-form__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  align-self: flex-start;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 0.25rem;
}

.contact-form__submit:hover {
  opacity: 0.85;
}

@media (max-width: 480px) {
  .contact-form__submit {
    align-self: stretch;
  }
}
</style>
