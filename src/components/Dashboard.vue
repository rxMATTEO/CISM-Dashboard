<script setup lang="ts">
import { onErrorCaptured, Ref, ref } from 'vue';
import type { Document } from '../stores/documentsStore.ts';
import DocumentContent from './DocumentContent.vue';
import type { DocumentError } from './DocumentContent.vue';
import Error from './Error.vue';
import Documents from './Documents.vue';

const selectedDocument: Ref<Document | null> = ref(null);
const error: Ref<DocumentError | null> = ref(null);

const errorOrLoad = ref(Error);
onErrorCaptured(() => {
  errorOrLoad.value = Error;
});
</script>

<template>
<div class="dashboard">
  <div class="dashboard-side">
    <Suspense>
      <template #default>
        <Documents @error="error = $event" @document-selected="selectedDocument = $event" />
      </template>
      <template #fallback>
        <component :is="errorOrLoad" />
      </template>
    </Suspense>
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
    padding: 7px !important;
  }
}
</style>