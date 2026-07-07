<script setup>
// Honest "how we measure" section. We report on business metrics from day one,
// in the client's money — not vanity numbers. The KPI abbreviations carry the
// display-number energy without inventing case results we can't verify.
const metrics = [
  { key: 'CPL · CAC', name: 'Стоимость заявки и клиента', note: 'Сколько стоит обращение и оплативший клиент — и как мы снижаем это от недели к неделе.' },
  { key: 'ROAS · ДРР', name: 'Возврат на рекламу', note: 'Доля рекламных расходов и окупаемость: сколько выручки приносит каждый вложенный рубль.' },
  { key: 'CR', name: 'Конверсия сайта и посадочных', note: 'Где посетители теряются в воронке и что мы меняем, чтобы их удержать.' },
  { key: 'Reach', name: 'Охват и стоимость контакта', note: 'Сколько людей увидели вас и по какой цене — с динамикой, а не «средней за период».' }
]
</script>

<template>
  <section id="cases" class="cases">
    <div class="layout">
      <div v-reveal class="reveal info">
        <h2 class="section-title">Считаем результат в <span class="hl">деньгах</span>, а не в лайках</h2>
        <p class="lead">Отчитываемся бизнес-метриками с первого дня и на языке вашей выручки. Прозрачный дашборд, еженедельный разбор и решения по цифрам — без «лайков ради лайков».</p>
        <p class="reassure">Метрики согласуем на старте: вы всегда знаете, за что платите и что это принесло.</p>
      </div>

      <ul class="metrics">
        <li v-for="(m, i) in metrics" :key="m.key" v-reveal="i" class="reveal metric">
          <div class="metric-key">{{ m.key }}</div>
          <div class="metric-body">
            <h3 class="metric-name">{{ m.name }}</h3>
            <p class="metric-note">{{ m.note }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cases {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(70px, 10vw, 120px) 24px;
}
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(40px, 6vw, 72px);
  align-items: start;
}

.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

.info { transition: opacity .8s var(--ease-out), transform .8s var(--ease-out); }
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -.03em;
  margin: 0 0 20px;
  max-width: 16ch;
  text-wrap: balance;
}
.lead {
  color: rgba(var(--c-fg-rgb), .66);
  font-size: 16.5px;
  margin: 0 0 18px;
  max-width: 44ch;
  line-height: 1.6;
}
.reassure {
  color: var(--c-accent);
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  max-width: 40ch;
  line-height: 1.5;
}

.metrics {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.metric {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out);
  display: grid;
  grid-template-columns: minmax(96px, 128px) 1fr;
  gap: clamp(16px, 3vw, 32px);
  align-items: baseline;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
}
.metric:first-child { padding-top: 0; }
.metric:last-child { border-bottom: none; padding-bottom: 0; }
.metric-key {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  letter-spacing: -.02em;
  line-height: 1;
  color: var(--c-accent);
  white-space: nowrap;
}
.metric-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.12rem;
  letter-spacing: -.01em;
  margin: 0 0 7px;
  line-height: 1.2;
}
.metric-note {
  color: rgba(var(--c-fg-rgb), .6);
  font-size: 14.5px;
  margin: 0;
  line-height: 1.55;
  max-width: 46ch;
}

@media (max-width: 520px) {
  .metric {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
