<template>
  <CardGrid />
</template>

<script setup>
import CardGrid from './components/card-grid/CardGrid'
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
