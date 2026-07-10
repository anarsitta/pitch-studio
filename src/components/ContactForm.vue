<script setup>
import { ref, nextTick } from 'vue'

const fName = ref('')
const fContact = ref('')
const fTask = ref('')
const errName = ref('')
const errContact = ref('')
const sent = ref(false)
const sentName = ref('')
const submitting = ref(false)
const serverError = ref('')
const successTitle = ref(null)
const nameInput = ref(null)
const contactInput = ref(null)

// A callable contact: a phone with enough digits, OR a messenger/handle/email
// (anything with letters). Kept deliberately lenient so we don't reject valid
// leads — it only catches obvious junk like a half-typed "1234".
function isValidContact(v) {
  const s = v.trim()
  if (s.length < 3) return false
  const digits = s.replace(/\D/g, '').length
  const looksNumeric = /^[+\d\s()\-.]+$/.test(s)
  if (looksNumeric) return digits >= 10
  return /[a-zA-Zа-яА-Я]/.test(s)
}

function validate() {
  errName.value = fName.value.trim().length < 2 ? 'Пожалуйста, укажите имя' : ''
  errContact.value = isValidContact(fContact.value) ? '' : 'Укажите телефон (от 10 цифр) или ник в мессенджере'
  return !errName.value && !errContact.value
}

async function onSubmit() {
  if (submitting.value) return
  serverError.value = ''
  if (!validate()) {
    // Move focus to the first invalid field so keyboard/AT users find the error.
    await nextTick()
    if (errName.value) nameInput.value?.focus()
    else if (errContact.value) contactInput.value?.focus()
    return
  }
  submitting.value = true
  try {
    await sendLead({ name: fName.value.trim(), contact: fContact.value.trim(), task: fTask.value.trim() })
    sentName.value = fName.value.trim()
    sent.value = true
    // Move focus to the confirmation so keyboard/screen-reader users land on it.
    nextTick(() => successTitle.value?.focus())
  } catch {
    serverError.value = 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.'
  } finally {
    submitting.value = false
  }
}

// Placeholder network call — resolves after a short delay so the pending and
// error states are real. Replace the body with a POST to your backend / CRM.
function sendLead(payload) {
  return new Promise((resolve) => setTimeout(resolve, 900))
}

