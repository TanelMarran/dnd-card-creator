<template>
  <div
    class="dnd-card"
  >
    <div class="dnd-card__header">
      <div class="dnd-card__name dnd-card__cell">
        {{ props.name }}
      </div>
      <div class="dnd-card__two-row">
        <div class="dnd-card__casting-time dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Casting Time
          </div>
          {{ props.meta.castingTime }}
        </div>
        <div class="dnd-card__range dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Range
          </div>
          {{ props.meta.range }}
        </div>
      </div>
      <div class="dnd-card__two-row">
        <div class="dnd-card__components dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Components
          </div>
          {{ spellComponents }}
        </div>
        <div class="dnd-card__duration dnd-card__cell dnd-card__property">
          <div class="dnd-card__property-label">
            Duration
          </div>
          {{ spellDuration }}
        </div>
      </div>
    </div>
    <div
      class="dnd-card__body dnd-card__cell"
      :style="{fontSize: props.textSize + 'px'}"
    >
      <div
        v-if="props.meta.components.materialName"
        class="dnd-card__material"
      >
        Material: {{ props.meta.components.materialName }}
      </div>
      <div
        class="dnd-card__description dnd-card__break-spaces"
      >
        <VMarkdownView
          mode="light"
          class="markdown"
          :content="props.description"
        />
      </div>
      <div
        v-if="props.higherLevels"
        class="dnd-card__description-section"
      >
        <span class="dnd-card__description-section-label">
          At higher levels:
        </span>
        {{ props.higherLevels }}
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
import { VMarkdownView } from 'vue3-markdown'

const props = defineProps({
  name: {
    type: String,
    default: () => ''
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
  higherLevels: {
    type: String,
    default: () => ''
  },
  textSize: {
    type: Number,
    default: () => 10
  },
})

const spellComponents = computed(() => {
  let components = []

  if (props.meta.components.verbal) {
    components.push('V')
  }

  if (props.meta.components.somatic) {
    components.push('S')
  }

  if (props.meta.components.material) {
    components.push('M')
  }

  return components.length > 0 ? components.join(', ') : '-'
})

const spellDuration = computed(() => {
  return (props.meta.duration === '' ? 'Instantaneous' : props.meta.duration) + (props.meta.concentration ? ' (C)' : '')
})

const footerText = computed(() => {
  const level = Math.max(0, props.meta.type.level)

  let label = level + 'th-level ' + props.meta.type.school;

  if (level < 4)
    switch (level) {
      case 0:
        label = props.meta.type.school + ' cantrip'
        break

      case 1:
        label = '1st-level ' + props.meta.type.school
        break

      case 2:
        label = '2nd-level ' + props.meta.type.school
        break

      case 3:
        label = '3rd-level ' + props.meta.type.school
        break
    }

  return label
})
</script>

<style lang="scss">

.dnd-card__edit-button {
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

.dnd-card__delete-button {
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

  .dnd-card:hover & {
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

.dnd-card__edit-button-inner {
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

  .dnd-card:hover & {
    opacity: 1;
  }

  .dnd-card__edit-button:hover & {
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

.dnd-card {
  background-color: gray;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 3.5in;
  width: 2.5in;
  padding: 6px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 14px;
  transition: background-color 150ms ease-in-out;

  .dnd-card-container.is-current & {
    background-color: cornflowerblue;
  }
}

.dnd-card__header {
  display: flex;
  flex-wrap: wrap;
  margin: 0 (-2px);
}

.dnd-card__name {
  flex-basis: 100%;
  max-width: 100%;
  margin: 0 2px 6px;
  text-transform: uppercase;
  min-height: 18px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  color: dimgray;
  transition: color 150ms ease-in-out;

  .dnd-card.is-current & {
    color: cornflowerblue;
  }
}

.dnd-card__property {
  padding: 2px;
}

.dnd-card__property-label {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  color: dimgray;
  transition: color 150ms ease-in-out;

  .dnd-card.is-current & {
    color: cornflowerblue;
  }
}

.dnd-card__two-row {
  display: flex;
  flex-basis: 100%;
  max-width: 100%;
  margin-bottom: 4px;

  & > * {
    width: 50%;
    margin: 0 2px;
  }
}

.dnd-card__cell {
  background-color: white;
  border-radius: 2px;
}

.dnd-card__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 4px 8px;
  text-align: left;
  margin-top: 2px;
  overflow: hidden;
  line-height: 1.2em;

  .dnd-card--simple & {
    margin-top: 0;
  }
}

.dnd-card__material {
  margin-bottom: 12px;
}

.dnd-card__description-section {
  flex: 1 1 20%;

  * ~ & {
    margin-top: 12px;
  }
}

.dnd-card__description-section-label {
  font-weight: 600;
}

.dnd-card__footer {
  margin-top: 4px;
  color: white;
  letter-spacing: .03rem;
  font-size: 10px;
  line-height: 10px;
}

.dnd-card__button-overlay {
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
