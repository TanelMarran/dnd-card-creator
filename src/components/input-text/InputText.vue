<template>
  <div class="input-text">
    <label
      v-if="props.label"
      class="input-text__label"
      :for="props.id"
    >
      {{ props.label }}
    </label>
    <input
      v-if="!props.textarea"
      :id="props.id"
      v-model="computedValue"
      :type="props.type"
      class="input-text__input"
    >
    <textarea
      v-else
      :id="props.id"
      v-model="computedValue"
      class="input-text__input"
    />
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    default: () => null
  },
  id: {
    type: String,
    default: () => ''
  },
  textarea: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: () => ''
  },
  type: {
    type: String,
    default: () => 'text'
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
.input-text {
  position: relative;
  display: flex;
}

.input-text__input {
  text-align: center;
  color: #2c3e50;
  width: 100%;
  border-radius: 0;
  border: 1px solid currentColor;
  padding: 18px 12px 4px;
}

textarea.input-text__input {
  min-height: 120px;
  resize: vertical;
}

.input-text__label {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #2c3e50;
}
</style>