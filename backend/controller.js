import socketIOClient from "socket.io-client";
import autonomy from "ardrone-autonomy";
import fs from "fs";

var angleData = [
  [], // Time
  [], // Phi
  [], // Theta
  [], // Psi
];
const fileName = "psi_5";

// console.log("CONNECTING...");
// var quadrotor1 = arDrone.createClient({ ip: "192.168.1.2" });
// // var quadrotor2 = arDrone.createClient({ ip: "192.168.1.9" });
// var control1 = new autonomy.Controller(quadrotor1);
// // var control2 = new autonomy.Controller(quadrotor2);

// quadrotor1.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
// quadrotor1.config("general:navdata_options", 777060865); // turn on GPS
// quadrotor2.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
// quadrotor2.config("general:navdata_options", 777060865); // turn on GPS
var [client, control, mission] = autonomy.createMission({ ip: "192.168.1.2" }, 1);

console.log("SUCCESS CONNECTING");

const SOCKET_SERVER_URL = "http://localhost:4000";
const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT = "EKF_EVENT";

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
            mission.run(function (err, result) {
              if (err) {
                console.trace("Oops, something bad happened: %s", err.message);
                mission.client().stop();
                mission.client().land();
              } else {
                console.log("Mission success!");
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
            mission.takeoff().zero().land();
          } catch (error) {
            console.error("ERROR WHEN STARTING!");
          }
          break;

        case "MISSION":
          try {
            console.log("MISSION");
            mission
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
            client.takeoff();

            client
              .after(5000, function () {
                angleData = [
                  [], // Time
                  [], // Phi
                  [], // Theta
                  [], // Psi
                ];
                console.log("PHI");
                this.left(1);
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
                  `./Data/${fileName}.js`,
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
            client.takeoff();

            client
              .after(5000, function () {
                angleData = [
                  [], // Time
                  [], // Phi
                  [], // Theta
                  [], // Psi
                ];
                console.log("FRONT");
                this.front(1);
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
                  `./Data/${fileName}.js`,
                  `const ${fileName} =  ` +
                    JSON.stringify(dataSaved) +
                    `; export default ${fileName}`,
                  "utf-8"
                );
                console.log("finish");
              })
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
            client.takeoff();

            client
              .after(5000, function () {
                angleData = [
                  [], // Time
                  [], // Phi
                  [], // Theta
                  [], // Psi
                ];
                this.clockwise(1);
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
                  `./Data/${fileName}.js`,
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
var time = 1;

client.on("navdata", (navdata) => {
  if (navdata !== undefined) {
    demo = Object(navdata.demo);
    // console.log(demo)
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

const connectionEKFData = socketIOClient(SOCKET_SERVER_URL, {
  query: "EKFDATA",
});

var EKFState = {
  xPos: 0,
  yPos: 0,
  zPos: 0,
  yaw: 0,
};

var timeEKF = 1;

control.on("controlData", (ekfData) => {
  if (ekfData !== undefined) {
    EKFState.xPos = ekfData.state.x;
    EKFState.yPos = ekfData.state.y;
    EKFState.zPos = ekfData.state.z;
    EKFState.yaw = ekfData.state.yaw;

    timeEKF += 1;
    if (timeEKF === 1) {
      connectionEKFData.emit(EKF_EVENT, {
        type: "EKFSTATE",
        body: EKFState,
        senderId: connectionCommand.id,
      });
      timeEKF = 0;
    }
  }
});