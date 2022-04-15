const PlacementMovement = {
  ROOT: function placementMovementRoot(board) {
    return true;
  }, // ROOT
  UP: function placementMovementUp(board) {
    while (!board.active.canDecompose()) {
      board.active.translate(0, -1);
    }
    return false; // this is always decompose
  }, // UP
  DOWN: function placementMovementDown(board) {
    return board.active.translate( 0, -1);
  }, // DOWN
  LEFT: function placementMovementLeft(board) {
    return board.active.translate(-1,  0);
  }, // LEFT
  RIGHT: function placementMovementRight(board) {
    return board.active.translate( 1,  0);
  }, // RIGHT
  CW: function placementMovementCW(board) {
    return board.active.rotateCW();
  }, // CW
  CCW: function placementMovementCCW(board) {
    return board.active.rotateCCW();
  }, // CCW
} // const PlacementMovement

const PlacementNodeState = {
  NEW: "NEW",
  VALID: "VALID",
  INVALID: "INVALID",
  KNOWN: "KNOWN",
  PLACED: "PLACED",
} // const PlacementNodeState

class PlacementNode {
  constructor(parent, move, knownPositions, board=null) {
    this.best  = {moves: [], score: Number.NEGATIVE_INFINITY};
    this.state = PlacementNodeState.NEW;
    // keep track of all moves made so far
    this.moves = new Array();
    if (parent !== null) {
      this.moves = Array.from(parent.moves);
      this.board = parent.board.clone();
    } else {
      this.board = board.clone();
    } // if parent
    this.moves.push(move);
    // validate this movement
    this.children = new Array();
    if (move(this.board)) {
      if (
        (knownPositions[JSON.stringify(this.board.active)]) &&
        (knownPositions[JSON.stringify(this.board.active)] <= this.moves.length)
      ) {
        this.state = PlacementNodeState.KNOWN;
      } else {
        this.state = PlacementNodeState.VALID;
        knownPositions[JSON.stringify(this.board.active)] = this.moves.length;
        this.createChildPlacementNodes(move, knownPositions);
      }
    } else {
      this.state = PlacementNodeState.INVALID;
      if (this.board.active.canDecompose()) {
        this.state = PlacementNodeState.PLACED;
        //console.info('PlacementNode constructor()', this);
      }
    } // if move board
  } // constructor()

  createChildPlacementNodes(lastMove, knownPositions) {
    switch (lastMove) {
      case PlacementMovement.UP:
        // no legal moves after an UP, halt
      break;
      case PlacementMovement.ROOT:
      case PlacementMovement.DOWN:
        // any move can be legal after a DOWN
        this.children = [
          new PlacementNode(this, PlacementMovement.UP, knownPositions),
          new PlacementNode(this, PlacementMovement.DOWN, knownPositions),
          new PlacementNode(this, PlacementMovement.LEFT, knownPositions),
          new PlacementNode(this, PlacementMovement.RIGHT, knownPositions),
          new PlacementNode(this, PlacementMovement.CW, knownPositions),
          new PlacementNode(this, PlacementMovement.CCW, knownPositions),
        ];
      break;
      case PlacementMovement.LEFT:
        // should not go RIGHT immediently after a LEFT
        this.children = [
          new PlacementNode(this, PlacementMovement.UP, knownPositions),
          new PlacementNode(this, PlacementMovement.DOWN, knownPositions),
          new PlacementNode(this, PlacementMovement.LEFT, knownPositions),
          new PlacementNode(this, PlacementMovement.CW, knownPositions),
          new PlacementNode(this, PlacementMovement.CCW, knownPositions),
        ];
      break;
      case PlacementMovement.RIGHT:
        // should not go LEFT immediently after a RIGHT
        this.children = [
          new PlacementNode(this, PlacementMovement.UP, knownPositions),
          new PlacementNode(this, PlacementMovement.DOWN, knownPositions),
          new PlacementNode(this, PlacementMovement.RIGHT, knownPositions),
          new PlacementNode(this, PlacementMovement.CW, knownPositions),
          new PlacementNode(this, PlacementMovement.CCW, knownPositions),
        ];
      break;
      case PlacementMovement.CW:
        // should not go CCW immediently after a CW
        // should not go CW four times in a row
        this.children = [
          new PlacementNode(this, PlacementMovement.UP, knownPositions),
          new PlacementNode(this, PlacementMovement.DOWN, knownPositions),
          new PlacementNode(this, PlacementMovement.LEFT, knownPositions),
          new PlacementNode(this, PlacementMovement.RIGHT, knownPositions),
        ];
        // check last three moves
        if (this.moves.slice(-3) !== [PlacementMovement.CW, PlacementMovement.CW, PlacementMovement.CW]) {
          this.children.push(new PlacementNode(this, PlacementMovement.CW, knownPositions));
        }
      break;
      case PlacementMovement.CCW:
        // should not go CW immediently after a CCW
        // should not go CCW four times in a row
        this.children = [
          new PlacementNode(this, PlacementMovement.UP, knownPositions),
          new PlacementNode(this, PlacementMovement.DOWN, knownPositions),
          new PlacementNode(this, PlacementMovement.LEFT, knownPositions),
          new PlacementNode(this, PlacementMovement.RIGHT, knownPositions),
        ];
        // check last three moves
        if (this.moves.slice(-3) !== [PlacementMovement.CCW, PlacementMovement.CCW, PlacementMovement.CCW]) {
          this.children.push(new PlacementNode(this, PlacementMovement.CCW, knownPositions));
        }
      break;
    }
  } // createChildPlacementNodes()

