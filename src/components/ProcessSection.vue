<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const steps = [
  { num: '01', title: 'Бриф', desc: 'Погружаемся в ваш бизнес, цели и рынок. Фиксируем метрики, по которым будем измерять результат.' },
  { num: '02', title: 'Стратегия', desc: 'Собираем медиаплан и гипотезы. Определяем каналы, бюджеты и точки роста.' },
  { num: '03', title: 'Запуск', desc: 'Запускаем кампании и продукты. Быстрый старт без потери качества.' },
  { num: '04', title: 'Аналитика', desc: 'Следим за каждой метрикой в реальном времени. Отключаем то, что не работает, усиливаем то, что приносит результат.' },
  { num: '05', title: 'Масштабирование', desc: 'Наращиваем то, что даёт прибыль, и выводим показатели на новый уровень.' }
]

// Connecting line fills as the section scrolls through the viewport.
const timeline = ref(null)
const progress = ref(0)
let raf = 0
function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const el = timeline.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    const start = vh * 0.82, end = vh * 0.4
    progress.value = Math.max(0, Math.min(1, (start - r.top) / (start - end)))
  })
}
onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { progress.value = 1; return }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="process" class="process">
    <div class="process-inner">
      <div class="section-head">
        <h2 v-reveal class="reveal section-title">Прозрачный процесс<br>от брифа до <span class="hl">масштаба</span></h2>
      </div>

      <div ref="timeline" class="timeline" :style="{ '--p': progress }">
        <div class="rail" aria-hidden="true"><div class="rail-fill"></div></div>
        <ol class="steps">
          <li
            v-for="(s, i) in steps"
            :key="s.num"
            v-reveal="i"
            class="reveal step"
            :class="{ 'is-active': progress >= i / (steps.length - 1) - 0.001 }"
          >
            <span class="dot" aria-hidden="true"></span>
            <span class="num" aria-hidden="true">{{ s.num }}</span>
            <h3 class="step-title">{{ s.title }}</h3>
            <p class="step-desc">{{ s.desc }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process {
  position: relative;
  background: linear-gradient(180deg, var(--c-bg), var(--c-bg-2));
  border-top: 1px solid rgba(255, 255, 255, .06);
  border-bottom: 1px solid rgba(255, 255, 255, .06);
}
.process-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--pad-section) 24px;
}

.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

.section-head { margin-bottom: 44px; max-width: 100%; }
.section-title {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -.03em;
  margin: 0;
  text-wrap: balance;
}

/* ---- Timeline ---- */
.timeline { position: relative; }
.rail {
  position: absolute;
  top: 7px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: rgba(255, 255, 255, .12);
  border-radius: 2px;
}
.rail-fill {
  height: 100%;
  width: calc(var(--p, 0) * 100%);
  background: var(--c-accent);
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(var(--c-accent-rgb), .55);
  transition: width .12s linear;
}
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.step {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out);
  position: relative;
  text-align: center;
}
.dot {
  display: block;
  width: 16px;
  height: 16px;
  margin: 0 auto 22px;
  border-radius: 50%;
  background: var(--c-bg);
  border: 2px solid rgba(255, 255, 255, .22);
  position: relative;
  z-index: 1;
  transition: border-color .3s var(--ease-out), background .3s var(--ease-out), box-shadow .3s var(--ease-out);
}
.step.is-active .dot {
  border-color: var(--c-accent);
  background: var(--c-accent);
  box-shadow: 0 0 14px rgba(var(--c-accent-rgb), .6);
}
.num {
  display: block;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.4px rgba(var(--c-accent-rgb), .32);
  margin-bottom: 14px;
  transition: -webkit-text-stroke-color .3s var(--ease-out);
}
.step.is-active .num { -webkit-text-stroke-color: rgba(var(--c-accent-rgb), .9); }
.step-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0 10px;
  letter-spacing: -.01em;
  transition: color .3s var(--ease-out);
}
.step.is-active .step-title { color: var(--c-accent); }
.step-desc {
  color: rgba(var(--c-fg-rgb), .68);
  font-size: 15px;
  margin: 0;
  line-height: 1.55;
  max-width: 28ch;
  margin-inline: auto;
}

/* ---- Mobile: vertical timeline ---- */
@media (max-width: 767px) {
  .rail {
    top: 8px;
    bottom: 34px;
    left: 7px;
    right: auto;
    width: 2px;
    height: auto;
  }
  .rail-fill {
    width: 100%;
    height: calc(var(--p, 0) * 100%);
    transition: height .12s linear;
  }
  .steps {
    grid-template-columns: auto 1fr;
    gap: 4px 20px;
    align-items: start;
  }
  .step {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    text-align: left;
    padding-bottom: 26px;
  }
  .dot { margin: 0; grid-column: 1; }
  .num { grid-column: 2; margin: -4px 0 8px; text-align: left; }
  .step-title { grid-column: 2; }
  .step-desc { grid-column: 2; margin-inline: 0; max-width: none; }
}
</style>
