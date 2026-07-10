<script setup>
// Feature section: a full-width header (heading + lead) above a 2x2 bento
// grid of four tall cards. Each card carries an outlined index number that
// fills with lime on hover. Card texts are the agency's core advantages,
// kept verbatim.
const features = [
  {
    num: '01',
    title: 'Полный цикл',
    desc: 'От стратегии до продакшена — всё в одной команде, без потерь на передаче между подрядчиками.'
  },
  {
    num: '02',
    title: 'Яндекс и Google',
    desc: 'Уверенно работаем с обеими экосистемами: реклама, SEO и аналитика под алгоритмы каждой.'
  },
  {
    num: '03',
    title: 'Собственная разработка',
    desc: 'Сайты, приложения и ПО делаем сами — быстрее запуск и полный контроль качества.'
  },
  {
    num: '04',
    title: 'Видеопродакшн',
    desc: 'Свой продакшн и монтаж: контент для рекламы и соцсетей без внешних студий.'
  }
]
</script>

<template>
  <section id="why" class="why">
    <div class="why-inner">
      <header v-reveal class="reveal head">
        <h2 class="section-title">Одна <span class="hl">команда</span> вместо пяти подрядчиков</h2>
        <p class="intro-text">Стратегия, трафик, разработка и продакшн живут внутри агентства. Никаких потерь на стыках — только скорость и общая ответственность за результат.</p>
      </header>

      <div class="grid">
        <article
          v-for="(f, i) in features"
          :key="f.num"
          v-reveal="i"
          class="reveal card"
        >
          <span class="card-num" aria-hidden="true">{{ f.num }}</span>
          <div class="card-foot">
            <h3 class="card-title">{{ f.title }}</h3>
            <p class="card-desc">{{ f.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 90% 100%, rgba(var(--c-accent-rgb), .1), transparent 45%),
    var(--c-bg-2);
  border-top: 1px solid rgba(255, 255, 255, .06);
}
.why-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: var(--pad-section) 24px;
}

.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }
.reveal { transition: opacity .8s var(--ease-out), transform .8s var(--ease-out); }

/* ---- Full-width header: heading left, lead right ---- */
.head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(24px, 5vw, 72px);
  align-items: end;
  margin-bottom: var(--space-head);
}
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-headline);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-display);
  margin: 0;
  text-wrap: balance;
}
.intro-text {
  color: rgba(var(--c-fg-rgb), .62);
  font-size: var(--fs-md);
  margin: 0;
  max-width: 50ch;
  line-height: var(--lh-relaxed);
  text-wrap: pretty;
}

/* ---- Bento 2x2 grid ---- */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}
.card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: clamp(260px, 26vw, 300px);
  padding: clamp(26px, 3vw, 36px);
  border-radius: var(--r-xl);
  background: rgba(255, 255, 255, .025);
  border: 1px solid rgba(255, 255, 255, .08);
  transition:
    opacity .8s var(--ease-out),
    transform .8s var(--ease-out),
    background .3s var(--ease-out),
    border-color .3s var(--ease-out);
}
/* Faint lime wash in the number corner (top-left). */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 14% 12%, rgba(var(--c-accent-rgb), .05), transparent 42%);
  pointer-events: none;
}
.card:hover {
  background: var(--c-card-deep);
  border-color: rgba(var(--c-accent-rgb), .35);
}

.card-num {
  position: relative;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(4.5rem, 6vw, 5rem);
  line-height: .9;
  letter-spacing: -.04em;
  /* Faint solid fill (not a hollow outline): -webkit-text-stroke traced every
     inner counter, so hollow digits showed their counters as stray triangles
     and lines ("4", "1", "0"). A soft lime fill reads the same at a glance but
     stays a clean numeral; it brightens to full lime on hover. */
  color: rgba(var(--c-accent-rgb), .2);
  transition: color .3s var(--ease-out);
}
.card:hover .card-num {
  color: var(--c-accent);
}

.card-foot {
  position: relative;
  margin-top: auto;
}
.card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.35rem, 1.9vw, 1.5rem);
  margin: 0 0 10px;
  letter-spacing: -.01em;
}
.card-desc {
  color: rgba(var(--c-fg-rgb), .62);
  font-size: var(--fs-base);
  margin: 0;
  line-height: var(--lh-body);
  text-wrap: pretty;
  max-width: 42ch;
}

/* Header stacks, then the grid collapses to one column. */
@media (max-width: 860px) {
  .head { grid-template-columns: 1fr; align-items: start; gap: 18px; }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
