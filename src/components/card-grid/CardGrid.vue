<template>
  <div 
    class="card-grid"
    :class="isPrinting && 'card-grid--print'"
  >
    <div
      v-if="!isPrinting"
      class="card-grid__controls"
    >
      <div class="card-grid__controls-inner">
        <button @click="addCard">
          Add card
        </button>
        <button @click="printCards">
          Print cards
        </button>
      </div>
    </div>
    <div
      id="printTarget"
      class="card-grid__grid"
    >
      <template
        v-for="(partitionIndex) in cardPartitions"
        :key="partitionIndex"
      >
        <div
          class="card-grid__partition"
          :class="partitionIndex !== 1 && 'card-grid__page-break'"
        >
          <div
            v-for="(index) in ((partitionIndex === cardPartitions) ? (finalPartitionCount === 0 ? 9 : finalPartitionCount) : 9)"
            :key="index"
            class="card-grid__item"
          >
            <DndCard
              class="card-grid__card"
              v-bind="cards[getCardIndex(partitionIndex, index)]"
              :is-current="currentCardIndex === getCardIndex(partitionIndex, index) && !isPrinting"
              :index="getCardIndex(partitionIndex, index)"
              @edit-button-click="currentCardIndex = currentCardIndex === getCardIndex(partitionIndex, index) ? -1 : getCardIndex(partitionIndex, index)"
            />
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="!isPrinting"
      class="card-grid__configurator"
    >
      <CardConfigurator
        v-model:cards="cards"
        :current-index="currentCardIndex"
      />
    </div>
  </div>
</template>

<script setup>
import DndCard from '../dnd-card/DndCard'
import CardConfigurator from '../card-configurator/CardConfigurator'
import {computed, nextTick, ref} from 'vue'

const cards = ref([])

const addCard = () => {
  cards.value.push({
    name: 'New spell',
    meta: {
      type: {
        level: 0,
        school: 'Other',
      },
      castingTime: '1 action',
      range: 'Self',
      components: {
        verbal: true,
        somatic: false,
        material: false,
        materialName: '',
      },
      duration: 'Instantaneous',
      concentration: false,
    },
    textSize: 10,
    description: '',
    higherLevels: '',
  })
  currentCardIndex.value = cards.value.length - 1
}

const cardPartitions = computed(() => {
  const numberOfCards = cards.value.length

  return Math.ceil(numberOfCards / 9)
})

const finalPartitionCount = computed(() => {
  const numberOfCards = cards.value.length

  return numberOfCards % 9
})

const currentCardIndex = ref()

const isPrinting = ref(false)

const printCards = () => {
  isPrinting.value = true

  nextTick(() => {
    window.print()

    isPrinting.value = false
  })
}

const getCardIndex = (partitionIndex, index) => {
  return (index - 1 + (partitionIndex - 1) * 9)
}

const emit = defineEmits(['cardAddClick', 'update:cards'])

</script>

<style lang="scss">
.card-grid {
  position: relative;
  display: flex;
  width: 248px * 3;
  margin: 64px auto 0;

  &.card-grid--print {
    margin: 0 auto;
  }
}

.card-grid__controls {
  position: absolute;
  right: 100%;
  top: 0;
  bottom: 0;
  margin-bottom: 24px;
  margin-right: 16px;
  min-width: 360px;

  & > * {
    position: sticky;
    top: 32px;
  }
}

.card-grid__controls-inner {
  position: sticky;
  top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.card-grid__configurator {
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  margin-left: 16px;

  .card-configurator {
    position: sticky;
    top: 32px;
  }
}

.card-grid__grid {
  width: 100%;
}

.card-grid__partition {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -8px;
  width: 100%;

  & + & {
    margin-top: 48px;
  }

  .card-grid--print & {
    margin-top: 24px;
    width: 240px * 3;
  }
}

.card-grid__item {
  flex: 0 0 33.3%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;

  .card-grid--print & {
    margin-bottom: 0;
    border-radius: 2px;
    overflow: hidden;
  }
}

.card-grid__page-break {
  page-break-before: always;
}

</style>

