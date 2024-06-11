<script setup lang="ts">
defineProps<{
  text: string,
  size: 'small' | 'regular' | 'large',
  loading?: boolean
}>()
</script>

<template>
  <button v-if="size === 'large'" type="button" class="large-btn">
    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    {{ text }}
    </button>
</template>

<style scoped lang="scss">
  .large-btn {
    width: 100%;
    font-size: 14px;
    color: white;
    border-radius: 1.5rem;
    border: none;
    background-color: #003A74;
    padding: .8rem;
    margin: 1.5rem 0 1.5rem 0;
    background: linear-gradient(-90deg, #003A74, #006AD5);
    box-shadow: 1px 5px 9px rgba(211, 211, 211, .9);
  }
</style>