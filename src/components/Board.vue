<template>
  <div class="board">
    <div
      v-onclick="updateBoard"
      v-for="(t, i) in tiles"
      :id="'tile-' + i"
      :key="i"
      class="tile">
      <div class="o" />
      <div class="x" />
    </div>
  </div>
</template>

<script>
import config from 'config/app-config.json';

const boardSize = config.BOARD_SIZE * config.BOARD_SIZE;

export default {
  name: 'Board',
  data() {
    return {
      isUserAllowedToClick: false,
      tiles: new Array(boardSize),
    };
  },
  created() {
  },
  methods: {
    updateBoard: () => {

    },
  },
};
</script>

<style scoped>
  .board {
    margin: auto;
    max-width: 600px;
  }

  .tile {
    display: inline-block;
    height: 200px;
    position: relative;
    width: 198px;
  }

  .o {
    border: 20px solid #000;
    height: 50%;
    left: 15%;
    position: absolute;
    top: 15%;
    width: 50%;

    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .x:before,
  .x:after {
    background-color: #000;
    content: "";
    display: block;
    height: 160px;
    left: 90px;
    position: absolute;
    top: 20px;
    width: 20px;

    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .x:before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .x:after {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #tile-1,
  #tile-7 {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }

  #tile-3,
  #tile-5 {
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
  }

  #tile-4 {
    border: 1px solid #000;
  }

  #tile-3,
  #tile-4,
  #tile-5 {
    height: 198px;
  }
</style>
