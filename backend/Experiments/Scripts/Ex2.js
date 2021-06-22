import autonomy from "ardrone-autonomy";

/**
 * EXPERIMENT 2
 * Control API -> forward(1)
 */

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log("success connecting");

try {
  client1.takeoff();
  // client1.after(5000, () => {
  //   control1.forward(1);
  // });
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
}
