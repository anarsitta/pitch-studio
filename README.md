# Питч Студио — маркетинговый сайт

Одностраничный сайт агентства, перенесённый на Vue 3 + Vite (Composition API, `<script setup>`).

## Запуск

```bash
npm install
npm run dev      # dev-сервер
npm run build    # сборка в dist/
npm run preview  # локальный просмотр сборки
```

## Структура

- `src/components/` — секции страницы: `SiteHeader`, `HeroSection`, `ServicesSection`, `ProcessSection`, `CasesSection`, `WhyUsSection`, `ContactForm`, `SiteFooter`
- `src/directives/reveal.js` — директива `v-reveal`: появление блоков при скролле (IntersectionObserver)
- `src/assets/main.css` — CSS-переменные палитры/шрифтов и глобальные keyframes-анимации

Оригинальная версия сайта лежит в `site-src/`.
