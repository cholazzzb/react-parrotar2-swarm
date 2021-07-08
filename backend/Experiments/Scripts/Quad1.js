import autonomy from "ardrone-autonomy";
import socketIOClient from "socket.io-client";

import DataRecorder from "./Libraries/DataRecorder.js";

const folderName = "./Experiments/Data/PosControl";
const fileName = "tum_PSO";

const SOCKET_SERVER_URL = "http://localhost:4000";
const MARVELMIND = "MARVELMIND";
const QuadIndex = 0;

const Recorder = new DataRecorder();
let initialTime = new Date().getTime();

const marvelmindTunnel = socketIOClient(SOCKET_SERVER_URL, {
  query: MARVELMIND,
});
marvelmindTunnel.on(MARVELMIND, (marvelmindData) => {
  let time = Math.round((new Date().getTime() - initialTime) / 10, 2) / 100;

  let newData = marvelmindData[QuadIndex];
  Recorder.addData([time, newData.xPos, newData.yPos, newData.zPos]);
});

var [client1, control1, mission1] = autonomy.createMission(
  {
    ip: "192.168.2.2",
  },
  1
);

client1.takeoff();
client1.after(5000, () => {
  control1.go({ x: 0, y: 0, z: 0.7 });
});
client1.after(5000, () => {
  Recorder.saveDataWE("py", folderName, fileName);
  client1.stop();
  client1.land();
});
