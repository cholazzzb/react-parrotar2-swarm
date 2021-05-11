import socketIOClient from "socket.io-client";
import * as arDrone from "ar-drone";
import arDroneConstants from "ar-drone/lib/constants.js";
import autonomy from "ardrone-autonomy";

console.log("CONNECTING...");
var quadrotor = arDrone.createClient();
var control = new autonomy.Controller(quadrotor);
function navdata_option_mask(c) {
  return 1 << c;
}

// From the SDK.
// var default_navdata_options =
//   navdata_option_mask(arDroneConstants.options.DEMO)
// |
// navdata_option_mask(arDroneConstants.options.VISION_DETECT);
// Enable the magnetometer data.
// quadrotor.config(
//   "general:navdata_options",
//   // default_navdata_options |
//     navdata_option_mask(arDroneConstants.options.MAGNETO)
// );

quadrotor.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
quadrotor.config("general:navdata_options", 777060865); // turn on GPS
console.log("SUCCESS CONNECTING");

const SOCKET_SERVER_URL = "http://localhost:4000";
const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT = "EKF_EVENT";

const connectionCommand = socketIOClient(SOCKET_SERVER_URL, {
  query: "COMMAND",
});

// COMMAND
connectionCommand.on(COMMAND_EVENT, (data) => {
  console.log("---INCOMING COMMAND---");
  console.log("type", data.type);
  console.log("data", data.body);

  switch (data.type) {
    case "COMMAND":
      switch (data.body) {
        case "CONNECT":
          try {
            console.log("CONNECTING...");
            quadrotor = arDrone.createClient();
            quadrotor.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
            console.log("SUCCESS CONNECTING");
          } catch (error) {
            quadrotor.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN CONNECTING!");
          }
          break;

        case "TAKEOFF":
          try {
            console.log("TAKEOFF...");
            quadrotor.takeoff();
            console.log("TAKEOFF SUCCESS!");
            quadrotor.after(5000, () => {
              console.log("CALIBRATING POSITION");
              control.zero();
            });
          } catch (error) {
            quadrotor.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN TAKEOFF!");
          }
          break;

        case "LAND":
          try {
            console.log("LANDING...");
            quadrotor.stop();
            quadrotor.land();
            console.log("LANDING SUCCESS!");
          } catch (error) {
            quadrotor.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN LANDING!");
          }
          break;

        case "FORWARD1":
          try {
            console.log("MOVING FORWARD 1m ");
            control.forward(1);
          } catch (error) {
            quadrotor.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN FORWARD1!");
          }

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

quadrotor.on("navdata", (navdata) => {
  if (navdata !== undefined) {
    demo = Object(navdata.demo);
    droneState.psi = demo.clockwiseDegrees;
    droneState.phi = demo.frontBackDegrees;
    droneState.theta = demo.leftRightDegrees;
    droneState.altitude = demo.altitude;
    droneState.altitudeMeters = demo.altitudeMeters;
    droneState.velocity = demo.velocity;
    droneState.batteryPercentage = demo.batteryPercentage;

    time += 1;
    if (time === 50) {
      droneState.time =
        Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;
      connectionNavData.emit(NAVDATA_EVENT, {
        type: "DRONESTATE",
        body: droneState,
        senderId: connectionCommand.id,
      });
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
};

var timeEKF = 1;

control.on("controlData", (data) => {
  console.log("DATA", data);
  EKFState.xPos = data.x
  EKFState.yPos = data.y
  // EKFState.zPos = data

  timeEKF += 1;
  if (timeEKF === 50) {
    EKFState.time =
      Math.round((new Date().getTime() - timeInitial) / 10, 2) / 100;
    connectionEKFData.emit(EKF_EVENT, {
      type: "EKFSTATE",
      body: EKFState,
      senderId: connectionCommand.id,
    });
  }
  timeEKF = 0;
});
