<script setup lang="ts">
import {ref} from 'vue';

const searchResult = ref('Ничего не найдено');
</script>

<template>
<div class="dashboard">
  <div class="dashboard-side">
    <div class="dashboard-header">
      <p class="header">Поиск документа</p>
      <input type="text" class="search" placeholder="Введите ID документа">
    </div>
    <div class="dashboard-main">
      <div class="dashboard-header">
        <p class="header">Результаты</p>
        <p class="search-result">{{ searchResult }}</p>
      </div>
    </div>
  </div>

  <div class="dashboard-content">
    <div class="dashboard-content-empty">
      <p>Выберите документ, чтобы посмотреть его содержимое</p>
    </div>
  </div>
</div>
</template>

<style scoped>
.dashboard {
  box-shadow: 4px 0 8px 4px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  border-radius: .5rem;
  height: calc(100vh - 100px);
  display: flex;
  & > div {
    padding: 1rem;
  }
  .dashboard-side {
    border-right: var(--secondary) solid 1px;
  }
  .dashboard-header {
    .header {
      font-weight: bold;
    }
    .search {
      background-color: white;
      border: 2px var(--secondary) solid;
      padding: 16px 24px 16px 24px;
      border-radius: 5px;
      color: black;
      margin-top: 5px;
      &::placeholder {
        font-size: 14px;
      }
    }
  }
  .dashboard-main {
    margin-top: 15px;
    .search-result {
      margin-top: 5px;
      color: var(--text-secondary);
      font-size: 14px;
    }
  }
  .dashboard-content {
    width: 100%;
    .dashboard-content-empty {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: var(--text-secondary);
    }
  }
}
</style>