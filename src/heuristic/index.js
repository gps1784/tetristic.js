// tetristic/heuristic/index.js

// All the heuristics here are normalized.
// That is to say, they are bound to a range of either 0~1 or -1~1
// depending on what is appropriate for our use case.
// I do not want my factors and biases spiraling out of control here,
// so we are normalizing the input of all heuristics.

const Heuristic = {
  maxHeight: function heuristicMaxHeight(board) {
    // start at the bottom, counting upward
    // this will keep track of the highest populated row,
    // where 0 is the ceiling and 20 is empty
    let retval = board.rowCount;
    for (var _row = board.rowCount - 1; i > 0; i--) {
      for (let _cell of board.cells[_row]) {
        if (_cell !== null) {
          retval = _row;
        } // if _cell !== null
      } // for _cell
    } // for _row
    // reverse this, then normalize
    // (e.g. row 0 => height 20 => 100% => 1.0)
    retval = (board.rowCount - retval) / board.rowCount;
    return retval;
  }, // maxHeight()

  list: [], // list
}; // Heuristic

Heuristic.list.push( Heuristic.maxHeight );

module.exports = Heuristic;
