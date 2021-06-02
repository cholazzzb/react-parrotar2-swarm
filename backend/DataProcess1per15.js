import phi1 from "./Data/1per15/target1/phi1.js";
import phi2 from "./Data/1per15/target1/phi2.js";
import phi3 from "./Data/1per15/target1/phi3.js";
import phi4 from "./Data/1per15/target1/phi4.js";
import phi5 from "./Data/1per15/target1/phi5.js";
import phi6 from "./Data/1per15/target1/phi6.js";
import phi7 from "./Data/1per15/target1/phi7.js";
import phi8 from "./Data/1per15/target1/phi8.js";
import phi9 from "./Data/1per15/target1/phi9.js";
import phi10 from "./Data/1per15/target1/phi10.js";

import theta1 from "./Data/1per15/target1/theta1.js";
import theta2 from "./Data/1per15/target1/theta2.js";
import theta3 from "./Data/1per15/target1/theta3.js";
import theta4 from "./Data/1per15/target1/theta4.js";
import theta5 from "./Data/1per15/target1/theta5.js";
import theta6 from "./Data/1per15/target1/theta6.js";
import theta7 from "./Data/1per15/target1/theta7.js";
import theta8 from "./Data/1per15/target1/theta8.js";
import theta9 from "./Data/1per15/target1/theta9.js";
import theta10 from "./Data/1per15/target1/theta10.js";

import psi1 from "./Data/1per15/target1/psi1.js";
import psi2 from "./Data/1per15/target1/psi2.js";
import psi3 from "./Data/1per15/target1/psi3.js";
import psi4 from "./Data/1per15/target1/psi4.js";
import psi5 from "./Data/1per15/target1/psi5.js";
import psi6 from "./Data/1per15/target1/psi6.js";
import psi7 from "./Data/1per15/target1/psi7.js";
import psi8 from "./Data/1per15/target1/psi8.js";
import psi9 from "./Data/1per15/target1/psi9.js";
import psi10 from "./Data/1per15/target1/psi10.js";

const dataPhi = [phi1, phi2, phi3, phi4, phi5, phi6, phi7, phi8, phi9, phi10];
const dataTheta = [
  theta1,
  theta2,
  theta3,
  theta4,
  theta5,
  theta6,
  theta7,
  theta8,
  theta9,
  theta10,
];
const dataPsi = [psi1, psi2, psi3, psi4, psi5, psi6, psi7, psi8, psi9, psi10];

const allData = [
  {
    name: "phi",
    data: dataPhi,
  },
  {
    name: "theta",
    data: dataTheta,
  },
  {
    name: "psi",
    data: dataPsi,
  },
];
const timeSampling = 1 / 15; // s

let DataProcess1per15 = {
  phi: "",
  theta: "",
  psi: "",
  phiAverage: "",
  thetaAverage: "",
  psiAverage: "",
};

let averageDataOnly = {
  phi: [],
  theta: [],
  psi: []
}

allData.forEach((angleData) => {
  // Cleaning the data
  // let minLength = 999;
  // angleData.data.forEach((angles) => {
  //   if (angles[angleData.name].length < minLength) {
  //     minLength = angles[angleData.name].length;
  //   }

  //   // reduce time to 0
  //   let startTime = angles.time[0];
  //   for (
  //     let timeIteration = 0;
  //     timeIteration < angles.time.length;
  //     timeIteration++
  //   ) {
  //     angles.time[timeIteration] =
  //       Math.round((angles.time[timeIteration] - startTime) * 100) / 100;
  //   }
  // });

  // // Pop out the data
  // angleData.data.forEach((angles) => {
  //   while (angles[angleData.name] > minLength) {
  //     angles.time.pop();
  //     angles[angleData.name].pop();
  //   }
  // });

  // Shaping the data
  const newDataAngle = [];
  angleData.data.forEach((angles, anglesIndex) => {
    let newAngle = [];
    for (
      let timeIteration = 0;
      timeIteration < angles.time.length;
      timeIteration++
    ) {
      newAngle.push({
        x: Math.round(timeSampling * timeIteration * 100) / 100,
        y: angles[angleData.name][timeIteration],
      });
    }
    newDataAngle.push({
      id: `${angleData.name}${anglesIndex}`,
      data: newAngle,
    });
  });
  DataProcess1per15[angleData.name] = newDataAngle;

  // calculate average
  let averageArray = [];
  let averageOnlyArray= []
  for (
    let timeIteration = 0;
    timeIteration < angleData.data[0].time.length;
    timeIteration++
  ) {
    let sumOfAngle = 0;
    angleData.data.forEach((angles) => {
      sumOfAngle = sumOfAngle + angles[angleData.name][timeIteration];
    });
    averageArray.push({
      x: Math.round(timeSampling * timeIteration * 100) / 100,
      y: sumOfAngle / angleData.data.length,
    });
    averageOnlyArray.push(sumOfAngle/angleData.data.length)
  }
  DataProcess1per15[`${angleData.name}Average`] = [
    { id: `${angleData.name} average`, data: averageArray },
  ];
  averageDataOnly[angleData.name] = averageOnlyArray
});

export default DataProcess1per15;

import fs from "fs";
fs.writeFileSync(
  `./Data/1per15/target1/processedData.js`,
  `const processedData =  ` +
    JSON.stringify(DataProcess1per15) +
    `; export default processedData`,
  "utf-8"
);

fs.writeFileSync(
  `./Data/1per15/target1/averageDataOnly.js`,
  `const averageDataOnly =  ` +
    JSON.stringify(averageDataOnly) +
    `; export default averageDataOnly`,
  "utf-8"
);
