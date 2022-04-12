// tetristic/heuristic/index.js

// All the heuristics here are normalized.
// That is to say, they are bound to a range of either 0~1 or -1~1
// depending on what is appropriate for our use case.
// I do not want my factors and biases spiraling out of control here,
// so we are normalizing the input of all heuristics.

const Heuristic = {
  sigmoid: function heuristicSigmoid(x) {
    return (2 / (1 + Math.exp(x * -1)) - 1)
  }, // sigmoid()

  maxHeight: function heuristicMaxHeight(board) {
    // start at the bottom, counting upward
    // this will keep track of the highest populated row,
    // where 0 is the ceiling and 20 is empty
    let retval = 0;
    for (var _row = board.rowCount - 1; _row >= 0; _row--) {
      for (let _cell of board.cells[_row]) {
        if (_cell !== null) {
          retval = board.rowCount - _row;
        } // if _cell !== null
      } // for _cell
    } // for _row
    // reverse this, then normalize
    // (e.g. row 0 => height 20 => 100% => 1.0)
    retval = retval / board.rowCount;
    return retval;
  }, // maxHeight()

  sumOfHeight: function heuristicSumOfHeight(board) {
    // start at the bottom, counting upward
    // this will keep track of the highest populated row,
    // where 0 is the ceiling and 20 is empty
    let retval = board.rowCount;
    let cols   = new Array(board.colCount);
    cols.fill(0);
    for (let _row = board.rowCount - 1; _row >= 0; _row--) {
      for (let _col = 0; _col < board.colCount; _col++) {
        if (board.cells[_row][_col] !== null) {
          cols[_col] = board.rowCount - _row;
        }
      } // for _col
    } // for _row
    //
    retval = cols.reduce(function(sum, curr) { return sum + curr }, 0);
    retval = retval / (board.rowCount * board.colCount);
    return retval;

  }, // sumOfHeight()

  list: [], // list
}; // Heuristic

Heuristic.list.push( Heuristic.maxHeight );
Heuristic.list.push( Heuristic.sumOfHeight );

module.exports = Heuristic;
