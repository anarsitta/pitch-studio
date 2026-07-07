<script setup>
const steps = [
  { num: '01', title: 'Бриф', desc: 'Погружаемся в ваш бизнес, цели и рынок. Фиксируем метрики, по которым будем измерять результат.' },
  { num: '02', title: 'Стратегия', desc: 'Собираем медиаплан и гипотезы. Определяем каналы, бюджеты и точки роста.' },
  { num: '03', title: 'Запуск', desc: 'Запускаем кампании и продукты. Быстрый старт без потери качества.' },
  { num: '04', title: 'Аналитика', desc: 'Следим за каждой метрикой в реальном времени. Отключаем то, что не работает, усиливаем то, что приносит результат.' },
  { num: '05', title: 'Масштабирование', desc: 'Наращиваем то, что даёт прибыль, и выводим показатели на новый уровень.' }
]
</script>

<template>
  <section id="process" class="process">
    <div class="process-inner">
      <div v-reveal class="reveal section-head">
        <h2 class="section-title">Прозрачный процесс от брифа до <span class="hl">масштаба</span></h2>
      </div>

      <div class="grid">
        <div v-for="(step, i) in steps" :key="step.num" v-reveal="i" class="reveal step">
          <div class="step-num">{{ step.num }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>
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
  padding: clamp(70px, 10vw, 120px) 24px;
}

.reveal.is-armed { opacity: 0; transform: translateY(30px); }
.reveal.is-armed.is-visible { opacity: 1; transform: none; }

.section-head {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
  margin-bottom: 56px;
  max-width: 44ch;
}
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -.03em;
  margin: 0;
  text-wrap: balance;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
}
.step {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out);
  position: relative;
  padding: 26px 22px;
  border-radius: 16px;
  background: rgba(255, 255, 255, .025);
  border: 1px solid rgba(255, 255, 255, .08);
}
.step-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.4px rgba(var(--c-accent-rgb), .55);
  margin-bottom: 18px;
}
.step-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.12rem;
  margin: 0 0 10px;
  letter-spacing: -.01em;
}
.step-desc {
  color: rgba(var(--c-fg-rgb), .6);
  font-size: 14.5px;
  margin: 0;
  line-height: 1.5;
}
</style>
