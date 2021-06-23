import autonomy from "ardrone-autonomy";
import ArtificialPotentialField from "./ArtificialPotentialField.js";
import VirtualStructure from "./VirtualStructure.js";
import Map from "./Map.js";
import * as util from "./Util.js";
import socketIOClient from "socket.io-client";
import QuadModel from "./QuadModel.js";

const SOCKET_SERVER_URL = "http://localhost:4000";
const MARVELMIND = "MARVELMIND";

function FormationControl(setup) {
  this.folderName = setup.folderName;
  this.fileName = setup.fileName;
  let model1 = new QuadModel(
    "newModel",
    {
      xPos: setup.initialAgentsPosition[0][0],
      yPos: setup.initialAgentsPosition[0][1],
      zPos: setup.initialAgentsPosition[0][2], //x, y, z in meter
      yaw: 0, //degree
    },
    0.2
  );
  let model2 = new QuadModel(
    "newModel",
    {
      xPos: setup.initialAgentsPosition[1][0],
      yPos: setup.initialAgentsPosition[1][1],
      zPos: setup.initialAgentsPosition[1][2], //x, y, z in meter
      yaw: 0, //degree
    },
    0.2
  );
  this.currentDatas = [model1, model2];
  this.VS = new VirtualStructure(setup.initialFRP);
  this.APF = new ArtificialPotentialField(
    [setup.initialFRP],
    setup.obstaclesPosition,
    setup.targetsPosition
  );
  this.Map = new Map(
    setup.initialAgentsPosition,
    setup.obstaclesPosition,
    setup.targetsPosition
  );
  let [initialAgentPosition1, initialAgentPosition2] =
    setup.initialAgentsPosition;
  initialAgentPosition1.push(0); // Yaw
  initialAgentPosition2.push(0); // Yaw
  this.NewAgentsTargetPos = [
    initialAgentPosition1, // Quad1 [targetX, targetY, targetZ, targetYaw]
    initialAgentPosition2, // Quad2 [targetX, targetY, targetZ, targetYaw]
  ];

  setup.initialAgentsPosition.forEach((position, index) => {
    console.log("POS", position);
    this.Map.history.xPos[index].data.push({
      x: 0,
      y: position[0],
    });
    this.Map.history.xVel[index].data.push({
      x: 0,
      y: 0,
    });
    this.Map.history.yPos[index].data.push({
      x: 0,
      y: position[1],
    });
    this.Map.history.yVel[index].data.push({
      x: 0,
      y: 0,
    });
    this.Map.history.zPos[index].data.push({
      x: 0,
      y: position[2],
    });
    this.Map.history.yaw[index].data.push({
      x: 0,
      y: position[3],
    });
  });

  this.mode = setup.mode;
  if (this.mode == "implementation") {
    var [client1, control1, mission1] = autonomy.createMission({
      ip: setup.ipQuad1,
    });
    var [client2, control2, mission2] = autonomy.createMission({
      ip: setup.ipQuad2,
    });

    this.emergencyClients = [client1, client2];
    console.log("Connected!");

    this.quads = [mission1, mission2];
    this.intervalId = "";
    this.initialTime = new Date().getTime();
    this.time = 0;

    client1.on("navdata", (navdata) => {
      if (navdata != undefined) {
        let demo = Object(navdata.demo);
        if (demo.velocity != undefined) {
          this.time =
            Math.round((new Date().getTime() - this.initialTime) / 10, 2) / 100;
          this.Map.addNavDataToHistory(
            {
              time: this.time,
              xVel: demo.velocity.x,
              yVel: demo.velocity.y,
            },
            0
          );
        }
      }
    });

    client2.on("navdata", (navdata) => {
      if (navdata != undefined) {
        let demo = Object(navdata.demo);
        if (demo.velocity != undefined) {
          this.time =
            Math.round((new Date().getTime() - this.initialTime) / 10, 2) / 100;
          this.Map.addNavDataToHistory(
            {
              time: this.time,
              xVel: demo.velocity.x,
              yVel: demo.velocity.y,
            },
            1
          );
        }
      }
    });

    control1.on("controlData", (ekfData) => {
      if (ekfData != undefined) {
        this.time =
          Math.round((new Date().getTime() - this.initialTime) / 10, 2) / 100;
        this.Map.addControlDataToHistory(
          {
            time: this.time,
            xPos: ekfData.state.x,
            yPos: ekfData.state.y,
            zPos: ekfData.state.z,
            yaw: ekfData.state.yaw,
          },
          0
        );
        this.quads[0].currentYaw = ekfData.state.yaw;
      }
    });

    control2.on("controlData", (ekfData) => {
      if (ekfData != undefined) {
        this.time =
          Math.round((new Date().getTime() - this.initialTime) / 10, 2) / 100;
        this.Map.addControlDataToHistory(
          {
            time: this.time,
            xPos: ekfData.state.x,
            yPos: ekfData.state.y,
            zPos: ekfData.state.z,
            yaw: ekfData.state.yaw,
          },
          1
        );
        this.quads[1].currentYaw = ekfData.state.yaw;
      }
    });

    const marvelmindTunnel = socketIOClient(SOCKET_SERVER_URL, {
      query: MARVELMIND,
    });

    marvelmindTunnel.on(MARVELMIND, (marvelmindData) => {
      marvelmindData.forEach((quadData, quadIndex) => {
        this.currentDatas[quadIndex].currentPosition = [
          quadData.xPos,
          quadData.yPos,
          quadData.zPos,
        ];
      });
    });
  }
}

