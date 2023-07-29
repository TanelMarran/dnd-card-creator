<template>
  <input
    v-model="computedValue"
    type="checkbox"
    class="input-text"
  >
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: () => null
  }
})

const computedValue = computed({
  get() {
    return props.value
  },
  set(newValue) {
    emit('update:value', newValue)
  }
})

const emit = defineEmits(['update:value'])
</script>