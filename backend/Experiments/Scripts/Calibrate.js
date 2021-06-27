import autonomy from "ardrone-autonomy";

// var [client1, control1, mission1] = autonomy.createMission({
//   ip: "192.168.2.2",
// });

var [client2, control2, mission2] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log(`Connected!`);

try {
  // client1.takeoff();
  client2.takeoff();

  // client1.after(5000, () => {
  //   control1.zero();
  // });
  // client2.after(5000, () => {
  //   control2.zero();
  // });

  // client1.after(7000, () => {
  //   client1.land();
  // });
  // client2.after(7000, () => {
  //   client2.land();
  // });
  
} catch (error) {
  console.log(`ERROR ${error}`);
}
