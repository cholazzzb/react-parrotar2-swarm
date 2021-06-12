import autonomy from "ardrone-autonomy";
import ArtificialPotentialField from "./ArtificialPotentialField.js";
import VirtualStructure from "./VirtualStructure.js";
import Map from "./Map.js";
import * as util from "./Util.js";

function FormationControl(setup) {
  this.folderName = setup.folderName;
  this.fileName = setup.fileName;
  this.VS = new VirtualStructure();
  this.APF = new ArtificialPotentialField();
  this.Map = new Map(
    setup.initialAgentsPosition,
    setup.obstaclesPosition,
    setup.targetsPosition
  );
  var [client1, control1, mission1] = autonomy.createMission({
    ip: setup.ipQuad1,
  });
  var [client2, control2, mission2] = autonomy.createMission({
    ip: setup.ipQuad2,
  });

  console.log("Connected!");

  this.quads = [mission1, mission2];

  var initialTime = new Date().getTime();
  var time = 0;

  client1.on("navdata", (navdata) => {
    if (navdata != undefined) {
      let demo = Object(navdata.demo);
      time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;
      this.Map.addNavDataToHistory(
        {
          time: time,
          xVel: 0,
          yVel: 0,
        },
        0
      );
    }
  });

  client2.on("navdata", (navdata) => {
    if (navdata != undefined) {
      let demo = Object(navdata.demo);
      time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;
      this.Map.addNavDataToHistory(
        {
          time: time,
          xVel: 0,
          yVel: 0,
        },
        1
      );
    }
  });

  control1.on("controlData", (ekfData) => {
    if (ekfData != undefined) {
      time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;
      this.Map.addDataControlToHistory(
        {
          time: time,
          xPos: ekfData.state.x,
          yPos: ekfData.state.y,
          zPos: ekfData.state.z,
          yaw: ekfData.state.yaw,
        },
        0
      );
    }
  });

  control2.on("controlData", (ekfData) => {
    if (ekfData != undefined) {
      if (ekfData != undefined) {
        time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;
        this.Map.addControlDataToHistory(
          {
            time: time,
            xPos: ekfData.state.x,
            yPos: ekfData.state.y,
            zPos: ekfData.state.z,
            yaw: ekfData.state.yaw,
          },
          1
        );
      }
    }
  });
}

FormationControl.prototype.calculateCommand = function (Agents_Position) {
  let agentsCommands = [];
  let commands = [];
  let command = "";
  let commandValue = 0;

  // Get Current Position and Velocity

  // Calculate APF if the quadrotor already on VS Point
  let numberQuadrotorOnVSPoint = 0;
  Agents_Position.forEach((position, Agent_Index) => {
    let VS_Points = this.VS.VS_Points;
    let distance =
      Math.round(
        Math.sqrt(
          (position[0] - VS_Points[Agent_Index][0]) ** 2 +
            (position[1] - VS_Points[Agent_Index][1]) ** 2
        ) * 100
      ) / 100;

    if (distance < 0.1) {
      numberQuadrotorOnVSPoint++;
    }
  });

  if (numberQuadrotorOnVSPoint == 2) {
    // Calculate New FRP Point and VS Point with from APF
  }
  // Control Quadrotor to VS Points
  else {
    Agents_Position.forEach((position, Agent_Index) => {
      let VS_Points = this.VS.VS_Points;
      let posGlobal = util.transToWorldFrame(position);
      let distanceVector = util.calculateWithVector(
        "minus",
        posGlobal,
        VS_Points[Agents_Index]
      );
      let targetYaw = util.radToDeg(
        Math.atan2(distanceVector[0], distanceVector[1])
      );
      let currentYaw = this.Map.history.yaw[Agent_Index].data[-1]
      let yawError = targetYaw - currentYaw
      if (yawError){
        commands.push(["cw", commandValue]);
      }

      agentsCommands.push(commands);
      commands = [];
    });
  }
  return agentsCommands;
};

FormationControl.prototype.runCommands = function (commands, quadIndex) {
  commands.forEach((command) => {
    switch (command[0]) {
      case "forward":
        this.quads[quadIndex].forward(command[1]);
        break;

      case "cw":
        this.quads[quadIndex].cw(command[1]);
        break;

      case "ccw":
        this.quads[quadIndex].ccw(command[1]);
        break;

      case "land":
        this.quads[quadIndex].land();
        break;

      default:
        break;
    }
  });
  this.quads[quadIndex].run();
};

// Main Function
FormationControl.prototype.execute = function () {
  console.log("TakeOff");
  this.quads[0].takeoff().zero();
  this.quads[1].takeoff().zero();
  this.quads[0].run();
  this.quads[1].run();
  setTimeout(() => {
    console.log("Land");
    this.quads[0].land();
    this.quads[1].land();
    this.quads[0].run();
    this.quads[1].run();
    this.Map.saveDataHistory(this.folderName, this.fileName)
    console.log("Data Saved!")
    // calculate and command the controller
    // this.runCommands(this.calculateCommand(), 1);
    // this.runCommands(this.calculateCommand(), 2);
    // setInterval(() => {
    //   this.runCommands(this.calculateCommand(), 1);
    //   this.runCommands(this.calculateCommand(), 2);
    // }, 2000);
  }, 5000);
};

export default FormationControl;
