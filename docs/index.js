/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board/index.js":
/*!****************************!*\
  !*** ./src/board/index.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tetromino = __webpack_require__(/*! ../tetromino/index.js */ \"./src/tetromino/index.js\");\r\n\r\nclass Board {\r\n  constructor(canvasObj, scale=20) {\r\n    this.context = canvasObj.getContext('2d');\r\n    this.scale   = scale;\r\n    // generate an empty board of cells\r\n    this.cells   = [];\r\n    for (let _row = 0; _row < 20; _row++) {\r\n      this.cells.push([]);\r\n      for (let _col = 0; _col < 10; _col++) {\r\n        this.cells[this.cells.length - 1].push(null);\r\n      } // for _col\r\n    } // for _row\r\n    // generate the upcoming pieces\r\n    this.activeTetromino = Tetromino.shape.getRandom();\r\n    this.nextTetromino   = Tetromino.shape.getRandom(this.activeTetromino);\r\n    // render\r\n    this.renderBackground();\r\n    this.renderForeground();\r\n    this.renderNext();\r\n  } // constructor()\r\n\r\n  renderBackground(scale=this.scale, xLow=0, xHigh=10, yLow=0, yHigh=20) {\r\n    this.context.fillStyle = 'rgb(150, 150, 150)';\r\n    for (let _row = yLow; _row < yHigh; _row++) {\r\n      for (let _col = xLow; _col < xHigh; _col++) {\r\n        let _y = _row * scale;\r\n        let _x = _col * scale;\r\n        this.context.fillRect( _x+1, _y+1, scale-2, scale-2 );\r\n      } // for _col\r\n    } // for _row\r\n  } // renderBackground()\r\n\r\n  renderForeground(scale=this.scale, xLow=0, xHigh=10, yLow=0, yHigh=20) {\r\n    for (let _row = yLow; _row < yHigh; _row++) {\r\n      for (let _col = xLow; _col < xHigh; _col++) {\r\n        let _cell = this.cells[_row][_col];\r\n        if (_cell !== null) {\r\n          let _y = _row * scale;\r\n          let _x = _col * scale;\r\n          this.content.fillStyle = _cell.color;\r\n          this.context.fillRect( _x+1, _y+1, scale-2, scale-2 );\r\n        }\r\n      } // for _col\r\n    } // for _row\r\n    this.activeTetromino.render(this);\r\n  } // renderForeground()\r\n\r\n  renderNext(scale=this.scale) {\r\n    this.context.font         = this.scale + 'px monospace';\r\n    this.context.textBaseline = 'bottom';\r\n    this.context.strokeStyle  = 'rgb(150, 150, 150)';\r\n    this.renderBackground(scale, 11, 15, 3, 7);\r\n    this.context.fillText(\"NEXT\", scale*11, scale*3);\r\n    this.nextTetromino.render(this, 13, 5);\r\n  } // renderNext()\r\n\r\n  play() {\r\n    document.onkeydown = this.onKeyDown.bind(this);\r\n    requestAnimationFrame(this.update.bind(this));\r\n  } // play()\r\n\r\n  onKeyDown(event) {\r\n    console.log(`Pressed key: ${event.key}`);\r\n    switch (event.key) {\r\n      case 'q': // CCW\r\n        this.activeTetromino.rotateCCW(this);\r\n        this.update();\r\n      break;\r\n      case 'e': // CW\r\n        this.activeTetromino.rotateCW(this);\r\n        this.update();\r\n      break;\r\n      case 'a':\r\n      case 'ArrowLeft': // left\r\n        this.activeTetromino.translate(this, -1,  0); // dx, dy\r\n        this.update();\r\n      break;\r\n      case 'w':\r\n      case 'ArrowUp': // up\r\n        this.activeTetromino.translate(this,  0, -1); // dx, dy\r\n        this.update();\r\n      break;\r\n      case 'd':\r\n      case 'ArrowRight': // right\r\n        this.activeTetromino.translate(this,  1,  0); // dx, dy\r\n        this.update();\r\n      break;\r\n      case 's':\r\n      case 'ArrowDown': // down\r\n        this.activeTetromino.translate(this,  0,  1); // dx, dy\r\n        this.update();\r\n      break;\r\n    }\r\n  } // onKeyDown()\r\n\r\n  update() {\r\n    // refill the next tetromino, if needed\r\n    if (this.activeTetromino === null) {\r\n      console.log('getting next tetromino: ' + this.nextTetromino.name);\r\n      this.activeTetromino = this.nextTetromino;\r\n      this.nextTetromino   = Tetromino.shape.getRandom();\r\n    }\r\n    this.renderBackground();\r\n    this.renderForeground();\r\n    this.renderNext();\r\n  } // update()\r\n} // class Board\r\n\r\nmodule.exports = Board;\r\n\n\n//# sourceURL=webpack://tetristic/./src/board/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var Tetristic = {};\r\n\r\nTetristic.Board = __webpack_require__(/*! ./board/index.js */ \"./src/board/index.js\");\r\n\r\nwindow.onload = function() {\r\n  let board = new Tetristic.Board( document.getElementById('tetristic-board') );\r\n  console.log(board);\r\n  board.play();\r\n};\r\n\n\n//# sourceURL=webpack://tetristic/./src/index.js?");

