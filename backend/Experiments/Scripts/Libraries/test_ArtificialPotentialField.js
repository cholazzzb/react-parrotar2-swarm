import ArtificialPotentialField from "./ArtificialPotentialField.js";

const APF = new ArtificialPotentialField();

// Test 1
APF.setAgentsPosition([
  [1, 2, 2],
  [1, 2, 3],
]);
console.log(APF.Agents_Position);

// Test 2
APF.setObstaclesPosition([
  [1, 2, 3],
  [1, 2, 3],
  [2, 3, 4],
]);
console.log(APF.Obstacles_Position);

// Test 3
APF.setTargetsPosition([
  [2, 3, 4],
  [3, 4, 5],
  [3, 4, 5],
]);
console.log(APF.Targets_Position);

// Test 4
const TPF = APF.calculateTargetsPotentialForce([
  [1, 2, 3],
  [1, 2, 3],
]);
console.log(TPF);

// Test 5
const OPF = APF.calculateObstaclesPotentialForce();
console.log(OPF);

// Test 6
const TAPF = APF.calculateTotalForce([
  [1, 2, 3],
  [1, 2, 3],
]);
console.log(TAPF);
