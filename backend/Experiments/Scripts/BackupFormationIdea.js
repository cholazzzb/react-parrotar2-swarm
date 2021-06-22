import autonomy from "ardrone-autonomy";
import fs from "fs";

/**
 * EXPERIMENT 4
 * Interval a second, control API -> forward(1)
 */

const folderName = "Experiments/Data/Ex4";
const fileName = "EKFData_intervalforward_1m";
const timeInterval = 3000; // ms
var counter = 0;

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log("success connecting");

/**
 * INITIAL POSITION
 * client1 = 0   , 0
 * client2 = 1.5 , 0
 */

var EKFData1 = [
  { id: "X Pos", data: [] },
  { id: "Y Pos", data: [] },
  { id: "Z Pos", data: [] },
  { id: "Yaw", data: [] },
];

var EKFData1Array = [
  { name: "time", data: [] },
  { name: "xPos", data: [] },
  { name: "yPos", data: [] },
  { name: "zPos", data: [] },
  { name: "yaw", data: [] },
];

var timeInitial = new Date().getTime();
var time = 0;

control1.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    time = Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;
    EKFData1[0].data.push({ x: time, y: ekfData.state.x });
    EKFData1[1].data.push({ x: time, y: ekfData.state.y });
    EKFData1[2].data.push({ x: time, y: ekfData.state.z });
    EKFData1[3].data.push({ x: time, y: ekfData.state.yaw });
    EKFData1Array[0].data.push(time);
    EKFData1Array[1].data.push(ekfData.state.x);
    EKFData1Array[2].data.push(ekfData.state.y);
    EKFData1Array[3].data.push(ekfData.state.z);
    EKFData1Array[4].data.push(ekfData.state.yaw);
  }
});

function intervaControl1() {
  counter++;
    control1.forward(1);

  if (counter == 2) {
    client1.stop();
    client1.land();

    fs.writeFileSync(
      `${folderName}/${fileName}.js`,
      `const ${fileName} =  ` +
        JSON.stringify(EKFData1) +
        `; export default ${fileName}`,
      "utf-8"
    );
    fs.writeFileSync(
      `${folderName}/${fileName}_array.js`,
      `const ${fileName}_array =  ` +
        JSON.stringify(EKFData1Array) +
        `; export default ${fileName}_array`,
      "utf-8"
    );

    clearInterval(this);
  }
}

try {
  client1.takeoff();
  client1.after(5000, () => {
    setInterval(intervaControl1, timeInterval);
  });
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
}
