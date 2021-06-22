import PSO from "./Experiments/Scripts/Libraries/PSO.js";

const pso_setup = {
  total_particles: 30,
  number_parameters: 4,
  epoch: 100,
  min_param_value: 0,
  max_param_value: 10,
};

const simulation_setup = {
  dt: 0.1,
  simulation_duration: 10,
  initialAgentsPosition: [
    [0, 0, 1],
    [0, 2, 1],
  ],
  obstaclesPosition: [[5, 0, 1]],
  targetsPosition: [[10, 1, 1]],
  initialFRP: [0, 0, 1],
  mode: "simulation",
};

var Optimization = new PSO(pso_setup, simulation_setup);
Optimization.runPSO();
