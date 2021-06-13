function FakeSensor() {
  this.maxSpeed = 0.1;
  this.initialPos = [
    [0, 0, 0],
    [2, 0, 0],
  ];
  this.positions = this.initialPos;
}

FakeSensor.prototype.generateFakePosData = function () {
  this.positions[0][0] = this.positions[0][0] + this.maxSpeed;
  this.positions[1][0] = this.positions[1][0] + this.maxSpeed;
  return this.positions;
};

export default FakeSensor