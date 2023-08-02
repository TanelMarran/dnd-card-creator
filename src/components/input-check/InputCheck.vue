<template>
  <div class="input-check">
    <input
      v-model="computedValue"
      type="checkbox"
      class="input-check__input"
    >
    <div class="input-check__box">
      {{ props.character }}
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: () => null
  },
  character: {
    type: String,
    default: () => 'V'
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

<style lang="scss">
.input-check {
  position: relative;
}

.input-check__input {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  padding: 0;
  margin: 0;
  opacity: 0;
  border-radius: 0;
  border: none;
  width: 16px;
  height: 16px;
}

.input-check__box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  line-height: 12px;
  background-color: dimgray;
  color: white;
  transition: background-color 150ms ease-in-out;

  .input-check__input:hover ~ & {
    background-color: lightblue;
  }

  .input-check__input:checked ~ & {
    background-color: dodgerblue;
  }
}
</style>