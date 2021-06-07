import ArtificialPotentialField from "./ArtificialPotentialField.js";
import VirtualStructure from "./VirtualStructure.js";

function FormationControl() {
  this.VS = VirtualStructure();
  this.APF = ArtificialPotentialField();
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
