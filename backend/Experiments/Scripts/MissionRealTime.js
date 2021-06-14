import autonomy from "ardrone-autonomy";

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.2",
});

var intervalId;
var iteration = 0;
function intervalControl() {
  iteration++;
  mission1.forward(1);
  mission1.run();

  if (iteration == 5) {
    clearInterval(intervalId);
  }
}

try {
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