function reset() {
  sent.value = false
  fName.value = ''
  fContact.value = ''
  fTask.value = ''
  sentName.value = ''
  serverError.value = ''
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <div class="layout">
        <!-- Left: oversized headline, lead, tappable contact rows -->
        <div v-reveal="0" class="reveal info">
          <h2 class="title">Обсудим ваш <span class="hl">проект</span>?</h2>
          <p class="lead">Расскажите о задаче — вернёмся с планом и оценкой в течение рабочего дня. Без обязательств и навязчивых звонков.</p>
          <!-- STUB: замените на реальные контакты перед запуском -->
          <div class="channels">
            <a href="tel:+74951234567" class="channel">
              <span class="channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <span class="channel-body">
                <span class="channel-label">Позвонить</span>
                <span class="channel-value">+7 (495) 123-45-67</span>
              </span>
            </a>
            <a href="mailto:hello@pitchstudio.ru" class="channel">
              <span class="channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 6L2 7"/>
                </svg>
              </span>
              <span class="channel-body">
                <span class="channel-label">Написать</span>
                <span class="channel-value">hello@pitchstudio.ru</span>
              </span>
            </a>
          </div>
        </div>

        <!-- Right: elevated form card with lime glow -->
        <div v-reveal="1" class="reveal form-col">
          <div class="form-glow" aria-hidden="true"></div>

          <div v-if="sent" class="card success" role="status">
            <div class="success-mark" aria-hidden="true">✓</div>
            <h3 ref="successTitle" tabindex="-1" class="success-title">Заявка принята!</h3>
            <p class="success-text">Спасибо, {{ sentName }}. Мы свяжемся с вами в течение рабочего дня.</p>
            <button type="button" class="success-reset" @click="reset">Отправить ещё одну</button>
          </div>

          <form v-else class="card form" novalidate @submit.prevent="onSubmit">
            <div>
              <label class="label" for="cf-name">Как вас зовут *</label>
              <input
                id="cf-name"
                ref="nameInput"
                v-model="fName"
                type="text"
                autocomplete="name"
                placeholder="Иван Петров"
                class="input"
                :class="{ 'has-error': errName }"
                aria-required="true"
                :aria-invalid="errName ? 'true' : 'false'"
                :aria-describedby="errName ? 'cf-name-err' : undefined"
                @input="errName = ''"
              />
              <div v-if="errName" id="cf-name-err" class="field-error" role="alert">{{ errName }}</div>
            </div>
            <div>
              <label class="label" for="cf-contact">Телефон или мессенджер *</label>
              <input
                id="cf-contact"
                ref="contactInput"
                v-model="fContact"
                type="text"
                autocomplete="tel"
                placeholder="+7 999 000-00-00 или @telegram"
                class="input"
                :class="{ 'has-error': errContact }"
                aria-required="true"
                :aria-invalid="errContact ? 'true' : 'false'"
                :aria-describedby="errContact ? 'cf-contact-err' : undefined"
                @input="errContact = ''"
              />
              <div v-if="errContact" id="cf-contact-err" class="field-error" role="alert">{{ errContact }}</div>
            </div>
            <div>
              <label class="label" for="cf-task">Опишите задачу</label>
              <textarea
                id="cf-task"
                v-model="fTask"
                rows="3"
                placeholder="Что хотите продвигать и какого результата ждёте?"
                class="input textarea"
              ></textarea>
            </div>
            <button type="submit" class="submit" :disabled="submitting" :aria-busy="submitting">
              <template v-if="submitting"><span class="spinner" aria-hidden="true"></span> Отправляем…</template>
              <template v-else>Отправить заявку <span class="submit-arrow" aria-hidden="true">→</span></template>
            </button>
            <p v-if="serverError" class="server-error" role="alert">{{ serverError }}</p>
            <p class="consent">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 0%, rgba(var(--c-accent-rgb), .1), transparent 46%),
    var(--c-bg);
  border-top: 1px solid rgba(255, 255, 255, .06);
}
.contact-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--pad-section) 24px;
}
.layout {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, .95fr);
  gap: var(--space-gutter);
  align-items: center;
}

.reveal {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

/* ---- Left column ---- */
.title {
  font-family: var(--font-display);
  font-weight: 800;
  /* Oversized display headline, ~80px cap. */
  font-size: clamp(2.6rem, 6.2vw, 5rem);
  line-height: 1;
  letter-spacing: -.035em;
  margin: 0 0 22px;
  text-wrap: balance;
}
.lead {
  color: rgba(var(--c-fg-rgb), .66);
  font-size: var(--fs-lg);
  margin: 0 0 36px;
  max-width: 42ch;
  line-height: var(--lh-relaxed);
  text-wrap: pretty;
}
.channels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.channel {
  text-decoration: none;
  color: var(--c-fg);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: var(--r-md);
  border: 1px solid rgba(255, 255, 255, .08);
  background: rgba(255, 255, 255, .02);
  transition: border-color .25s var(--ease-out), background .25s var(--ease-out), transform .2s var(--ease-out);
}
.channel:hover {
  border-color: rgba(var(--c-accent-rgb), .45);
  background: rgba(var(--c-accent-rgb), .05);
  transform: translateY(-2px);
}
.channel-icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: var(--r-field);
  background: rgba(var(--c-accent-rgb), .1);
  border: 1px solid rgba(var(--c-accent-rgb), .25);
  display: grid;
  place-items: center;
  color: var(--c-accent);
}
.channel-icon svg { width: 22px; height: 22px; }
.channel-body { display: flex; flex-direction: column; gap: 2px; }
.channel-label {
  font-size: var(--fs-2xs);
  font-weight: 500;
  letter-spacing: .04em;
  text-transform: uppercase;
  /* .6 (≈6.8:1) clears the DESIGN.md 55% floor for this small tracked-caps label. */
  color: rgba(var(--c-fg-rgb), .6);
}
.channel-value { font-weight: 600; font-size: var(--fs-lg); }

