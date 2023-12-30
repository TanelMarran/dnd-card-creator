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
        v-if="!props.isSimple"
        class="dnd-card__two-row"
      >
        <div class="dnd-card__components dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Con
          </div>
          <div class="dnd-card__stat">
            {{ props.constitution }}
          </div>
          {{ getBonus(props.constitution) }}
        </div>
        <div class="dnd-card__duration dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Str
          </div>
          <div class="dnd-card__stat">
            {{ props.strength }}
          </div>
          {{ getBonus(props.strength) }}
        </div>
        <div class="dnd-card__duration dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Dex
          </div>
          <div class="dnd-card__stat">
            {{ props.dexterity }}
          </div>
          {{ getBonus(props.dexterity) }}
        </div>
        <div class="dnd-card__duration dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Int
          </div>
          <div class="dnd-card__stat">
            {{ props.intelligence }}
          </div>
          {{ getBonus(props.intelligence) }}
        </div>
        <div class="dnd-card__duration dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Wis
          </div>
          <div class="dnd-card__stat">
            {{ props.wisdom }}
          </div>
          {{ getBonus(props.wisdom) }}
        </div>
        <div class="dnd-card__duration dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Cha
          </div>
          <div class="dnd-card__stat">
            {{ props.charisma }}
          </div>
          {{ getBonus(props.charisma) }}
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
        {{ props.description }}
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

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  constitution: {
    type: Number,
    default: () => 10
  },
  strength: {
    type: Number,
    default: () => 10
  },
  dexterity: {
    type: Number,
    default: () => 10
  },
  intelligence: {
    type: Number,
    default: () => 10
  },
  wisdom: {
    type: Number,
    default: () => 10
  },
  charisma: {
    type: Number,
    default: () => 10
  },
  statCardType: {
    type: String,
    default: () => ''
  },
  textSize: {
    type: Number,
    default: () => 10
  },
})

const getBonus = (stat) => {
  const bonus = Math.floor(stat / 2) - 5

  return (bonus > -1 ? '+' : '') + bonus
}

const footerText = computed(() => {
  return props.statCardType
})
</script>

<style lang="scss">

.dnd-card__stat {
  font-size: 16px;
  margin: 2px 0;
}

</style>
