import { useState, useEffect } from "react";
import useSocket from "../useSocket";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, Center, Grid, GridItem } from "@chakra-ui/react";

import DroneState from "./components/DroneState";
import EKFState from "./components/EKFState";
import Controller from "./components/Controller";
import QuadrotorChart from "./components/QuadrotorChart";
import QuadrotorPosition from "./components/QuadrotorPosition";

import DataProcess from "../../backend/DataProcess";

const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT = "EKF_EVENT";

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [status, setStatus] = useState("INITIAL STATUS");
  const [commandData, sendCommandData] = useSocket("COMMAND", COMMAND_EVENT);
  const [navData, setNavData] = useSocket("NAVDATA", NAVDATA_EVENT);
  const [ekfData, setEkfData] = useSocket("EKFDATA", EKF_EVENT);

  return (
    <div>
      {slide === 0 ? (
        <>
          <Head>
            <title>React Parrot AR2 SWARM</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Center h="60px" color="white" bgColor="gray.800">
            STATUS : {status}
            <Button color="green" onClick={() => setSlide(1)}>
              Change Slide
            </Button>
          </Center>
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
              <QuadrotorPosition data={ekfData.position} />
            </GridItem>
            <GridItem rowSpan={2} colSpan={1}>
              <DroneState data={navData} />
              <EKFState data={ekfData} />
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
      ) : (
        <>
          <Button color="green" onClick={() => setSlide(0)}>
            Change Slide
          </Button>

          <Grid
            bgColor="gray.600"
            p="3"
            h="1200px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
          >
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={DataProcess.dataPhi} yLabel="Phi" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={DataProcess.dataPhiAverage} yLabel="Phi Average" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={DataProcess.dataTheta} yLabel="Theta" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={DataProcess.dataThetaAverage} yLabel="Theta Average" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={DataProcess.dataPsi} yLabel="Psi" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={DataProcess.dataPsiAverage} yLabel="Psi Average" />
            </GridItem>
          </Grid>
        </>
      )}
    </div>
  );
}
