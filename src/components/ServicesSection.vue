<script setup>
const icon = (inner) =>
  `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

const services = [
  {
    title: 'Таргет и контекст',
    icon: icon('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>'),
    desc: 'Настраиваем рекламу, которая приводит клиентов, а не пустые показы. Считаем каждую заявку и снижаем её стоимость от недели к неделе.'
  },
  {
    title: 'Соцсети и мессенджеры',
    icon: icon('<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.8-5.2A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 1 1 21 11.5Z"/>'),
    desc: 'Ведём соцсети и мессенджеры так, чтобы аудитория оставалась и покупала. Контент, комьюнити и продажи работают в одной связке.'
  },
  {
    title: 'Работа с инфополем',
    icon: icon('<circle cx="12" cy="12" r="2.5"/><path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13M3 3a13 13 0 0 0 0 18M21 3a13 13 0 0 1 0 18"/>'),
    desc: 'Формируем узнаваемость бренда и удерживаем внимание рынка на вас. PR, публикации и репутация, которая работает на продажи.'
  },
  {
    title: 'Разработка',
    icon: icon('<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 6l-4 12"/>'),
    desc: 'Проектируем и собираем сайты, мини-приложения, мобильные приложения (APK) и ПО. Быстрые, стабильные продукты, готовые к нагрузке.'
  },
  {
    title: 'SEO и GEO-аналитика',
    icon: icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    desc: 'Растим органический трафик в Яндексе и Google. Работаем с алгоритмами и геоданными, чтобы вас находили первыми по нужным запросам.'
  },
  {
    title: 'Видеопродакшн',
    icon: icon('<rect x="3" y="5" width="14" height="14" rx="3"/><path d="m21 8-4 4 4 4V8Z"/><path d="M8 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none"/>'),
    desc: 'Производим видео, которое досматривают: от рекламных роликов до контента для соцсетей. Идея, съёмка и монтаж под ключ.'
  }
]

// Mouse-following spotlight: write cursor position into CSS vars per card.
function spotlight(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="services" class="services">
    <div v-reveal class="reveal section-head">
      <div>
        <h2 class="section-title">Всё для <span class="hl">роста</span> бизнеса в одном месте</h2>
      </div>
      <p class="section-note">Собираем нужные направления в единую систему, где каждый канал усиливает остальные.</p>
    </div>

    <div class="bento">
      <div
        v-for="(svc, i) in services"
        :key="svc.title"
        v-reveal="i"
        class="reveal card"
        :class="{ 'card--large': i === 0 || i === 4 }"
        @mousemove="spotlight"
      >
        <div class="card-icon" v-html="svc.icon" aria-hidden="true"></div>
        <h3 class="card-title">{{ svc.title }}</h3>
        <p class="card-desc">{{ svc.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--pad-section) 24px;
}

.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

.section-head {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 44px;
}
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -.03em;
  margin: 0;
  max-width: 16ch;
  text-wrap: balance;
}
.section-note {
  color: rgba(var(--c-fg-rgb), .6);
  max-width: 34ch;
  margin: 0;
  font-size: 16px;
}

/* Bento: 4-col grid, two cards span 2 columns (large), no gaps. */
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.card {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), border-color .3s, background .3s;
  position: relative;
  padding: 30px 28px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .035), rgba(255, 255, 255, .012));
  border: 1px solid rgba(255, 255, 255, .08);
  overflow: hidden;
  isolation: isolate;
}
.card--large {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
}
.card--large .card-desc { max-width: 46ch; }

/* Interior spotlight fill that follows the cursor */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), rgba(var(--c-accent-rgb), .12), transparent 60%);
  opacity: 0;
  transition: opacity .3s var(--ease-out);
}
/* Lime border that lights up near the cursor (masked 1px ring) */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(160px circle at var(--mx, 50%) var(--my, 0%), rgba(var(--c-accent-rgb), .9), transparent 65%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity .3s var(--ease-out);
  pointer-events: none;
}
.card:hover { transform: translateY(-4px); }
.card:hover::before,
.card:hover::after { opacity: 1; }

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 13px;
  background: rgba(var(--c-accent-rgb), .12);
  border: 1px solid rgba(var(--c-accent-rgb), .28);
  display: grid;
  place-items: center;
  color: var(--c-accent);
  margin-bottom: 22px;
}
.card--large .card-icon {
  width: 58px;
  height: 58px;
}
.card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.28rem;
  letter-spacing: -.01em;
  margin: 0 0 12px;
  line-height: 1.15;
}
.card--large .card-title { font-size: 1.55rem; }
.card-desc {
  color: rgba(var(--c-fg-rgb), .62);
  font-size: 15.5px;
  margin: 0;
  line-height: 1.55;
}

@media (max-width: 899px) {
  .bento { grid-template-columns: repeat(2, 1fr); }
  .card--large { grid-column: span 2; }
}
@media (max-width: 560px) {
  .bento { grid-template-columns: 1fr; }
  .card--large { grid-column: span 1; }
  .card--large .card-title { font-size: 1.28rem; }
}
</style>
