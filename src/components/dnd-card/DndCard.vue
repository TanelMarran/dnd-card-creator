<template>
  <SpellCard
    v-if="props.cardType === 'spell'"
    v-bind="props"
    :index="props.index"
    :is-current="props.isCurrent"
  />
  <SimpleCard
    v-else-if="props.cardType === 'simple'"
    v-bind="props"
    :index="props.index"
    :is-current="props.isCurrent"
  />
  <StatCard
    v-else-if="props.cardType === 'stat'"
    v-bind="props"
    :index="props.index"
    :is-current="props.isCurrent"
  />
</template>

<script setup>

import SpellCard from './SpellCard'
import SimpleCard from './SimpleCard'
import StatCard from './StatCard'

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  cardType: {
    type: String,
    default: () => 'spell'
  },
  meta: {
    type: Object,
    default: () => ({
      type: {
        level: 0,
        school: 'other',
      },
      castingTime: '1 action',
      range: 'self',
      components: {
        verbal: true,
        somatic: false,
        material: false,
        materialName: ''
      },
      duration: 'instantaneous',
      concentration: false,
    })
  },
  description: {
    type: String,
    default: () => ''
  },
  simpleCardType: {
    type: String,
    default: () => ''
  },
  higherLevels: {
    type: String,
    default: () => ''
  },
  textSize: {
    type: Number,
    default: () => 10
  },
  index: {
    type: Number,
    required: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
})

</script>