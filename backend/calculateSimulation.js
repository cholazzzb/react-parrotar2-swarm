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
  initialFRP: [0, 0, 0],
  mode: "simulation",
};

const controller = new FormationControl(setup);
const AR1 = new QuadModel(
  "newModel",
  {
    xPos: setup.initialAgentsPosition[0][0],
    yPos: setup.initialAgentsPosition[0][1],
    zPos: setup.initialAgentsPosition[0][2], //x, y, z in meter
    yaw: 0, //degree
  },
  0.2
);

const AR2 = new QuadModel(
  "newModel",
  {
    xPos: setup.initialAgentsPosition[1][0],
    yPos: setup.initialAgentsPosition[1][1],
    zPos: setup.initialAgentsPosition[1][2], //x, y, z in meter
    yaw: 0, //degree
  },
  0.2
);

const Quads = [AR1, AR2];

var intervalId = setInterval(() => {
  calculateDynamics();
}, 100);

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
  AR1.time = AR1.time + AR1.dt;
  AR2.time = AR2.time + AR2.dt;

  console.log("Agents Pos", Agents_Position)
  console.log("Agents Vel", Agents_Velocity)
  console.log("Agents Yaw", Agents_Yaw)

  controller.calculateTargetPos(
    Agents_Position,
    Agents_Velocity,
    Agents_Yaw
  );

  // console.log("AGENTS POSITION BEFORE", controller.APF.Agents_Position);
  controller.APF.setAgentsPosition([controller.VS.Formation_Reference_Point]);
  // console.log("AGENTS POSITION AFTER", controller.APF.Agents_Position);
  // Change the model Position and yaw
  controller.NewAgentsTargetPos.forEach((newPosition, agentIndex) => {
    Quads[agentIndex].currentPos = {
      xPos: newPosition[0],
      yPos: newPosition[1],
      zPos: newPosition[2],
      yaw: newPosition[3],
    };
    // console.log("Quads", agentIndex, Quads[agentIndex].currentPos);

    // Update Map and APF Data
    controller.Map.addControlDataToHistory(
      {
        time: Quads[agentIndex].time,
        xPos: newPosition[0],
        yPos: newPosition[1],
        zPos: newPosition[2],
        yaw: newPosition[3],
      },
      agentIndex
    );
  });

  // Send the position with socketIO
  let currentTime = Math.round(AR1.time * 10) / 10;
  socketTunnel.emit(SIMULATION_EVENT, {
    type: "SIMULATION",
    body: {
      position: [
        { id: "Quad1", data: AR1.currentPos },
        { id: "Quad2", data: AR2.currentPos },
      ],
      attitude: [
        { id: "Quad1", data: { x: currentTime, y: AR1.currentPos.zPos } },
        { id: "Quad2", data: { x: currentTime, y: AR2.currentPos.zPos } },
      ],
      yaw: [
        { id: "Quad1", data: { x: currentTime, y: AR1.currentPos.yaw } },
        { id: "Quad2", data: { x: currentTime, y: AR2.currentPos.yaw } },
        { id: "VS", data: { x: currentTime, y: controller.VS.Heading_Angle } },
      ],
      APF_X: [
        { id: "OPF", data: { x: currentTime, y: controller.APF.OPF[0][0] } },
        { id: "TPF", data: { x: currentTime, y: controller.APF.TPF[0][0] } },
      ],
      APF_Y: [
        { id: "OPF", data: { x: currentTime, y: controller.APF.OPF[0][1] } },
        { id: "TPF", data: { x: currentTime, y: controller.APF.TPF[0][1] } },
      ],
    },
    senderId: socketTunnel.id,
  });

  // END the simulation
  if (Math.round(AR1.time) == 13) {
    clearInterval(intervalId);
  }
};
