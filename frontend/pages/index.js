import { useState, useEffect } from "react";
import useSocket from "../useSocket";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Center, Grid, GridItem } from "@chakra-ui/react";

import DroneState from "./components/DroneState";
import EKFState from "./components/EKFState";
import Controller from "./components/Controller";
import QuadrotorChart from "./components/QuadrotorChart";
import QuadrotorPosition from "./components/QuadrotorPosition";

const tempPosition = [
  {
    id: "parrot 1",
    data: [
      {
        x: 57,
        y: 101,
      },
      {
        x: 72,
        y: 46,
      },
      {
        x: 10,
        y: 35,
      },
    ],
  },
  {
    id: "parrot 2",
    data: [
      {
        x: 49,
        y: 33,
      },
      {
        x: 16,
        y: 39,
      },
      {
        x: 32,
        y: 32,
      },
    ],
  },
];

const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT = "EKF_EVENT";

export default function Home() {
  const [status, setStatus] = useState("INITIAL STATUS");
  const [commandData, sendCommandData] = useSocket("COMMAND", COMMAND_EVENT);
  const [navData, setNavData] = useSocket("NAVDATA", NAVDATA_EVENT);
  const [ekfData, setEkfData] = useSocket("EKFDATA", EKF_EVENT);

  return (
    <div>
      <Head>
        <title>React Parrot AR2 SWARM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="60px" color="white">
        STATUS : {status}
      </Center>
      <Grid
        bgColor="gray.600"
        p="3"
        h="600px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          bg="papayawhip"
          borderWidth="2px"
          borderRadius="lg"
          colSpan={4}
        >
          <QuadrotorPosition data={ekfData.position} />
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <DroneState data={navData} />
          <EKFState data={ekfData} />
          <Controller sendCommandData={sendCommandData} />
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip">
          <QuadrotorChart data={navData.angles} yLabel="degree" />
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" color="black">
          <QuadrotorChart data={navData.altitude} yLabel="meter(m)" />
        </GridItem>
      </Grid>
    </div>
  );
}
