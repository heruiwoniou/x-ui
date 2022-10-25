<template>
  <div id="app">
    <x-slider-verify ref="verify"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$refs.verify.$on('success', () => {
      console.log('success')
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
