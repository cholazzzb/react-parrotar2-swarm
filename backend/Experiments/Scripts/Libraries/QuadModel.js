function QuadModel(type, initialPosition, dt) {
  this.time = 0;
  this.currentPos = initialPosition;
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
  this.time = this.time + this.dt;
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

  console.log("current Pos (updated)", this.currentPos);
  return this.currentPos;
};

export default QuadModel;
