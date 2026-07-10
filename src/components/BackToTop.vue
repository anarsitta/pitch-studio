<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Appears once the visitor has scrolled past ~60% of the first screen, so it
// never covers the hero. rAF-throttled so the scroll listener stays cheap.
const visible = ref(false)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    visible.value = window.scrollY > window.innerHeight * 0.6
    ticking = false
  })
}

function toTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <!-- Teleported to <body> so no ancestor overflow/stacking context can clip it. -->
  <Teleport to="body">
    <Transition name="fab">
      <button
        v-if="visible"
        type="button"
        class="to-top"
        aria-label="Наверх"
        @click="toTop"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 19V6M5 13l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </Teleport>
</template>

<style scoped>
.to-top {
  position: fixed;
  right: max(clamp(16px, 3vw, 28px), env(safe-area-inset-right));
  bottom: max(clamp(16px, 3vw, 28px), env(safe-area-inset-bottom));
  z-index: var(--z-fab);
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, .16);
  background: rgba(11, 12, 10, .72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: rgba(var(--c-fg-rgb), .8);
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .35);
  transition:
    color .2s var(--ease-out),
    border-color .2s var(--ease-out),
    transform .2s var(--ease-out),
    box-shadow .2s var(--ease-out);
}
.to-top:hover {
  color: var(--c-accent);
  border-color: rgba(var(--c-accent-rgb), .5);
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(var(--c-accent-rgb), .22);
}
.to-top:active { transform: translateY(-1px); }

/* Fade + rise on enter/leave. */
.fab-enter-active,
.fab-leave-active {
  transition: opacity .25s var(--ease-out), transform .25s var(--ease-out);
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(.92);
}

@media (prefers-reduced-motion: reduce) {
  .to-top { transition: color .2s, border-color .2s; }
  .fab-enter-active,
  .fab-leave-active { transition: opacity .15s; }
  .fab-enter-from,
  .fab-leave-to { transform: none; }
}
</style>
