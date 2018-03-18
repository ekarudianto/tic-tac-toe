<template>
  <div
    class="tile"
    @click="updateGame"
  >
    <div
      v-if="value === maximizerVal"
      class="o" />

    <div
      v-if="value === minimizerVal"
      class="x" />
  </div>
</template>

<script>
import config from 'config/app-config.json';
// import * as _ from 'lodash';

export default {
  name: 'Tile',
  props: {
    index: {
      type: Number,
      required: true,
    },
    gameState: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hasClicked: false,
      maximizerVal: config.PLAYER.MAXIMIZER,
      minimizerVal: config.PLAYER.MINIMIZER,
      value: null,
    };
  },
  watch: {
    gameState: {
      handler(val) {
        this.hasClicked = val.tiles[this.index] !== '';
        this.value = val.tiles[this.index];
      },
      deep: true,
    },
  },
  methods: {
    updateGame() {
      if (this.hasClicked) {
        return;
      }

      this.$parent.updateBoard(this.index);
    },
  },
};
</script>

<style scoped>
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
