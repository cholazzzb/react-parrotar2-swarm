import socketIOClient from "socket.io-client";
import autonomy, { control } from "ardrone-autonomy";
import fs from "fs";

const folderName = "1per15/target0koma5";
const fileName = "psi5";

var angleData = [
  [], // Time
  [], // Phi
  [], // Theta
  [], // Psi
];
var EKFData1 = [
  [], // Time
  [], // X
  [], // Y
  [], // Yaw
];

var EKFData2 = [
  [], // Time
  [], // X
  [], // Y
  [], // Yaw
];

// quadrotor1.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
// quadrotor1.config("general:navdata_options", 777060865); // turn on GPS
// quadrotor2.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
// quadrotor2.config("general:navdata_options", 777060865); // turn on GPS
var [client1, control1, mission1] = autonomy.createMission({
  ip: "192.168.1.9",
});

console.log("SUCCESS CONNECTING");

const SOCKET_SERVER_URL = "http://localhost:4000";
const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT1 = "EKF_EVENT1";
const EKF_EVENT2 = "EKF_EVENT2";

const connectionCommand = socketIOClient(SOCKET_SERVER_URL, {
  query: "COMMAND",
});

/**
Force shutdown
telnet 192.168.1.1

cd sbin
poweroff
 */

// COMMAND
connectionCommand.on(COMMAND_EVENT, (data) => {
  console.log("---INCOMING COMMAND---");
  console.log("type", data.type);
  console.log("data", data.body);

  switch (data.type) {
    case "COMMAND":
      switch (data.body) {
        case "START":
          try {
            console.log("STARTING...");
            EKFData1 = [
              [], // time
              [], // X
              [], // Y
              [], // Yaw
            ];
            mission1.run(function (err, result) {
              if (err) {
                console.trace("Oops, something bad happened: %s", err.message);
                mission1.client().stop();
                mission1.client().land();
              } else {
                console.log("Mission success!");
                var dataSaved = {
                  time: EKFData1[0],
                  xPos: EKFData1[1],
                  yPos: EKFData1[2],
                  yaw: EKFData1[3],
                };
                fs.writeFileSync(
                  `./Data/${folderName}/${fileName}.js`,
                  `const ${fileName} =  ` +
                    JSON.stringify(dataSaved) +
                    `; export default ${fileName}`,
                  "utf-8"
                );
                process.exit(0);
              }
            });
          } catch (error) {
            console.error("ERROR WHEN STARTING!");
          }
          break;

        case "CALIBRATE":
          try {
            console.log("CALIBRATING...");
            mission1.takeoff().zero().land();
          } catch (error) {
            console.error("ERROR WHEN STARTING!");
          }
          break;

        case "MISSION":
          try {
            console.log("MISSION");
            mission1
              .takeoff()
              .zero() // Sets the current state as the reference
              // .cw(45)
              .forward(1)
              // .hover(1000) // Hover in place for 1 second
              // .forward(1)
              // .cw(180)
              .land();
          } catch (error) {
            console.error("ERROR WHEN STARTING!");
          }
          break;
        case "PHI":
          try {
            console.log("PHI");
            client1.takeoff();

            client1
              .after(5000, function () {
                angleData = [
                  [], // Time
                  [], // Phi
                  [], // Theta
                  [], // Psi
                ];
                console.log("PHI");
                this.left(0.5);
              })
              .after(1000, function () {
                console.log("stop");

                this.stop();
                var dataSaved = {
                  time: angleData[0],
                  phi: angleData[1],
                  theta: angleData[2],
                  psi: angleData[3],
                };
                fs.writeFileSync(
                  `./Data/${folderName}/${fileName}.js`,
                  `const ${fileName} =  ` +
                    JSON.stringify(dataSaved) +
                    `; export default ${fileName}`,
                  "utf-8"
                );

                console.log("finish");
              })
              .after(1000, function () {
                this.land();
              });
          } catch (error) {
            console.error("ERROR WHEN PHI!");
          }
          break;

        case "THETA":
          try {
            console.log("THETA");
            client1.takeoff();

            client1
              .after(5000, function () {
                angleData = [
                  [], // Time
                  [], // Phi
                  [], // Theta
                  [], // Psi
                ];
                console.log("FRONT");
                this.front(0.5);
              })
              .after(1000, function () {
                console.log("stop");
                this.front(0);
                var dataSaved = {
                  time: angleData[0],
                  phi: angleData[1],
                  theta: angleData[2],
                  psi: angleData[3],
                };
                fs.writeFileSync(
                  `./Data/${folderName}/${fileName}.js`,
                  `const ${fileName} =  ` +
                    JSON.stringify(dataSaved) +
                    `; export default ${fileName}`,
                  "utf-8"
                );
                console.log("finish");
              });
            // .after(2000, function () {
            //   console.log("land");
            // this.stop();
            // this.land();
            // });
          } catch (error) {
            console.error("ERROR WHEN THETA!");
          }
          break;

        case "PSI":
          try {
            console.log("PSI");
            client1.takeoff();

            client1
              .after(5000, function () {
                angleData = [
                  [], // Time
                  [], // Phi
                  [], // Theta
                  [], // Psi
                ];
                this.clockwise(0.5);
              })
              .after(1000, function () {
                console.log("stop");
                this.stop();
                var dataSaved = {
                  time: angleData[0],
                  phi: angleData[1],
                  theta: angleData[2],
                  psi: angleData[3],
                };
                fs.writeFileSync(
                  `./Data/${folderName}/${fileName}.js`,
                  `const ${fileName} =  ` +
                    JSON.stringify(dataSaved) +
                    `; export default ${fileName}`,
                  "utf-8"
                );
              })
              .after(1000, function () {
                this.land();
                console.log("finish");
              });
          } catch (error) {
            console.error("ERROR WHEN PSI!");
          }
          break;

        case "X1Y0":
          try {
            client1.after(5000, function () {
              control1.go({ x: 1, y: 0 });
            });
            // control1.hover();
            // control1.land();
          } catch (error) {
            console.error("Error in X1Y0. Error :", error);
          }
          break;
        case "X0Y1":
          try {
            control1.go({ x: 0, y: 1 });
            // control1.hover();
            // control1.land();
          } catch (error) {
            console.error("Error in X0Y1. Error: ", error);
          }
          break;

        case "X0Y0":
          try {
            control1.go({ x: 0, y: 0 });
            // control1.hover();
            // control1.land();
          } catch (error) {
            console.error("Error in X0Y1. Error: ", error);
          }
          break;

        case "TAKEOFF":
          try {
            client1.takeoff(); // control1.hover();
            // control1.land();
          } catch (error) {
            console.error("Error in X0Y1. Error: ", error);
          }
          break;

        case "LAND":
          try {
            client1.land(); // control1.hover();
            // control1.land();
          } catch (error) {
            console.error("Error in X0Y1. Error: ", error);
          }
          break;
        default:
          break;
      }

      break;

    default:
      break;
  }
});

