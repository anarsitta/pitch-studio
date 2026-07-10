<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import CasesSection from './components/CasesSection.vue'
import WhyUsSection from './components/WhyUsSection.vue'
import ContactForm from './components/ContactForm.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <div class="site">
    <a href="#main" class="skip-link">Перейти к содержимому</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <CasesSection />
      <WhyUsSection />
      <ContactForm />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>

<style scoped>
main:focus { outline: none; }
.site {
  background: var(--c-bg);
  color: var(--c-fg);
  font-family: var(--font-body), -apple-system, sans-serif;
  font-size: var(--fs-lg);
  line-height: var(--lh-relaxed);
  -webkit-font-smoothing: antialiased;
  /* clip (not hidden): hidden computes overflow-y:auto, turns .site into a
     scroll container and breaks the sticky header. clip guards against
     horizontal overflow without establishing a scrollport. */
  overflow-x: clip;
  position: relative;
}
</style>
