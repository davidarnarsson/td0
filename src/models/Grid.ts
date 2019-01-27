export interface GridNode {
  wall: boolean;
  x: number;
  y: number;
  start: boolean;
  destination: boolean;
}

export interface GridAction {
  node: GridNode;
  action: string;
}

function nodeFromTemplate(
  template: string,
  index: number,
  lengthOfSides: number
): GridNode {
  return {
    wall: template === "W",
    x: index % lengthOfSides,
    y: Math.floor(index / lengthOfSides),
    start: template === "S",
    destination: template === "D"
  };
}

export default class Grid {
  private _grid: GridNode[] = [];

  private _length: number = 0;

  constructor(template: string) {
    this._length = Math.floor(Math.sqrt(template.length));

    this._grid = template
      .replace(/\s+/gim, "")
      .split("")
      .map((t, i) => nodeFromTemplate(t, i, this._length));
  }

  getNode(x: number, y: number): GridNode | null {
    return this._grid[this._length * y + x];
  }

  getActions(x: number, y: number): GridAction[] {
    return [
      [this.getNode(x - 1, y), "Left"],
      [this.getNode(x, y - 1), "Down"],
      [this.getNode(x + 1, y), "Right"],
      [this.getNode(x, y + 1), "Up"]
    ]
      .filter(
        ([node, action]: [GridNode | null, string]) =>
          node !== null && node.wall === false
      )
      .map(([node, action]: [GridNode, string]) => ({ node, action }));
  }

  get lengthOfSides(): number {
    return this._length;
  }

  get grid() {
    return this._grid;
  }

  get startNode(): GridNode {
    return this._grid.filter(x => x.start)[0];
  }

  get destinationNode(): GridNode {
    return this._grid.filter(x => x.destination)[0];
  }

  getNodeAtPixel(
    x: number,
    y: number,
    context: CanvasRenderingContext2D
  ): GridNode {
    const { cellWidth, cellHeight } = this.getCellDimensions(context);

    const cellX = Math.floor(x / cellWidth),
      cellY = Math.floor(y / cellHeight);

    return this.getNode(cellX, cellY);
  }

  render(context: CanvasRenderingContext2D) {
    const { cellWidth, cellHeight } = this.getCellDimensions(context);

    for (let y = 0; y < this.lengthOfSides; ++y)
      for (let x = 0; x < this.lengthOfSides; ++x) {
        context.strokeStyle = context.fillStyle = "#555";
        context.lineWidth = 2;
        const node = this.getNode(x, y);
        if (node == null) continue;

        context.strokeRect(
          x * cellWidth,
          y * cellHeight,
          cellWidth,
          cellHeight
        );
        if (node.wall) {
          context.fillRect(
            x * cellWidth,
            y * cellHeight,
            cellWidth,
            cellHeight
          );
        }

        if (node.start) {
          context.strokeStyle = "green";
          context.lineWidth = 4;
          context.beginPath();
          context.arc(
            x * cellWidth + cellWidth / 2,
            y * cellHeight + cellHeight / 2,
            cellWidth / 4,
            0,
            360
          );
          context.stroke();
        }
        if (node.destination) {
          context.lineWidth = 4;
          context.strokeStyle = "red";

          context.beginPath();

          context.arc(
            x * cellWidth + cellWidth / 2,
            y * cellHeight + cellHeight / 2,
            cellWidth / 4,
            0,
            360
          );
          context.stroke();
        }
      }
  }

  private getCellDimensions(context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas;
    const cellWidth = width / this.lengthOfSides;
    const cellHeight = height / this.lengthOfSides;
    return { cellWidth, cellHeight };
  }
}
