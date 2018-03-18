/* eslint-disable no-underscore-dangle, no-restricted-syntax */
import config from 'config/app-config.json';
import * as _ from 'lodash';

export default class Game {
  constructor() {
    this._boardSize = config.BOARD_SIZE;
    this._tiles = new Array(this._boardSize * this._boardSize).join('.').split('.');
    this._currPlayer = config.PLAYER.MAXIMIZER;
    this._endStatus = {};
  }

  hasOver(player) {
    const plays = this._tiles.reduce((a, e, i) =>
      ((e === player) ? a.concat(i) : a), []);

    // Loop for possible combos
    for (const [index, win] of config.winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        this._endStatus = { index, player, status: config.GAME_STATUS.WIN };
        return true;
      }
    }

    // At this point if we still can't find the winner
    // See if all tiles have already filled
    const isGameDraw = !_.some(this._tiles, a => a === '');
    if (isGameDraw) {
      this._endStatus = { status: config.GAME_STATUS.DRAW };
    }

    return isGameDraw;
  }

  switchPlayer() {
    this._currPlayer = this._currPlayer === config.PLAYER.MAXIMIZER ?
      config.PLAYER.MINIMIZER : config.PLAYER.MAXIMIZER;
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
}
