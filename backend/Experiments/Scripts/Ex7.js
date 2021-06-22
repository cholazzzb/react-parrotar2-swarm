import autonomy from "ardrone-autonomy";
import async from "async";
/**
 * EXPERIMENT 7 Testing Mission API
 *
 */

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log("success connecting");

client1.on("navdata", (navdata) => {
  if (navdata != undefined) {
    let demo = Object(navdata.demo);
    console.log("Battery : ", demo.batteryPercentage);
    console.log("demo", demo.rotation);
    console.log("yaw navdata: ")
  }
});

control1.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    console.log("yaw EKF: ", ekfData.state.yaw);
  }
});

try {
  console.log("TAKEOFF!");
  mission1.takeoff().zero();
  mission1.run();
  setTimeout(() => {
    console.log("FORWARD!");
    mission1.forward(1);
    mission1.run();
  }, 5000);
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
}
