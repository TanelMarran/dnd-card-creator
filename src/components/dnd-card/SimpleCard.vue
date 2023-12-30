<template>
  <div
    class="dnd-card dnd-card--simple"
  >
    <div class="dnd-card__header">
      <div class="dnd-card__name dnd-card__cell">
        {{ props.name }}
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
  simpleCardType: {
    type: String,
    default: () => ''
  },
  textSize: {
    type: Number,
    default: () => 10
  },
})

const footerText = computed(() => {
   return props.simpleCardType
})

</script>

<style lang="scss">
.dnd-card {
  background-color: gray;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 3.5in;
  width: 2.5in;
  padding: 6px;
  box-sizing: border-box;
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
  font-size: 10px;
  line-height: 10px;
}

.dnd-card__description {
  white-space: break-spaces;
}
</style>
