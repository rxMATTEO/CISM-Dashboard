<script setup lang="ts">

</script>

<template>
<div class="dashboard">
  <div class="dashboard-side">
    <div class="dashboard-header">
      <p class="header">Поиск документа</p>
      <input type="text" class="search" placeholder="Введите ID документа">
    </div>
    <div class="dashboard-main">

    </div>
  </div>
</div>
</template>

<style scoped>
.dashboard {
  box-shadow: 4px 0 8px 4px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  border-radius: .5rem;
  padding: 1rem;
  .dashboard-header {
    .header {
      font-weight: bold;
    }
    .search {
      background-color: white;
      border: 2px var(--secondary) solid;
      padding: .8rem;
      border-radius: 5px;
      color: black;
      margin-top: 5px;
    }
  }
}
</style>