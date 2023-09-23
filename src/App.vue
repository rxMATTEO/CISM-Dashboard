<script setup lang="ts">
import Header from './components/Header.vue';
import Dashboard from './components/Dashboard.vue';
</script>

<template>
  <div class="main">
    <Header />
    <Dashboard />
  </div>
</template>

<style scoped>
.main {
  padding: 1rem 3rem;
}

@media (max-width: 768px) {
  .main {
    padding: 10px;
  }
}
</style>
