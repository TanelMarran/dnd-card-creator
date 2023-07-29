<template>
  <CardGrid
    :cards="cards"
    @card-add-click="addCard"
  />
</template>

<script setup>
import CardGrid from './components/card-grid/CardGrid'
import {ref} from 'vue'

const cards = ref([])

const addCard = () => {
  cards.value.push({
    name: 'new spell',
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
    textSize: 10,
    description: '',
    higherLevels: '',
  })
}

</script>

<style>
@font-face {
  font-family: 'Gill Sans';
  src: url('./assets/fonts/GillSansC.woff2')
}

#app {
  font-family: 'Gill Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