FormationControl.prototype.saveFakePosData = function () {
  let fakeData = posData.generateFakePosData();
  this.time =
    Math.round((new Date().getTime() - this.initialTime) / 10, 2) / 100;

  this.Map.addControlDataToHistory(
    {
      time: this.time,
      xPos: fakeData[0][0],
      yPos: fakeData[0][1],
      zPos: fakeData[0][2],
      yaw: 0,
    },
    0
  );
  this.Map.addControlDataToHistory(
    {
      time: this.time,
      xPos: fakeData[1][0],
      yPos: fakeData[1][1],
      zPos: fakeData[1][2],
      yaw: 0,
    },
    1
  );
};

/**
 *
 * @param {*} Agents_Position
 * @param {*} Agents_Velocity
 * @param {*} Agents_Yaw
 * @returns {[[xPos, yPos, zPos, yaw]1, [xPos, yPos, zPos, yaw]2]} newPositions
 */
FormationControl.prototype.calculateTargetPos = function (
  Agents_Position,
  Agents_Velocity,
  Agents_Yaw
) {
  let numberQuadrotorOnVSPoint = 0;
  let newPositions;
  // Check how many quads already in target VS point
  Agents_Position.forEach((Agent_Position, Agent_Index) => {
    let posInGlobalFrame = util.transToWorldFrame(
      Agent_Position,
      Agents_Yaw[Agent_Index]
    );
    let VS_Points = this.VS.VS_Points;
    console.log("VS POINTS", VS_Points);
    let distance =
      Math.round(
        Math.sqrt(
          (posInGlobalFrame[0] - VS_Points[Agent_Index][0]) ** 2 +
            (posInGlobalFrame[1] - VS_Points[Agent_Index][1]) ** 2
        ) * 100
      ) / 100;

    if (distance < 0.1) {
      numberQuadrotorOnVSPoint++;
    }
  });

  // console.log("NUMBER IN VS POINT", numberQuadrotorOnVSPoint);
  let distanceVector = util.calculateWithVector(
    "minus",
    this.VS.Formation_Reference_Point,
    this.APF.Targets_Position[0]
  );
  // console.log("Distance Vector", distanceVector);
  let newHeadingAngle =
    Math.round(Math.atan2(distanceVector[1], distanceVector[0]) * 10) / 10;
  // console.log("NEW Heading Angle", newHeadingAngle);
  this.VS.Heading_Angle = newHeadingAngle;
  // Only for 2 quadrotors
  if (numberQuadrotorOnVSPoint == 2) {
    // Calculate APF Force
    let totalAPF = this.APF.calculateTotalForce(Agents_Velocity);
    // Get new VSPoint
    newPositions = this.VS.calculateNewVSPoint(totalAPF);
    this.NewAgentsTargetPos = newPositions;
  } else {
    // Control the Quads to VS Point

    // Simulation
    if (this.mode == "simulation") {
      newPositions = this.VS.VS_Points;
      for (
        let VS_Point_Index = 0;
        VS_Point_Index < newPositions.length;
        VS_Point_Index++
      ) {
        newPositions[VS_Point_Index].push(0);
      }
    } else {
      let VS_Points = this.VS.VS_Points;
      this.NewAgentsTargetPos = [
        [VS_Points[0][0], VS_Points[0][1], VS_Points[0][2], 0],
        [VS_Points[1][0], VS_Points[1][1], VS_Points[1][2], 0],
      ];
    }
  }
};

