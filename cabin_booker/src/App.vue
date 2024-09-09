<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
</script>

<template>
  <div>
    <SiteHeader />
    <main aria-labelledby="h1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style lang="scss">
main {
  padding-top: 3rem;
  background-color: rgb(247, 247, 247);
  min-height: 80vh;
}

h1 {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1.25rem;
}

.form-control,
.form-select,
.form-check-input {
  border-color: rgb(71, 71, 71);
}
</style>
