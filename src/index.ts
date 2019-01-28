import Grid, { GridAction } from "./Grid";
import Actor from "./Actor";
import ActorState from "./ActorState";
import Policy from "./Policy";

let grid: Grid, ctx: CanvasRenderingContext2D, agent: Actor, policy: Policy;

const generationP = document.querySelector(
  "#generation"
) as HTMLParagraphElement;

let cumulativeReward = 0,
  generation = 0;

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

  const serializedPolicy = localStorage.getItem("policy");

  if (serializedPolicy) {
    policy = Policy.fromString(serializedPolicy, grid.lengthOfSides);
  } else {
    policy = Policy.fromSeed(() => 0.5, grid.lengthOfSides);
  }

  document.querySelector("#reset-policy").addEventListener("click", () => {
    policy = Policy.fromSeed(() => 0.5, grid.lengthOfSides);
    reset();
  });

  canvas.addEventListener("click", e => {
    const node = grid.getNodeAtPixel(e.offsetX, e.offsetY, ctx);

    if (node != null) {
      node.wall = !node.wall;
    }

    reset();
  });

  addListener("#learning-rate", val => (policy.learningRate = val));
  addListener("#exploration-factor", val => (policy.explorationFactor = val));
  addListener("#discount", val => (policy.discount = val));

  requestAnimationFrame(loop);
}

function reward(state: ActorState, action: GridAction): number {
  if (action == null) return -2.0;
  if (action.node === grid.destinationNode) {
    return 1.0;
  }

  return -1.0;
}

function reset() {
  generation = 0;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

function render() {
 // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  grid.render(ctx);
  agent.render(ctx);
}

function update() {
  const actions = agent.actions();

  const prevState = agent.state;

  const pickedAction = policy.evaluate(actions);

  if (pickedAction != null) {
    agent.takeAction(pickedAction);
  }

  const nextState = agent.state;

  const stepReward = reward(agent.state, pickedAction);

  cumulativeReward += stepReward;

  policy.processStep(prevState, nextState, stepReward);

  if (agent.state === grid.destinationNode) {
    console.log("Found end, cumulative reward = " + cumulativeReward);
    agent.takeAction({ action: "", node: grid.startNode });
    cumulativeReward = 0;
    generationP.innerText = `Generation: ${generation++}`;
    localStorage.setItem("policy", policy.serialize());
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
