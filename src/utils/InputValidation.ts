import { Ref, computed } from 'vue';

export function isInputEmpty(field: Ref<string>){
    return computed(() => field.value.trim() !== '')
}