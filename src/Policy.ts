import ActorState from "./ActorState";
import { GridAction } from "./Grid";

export default class Policy {
  public explorationFactor = 0.2;
  public discount = 0.9;
  public learningRate = 0.1;

  private constructor(private _values: number[][]) {}

  static fromString(localStorageData: string, size: number): Policy {
    try {
      const values = JSON.parse(localStorageData) as number[][];
      if (!values) throw "Cannot parse data!";

      return new Policy(values);
    } catch (e) {
      return this.fromSeed(() => 0, size);
    }
  }

  serialize(): string {
    return JSON.stringify(this._values);
  }

  value(state: ActorState): number {
    const { x, y } = state;
    return this._values[x][y];
  }

  setValue(state: ActorState, value: number) {
    const { x, y } = state;
    this._values[x][y] = value;
  }

  processStep(fromState: ActorState, toState: ActorState, reward: number) {
    const newValue =
      this.value(fromState) +
      this.learningRate * (reward + this.discount * this.value(toState) - this.value(fromState));

    this.setValue(fromState, newValue);
  }

  evaluate(actions: GridAction[]): GridAction {
    if (actions.length === 0) return null;

    if (Math.random() < this.explorationFactor) {
      console.log("exploring!");
      return actions[Math.floor(Math.random() * actions.length)];
    }

    let maxAction = actions[0];

    actions.forEach(a => {
      if (this.value(a.node) > this.value(maxAction.node)) {
        maxAction = a;
      }
    });

    return maxAction;
  }

  static fromSeed(seed: () => number, size: number): Policy {
    const stateValues: number[][] = [];
    for (let i = 0; i < size; ++i) {
      stateValues[i] = [];
      for (let j = 0; j < size; ++j) {
        stateValues[i][j] = seed();
      }
    }

    return new Policy(stateValues);
  }
}
