import autonomy from "ardrone-autonomy";

/**
 * EXPERIMENT 1
 * Control API -> go({x: targetX1, y: 0})
 */

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log("success connecting");

try {
  client1.takeoff();
  client1.after(5000, () => {
    control1.go({ x: 0.8, y: 0 });
  });
} catch (error) {
  console.log(`EXPERIMENT FAILED. Error : ${error}`);
  client1.land();
}

// Result : 
/**
 * Takeoff doesn't happen vertically...
 */
