<script setup lang="ts">
type Severity = 'primary' | 'danger'
type ButtonProps = {
  severity: Severity,
}
defineProps<ButtonProps>();
</script>

<template>
<button class="button" type="submit" :class="severity">
 <slot />
</button>
</template>

<style scoped>
.button {
 background-color: transparent;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 14px;
  &.primary {
    border: var(--blue) 2px solid;
    color: var(--blue);
  }
  &.danger {
    border: var(--danger) 2px solid;
    color: var(--danger);
  }
}
</style>