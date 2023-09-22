<script setup lang="ts">
import Header from './components/Header.vue';
import Dashboard from './components/Dashboard.vue';
</script>

<template>
  <div class="main">
    <Header />
    <Suspense>
      <template #default>
        <Dashboard />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.main {
  padding: 1rem 3rem;
}
</style>
