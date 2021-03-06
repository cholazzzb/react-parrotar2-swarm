import FormationControl from "./Libraries/FormationControl.js";
/**
 * EXPERIMENT 8 Testing Formation Control
 *
 */
const setup = {
  ipQuad1 : "192.168.1.9",
  ipQuad2 : "192.168.1.2",
  initialAgentsPosition: [
    [0, 0, 0],
    [2, 0, 0],
  ],
  obstaclesPosition: [
    [4, 5, 1],
    [3, 5, 2],
  ],
  targetsPosition: [[10, 1, 1]],
  fileName: "Ex8Data",
  folderName: "./",
};

try {
  const controller = new FormationControl(setup);
  controller.execute()
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
}
