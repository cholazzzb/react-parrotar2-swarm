import autonomy from "ardrone-autonomy";

/**
 * EXPERIMENT 6 Checking how to calibrate yaw
 * Interval a second, control API -> forward(1)
 */

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log("success connecting");

client1.on("navdata", (navdata) => {
  if (navdata != undefined) {
    let demo = Object(navdata.demo);
    console.log("Battery : ", demo.batteryPercentage);
    console.log("demo", demo.rotation)
  }

});

control1.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    console.log("yaw :", ekfData.state.yaw);
  }
});

try {
  client1.takeoff();
  client1.after(5000, () => {
    console.log("Zeroing");
    control1.zero();
  });
  client1.after(3000, () => {
    client1.land();
  });
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
}
