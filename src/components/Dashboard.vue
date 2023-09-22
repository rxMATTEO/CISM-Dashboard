<script setup lang="ts">
import {computed, Ref, ref} from 'vue';
import {documentsStore} from '../stores/documentsStore.ts';
import {storeToRefs} from 'pinia';
import type { Document } from '../stores/documentsStore.ts';
import DocumentContent from './DocumentContent.vue';

const docsStore = documentsStore();
const { status } = storeToRefs(docsStore);
let docs = ref(await docsStore.documents);
const selectedDocument: Ref<Document | null> = ref(null);
const isDocumentsEmpty = computed(() => docs.value.length === 0);
const search = ref('');

async function searchDocs(){
  docs.value = await docsStore.searchById(+search.value);
}
</script>

<template>
<div class="dashboard">
  <div class="dashboard-side">
    <div class="dashboard-header">
      <p class="header">Поиск документа</p>
      <input type="number" class="search" placeholder="Введите ID документа" v-model="search" @input="searchDocs">
    </div>
    <div class="dashboard-main">
      <div class="dashboard-header">
        <p class="header">Результаты</p>
        <p class="search-result" v-if="isDocumentsEmpty">{{ status.NotFound }}</p>
        <template v-else>
          <div v-for="doc in docs" :key="doc.id" class="document-item" @click="selectedDocument = doc" :class="{ selected: selectedDocument?.id === doc.id }">
            <div class="item-left">
              <img v-if="doc.image" :src="doc.image" :alt="doc.name" class="document-img">
              <span v-else></span>
            </div>
            <div class="item-content">
              <p class="document-name">{{ doc.name }}</p>
              <p class="document-label">12 mb</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div class="dashboard-content">
    <div class="dashboard-content-empty" v-if="!selectedDocument">
      <p>Выберите документ, чтобы посмотреть его содержимое</p>
    </div>
    <template v-else>
      <DocumentContent :doc="selectedDocument" />
    </template>
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
    width: 20%;
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
      display: block;
      width: 100%;
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
      font-weight: bold;
    }

    .document-item {
      margin-top: 10px;
      background-color: var(--background-section);
      box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);
      display: flex;
      cursor: pointer;
      &.selected {
        background: var(--blue);
        color: white;
        .document-label {
          color: var(--text-primary) !important;
        }
      }
      .document-img {
        width: 100%;
        height: 100%;
        margin-right: 10px;
        padding-right: 5px;
      }
      .item-left {
        width: 20%;
        border-right: var(--border) solid 1px;
      }
      .item-content {
        padding: 15px;
        .document-name {
          font-weight: bold;
        }
        .document-label {
          text-transform: uppercase;
          color: var(--text-secondary);
        }
      }
    }
  }
  .dashboard-content {
    width: 80%;
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