/* ---- Right column: elevated card + glow ---- */
.form-col { position: relative; }
.form-glow {
  position: absolute;
  inset: 8% 6%;
  border-radius: var(--r-panel);
  background: radial-gradient(circle at 70% 20%, rgba(var(--c-accent-rgb), .28), transparent 62%);
  filter: blur(46px);
  opacity: .55;
  pointer-events: none;
  animation: pitchGlow 8s ease-in-out infinite;
}
.card {
  position: relative;
  border-radius: var(--r-xl);
  background: var(--c-card-deep);
  border: 1px solid rgba(255, 255, 255, .09);
  box-shadow: 0 30px 80px rgba(0, 0, 0, .45), 0 0 0 1px rgba(var(--c-accent-rgb), .04);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(26px, 3.4vw, 38px);
}
.label {
  display: block;
  font-size: var(--fs-xs);
  font-weight: 600;
  color: rgba(var(--c-fg-rgb), .7);
  margin-bottom: 8px;
}
.input {
  width: 100%;
  background: rgba(0, 0, 0, .28);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: var(--r-field);
  padding: 14px 16px;
  color: var(--c-fg);
  font-family: var(--font-body);
  font-size: var(--fs-md);
  outline: none;
  transition: border-color .2s var(--ease-out), box-shadow .2s var(--ease-out);
}
.input::placeholder { color: var(--c-fg-faint); }
.input.has-error { border-color: var(--c-error); }
.input:focus {
  border-color: var(--c-accent);
  box-shadow: 0 0 0 3px rgba(var(--c-accent-rgb), .18);
}
.textarea {
  resize: vertical;
  min-height: 88px;
}
.field-error {
  color: var(--c-error);
  font-size: var(--fs-xs);
  margin-top: 7px;
  font-weight: 500;
}
.submit {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--c-accent);
  color: var(--c-bg);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: var(--fs-lg);
  padding: 17px;
  border: none;
  border-radius: var(--r-md);
  cursor: pointer;
  transition: transform .2s var(--ease-out), box-shadow .2s var(--ease-out);
  box-shadow: 0 8px 26px rgba(var(--c-accent-rgb), .22);
}
.submit-arrow { font-size: 19px; line-height: 1; transition: transform .2s var(--ease-out); }
.submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(var(--c-accent-rgb), .38);
}
.submit:hover .submit-arrow { transform: translateX(4px); }
.submit:active {
  transform: translateY(0);
  box-shadow: 0 4px 16px rgba(var(--c-accent-rgb), .3);
}
.submit:disabled {
  cursor: default;
  opacity: .8;
  transform: none;
  box-shadow: 0 4px 16px rgba(var(--c-accent-rgb), .18);
}
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: -3px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--c-bg) 30%, transparent);
  border-top-color: var(--c-bg);
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.server-error {
  color: var(--c-error);
  font-size: var(--fs-xs);
  font-weight: 500;
  margin: 2px 0 0;
  text-align: center;
}
.consent {
  color: var(--c-fg-faint);
  font-size: var(--fs-2xs);
  margin: 2px 0 0;
  text-align: center;
}

/* ---- Success state ---- */
.success {
  padding: 44px 34px;
  text-align: center;
}
.success-mark {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: var(--c-accent);
  color: var(--c-bg);
  display: grid;
  place-items: center;
  font-size: 32px;
  font-weight: 800;
}
.success-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0 0 10px;
}
.success-text {
  color: rgba(var(--c-fg-rgb), .68);
  margin: 0;
  font-size: var(--fs-base);
  line-height: var(--lh-body);
  text-wrap: pretty;
}
.success-reset {
  margin-top: 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, .18);
  color: var(--c-fg);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--fs-base);
  padding: 11px 22px;
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: border-color .2s var(--ease-out);
}
.success-reset:hover { border-color: rgba(var(--c-accent-rgb), .5); }

/* Stack columns on narrow viewports. */
@media (max-width: 860px) {
  .layout { grid-template-columns: 1fr; gap: 44px; }
}
</style>
