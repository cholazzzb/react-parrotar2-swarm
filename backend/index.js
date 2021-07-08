import http from "http";
import * as socketIO from "socket.io";

const server = http.createServer();
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT1 = "EKF_EVENT1";
const EKF_EVENT2 = "EKF_EVENT2";
const SIMULATION_EVENT = "SIMULATION_EVENT";
const MARVELMIND = "MARVELMIND";

const degToRad = (deg) => {
  return (deg * Math.PI) / 180;
};

const transToQuadFrame = (position, yaw) => {
  let yawRad = degToRad(yaw);
  let transMatrix = [
    [Math.cos(yawRad), Math.sin(yawRad), 0],
    [-Math.sin(yawRad), Math.cos(yawRad), 0],
    [0, 0, 1],
  ];
  let newPos = [0, 0, 0];
  transMatrix.forEach((vector, index) => {
    newPos[index] =
      vector[0] * position[0] +
      vector[1] * position[1] +
      vector[2] * position[2];
  });
  return newPos;
};

io.on("connection", (socket) => {
  // Join a conversation
  const { type } = socket.handshake.query;
  console.log(`Client type: ${type} -id:${socket.id} connected`);
  socket.join(type);

  // Listen for new messages
  socket.on(NAVDATA_EVENT, (data) => {
    io.in(type).emit(NAVDATA_EVENT, data);
    // console.log('---EMIT DATA NAVDATA---')
    // console.log('Data', data)
  });

  socket.on(COMMAND_EVENT, (data) => {
    io.in(type).emit(COMMAND_EVENT, data);
    console.log("---EMIT DATA COMMAND---");
    console.log("Data", data);
  });

  socket.on(EKF_EVENT1, (data) => {
    io.in(type).emit(EKF_EVENT1, data);
    // console.log('---EMIT DATA EKF1---')
    // console.log('Data', data)
  });

  socket.on(EKF_EVENT2, (data) => {
    io.in(type).emit(EKF_EVENT2, data);
    // console.log('---EMIT DATA EKF2---')
    // console.log('Data', data)
  });

  socket.on(SIMULATION_EVENT, (data) => {
    io.in(type).emit(SIMULATION_EVENT, data);
    // console.log('---EMIT SIMULATION DATA---')
    // console.log('Data', data)
  });

  socket.on(MARVELMIND, (data) => {
    io.in(type).emit(MARVELMIND, data);
    console.log("---EMIT MARVELMIND DATA---");
    console.log("Data", data);
    let newData = data[0];
    let newPosGlobalF = [newData.xPos, newData.yPos, 0];

    let newPosQuadF = transToQuadFrame(newPosGlobalF, 0);
    console.log("MARVELMIND ON QUAD", newPosQuadF);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client type: ${type} -id: ${socket.id} diconnected`);
    socket.leave(type);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