/***/ }),

/***/ "./src/tetromino/index.js":
/*!********************************!*\
  !*** ./src/tetromino/index.js ***!
  \********************************/
/***/ ((module) => {

eval("DEFAULT_STARTING_POS = {x: 5, y: 1};\r\n\r\nclass Tetromino {\r\n  constructor(name, cellArray, color='rgb(100, 100, 50)', startingPos=DEFAULT_STARTING_POS) {\r\n    this.name      = name;\r\n    this.origin    = startingPos;\r\n    this.cellArray = cellArray;\r\n    this.color     = color;\r\n  } // constructor()\r\n\r\n  getCells(x=this.origin.x, y=this.origin.y) {\r\n    let _cells = [];\r\n    for (let _cell of this.cellArray) {\r\n      _cells.push({\r\n        x: _cell.x + x, // column\r\n        y: _cell.y + y, // row\r\n      });\r\n    }\r\n    return _cells;\r\n  } // getCells()\r\n\r\n  render(board, x=this.origin.x, y=this.origin.y) {\r\n    for (let _cell of this.getCells(x, y)) {\r\n      board.context.fillStyle = this.color;\r\n      board.context.fillRect(\r\n        (_cell.x * board.scale) + 1, // x\r\n        (_cell.y * board.scale) + 1, // y\r\n        board.scale - 2, // w\r\n        board.scale - 2  // h\r\n      );\r\n    } // for _cell of getCells()\r\n  } // render()\r\n\r\n  translate(board, dx=0, dy=0) {\r\n    for (let _cell of this.getCells()) {\r\n      if ((_cell.x + dx >= 10) || (_cell.x + dx < 0)) {\r\n        return false;\r\n      } else if ((_cell.y + dy >= 20) || (_cell.y + dy < 0)) {\r\n        return false;\r\n      }\r\n    }\r\n    this.origin.x += dx;\r\n    this.origin.y += dy;\r\n  } // translate()\r\n\r\n  rotateCW(board) {\r\n    let _rotatedCells = [];\r\n    for (let _cell of this.cellArray) {\r\n      let _x = this.origin.x - _cell.y;\r\n      let _y = this.origin.y + _cell.x;\r\n      if ((_x >= 10) || (_x < 0)) {\r\n        return false; // outside the bounds\r\n      } else if ((_y >= 20) || (_y < 0)) {\r\n        return false; // outside the bounds\r\n      } else {\r\n        _rotatedCells.push(\r\n          {x: _cell.y * -1, y: _cell.x}\r\n        ); // _rotatedCells.push\r\n      } // if valid\r\n    } // for _cell of this.cellArray\r\n    this.cellArray = _rotatedCells;\r\n  } // rotateCW()\r\n\r\n  rotateCCW(board) {\r\n    let _rotatedCells = [];\r\n    for (let _cell of this.cellArray) {\r\n      let _x = this.origin.x + _cell.y;\r\n      let _y = this.origin.y - _cell.x;\r\n      if ((_x >= 10) || (_x < 0)) {\r\n        return false; // outside the bounds\r\n      } else if ((_y >= 20) || (_y < 0)) {\r\n        return false; // outside the bounds\r\n      } else {\r\n        _rotatedCells.push(\r\n          {x: _cell.y, y: _cell.x * -1}\r\n        ); // _rotatedCells.push\r\n      } // if valid\r\n    } // for _cell of this.cellArray\r\n    this.cellArray = _rotatedCells;\r\n  } // rotateCCW()\r\n} // class Tetromino\r\n\r\nTetromino.shape = {\r\n  I: new Tetromino(\r\n    'I',\r\n    [\r\n      {x: -2, y: -1},\r\n      {x: -1, y: -1},\r\n      {x:  0, y: -1},\r\n      {x:  1, y: -1},\r\n    ],\r\n    'Turquoise'\r\n  ), // I\r\n  J: new Tetromino(\r\n    'J',\r\n    [\r\n      {x: -1, y: -1},\r\n      {x: -1, y:  0},\r\n      {x:  0, y:  0},\r\n      {x:  1, y:  0},\r\n    ],\r\n    'RoyalBlue'\r\n  ), // J\r\n  L: new Tetromino(\r\n    'L',\r\n    [\r\n      {x:  1, y: -1},\r\n      {x:  1, y:  0},\r\n      {x:  0, y:  0},\r\n      {x: -1, y:  0},\r\n    ],\r\n    'Tomato'\r\n  ), // L\r\n  O: new Tetromino(\r\n    'O',\r\n    [\r\n      {x: -1, y: -1},\r\n      {x:  0, y: -1},\r\n      {x: -1, y:  0},\r\n      {x:  0, y:  0},\r\n    ],\r\n    'Gold'\r\n  ), // O\r\n  S: new Tetromino(\r\n    'S',\r\n    [\r\n      {x:  1, y: -1},\r\n      {x:  0, y: -1},\r\n      {x:  0, y:  0},\r\n      {x: -1, y:  0},\r\n    ],\r\n    'SeaGreen'\r\n  ), // S\r\n  T: new Tetromino(\r\n    'T',\r\n    [\r\n      {x:  0, y:  0},\r\n      {x:  1, y:  0},\r\n      {x:  0, y: -1},\r\n      {x: -1, y:  0},\r\n    ],\r\n    'HotPink'\r\n  ), // T\r\n  Z: new Tetromino(\r\n    'Z',\r\n    [\r\n      {x:  1, y:  0},\r\n      {x:  0, y:  0},\r\n      {x:  0, y: -1},\r\n      {x: -1, y: -1},\r\n    ],\r\n    'DarkRed'\r\n  ), // Z\r\n  getRandom: function(lastTetromino={name: null}) {\r\n    let _arr = [\r\n      Tetromino.shape.I,\r\n      Tetromino.shape.J,\r\n      Tetromino.shape.L,\r\n      Tetromino.shape.O,\r\n      Tetromino.shape.S,\r\n      Tetromino.shape.T,\r\n      Tetromino.shape.Z\r\n    ]\r\n    let _rand = Math.floor(Math.random() * 7);\r\n    // don't force it not to repeat, just attempt once as a nudge\r\n    // this reduces the chance of repeats from 1/7 to 1/49\r\n    if (lastTetromino.name === _arr[_rand].name) {\r\n      _rand = Math.floor(Math.random() * 7);\r\n    }\r\n    return _arr[_rand];\r\n  },\r\n};\r\n\r\nmodule.exports = Tetromino;\r\n\n\n//# sourceURL=webpack://tetristic/./src/tetromino/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;