const connectionNavData = socketIOClient(SOCKET_SERVER_URL, {
  query: "NAVDATA",
});

// NAVDATA
var demo;

var droneState = {
  time: 0,
  phi: 0,
  theta: 0,
  psi: 0,
  altitude: 0,
  altitudeMeters: 0,
  velocity: { x: 0, y: 0, z: 0 },
  battery: 0,
};

var timeInitial = new Date().getTime();
var time = 0;

client1.on("navdata", (navdata) => {
  if (navdata !== undefined) {
    demo = Object(navdata.demo);
    droneState.psi = demo.clockwiseDegrees;
    droneState.phi = demo.leftRightDegrees;
    droneState.theta = demo.frontBackDegrees;
    droneState.altitude = demo.altitude;
    droneState.altitudeMeters = demo.altitudeMeters;
    droneState.velocity = demo.velocity;
    droneState.batteryPercentage = demo.batteryPercentage;

    time += 1;
    if (time === 1) {
      droneState.time =
        Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;
      connectionNavData.emit(NAVDATA_EVENT, {
        type: "DRONESTATE",
        body: droneState,
        senderId: connectionCommand.id,
      });
      angleData[0].push(droneState.time);
      angleData[1].push(droneState.phi);
      angleData[2].push(droneState.theta);
      angleData[3].push(droneState.psi);
      time = 0;
    }
  }
});

const connectionEKFData1 = socketIOClient(SOCKET_SERVER_URL, {
  query: "EKFDATA1",
});

var EKFState1 = {
  time: 0,
  xPos: 0,
  yPos: 0,
  zPos: 0,
  yaw: 0,
};

var timeEKF = 0;

control1.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    EKFState1.xPos = ekfData.state.x;
    EKFState1.yPos = ekfData.state.y;
    EKFState1.zPos = ekfData.state.z;
    EKFState1.yaw = ekfData.state.yaw;

    timeEKF += 1;
    if (timeEKF === 1) {
      EKFState1.time =
        Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;

      connectionEKFData1.emit(EKF_EVENT1, {
        type: "EKFSTATE",
        body: EKFState1,
        senderId: connectionCommand.id,
      });
      EKFData1[0] = EKFState1.time;
      EKFData1[1] = EKFState1.xPos;
      EKFData1[2] = EKFState1.yPos;
      EKFData1[3] = EKFState1.yaw;
      timeEKF = 0;
    }
  }
});
