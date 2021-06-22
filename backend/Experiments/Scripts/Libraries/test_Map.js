import Map from "./Map.js";

const initialAgentsPosition = [
  [0, 0, 0],
  [2, 0, 0],
];
const obstaclesPosition = [[5, 5, 1]];
const targetsPosition = [[10, 10, 1]];

// test 0
const ExMap1 = new Map(
  initialAgentsPosition,
  obstaclesPosition,
  targetsPosition
);

// test 1
console.log(ExMap1.history);

// test 2
ExMap1.addDataToHistory(
  {
    time: 0.3,
    xPos: 0.1,
    yPos: 0.1,
    zPos: 1,
    yaw: 1,
  },
  1
);
console.log(ExMap1.history);
console.log(ExMap1.history.xPos[0].data);
console.log(ExMap1.history.xPos[1].data);

// test 3
let folderName = "./";
let fileName = "mapData";
ExMap1.saveDataHistory(folderName, fileName);
