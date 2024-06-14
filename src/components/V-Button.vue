<script setup lang="ts">

defineProps<{
  text: string,
  size: 'small' | 'regular' | 'large' | 'default',
  loading?: boolean
}>();

const emit = defineEmits(['click']);
</script>

<template>
  <button :class="[
    size === 'large' ? 'large-btn' : '',
    size === 'default' ? 'btn btn-primary btn-default' : ''
  ]" type="button" @click="$emit('click', $event)">
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
  background-color: var(--primary-color);
  padding: .8rem;
  margin: 1.5rem 0 1.5rem 0;
  background: linear-gradient(-90deg, #006064, #00796B);
  box-shadow: 1px 5px 9px rgba(211, 211, 211, .9);
}

.btn-default {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  font-size: 1.2rem;
}

.btn-default:active {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>