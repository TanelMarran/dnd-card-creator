<template>
  <CardGrid />
</template>

<script setup>
import CardGrid from './components/card-grid/CardGrid'
</script>

<style lang="scss">
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

.markdown-body {
  h1,
  h2,
  h3,
  h4,
  p {
    padding: 0;
    margin: 0;
  }

  h1 {
    font-size: 1em;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 4px;
  }
}

.select {
  width: 100%;

  & .vs__dropdown-toggle {
    border-radius: 0;
    border-color: black;
  }
}
</style>
