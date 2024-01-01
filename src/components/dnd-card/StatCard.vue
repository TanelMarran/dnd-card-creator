<template>
  <div
    class="dnd-card"
    :class="{
      'is-current': props.isCurrent,
      'dnd-card--simple': props.isSimple,
    }"
  >
    <div class="dnd-card__header">
      <div class="dnd-card__name dnd-card__cell">
        {{ props.name }}
      </div>
      <div
        class="dnd-card__two-row"
      >
        <div class="dnd-card__components dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Proficiency
          </div>
          +{{ props.proficiency }}
        </div>
        <div class="dnd-card__components dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            AC
          </div>
          {{ props.armorClass }}
        </div>
        <div class="dnd-card__components dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Speed
          </div>
          {{ props.speed }} ft.
        </div>
      </div>
      <div
        class="dnd-card__two-row"
      >
        <div 
          class="dnd-card__components dnd-card__cell dnd-card__property" 
          :class="props.constitutionSave && 'dnd-card__property--highlight'"
        >
          <div class="dnd-card__property-label">
            Con
          </div>
          <div class="dnd-card__stat">
            {{ props.constitution }}
          </div>
          <div>{{ getBonus(props.constitution) }}</div>
        </div>
        <div
          class="dnd-card__duration dnd-card__cell dnd-card__property"
          :class="props.strengthSave && 'dnd-card__property--highlight'"
        >
          <div class="dnd-card__property-label">
            Str
          </div>
          <div class="dnd-card__stat">
            {{ props.strength }}
          </div>
          <div>{{ getBonus(props.strength) }}</div>
        </div>
        <div
          class="dnd-card__duration dnd-card__cell dnd-card__property"
          :class="props.dexteritySave && 'dnd-card__property--highlight'"
        >
          <div class="dnd-card__property-label">
            Dex
          </div>
          <div class="dnd-card__stat">
            {{ props.dexterity }}
          </div>
          <div>{{ getBonus(props.dexterity) }}</div>
        </div>
        <div
          class="dnd-card__duration dnd-card__cell dnd-card__property"
          :class="props.intelligenceSave && 'dnd-card__property--highlight'"
        >
          <div class="dnd-card__property-label">
            Int
          </div>
          <div class="dnd-card__stat">
            {{ props.intelligence }}
          </div>
          <div>{{ getBonus(props.intelligence) }}</div>
        </div>
        <div
          class="dnd-card__duration dnd-card__cell dnd-card__property"
          :class="props.wisdomSave && 'dnd-card__property--highlight'"
        >
          <div class="dnd-card__property-label">
            Wis
          </div>
          <div class="dnd-card__stat">
            {{ props.wisdom }}
          </div>
          <div>{{ getBonus(props.wisdom) }}</div>
        </div>
        <div
          class="dnd-card__duration dnd-card__cell dnd-card__property"
          :class="props.charismaSave && 'dnd-card__property--highlight'"
        >
          <div class="dnd-card__property-label">
            Cha
          </div>
          <div class="dnd-card__stat">
            {{ props.charisma }}
          </div>
          <div>{{ getBonus(props.charisma) }}</div>
        </div>
      </div>
    </div>
    <div
      class="dnd-card__body dnd-card__cell"
      :style="{fontSize: props.textSize + 'px'}"
    >
      <div
        class="dnd-card__description"
      >
        <div
          v-if="proficienciesText"
          class="dnd-card__description-section dnd-card__proficiencies"
        >
          <span class="dnd-card__description-section-label">
            Skills:
          </span>
          {{ proficienciesText }}
        </div>
        <div class="dnd-card__break-spaces">
          <VMarkdownView
            mode="light"
            :content="props.description"
          />
        </div>
      </div>
    </div>
    <div
      v-if="footerText"
      class="dnd-card__footer"
    >
      {{ footerText }}
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {StatCardData} from '@/types/types'
import { VMarkdownView } from 'vue3-markdown'

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  ...StatCardData,
  textSize: {
    type: Number,
    default: () => 10
  },
})

const getBonusValue = (stat) => {
  return Math.floor(stat / 2) - 5
}

const getBonus = (stat, proficiency = false) => {
  const bonus = getBonusValue(stat) + (proficiency ? props.proficiency : 0)

  return (bonus > -1 ? '+' : '') + bonus
}

const footerText = computed(() => {
  return props.statCardType
})

const proficiencyAbilityMap = computed(() => ({
  "Athletics": getBonus(props.strength, true),
  "Acrobatics": getBonus(props.dexterity, true),
  "Sleight of Hand": getBonus(props.dexterity, true),
  "Stealth": getBonus(props.dexterity, true),
  "Arcana": getBonus(props.intelligence, true),
  "History": getBonus(props.intelligence, true),
  "Investigation": getBonus(props.intelligence, true),
  "Nature": getBonus(props.intelligence, true),
  "Religion": getBonus(props.intelligence, true),
  "Animal Handling": getBonus(props.wisdom, true),
  "Insight": getBonus(props.wisdom, true),
  "Medicine": getBonus(props.wisdom, true),
  "Perception": getBonus(props.wisdom, true),
  "Survival": getBonus(props.wisdom, true),
  "Deception": getBonus(props.charisma, true),
  "Intimidation": getBonus(props.charisma, true),
  "Performance": getBonus(props.charisma, true),
  "Persuasion": getBonus(props.charisma, true)
}))

const proficienciesText = computed(() => {
  const formattedProficiencies = props.proficiencies.map((x) => x + (' ' + proficiencyAbilityMap.value[x]))

  return formattedProficiencies.join(', ')
})

</script>

<style lang="scss">

.dnd-card__stat {
  font-size: 16px;
  margin: 2px 0;
}

.dnd-card__property {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 1px;
    right: 1px;
    top: 1px;
    bottom: 1px;
    background-color: transparent;
    border-radius: 2px;
    z-index: 0;
    transition: background-color 150ms ease-in-out;
  }
}

.dnd-card__property--highlight {
  & > * {
    color: white;
    position: relative;
  }

  &:before {
    background-color: gray;

    .dnd-card-container.is-current & {
      background-color: cornflowerblue;
    }
  }
}

.dnd-card__proficiencies {
  margin-bottom: 1.5em;
}

</style>
