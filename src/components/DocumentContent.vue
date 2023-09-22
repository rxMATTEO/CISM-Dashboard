<script setup lang="ts">
import type { Document } from '../stores/documentsStore.ts';
import ButtonInput from './ButtonInput.vue';

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
    <div class="right">
      <div>
      <p class="header">{{ document.name }}</p>
      <div class="options">
        <ButtonInput severity="primary">
          Скачать
        </ButtonInput>
        <ButtonInput severity="danger">
          Удалить
        </ButtonInput>
      </div>
    </div>
    <div class="description">
      <p class="label">Описание:</p>
      <p class="text">
        {{ document.description }}
      </p>
    </div>
    </div>

  </div>
</template>

<style scoped>
.content {
  width: 100%;
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