<script setup lang="ts">
import { computed, Ref, ref, watchEffect, onErrorCaptured } from 'vue';
import { documentsStore } from '../stores/documentsStore.ts';
import { storeToRefs } from 'pinia';
import type { Document } from '../stores/documentsStore.ts';
import type { DocumentError } from './DocumentContent.vue';

const docsStore = documentsStore();
const { status } = storeToRefs(docsStore);
let docs = ref(await docsStore.documents);

watchEffect(() => {
  if('ok' in docs.value && docs.value.ok === false){
    throw new  Error('Loading error');
  }
});

const selectedDocument: Ref<Document | null> = ref(null);
const isDocumentsEmpty = computed(() => docs.value.length === 0);
const search = ref('');
const error: Ref<DocumentError | null> = ref(null);

function isErrored(result: Response | Document[]): result is Response {
  return 'ok' in result ? !result.ok : false;
}

async function searchDocs(){
  const result = await docsStore.searchById(+search.value);
  if(isErrored(result)) {
    error.value = { error: (result as Response).statusText };
    emits('error', error.value);
  } else {
    docs.value = result;
  }
}

function changeDocument(doc: Document){
  selectedDocument.value = doc;
  error.value = null;
  emits('documentSelected', selectedDocument.value);
  emits('error', error.value);
}

const emits = defineEmits(['documentSelected', 'error']);
</script>

<template>
  <div class="dashboard-header">
    <p class="header">Поиск документа</p>
    <input type="number" class="search" placeholder="Введите ID документа" v-model="search" @input="searchDocs">
  </div>
  <div class="dashboard-main">
    <div class="dashboard-header">
      <p class="header">Результаты</p>
      <p class="search-result" v-if="isDocumentsEmpty">{{ status.NotFound }}</p>
      <template v-else>
        <div v-for="doc in docs" :key="doc.id" class="document-item" @click="changeDocument(doc)" :class="{ selected: selectedDocument?.id === doc.id }">
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
</template>

<style scoped>
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

@media (max-width: 1024px) {
  .document-name {
    font-size: 12px;
  }
  .item-content {
    padding: 1px !important;
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