var intervalNumber = 0;
// Control Loop
FormationControl.prototype.intervalControl = function (currentPositions) {
  intervalNumber++;
  let Agents_Position = currentPositions;
  let Agents_Velocity = [
    [
      this.Map.history.xVel[0].data[this.Map.history.xVel[0].data.length - 1].y,
      this.Map.history.yVel[0].data[this.Map.history.yVel[0].data.length - 1].y,
      0,
    ],
    [
      this.Map.history.xVel[1].data[this.Map.history.xVel[1].data.length - 1].y,
      this.Map.history.yVel[1].data[this.Map.history.yVel[1].data.length - 1].y,
      0,
    ],
  ]; // Navdata
  let Agents_Yaw = [
    this.currentDatas[0].currentYaw,
    this.currentDatas[1].currentYaw,
  ]; // Navdata
  console.log("pos", Agents_Position);
  console.log("vel", Agents_Velocity);
  console.log("yaw", Agents_Yaw);

  this.calculateTargetPos(Agents_Position, Agents_Velocity, Agents_Yaw);
  let [
    [targetX1, targetY1, targetZ1, targetYaw1],
    [targetX2, targetY2, targetZ2, targetYaw2],
  ] = this.NewAgentsTargetPos;

  console.log("TPF", this.APF.TPF);
  console.log("FRP", this.VS.Formation_Reference_Point);

  console.log("TARGET1", targetX1, targetY1, targetZ1, targetYaw1);
  console.log("TARGET2", targetX2, targetY2, targetZ2, targetYaw2);

  this.quads[0]._steps = [];
  this.quads[1]._steps = [];
  this.quads[0].go({
    x: targetX1,
    y: targetY1,
    z: targetZ1,
    yaw: targetYaw1,
  });
  this.quads[1].go({
    x: targetX2,
    y: targetY2,
    z: targetZ2,
    yaw: targetYaw2,
  });
  this.quads[0].run();
  this.quads[1].run();
};

var iteration = 0;
// Main Function
FormationControl.prototype.execute = function () {
  try {
    // console.log("TakeOff");
    // this.quads[0].takeoff().zero();
    // this.quads[1].takeoff().zero();
    // this.quads[0].run();
    // this.quads[1].run();
    setTimeout(() => {
      this.intervalId = setInterval(() => {
        // iteration++
        let currentPositions = [
          this.currentDatas[0].currentPosition,
          this.currentDatas[1].currentPosition,
        ];
        console.log("currentPositions", currentPositions);
        this.intervalControl(currentPositions);
        // this.quads[0]._steps = [];
        // this.quads[1]._steps = [];
        // this.quads[0].go({ x: iteration, y: 0, z: 1, yaw: 0 });
        // this.quads[1].go({ x: iteration, y: 0, z: 1, yaw: 0 });
        // this.quads[0].run()
        // this.quads[1].run()
        // Stop Condition
        if (intervalNumber == 10) {
          // if (Math.round(this.Map.currentPositions[0][0]) == 1) {
          // this.quads[0]._steps = [];
          // this.quads[1]._steps = [];
          // this.quads[0].land();
          // this.quads[1].land();
          // this.quads[0].run();
          // this.quads[1].run();
          clearInterval(this.intervalId);

          this.Map.saveDataHistory(this.folderName, this.fileName);
          console.log("Data Saved!");
        }
      }, 2000);
    }, 1000);
  } catch (error) {
    this.emergencyClients[0].land();
    this.emergencyClients[1].land();
    console.log(`EMERGENCY LANDING!!!!`);
    console.log(`ERROR : ${error}`);
  }
};

export default FormationControl;
