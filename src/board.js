/* tetristic/src/board.js
 *
 */

const Placement = require('./board/placement2.js');
const Tetromino = require('./tetromino.js');

class Board {
  /* OBJECT MANAGEMENT
   *
   */

  constructor(
    canvasObj,
    width = 10,
    height = 20
  ) {
    // setup the canvas and scaling
    this.screen = canvasObj.getContext('2d');
    this.width  = width;
    this.height = height;
    // move the origin from the top left to the bottom left
    this.screen.resetTransform();
    this.screen.translate(0, this.screen.canvas.height);
    this.scale  = Math.min(
      Math.floor(this.screen.canvas.width  / (this.width + 6)),
      Math.floor(this.screen.canvas.height / this.height),
    );
    // initialize the starting pieces and score
    this.score  = 0;
    this.cells  = Array.from( new Array(width), function() { // column/x
      return Array.from( new Array(height), function() { // row/y
        return null;
      }); // row
    }); // column
    this.active = Tetromino.shapes.random(this);
    this.next   = Tetromino.shapes.random(this, this.active);
    // render the board
    this.render();
  } // Board.constructor()

  clone() {
    let orig     = this;
    let retval   = new Board(orig.screen.canvas, orig.width, orig.height);
    retval.cells = Array.from( new Array(orig.width), function(column, cIndex) { // column/x
      return Array.from( orig.cells[cIndex], function(cell) { // row/y
        return cell ? cell.clone(retval) : null;
      }); // row
    }); // column
    retval.active = orig.active.clone(retval);
    retval.next   = orig.next.clone(retval);
    return retval;
  } // Board#clone()

  /* RENDERING CODE
   *
   */

  render() {
    this.renderBackground();
    this.renderForeground();
    this.renderActive();
    this.renderNext();
    this.renderScore();
  } // Board#render()

  renderBackground(
    scale     = null,
    x         = 0,
    y         = 0,
    width     = this.width,
    height    = this.height,
    fillStyle = 'rgb(150, 150, 150)'
  ) {
    scale = scale || this.scale;
    this.screen.fillStyle = fillStyle;
    for (let col = x; col < width + x; col++) {
      for (let row = y; row < height + y; row++) {
        let _x = col * scale;
        let _y = row * scale * -1;
        this.screen.fillRect(_x+1, _y-1, scale-2, -(scale-2));
      } // for row
    } // for col
    return this; // chainable
  } // Board#renderBackground()

  renderForeground(
    scale  = null,
    x      = 0,
    y      = 0,
    width  = this.width,
    height = this.height
  ) {
    scale = scale || this.scale;
    for (let col of this.cells) {
      for (let cell of col) {
        if (cell !== null) {
          cell.render();
        } // if cell
      } // for cell of col
    } // for col of this.cells
    return this; // chainable
  } // Board#renderForeground()

  renderActive(
    scale = null
  ) {
    scale = scale || this.scale;
    this.active.render();
    return this; // chainable
  } // Board#renderActive()

  renderNext(
    scale = null
  ) {
    scale = scale || this.scale;
    this.screen.font = this.scale + 'px monospace'; // 'dynamic' font!
    this.screen.textBaseline = 'bottom';
    this.renderBackground(scale, 11, 13, 4, 4);
    this.screen.fillText('NEXT', 11*scale, -17*scale);
    this.next.render(13, 14);
    return this; // chainable
  } // Board#renderNext()

  renderScore(
    scale = null
  ) {
    scale = scale || this.scale;
    this.screen.fillStyle = 'rgb(255, 255, 255)';
    this.screen.fillRect(scale*11, scale*-11, scale*4, scale*1);
    this.screen.fillStyle = 'rgb(150, 150, 150)';
    this.screen.fillText("CLEARED:", scale*11, scale*-11);
    this.screen.fillText(this.score, scale*11, scale*-10);
    return this; // chainable
  } // Board#renderScore()

  /* GAMEPLAY LOGIC
   * clearing lines, testing rows and columns, getting and setting cell values
   */

  clearLines() {
    for (let row = this.height - 1; row >= 0; row--) {
      if (this.rowIsFull(row)) {
        this.score++;
        // clear the line if filled
        for (let col = 0; col < this.width; col++) {
          this.cells[col][row] = null;
        } // for col
        // for each row, translate the cells, then move them down in this.cells
        for (let rowAbove = row + 1; rowAbove < this.height; rowAbove++) {
          for (let col = 0; col < this.width; col++) {
            if (this.cells[col][rowAbove] !== null) {
              this.cells[col][rowAbove].translate(0, -1);
            }
            this.cells[col][rowAbove - 1] = this.cells[col][rowAbove];
            this.cells[col][rowAbove]     = null;
          } // for col
        } // for rowAbove
      } // if rowIsFull
    } // for row
  } // Board#clearLines()

  getCell(colX, rowY) {
    return this.cells[colX][rowY];
  } // Board#getCell()

  rowIsFull(row) {
    let full = true;
    for (let col = 0; col < this.width; col++) {
      if (this.cells[col][row] === null) {
        full = false;
        break;
      } // if cell === null
    } // for col
    return full;
  } // Board#rowIsFull()

  rowIsEmpty(row) {
    let empty = true;
    for (let col = 0; col < this.width; col++) {
      if (this.cells[col][row] !== null) {
        empty = false;
        break;
      } // if cell === null
    } // for col
    return empty;
  } // Board#rowIsEmpty()

  play() {
    // hacky workaround for gaining focus https://stackoverflow.com/questions/15631991#16492878
    this.screen.canvas.tabIndex  = 0;
    this.screen.canvas.onkeydown = this.onKeyDown.bind(this);
    this.update(true);
  } // Board#play()

  onKeyDown(event) {
    switch (event.key) {
      case 'q': // CCW
        this.active.rotateCCW();
      break;
      case 'e': // CW
        this.active.rotateCW();
      break;
      case 'a':
      case 'ArrowLeft': // left
        this.active.translate(-1, 0); // dx, dy
      break;
      case 'w':
      case 'ArrowUp': // up
        while (!this.active.canDecompose()) {
          this.active.translate(0, -1); // dx, dy
        }
        this.active.decompose();
        this.active = null;
      break;
      case 'd':
      case 'ArrowRight': // right
        this.active.translate(1, 0); // dx, dy
      break;
      case 's':
      case 'ArrowDown': // down
        // if this piece cannot move downward (latched)
        if (!this.active.translate(0, -1)) {
          // then decompose it and prepare a new one
          this.active.decompose();
          this.active = null;
        }
      break;
      default:
        console.log(`Pressed key: ${event.key}`);
    } // switch event.keythis.screen.canvas
  } // Board#onKeyDown()this.screen.canvas

  update(
    animate = false
  ) {
    // refill the next tetromino, if needed
    if (this.active === null) {
      this.active = this.next;
      this.next   = Tetromino.shapes.random(this, this.active);
    } // if this.active
    this.clearLines();
    this.render();
    if (animate && !this.gameOver()) {
      requestAnimationFrame(this.update.bind(this, animate));
    } // if animate...
  } // Board#update()

  gameOver() {
    if (!(this.rowIsEmpty(18) && this.rowIsEmpty(19))) {
      console.log('GAME OVER\nSCORE:', this.score);
      this.screen.canvas.onkeydown = null;
      return true;
    }
    return false;
  } // Board#gameOver()
} // class Board

Board.Placement = Placement;

module.exports = Board;
