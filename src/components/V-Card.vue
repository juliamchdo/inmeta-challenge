<script setup lang="ts">
defineProps<{title: string}>()
</script>

<template>

<div class="card">
    <h2>{{title}}</h2>
    <slot name="body"></slot>
</div>
</template>

<style scoped lang="scss">
.card {
  width: 30rem;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.0rem;
  border-radius: 2.0rem;
}
</style>