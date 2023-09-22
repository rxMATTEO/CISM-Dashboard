<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { documentsStore } from '../stores/documentsStore.ts';
import { storeToRefs } from 'pinia';
import type { Document } from '../stores/documentsStore.ts';
import DocumentContent from './DocumentContent.vue';
import type { DocumentError } from './DocumentContent.vue';

const docsStore = documentsStore();
const { status } = storeToRefs(docsStore);
let docs = ref(await docsStore.documents);
const selectedDocument: Ref<Document | null> = ref(null);
const isDocumentsEmpty = computed(() => docs.value.length === 0);
const search = ref('');
const error: Ref<DocumentError | null> = ref(null);

function isErrored(result: Response): result is Response {
  return result.ok === false;
}

async function searchDocs(){
  const result = await docsStore.searchById(+search.value);
  if(isErrored(result as Response)) {
    error.value = { error: (result as Response).statusText };
  } else {
    docs.value = result as Document[];
  }
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
          <div v-for="doc in docs" :key="doc.id" class="document-item" @click="selectedDocument = doc; error = null" :class="{ selected: selectedDocument?.id === doc.id }">
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
    <div class="dashboard-content-empty" v-if="!selectedDocument && !error">
      <p>Выберите документ, чтобы посмотреть его содержимое</p>
    </div>
    <template v-else>
      <DocumentContent :doc="selectedDocument as Document" :error="error as DocumentError" />
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
    overflow-y: scroll;
    max-height: 85%;
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
    min-width: 0;
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

@media (max-width: 1024px) {
  .dashboard-side {
    width: 12rem !important;
  }
  .document-name {
    font-size: 12px;
  }
  .item-content {
    padding: 1px !important;
  }
  .dashboard-side {
    padding: 7px !important;
  }
  .search {
    padding: 5px !important;
  }
  .document-item {
    .item-left {
      width: 100% !important;
    }
    flex-direction: column;
  }
}
</style>