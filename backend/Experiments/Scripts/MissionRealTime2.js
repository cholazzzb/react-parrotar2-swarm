import autonomy from "ardrone-autonomy";

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.2",
});

var [client2, control2, mission2] = autonomy.createMission({
  ip: "192.168.1.9",
});

var intervalId;
var iteration = 0;
function intervalControl() {
  iteration++;
  console.log("Iteration :  ", iteration);
  mission1._steps = [];

  // Forward API
  mission1.forward(1);

  // GO API
  // mission1.go({x: iteration, y: 0, z: 1, yaw:30})
  mission1.run();

  if (iteration == 3) {
    clearInterval(intervalId);
    mission1.land().run();
  }
}

var intervalId2;
var iteration2 = 0;
function intervalControl2() {
  iteration2++;
  console.log("Iteration2 : ", iteration2);
  mission2._steps = [];

  // forward api
  mission2.forward(1);

  // GO api
  // mission2.go({x: iteration2, y: 0, z: 1, yaw:30})

  mission2.run();

  if (iteration2 == 3) {
    clearInterval(intervalId2);
    mission2.land().run();
  }
}

try {
  console.log("takeoff");
  mission1.takeoff().zero();
  mission1.run();
  mission2.takeoff().zero();
  mission2.run();

  setTimeout(() => {
    intervalId = setInterval(() => {
      intervalControl();
    }, 2000);

    intervalId2 = setInterval(() => {
      intervalControl2();
    }, 2000);

  }, 5000);

} catch (error) {
  client1.land();
  client2.land()
  console.log(`EMERGENCY LANDING  ERROR : ${error}`);
}
