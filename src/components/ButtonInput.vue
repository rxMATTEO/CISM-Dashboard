<script setup lang="ts">
type Severity = 'primary' | 'danger'
type ButtonProps = {
  severity: Severity
}
defineProps<ButtonProps>();
</script>

<template>
<button class="button" type="submit" />
</template>

<style scoped>

</style>