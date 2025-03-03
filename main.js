class boardNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.edges = [];
    this.isVisited = undefined;
    this.parent = null;
  }
}
class chessBoard {
  constructor() {
    this.size = 8;
    this.board = {};
    this.buildBoard();
  }

  buildBoard() {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (this.#isValidCoordinates(x, y)) {
          const node = new boardNode(x, y);
          this.board[`${x},${y}`] = node;
        }
      }
    }
    this.#getKnightEdges(this.board);
  }

  #isValidCoordinates(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  #getKnightEdges() {
    for (let key in this.board) {
      const node = this.board[key];
      const [x, y] = [node.x, node.y];

      const possibleMoves = [
        [x - 1, y - 2],
        [x - 2, y - 1],
        [x + 2, y - 1],
        [x + 1, y - 2],
        [x - 2, y + 1],
        [x - 1, y + 2],
        [x + 1, y + 2],
        [x + 2, y + 1],
      ];

      for (let [edgeX, edgeY] of possibleMoves) {
        if (this.#isValidCoordinates(edgeX, edgeY)) {
          const edgeCoordinates = `${edgeX},${edgeY}`;
          node.edges.push(this.board[edgeCoordinates]);
        }
      }
    }
  }

  #reconstructPath(endNode) {
    let path = [];
    let current = endNode;

    while (current !== null) {
      path.unshift([current.x, current.y]);
      current = current.parent;
    }
    return path;
  }

  #resetBoard() {
    for (let key in this.board) {
      this.board[key].isVisited = false;
      this.board[key].parent = null;
    }
  }

  #formatPath(path) {
    if (!path) return "not a valid path";

    let stepsMessage = "Path found in " + (path.length - 1) + " moves !" + "\n";

    for (let i = 0; i < path.length; i++) {
      const coordinates = path[i];
      stepsMessage += `[${coordinates[0]}, ${coordinates[1]}], `;
    }

    return stepsMessage;
  }

  knightMoves(start, finish) {
    this.#resetBoard();
    if (
      !this.#isValidCoordinates(start[0], start[1]) ||
      !this.#isValidCoordinates(finish[0], finish[1])
    ) {
      throw new Error("enter valid coordinates");
    }

    const startNode = this.board[`${start[0]},${start[1]}`];
    const finishNode = this.board[`${finish[0]},${finish[1]}`];

    let queue = [startNode];
    startNode.isVisited = true;

    while (queue.length !== 0) {
      let currentNode = queue.shift();

      if (currentNode.x === finishNode.x && currentNode.y === finishNode.y) {
        const reconstrucPath = this.#reconstructPath(currentNode);
        return this.#formatPath(reconstrucPath);
      } else {
        for (let i = 0; i < currentNode.edges.length; i++) {
          const neighbor = currentNode.edges[i];
          if (!neighbor.isVisited) {
            neighbor.isVisited = true;
            neighbor.parent = currentNode;
            queue.push(neighbor);
          }
        }
      }
    }
    return null;
  }
}

let board = new chessBoard();
console.log(board.knightMoves([3, 2], [1, 2]));
