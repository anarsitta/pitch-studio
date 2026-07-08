<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Last word of the heading rotates with a vertical flip. Kept to 4 short words
// so the huge display type never overflows the container.
const words = ['охваты', 'заявки', 'продажи', 'выручку']
const rotWord = ref(words[0])
let index = 0
let timer = null

// One switch is the WCAG 2.2.2 pause mechanism for all continuous motion
// (rotating word + marquee + ambient glows), not just hover.
const paused = ref(false)
function toggleMotion() {
  paused.value = !paused.value
  document.documentElement.classList.toggle('motion-paused', paused.value)
}

onMounted(() => {
  // Reduced motion: hold one word, no auto-updating flip.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (paused.value) return
    index = (index + 1) % words.length
    rotWord.value = words[index]
  }, 2400)
})
onUnmounted(() => {
  clearInterval(timer)
  document.documentElement.classList.remove('motion-paused')
})

const keywords = ['Таргет', 'Контекст', 'SMM', 'Мессенджеры', 'SEO', 'GEO-аналитика', 'Разработка', 'Приложения', 'Видеопродакшн', 'Брендинг', 'PR']
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-glow" aria-hidden="true"></div>

    <div class="hero-inner">
      <p v-reveal="0" class="reveal hero-overline">
        <span class="overline-dot" aria-hidden="true"></span>
        Маркетинговое агентство полного цикла
      </p>

      <h1 v-reveal="1" class="reveal hero-title">
        Превращаем внимание рынка в
        <span class="flip-wrap">
          <Transition name="flip" mode="out-in">
            <span :key="rotWord" class="rot-word">{{ rotWord }}</span>
          </Transition>
        </span>
      </h1>

      <p v-reveal="2" class="reveal hero-lead">
        Реклама, соцсети, разработка, SEO и видео — под одной крышей. Отвечаем за результат, который видно в цифрах.
      </p>

      <div v-reveal="3" class="reveal hero-ctas">
        <a href="#contact" class="btn-primary">
          Обсудить проект
          <span class="btn-arrow" aria-hidden="true">→</span>
        </a>
        <a href="#services" class="btn-ghost">Смотреть услуги</a>
      </div>

    </div>

    <!-- MARQUEE -->
    <div class="marquee" :class="{ 'is-paused': paused }">
      <div class="marquee-track">
        <div v-for="n in 2" :key="n" class="marquee-strip" :aria-hidden="n === 2 ? 'true' : undefined">
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
    radial-gradient(circle at 82% 4%, rgba(var(--c-accent-rgb), .16), transparent 44%),
    radial-gradient(circle at 4% 92%, rgba(var(--c-accent-rgb), .07), transparent 42%),
    var(--c-bg);
}
/* Subtle grid with a radial fade to the centre */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 34%, #000 26%, transparent 74%);
  -webkit-mask-image: radial-gradient(circle at 50% 34%, #000 26%, transparent 74%);
  pointer-events: none;
}
.hero-glow {
  position: absolute;
  top: -160px;
  right: -120px;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--c-accent-rgb), .26), transparent 62%);
  filter: blur(30px);
  animation: pitchGlow 7s ease-in-out infinite;
  pointer-events: none;
}
.hero-inner {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(52px, 8vw, 104px) 24px clamp(72px, 10vw, 120px);
}

.reveal {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

.hero-overline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 24px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: rgba(var(--c-fg-rgb), .6);
}
.overline-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-accent);
  flex-shrink: 0;
  animation: pitchBlink 1.6s ease-in-out infinite;
}

/* Full-width huge display heading */
.hero-title {
  font-family: var(--font-display);
  font-weight: 800;
  /* 10.5vw (not 11vw) keeps ~136px on desktop while staying overflow-safe at
     the 600-740px band, where "Превращаем" (≈8.5em) would otherwise clip. */
  font-size: clamp(2.6rem, 10.5vw, 8.5rem);
  line-height: .94;
  letter-spacing: -.035em;
  margin: 0 0 30px;
  max-width: 15ch;
  text-wrap: balance;
}
.flip-wrap {
  display: inline-flex;
  vertical-align: bottom;
  /* Fixed to the widest rotating word ("продажи" ≈ 5.95em) so the heading
     never reflows as words swap. */
  min-width: 6.1em;
  perspective: 700px;
}
.rot-word {
  display: inline-block;
  color: var(--c-accent);
}
/* Vertical flip between words */
.flip-enter-active,
.flip-leave-active {
  transition: transform .5s var(--ease-out), opacity .5s var(--ease-out);
  transform-origin: center bottom;
}
.flip-enter-from { transform: rotateX(-90deg); opacity: 0; }
.flip-leave-to { transform: rotateX(90deg); opacity: 0; }

.hero-lead {
  font-size: clamp(1.05rem, 1.7vw, 1.3rem);
  color: rgba(var(--c-fg-rgb), .68);
  max-width: 50ch;
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
  width: 44px;
  height: 44px;
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
.marquee.is-paused .marquee-toggle svg { transform: translateX(1.5px); }
@media (prefers-reduced-motion: reduce) {
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

/* Phones & small tablets: tighten side padding to 16px and size the display
   type off the viewport so the longest word ("Превращаем" ≈ 8.5em) fills the
   line without ever overflowing. At 375px this lands ~40px; caps at 48px. */
@media (max-width: 767px) {
  .hero-inner { padding-inline: 16px; }
  .hero-title {
    font-size: clamp(1.75rem, calc((100vw - 2rem) / 8.6), 3rem);
    max-width: none;
  }
}
/* Phones: buttons stack full-width, stats already wrap via flex-wrap. */
@media (max-width: 600px) {
  .hero-ctas { width: 100%; }
  .btn-primary,
  .btn-ghost { flex: 1 1 auto; justify-content: center; }
}
</style>
