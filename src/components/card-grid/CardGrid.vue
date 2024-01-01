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
        <input
          type="file"
          accept="image/*"
          @change="setFile"
        >
        <img
          v-if="cardBackImage"
          class="card-grid__card-preview"
          :src="cardBackImage"
          alt="Card back"
        >
        <div class="card-grid__control-flex">
          <label for="printCardBack">
            Print Card back?
          </label>
          <input
            id="printCardBack"
            v-model="printCardBack"
            type="checkbox"
          >
        </div>
        <div class="card-grid__control-flex">
          <label for="printCardBack">
            Separate card backs?
          </label>
          <input
            id="separateCardBacks"
            v-model="areCardBacksSeparate"
            type="checkbox"
          >
        </div>
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
              v-if="getCardIndex(partitionIndex, index) < cards.length"
              class="card-grid__card"
              v-bind="cards[getCardIndex(partitionIndex, index)]"
              :is-current="currentCardIndex === getCardIndex(partitionIndex, index) && !isPrinting"
              :index="getCardIndex(partitionIndex, index)"
              @edit-button-click="onEditButtonClick(partitionIndex, index)"
              @delete-button-click="onDeleteButtonClick(partitionIndex, index)"
            />
            <img
              v-else-if="cardBackImage"
              class="card-grid__card-back"
              :src="cardBackImage"
              alt="Card back"
            >
          </div>
        </div>
      </template>
      <template v-if="!areCardBacksSeparate">
        <template
          v-for="(partitionIndex) in cardPartitions"
          :key="partitionIndex"
        >
          <div
            class="card-grid__partition card-grid__page-break"
          >
            <div
              v-for="(index) in ((partitionIndex === cardPartitions) ? (finalPartitionCount === 0 ? 9 : finalPartitionCount) : 9)"
              :key="index"
              class="card-grid__item"
            >
              <img
                v-if="cardBackImage"
                class="card-grid__card-back"
                :src="cardBackImage"
                alt="Card back"
              >
            </div>
          </div>
        </template>
      </template>
    </div>
    <div
      v-if="!isPrinting"
      class="card-grid__configurator"
    >
      <CardConfigurator
        v-model:cards="cards"
        :current-index="currentCardIndex"
        @update="updateLocalStorage"
      />
    </div>
  </div>
</template>

<script setup>
import DndCard from '../dnd-card/DndCard'
import CardConfigurator from '../card-configurator/CardConfigurator'
import {computed, nextTick, onMounted, ref, watch} from 'vue'

const cards = ref([])

onMounted(() => {
  let cardsString = localStorage.getItem('dndCards')

  if (cardsString !== null) {
    cards.value = JSON.parse(cardsString)
  }
})

const addCard = () => {
  cards.value.push({
    name: 'New card',
    cardType: 'spell',
    spell: {
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
    },
    simple: {
      simpleCardType: 'Item'
    },
    stat: {
      constitution: 10,
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      proficiency: 2,
      armorClass: '12',
      speed: 30,
      statCardType: 'Humanoid'
    },
    textSize: 12,
  })
  currentCardIndex.value = cards.value.length - 1
  updateLocalStorage()
}

const updateLocalStorage = () => {
  localStorage.setItem('dndCards', JSON.stringify(cards.value))
}

const cardPartitions = computed(() => {
  const numberOfCards = cards.value.length * (areCardBacksSeparate.value ? 2 : 1)

  return Math.ceil(numberOfCards / 9)
})

const areCardBacksSeparate = ref(true)

const finalPartitionCount = computed(() => {
  const numberOfCards = cards.value.length * (areCardBacksSeparate.value ? 2 : 1)

  return numberOfCards % 9
})

const currentCardIndex = ref()

const printCardBack = ref(false)
const cardBackImage = ref(null)

const isPrinting = ref(false)

const printCards = () => {
  updateLocalStorage()
  isPrinting.value = true

  nextTick(() => {
    window.print()

    isPrinting.value = false
  })
}

const onEditButtonClick = (partitionIndex, index) => {
  currentCardIndex.value = currentCardIndex.value === getCardIndex(partitionIndex, index) ? -1 : getCardIndex(partitionIndex, index)

  updateLocalStorage()
}

const onDeleteButtonClick = (partitionIndex, index) => {
  cards.value.splice(getCardIndex(partitionIndex, index), 1)

  if (currentCardIndex.value >= cards.value.length) {
    currentCardIndex.value--
  }

  updateLocalStorage()
}

const getCardIndex = (partitionIndex, index) => {
  return (index - 1 + (partitionIndex - 1) * 9)
}

const setFile = (e) => {
  let files = e.target.files || e.dataTransfer.files

  if (!files.length) {
    return
  }

  cardBackImage.value = URL.createObjectURL(files[0])
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

.card-grid__control-flex {
  display: flex;
  align-items: center;
}

.card-grid__card-preview {
  width: 240px;
  height: 336px;
  object-fit: cover;
}

.card-grid__card-back {
  width: 240px;
  height: 336px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 2px;
}

</style>

