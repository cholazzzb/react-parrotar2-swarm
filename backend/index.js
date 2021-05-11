import http from "http"
import * as socketIO from "socket.io"

const server = http.createServer();
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NAVDATA_EVENT = "NAVDATA_EVENT"
const COMMAND_EVENT = "COMMAND_EVENT"
const EKF_EVENT = "EKF_EVENT"

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { type } = socket.handshake.query;
  socket.join(type);

  // Listen for new messages
  // socket.on(NAVDATA_EVENT, (data) => {
  //   io.in(type).emit(NAVDATA_EVENT, data);
  //   console.log('---EMIT DATA NAVDATA---')
  //   console.log('Data', data)
  // });

  socket.on(COMMAND_EVENT, (data) => {
    io.in(type).emit(COMMAND_EVENT, data);
    console.log('---EMIT DATA COMMAND---')
    console.log('Data', data)
  });

  socket.on(EKF_EVENT, (data) => {
    io.in(type).emit(EKF_EVENT, data);
    console.log('---EMIT DATA EKF---')
    console.log('Data', data)
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(type);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});