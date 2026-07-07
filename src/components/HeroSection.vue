<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const words = ['рост', 'продажи', 'охваты', 'заявки', 'узнаваемость']
const rotWord = ref(words[0])
let index = 0
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    index = (index + 1) % words.length
    rotWord.value = words[index]
  }, 2200)
})
onUnmounted(() => clearInterval(timer))

const keywords = ['Таргет', 'Контекст', 'SMM', 'Мессенджеры', 'SEO', 'GEO-аналитика', 'Разработка', 'Приложения', 'Видеопродакшн', 'Брендинг', 'PR']

const stats = [
  { value: '6', label: 'направлений<br>под одной крышей' },
  { value: 'Я+G', label: 'работаем с Яндекс<br>и Google' },
  { value: '360°', label: 'полный цикл<br>от идеи до масштаба' }
]
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-glow" aria-hidden="true"></div>

    <div class="hero-inner">
      <div v-reveal class="reveal badge">
        <span class="badge-dot"></span>
        Маркетинговое агентство полного цикла
      </div>

      <h1 v-reveal class="reveal d1 hero-title">
        Превращаем внимание рынка в&nbsp;<span class="rot-word">{{ rotWord }}</span>
      </h1>

      <p v-reveal class="reveal d2 hero-lead">
        Реклама, соцсети, разработка, SEO и видеопродакшн — под одной крышей. Мы отвечаем за измеримый результат: рост охватов, снижение стоимости клиента и продажи, которые видно в цифрах.
      </p>

      <div v-reveal class="reveal d3 hero-ctas">
        <a href="#contact" class="btn-primary">
          Обсудить проект
          <span class="btn-arrow">→</span>
        </a>
        <a href="#services" class="btn-ghost">
          Смотреть услуги
        </a>
      </div>

      <div v-reveal class="reveal d4 hero-stats">
        <template v-for="(stat, i) in stats" :key="stat.value">
          <div v-if="i > 0" class="stat-divider"></div>
          <div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label" v-html="stat.label"></div>
          </div>
        </template>
      </div>
    </div>

    <!-- MARQUEE -->
    <div class="marquee">
      <div class="marquee-track">
        <div v-for="n in 2" :key="n" class="marquee-strip">
          <template v-for="(word, i) in keywords" :key="i">
            <span class="marquee-dot"></span>
            <span class="marquee-word">{{ word }}</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 6%, rgba(var(--c-accent-rgb), .16), transparent 42%),
    radial-gradient(circle at 6% 90%, rgba(var(--c-accent-rgb), .07), transparent 40%),
    var(--c-bg);
}
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 30%, #000 30%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 30%, #000 30%, transparent 78%);
  pointer-events: none;
}
.hero-glow {
  position: absolute;
  top: -140px;
  right: -120px;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--c-accent-rgb), .28), transparent 62%);
  filter: blur(30px);
  animation: pitchGlow 7s ease-in-out infinite;
  pointer-events: none;
}
.hero-inner {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(70px, 11vw, 140px) 24px clamp(56px, 8vw, 96px);
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.reveal.is-visible { opacity: 1; transform: none; }
.d1 { transition-delay: .08s; }
.d2 { transition-delay: .16s; }
.d3 { transition-delay: .24s; }
.d4 { transition-delay: .32s; }

.badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 15px;
  border: 1px solid rgba(var(--c-accent-rgb), .35);
  border-radius: 999px;
  background: rgba(var(--c-accent-rgb), .06);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: .02em;
  color: var(--c-accent);
  margin-bottom: 30px;
}
.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-accent);
  animation: pitchBlink 1.6s ease-in-out infinite;
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.5rem, 7.6vw, 6rem);
  line-height: .98;
  letter-spacing: -.03em;
  margin: 0 0 26px;
  max-width: 16ch;
  text-wrap: balance;
}
.rot-word {
  color: var(--c-accent);
  position: relative;
  display: inline-block;
  min-width: 4ch;
}

.hero-lead {
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  color: rgba(var(--c-fg-rgb), .68);
  max-width: 56ch;
  margin: 0 0 40px;
  line-height: 1.55;
}

.hero-ctas {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
}
.btn-primary {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--c-accent);
  color: var(--c-bg);
  font-weight: 700;
  font-size: 17px;
  padding: 16px 28px;
  border-radius: 13px;
  transition: transform .2s, box-shadow .2s;
  box-shadow: 0 8px 30px rgba(var(--c-accent-rgb), .22);
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 44px rgba(var(--c-accent-rgb), .4);
}
.btn-arrow { font-size: 19px; line-height: 1; }
.btn-ghost {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: var(--c-fg);
  font-weight: 600;
  font-size: 17px;
  padding: 16px 26px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, .16);
  transition: border-color .2s, background .2s;
}
.btn-ghost:hover {
  border-color: rgba(var(--c-accent-rgb), .5);
  background: rgba(var(--c-accent-rgb), .05);
}

.hero-stats {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 56px;
}
.stat-divider { width: 1px; background: rgba(255, 255, 255, .1); }
.stat-value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: var(--c-accent);
  line-height: 1;
}
.stat-label {
  color: rgba(var(--c-fg-rgb), .55);
  font-size: 14.5px;
  margin-top: 6px;
  font-weight: 500;
}

.marquee {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, .07);
  border-bottom: 1px solid rgba(255, 255, 255, .07);
  padding: 18px 0;
  overflow: hidden;
  background: rgba(255, 255, 255, .012);
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: pitchMarquee 32s linear infinite;
}
.marquee-strip {
  display: flex;
  align-items: center;
}
.marquee-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-accent);
  margin: 0 28px;
  flex-shrink: 0;
}
.marquee-word {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1rem, 2.4vw, 1.5rem);
  color: rgba(var(--c-fg-rgb), .82);
  white-space: nowrap;
  letter-spacing: -.01em;
}
</style>
