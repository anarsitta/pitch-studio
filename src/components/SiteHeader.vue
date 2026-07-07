<template>
  <header class="header">
    <div class="header-inner">
      <a href="#top" class="logo">
        <span class="logo-mark">П</span>
        <span class="logo-name">Питч Студио</span>
      </a>
      <nav class="nav">
        <a href="#services" class="nav-link">Услуги</a>
        <a href="#process" class="nav-link">Процесс</a>
        <a href="#cases" class="nav-link">Кейсы</a>
        <a href="#why" class="nav-link">Почему мы</a>
        <a href="#contact" class="nav-cta">Обсудить проект</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(11, 12, 10, .72);
  border-bottom: 1px solid rgba(255, 255, 255, .07);
}
.header-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  color: var(--c-fg);
}
.logo-mark {
  width: 34px;
  height: 34px;
  border-radius: 9px;
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
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.nav-link {
  text-decoration: none;
  color: rgba(var(--c-fg-rgb), .62);
  font-weight: 600;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: color .2s;
}
.nav-link:hover { color: var(--c-fg); }
.nav-cta {
  text-decoration: none;
  color: var(--c-bg);
  background: var(--c-accent);
  font-weight: 700;
  font-size: 15px;
  padding: 10px 18px;
  border-radius: 10px;
  margin-left: 6px;
  transition: transform .2s, box-shadow .2s;
  box-shadow: 0 0 0 rgba(var(--c-accent-rgb), 0);
}
.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(var(--c-accent-rgb), .32);
}
</style>