  findBest(network) {
    if (this.state === PlacementNodeState.PLACED) {
      network.calculateNetwork(this.board);
      this.best.moves = this.moves;
      this.best.score = network.values[network.values.length - 1][0];
    } else {
      for (let child of this.children) {
        child.findBest(network);
        // take the higher score
        if (child.best.score > this.best.score) {
          this.best.score = child.best.score;
          this.best.moves = child.best.moves;
        // if they're equal, take the faster route
        } else if (
          (child.best.score === this.best.score) &&
          (child.best.moves.length < this.best.moves.length)) {
            this.best.score = child.best.score;
            this.best.moves = child.best.moves;
        }
      } // for child of this.children
    } // if state === PLACED
  } // findBest()
} // class PlacementNode

class Placement {
  constructor(board, network) {
    this.board   = board;
    this.network = network;
    this.knownPositions = {};
  } // constructor()

  /* The logic to this one is kinda funky, so I'll lay it out
   * ahead of time. There are only six valid moves you can
   * make with a Tetromino:
   * 1) MOVE DOWN (no restrictions, irreversable)
   * 2) MOVE LEFT (cannot immediently follow/be followed by MOVE RIGHT)
   * 3) MOVE RIGHT (cannot immediently follow/be followed by MOVE LEFT)
   * 4) ROTATE CW (cannot perform four times in a row;
   *      cannot immediently follow/be followed by ROTATE CCW)
   * 5) ROTATE CCW (cannot perform four times in a row;
   *      cannot immediently follow/be followed by ROTATE CW)
   * 6) MOVE UP (secret quit-out early move, irreversable)
   *
   * With this in mind, we can construct a search tree, working
   * down the tree until all leaf nodes have been verified to have
   * no further valid moves afterwards. We can feed all the leaf states
   * into the heuristics to find the best placement for our current piece.
   * In case of a tie, we can take the leaf with the shortest path.
   */
  findBest() {
    console.log(`Finding Best Move for ${this.board.active.name}...`);
    this.root = new PlacementNode(null, PlacementMovement.ROOT, this.knownPositions, this.board);
    this.root.findBest(this.network);
    console.log('Best Move:', this.root.best);
    let moves = Array.from(this.root.best.moves);
    this.animate(moves);
  } // findBest()

  animate(moves) {
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
        console.log('HALTING')
      } else {
        requestAnimationFrame(this.network.play.bind(this.network, this.board));
      }
    }
  } // animate()

} // class Placement

module.exports = Placement;
