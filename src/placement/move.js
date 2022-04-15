/* tetristic/src/placement/move.js
 *
 */

const Move = {
  ROOT: function MoveRoot(board) {
    return true; // do nothing
  }, // ROOT()

  UP: function MoveUp(board) {
    while (!board.active.canDecompose()) {
      board.active.translate(0, -1); // repeat move down
    };
    return false; // always stop after a hard drop
  }, // UP()

  DOWN: function MoveDown(board) {
    return board.active.translate(0, -1); // move down once
  }, // DOWN()

  LEFT: function MoveLeft(board) {
    return board.active.translate(-1, 0); // move left once
  }, // LEFT()

  RIGHT: function MoveRight(board) {
    return board.active.translate(1, 0); // move right once
  }, // RIGHT()

  CW: function MoveCW(board) {
    return board.active.rotateCW(); // move CW once
  }, // CW()

  CCW: function MoveCCW(board) {
    return board.active.rotateCCW(); // move CCW once
  }, // CCW()

  getNextMoves: function MoveGetNextMoves(moves) {
    let lastMove = moves.slice(-1)[0];
    let children = [];
    switch (lastMove) {
      case Move.UP:
        // no legal moves
      break;
      // any move is legal at the start, or after a down
      case Move.ROOT:
      case Move.DOWN:
        children = [
          Move.UP,
          Move.DOWN,
          Move.LEFT,
          Move.RIGHT,
          Move.CW,
          Move.CCW,
        ];
      break;
      // should not go RIGHT immediently after a LEFT
      case Move.LEFT:
        children = [
          Move.UP,
          Move.DOWN,
          Move.LEFT,
          Move.CW,
          Move.CCW,
        ];
      break;
      // should not go LEFT immediently after a RIGHT
      case Move.RIGHT:
        children = [
          Move.UP,
          Move.DOWN,
          Move.RIGHT,
          Move.CW,
          Move.CCW,
        ];
      break;
      // should not go CCW immediently after a CW
      // should not go CW four times in a row
      case Move.CW:
        children = [
          Move.UP,
          Move.DOWN,
          Move.LEFT,
          Move.RIGHT,
        ];
        if (moves.slice(-3) !== [Move.CW, Move.CW, Move.CW]) {
          children.push(Move.CW);
        }
      break;
      // should not go CW immediently after a CCW
      // should not go CCW four times in a row
      case Move.CCW:
        children = [
          Move.UP,
          Move.DOWN,
          Move.LEFT,
          Move.RIGHT,
        ];
        if (moves.slice(-3) !== [Move.CCW, Move.CCW, Move.CCW]) {
          children.push(Move.CCW);
        }
      break;
      default:
        console.warn('Cannot getNextMoves for move:', lastMove);
    } // switch lastMove
    return children;
  }, // getNextMoves()
}; // const Move

module.exports = Move;
