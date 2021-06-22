import FormationControl from "./Libraries/FormationControl.js";
/**
 * EXPERIMENT 10 Testing Formation Control
 *  Move in Formation with 1 Obstacle
 */
const setup = {
  ipQuad1: "192.168.1.9",
  ipQuad2: "192.168.1.2",
  initialAgentsPosition: [
    [0, 0, 0],
    [0, 2, 0],
  ],
  obstaclesPosition: [[1, 5, 1]],
  targetsPosition: [[10, 1, 1]],
  fileName: "Ex11Data",
  folderName: "./Experiments/Data/Ex11",
};

try {
  const controller = new FormationControl(setup);
  controller.execute();
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
}
