<template>
  <div
    v-if="props.currentIndex !== -1"
    class="stat-configurator stat-configurator--stat"
  >
    <div class="stat-configurator__title">
      Configure stat card
    </div>
    <div class="simple-configurator__inputs">
      <InputText
        v-model:value="currentCard.name"
        class="simple-configurator__name"
        label="Name"
      />
      <div
        class="spell-configurator__two-row"
      >
        <InputText
          v-model:value="currentCard.stat.constitution"
          class="stat-configurator__stat"
          type="number"
          label="Con"
        />
        <InputText
          v-model:value="currentCard.stat.strength"
          class="stat-configurator__stat"
          type="number"
          label="Str"
        />
        <InputText
          v-model:value="currentCard.stat.dexterity"
          class="stat-configurator__stat"
          type="number"
          label="Dex"
        />
        <InputText
          v-model:value="currentCard.stat.intelligence"
          class="stat-configurator__stat"
          type="number"
          label="Int"
        />
        <InputText
          v-model:value="currentCard.stat.wisdom"
          class="stat-configurator__stat"
          type="number"
          label="Wis"
        />
        <InputText
          v-model:value="currentCard.stat.charisma"
          class="stat-configurator__stat"
          type="number"
          label="Cha"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
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

watch(() => currentCard, () => {
  emit('update')
}, { deep: true })

const emit = defineEmits(['update:cards', 'update'])

const isSearching = ref(false)
const isShowingResults = ref(false)

const onSuggestionClick = async (url) => {
  isShowingResults.value = false
  try {
    const response = await fetch('https://www.dnd5eapi.co' + url)
    const json = await response.json()
    updateCardData(json)
  } catch (error) {
    /* do nothing */
  }
}

const updateCardData = (data) => {
  currentCard.value = {
    name: data.name,
    isSimple: data.isSimple ?? false,
    simpleCardType: data.simpleCardType ?? '',
    meta: {
      type: {
        level: data.level,
        school: data.school ? data.school.name : 'Other'
      },
      castingTime: data.casting_time,
      range: data.range,
      components: {
        verbal: data.components.includes('V'),
        somatic: data.components.includes('S'),
        material: data.components.includes('M'),
        materialName: data.material ?? '',
      },
      duration: data.duration,
      concentration: data.concentration
    },
    description: data.desc.join('\n\n'),
    higherLevels: (data.higher_level.length > 0 ? data.higher_level.join('\n\n') : ''),
    textSize: 12
  }
}

</script>

<style lang="scss">

.stat-configurator__stat {
  & .input-text__input {
    padding: 18px 8px 4px;
  }
}

.stat-configurator {
  min-width: 360px;
}

.stat-configurator__inputs {
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 0 0 4px;
  }
}

.stat-configurator__title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.stat-configurator__name {
  width: 100%;
}

.stat-configurator__checkbox-wrapper {
  border: 1px solid;
}

.stat-configurator__checkbox-label {
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 2px;
}

.stat-configurator__checkbox-inner {
  display: flex;
  justify-content: center;
  margin-top: 2px;
  gap: 4px;
}

.stat-configurator__material-name {
  flex-grow: 1;
}

.stat-configurator__description {
  width: 100%;
  margin-top: 12px;

  textarea {
    text-align: left;
  }

  .stat-configurator--simple & {
    margin-top: 0;
  }
}

.stat-configurator__higher-levels {
  width: 100%;

  textarea {
    text-align: left;
  }
}

.stat-configurator__level {
  width: 50px;
  margin-bottom: 16px;

  .stat-configurator__two-row & {
    flex: 1 1 50px;
  }
}

.stat-configurator__text-size {
  width: 80px;
  margin-right: 8px;

  .stat-configurator__two-row & {
    flex: 1 1 80px;
  }
}

.stat-configurator__school {
  flex-grow: 1;
  margin-bottom: 16px;
}

.stat-configurator__two-row {
  display: flex;
  width: 100%;
  gap: 4px;

  > * {
    flex: 1 1 50%;
    box-sizing: border-box;
  }
}

.stat-configurator__duration-wrapper {
  position: relative;
}

.stat-configurator__concentration.input-check {
  position: absolute;
  right: 12px;
  bottom: 12px;
}

.stat-configurator__simple-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.stat-configurator__simple-check {
  margin-right: 4px;
}

.stat-configurator__simple-type {
  width: 100%;

}

</style>
