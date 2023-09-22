<script setup lang="ts">
import type { Document } from '../stores/documentsStore.ts';
import ButtonInput from './ButtonInput.vue';

export type DocumentError = {
  error: string
}
type DocumentContentProps = {
  doc: Document,
  error: DocumentError
}

defineProps<DocumentContentProps>();
</script>

<template>
  <div class="content">
    <template v-if="!error">
    <div class="image">
      <img v-if="doc.image" :src="doc.image" :alt="doc.name">
    </div>
    <div class="right">
      <div>
      <p class="header">{{ doc.name }}</p>
      <div class="options">
        <a :href="`data:text/plain;charset=utf-8,${doc.description}`" download="text.txt">
          <ButtonInput severity="primary">
            Скачать
          </ButtonInput>
        </a>
        <ButtonInput severity="danger" :disabled="!doc.image">
          Удалить
        </ButtonInput>
      </div>
    </div>
    <div class="description">
      <p class="label">Описание:</p>
      <p class="text">
        {{ doc.description }}
      </p>
    </div>
    </div>
    </template>
    <template v-else>
      <p>Ошибка: {{ error.error }}</p>
    </template>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 50%;
  display: flex;
  gap: 50px;
  .options{
    margin-top: 10px;
    display: flex;
    gap: 10px;
  }
  .description {
    margin-top: auto;
    .label {
      font-weight: bold;
      font-size: 16px;
    }
    .text {
      margin-top: 15px;
      color: var(--text-secondary);
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 50%;
  }
  .image {
    min-height: 50%;
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