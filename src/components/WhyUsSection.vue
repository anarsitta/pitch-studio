<script setup>
const advantages = [
  { mark: '01', title: 'Полный цикл', desc: 'От стратегии до продакшена — всё в одной команде, без потерь на передаче между подрядчиками.' },
  { mark: '02', title: 'Яндекс и Google', desc: 'Уверенно работаем с обеими экосистемами: реклама, SEO и аналитика под алгоритмы каждой.' },
  { mark: '03', title: 'Собственная разработка', desc: 'Сайты, приложения и ПО делаем сами — быстрее запуск и полный контроль качества.' },
  { mark: '04', title: 'Видеопродакшн', desc: 'Свой продакшн и монтаж: контент для рекламы и соцсетей без внешних студий.' }
]
</script>

<template>
  <section id="why" class="why">
    <div class="why-inner">
      <div class="layout">
        <div v-reveal class="reveal intro">
          <div class="eyebrow"><span class="eyebrow-line"></span>Почему мы</div>
          <h2 class="section-title">Одна команда вместо пяти подрядчиков</h2>
          <p class="intro-text">Стратегия, трафик, разработка и продакшн живут внутри агентства. Никаких потерь на стыках — только скорость и общая ответственность за результат.</p>
        </div>
        <div class="list">
          <div v-for="a in advantages" :key="a.mark" v-reveal class="reveal item">
            <div class="item-mark">{{ a.mark }}</div>
            <div>
              <h3 class="item-title">{{ a.title }}</h3>
              <p class="item-desc">{{ a.desc }}</p>
            </div>
          </div>
        </div>
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
  padding: clamp(70px, 10vw, 120px) 24px;
}
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 48px;
  align-items: start;
}

.reveal { opacity: 0; transform: translateY(30px); }
.reveal.is-visible { opacity: 1; transform: none; }

.intro { transition: opacity .8s var(--ease-out), transform .8s var(--ease-out); }
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
  margin: 0 0 20px;
}
.intro-text {
  color: rgba(var(--c-fg-rgb), .62);
  font-size: 16.5px;
  margin: 0;
  max-width: 42ch;
  line-height: 1.6;
}

.list {
  display: grid;
  gap: 14px;
}
.item:not(.is-visible) { transform: translateY(24px); }
.item {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), border-color .3s;
  display: flex;
  gap: 18px;
  align-items: flex-start;
  padding: 22px 24px;
  border-radius: 15px;
  background: rgba(255, 255, 255, .03);
  border: 1px solid rgba(255, 255, 255, .08);
}
.item:hover { border-color: rgba(var(--c-accent-rgb), .4); }
.item-mark {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--c-accent);
  color: var(--c-bg);
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 17px;
}
.item-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.08rem;
  margin: 0 0 6px;
  letter-spacing: -.01em;
}
.item-desc {
  color: rgba(var(--c-fg-rgb), .6);
  font-size: 14.5px;
  margin: 0;
  line-height: 1.5;
}
</style>
