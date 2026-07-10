<script setup>
const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#process', label: 'Как мы работаем' },
  { href: '#cases', label: 'Результат' },
  { href: '#contact', label: 'Контакты' }
]
const socials = ['VK', 'TG', 'YT']
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
        <!-- STUB: замените на реальные контакты перед запуском -->
        <div class="col-links">
          <a href="tel:+74951234567" class="footer-link">+7 (495) 123-45-67</a>
          <a href="mailto:hello@pitchstudio.ru" class="footer-link">hello@pitchstudio.ru</a>
          <span class="col-note">Москва, работаем по всей России</span>
        </div>
      </div>
      <div>
        <div class="col-title">Соцсети</div>
        <div class="socials">
          <a v-for="s in socials" :key="s" href="#" class="social">{{ s }}</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ООО «Питч Студио». Все права защищены.</span>
      <span>ИНН 0000000000 · ОГРН 0000000000000</span>
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
