var arDrone = require("ar-drone");

export default async function handler(req, res) {
  const {
    query: { command, control },
    method,
  } = req;

  console.log(command, control);
  var quadrotor;

  switch (command) {
    case "CONNECT":
      quadrotor = arDrone.createClient();
      quadrotor.config("general:navdata_demo", "FALSE");
      console.log("TRUE");
      res.status(200).json({ success: true });
      break;

    case "TAKEOFF":
      try {
        console.log('quadrotor', quadrotor)
        quadrotor.takeoff();
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("ERROR ON TAKEOFF");
      }

      break;

    case "LAND":
      try {
        quadrotor.stop();
        quadrotor.land();
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("ERROR ON LAND");
      }
      break;

    case "CONTROL":
      break;
  }
}
