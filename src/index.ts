import Grid, { GridAction } from "./models/Grid";
import Actor from "./models/Actor";
import ActorState from "./models/ActorState";

let grid: Grid, ctx: CanvasRenderingContext2D, agent: Actor;

let stateValues: number[][] = [];

const generationP = document.querySelector(
  "#generation"
) as HTMLParagraphElement;

let learningRate = 0.2,
  discount = 0.8,
  cumulativeReward = 0,
  explorationFactor = 0.9,
  generation = 0;

function setPolicy(readFromJson: boolean) {
  try {
    if (!readFromJson) throw "booo"; // haxihax
    stateValues = JSON.parse(localStorage.getItem("policy")) as number[][];
  } catch (e) {
    for (let i = 0; i < grid.lengthOfSides; ++i) {
      stateValues[i] = [];
      for (let j = 0; j < grid.lengthOfSides; ++j) {
        stateValues[i][j] = 0;
      }
    }
  }
}

function addListener(id: string, onChange: ((value: number) => void)) {
  document
    .querySelector(id)
    .addEventListener("change", e =>
      onChange(parseInt((e.target as HTMLInputElement).value, 10) / 100.0)
    );
}

function bootstrap() {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

  ctx = canvas.getContext("2d");

  const template = `
   WWWWWWWWWW
   W........W
   W.W..WW..W
   WSW..W..WW
   WWWWWW...W
   W......W.W
   W.WW...W.W
   W..W.WW..W
   W.......DW
   WWWWWWWWWW`;

  grid = new Grid(template.replace(/\s+/gim, ""));
  agent = new Actor(grid);

  setPolicy(true);

  document
    .querySelector("#reset-policy")
    .addEventListener("click", () => setPolicy(false));

  canvas.addEventListener("click", e => {
    const node = grid.getNodeAtPixel(e.offsetX, e.offsetY, ctx);

    if (node != null) {
      node.wall = !node.wall;
      generation = 0;
    }
  });

  addListener("#learning-rate", val => (learningRate = val));
  addListener("#exploration-factor", val => (explorationFactor = val));
  addListener("#discount", val => (discount = val));

  requestAnimationFrame(update);
}

function stateValue(x: number, y: number): number {
  return stateValues[x][y];
}

function setStateValue(x: number, y: number, val: number) {
  stateValues[x][y] = val;
}

function policy(actions: GridAction[]): GridAction | null {
  if (actions.length === 0) return null;

  if (Math.random() > explorationFactor) {
    console.log("exploring!");
    return actions[Math.floor(Math.random() * actions.length)];
  }

  let maxAction = actions[0];

  actions.forEach(a => {
    const { x, y } = a.node;

    if (stateValue(x, y) > stateValue(maxAction.node.x, maxAction.node.y)) {
      maxAction = a;
    }
  });

  return maxAction;
}

function reward(state: ActorState, action: GridAction): number {
  if (action == null) return -2.0;
  if (action.node === grid.destinationNode) {
    return 2.0;
  }

  return -1.0;
}

function update() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  grid.render(ctx);
  agent.render(ctx);
  const actions = agent.actions();
  const { x: prevX, y: prevY } = agent.state;

  const pickedAction = policy(actions);

  if (pickedAction != null) {
    agent.takeAction(pickedAction);
  }

  const { x, y } = agent.state;

  const stepReward = reward(agent.state, pickedAction);
  cumulativeReward += stepReward;

  setStateValue(
    prevX,
    prevY,
    stateValue(prevX, prevY) +
      learningRate *
        (stepReward + discount * stateValue(x, y) - stateValue(prevX, prevY))
  );

  if (agent.state === grid.destinationNode) {
    console.log("Found end, cumulative reward = " + cumulativeReward);
    agent.takeAction({ action: "", node: grid.startNode });
    cumulativeReward = 0;
    generationP.innerText = `Generation: ${generation++}`;
    localStorage.setItem("policy", JSON.stringify(stateValues));
  }

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", bootstrap);
