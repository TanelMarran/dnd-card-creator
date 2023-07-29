<template>
  <div
    v-if="props.currentIndex !== -1"
    class="card-configurator"
  >
    <div class="card-configurator__title">
      Configure card
    </div>
    <div class="card-configurator__inputs">
      <InputText
        v-model:value="currentCard.name"
        class="card-configurator__name"
        label="Name"
      />
      <InputText
        v-model:value="currentCard.meta.type.level"
        class="card-configurator__level"
        type="number"
        label="Lvl"
      />
      <InputText
        v-model:value="currentCard.meta.type.school"
        class="card-configurator__school"
        label="School"
      />
      <InputText
        v-model:value="currentCard.meta.castingTime"
        class="card-configurator__casting-time"
        label="Casting time"
      />
      <InputText
        v-model:value="currentCard.meta.range"
        class="card-configurator__range"
        label="Range"
      />
      <div class="card-configurator__checkbox-wrapper">
        <div class="">
          <div class="card-configurator__checkbox-label">
            Components
          </div>
          <div class="card-configurator__checkbox-inner">
            <InputCheck
              v-model:value="currentCard.meta.components.verbal"
            />
            <InputCheck
              v-model:value="currentCard.meta.components.somatic"
            />
            <InputCheck
              v-model:value="currentCard.meta.components.material"
            />
          </div>
        </div>
      </div>
      <InputText
        v-model:value="currentCard.meta.duration"
        class="card-configurator__duration"
        label="Duration"
      />
      <InputText
        v-if="currentCard.meta.components.material"
        v-model:value="currentCard.meta.components.materialName"
        class="card-configurator__material-name"
        label="Material name"
      />
      <InputText
        v-model:value="currentCard.description"
        :textarea="true"
        class="card-configurator__description"
        label="Description"
      />
      <InputText
        v-model:value="currentCard.higherLevels"
        :textarea="true"
        class="card-configurator__higher-levels"
        label="Higher levels"
      />
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import InputText from '@/components/input-text/InputText'
import InputCheck from '@/components/input-check/InputCheck'

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

const emit = defineEmits(['update:cards'])

</script>

<style lang="scss">
.card-configurator {
  min-width: 360px;
}

.card-configurator__inputs {
  display: flex;
  flex-wrap: wrap;
  margin: 0 (-2px);

  & > * {
    margin: 0 2px 4px;
  }
}

.card-configurator__title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.card-configurator__name {
  width: 100%;
}

.card-configurator__casting-time,
.card-configurator__range,
.card-configurator__checkbox-wrapper,
.card-configurator__duration {
  max-width: 50%;
  flex-grow: 1;
}

.card-configurator__checkbox-wrapper {
  border: 1px solid;
}

.card-configurator__checkbox-label {
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 2px;
}

.card-configurator__checkbox-inner {
  display: flex;
  justify-content: center;
  margin-top: 2px;
}

.card-configurator__material-name {
  flex-grow: 1;
}

.card-configurator__description {
  width: 100%;
  margin-top: 12px;

  textarea {
    text-align: left;
  }
}

.card-configurator__higher-levels {
  width: 100%;

  textarea {
    text-align: left;
  }
}

.card-configurator__level {
  width: 60px;
  margin-bottom: 16px;
}

.card-configurator__school {
  flex-grow: 1;
  margin-bottom: 16px;
}


</style>