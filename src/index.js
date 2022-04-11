var Tetristic = {};

Tetristic.Board = require('./board/index.js');

window.onload = function() {
  let board = new Tetristic.Board( document.getElementById('tetristic-board') );
  console.log(board);
  board.play();
};
