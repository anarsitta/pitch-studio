<script setup>
import { ref } from 'vue'

const fName = ref('')
const fContact = ref('')
const fTask = ref('')
const errName = ref('')
const errContact = ref('')
const sent = ref(false)
const sentName = ref('')

function validate() {
  errName.value = fName.value.trim().length < 2 ? 'Пожалуйста, укажите имя' : ''
  errContact.value = fContact.value.trim().length < 4 ? 'Укажите телефон или мессенджер для связи' : ''
  return !errName.value && !errContact.value
}

function onSubmit() {
  if (validate()) {
    sentName.value = fName.value.trim()
    sent.value = true
  }
}

function reset() {
  sent.value = false
  fName.value = ''
  fContact.value = ''
  fTask.value = ''
  sentName.value = ''
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="panel">
      <div class="panel-glow" aria-hidden="true"></div>
      <div class="layout">
        <div v-reveal class="reveal info">
          <h2 class="title">Обсудим ваш проект?</h2>
          <p class="lead">Расскажите о задаче — вернёмся с планом и оценкой в течение рабочего дня. Без обязательств и навязчивых звонков.</p>
          <div class="channels">
            <a href="tel:+70000000000" class="channel">
              <span class="channel-icon channel-icon--phone">✆</span>
              +7 (000) 000-00-00
            </a>
            <a href="mailto:hello@pitch.studio" class="channel">
              <span class="channel-icon channel-icon--mail">@</span>
              hello@pitch.studio
            </a>
          </div>
        </div>

        <div v-reveal class="reveal d1 form-col">
          <div v-if="sent" class="success">
            <div class="success-mark">✓</div>
            <h3 class="success-title">Заявка принята!</h3>
            <p class="success-text">Спасибо, {{ sentName }}. Мы свяжемся с вами в течение рабочего дня.</p>
            <button type="button" class="success-reset" @click="reset">Отправить ещё одну</button>
          </div>

          <form v-else class="form" novalidate @submit.prevent="onSubmit">
            <div>
              <label class="label">Как вас зовут *</label>
              <input
                v-model="fName"
                type="text"
                placeholder="Иван Петров"
                class="input"
                :class="{ 'has-error': errName }"
                @input="errName = ''"
              />
              <div v-if="errName" class="field-error">{{ errName }}</div>
            </div>
            <div>
              <label class="label">Телефон или мессенджер *</label>
              <input
                v-model="fContact"
                type="text"
                placeholder="+7 999 000-00-00 или @telegram"
                class="input"
                :class="{ 'has-error': errContact }"
                @input="errContact = ''"
              />
              <div v-if="errContact" class="field-error">{{ errContact }}</div>
            </div>
            <div>
              <label class="label">Опишите задачу</label>
              <textarea
                v-model="fTask"
                rows="3"
                placeholder="Что хотите продвигать и какого результата ждёте?"
                class="input textarea"
              ></textarea>
            </div>
            <button type="submit" class="submit">Отправить заявку →</button>
            <p class="consent">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(70px, 10vw, 120px) 24px;
}
.panel {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(circle at 85% 0%, rgba(var(--c-accent-rgb), .18), transparent 50%),
    linear-gradient(180deg, var(--c-card-deep), var(--c-bg-2));
  border: 1px solid rgba(255, 255, 255, .09);
  padding: clamp(36px, 6vw, 72px);
}
.panel-glow {
  position: absolute;
  top: -90px;
  right: -90px;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--c-accent-rgb), .22), transparent 62%);
  filter: blur(30px);
  animation: pitchGlow 8s ease-in-out infinite;
  pointer-events: none;
}
.layout {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 48px;
  align-items: center;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.reveal.is-visible { opacity: 1; transform: none; }
.d1 { transition-delay: .1s; }

.title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2rem, 4.8vw, 3.5rem);
  line-height: 1;
  letter-spacing: -.03em;
  margin: 0 0 20px;
}
.lead {
  color: rgba(var(--c-fg-rgb), .66);
  font-size: 17px;
  margin: 0 0 28px;
  max-width: 40ch;
  line-height: 1.6;
}
.channels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.channel {
  text-decoration: none;
  color: var(--c-fg);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 16px;
}
.channel:hover { color: var(--c-accent); }
.channel-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(var(--c-accent-rgb), .1);
  border: 1px solid rgba(var(--c-accent-rgb), .25);
  display: grid;
  place-items: center;
  color: var(--c-accent);
}
.channel-icon--phone { font-size: 16px; }
.channel-icon--mail { font-size: 15px; }

.success {
  padding: 44px 34px;
  border-radius: 20px;
  background: rgba(var(--c-accent-rgb), .08);
  border: 1px solid rgba(var(--c-accent-rgb), .35);
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
  font-size: 15.5px;
}
.success-reset {
  margin-top: 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, .18);
  color: var(--c-fg);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 15px;
  padding: 11px 22px;
  border-radius: 11px;
  cursor: pointer;
  transition: border-color .2s;
}
.success-reset:hover { border-color: rgba(var(--c-accent-rgb), .5); }

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px 28px;
  border-radius: 20px;
  background: rgba(11, 12, 10, .5);
  border: 1px solid rgba(255, 255, 255, .1);
}
.label {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(var(--c-fg-rgb), .7);
  margin-bottom: 8px;
}
.input {
  width: 100%;
  background: rgba(255, 255, 255, .04);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--c-fg);
  font-family: var(--font-body);
  font-size: 16px;
  outline: none;
  transition: border-color .2s;
}
.input.has-error { border-color: var(--c-error); }
.input:focus { border-color: var(--c-accent); }
.textarea {
  resize: vertical;
  min-height: 88px;
}
.field-error {
  color: var(--c-error);
  font-size: 13px;
  margin-top: 7px;
  font-weight: 500;
}
.submit {
  margin-top: 4px;
  background: var(--c-accent);
  color: var(--c-bg);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 17px;
  padding: 16px;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
  box-shadow: 0 8px 26px rgba(var(--c-accent-rgb), .2);
}
.submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(var(--c-accent-rgb), .36);
}
.consent {
  color: rgba(var(--c-fg-rgb), .4);
  font-size: 12.5px;
  margin: 2px 0 0;
  text-align: center;
}
</style>
