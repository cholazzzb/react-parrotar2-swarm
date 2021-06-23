import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";
const MARVELMIND = "MARVELMIND";

function useSocketMarvelmind(initialState, type, eventConstant) {
  const [data, setData] = useState(initialState);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: MARVELMIND,
    });
    socketRef.current.on(eventConstant, (newData) => {
      var incomingData;
      switch (eventConstant) {
        case MARVELMIND:
          incomingData = { ...data };
          incomingData.position[0].data.push({
            x: newData[0].xPos,
            y: newData[0].yPos,
          });
          incomingData.position[1].data.push({
            x: newData[1].xPos,
            y: newData[1].yPos,
          });
          incomingData.attitude[0].data.push({
            x: newData[0].time,
            y: newData[0].zPos,
          });
          incomingData.attitude[1].data.push({
            x: newData[0].time,
            y: newData[1].zPos,
          });

          // incomingData.yaw[0].data.push(newData.body.yaw[0].data);
          // incomingData.yaw[1].data.push(newData.body.yaw[1].data);
          // incomingData.yaw[2].data.push(newData.body.yaw[2].data);

          // incomingData.APF_X[0].data.push(newData.body.APF_X[0].data);
          // incomingData.APF_X[1].data.push(newData.body.APF_X[1].data);

          // incomingData.APF_Y[0].data.push(newData.body.APF_Y[0].data);
          // incomingData.APF_Y[1].data.push(newData.body.APF_Y[1].data);

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

export default useSocketMarvelmind;
