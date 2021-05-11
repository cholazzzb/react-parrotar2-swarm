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

const tempData = [
  {
    id: "psi",
    color: "hsl(73, 70%, 50%)",
    data: [
      {
        x: 1,
        y: 234,
      },
      {
        x: 2,
        y: 221,
      },
      {
        x: 3,
        y: 118,
      },
      {
        x: 4,
        y: 228,
      },
      {
        x: 5,
        y: 117,
      },
      {
        x: 6,
        y: 297,
      },
      {
        x: 7,
        y: 208,
      },
      {
        x: 8,
        y: 83,
      },
      {
        x: 9,
        y: 140,
      },
      {
        x: 10,
        y: 94,
      },
      {
        x: 11,
        y: 148,
      },
      {
        x: 12,
        y: 9,
      },
    ],
  },
  {
    id: "theta",
    color: "hsl(292, 70%, 50%)",
    data: [
      {
        x: 1,
        y: 57,
      },
      {
        x: 2,
        y: 195,
      },
      {
        x: 3,
        y: 78,
      },
      {
        x: 4,
        y: 277,
      },
      {
        x: 5,
        y: 165,
      },
      {
        x: 6,
        y: 97,
      },
      {
        x: 7,
        y: 70,
      },
      {
        x: 8,
        y: 71,
      },
      {
        x: 9,
        y: 237,
      },
      {
        x: 10,
        y: 131,
      },
      {
        x: 11,
        y: 221,
      },
      {
        x: 12,
        y: 33,
      },
    ],
  },
  {
    id: "phi",
    color: "hsl(67, 70%, 50%)",
    data: [
      {
        x: 1,
        y: 286,
      },
      {
        x: 2,
        y: 40,
      },
      {
        x: 3,
        y: 157,
      },
      {
        x: 4,
        y: 118,
      },
      {
        x: 5,
        y: 130,
      },
      {
        x: 6,
        y: 281,
      },
      {
        x: 7,
        y: 38,
      },
      {
        x: 8,
        y: 222,
      },
      {
        x: 9,
        y: 237,
      },
      {
        x: 10,
        y: 189,
      },
      {
        x: 11,
        y: 1,
      },
      {
        x: 12,
        y: 0,
      },
    ],
  },
];

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
          <QuadrotorPosition data={tempPosition} />
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
