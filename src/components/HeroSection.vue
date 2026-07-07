<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const words = ['рост', 'продажи', 'охваты', 'заявки', 'узнаваемость']
const rotWord = ref(words[0])
let index = 0
let timer = null

// One switch governs both continuous animations (marquee + rotating word) so
// keyboard and touch users have a WCAG 2.2.2 pause mechanism, not just hover.
const paused = ref(false)
function toggleMotion() {
  paused.value = !paused.value
  // Freeze every ambient CSS animation (marquee, glow, blink) too, so the
  // control genuinely stops all page movement, not just the marquee.
  document.documentElement.classList.toggle('motion-paused', paused.value)
}

onMounted(() => {
  // Reduced motion: hold a single word instead of cycling auto-updating content.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (paused.value) return
    index = (index + 1) % words.length
    rotWord.value = words[index]
  }, 2200)
})
onUnmounted(() => {
  clearInterval(timer)
  document.documentElement.classList.remove('motion-paused')
})

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
      <div v-reveal="0" class="reveal badge">
        <span class="badge-dot"></span>
        Маркетинговое агентство полного цикла
      </div>

      <h1 v-reveal="1" class="reveal hero-title">
        Превращаем внимание рынка в&nbsp;<span class="rot-word">{{ rotWord }}</span>
      </h1>

      <p v-reveal="2" class="reveal hero-lead">
        Реклама, соцсети, разработка, SEO и видеопродакшн — под одной крышей. Мы отвечаем за измеримый результат: рост охватов, снижение стоимости клиента и продажи, которые видно в цифрах.
      </p>

      <div v-reveal="3" class="reveal hero-ctas">
        <a href="#contact" class="btn-primary">
          Обсудить проект
          <span class="btn-arrow" aria-hidden="true">→</span>
        </a>
        <a href="#services" class="btn-ghost">
          Смотреть услуги
        </a>
      </div>

      <div v-reveal="4" class="reveal hero-stats">
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
    <div class="marquee" :class="{ 'is-paused': paused }">
      <div class="marquee-track">
        <div v-for="n in 2" :key="n" class="marquee-strip">
          <template v-for="(word, i) in keywords" :key="i">
            <span class="marquee-dot"></span>
            <span class="marquee-word">{{ word }}</span>
          </template>
        </div>
      </div>
      <button
        type="button"
        class="marquee-toggle"
        :aria-pressed="paused"
        :aria-label="paused ? 'Возобновить движение на странице' : 'Остановить движение на странице'"
        @click="toggleMotion"
      >
        <svg v-if="paused" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 5l12 7-12 7z" />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      </button>
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
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

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
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 16px rgba(var(--c-accent-rgb), .3);
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
.btn-ghost:active { transform: translateY(1px); }

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
.marquee:hover .marquee-track,
.marquee.is-paused .marquee-track { animation-play-state: paused; }

/* Scrim so scrolling text fades out before it reaches the pause control */
.marquee::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 96px;
  background: linear-gradient(90deg, transparent, var(--c-bg));
  pointer-events: none;
}
.marquee-toggle {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, .16);
  background: var(--c-bg);
  color: rgba(var(--c-fg-rgb), .72);
  cursor: pointer;
  transition: color .2s, border-color .2s, transform .2s;
}
.marquee-toggle:hover {
  color: var(--c-accent);
  border-color: rgba(var(--c-accent-rgb), .5);
}
.marquee-toggle:active { transform: translateY(-50%) scale(.92); }
/* Optically centre the play triangle — it reads left-heavy when geometric */
.marquee.is-paused .marquee-toggle svg { transform: translateX(1.5px); }
@media (prefers-reduced-motion: reduce) {
  /* Nothing is moving, so no pause affordance is needed. */
  .marquee-toggle, .marquee::after { display: none; }
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
