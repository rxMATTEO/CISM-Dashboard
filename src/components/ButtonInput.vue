<script setup lang="ts">
type Severity = 'primary' | 'danger'
type ButtonProps = {
  severity: Severity,
  disabled?: boolean
}
defineProps<ButtonProps>();
</script>

<template>
<button class="button" type="submit" :class="severity" :disabled="disabled">
 <slot />
</button>
</template>

<style scoped>
.button {
 background-color: transparent;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 14px;
  cursor: pointer;
  &.primary {
    border: var(--blue) 1px solid;
    color: var(--blue);
  }
  &.danger {
    border: var(--danger) 1px solid;
    color: var(--danger);
  }
  &[disabled] {
    background: var(--secondary);
    border: var(--border) 1px solid;
    color: var(--text-secondary);
    cursor: auto;
  }
}
</style>