import autonomy from "ardrone-autonomy";
import ArtificialPotentialField from "./ArtificialPotentialField.js";
import VirtualStructure from "./VirtualStructure.js";
import Map from "./Map.js";

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

  this.quad1 = mission1;
  this.quad2 = mission2;

  var initialTime = new Date().getTime();
  var time = 0;
  control1.on("controlData", (ekfData) => {
    if (ekfData != undefined) {
      time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;
      this.Map.addDataToHistory({
        time: time,
        xPos: ekfData.state.x,
        yPos: ekfData.state.y,
        zPos: ekfData.state.z,
        yaw: ekfData.state.yaw,
      });
    }
  });

  control2.on("controlData", (ekfData) => {
    if (ekfData != undefined) {
      if (ekfData != undefined) {
        time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;
        this.Map.addDataToHistory({
          time: time,
          xPos: ekfData.state.x,
          yPos: ekfData.state.y,
          zPos: ekfData.state.z,
          yaw: ekfData.state.yaw,
        });
      }
    }
  });
}

FormationControl.prototype.calculateCommand = function (
  Formation_Reference_Point,
  Agents_Position,
  Agents_Velocity
) {
  let commands = [];
  let command = "";
  let commandValue = 0;

  // Calculate APF if the quadrotor already on VS Point
  let numberQuadrotorOnVSPoint = 0;
  Agents_Position.forEach((position, Agent_Index) => {
    let VS_Points = this.VS_Points;
    let distance =
      Math.round(
        Math.sqrt(
          (position[0] - VS_Points[Agent_Index][0]) ** 2 +
            (position[1] - VS_Points[Agent_Index][a]) ** 2
        ) * 100
      ) / 100;

    if (distance < 0.1) {
      numberQuadrotorOnVSPoint++;
    }
  });

  if (numberQuadrotorOnVSPoint == 2) {
  }
  // Control Quadrotor to VS Points
  else {
  }
  commands.push([command, commandValue]);
  return commands;
};

// Main Function
FormationControl.prototype.execute = function () {
  this.quad1.takeoff().zero();
  this.quad2.takeoff().zero();
  this.quad1.run();
  this.quad2.run();
  setTimeout(() => {
    // calculate and command the controller
    setInterval(() => {
      // calculate and command the controller
    }, 2000);
  }, 5000);
};

export default FormationControl;
