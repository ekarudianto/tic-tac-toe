/* eslint-disable no-underscore-dangle */
import config from 'config/app-config.json';

export default class Game {
  constructor() {
    this._boardSize = config.BOARD_SIZE;
    this._tiles = new Array(this._boardSize * this._boardSize).join('.').split('.');
    this._hasOver = false;
  }

  get boardSize() {
    return this._boardSize;
  }

  get tiles() {
    return this._tiles;
  }

  set tiles(arg) {
    this._tiles = arg;
  }

  get hasOver() {
    return this._hasOver;
  }
}
