<template>
  <div 
    class="dnd-card"
    :class="props.isCurrent && 'is-current'"
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
    <div class="dnd-card__body dnd-card__cell">
      <div class="dnd-card__description">
        {{ props.description }}
      </div>
      <div
        v-if="props.higherLevels"
        class="dnd-card__higher-levels"
      >
        <div class="dnd-card__higher-levels-label">
          At higher levels:
        </div>
        {{ props.higherLevels }}
      </div>
    </div>
    <div class="dnd-card__footer">
      {{ footerText }}
    </div>
    <button
      class="dnd-card__edit-button"
      aria-label="edit"
      @click="editButton"
    />
  </div>
</template>

<script setup>
import {computed} from 'vue'

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
  index: {
    type: Number,
    required: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
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
  return props.meta.duration + (props.meta.concentration ? ' (C)' : '')
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

const editButton = () => {
  emit('editButtonClick', props.index)
}

const emit = defineEmits(['editButtonClick'])
</script>

<style lang="scss">

.dnd-card__edit-button {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.dnd-card {
  background-color: lightgray;
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

  &:hover {
    background-color: lightblue;
  }

  &.is-current {
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
  color: gray;
  transition: color 150ms ease-in-out;

  .dnd-card:hover & {
    color: lightblue;
  }

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
  font-size: 12px;
  line-height: 12px;
  color: gray;
  transition: color 150ms ease-in-out;

  .dnd-card:hover & {
    color: lightblue;
  }

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
}

.dnd-card__higher-levels {
  margin-top: 12px;
  flex: 1 1 20%;
}

.dnd-card__higher-levels-label {
  font-weight: 600;
}

.dnd-card__footer {
  margin-top: 4px;
  color: white;
  letter-spacing: .03rem;
}
</style>