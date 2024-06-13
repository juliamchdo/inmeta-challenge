<script setup lang="ts">

const props = defineProps<{
  title?: string,
  id: string,
  size?: 'sm' | 'lg' | 'xl'
}>()

const modalSize = `modal-${props.size}`

</script>

<template>
  <div class="modal fade" :id="props.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" :class="modalSize">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ props.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

.modal-title {
  font-size: 2.2rem;
}
</style>
