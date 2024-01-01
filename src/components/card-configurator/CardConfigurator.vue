<template>
  <div
    v-if="props.currentIndex !== -1"
    class="card-configurator"
    :class="{
      'card-configurator--spell': isSpellCard,
      'card-configurator--simple': isSimpleCard,
      'card-configurator--stat': isStatCard,
    }"
  >
    <VueSelect
      v-model="currentCard.cardType"
      class="card-configurator__card-type-select select"
      :options="cardTypeOptions"
      :clearable="false"
    />
    <SpellConfigurator
      v-if="isSpellCard"
      v-model:cards="computedCards"
      :current-index="props.currentIndex"
    />
    <SimpleConfigurator
      v-if="isSimpleCard"
      v-model:cards="computedCards"
      :current-index="props.currentIndex"
    />
    <StatConfigurator
      v-if="isStatCard"
      v-model:cards="computedCards"
      :current-index="props.currentIndex"
    />
    <div class="spell-configurator__simple-wrapper">
      <InputText
        v-model:value="currentCard.textSize"
        class="spell-configurator__text-size"
        type="number"
        label="Text Size"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import SpellConfigurator from './SpellConfigurator'
import SimpleConfigurator from '../card-configurator/SimpleConfigurator'
import StatConfigurator from '../card-configurator/StatConfigurator'

import InputText from '@/components/input-text/InputText'

const isSpellCard = computed(() => currentCard.value.cardType === 'spell')
const isSimpleCard = computed(() => currentCard.value.cardType === 'simple')
const isStatCard = computed(() => currentCard.value.cardType === 'stat')

const cardTypeOptions = ['spell', 'simple', 'stat']

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

<style lang="scss">

.card-configurator__card-type-select {
  margin-bottom: 16px;
}

</style>
