<script setup>
import { onMounted, onUnmounted } from 'vue'

const cases = [
  { prefix: '+', to: 312, suffix: '%', metric: 'Рост охватов за 3 месяца', client: 'Бренд товаров для дома', tags: ['Таргет', 'SMM'] },
  { prefix: '−', to: 41, suffix: '%', metric: 'Снижение стоимости лида', client: 'Онлайн-школа профессий', tags: ['Контекст', 'Посадочные'] },
  { prefix: '', to: 480, suffix: '%', metric: 'ROI performance-кампаний', client: 'B2B-сервис автоматизации', tags: ['Performance', 'SEO'] },
  { prefix: '', to: 1.2, suffix: ' млн', metric: 'Просмотров видеокампании', client: 'Сеть локального ритейла', tags: ['Видео', 'Посевы'] }
]

const countEls = []
const setCountEl = (el) => { if (el) countEls.push(el) }
let io = null

function countUp(el) {
  const to = parseFloat(el.dataset.to)
  const dur = 1500
  const start = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - t, 3)
    el.textContent = Math.round(to * e).toLocaleString('ru-RU')
    if (t < 1) requestAnimationFrame(step)
    else el.textContent = to.toLocaleString('ru-RU')
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target)
        io.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })
  countEls.forEach((el) => io.observe(el))
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <section id="cases" class="cases">
    <div v-reveal class="reveal section-head">
      <div class="eyebrow"><span class="eyebrow-line"></span>Кейсы и результаты</div>
      <h2 class="section-title">Считаем результат в деньгах, а не в лайках</h2>
    </div>

    <div class="grid">
      <div v-for="c in cases" :key="c.metric" v-reveal class="reveal card">
        <div class="card-figure">
          <span>{{ c.prefix }}</span><span :ref="setCountEl" :data-to="c.to">0</span><span>{{ c.suffix }}</span>
        </div>
        <div class="card-metric">{{ c.metric }}</div>
        <p class="card-client">{{ c.client }}</p>
        <div class="card-tags">
          <span v-for="tag in c.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <p v-reveal class="reveal footnote">* Показатели приведены как обобщённые примеры проектов и служат иллюстрацией подхода.</p>
  </section>
</template>

<style scoped>
.cases {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(70px, 10vw, 120px) 24px;
}

.reveal { opacity: 0; transform: translateY(30px); }
.reveal.is-visible { opacity: 1; transform: none; }

.section-head {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
  margin-bottom: 52px;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--c-accent);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.eyebrow-line { width: 22px; height: 2px; background: var(--c-accent); }
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -.03em;
  margin: 0;
  max-width: 18ch;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 18px;
}
.card {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), border-color .3s;
  padding: 30px 26px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .035), rgba(255, 255, 255, .012));
  border: 1px solid rgba(255, 255, 255, .08);
}
.card:hover {
  border-color: rgba(var(--c-accent-rgb), .4);
  transform: translateY(-5px);
}
.card-figure {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--c-accent);
  letter-spacing: -.02em;
  line-height: 1;
  font-size: clamp(2.4rem, 5vw, 3.2rem);
}
.card-metric {
  font-weight: 700;
  font-size: 16px;
  margin: 16px 0 6px;
}
.card-client {
  color: rgba(var(--c-fg-rgb), .58);
  font-size: 14.5px;
  margin: 0 0 18px;
  line-height: 1.5;
}
.card-tags {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}
.tag {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(var(--c-fg-rgb), .7);
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .12);
}

.footnote {
  transform: translateY(20px);
  transition: opacity .7s ease, transform .7s ease;
  color: rgba(var(--c-fg-rgb), .4);
  font-size: 13px;
  margin: 26px 0 0;
}
</style>
