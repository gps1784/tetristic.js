const Tetromino = require('../tetromino/index.js');

class Board {
  constructor(canvasObj, scale=20) {
    this.context = canvasObj.getContext('2d');
    this.scale   = scale;
    // generate an empty board of cells
    this.cells   = [];
    for (let _row = 0; _row < 20; _row++) {
      this.cells.push([]);
      for (let _col = 0; _col < 10; _col++) {
        this.cells[this.cells.length - 1].push(null);
      } // for _col
    } // for _row
    // generate the upcoming pieces
    this.activeTetromino = Tetromino.shape.getRandom();
    this.nextTetromino   = Tetromino.shape.getRandom(this.activeTetromino);
    // render
    this.renderBackground();
    this.renderForeground();
    this.renderNext();
  } // constructor()

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
          let _y = _row * scale;
          let _x = _col * scale;
          this.content.fillStyle = _cell.color;
          this.context.fillRect( _x+1, _y+1, scale-2, scale-2 );
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
  } // renderNext()

  play() {
    document.onkeydown = this.onKeyDown.bind(this);
    requestAnimationFrame(this.update.bind(this));
  } // play()

  onKeyDown(event) {
    console.log(`Pressed key: ${event.key}`);
    switch (event.key) {
      case 'q': // CCW
        this.activeTetromino.rotateCCW(this);
        this.update();
      break;
      case 'e': // CW
        this.activeTetromino.rotateCW(this);
        this.update();
      break;
      case 'a':
      case 'ArrowLeft': // left
        this.activeTetromino.translate(this, -1,  0); // dx, dy
        this.update();
      break;
      case 'w':
      case 'ArrowUp': // up
        this.activeTetromino.translate(this,  0, -1); // dx, dy
        this.update();
      break;
      case 'd':
      case 'ArrowRight': // right
        this.activeTetromino.translate(this,  1,  0); // dx, dy
        this.update();
      break;
      case 's':
      case 'ArrowDown': // down
        this.activeTetromino.translate(this,  0,  1); // dx, dy
        this.update();
      break;
    }
  } // onKeyDown()

  update() {
    // refill the next tetromino, if needed
    if (this.activeTetromino === null) {
      console.log('getting next tetromino: ' + this.nextTetromino.name);
      this.activeTetromino = this.nextTetromino;
      this.nextTetromino   = Tetromino.shape.getRandom();
    }
    this.renderBackground();
    this.renderForeground();
    this.renderNext();
  } // update()
} // class Board

module.exports = Board;
