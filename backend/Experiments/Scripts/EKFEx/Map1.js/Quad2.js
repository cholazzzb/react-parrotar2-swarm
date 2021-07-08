import autonomy from "ardrone-autonomy";

import DataRecorder from "./Libraries/DataRecorder.js";

const folderName = "./Experiments/Data/EKFEx";
const fileName = "Map1";

const Recorder = new DataRecorder();
let initialTime = new Date().getTime();

var [client1, control1, mission1] = autonomy.createMission(
  {
    ip: "192.168.2.2",
  }
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
