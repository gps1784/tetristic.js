var Tetristic = {};

Tetristic.Board = require('./board/index.js');
Tetristic.Network = require('./network/index.js');

window.onload = function() {
  let board = new Tetristic.Board( document.getElementById('tetristic-board') );
  let network = new Tetristic.Network( document.getElementById('tetristic-network') );
  board.play();
  network.play(board);
};
