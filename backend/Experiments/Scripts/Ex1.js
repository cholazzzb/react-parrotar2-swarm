import autonomy from "ardrone-autonomy";
import fs from "fs";

const folderName = "../Data/Ex1";
const fileName = "EKFData";

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});
var [client2, control2, mission2] = autonomy.createMission({
  ip: "192.168.1.2",
});
console.log("success connecting");

/**
 * INITIAL POSITION
 * client1 = 0   , 0
 * client2 = 1.5 , 0
 */

var EKFData1 = [
  [], // Time
  [], // X
  [], // Y
  [], // Z
  [], // Yaw
];
var EKFData2 = [
  [], // Time
  [], // X
  [], // Y
  [], // Z
  [], // Yaw
];

var timeInitial = new Date().getTime();
var timeEKF1 = 0;
var timeEKF2 = 0;

var EKFState1 = {
  time: 0,
  xPos: 0,
  yPos: 0,
  zPos: 0,
  yaw: 0,
};

var EKFState2 = {
  time: 0,
  xPos: 0,
  yPos: 0,
  zPos: 0,
  yaw: 0,
};

control1.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    EKFState1.xPos = ekfData.state.x;
    EKFState1.yPos = ekfData.state.y;
    EKFState1.zPos = ekfData.state.z;
    EKFState1.yaw = ekfData.state.yaw;

    timeEKF1 += 1;
    if (timeEKF1 === 1) {
      EKFState1.time =
        Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;

      EKFData1[0] = EKFState1.time;
      EKFData1[1] = EKFState1.xPos;
      EKFData1[2] = EKFState1.yPos;
      EKFData1[3] = EKFState1.yaw;
      timeEKF1 = 0;
    }
  }
});

control2.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    EKFState2.xPos = ekfData.state.x;
    EKFState2.yPos = ekfData.state.y;
    EKFState2.zPos = ekfData.state.z;
    EKFState2.yaw = ekfData.state.yaw;

    timeEKF2 += 1;
    if (timeEKF2 === 1) {
      EKFState2.time =
        Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;

      EKFData2[0] = EKFState2.time;
      EKFData2[1] = EKFState2.xPos;
      EKFData2[2] = EKFState2.yPos;
      EKFData2[3] = EKFState2.yaw;
      timeEKF2 = 0;
    }
  }
});

var isFinished = false;
var targetX = 0.1;

try {
  client2.takeoff();
  client1.takeoff();
  client1.after(5000, () => {
    while (!isFinished) {
      setTimeout(() => {
        control1.go({ x: targetX, y: 0 });
        control2.go({ x: targetX, y: 0 });

        targetX = targetX + 0.1;
      }, 1000);

      if (targetX == 1) {
        isFinished = true;
      }
    }
    client1.land();
    client2.land();
    var dataSaved = {
      EKF1: {
        time: EKFData1[0],
        xPos: EKFData1[1],
        yPos: EKFData1[2],
        zPos: EKFData1[3],
        yaw: EKFData1[4],
      },
      EKF2: {
        time: EKFData2[0],
        xPos: EKFData2[1],
        yPos: EKFData2[2],
        zPos: EKFData2[3],
        yaw: EKFData2[4],
      },
    };
    fs.writeFileSync(
      `${folderName}/${fileName}.js`,
      `const ${fileName} =  ` +
        JSON.stringify(dataSaved) +
        `; export default ${fileName}`,
      "utf-8"
    );
  });
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
  client2.land();
}
