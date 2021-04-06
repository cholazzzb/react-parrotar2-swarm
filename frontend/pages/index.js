import { useState, useEffect } from "react";
import useSocket from "../useSocket";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Center, Grid, GridItem } from "@chakra-ui/react";

import DroneState from "./components/DroneState";
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
      {
        x: 35,
        y: 97,
      },
      {
        x: 55,
        y: 43,
      },
      {
        x: 38,
        y: 2,
      },
      {
        x: 21,
        y: 42,
      },
      {
        x: 94,
        y: 20,
      },
      {
        x: 58,
        y: 118,
      },
      {
        x: 62,
        y: 51,
      },
      {
        x: 17,
        y: 51,
      },
      {
        x: 16,
        y: 116,
      },
      {
        x: 22,
        y: 27,
      },
      {
        x: 41,
        y: 116,
      },
      {
        x: 8,
        y: 60,
      },
      {
        x: 24,
        y: 118,
      },
      {
        x: 79,
        y: 68,
      },
      {
        x: 53,
        y: 112,
      },
      {
        x: 11,
        y: 24,
      },
      {
        x: 48,
        y: 73,
      },
      {
        x: 0,
        y: 42,
      },
      {
        x: 59,
        y: 67,
      },
      {
        x: 78,
        y: 82,
      },
      {
        x: 23,
        y: 5,
      },
      {
        x: 62,
        y: 103,
      },
      {
        x: 88,
        y: 26,
      },
      {
        x: 7,
        y: 37,
      },
      {
        x: 97,
        y: 43,
      },
      {
        x: 61,
        y: 112,
      },
      {
        x: 94,
        y: 9,
      },
      {
        x: 22,
        y: 57,
      },
      {
        x: 4,
        y: 98,
      },
      {
        x: 21,
        y: 52,
      },
      {
        x: 19,
        y: 24,
      },
      {
        x: 7,
        y: 15,
      },
      {
        x: 75,
        y: 24,
      },
      {
        x: 67,
        y: 31,
      },
      {
        x: 74,
        y: 77,
      },
      {
        x: 49,
        y: 103,
      },
      {
        x: 64,
        y: 97,
      },
      {
        x: 44,
        y: 97,
      },
      {
        x: 85,
        y: 28,
      },
      {
        x: 24,
        y: 16,
      },
      {
        x: 57,
        y: 87,
      },
      {
        x: 55,
        y: 111,
      },
      {
        x: 74,
        y: 21,
      },
      {
        x: 4,
        y: 27,
      },
      {
        x: 68,
        y: 95,
      },
      {
        x: 5,
        y: 33,
      },
      {
        x: 35,
        y: 3,
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
      {
        x: 58,
        y: 62,
      },
      {
        x: 19,
        y: 37,
      },
      {
        x: 36,
        y: 78,
      },
      {
        x: 9,
        y: 116,
      },
      {
        x: 74,
        y: 46,
      },
      {
        x: 67,
        y: 23,
      },
      {
        x: 52,
        y: 115,
      },
      {
        x: 29,
        y: 27,
      },
      {
        x: 20,
        y: 13,
      },
      {
        x: 55,
        y: 32,
      },
      {
        x: 88,
        y: 72,
      },
      {
        x: 50,
        y: 46,
      },
      {
        x: 56,
        y: 5,
      },
      {
        x: 23,
        y: 96,
      },
      {
        x: 27,
        y: 48,
      },
      {
        x: 24,
        y: 22,
      },
      {
        x: 84,
        y: 44,
      },
      {
        x: 12,
        y: 19,
      },
      {
        x: 16,
        y: 114,
      },
      {
        x: 34,
        y: 78,
      },
      {
        x: 33,
        y: 23,
      },
      {
        x: 44,
        y: 90,
      },
      {
        x: 33,
        y: 39,
      },
      {
        x: 94,
        y: 98,
      },
      {
        x: 84,
        y: 90,
      },
      {
        x: 35,
        y: 22,
      },
      {
        x: 33,
        y: 71,
      },
      {
        x: 64,
        y: 42,
      },
      {
        x: 56,
        y: 52,
      },
      {
        x: 96,
        y: 36,
      },
      {
        x: 48,
        y: 70,
      },
      {
        x: 18,
        y: 27,
      },
      {
        x: 83,
        y: 29,
      },
      {
        x: 46,
        y: 114,
      },
      {
        x: 65,
        y: 44,
      },
      {
        x: 25,
        y: 81,
      },
      {
        x: 97,
        y: 106,
      },
      {
        x: 1,
        y: 33,
      },
      {
        x: 59,
        y: 86,
      },
      {
        x: 62,
        y: 8,
      },
      {
        x: 99,
        y: 80,
      },
      {
        x: 71,
        y: 43,
      },
      {
        x: 26,
        y: 14,
      },
      {
        x: 82,
        y: 90,
      },
      {
        x: 55,
        y: 51,
      },
      {
        x: 93,
        y: 100,
      },
      {
        x: 21,
        y: 51,
      },
    ],
  },
];

const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";

export default function Home() {
  const [status, setStatus] = useState("INITIAL STATUS");
  const [commandData, sendCommandData] = useSocket("COMMAND", COMMAND_EVENT);
  const [navData, setNavData] = useSocket("NAVDATA", NAVDATA_EVENT);

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
          <Controller sendCommandData={sendCommandData} />
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip">
          <QuadrotorChart data={navData.angles} yLabel="degree"/>
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" color="black">
          <QuadrotorChart data={navData.altitude} yLabel="meter(m)"/>
        </GridItem>
      </Grid>
    </div>
  );
}
