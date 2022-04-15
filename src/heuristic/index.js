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
    let retval = 0;
    let cols   = new Array(board.width);
    cols.fill(0);
    for (let col = 0; col < board.width; col++) {
      for (let row = 0; row < board.height; row++) {
        if (board.getCell(col, row) !== null) {
          cols[col] = row;
        } // if board.getCell
      } // for row
    } // for col
    //
    retval = cols.reduce(function(sum, curr) { return sum + curr }, 0);
    retval = retval / (board.height * board.width);
    return retval;

  }, // sumOfHeight()

  list: [], // list
}; // Heuristic

Heuristic.list.push( Heuristic.maxHeight );
Heuristic.list.push( Heuristic.sumOfHeight );

module.exports = Heuristic;
