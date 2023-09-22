<script setup lang="ts">

</script>

<template>
<div class="dashboard">
  <div class="dashboard-header">
    <p class="header">Поиск документа</p>
    <input type="text" class="search" placeholder="Введите ID документа">
  </div>
</div>
</template>

<style scoped>
.dashboard {
  box-shadow: 4px 0 8px 4px rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  border-radius: 5px;
  padding: 10px;
  .dashboard-header {
    .header {
      font-weight: bold;
    }
    .search {
      background-color: white;
      border: 2px var(--secondary) solid;
      padding: 10px;
      border-radius: 5px;
      color: black;
      margin-top: 5px;
    }
  }
}
</style>