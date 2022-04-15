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
1. Maximum Column Height (No known citation)
2. Sum of Columns' Height [(1)](#ci)
3. Bumpiness [(1)](#citations)
4. Lines Cleared [(1)](#citations)

A list of heuristics not yet added to the system:
1. Count of Holes [(1)](#citations)
2. Count of Columns with Holes [(1)](#citations)
3. Sum of Rows' Transitions [(1)](#citations)
4. Sum of Columns' Transitions [(1)](#citations)
5. Count of Pits [(1)](#citations)
6. Deepest Well [(1)](#citations)
7. Biggest Well (No known citation)

### Smartest Attempt So Far

![Smartest attempt so far. Recorded April 15, 2022](/docs/images/smartest/smartest.png)

It cleared some lines! After watching it pile up pieces in futility on a death march, it finally actually cleared some lines. It still leaves tons of gaps, but it actually started to play there for a minute.

## To-Do
- The move planner (board/placement.js) is extremely slow on the first few pieces, presumably because the board is empty. This can take several seconds per route, often up to 5 seconds on my PC.
- The NN could use the "NEXT" tetromino to plan ahead, much as you or I could (although this would take exponentially longer than placing one piece)
- The board needs a fail state
- The NN needs a meta-manager, to keep track of when it fails, recording data about successes, breeding NNs, etc.

## Citations
(1) [Duc Anh Bui's "Beating the world record in Tetris (GB) with genetics algorithm"](https://towardsdatascience.com/beating-the-world-record-in-tetris-gb-with-genetics-algorithm-6c0b2f5ace9b)
