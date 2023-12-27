<template>
  <div
    v-if="props.currentIndex !== -1"
    class="simple-configurator simple-configurator--simple"
  >
    <div class="simple-configurator__title">
      Configure simple card
    </div>
    <div class="simple-configurator__inputs">
      <InputText
        v-model:value="currentCard.name"
        class="simple-configurator__name"
        label="Name"
      />
      <InputText
        v-model:value="currentCard.description"
        :textarea="true"
        class="simple-configurator__description"
        label="Description"
      />
      <InputText
        v-if="currentCard.isSimple"
        v-model:value="currentCard.simpleCardType"
        class="simple-configurator__simple-type"
        label="Card type"
      />
      <div class="simple-configurator__simple-wrapper">
        <InputText
          v-model:value="currentCard.textSize"
          class="simple-configurator__text-size"
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

<style lang="scss">
.simple-configurator {
  min-width: 360px;
}

.simple-configurator__inputs {
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 0 0 4px;
  }
}

.simple-configurator__title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.simple-configurator__name {
  width: 100%;
}

.simple-configurator__description {
  width: 100%;
  margin-top: 0;

  textarea {
    text-align: left;
  }
}

.simple-configurator__text-size {
  width: 80px;
  margin-right: 8px;

}

.simple-configurator__simple-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.simple-configurator__simple-type {
  width: 100%;

}

</style>

