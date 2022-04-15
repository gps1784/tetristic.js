/* tetristic/src/placement/node.js
 *
 */
const Move = require('./move.js');
const State = require('./state.js');

class Node {
  constructor(parent, move, board=null) {
    this.parent = parent;
    this.board  = (board && board.clone()) || parent.board.clone();
    this.state  = State.NEW;
    this.best   = { moves: [], score: Number.NEGATIVE_INFINITY };
    this.moves  = (parent ? Array.from(parent.moves) : new Array());
    this.moves.push(move);
  } // Node.constructor()

  createChildNodes() {
    this.children = new Array();
    for (let child of Move.getNextMoves(this.moves)) {
      this.children.push( new Node(this, child) );
    } // for child of Move.getNextMoves()
    return this.children;
  } // Node#createChildNodes()

  explore(neuralnet) {
    let queue        = [this];
    let fastestRoute = {};
    let attempt      = 1_000;
    this.maxQueue    = 1;
    this.placed      = 0;
    while (queue.length > 0) {
      this.maxQueue = Math.max(this.maxQueue, queue.length);
      let next = queue.shift();
      next.createChildNodes();
      switch (next.test(fastestRoute)) {
        case State.VALID: // keep searching
          queue.push(...next.children);
        break;
        case State.PLACED:
          this.placed++;
          neuralnet.calculateNetwork(next.board);
          next.best.moves = next.moves;
          next.best.score = neuralnet.values[neuralnet.values.length - 1][0];
          next.better(this); // replace this.best if better
        break;
        case State.SLOW:
        case State.INVALID:
        break; // do nothing, not valid
        default:
          console.warn('Cannot handle Placement.Node State:', next.state);
      } // switch next.test()
    } // while queue.length
    console.info(this);
    console.info(this.maxQueue, queue.length, this.placed);
    return this.best;
  } // Node#explore()

  better(parent = null) {
    parent = parent || this.parent;
    if (this.best.score > parent.best.score) {
      parent.best.score = this.best.score;
      parent.best.moves = this.best.moves;
      return true;
    } else if (
      (this.best.score === parent.best.score) &&
      (this.best.moves.length < parent.best.moves.length)
    ) {
      parent.best.moves = this.best.moves;
      return true;
    }
    return false;
  } // Node#better()

  test(fastestRoute) {
    for (let move of this.moves) {
      if (move(this.board)) {
        this.state = State.VALID;
        let fastestPrevious = fastestRoute[JSON.stringify(this.board.active)];
        //console.debug(fastestRoute, fastestPrevious);
        if (fastestPrevious && fastestPrevious.moves.length <= this.moves.length) {
          this.state = State.SLOW;
        } else {
          fastestRoute[JSON.stringify(this.board.active)] = fastestPrevious || { state: State.SLOW };
          fastestRoute[JSON.stringify(this.board.active)].state = State.SLOW;
          fastestRoute[JSON.stringify(this.board.active)] = this;
        }
      } else if (this.board.active.canDecompose()) {
        this.state = State.PLACED;
      } else {
        this.state = State.INVALID;
      } // if can move
    } // for move of this.moves
    return this.state;
  } // Node#test()
} // class Node

Node.Root = function PlacementNodeRoot(board, neuralnet) {
  return new Node(null, Move.ROOT, board);
}; // Node.Root()

Node.Move  = Move;
Node.State = State;

module.exports = Node;
