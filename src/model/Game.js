/* eslint-disable no-underscore-dangle, no-restricted-syntax,
class-methods-use-this, no-param-reassign */
import config from 'config/app-config.json';
import * as _ from 'lodash';

export default class Game {
  constructor() {
    this._boardSize = config.BOARD_SIZE;
    this._tiles = Array.from(Array(this._boardSize * this._boardSize).keys());
    this._currPlayer = config.PLAYER.MAXIMIZER;
    this._endStatus = {};
  }

  get endStatus() {
    return this._endStatus;
  }

  get boardSize() {
    return this._boardSize;
  }

  get currPlayer() {
    return this._currPlayer;
  }

  get tiles() {
    return this._tiles;
  }

  set tiles(arg) {
    this._tiles = arg;
  }

  hasOver(player) {
    if (this._checkwin(this._tiles, player)) {
      this._endStatus = this._checkwin(this._tiles, player);
      return true;
    }

    // At this point if we still can't find the winner
    // See if all tiles have already filled
    const isGameDraw = !_.some(this._tiles, t => typeof t === 'number');
    if (isGameDraw) {
      this._endStatus = { status: config.GAME_STATUS.DRAW };
    }

    return isGameDraw;
  }

  switchPlayer() {
    this._currPlayer = this._currPlayer === config.PLAYER.MAXIMIZER ?
      config.PLAYER.MINIMIZER : config.PLAYER.MAXIMIZER;
  }

  bestMove() {
    return this._minimax(this._tiles, this._currPlayer).index;
  }

  _checkwin(board, player) {
    let winner = null;
    const plays = board.reduce((a, e, i) =>
      ((e === player) ? a.concat(i) : a), []);

    for (const [index, win] of config.winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        winner = { index, player, status: config.GAME_STATUS.WIN };
        break;
      }
    }
    return winner;
  }

  _minimax(board, player) {
    const availSpots = this._tiles.filter(s => typeof s === 'number');

    if (this._checkwin(board, config.PLAYER.MAXIMIZER)) {
      return { score: -10 };
    } else if (this._checkwin(board, config.PLAYER.MINIMIZER)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    // an array to collect all the objects
    const moves = [];
    _.each(availSpots, (spot) => {
      const move = {};
      move.index = board[spot];

      // set the empty spot to the current player
      board[spot] = player;
      // if collect the score resulted from calling minimax on the opponent of the current player
      const opponent = player === config.PLAYER.MINIMIZER ?
        config.PLAYER.MAXIMIZER : config.PLAYER.MINIMIZER;

      move.score = this._minimax(board, opponent).score;

      // reset the spot to empty
      board[spot] = move.index;
      // push the object to the array
      moves.push(move);
    });

    let bestMove;
    let bestScore = player === config.PLAYER.MINIMIZER ? -10000 : 10000;

    _.each(moves, (move, index) => {
      // if it is the computer's turn loop over the moves and choose the move with the highest score
      // else choose the lowest score
      if (player === config.PLAYER.MINIMIZER && move.score > bestScore) {
        bestScore = move.score;
        bestMove = index;
      } else if (player === config.PLAYER.MAXIMIZER && move.score < bestScore) {
        bestScore = move.score;
        bestMove = index;
      }
    });

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }
}
