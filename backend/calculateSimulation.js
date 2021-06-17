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
  initialFRP : [0,0,0],
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

const Quads = [AR1, AR2];

var intervalId = setInterval(() => {
  calculateDynamics();
}, 1000);

const calculateDynamics = () => {
  // ----- FOR USING FORWARD API, etc -----
  // // console.log(`CURRENT POSITION ${Agents_Position}`);
  // let agentsCommands = controller.calculateCommands(Agents_Position);
  // console.log(agentsCommands);
  // console.log(`AGENTS COMMANDS ${agentsCommands}`);
  // // Calculate the simulation
  // var AR1Position = AR1.calculateResponse(agentsCommands[0]);
  // var AR2Position = AR2.calculateResponse(agentsCommands[1]);

  let Agents_Position = [
    [AR1.currentPos.xPos, AR1.currentPos.yPos, AR1.currentPos.zPos],
    [AR2.currentPos.xPos, AR2.currentPos.yPos, AR2.currentPos.zPos],
  ];
  let Agents_Velocity = [AR1.currentVel, AR2.currentVel];
  let Agents_Yaw = [AR1.currentPos.yaw, AR2.currentPos.yaw];

  let newPositions = controller.calculateTargetPos(
    Agents_Position,
    Agents_Velocity,
    Agents_Yaw
  );

  // Change the model Position and yaw
  newPositions.forEach((newPosition, agentIndex) => {
    Quads[agentIndex].currentPos = {
      xPos: newPosition[0],
      yPos: newPosition[1],
      zPos: newPosition[2],
      yaw: newPosition[3],
    };
    console.log("Quads", agentIndex, Quads[agentIndex].currentPos)
  });

  // Update Map
  newPositions.forEach((newPosition, agentIndex) => {
    controller.Map.addControlDataToHistory(
      {
        time: AR1.time,
        xPos: AR1.currentPos.xPos,
        yPos: AR1.currentPos.yPos,
        zPos: AR1.currentPos.zPos,
        yaw: AR1.currentPos.yaw,
      },
      agentIndex
    );
  });

  // Send the position with socketIO
  socketTunnel.emit(SIMULATION_EVENT, {
    type: "SIMULATION",
    body: {
      position: [
        { id: "Quad1", data: AR1.currentPos },
        { id: "Quad2", data: AR2.currentPos },
      ],
      attitude: [
        { id: "Quad1", data: { x: AR1.time, y: AR1.currentPos.zPos } },
        { id: "Quad2", data: { x: AR2.time, y: AR2.currentPos.zPos } },
      ],
      yaw: [
        { id: "Quad1", data: { x: AR1.time, y: AR1.currentPos.yaw } },
        { id: "Quad2", data: { x: AR2.time, y: AR2.currentPos.yaw } },
      ],
      APF: [
        {id: "OPF", data: {x:0, y: 0}},
        {id: "TPF", data: {x: 0, y: 0}}
      ]
    },
    senderId: socketTunnel.id,
  });

  // END the simulation
  if (Math.round(AR1.time) == 5) {
    clearInterval(intervalId);
  }
};
