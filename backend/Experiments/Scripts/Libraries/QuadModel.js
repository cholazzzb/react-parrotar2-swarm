function QuadModel(type, initialPosition, dt) {
  this.time = 0;
  this.currentPos = initialPosition; // Position and yaw
  this.currentVel = [0, 0, 0];
  this.currentPosition = [
    initialPosition.xPos,
    initialPosition.yPos,
    initialPosition.zPos,
  ];
  this.currentYaw = 0;
  this.dt = dt;

  switch (type) {
    case "PEM":
      this.model = {};
      break;

    case "custom":
      this.model = {};
      break;

    case "newModel":
      this.model = {
        x_dot: 5, // m/s
        y_dot: 5, // m/s,
        z_dot: 0, // m/s,
        yaw_dot: 150, // degree/s
      };
      break;

    case "new":
      let dt = this.dt;
      this.model = {
        x_dot: 7.27(dt + 1.05 * Math.exp(-0.952381 * dt) - 1.05),
        y_dot: 7.27(dt + 1.05 * Math.exp(-0.952381 * dt) - 1.05),
        z_dot: 0.72(dt + 0.23 * Math.exp(-4.34783 * dt) - 0.23),
        yaw_dot: 2.94(dt + 0.031 * Math.exp(-32.2581 * dt) - 0.031),
      };
      break;
    default:
      break;
  }
}

/**
 *
 * @param {Array} commands = [command]
 *
 * command = [input, inputVal]
 * @param {String} input // Choose one (pitch, roll, yaw, altitude)
 * @param {Number} inputVal // +1 or -1
 
 * @returns QuadModel.currentPos
 */
QuadModel.prototype.calculateResponse = function (commands) {
  this.time = Math.round((this.time + this.dt) * 10) / 10;
  console.log(`----- TIME : ${this.time} -----`);
  commands.forEach(([input, inputVal]) => {
    console.log(`INPUT ${input} ${inputVal}`);
    switch (input) {
      case "forward":
        this.currentPos.xPos =
          this.currentPos.xPos + this.model.x_dot * inputVal * this.dt;
        break;

      case "left":
        this.currentPos.yPos =
          this.currentPos.yPos + this.model.y_dot * inputVal * this.dt;
        break;

      case "cw":
        this.currentPos.yaw =
          this.currentPos.yaw + this.model.yaw_dot * inputVal * this.dt;
        break;

      case "ccw":
        this.currentPos.yaw =
          this.currentPos.yaw - this.model.yaw_dot * inputVal * this.dt;

        break;

      case "altitude":
        this.currentPos.zPos = this.model.z_dot * inputVal * this.dt;
        break;

      default:
        break;
    }
  });

  return this.currentPos;
};

export default QuadModel;
