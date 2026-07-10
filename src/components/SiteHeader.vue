<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#process', label: 'Процесс' },
  { href: '#cases', label: 'Результат' },
  { href: '#why', label: 'Почему мы' }
]

const open = ref(false)
const toggleBtn = ref(null)
const menu = ref(null)
const activeId = ref('')
let spy = null

function toggle() { open.value = !open.value }
function close() { open.value = false }

// Lock body scroll while the menu is open; move focus in and back out.
watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    await nextTick()
    menu.value?.querySelector('a, button')?.focus()
  } else {
    toggleBtn.value?.focus()
  }
})

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  // Scroll-spy: mark the nav link whose section is currently in view.
  const sections = links
    .map((l) => document.getElementById(l.href.slice(1)))
    .filter(Boolean)
  if ('IntersectionObserver' in window && sections.length) {
    spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeId.value = entry.target.id
      })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    sections.forEach((s) => spy.observe(s))
  }
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  spy?.disconnect()
})
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <a href="#top" class="logo" @click="close">
        <span class="logo-mark" aria-hidden="true">П</span>
        <span class="logo-name">Питч Студио</span>
      </a>

      <nav class="nav" aria-label="Основная навигация">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="nav-link"
          :class="{ 'is-active': activeId === l.href.slice(1) }"
          :aria-current="activeId === l.href.slice(1) ? 'true' : undefined"
        >{{ l.label }}</a>
        <a href="#contact" class="nav-cta">Обсудить проект</a>
      </nav>

      <button
        ref="toggleBtn"
        class="nav-toggle"
        :class="{ 'is-open': open }"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
        @click="toggle"
      >
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="open"
        id="mobile-menu"
        ref="menu"
        class="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
      >
        <div class="mobile-glow" aria-hidden="true"></div>
        <button class="mobile-close" aria-label="Закрыть меню" @click="close">
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <nav class="mobile-nav" aria-label="Мобильная навигация">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="mobile-link"
            :class="{ 'is-active': activeId === l.href.slice(1) }"
            :aria-current="activeId === l.href.slice(1) ? 'true' : undefined"
            @click="close"
          >{{ l.label }}</a>
        </nav>
        <a href="#contact" class="mobile-cta" @click="close">
          Обсудить проект <span aria-hidden="true">→</span>
        </a>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(11, 12, 10, .72);
  border-bottom: 1px solid rgba(255, 255, 255, .07);
}
.header-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 24px;
  padding-left: max(24px, env(safe-area-inset-left));
  padding-right: max(24px, env(safe-area-inset-right));
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
  flex-shrink: 0;
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
  white-space: nowrap;
}
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}
.nav-link {
  position: relative;
  text-decoration: none;
  color: rgba(var(--c-fg-rgb), .62);
  font-weight: 600;
  font-size: var(--fs-base);
  padding: 10px 12px;
  border-radius: var(--r-sm);
  transition: color .2s var(--ease-out);
}
.nav-link:hover { color: var(--c-fg); }
.nav-link.is-active { color: var(--c-fg); }
.nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 3px;
  height: 2px;
  border-radius: var(--r-hair);
  background: var(--c-accent);
}
.nav-cta {
  text-decoration: none;
  color: var(--c-bg);
  background: var(--c-accent);
  font-weight: 700;
  font-size: var(--fs-base);
  padding: 12px 18px;
  border-radius: var(--r-sm);
  margin-left: 6px;
  white-space: nowrap;
  transition: transform .2s var(--ease-out), box-shadow .2s var(--ease-out);
}
.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(var(--c-accent-rgb), .32);
}
.nav-cta:active {
  transform: translateY(0);
  box-shadow: 0 3px 12px rgba(var(--c-accent-rgb), .28);
}

/* Hamburger — hidden on desktop, shown below the nav breakpoint */
.nav-toggle {
  display: none;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: var(--r-field);
  cursor: pointer;
  z-index: var(--z-menu-toggle);
}
.nav-toggle .bar {
  width: 20px;
  height: 2px;
  background: var(--c-fg);
  border-radius: var(--r-hair);
  transition: transform .25s var(--ease-out), opacity .2s;
}
.nav-toggle.is-open .bar:first-child { transform: translateY(4px) rotate(45deg); }
.nav-toggle.is-open .bar:last-child { transform: translateY(-4px) rotate(-45deg); }

@media (max-width: 900px) {
  .nav { display: none; }
  .nav-toggle { display: flex; }
}
</style>

<style>
/* Mobile menu is teleported to <body>, so its styles are global (unscoped). */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: var(--z-menu);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 96px 28px calc(40px + env(safe-area-inset-bottom));
  padding-left: max(28px, env(safe-area-inset-left));
  padding-right: max(28px, env(safe-area-inset-right));
  background: var(--c-bg);
  overflow-y: auto;
  animation: mobileMenuIn .28s var(--ease-out) both;
}
.mobile-glow {
  position: absolute;
  top: -120px;
  right: -100px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--c-accent-rgb), .22), transparent 62%);
  filter: blur(30px);
  pointer-events: none;
}
.mobile-close {
  position: absolute;
  top: max(16px, env(safe-area-inset-top));
  right: max(24px, env(safe-area-inset-right));
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: var(--r-field);
  cursor: pointer;
}
.mobile-close .bar {
  grid-area: 1 / 1;
  width: 20px;
  height: 2px;
  background: var(--c-fg);
  border-radius: var(--r-hair);
}
.mobile-close .bar:first-child { transform: rotate(45deg); }
.mobile-close .bar:last-child { transform: rotate(-45deg); }
.mobile-nav {
  position: relative;
  display: flex;
  flex-direction: column;
}
.mobile-link {
  text-decoration: none;
  color: var(--c-fg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.7rem, 8vw, 2.4rem);
  letter-spacing: -.02em;
  line-height: 1.1;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  transition: color .2s var(--ease-out);
}
.mobile-link:active { color: var(--c-accent); }
.mobile-link.is-active { color: var(--c-accent); }
.mobile-cta {
  position: relative;
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  background: var(--c-accent);
  color: var(--c-bg);
  font-weight: 700;
  font-size: var(--fs-lg);
  padding: 18px 28px;
  border-radius: var(--r-md);
  box-shadow: 0 8px 30px rgba(var(--c-accent-rgb), .28);
  transition: transform .2s var(--ease-out), box-shadow .2s;
}
.mobile-cta:active {
  transform: translateY(1px);
  box-shadow: 0 4px 16px rgba(var(--c-accent-rgb), .28);
}
@keyframes mobileMenuIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: none; }
}
@media (hover: hover) {
  .mobile-link:hover { color: var(--c-accent); }
}
</style>
