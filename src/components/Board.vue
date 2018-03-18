<template>
  <div class="board">
    <tile
      v-for="(t, i) in tiles"
      :id="'tile-' + i"
      :key="i"
      :index="i"
      :game-state="game"
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
      game: {},
      tiles: [],
    };
  },
  created() {
    this.initGame();
  },
  methods: {
    initGame() {
      this.game = new Game();
      this.tiles = this.game.tiles;
    },
    updateBoard(index) {
      this.$set(this.tiles, index, this.game.currPlayer);

      if (this.game.hasOver(this.game.currPlayer)) {
        console.log(this.game.endStatus);
      }

      this.game.switchPlayer();
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
