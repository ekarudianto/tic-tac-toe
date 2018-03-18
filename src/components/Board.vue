<template>
  <div class="board">
    <tile
      v-for="(t, i) in tiles"
      :id="'tile-' + i"
      :key="i"
      :index="i"
      :game-state="gameState"
    />
  </div>
</template>

<script>
import Game from 'model/Game.js';
import Tile from './Tile.vue';

export default {
  name: 'Board',
  components: {
    Tile,
  },
  data() {
    return {
      gameState: {},
      tiles: [],
      turn: null,
    };
  },
  created() {
    this.initGame();
  },
  methods: {
    initGame() {
      this.gameState = new Game();
      this.tiles = this.gameState.tiles;
    },
    updateBoard(index) {
      this.$set(this.tiles, index, 'o');
    },
  },
};
</script>

<style scoped>
  .board {
    margin: auto;
    max-width: 600px;
  }
</style>
