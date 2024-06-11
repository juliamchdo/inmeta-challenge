<script setup lang="ts">

defineProps<{
  label: string,
  id: string,
  type: string,
  modelValue: string,
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue', 'update:passwordValue']);

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="col-form-label">{{ label }}</label>
    <input :type="type" class="form-control" :id="id" :value="modelValue" @input="updateValue"
      :placeholder="placeholder" />
  </div>
</template>

<style setup lang="scss">
 input {
    padding: .8rem !important;
    border-radius: .5rem !important;
    border: 1px solid #DDDDDD;
    box-shadow: 1px 5px 9px rgba(211, 211, 211, .7);
  }
</style>