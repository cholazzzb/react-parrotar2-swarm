import React from "react";
import useSocket from "../useSocket";
import { Grid, GridItem } from "@chakra-ui/react";

import DroneState from "./components/DroneState";
import EKFState from "./components/EKFState";
import Controller from "./components/Controller";
import QuadrotorChart from "./components/QuadrotorChart";

const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT1 = "EKF_EVENT1";
const EKF_EVENT2 = "EKF_EVENT2";

function QuadMonitor() {
  const [commandData, sendCommandData] = useSocket("COMMAND", COMMAND_EVENT);
  const [navData, setNavData] = useSocket("NAVDATA", NAVDATA_EVENT);
  const [ekfData1, setEkfData1] = useSocket("EKFDATA1", EKF_EVENT1);
  const [ekfData2, setEkfData2] = useSocket("EKFDATA2", EKF_EVENT2);

  return (
    <>
      <Grid
        bgColor="gray.600"
        p="3"
        h="1200px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          bg="papayawhip"
          borderWidth="2px"
          borderRadius="lg"
          colSpan={4}
        >
          {/* <QuadrotorPosition data={ekfData1.position} /> */}
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <DroneState data={navData} />
          <EKFState data={ekfData1} />
          <Controller sendCommandData={sendCommandData} />
        </GridItem>
        <GridItem colSpan={4} bg="papayawhip">
          <QuadrotorChart data={navData.angles} yLabel="degree" />
        </GridItem>
        <GridItem colSpan={4} bg="papayawhip" color="black">
          <QuadrotorChart data={navData.altitude} yLabel="meter(m)" />
        </GridItem>
      </Grid>
    </>
  );
}

export default QuadMonitor;
