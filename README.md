# tetristic.js
A heuristic-driven Tetris-playing neural network (that runs in your browser!)

## Definitions
- A Tetris Board consists of 10 Columns (vertical) and 20 Rows (horizontal).
- A Column's height is marked by the position of its highest filled cell.
- A Hole is any empty cell surrounded by filled cells.
- A Transition is a crossover from a run of filled cells to Holes, or vice versa.
- A Pit is an empty Column, or a Column with height 0.
- A Well is a group of empty cells, surrounded by filled cells on all sides but the top.
- The depth (height) of a Well is calculated by finding the shallowest point, using the lowest retaining wall. Imagine filling the well with water until it overflowed, then finding the shallowest point of the Well.
- The size of the Well (area/biggest/smallest) is the number of empty cells in the Well below the fill line.

## Heuristics
A list of heuristics that are already implemented for playing Tetris:
1. (None)

A list of heuristics not yet added to the system:
1. Sum of Columns' Height [(1)](#citations)
2. Count of Holes [(1)](#citations)
3. Count of Columns with Holes [(1)](#citations)
4. Bumpiness [(1)](#citations)
5. Sum of Rows' Transitions [(1)](#citations)
6. Sum of Columns' Transitions [(1)](#citations)
7. Count of Pits [(1)](#citations)
8. Deepest Well [(1)](#citations)
9. Biggest Well (My Heuristic)
10. Lines Cleared [(1)](#citations)

## Citations
(1) [Duc Anh Bui's "Beating the world record in Tetris (GB) with genetics algorithm"](https://towardsdatascience.com/beating-the-world-record-in-tetris-gb-with-genetics-algorithm-6c0b2f5ace9b)
