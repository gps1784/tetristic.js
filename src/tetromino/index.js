DEFAULT_STARTING_POS = {x: 5, y: 1};

class Tetromino {
  constructor(name, cellArray, color='rgb(100, 100, 50)', startingPos=DEFAULT_STARTING_POS) {
    this.name      = name;
    this.origin    = startingPos;
    this.cellArray = cellArray;
    this.color     = color;
  } // constructor()

  getCells(x=this.origin.x, y=this.origin.y) {
    let _cells = [];
    for (let _cell of this.cellArray) {
      _cells.push({
        x: _cell.x + x, // column
        y: _cell.y + y, // row
      });
    }
    return _cells;
  } // getCells()

  render(board, x=this.origin.x, y=this.origin.y) {
    for (let _cell of this.getCells(x, y)) {
      board.context.fillStyle = this.color;
      board.context.fillRect(
        (_cell.x * board.scale) + 1, // x
        (_cell.y * board.scale) + 1, // y
        board.scale - 2, // w
        board.scale - 2  // h
      );
    } // for _cell of getCells()
  } // render()

  translate(board, dx=0, dy=0) {
    for (let _cell of this.getCells()) {
      if ((_cell.x + dx >= 10) || (_cell.x + dx < 0)) {
        return false;
      } else if ((_cell.y + dy >= 20) || (_cell.y + dy < 0)) {
        return false;
      }
    }
    this.origin.x += dx;
    this.origin.y += dy;
  } // translate()

  rotateCW(board) {
    let _rotatedCells = [];
    for (let _cell of this.cellArray) {
      let _x = this.origin.x - _cell.y;
      let _y = this.origin.y + _cell.x;
      if ((_x >= 10) || (_x < 0)) {
        return false; // outside the bounds
      } else if ((_y >= 20) || (_y < 0)) {
        return false; // outside the bounds
      } else {
        _rotatedCells.push(
          {x: _cell.y * -1, y: _cell.x}
        ); // _rotatedCells.push
      } // if valid
    } // for _cell of this.cellArray
    this.cellArray = _rotatedCells;
  } // rotateCW()

  rotateCCW(board) {
    let _rotatedCells = [];
    for (let _cell of this.cellArray) {
      let _x = this.origin.x + _cell.y;
      let _y = this.origin.y - _cell.x;
      if ((_x >= 10) || (_x < 0)) {
        return false; // outside the bounds
      } else if ((_y >= 20) || (_y < 0)) {
        return false; // outside the bounds
      } else {
        _rotatedCells.push(
          {x: _cell.y, y: _cell.x * -1}
        ); // _rotatedCells.push
      } // if valid
    } // for _cell of this.cellArray
    this.cellArray = _rotatedCells;
  } // rotateCCW()
} // class Tetromino

Tetromino.shape = {
  I: new Tetromino(
    'I',
    [
      {x: -2, y: -1},
      {x: -1, y: -1},
      {x:  0, y: -1},
      {x:  1, y: -1},
    ],
    'Turquoise'
  ), // I
  J: new Tetromino(
    'J',
    [
      {x: -1, y: -1},
      {x: -1, y:  0},
      {x:  0, y:  0},
      {x:  1, y:  0},
    ],
    'RoyalBlue'
  ), // J
  L: new Tetromino(
    'L',
    [
      {x:  1, y: -1},
      {x:  1, y:  0},
      {x:  0, y:  0},
      {x: -1, y:  0},
    ],
    'Tomato'
  ), // L
  O: new Tetromino(
    'O',
    [
      {x: -1, y: -1},
      {x:  0, y: -1},
      {x: -1, y:  0},
      {x:  0, y:  0},
    ],
    'Gold'
  ), // O
  S: new Tetromino(
    'S',
    [
      {x:  1, y: -1},
      {x:  0, y: -1},
      {x:  0, y:  0},
      {x: -1, y:  0},
    ],
    'SeaGreen'
  ), // S
  T: new Tetromino(
    'T',
    [
      {x:  0, y:  0},
      {x:  1, y:  0},
      {x:  0, y: -1},
      {x: -1, y:  0},
    ],
    'HotPink'
  ), // T
  Z: new Tetromino(
    'Z',
    [
      {x:  1, y:  0},
      {x:  0, y:  0},
      {x:  0, y: -1},
      {x: -1, y: -1},
    ],
    'DarkRed'
  ), // Z
  getRandom: function(lastTetromino={name: null}) {
    let _arr = [
      Tetromino.shape.I,
      Tetromino.shape.J,
      Tetromino.shape.L,
      Tetromino.shape.O,
      Tetromino.shape.S,
      Tetromino.shape.T,
      Tetromino.shape.Z
    ]
    let _rand = Math.floor(Math.random() * 7);
    // don't force it not to repeat, just attempt once as a nudge
    // this reduces the chance of repeats from 1/7 to 1/49
    if (lastTetromino.name === _arr[_rand].name) {
      _rand = Math.floor(Math.random() * 7);
    }
    return _arr[_rand];
  },
};

module.exports = Tetromino;
