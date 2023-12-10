<template>
  <div
      v-if="props.currentIndex !== -1"
      class="card-configurator"
      :class="{
      'card-configurator--simple': currentCard.isSimple
    }"
  >
    <div class="card-configurator__title">
      Configure stat card
    </div>
    <div class="card-configurator__inputs">
      <InputText
          v-model:value="currentCard.name"
          class="card-configurator__name"
          label="Name"
          @input="onNameInput"
          @keyup.esc="onEscapeName"
      />
      <QueryResults
          v-if="queryResults.length > 0"
          :results="queryResults"
          @suggestion-click="onSuggestionClick"
      />
      <div
          v-if="!currentCard.isSimple"
          class="card-configurator__two-row"
      >
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
      </div>
      <div
          v-if="!currentCard.isSimple"
          class="card-configurator__two-row"
      >
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
      </div>
      <div
          v-if="!currentCard.isSimple"
          class="card-configurator__two-row"
      >
        <div class="card-configurator__checkbox-wrapper">
          <div class="card-configurator__checkbox-label">
            Components
          </div>
          <div class="card-configurator__checkbox-inner">
            <InputCheck
                v-model:value="currentCard.meta.components.verbal"
                character="V"
            />
            <InputCheck
                v-model:value="currentCard.meta.components.somatic"
                character="S"
            />
            <InputCheck
                v-model:value="currentCard.meta.components.material"
                character="M"
            />
          </div>
        </div>
        <div class="card-configurator__duration-wrapper">
          <InputText
              v-model:value="currentCard.meta.duration"
              class="card-configurator__duration"
              label="Duration"
          />
          <InputCheck
              v-model:value="currentCard.meta.concentration"
              class="card-configurator__concentration"
              character="C"
          />
        </div>
      </div>
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
          v-if="currentCard.isSimple"
          v-model:value="currentCard.simpleCardType"
          class="card-configurator__simple-type"
          label="Card type"
      />
      <InputText
          v-if="!currentCard.isSimple"
          v-model:value="currentCard.higherLevels"
          :textarea="true"
          class="card-configurator__higher-levels"
          label="Higher levels"
      />
      <div class="card-configurator__simple-wrapper">
        <InputText
            v-model:value="currentCard.textSize"
            class="card-configurator__text-size"
            type="number"
            label="Text Size"
        />
        <InputCheck
            id="simple"
            v-model:value="currentCard.isSimple"
            class="card-configurator__simple-check"
            character="X"
        />
        <label for="simple">
          Is simplified card?
        </label>
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

const queryTimeout = ref(null)

const queryResults = ref([])
const isSearching = ref(false)
const isShowingResults = ref(false)

const onNameInput = async () => {
  if (currentCard.value.name.length > 3) {
    if (queryTimeout.value) {
      clearTimeout(queryTimeout.value)
    }
    const searchTerm = currentCard.value.name.replace(' ', '+')

    queryTimeout.value = setTimeout(async () => {
      isSearching.value = true
      queryTimeout.value = null
      try {
        const response = await fetch('https://www.dnd5eapi.co/api/spells/?name=' + searchTerm)
        const json = await response.json()
        isSearching.value = false
        if (json.count > 0) {
          isShowingResults.value = true
          queryResults.value = json.results
        }
      } catch (error) {
        isSearching.value = false
      }
    }, 100)
  }
}

const onEscapeName = () => {
  isShowingResults.value = false
}

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
.card-configurator {
  min-width: 360px;
}

.card-configurator__inputs {
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 0 0 4px;
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
  gap: 4px;
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

  .card-configurator--simple & {
    margin-top: 0;
  }
}

.card-configurator__higher-levels {
  width: 100%;

  textarea {
    text-align: left;
  }
}

.card-configurator__level {
  width: 50px;
  margin-bottom: 16px;

  .card-configurator__two-row & {
    flex: 1 1 50px;
  }
}

.card-configurator__text-size {
  width: 80px;
  margin-right: 8px;

  .card-configurator__two-row & {
    flex: 1 1 80px;
  }
}

.card-configurator__school {
  flex-grow: 1;
  margin-bottom: 16px;
}

.card-configurator__two-row {
  display: flex;
  width: 100%;
  gap: 4px;

  > * {
    flex: 1 1 50%;
    box-sizing: border-box;
  }
}

.card-configurator__duration-wrapper {
  position: relative;
}

.card-configurator__concentration.input-check {
  position: absolute;
  right: 12px;
  bottom: 12px;
}

.card-configurator__simple-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.card-configurator__simple-check {
  margin-right: 4px;
}

.card-configurator__simple-type {
  width: 100%;

}

</style>
