import FormationControl from "./Libraries/FormationControl.js";
/**
 * EXPERIMENT 10 Testing Formation Control
 * Move 5 m then yaw and move 2m
 */
const setup = {
  ipQuad1: "192.168.1.9",
  ipQuad2: "192.168.1.2",
  initialAgentsPosition: [
    [0, 0, 0],
    [0, 2, 0],
  ],
  obstaclesPosition: [],
  targetsPosition: [[10, 1, 1]],
  fileName: "Ex10Data",
  folderName: "./Experiments/Data/Ex10",
};

try {
  const controller = new FormationControl(setup);
  controller.execute();
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
}
