import autonomy from "ardrone-autonomy";
import ArtificialPotentialField from "./ArtificialPotentialField.js";
import VirtualStructure from "./VirtualStructure.js";
import Map from "./Map.js";

function FormationControl() {
  this.VS = new VirtualStructure();
  this.APF = new ArtificialPotentialField();
  this.Map = new Map();
  var [client1, control1, mission1] = autonomy.createMission({
    ip: "192.168.1.9",
  });
  var [client2, control2, mission2] = autonomy.createMission({
    ip: "192.168.1.2",
  });

  this.quad1 = mission1;
  this.quad2 = mission2;
}

FormationControl.prototype.calculateCommand = function (
  Formation_Reference_Point,
  Agents_Position,
  Agents_Velocity
) {
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

  return [command, commandValue];
};
