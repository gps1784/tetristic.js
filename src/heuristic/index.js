// tetristic/heuristic/index.js

// All the heuristics here are normalized.
// That is to say, they are bound to a range of either 0~1 or -1~1
// depending on what is appropriate for our use case.
// I do not want my factors and biases spiraling out of control here,
// so we are normalizing the input of all heuristics.

const MAX_LINES_CLEARED_AT_ONCE = 4;

const Heuristic = {
  sigmoid: function heuristicSigmoid(x) {
    return (2 / (1 + Math.exp(x * -1)) - 1)
  }, // sigmoid()

  getHeightOfCol: function heuristicGetHeightOfCol(board, col) {
    for (let row = board.height - 1; row >= 0; row--) {
      if (board.getCell(col, row) !== null) {
        return (row + 1);
      }
    } // for row
    return 0;
  }, // getHeightOfCol()

  maxHeight: function heuristicMaxHeight(board) {
    // start at the bottom, counting upward
    // this will keep track of the highest populated row,
    // where 0 is the ceiling and 20 is empty
    board.active.decompose();
    let retval = 0;
    for (let row = 0; row < board.height; row++) {
      for (let col = 0; col < board.width; col++) {
        if (board.getCell(col, row) !== null) {
          retval = row;
          break; // skip the rest of this row
        } // if board.getCell
      } // for col
    } // for row
    // normalize this value 0 <=> 1
    // (e.g. height 0 => 0% => 0.0, height 20 => 100% => 1.0)
    retval = retval / board.height;
    return retval;
  }, // maxHeight()

  sumOfHeight: function heuristicSumOfHeight(board) {
    // start at the bottom, counting upward
    // this will keep track of the highest populated row,
    // where 0 is the ceiling and 20 is empty
    board.active.decompose();
    let retval = 0;
    for (let col = 0; col < board.width; col++) {
      retval += Heuristic.getHeightOfCol(board, col);
    } // for col
    retval = retval / (board.height * board.width);
    return retval;
  }, // sumOfHeight()

  bumpiness: function heuristicBumpiness(board) {
    board.active.decompose();
    let retval = 0;
    for (let col = 0; col < board.width - 1; col++) {
      let current = Heuristic.getHeightOfCol(board, col);
      let next    = Heuristic.getHeightOfCol(board, col+1);
      retval += Math.abs(current - next);
    } // for col
    retval = retval / (board.height * (board.width - 1));
    return retval;
  }, // bumpiness()

  newLinesCleared: function heuristicNewLinesCleared(board) {
    // decompose the active block, test for lines cleared,
    // then restore the board to its previous state
    let retval = 0;
    board.clearLines();
    retval = board.score;
    board.active.decompose();
    retval = (board.score - retval) / MAX_LINES_CLEARED_AT_ONCE;
    return retval;
  }, // newLinesCleared()

  list: [], // list
}; // Heuristic

Heuristic.list.push( Heuristic.maxHeight );
Heuristic.list.push( Heuristic.sumOfHeight );
Heuristic.list.push( Heuristic.bumpiness );
Heuristic.list.push( Heuristic.newLinesCleared );

module.exports = Heuristic;
