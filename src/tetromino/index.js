/* tetristic/src/tetromino/index.js
 *
 */

class Tetromino {
  constructor(
    board,
    name,
    cellArray,
    color = 'rgb(100, 100, 50)',
    origin = { x: Math.floor(board.width/2), y: board.height-2 }
  ) {
    this.board     = board;
    this.name      = name;
    this.cellArray = cellArray; //Array.from(cellArray, function(cell) { Object.assign({}, cell) });
    this.color     = color;
    this.origin    = Object.assign({}, origin);
  } // Tetromino.constructor()

  clone(
    board = null,
    origin = null
  ) {
    board  = board  || this.board;
    origin = origin || this.origin;
    return new Tetromino(board, this.name, this.cellArray, this.color, origin);
  } // Tetromino#clone()

  toJSON(key) {
    // NOTE: I may regret this later
    // this is a hacky way of getting past the self-reference from this.board.active...
    return JSON.stringify(this.cells());
  } // Tetromino#toJSON()

  cells(
    x = this.origin.x,
    y = this.origin.y
  ) {
    let cells = new Array();
    for (let cell of this.cellArray) {
      cells.push(
        {
          x: cell.x + x, // column
          y: cell.y + y, // row
        }
      ); // cell.push
    } // for cell of this.cellArray
    return cells;
  } // Tetromino#cells()

  render(
    x = this.origin.x,
    y = this.origin.y,
  ) {
    for (let cell of this.cells(x, y)) {
      this.board.screen.fillStyle = this.color;
      this.board.screen.fillRect(
        (cell.x * this.board.scale) + 1, // x
        (cell.y * this.board.scale * -1) - 1, // y
        this.board.scale - 2, // w
        (this.board.scale - 2) * -1, // h
      ); // fillRect
    } // for cell of this.cells()
  } // Tetromino#render()

  translate(
    dx=0,
    dy=0
  ) {
    // check for validity
    for (let cell of this.cells()) {
      let x = cell.x + dx; // column
      let y = cell.y + dy; // row
      //console.debug(this, cell, x, y, this.isValidCell(x,y));
      if (this.isValidCell(x, y) === false) {
        return false;
      } // if this.isValidCell()
    } // for cell of this.cells()
    this.origin.x += dx;
    this.origin.y += dy;
    return this; // chainable
  } // Tetromino#translate()

  rotateCW() {
    let rotatedCells = new Array();
    for (let cell of this.cellArray) {
      let x = this.origin.x + cell.y;
      let y = this.origin.y - cell.x;
      if (this.isValidCell(x, y) === false) {
        return false;
      } else {
        rotatedCells.push(
          {
            x: cell.y,
            y: cell.x * -1,
          }
        ); // rotatedCells.push()
      } // if this.isValidCell()
    } // for cell of this.cellArray
    this.cellArray = rotatedCells;
    return this; // chainable
  } // Tetromino#rotateCW()

  rotateCCW() {
    let rotatedCells = new Array();
    for (let cell of this.cellArray) {
      let x = this.origin.x - cell.y;
      let y = this.origin.y + cell.x;
      if (this.isValidCell(x, y) === false) {
        return false;
      } else {
        rotatedCells.push(
          {
            x: cell.y * -1,
            y: cell.x,
          }
        ); // rotatedCells.push()
      } // if this.isValidCell()
    } // for cell of this.cellArray
    this.cellArray = rotatedCells;
    return this; // chainable
  } // Tetromino#rotateCCW()

  isValidCell(x, y) {
    if ((x >= this.board.width) || (x < 0)) {
      return false; // out of bounds
    } else if ((y >= this.board.height) || (y < 0)) {
      return false; // out of bounds
    } else if (this.board.getCell(x, y) !== null) {
      return false; // already occupied
    } else {
      return true; // legal
    }
  } // Tetromino#isValidCell()

  canDecompose() {
    for (let cell of this.cells()) {
      if ((cell.y === 0)) {
        return true; // resting on floor
      } else if (this.board.getCell(cell.x, cell.y-1)) {
        return true; // resting on another piece
      } // if cell is resting
    } // for cell of this.cells()
    return false;
  } // Tetromino#canDecompose()

  decompose() {
    for (let cell of this.cells()) {
      this.board.cells[cell.x][cell.y] = new Tetromino(
        this.board,
        this.name,
        [
          {x: 0, y: 0},
        ],
        this.color,
        {x: cell.x, y: cell.y}
      ); // new Tetromino
    } // for cell of this.cells()
  } // Tetromino#decompose()
} // class Tetromino

module.exports = Tetromino;
