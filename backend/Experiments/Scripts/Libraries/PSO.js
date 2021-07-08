import FormationControl from "./FormationControl.js";
import PSOParticle from "./PSOParticle.js";
import QuadModel from "./QuadModel.js";
import * as util from "./Util.js";

function PSO(pso_setup, simulation_setup) {
  this.total_particles = pso_setup.total_particles;
  this.epoch = pso_setup.epoch;
  this.number_parameters = pso_setup.number_parameters;
  this.min_param_value = pso_setup.min_param_value;
  this.max_param_value = pso_setup.max_param_value;

  this.simulation_setup = simulation_setup;
}

PSO.prototype.calculateDynamics = function (controller, Quads) {
  let [AR1, AR2] = Quads;
  let Agents_Position = [
    [AR1.currentPos.xPos, AR1.currentPos.yPos, AR1.currentPos.zPos],
    [AR2.currentPos.xPos, AR2.currentPos.yPos, AR2.currentPos.zPos],
  ];
  let Agents_Velocity = [AR1.currentVel, AR2.currentVel];
  let Agents_Yaw = [AR1.currentPos.yaw, AR2.currentPos.yaw];

  AR1.time = AR1.time + AR1.dt;
  AR2.time = AR2.time + AR2.dt;

  // let newPositions = 
  controller.calculateTargetPos(
    Agents_Position,
    Agents_Velocity,
    Agents_Yaw
  );

  let newPositions = controller.NewAgentsTargetPos
  controller.APF.setAgentsPosition([controller.VS.Formation_Reference_Point]);

  // console.log("NEW POSITIONS", newPositions)
  newPositions.forEach((newPosition, agentIndex) => {
    Quads[agentIndex].currentPos = {
      xPos: newPosition[0],
      yPos: newPosition[1],
      zPos: newPosition[2],
      yaw: newPosition[3],
    };

    controller.Map.addControlDataToHistory(
      {
        time: Quads[agentIndex].time,
        xPos: newPosition[0],
        yPos: newPosition[1],
        zPos: newPosition[2],
        yaw: newPosition[3],
      },
      agentIndex
    );
  });

  return [controller.VS.Formation_Reference_Point, controller.VS.Heading_Angle];
};

PSO.prototype.runSimulation = function (newParameters) {
  const controller = new FormationControl(this.simulation_setup);
  controller.APF.Parameters = newParameters;

  const AR1 = new QuadModel(
    "newModel",
    {
      xPos: this.simulation_setup.initialAgentsPosition[0][0],
      yPos: this.simulation_setup.initialAgentsPosition[0][1],
      zPos: this.simulation_setup.initialAgentsPosition[0][2], //x, y, z in meter
      yaw: 0, //degree
    },
    this.simulation_setup.dt
  );

  const AR2 = new QuadModel(
    "newModel",
    {
      xPos: this.simulation_setup.initialAgentsPosition[1][0],
      yPos: this.simulation_setup.initialAgentsPosition[1][1],
      zPos: this.simulation_setup.initialAgentsPosition[1][2], //x, y, z in meter
      yaw: 0, //degree
    },
    this.simulation_setup.dt
  );

  const Quads = [AR1, AR2];

  let FRPPosHistory = [];
  let FRPAngleHistory = [];

  for (
    let iteration = 0;
    iteration <= this.simulation_setup.simulation_duration;
    iteration = Math.round((iteration + this.simulation_setup.dt) * 10) / 10
  ) {
    let [newFRPPos, newFRPAngle] = this.calculateDynamics(controller, Quads);
    FRPPosHistory.push(newFRPPos);
    FRPAngleHistory.push(newFRPAngle);
  }
  return [FRPPosHistory, FRPAngleHistory];
};

PSO.prototype.calculateCostValue = function (FRPPosHistory) {
  let costValue = 0;
  let targetPos = this.simulation_setup.targetsPosition[0];
  FRPPosHistory.forEach((FRPPos) => {
    let distance = Math.abs(util.calculateEucDistance(targetPos, FRPPos));
    costValue = costValue + distance;
  });
  return costValue;
};

PSO.prototype.createInitialPosition = function () {
  let Particles = [];
  for (
    let particle_number = 0;
    particle_number < this.total_particles;
    particle_number++
  ) {
    let particle_position = [];
    for (
      let number_parameter = 0;
      number_parameter < this.number_parameters;
      number_parameter++
    ) {
      particle_position.push(
        Math.round(
          (this.min_param_value + Math.random() * this.max_param_value) * 100
        ) / 100
      );
    }
    let newParticle = new PSOParticle(particle_position);
    Particles.push(newParticle);
  }

  return Particles;
};

PSO.prototype.runPSO = function () {
  let w = 0.72984;
  let c1 = 0.72984 * 2.05;
  let c2 = 0.72984 * 2.05;

  let Particles = this.createInitialPosition();
  let globalBestPos = [-10, -10, -10, -10];
  let bestCostValue = 99999;

  let currentEpoch = 0;
  while (currentEpoch < this.epoch) {
    currentEpoch++;
    Particles.forEach((Particle) => {
      let [FRPPosHistory, FRPAngleHistory] = this.runSimulation(
        Particle.getAPFParameters()
      );
      let costValue = this.calculateCostValue(FRPPosHistory);

      if (costValue < bestCostValue) {
        bestCostValue = costValue;
        globalBestPos = Particle.current_position;
      }
      if (costValue < Particle.personal_best_cost_value) {
        Particle.updateBestCostVal(costValue);
        Particle.updateBestPos(Particle.current_position);
      }

      let vel_inertia = util.calculateWithVector(
        "times",
        w,
        Particle.current_velocity
      );

      let personal_attraction = util.calculateWithVector(
        "times",
        c1 * Math.random(),
        util.calculateWithVector(
          "minus",
          Particle.personal_best_pos,
          Particle.current_position
        )
      );
      let global_attraction = util.calculateWithVector(
        "times",
        c2 * Math.random(),
        util.calculateWithVector(
          "minus",
          globalBestPos,
          Particle.current_position
        )
      );

      Particle.current_velocity = util.calculateWithVector(
        "plus",
        vel_inertia,
        util.calculateWithVector("plus", personal_attraction, global_attraction)
      );
      Particle.calculateNewPos();
    });
    console.log(`----- EPOCH - ${currentEpoch} -----`);
    console.log(`Global Best Cost Value: ${bestCostValue}`);
    console.log(`Global Best Parameters : ${globalBestPos}`);
  }

  console.log(`----- PSO FINISHED! With EPOCH ${currentEpoch} -----`);
  console.log(`Best Cost Value -> ${bestCostValue}`);
  console.log(`Best Parameters -> ${globalBestPos}`);
};

export default PSO;
