<script setup lang="ts">
import type { Document } from '../stores/documentsStore.ts';

type DocumentContentProps = {
  document: Document
}
defineProps<DocumentContentProps>();
</script>

<template>
  <div class="content">
    <div class="image">
      <img :src="document.image" :alt="document.name">
    </div>
    <p class="header">{{ document.name }}</p>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 50px;
  .image {
    height: 50%;
    width: 50%;
    & img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .header {
    font-weight: bold;
  }
}
</style>