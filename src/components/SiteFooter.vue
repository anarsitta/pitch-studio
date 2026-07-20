<script setup>
const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#process', label: 'Как мы работаем' },
  { href: '#cases', label: 'Результат' },
  { href: '#contact', label: 'Контакты' }
]
const socials = [{ label: 'TG', href: 'https://t.me/ArGo_manager', title: 'Telegram' }]

// STUB: тексты документов готовит юрист — подставить реальные ссылки
const docs = [
  { href: '#', label: 'Политика конфиденциальности' },
  { href: '#', label: 'Согласие на обработку персональных данных' }
]

const requisites = [
  ['Наименование', 'Общество с ограниченной ответственностью «Питч Студио»'],
  ['Сокращённое наименование', 'ООО «Питч Студио»'],
  ['Юридический и почтовый адрес', '603155, г. Нижний Новгород, ул. Минина, д. 19/6, помещ. П3'],
  ['ИНН', '5260491328'],
  ['КПП', '526001001'],
  ['ОГРН', '1235200022804'],
  ['ОКВЭД', '70.22 Консультирование по вопросам коммерческой деятельности и управления'],
  ['Телефон', '+7 908 039-73-82'],
  ['Генеральный директор', 'Гордиенко Артемий Тимофеевич'],
  ['Главный бухгалтер', 'Гордиенко Артемий Тимофеевич'],
  ['Эл. почта', 'pittch.studio@yandex.ru']
]
</script>

<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="about">
        <a href="#top" class="logo">
          <span class="logo-mark">П</span>
          <span class="logo-name">Питч Студио</span>
        </a>
        <p class="about-text">Маркетинговое агентство полного цикла. Продвигаем сайты и продукты — от стратегии до результата.</p>
      </div>
      <div>
        <div class="col-title">Навигация</div>
        <div class="col-links">
          <a v-for="link in navLinks" :key="link.href" :href="link.href" class="footer-link">{{ link.label }}</a>
        </div>
      </div>
      <div>
        <div class="col-title">Контакты</div>
        <div class="col-links">
          <a href="mailto:pittch.studio@yandex.ru" class="footer-link">pittch.studio@yandex.ru</a>
          <a href="#contact" class="footer-link">Оставить заявку</a>
          <span class="col-note">Нижний Новгород, работаем по всей России</span>
        </div>
      </div>
      <div>
        <div class="col-title">Документы</div>
        <div class="col-links">
          <a v-for="doc in docs" :key="doc.label" :href="doc.href" class="footer-link">{{ doc.label }}</a>
        </div>
      </div>
      <div>
        <div class="col-title">Соцсети</div>
        <div class="socials">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            class="social"
            target="_blank"
            rel="noopener"
            :aria-label="s.title"
          >{{ s.label }}</a>
        </div>
      </div>
    </div>
    <div class="footer-legal">
      <details class="requisites">
        <summary class="requisites-toggle">Реквизиты компании</summary>
        <dl class="requisites-list">
          <template v-for="[term, value] in requisites" :key="term">
            <dt class="requisites-term">{{ term }}</dt>
            <dd class="requisites-value">{{ value }}</dd>
          </template>
        </dl>
      </details>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ООО «Питч Студио». Все права защищены.</span>
      <span>ИНН 5260491328 · ОГРН 1235200022804</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(255, 255, 255, .07);
  background: var(--c-bg-footer);
}
.footer-grid {
  max-width: 1240px;
  margin: 0 auto;
  padding: 56px 24px 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}
.about { min-width: 240px; }
.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  color: var(--c-fg);
  margin-bottom: 16px;
}
.logo-mark {
  width: 34px;
  height: 34px;
  border-radius: var(--r-mark);
  background: var(--c-accent);
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--c-bg);
  font-size: 20px;
  line-height: 1;
}
.logo-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -.02em;
}
.about-text {
  color: var(--c-fg-faint);
  font-size: var(--fs-sm);
  margin: 0;
  max-width: 34ch;
  line-height: var(--lh-body);
  text-wrap: pretty;
}
.col-title {
  font-weight: 700;
  font-size: var(--fs-xs);
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--c-fg-faint);
  margin-bottom: 16px;
}
.col-links {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.footer-link {
  text-decoration: none;
  color: rgba(var(--c-fg-rgb), .72);
  font-size: var(--fs-base);
  font-weight: 500;
  transition: color .2s var(--ease-out);
}
.footer-link:hover { color: var(--c-accent); }

/* Roomier tap targets on touch devices */
@media (pointer: coarse) {
  .col-links { gap: 4px; }
  .footer-link { padding: 7px 0; }
}
.col-note {
  color: var(--c-fg-faint);
  font-size: var(--fs-sm);
}
.socials {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.social {
  text-decoration: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--r-sm);
  border: 1px solid rgba(255, 255, 255, .12);
  color: rgba(var(--c-fg-rgb), .8);
  font-weight: 700;
  font-size: var(--fs-xs);
  transition: border-color .2s var(--ease-out), color .2s var(--ease-out), background .2s var(--ease-out);
}
.social:hover {
  border-color: rgba(var(--c-accent-rgb), .5);
  color: var(--c-accent);
  background: rgba(var(--c-accent-rgb), .06);
}
/* ---- Company card: present but folded away, so it never competes with nav ---- */
.footer-legal {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}
.requisites-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  list-style: none;
  color: rgba(var(--c-fg-rgb), .72);
  font-size: var(--fs-sm);
  font-weight: 500;
  padding: 8px 0;
  transition: color .2s var(--ease-out);
}
.requisites-toggle::-webkit-details-marker { display: none; }
.requisites-toggle::before {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(-45deg);
  transition: transform .2s var(--ease-out);
}
.requisites[open] .requisites-toggle::before { transform: rotate(45deg); }
.requisites-toggle:hover { color: var(--c-accent); }
.requisites-list {
  display: grid;
  grid-template-columns: minmax(140px, 260px) minmax(0, 1fr);
  gap: 10px 28px;
  margin: 14px 0 22px;
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
}
.requisites-term { color: var(--c-fg-faint); }
.requisites-value { margin: 0; color: rgba(var(--c-fg-rgb), .78); }

@media (max-width: 620px) {
  .requisites-list { grid-template-columns: 1fr; gap: 2px 0; }
  .requisites-value { margin-bottom: 12px; }
}

.footer-bottom {
  max-width: 1240px;
  margin: 0 auto;
  padding: 22px 24px 40px;
  border-top: 1px solid rgba(255, 255, 255, .06);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  color: var(--c-fg-faint);
  font-size: var(--fs-xs);
}
</style>
