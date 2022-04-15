const Tetromino = require('./index2.js');

const Shapes = {
  I: function shapesI(board) {
    return new Tetromino(
      board,
      'I',
      [
        {x: -2, y:  1},
        {x: -1, y:  1},
        {x:  0, y:  1},
        {x:  1, y:  1},
      ],
      'Turquoise'
    ); // return new Tetromino()
  }, // Shapes.I()
  J: function shapesJ(board) {
    return new Tetromino(
      board,
      'J',
      [
        {x: -1, y:  1},
        {x: -1, y:  0},
        {x:  0, y:  0},
        {x:  1, y:  0},
      ],
      'RoyalBlue'
    ); // return new Tetromino()
  }, // Shapes.J()
  L: function shapesL(board) {
    return new Tetromino(
      board,
      'L',
      [
        {x:  1, y:  1},
        {x:  1, y:  0},
        {x:  0, y:  0},
        {x: -1, y:  0},
      ],
      'Tomato'
    ); // return new Tetromino()
  }, // Shapes.L()
  O: function shapesO(board) {
    return new Tetromino(
      board,
      'O',
      [
        {x: -1, y:  1},
        {x:  0, y:  1},
        {x: -1, y:  0},
        {x:  0, y:  0},
      ],
      'Gold'
    ); // return new Tetromino()
  }, // Shapes.O()
  S: function shapesS(board) {
    return new Tetromino(
      board,
      'S',
      [
        {x:  1, y:  1},
        {x:  0, y:  1},
        {x:  0, y:  0},
        {x: -1, y:  0},
      ],
      'SeaGreen'
    ); // return new Tetromino()
  }, // Shapes.S()
  T: function shapesT(board) {
    return new Tetromino(
      board,
      'T',
      [
        {x:  0, y:  0},
        {x:  0, y:  1},
        {x:  1, y:  0},
        {x: -1, y:  0},
      ],
      'HotPink'
    ); // return new Tetromino()
  }, // Shapes.T()
  Z: function shapesZ(board) {
    return new Tetromino(
      board,
      'Z',
      [
        {x:  1, y:  0},
        {x:  0, y:  0},
        {x:  0, y:  1},
        {x: -1, y:  1},
      ],
      'DarkRed'
    ); // return new Tetromino()
  }, // Shapes.Z()
  random: function shapesRandom(
    board,
    last = { name: null },
  ) {
    // direct access would be faster,
    // at the expense of needing to clone the selected
    // TODO: allow direct access to the original templates
    // to speed up this function if needed?
    let array = [
      Shapes.I(board),
      Shapes.J(board),
      Shapes.L(board),
      Shapes.O(board),
      Shapes.S(board),
      Shapes.T(board),
      Shapes.Z(board),
    ];
    let random = Math.floor(Math.random() * 7);
    // don't force it not to repeat, just roll again as a nudge
    // this reduces the chance of a repeat from 1/7 to 1/49
    if (last.name === array[random].name) {
      random = Math.floor(Math.random() * 7);
    }
    return array[random];
  } // Shapes.random()
}; // const Shapes

module.exports = Shapes;
