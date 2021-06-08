import { calculateEucDistance, calculateWithVector } from "./Util.js";

var mass = 0.445; // kg (mass of Parrot AR Drone)

function getShapePoints(shape_type) {
  let shape_points = [];
  switch (shape_type) {
    case "line":
      shape_points = [
        [-0.75, 0, 1],
        [0.75, 0, 1],
      ];
      break;

    default:
      break;
  }
  return shape_points;
}

function VirtualStructure() {
  /**
   * Formation
   *
   * Assumption : z is constant
   * POSITION
   * Virtual Structure = ()
   * Quadrotor 1 =()
   * Quadrotor 2 = ()
   *
   */
  console.log("build");
  this.Heading_Angle = 0; // Yaw / Phi in Degree
  this.Shape_Points = getShapePoints("line"); // Agent Position from Formation Reference Point
  this.Formation_Reference_Point = []; // Formation Reference Point
  this.VS_Points = []; // Current Quadrotors Position in VS
  this.Current_Positions = []; // Current Quadrotors Position in Real World
}

VirtualStructure.prototype.setCurrentVSPoints = function (Current_VS_Points) {
  this.VS_Points = Current_VS_Points;
};

VirtualStructure.prototype.calculateFRPVel = function (APFForce) {
  let velocity = [0, 0, 0];

  return calculate;
};

VirtualStructure.prototype.calculateNewFRPPoint = function (APFForce) {};

/**
 *
 * @param {Array of Float} FRP_Position = [xPos, yPos, zPos]
 *  calculate new VS Point based on @param FRP_Position and current heading angle
 *  with transformation matrix
 *
 * return new VS Points : [VSPoint1, VSPoint2]. VSPointx = [xPos, yPos, constant]
 */
VirtualStructure.prototype.calculateVSPoint = function (FRP_Position) {
  console.log("Success");
  let transformationMatrix = [
    [Math.cos(this.Heading_Angle), Math.sin(this.Heading_Angle), 0], //x
    [-Math.sin(this.Heading_Angle), Math.cos(this.Heading_Angle), 0], //y
    [0, 0, 1], //z. The z is constant and ignored
  ];

  let newVSPoints = [];
  this.Shape_Points.forEach((Shape_Point) => {
    let newVSPoint = [];
    transformationMatrix.forEach((element) => {
      let point = 0;
      for (let index = 0; index < 3; index++) {
        point = point + element[index] * Shape_Point[index];
      }
      newVSPoint.push(point);
    });
    newVSPoints.push(newVSPoint);
  });
};

VirtualStructure.prototype.calculateNewVSPoint = function (APFForce) {};

export default VirtualStructure;
