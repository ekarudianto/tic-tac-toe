<template>
  <div class="container">
    <h2>{{ progressGame }}</h2>
    <div class="board">
      <div
        v-if="!canPlay"
        class="board-overlay" />
      <tile
        v-for="(t, i) in tiles"
        :id="'tile-' + i"
        :key="i"
        :index="i"
        :game-state="game"
      />
    </div>
    <button
      v-if="showBtn"
      class="btn"
      @click="initGame">
      Play</button>
  </div>
</template>

<script>
import config from 'config/app-config.json';
import label from 'i8n/en.json';
import Game from 'model/Game.js';
import Tile from './Tile.vue';

export default {
  name: 'Board',
  components: {
    Tile,
  },
  data() {
    return {
      canPlay: true,
      game: {},
      progressGame: null,
      showBtn: false,
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
      this.progressGame = label.game_start;
      this.showBtn = false;
    },
    updateBoard(index) {
      this.$set(this.tiles, index, this.game.currPlayer);

      if (this.game.hasOver(this.game.currPlayer)) {
        this.showBtn = true;
        this.canPlay = false;

        // This determind who won and who lose
        this.progressGame = this.game.endStatus.player === config.PLAYER.MINIMIZER ?
          label.game_lose : label.game_won;

        // Change the label if it's a draw
        if (this.game.endStatus.status === config.GAME_STATUS.DRAW) {
          this.progressGame = label.game_tie;
        }
      }

      this.game.switchPlayer();
      this.canPlay = this.game.currPlayer === config.PLAYER.MAXIMIZER;

      // Get AI to find the best move
      if (this.game.currPlayer === config.PLAYER.MINIMIZER) {
        this.updateBoard(this.game.bestMove());
      }
    },
  },
};
</script>

<style scoped>
  .container {
    text-align: center;
  }

  .board {
    margin: auto;
    max-width: 300px;
    position: relative;
  }

  .board-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: not-allowed;
  }

  .btn {
    padding: 10px 20px;
    margin-top: 20px;
  }
</style>
