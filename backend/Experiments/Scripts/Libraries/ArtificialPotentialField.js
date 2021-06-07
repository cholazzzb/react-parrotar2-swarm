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
 * @return
 */
function vectorOperation(type, operator1, operator2) {
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
  this.Targets_Position = []; // Only 1 Target
}

ArtificialPotentialField.prototype.calculateTargetsPotentialForce =
  function () {
    let forces = [];
    this.Agents_Position.forEach((Agent_Position) => {
      let force = 0;
      if (
        calculateEucDistance(Agent_Position, this.Targets_Position[0]) <
        this.Constants.tdr
      ) {
        //
      } else {
      }
      forces.push(force);
    });
  };

ArtificialPotentialField.prototype.calculateObstaclesPotentialForce =
  function () {};

ArtificialPotentialField.prototype.calculateTotalForce = function () {
  // TPF = Target Potential Force
  let TPF = this.calculateTargetsPotentialForce();

  // OPF = Obstacle Potential Force
  let OPF = this.calculateObstaclesPotentialForce();

  return [TPF[0] + OPF[0], TPF[1] + OPF[1], TPF[2] + OPF[2]];
};

export default ArtificialPotentialField;
