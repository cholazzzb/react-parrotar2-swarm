import autonomy from "ardrone-autonomy";

var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.2",
});

var [client2, control2, mission2] = autonomy.createMission({
  ip: "192.168.1.9",
});

client1.on("navdata", (navdata) => {
  if (navdata != undefined) {
    let demo = Object(navdata.demo);
    console.log(`(ip: .2) Battery : ${demo.batteryPercentage}`);
  }
});

client2.on("navdata", (navdata) => {
  if (navdata != undefined) {
    let demo = Object(navdata.demo);
    console.log(`(ip: .9) Battery : ${demo.batteryPercentage}`);
  }
});
