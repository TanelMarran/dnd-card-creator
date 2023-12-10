<template>
  <div
      v-if="props.currentIndex !== -1"
      class="card-configurator card-configurator--simple"
  >
    <div class="card-configurator__title">
      Configure simple card
    </div>
    <div class="card-configurator__inputs">
      <InputText
          v-model:value="currentCard.name"
          class="card-configurator__name"
          label="Name"
          @input="onNameInput"
          @keyup.esc="onEscapeName"
      />
      <InputText
          v-model:value="currentCard.description"
          :textarea="true"
          class="card-configurator__description"
          label="Description"
      />
      <InputText
          v-if="currentCard.isSimple"
          v-model:value="currentCard.simpleCardType"
          class="card-configurator__simple-type"
          label="Card type"
      />
      <div class="card-configurator__simple-wrapper">
        <InputText
            v-model:value="currentCard.textSize"
            class="card-configurator__text-size"
            type="number"
            label="Text Size"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import InputText from '@/components/input-text/InputText'
import InputCheck from '@/components/input-check/InputCheck'
import QueryResults from '@/components/query-results/QueryResults'

const props = defineProps({
  currentIndex: {
    type: Number,
    default: () => -1
  },
  cards: {
    type: Array,
    default: () => []
  }
})

const computedCards = computed({
  get() {
    return props.cards
  },
  set(newValue) {
    emit('update:cards', newValue)
  }
})

const currentCard = computed({
  get() {
    return computedCards.value[props.currentIndex]
  },
  set(newValue) {
    computedCards.value[props.currentIndex] = newValue
  }
})

watch(() => currentCard, () => {
  emit('update')
}, { deep: true })

const emit = defineEmits(['update:cards', 'update'])

</script>
