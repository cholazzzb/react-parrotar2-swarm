import autonomy from "ardrone-autonomy";

/**
 * EXPERIMENT 1
 * Control API -> go({x: targetX1, y: 0})
 */

var [client1, control1, mission1] = autonomy.createMission(
  {
    ip: "192.168.1.1",
  },
  1
);

// var [client2, control2, mission2] = autonomy.createMission(
//   {
//     ip: "192.168.2.2",
//   },
//   1
// );

console.log("success connecting");



// TEST POSITION CONTROLLER
try {
  client1.takeoff()

  client1.after(5000, () => {
    // control1.zero()
    control1.go({ x: 2, y: 1.5, z: 0.7, yaw: 0 });
  });
  client1.after(3000, () => {
    // client1.land();
  });
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
}
