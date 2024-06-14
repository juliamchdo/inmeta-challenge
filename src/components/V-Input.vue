<script setup lang="ts">

defineProps<{
  label: string,
  id: string,
  type: string,
  modelValue: string,
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue', 'update:passwordValue', 'click']);

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <template class="mb-3" v-if="type !== 'checkbox'">
    <label :for="id" class="col-form-label">{{ label }}</label>
    <input :type="type" class="form-control text-input" :id="id" :value="modelValue" @input="updateValue"
      :placeholder="placeholder" />
  </template>

  <div class="form-check" v-if="type === 'checkbox'">
    <input class="form-check-input" type="checkbox" @click="$emit('click', $event)" :value="modelValue" :id="id"  @input="updateValue">
    <label class="form-check-label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<style setup lang="scss">
.text-input {
  padding: .8rem !important;
  border-radius: .5rem !important;
  border: 1px solid #DDDDDD;
  box-shadow: 1px 5px 9px rgba(211, 211, 211, .7);
}

.col-form-label{
  font-size: 1.4rem;
  margin: .5rem 0;
}

.form-check{
  width: 25rem;
  display: flex;
  align-items: center;
  margin: 1rem ;
}
.form-check-label{
  font-size: 1.2rem;
  margin-left: .5rem;
}
.form-check-input{
  padding: 1rem;
}

.form-check-input:checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}
</style>