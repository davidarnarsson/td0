import Grid, { GridNode, GridAction } from "./Grid";
import ActorState from "./ActorState";

export default class Actor {
  private _state: ActorState;
  
  constructor(private _grid: Grid) {
    this._state = _grid.startNode;
  }

  actions(): GridAction[] {
    return this._grid.getActions(this._state.x, this._state.y);
  }

  get state() {
    return this._state;
  }

  takeAction(action: GridAction) {
    this._state = action.node;
  }

  render(context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas;
    const cellWidth = width / this._grid.lengthOfSides;
    const cellHeight = height / this._grid.lengthOfSides;

    context.fillStyle = "#000";
    context.beginPath();
    context.arc(cellWidth * this._state.x + cellWidth / 2, cellHeight * this._state.y + cellHeight / 2, 10, 0, 360);
    context.fill();
  }

}
