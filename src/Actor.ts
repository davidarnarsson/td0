import Grid, { GridNode, GridAction } from "./Grid";
import ActorState from "./ActorState";

const actionsToRadians: { [key: string]: number } = {
  Up: -Math.PI / 2,
  Down: Math.PI / 2,
  Left: Math.PI,
  Right: 0.0
};

export default class Actor {
  private _state: ActorState;

  private _lastActionWithState: {
    last: ActorState;
    action: GridAction;
  };

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
    this._lastActionWithState = {
      last: this._state,
      action
    };
    this._state = action.node;
  }

  render(context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas;
    const cellWidth = width / this._grid.lengthOfSides;
    const cellHeight = height / this._grid.lengthOfSides;

    context.save();
    context.translate(
      cellWidth * this._state.x + cellWidth / 2,
      cellHeight * this._state.y + cellHeight / 2
    );
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.beginPath();
    context.arc(0, 0, 6.25, 0, 360);

    context.fill();
    context.restore();
    if (this._lastActionWithState !== null) {
      const {
        last: { x: lastX, y: lastY },
        action: { action: actionName }
      } = this._lastActionWithState;

      context.save();
      context.fillStyle = "rgba(0,0,0,0.5)";
      context.translate(cellWidth * lastX + cellWidth / 2, cellHeight * lastY + cellHeight / 2);
      context.rotate(actionsToRadians[actionName]);
      context.beginPath();

      context.moveTo(5, -1);
      context.lineTo(12.5, -1);
      context.lineTo(12.5, -5);
      context.lineTo(20, 0);
      context.lineTo(12.5, 5);
      context.lineTo(12.5, 1);
      context.lineTo(5, 1);
      context.lineTo(5, -1);

      context.fill();
      context.restore();
    }
  }
}
