import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT1 = "EKF_EVENT1";
const EKF_EVENT2 = "EKF_EVENT2"

function useSocket(type, eventConstant) {
  var initialState = {};
  switch (eventConstant) {
    case NAVDATA_EVENT:
      initialState = {
        angles: [
          { id: "phi", data: [] },
          { id: "theta", data: [] },
          { id: "psi", data: [] },
        ],
        altitude: [{ id: "altitude", data: [] }],
        position: [
          { id: "x", data: [] },
          { id: "y", data: [] },
          { id: "z", data: [] },
        ],
        battery: 0,
      };
      break;
    case EKF_EVENT1:
      initialState = {
        position: [
          {
            id: "parrot 1",
            data: [],
          },
          {
            id: "parrot 2",
            data: [],
          },
        ],
      };
      break;

    default:
      break;
  }

  const [data, setData] = useState(initialState);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: type,
    });

    socketRef.current.on(eventConstant, (newData) => {
      var incomingData;
      switch (eventConstant) {
        case NAVDATA_EVENT:
          incomingData = { ...data };

          incomingData.angles[0].data.push({
            x: newData?.body?.time,
            y: newData?.body?.phi,
          });
          incomingData.angles[1].data.push({
            x: newData?.body?.time,
            y: newData?.body?.theta,
          });
          incomingData.angles[2].data.push({
            x: newData?.body?.time,
            y: newData?.body?.psi,
          });

          if (incomingData.angles[0].data.length > 25) {
            incomingData.angles[0].data.shift();
          }
          if (incomingData.angles[1].data.length > 25) {
            incomingData.angles[1].data.shift();
          }
          if (incomingData.angles[2].data.length > 25) {
            incomingData.angles[2].data.shift();
          }

          incomingData.altitude[0].data.push({
            x: newData?.body?.time,
            y: newData?.body?.altitude,
          });

          if (incomingData.altitude[0].data.length > 25) {
            incomingData.altitude[0].data.shift();
          }

          incomingData.battery = newData?.body?.batteryPercentage;

          break;
        case EKF_EVENT1:
          incomingData = { ...data };
          incomingData.position[0].data.push({
            x: newData.body.xPos,
            y: newData.body.yPos,
          });
          console.log("CHECK THIS", incomingData);

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
  return [data, sendData];
}

export default useSocket;
