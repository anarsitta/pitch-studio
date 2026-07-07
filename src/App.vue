<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import CasesSection from './components/CasesSection.vue'
import WhyUsSection from './components/WhyUsSection.vue'
import ContactForm from './components/ContactForm.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="site">
    <SiteHeader />
    <main>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <CasesSection />
      <WhyUsSection />
      <ContactForm />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site {
  background: var(--c-bg);
  color: var(--c-fg);
  font-family: var(--font-body), -apple-system, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  position: relative;
}
</style>
