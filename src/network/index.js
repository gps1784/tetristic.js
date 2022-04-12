const Heuristic = require('../heuristic/index.js');

class Network {
  constructor(canvasObj=null, depth=null, widths=null, weights=null, biases=null) {
    this.context = canvasObj.getContext('2d');
    this.generate(depth, widths, weights, biases);
    this.render();
  } // constructor()

  generate(depth, widths, weights, biases) {
    if (depth === null) {
      this.depth = Math.floor(1 + Math.random() * 3); // 1 <=> 3 layers
    } else {
      this.depth = depth;
    }

    if (widths === null) {
      this.widths = [];
      let _lastLayerWidth = Heuristic.list.length;
      for (let _layer = 0; _layer < this.depth - 1; _layer++) {
        // this forces a layer to be between x0.5 <=> x1.5 the size of the last
        let _newLayerWidth = Math.max( Math.floor( _lastLayerWidth * (0.5 + Math.random()) ), 2);
        this.widths.push(_newLayerWidth);
        _lastLayerWidth = _newLayerWidth;
      } // for _layer
      this.widths.push(1);
    } else {
      this.widths = widths;
    }

    if (weights === null) {
      this.weights = [];
      let _lastLayerWidth = Heuristic.list.length;
      for (let _layer = 0; _layer < this.depth; _layer++) {
        this.weights.push( new Array() );
        for (let _node = 0; _node < this.widths[_layer]; _node++) {
          this.weights[_layer].push( new Array() );
          for (let _lastNode = 0; _lastNode < _lastLayerWidth; _lastNode++) {
            this.weights[_layer][_node].push( (Math.random() * 2) - 1 ); // -1 <=> 1
          } // for _lastNode
        } // for _node
        _lastLayerWidth = this.widths[_layer];
      } // for _layer
    } else {
      this.weights = weights;
    }

    if (biases === null) {
      this.biases = [];
      for (let _layer = 0; _layer < this.depth; _layer++) {
        this.biases.push( new Array() );
        for (let _node = 0; _node < this.widths[_layer]; _node++) {
          this.biases[_layer].push( (Math.random() * 2) - 1 ); // -1 <=> 1
        } // for _node
      } // for _layer
    } else {
      this.biases = biases;
    }

    // how wide are the graphics for the neural network allowed to be?
    this.widthScale = Math.floor(
      // canvas width divided by the largest of either
      // the widest point in the neural network or the starting inputs
      this.context.canvas.width / Math.max(...this.widths, Heuristic.list.length)
    );
    // how tall are the graphics for the neural network allowed to be?
    this.heightScale = Math.floor(
      // the input and output layers will always be visible, plus any hidden layers
      this.context.canvas.height / (this.depth + 1)
    );
    console.log(this);
  } // generate()

  render() {
    this.renderLinks();
    this.renderNodes();
  } // render()

  renderNodes() {
    let scale = Math.min(this.widthScale, this.heightScale);
    let offset = Math.floor(scale / 2);
    // the inputs
    for (let _input = 0; _input < Heuristic.list.length; _input++) {
      let _x = (_input * scale) + offset / 2;
      let _y = offset / 2;
      this.context.lineWidth   = 2;
      this.context.fillStyle   = 'rgb(255, 255, 255)';
      this.context.fillRect(_x+1, _y+1, scale/2 - 2, scale/2 - 2);
      this.context.strokeStyle = 'rgb(0, 0, 0)';
      this.context.strokeRect(_x, _y, scale/2, scale/2);
    } // for _input
    // the hidden/output layers
    for (let _layer = 0; _layer < this.depth; _layer++) {
      for (let _node = 0; _node < this.widths[_layer]; _node++) {
        let _x = (_node * scale) + offset / 2;
        let _y = ((_layer+1) * scale) + offset / 2;
        this.context.lineWidth   = 2;
        this.context.fillStyle   = 'rgb(255, 255, 255)';
        this.context.fillRect(_x+1, _y+1, scale/2 - 2, scale/2 - 2);
        this.context.strokeStyle = 'rgb(0, 0, 0)';
        this.context.strokeRect(_x, _y, scale/2, scale/2);
      } // for _node
    } // for _layer
  } // renderNodes()

  renderLinks() {
    let scale = Math.min(this.widthScale, this.heightScale);
    let offset = Math.floor(scale / 2);
    for (let _layer = 0; _layer < this.depth; _layer++) {
      for (let _node = 0; _node < this.widths[_layer]; _node++) {
        let _start = {x: _node * scale, y: (_layer + 1) * scale};
        for (let _link = 0; _link < this.weights[_layer][_node].length; _link++) {
          let _end = {x: _link * scale, y: _layer * scale};
          console.log(`line: ${_start.x},${_start.y} <=> ${_end.x},${_end.y} ${this.calcColorRedBlackGreen(this.weights[_layer][_node][_link])}`);
          this.context.lineWidth   = 5;
          this.context.strokeStyle = this.calcColorRedBlackGreen(this.weights[_layer][_node][_link]);
          this.context.beginPath();
          this.context.moveTo(_start.x + offset, _start.y + offset);
          this.context.lineTo(_end.x + offset, _end.y + offset);
          this.context.stroke();
        } // for _link
      } // for _node
    } // for _layer
  } // renderLinks()

  calcColorRedBlackGreen(decimal) {
    let red   = 0;
    let blue  = 0;
    let green = 0;
    if (decimal < 0) { // red/black (based on 'crimson')
      red   = Math.floor(decimal * -220);
      blue  = Math.floor(decimal *  -20);
      green = Math.floor(decimal *  -60);

    } else { // green/black (based on 'sea green')
      red   = Math.floor(decimal *  20);
      blue  = Math.floor(decimal * 220);
      green = Math.floor(decimal *  60);
    }
    return `rgb(${red},${blue},${green})`;
  } // calcColorRedBlackGreen()

  calcColorRedWhiteGreen() {} // calcColorRedWhiteGreen()

  play(board) {} // play()
} // class Network

Network.heuristic = Heuristic;

module.exports = Network;
