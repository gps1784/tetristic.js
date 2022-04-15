/* tetristic/src/placement.js
 *
 */

const Node  = require('./placement/node.js');

class Placement {
  constructor(board, neuralnet) {
    this.board = board;
    this.neuralnet = neuralnet;
    // TODO: skipping redundant positions for now
  } // Placement.constructor()

  explore() {
    console.log(`Finding possible moves for ${this.board.active.name}...`);
    this.tree = Node.Root(this.board, this.neuralnet);
    console.log(`Finding best fit for neural network...`);
    let best = this.tree.explore(this.neuralnet);
    console.log('Best move:', best);
    return this;
  } // Placement#explore()

  animate(moves = this.tree.best.moves) {
    let move = moves.shift();
    move(this.board);
    this.board.update();
    if (moves.length > 0) {
      requestAnimationFrame(this.animate.bind(this, moves));
    } else {
      this.board.active.decompose(this.board);
      this.board.active = null;
      this.board.update();
      if (this.board.gameOver()) {
        console.log(this.network);
        console.log('HALTING')
      } else {
        requestAnimationFrame(this.neuralnet.play.bind(this.neuralnet, this.board));
      } // if this.board.gameOver()
    } // if moves.length > 0
  }; // Placement#animate()
}

Placement.Node = Node;

module.exports = Placement;
