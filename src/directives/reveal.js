// Scroll-reveal that ENHANCES an already-visible default.
// Content is visible in the DOM without JS; this directive arms the hidden
// state at mount (so no-JS, headless renderers and reduced-motion users always
// see content), then plays the reveal when the element scrolls into view.

const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')

let observer = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  }
  return observer
}

export default {
  mounted(el, binding) {
    // Reduced motion: leave the element in its visible default, don't observe.
    if (reduceMotion?.matches) return

    // Arm the hidden state WITHOUT a transition, so above-the-fold elements
    // don't fade out before they fade in.
    el.style.transition = 'none'
    el.classList.add('is-armed')
    void el.offsetWidth // force reflow: apply the hidden state instantly
    el.style.transition = ''

    // Optional sibling stagger: v-reveal="i" cascades a grid/list.
    const i = Number(binding.value) || 0
    if (i > 0) {
      el.style.transitionDelay = `${i * 70}ms`
      // Drop the delay once revealed so later hover transitions stay instant.
      el.addEventListener('transitionend', function clear(e) {
        if (e.propertyName === 'opacity') {
          el.style.transitionDelay = ''
          el.removeEventListener('transitionend', clear)
        }
      })
    }

    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  }
}
