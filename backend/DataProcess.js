import phi1_1 from "./Data/phi1_1.js";
import phi1_2 from "./Data/phi1_2.js";
import phi1_3 from "./Data/phi1_3.js";
import phi1_4 from "./Data/phi1_4.js";
import phi1_5 from "./Data/phi1_5.js";

import theta1_1 from "./Data/theta1_1.js";
import theta1_2 from "./Data/theta1_2.js";
import theta1_3 from "./Data/theta1_3.js";
import theta1_4 from "./Data/theta1_4.js";
import theta1_5 from "./Data/theta1_5.js";

import psi1_1 from "./Data/psi1_1.js";
import psi1_2 from "./Data/psi1_2.js";
import psi1_3 from "./Data/psi1_3.js";
import psi1_4 from "./Data/psi1_4.js";
import psi1_5 from "./Data/psi1_5.js";

const dataPhi = [phi1_1, phi1_2, phi1_3, phi1_4, phi1_5];
const dataTheta = [theta1_1, theta1_2, theta1_3, theta1_4, theta1_5];
const dataPsi = [psi1_1, psi1_2, psi1_3, psi1_4, psi1_5];

const timeSampling = 0.33; // s

// Cleaning the data
//// PHI
let phiLengthMin = 999;
dataPhi.forEach((phiArray) => {
  if (phiArray.phi.length < phiLengthMin) {
    phiLengthMin = phiArray.phi.length;
  }

  // reduce t to 0
  let startTime = phiArray.time[0];
  for (let iteration = 0; iteration < phiArray.time.length; iteration++) {
    phiArray.time[iteration] =
      Math.round((phiArray.time[iteration] - startTime) * 100) / 100;
  }
});

dataPhi.forEach((phiArray) => {
  while (phiArray.phi.length > phiLengthMin) {
    phiArray.time.pop();
    phiArray.phi.pop();
  }
});
// newData
let newPhi1 = [];
let newPhi2 = [];
let newPhi3 = [];
let newPhi4 = [];
let newPhi5 = [];
let newPhiAverage = []
for (let iteration = 0; iteration < dataPhi[0].time.length; iteration++) {
  newPhi1.push({
    x: timeSampling * iteration,
    y: dataPhi[0].phi[iteration],
  });
  newPhi2.push({
    x: timeSampling * iteration,
    y: dataPhi[1].phi[iteration],
  });
  newPhi3.push({
    x: timeSampling * iteration,
    y: dataPhi[2].phi[iteration],
  });
  newPhi4.push({
    x: timeSampling * iteration,
    y: dataPhi[3].phi[iteration],
  });
  newPhi5.push({
    x: timeSampling * iteration,
    y: dataPhi[4].phi[iteration],
  });
  newPhiAverage.push({
    x: timeSampling * iteration,
    y: (dataPhi[0].phi[iteration] + dataPhi[1].phi[iteration] + dataPhi[2].phi[iteration] + dataPhi[3].phi[iteration] + dataPhi[4].phi[iteration])/5
  })
}

const newDataPhi = [
  {
    id: "phi1",
    data: newPhi1,
  },
  {
    id: "phi2",
    data: newPhi2,
  },
  {
    id: "phi3",
    data: newPhi3,
  },
  {
    id: "phi4",
    data: newPhi4,
  },
  {
    id: "phi5",
    data: newPhi5,
  },
];

//// THETA
let thetaLengthMin = 999;
dataTheta.forEach((thetaArray) => {
  if (thetaArray.theta.length < thetaLengthMin) {
    thetaLengthMin = thetaArray.theta.length;
  }

  // reduce t to 0
  let startTime = thetaArray.time[0];
  for (let iteration = 0; iteration < thetaArray.time.length; iteration++) {
    thetaArray.time[iteration] =
      Math.round((thetaArray.time[iteration] - startTime) * 100) / 100;
  }
});

dataTheta.forEach((thetaArray) => {
  while (thetaArray.theta.length > thetaLengthMin) {
    thetaArray.time.pop();
    thetaArray.theta.pop();
  }
});
// newData
let newTheta1 = [];
let newTheta2 = [];
let newTheta3 = [];
let newTheta4 = [];
let newTheta5 = [];
let newThetaAverage = []
for (let iteration = 0; iteration < dataTheta[0].time.length; iteration++) {
  newTheta1.push({
    x: timeSampling * iteration,
    y: dataTheta[0].theta[iteration],
  });
  newTheta2.push({
    x: timeSampling * iteration,
    y: dataTheta[1].theta[iteration],
  });
  newTheta3.push({
    x: timeSampling * iteration,
    y: dataTheta[2].theta[iteration],
  });
  newTheta4.push({
    x: timeSampling * iteration,
    y: dataTheta[3].theta[iteration],
  });
  newTheta5.push({
    x: timeSampling * iteration,
    y: dataTheta[4].theta[iteration],
  });
  newThetaAverage.push({
    x: timeSampling * iteration,
    y: (dataTheta[0].theta[iteration] + dataTheta[1].theta[iteration] + dataTheta[2].theta[iteration] + dataTheta[3].theta[iteration] + dataTheta[4].theta[iteration])/5,
  });
}

const newDataTheta = [
  {
    id: "theta1",
    data: newTheta1,
  },
  {
    id: "theta2",
    data: newTheta2,
  },
  {
    id: "theta3",
    data: newTheta3,
  },
  {
    id: "theta4",
    data: newTheta4,
  },
  {
    id: "theta5",
    data: newTheta5,
  },
];

//// PSI
let psiLengthMin = 999;
dataPsi.forEach((psiArray) => {
  if (psiArray.psi.length < psiLengthMin) {
    psiLengthMin = psiArray.psi.length;
  }

  // reduce t to 0
  let startTime = psiArray.time[0];
  for (let iteration = 0; iteration < psiArray.time.length; iteration++) {
    psiArray.time[iteration] =
      Math.round((psiArray.time[iteration] - startTime) * 100) / 100;
  }
});

dataPsi.forEach((psiArray) => {
  while (psiArray.psi.length > psiLengthMin) {
    psiArray.time.pop();
    psiArray.psi.pop();
  }
});
// newData
let newPsi1 = [];
let newPsi2 = [];
let newPsi3 = [];
let newPsi4 = [];
let newPsi5 = [];
for (let iteration = 0; iteration < dataPsi[0].time.length; iteration++) {
  newPsi1.push({
    x: timeSampling * iteration,
    y: dataPsi[0].psi[iteration],
  });
  newPsi2.push({
    x: timeSampling * iteration,
    y: dataPsi[1].psi[iteration],
  });
  newPsi3.push({
    x: timeSampling * iteration,
    y: dataPsi[2].psi[iteration],
  });
  newPsi4.push({
    x: timeSampling * iteration,
    y: dataPsi[3].psi[iteration],
  });
  newPsi5.push({
    x: timeSampling * iteration,
    y: dataPsi[4].psi[iteration],
  });
}

const newDataPsi = [
  {
    id: "psi1",
    data: newPsi1,
  },
  {
    id: "psi2",
    data: newPsi2,
  },
  {
    id: "psi3",
    data: newPsi3,
  },
  {
    id: "psi4",
    data: newPsi4,
  },
  {
    id: "psi5",
    data: newPsi5,
  },
];

const DataProcess = {
  dataPhi: newDataPhi,
  dataTheta: newDataTheta,
  dataPsi: newDataPsi,
  dataPhiAverage: [{id: "Phi Average", data:newPhiAverage}],
  dataThetaAverage: [{id: "Theta Average", data:newThetaAverage}],
  
};

export default DataProcess;
