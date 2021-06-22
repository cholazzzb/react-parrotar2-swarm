import * as util from "./Util.js";

function PSOParticle(currentPos) {
  this.current_position = currentPos;
  this.current_velocity = [0, 0, 0, 0];
  this.personal_best_pos = currentPos;
  this.personal_best_cost_value = 99999;
}

PSOParticle.prototype.calculateNewPos = function () {
  this.current_position = util.calculateWithVector(
    "plus",
    this.current_position,
    this.current_velocity
  );
};

PSOParticle.prototype.updateBestPos = function (newBestPos) {
  this.personal_best_pos = newBestPos;
};

PSOParticle.prototype.updateBestCostVal = function (newBestCostVal) {
  this.personal_best_cost_value = newBestCostVal;
};

PSOParticle.prototype.getAPFParameters = function () {
  return {
    ktvi: this.current_position[0],
    ktp: this.current_position[1],
    kobp1: this.current_position[2],
    kobp2: this.current_position[3],
  };
};

export default PSOParticle;
