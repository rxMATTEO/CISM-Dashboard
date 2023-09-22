<script setup lang="ts">
import type { Document } from '../stores/documentsStore.ts';

type DocumentContentProps = {
  document: Document
}
defineProps<DocumentContentProps>();
</script>

<template>
  <div class="content">
    {{ document.name }}
  </div>
</template>

<style scoped>

</style>