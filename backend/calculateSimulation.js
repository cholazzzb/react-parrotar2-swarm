import socketIOClient from "socket.io-client";
import FormationControl from "./Experiments/Scripts/Libraries/FormationControl.js";
import QuadModel from "./Experiments/Scripts/Libraries/QuadModel.js";

const SOCKET_SERVER_URL = "http://localhost:4000";
const SIMULATION_EVENT = "SIMULATION_EVENT";
const socketTunnel = socketIOClient(SOCKET_SERVER_URL, {
  query: "SIMULATION",
});

const setup = {
  initialAgentsPosition: [
    [0, 0, 1],
    [0, 2, 1],
  ],
  obstaclesPosition: [[5, 0, 1]],
  targetsPosition: [[10, 1, 1]],
  mode: "simulation",
};

const controller = new FormationControl(setup);
const AR1 = new QuadModel(
  "newModel",
  {
    xPos: 0,
    yPos: 0,
    zPos: 1, //x, y, z in meter
    yaw: 0, //degree
  },
  0.2
);

const AR2 = new QuadModel(
  "newModel",
  {
    xPos: 0,
    yPos: 2,
    zPos: 1, //x, y, z in meter
    yaw: 0, //degree
  },
  0.2
);

var intervalId = setInterval(() => {
  calculateDynamics();
}, 1000);

const calculateDynamics = () => {
  // Use the Formation Control to get command
  let Agents_Position = [
    [AR1.currentPos.xPos, AR1.currentPos.yPos, AR1.currentPos.zPos],
    [AR2.currentPos.xPos, AR2.currentPos.yPos, AR2.currentPos.zPos],
  ];
  // console.log(`CURRENT POSITION ${Agents_Position}`);
  let agentsCommands = controller.calculateCommands(Agents_Position);
  console.log(agentsCommands);
  console.log(`AGENTS COMMANDS ${agentsCommands}`);
  // Calculate the simulation
  var AR1Position = AR1.calculateResponse(agentsCommands[0]);
  var AR2Position = AR2.calculateResponse(agentsCommands[1]);

  // Convert to global coordinate then update map

  // Update Map
  controller.Map.addControlDataToHistory(
    {
      time: AR1.time,
      xPos: AR1Position.xPos,
      yPos: AR1Position.yPos,
      zPos: AR1Position.zPos,
      yaw: AR1Position.yaw,
    },
    0
  );

  controller.Map.addNavDataToHistory(
    {
      time: AR2.time,
      xPos: AR2Position.xPos,
      yPos: AR2Position.yPos,
      zPos: AR2Position.zPos,
      yaw: AR2Position.yaw,
    },
    0
  );

  // Send the position with socketIO
  socketTunnel.emit(SIMULATION_EVENT, {
    type: "SIMULATION",
    body: {
      position: [
        { id: "Quad1", data: AR1Position },
        { id: "Quad2", data: AR2Position },
      ],
      attitude: [
        { id: "Quad1", data: { x: AR1.time, y: AR1Position.zPos } },
        { id: "Quad2", data: { x: AR2.time, y: AR2Position.zPos } },
      ],
      yaw: [
        { id: "Quad1", data: { x: AR1.time, y: AR1Position.yaw } },
        { id: "Quad2", data: { x: AR2.time, y: AR2Position.yaw } },
      ],
    },
    senderId: socketTunnel.id,
  });

  // END the simulation
  if (Math.round(AR1.time) == 5) {
    clearInterval(intervalId);
  }
};
