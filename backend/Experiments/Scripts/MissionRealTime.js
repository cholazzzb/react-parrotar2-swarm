import autonomy from "ardrone-autonomy";

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.2",
});

var intervalId;
var iteration = 0;
function intervalControl() {
  iteration++;
  console.log(iteration);
  mission1._steps = [];
  // forward API
  // mission1.forward(1);

  // go API
  mission1.go({ x: iteration, y: 0, z: 1, yaw: 90 });

  mission1.run();

  if (iteration == 3) {
    clearInterval(intervalId);
    mission1.land().run();
  }
}

try {
  console.log("takeoff");
  mission1.takeoff().zero();
  mission1.run();

  setTimeout(() => {
    intervalId = setInterval(() => {
      intervalControl();
    }, 2000);
  }, 5000);
} catch (error) {
  client1.land();
  console.log(`EMERGENCY LANDING  ERROR : ${error}`);
}
