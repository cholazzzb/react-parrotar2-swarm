export var mass = 0.445; // kg (mass of Parrot AR Drone)

export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function calculateEucDistance(Pos1, Pos2) {
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
export function calculateWithVector(type, operator1, operator2) {
  let result = [];
  switch (type) {
    case "plus":
      result[0] = operator1[0] + operator2[0];
      result[1] = operator1[1] + operator2[1];
      result[2] = 0; // Assume Z constant
      break;

    case "minus":
      result[0] = operator1[0] - operator2[0];
      result[1] = operator1[1] - operator2[1];
      result[2] = 0; // Assume Z constant
      break;

    case "times":
      result[0] = operator1 * operator2[0];
      result[1] = operator1 * operator2[1];
      result[2] = 0; // Assume Z constant
      break;

    default:
      break;
  }

  result[0];
  result[1];
  result[2];

  return result;
}

export function transToWorldFrame(position, yaw) {
  if(yaw == undefined){
    console.error("ERROR YAW IS NEEDED IN UTIL - TransToWorldFrame")
  }
  let yawRad = degToRad(yaw);
  let transMatrix = [
    [Math.cos(yawRad), -Math.sin(yawRad), 0],
    [Math.sin(yawRad), Math.cos(yawRad), 0],
    [0, 0, 1],
  ];
  let newPos = [0, 0, 0];
  transMatrix.forEach((vector, index) => {
    newPos[index] =
      vector[0] * position[0] +
      vector[1] * position[1] +
      vector[2] * position[2];
  });
  return newPos;
}

export function transToQuadFrame(position, yaw) {
  let yawRad = degToRad(yaw);
  let transMatrix = [
    [Math.cos(yawRad), Math.sin(yawRad), 0],
    [-Math.sin(yawRad), Math.cos(yawRad), 0],
    [0, 0, 1],
  ];
  let newPos = [0, 0, 0];
  transMatrix.forEach((vector, index) => {
    newPos[index] =
      vector[0] * position[0] +
      vector[1] * position[1] +
      vector[2] * position[2];
  });
  return newPos;
}
