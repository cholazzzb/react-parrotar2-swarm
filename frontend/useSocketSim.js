import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const SIMULATION_EVENT = "SIMULATION_EVENT";

function useSocket(initialState, type, eventConstant) {
  const [data, setData] = useState(initialState);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: type,
    });
    socketRef.current.on(eventConstant, (newData) => {
      var incomingData;
      switch (eventConstant) {
        case SIMULATION_EVENT:
          incomingData = { ...data };
          if (newData.hasOwnProperty("body")) {
            incomingData.position[0].data.push({
              x: newData.body.position[0].data.xPos,
              y: newData.body.position[0].data.yPos,
            });
            incomingData.position[1].data.push({
              x: newData.body.position[1].data.xPos,
              y: newData.body.position[1].data.yPos,
              
            });
            incomingData.attitude[0].data.push(newData.body.attitude[0].data);
            incomingData.attitude[1].data.push(newData.body.attitude[1].data);

            incomingData.yaw[0].data.push(newData.body.yaw[0].data);
            incomingData.yaw[1].data.push(newData.body.yaw[1].data);

            incomingData.APF_X[0].data.push(newData.body.APF_X[0].data)
            incomingData.APF_X[1].data.push(newData.body.APF_X[1].data)

            incomingData.APF_Y[0].data.push(newData.body.APF_Y[0].data)
            incomingData.APF_Y[1].data.push(newData.body.APF_Y[1].data)
          }

          break;
        default:
          break;
      }

      setData(incomingData);
    });
  }, []);

  const sendData = (type, data) => {
    socketRef.current.emit(eventConstant, {
      type: type,
      body: data,
      senderId: socketRef.current.id,
    });
  };
  return [data, sendData, setData];
}

export default useSocket;
