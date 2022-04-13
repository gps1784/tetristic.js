const Placement = require('./placement.js');
const Tetromino = require('../tetromino/index.js');

class Board {
  constructor(canvasObj, scale=20) {
    let rowCount = this.rowCount = 20;
    let colCount = this.colCount = 10;
    this.context = canvasObj.getContext('2d');
    this.scale   = scale;
    this.clears  = 0;
    // generate an empty board of cells
    this.cells = Array.from( new Array(rowCount), function() {
      return Array.from( new Array(colCount), function() { return null; });
    });
    // generate the upcoming pieces
    this.activeTetromino = Tetromino.shape.getRandom();
    this.nextTetromino   = Tetromino.shape.getRandom(this.activeTetromino);
    // render
    this.renderBackground();
    this.renderForeground();
    this.renderNext();
  } // constructor()

  clone() {
    let retval = new Board(this.context.canvas, this.scale);
    let rowCount = retval.rowCount;
    let colCount = retval.colCount;
    let _orig    = this;
    retval.cells = Array.from( new Array(rowCount), function(row, rowIndex) {
      return Array.from( _orig.cells[rowIndex], function(cell) { return cell ? cell.clone() : null; });
    });
    retval.activeTetromino = this.activeTetromino.clone();
    retval.nextTetromino   = this.nextTetromino.clone();
    return retval;
  } // clone()

  renderBackground(scale=this.scale, xLow=0, xHigh=10, yLow=0, yHigh=20) {
    this.context.fillStyle = 'rgb(150, 150, 150)';
    for (let _row = yLow; _row < yHigh; _row++) {
      for (let _col = xLow; _col < xHigh; _col++) {
        let _y = _row * scale;
        let _x = _col * scale;
        this.context.fillRect( _x+1, _y+1, scale-2, scale-2 );
      } // for _col
    } // for _row
  } // renderBackground()

  renderForeground(scale=this.scale, xLow=0, xHigh=10, yLow=0, yHigh=20) {
    for (let _row = yLow; _row < yHigh; _row++) {
      for (let _col = xLow; _col < xHigh; _col++) {
        let _cell = this.cells[_row][_col];
        if (_cell !== null) {
          _cell.render(this);
        }
      } // for _col
    } // for _row
    this.activeTetromino.render(this);
  } // renderForeground()

  renderNext(scale=this.scale) {
    this.context.font         = this.scale + 'px monospace';
    this.context.textBaseline = 'bottom';
    this.context.strokeStyle  = 'rgb(150, 150, 150)';
    this.renderBackground(scale, 11, 15, 3, 7);
    this.context.fillText("NEXT", scale*11, scale*3);
    this.nextTetromino.render(this, 13, 5);
    this.context.fillStyle = 'rgb(255, 255, 255)';
    this.context.fillRect(scale*11, scale*9, scale*4, scale*1);
    this.context.fillStyle = 'rgb(150, 150, 150)';
    this.context.fillText("CLEARED:", scale*11, scale*9);
    this.context.fillText(this.clears, scale*11, scale*10);
  } // renderNext()

  play() {
    document.onkeydown = this.onKeyDown.bind(this);
    requestAnimationFrame(this.update.bind(this, true));
  } // play()

  onKeyDown(event) {
    switch (event.key) {
      case 'q': // CCW
        this.activeTetromino.rotateCCW(this);
      break;
      case 'e': // CW
        this.activeTetromino.rotateCW(this);
      break;
      case 'a':
      case 'ArrowLeft': // left
        this.activeTetromino.translate(this,  -1, 0); // dx, dy
      break;
      case 'w':
      case 'ArrowUp': // up
        while (!this.activeTetromino.testForLatch(this)) {
          this.activeTetromino.translate(this, 0, 1); // dx, dy
        }
        this.activeTetromino.decompose(this);
        this.activeTetromino = null;
      break;
      case 'd':
      case 'ArrowRight': // right
        this.activeTetromino.translate(this,   1, 0); // dx, dy
      break;
      case 's':
      case 'ArrowDown': // down
        // if this piece cannot move downward (latched)
        if (!this.activeTetromino.translate(this,   0, 1)) {
          // then decompose it and prepare a new one
          this.activeTetromino.decompose(this);
          this.activeTetromino = null;
        }
      break;
      default:
        console.log(`Pressed key: ${event.key}`);
    }
  } // onKeyDown()

  clearLines() {
    for (let _row = this.rowCount - 1; _row > 0; _row--) {
      while (this.cells[_row].every(function(_cell) { return _cell !== null; })) {
        // shift each row above downward
        this.clears++;
        for (let _rowAbove = _row; _rowAbove > 0; _rowAbove--) {
          // clear this row
          this.cells[_rowAbove] = Array.from(new Array(this.colCount), function() { return null; })
          // translate the cells down
          for (let _cell of this.cells[_rowAbove-1]) {
            if (_cell !== null) {
              _cell.translate(this, 0, 1);
            }
          }
          // replace the row with the contents of the one above
          this.cells[_rowAbove] = Array.from(this.cells[_rowAbove - 1]);
        }
      } // if _row is full
    } // for _row
  } // clearLines()

  keepPlaying() {
    return (
      this.cells[0].every(function(_cell) { return _cell === null}) &&
      this.cells[1].every(function(_cell) { return _cell === null})
    );
  } // keepPlaying()

  update(animate=false) {
    // refill the next tetromino, if needed
    if (this.activeTetromino === null) {
      this.activeTetromino = this.nextTetromino;
      this.nextTetromino   = Tetromino.shape.getRandom();
    }
    this.clearLines();
    this.renderBackground();
    this.renderForeground();
    this.renderNext();
    if (animate && this.keepPlaying()) {
      requestAnimationFrame(this.update.bind(this, animate));
    }
  } // update()
} // class Board

Board.Placement = Placement;

module.exports = Board;
