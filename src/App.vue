<template>
  <div id="app">
    <board />
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'App',
  components: {
    Board,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  #app {
    margin: auto;
    max-width: 1280px;
    padding: 20px;
  }
</style>
