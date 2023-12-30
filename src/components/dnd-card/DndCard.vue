<template>
  <div 
    class="dnd-card-container" 
    :class="(props.isCurrent ? 'is-current' : '')"
  >
    <SpellCard
      v-if="props.cardType === 'spell'"
      v-bind="props.spell"
      :name="props.name"
      :text-size="props.textSize"
    />
    <SimpleCard
      v-else-if="props.cardType === 'simple'"
      v-bind="props.simple"
      :name="props.name"
      :text-size="props.textSize"
    />
    <StatCard
      v-else-if="props.cardType === 'stat'"
      v-bind="props.stat"
      :name="props.name"
      :text-size="props.textSize"
    />
    <div class="dnd-card-container__button-overlay">
      <button
        class="dnd-card-container__edit-button"
        aria-label="edit"
        @click="editButton"
      >
        <span class="dnd-card-container__edit-button-inner" />
      </button>
      <button
        class="dnd-card-container__delete-button"
        aria-label="delete"
        @click="deleteButton"
      />
    </div>
  </div>
</template>

<script setup>

import SpellCard from './SpellCard'
import SimpleCard from './SimpleCard'
import StatCard from './StatCard'
import {SimpleCardData, SpellCardData, StatCardData} from '@/types/types'

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  cardType: {
    type: String,
    default: () => 'spell'
  },
  spell: {
    type: Object,
    default: () => SpellCardData
  },
  simple: {
    type: Object,
    default: () => SimpleCardData
  },
  stat: {
    type: Object,
    default: () => StatCardData
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

const editButton = () => {
  emit('editButtonClick', props.index)
}

const deleteButton = () => {
  emit('deleteButtonClick', props.index)
}

const emit = defineEmits(['editButtonClick', 'deleteButtonClick'])

</script>


<style lang="scss">

.dnd-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  transition: background-color 150ms ease-in-out;
}

.dnd-card-container__edit-button {
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  bottom: 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
}

.dnd-card-container__delete-button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background: gray;
  border-radius: 100%;
  border: none;
  opacity: 0;
  transition-property: opacity, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  cursor: pointer;

  .dnd-card-container:hover & {
    opacity: 1;
  }

  &:hover {
    background: red;
  }

  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background-color: white;
    margin: 11px 8px;
    top: 0;
    left: 0;
    transform: rotate(45deg);
  }

  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background-color: white;
    margin: 11px 8px;
    top: 0;
    left: 0;
    transform: rotate(-45deg);
  }
}

.dnd-card-container__edit-button-inner {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: gray;
  border-radius: 100%;
  border: none;
  opacity: 0;
  transition-property: opacity, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  cursor: pointer;

  .dnd-card-container:hover & {
    opacity: 1;
  }

  .dnd-card-container__edit-button:hover & {
    background: green;
  }

  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 2px;
    background-color: white;
    margin: 11px 8px;
    top: 1px;
    left: 0;
    transform: rotate(45deg);
  }

  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background-color: white;
    margin: 11px 8px;
    top: 0;
    left: 1px;
    transform: rotate(-45deg);
  }
}

.dnd-card-container__button-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(white, 0);

  &:hover {
    background: rgba(white, 0.5);
  }
}
</style>