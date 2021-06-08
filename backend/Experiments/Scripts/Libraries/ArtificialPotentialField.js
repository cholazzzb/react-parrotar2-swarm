function calculateEucDistance(Pos1, Pos2) {
  let distance =
    Math.round(
      Math.sqrt((Pos1[0] - Pos2[0]) ** 2 + (Pos1[1] - Pos2[2]) ** 2) * 100
    ) / 100;

  return distance;
}

/**
 *
 * @param {String} type = plus/minus/times
 * @param {Float or Array} operator1
 * @param {Array} operator2
 * @return [vector]
 */
function calculateWithVector(type, operator1, operator2) {
  let result = [];
  switch (type) {
    case "plus":
      result[0] = operator1[0] + operator2[0];
      result[1] = operator1[1] + operator2[1];
      break;

    case "minus":
      result[0] = operator1[0] + operator2[0];
      result[1] = operator1[1] + operator2[1];
      break;

    case "times":
      result[0] = operator1 * operator2[0];
      result[1] = operator1 * operator2[1];
      break;

    default:
      break;
  }

  return result;
}

function ArtificialPotentialField() {
  this.Constants = {
    odr: 1,
    tdr: 1,
  };
  this.Parameters = {
    ktvi: 1,
    ktp: 1,
    kopb1: 1,
    kobp2: 1,
  };
  this.Agents_Position = [];
  this.Obstacles_Position = [];
  this.Targets_Position = []; // Only 1 Target and Assume the target are static
}

ArtificialPotentialField.prototype.setAgentsPosition = function (
  New_Agents_Position
) {
  this.Agents_Position = New_Agents_Position;
};
ArtificialPotentialField.prototype.setObstaclesPosition = function (
  New_Obstacles_Position
) {
  this.Obstacles_Position = New_Obstacles_Position;
};
ArtificialPotentialField.prototype.setTargetsPosition = function (
  New_Targets_Position
) {
  this.Targets_Position = New_Targets_Position;
};

ArtificialPotentialField.prototype.calculateTargetsPotentialForce = function (
  Agents_Velocity
) {
  let forces = [];
  this.Agents_Position.forEach((Agent_Position) => {
    let force = 0;
    let distance = calculateEucDistance(
      Agent_Position,
      this.Targets_Position[0]
    );
    let distanceVector = calculateWithVector(
      "minus",
      Agent_Position,
      this.Targets_Position[0]
    );
    if (distance < this.Constants.tdr) {
      let coef = -this.Parameters.ktp / this.Constants.tdr;
      force = calculateWithVector("times", coef, distanceVector);
    } else {
      let distanceVectorUnit = calculateWithVector(
        1 / distance,
        distanceVector
      );
      force = calculateWithVector(-this.Parameters.ktp, distanceVectorUnit);
    }

    force = force - calculateWithVector(this.Parameters.ktvi, Agents_Velocity);
    forces.push(force);
  });
  return forces;
};

// Formation Radiud in VS (?)
ArtificialPotentialField.prototype.calculateObstaclesPotentialForce =
  function () {
    let forces = [];
    this.Agents_Position.forEach((Agent_Position) => {
      let force = 0;
      this.Obstacles_Position.forEach((Obstacle_Position) => {
        // If the obstacle detected ( distance to obstacle less than odr/obstacle detectring range)
        let distance = calculateEucDistance(Agent_Position, Obstacle_Position);
        let distanceVector = calculateWithVector(
          "minus",
          Agent_Position,
          Obstacle_Position
        );
        let distanceVectorUnit = calculateWithVector(
          1 / distance,
          distanceVector
        );
        if (distance < this.Constants.odr) {
          let coef =
            ((1 / distance - 1 / this.Parameters.odr) * this.Parameters.kobp1) /
              distance /
              distance -
            this.Parameters.kobp2 * (distance - this.Parameters.odr);
          force = calculateWithVector("times", coef, distanceVectorUnit);
        }
      });
    });
    return forces;
  };

ArtificialPotentialField.prototype.calculateTotalForce = function () {
  // TPF = Target Potential Force
  let TPF = this.calculateTargetsPotentialForce();

  // OPF = Obstacle Potential Force
  let OPF = this.calculateObstaclesPotentialForce();

  return [TPF[0] + OPF[0], TPF[1] + OPF[1], TPF[2] + OPF[2]];
};

export default ArtificialPotentialField;
