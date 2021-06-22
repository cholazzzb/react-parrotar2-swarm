import FormationControl from "./Libraries/FormationControl.js";
/**
 * EXPERIMENT 9 Testing Formation Control
 *  Move Straight 5m
 */
const setup = {
  ipQuad1: "192.168.1.9",
  ipQuad2: "192.168.1.2",
  initialAgentsPosition: [
    [0, 0, 0],
    [0, 2, 0],
  ],
  obstaclesPosition: [],
  targetsPosition: [[10, 0, 1]],
  fileName: "Ex9Data",
  folderName: "./Experiments/Data/Ex9",
  mode: "implementation",
};

try {
  const controller = new FormationControl(setup);
  controller.execute();
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
}
