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
          incomingData = [...data];
          if (newData.hasOwnProperty("body")) {
            incomingData[0].data.push({
              x: newData.body[0].data.xPos,
              y: newData.body[0].data.yPos,
            });
            incomingData[1].data.push({
              x: newData.body[1].data.xPos,
              y: newData.body[1].data.yPos,
            });
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
