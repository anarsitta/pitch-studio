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
  mounted(el) {
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  }
}
