import socketIOClient from "socket.io-client";
import * as arDrone from "ar-drone";
import autonomy from "ardrone-autonomy";

console.log("CONNECTING...");
var quadrotor1 = arDrone.createClient({ ip: "192.168.1.2" });
var quadrotor2 = arDrone.createClient({ ip: "192.168.1.9" });
var control1 = new autonomy.Controller(quadrotor1);
var control2 = new autonomy.Controller(quadrotor2);

quadrotor1.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
quadrotor1.config("general:navdata_options", 777060865); // turn on GPS
quadrotor2.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
quadrotor2.config("general:navdata_options", 777060865); // turn on GPS
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
            quadrotor1 = arDrone.createClient();
            quadrotor1.config("general:navdata_demo", "FALSE"); // get back all data the copter can send
            console.log("SUCCESS CONNECTING");
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN CONNECTING!");
          }
          break;

        case "TAKEOFF":
          try {
            console.log("TAKEOFF...");
            quadrotor1.takeoff();
            quadrotor2.takeoff();
            console.log("TAKEOFF SUCCESS!");
            quadrotor1.after(5000, () => {
              console.log("CALIBRATING POSITION");
              control1.zero();
              control1.hover();
              control2.zero();
              control2.hover();
            });
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN TAKEOFF!");
          }
          break;

        case "LAND":
          try {
            console.log("LANDING...");
            quadrotor1.stop();
            quadrotor1.land();
            console.log("LANDING SUCCESS!");
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN LANDING!");
          }
          break;

        case "FORWARD1":
          try {
            console.log("MOVING FORWARD 1m ");
            control1.forward(1);
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN FORWARD1!");
          }
          break;

        case "BACKWARD1":
          try {
            console.log("MOVING BACKWARD 1m ");
            control1.backward(1);
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN BACKWARD1!");
          }
          break;

        case "LEFT1":
          try {
            console.log("MOVING LEFT 1m ");
            control1.left(1);
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN LEFT1!");
          }
          break;

        case "RIGHT1":
          try {
            console.log("MOVING RIGHT 1m ");
            control1.right(1);
          } catch (error) {
            quadrotor1.after(100, () => {
              this.stop();
              this.land();
            });
            console.error("ERROR WHEN RIGHT1!");
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

quadrotor1.on("navdata", (navdata) => {
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
  yaw: 0,
};

var timeEKF = 1;

control1.on("control1Data", (ekfData) => {
  if (ekfData !== undefined) {
    EKFState.xPos = ekfData.state.x;
    EKFState.yPos = ekfData.state.y;
    EKFState.zPos = ekfData.state.z;
    EKFState.yaw = ekfData.state.yaw;

    timeEKF += 1;
    if (timeEKF === 50) {
      connectionEKFData.emit(EKF_EVENT, {
        type: "EKFSTATE",
        body: EKFState,
        senderId: connectionCommand.id,
      });
      timeEKF = 0;
    }
  }
});
