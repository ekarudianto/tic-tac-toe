<template>
  <div
    :class="{ disabled: hasClicked }"
    class="tile"
    @click="updateGame"
  >
    <div
      v-if="value === maximizerVal"
      :class="maximizerVal" />

    <div
      v-if="value === minimizerVal"
      :class="minimizerVal" />
  </div>
</template>

<script>
import config from 'config/app-config.json';

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
        const tileValue = val.tiles[this.index];
        this.hasClicked = tileValue === this.maximizerVal || tileValue === this.minimizerVal;
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
    cursor: pointer;
    display: inline-block;
    height: 100px;
    position: relative;
    width: 98px;
  }

  .tile.disabled {
    cursor: not-allowed;
  }

  .o {
    border: 15px solid #000;
    height: 50%;
    left: 10%;
    position: absolute;
    top: 10%;
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
    height: 80px;
    left: 40px;
    position: absolute;
    top: 10px;
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
    height: 98px;
  }
</style>
