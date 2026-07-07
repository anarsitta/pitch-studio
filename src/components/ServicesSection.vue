<script setup>
const icon = (inner) =>
  `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`

const services = [
  {
    num: '01',
    title: 'Таргет и контекст',
    icon: icon('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>'),
    desc: 'Настраиваем рекламу, которая приводит клиентов, а не пустые показы. Считаем каждую заявку и снижаем её стоимость от недели к неделе.'
  },
  {
    num: '02',
    title: 'Соцсети и мессенджеры',
    icon: icon('<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.8-5.2A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 1 1 21 11.5Z"/>'),
    desc: 'Ведём соцсети и мессенджеры так, чтобы аудитория оставалась и покупала. Контент, комьюнити и продажи работают в одной связке.'
  },
  {
    num: '03',
    title: 'Работа с инфополем',
    icon: icon('<circle cx="12" cy="12" r="2.5"/><path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13M3 3a13 13 0 0 0 0 18M21 3a13 13 0 0 1 0 18"/>'),
    desc: 'Формируем узнаваемость бренда и удерживаем внимание рынка на вас. PR, публикации и репутация, которая работает на продажи.'
  },
  {
    num: '04',
    title: 'Разработка',
    icon: icon('<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 6l-4 12"/>'),
    desc: 'Проектируем и собираем сайты, мини-приложения, мобильные приложения (APK) и ПО. Быстрые, стабильные продукты, готовые к нагрузке.'
  },
  {
    num: '05',
    title: 'SEO и GEO-аналитика',
    icon: icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    desc: 'Растим органический трафик в Яндексе и Google. Работаем с алгоритмами и геоданными, чтобы вас находили первыми по нужным запросам.'
  },
  {
    num: '06',
    title: 'Видеопродакшн',
    icon: icon('<rect x="3" y="5" width="14" height="14" rx="3"/><path d="m21 8-4 4 4 4V8Z"/><path d="M8 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none"/>'),
    desc: 'Производим видео, которое досматривают: от рекламных роликов до контента для соцсетей. Идея, съёмка и монтаж под ключ.'
  }
]
</script>

<template>
  <section id="services" class="services">
    <div v-reveal class="reveal section-head">
      <div>
        <div class="eyebrow"><span class="eyebrow-line"></span>Услуги</div>
        <h2 class="section-title">Всё для роста бизнеса в одном месте</h2>
      </div>
      <p class="section-note">Собираем нужные направления в единую систему, где каждый канал усиливает остальные.</p>
    </div>

    <div class="grid">
      <div v-for="svc in services" :key="svc.num" v-reveal class="reveal card">
        <div class="card-icon" v-html="svc.icon"></div>
        <div class="card-num">{{ svc.num }}</div>
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
  padding: clamp(70px, 10vw, 120px) 24px;
}

.reveal { opacity: 0; transform: translateY(30px); }
.reveal.is-visible { opacity: 1; transform: none; }

.section-head {
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
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
  max-width: 16ch;
}
.section-note {
  color: rgba(var(--c-fg-rgb), .6);
  max-width: 34ch;
  margin: 0;
  font-size: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
}
.card {
  transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), border-color .3s, background .3s;
  position: relative;
  padding: 32px 28px 30px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .035), rgba(255, 255, 255, .012));
  border: 1px solid rgba(255, 255, 255, .08);
  overflow: hidden;
}
.card:hover {
  border-color: rgba(var(--c-accent-rgb), .45);
  background: linear-gradient(180deg, rgba(var(--c-accent-rgb), .07), rgba(255, 255, 255, .015));
  transform: translateY(-6px);
}
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
.card-num {
  font-size: 12px;
  font-weight: 700;
  color: rgba(var(--c-accent-rgb), .75);
  letter-spacing: .06em;
  margin-bottom: 9px;
}
.card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.28rem;
  letter-spacing: -.01em;
  margin: 0 0 12px;
  line-height: 1.15;
}
.card-desc {
  color: rgba(var(--c-fg-rgb), .62);
  font-size: 15.5px;
  margin: 0;
  line-height: 1.55;
}
</style>
