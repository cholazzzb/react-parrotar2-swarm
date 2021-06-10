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

// Data for modelling attitude conroller
import processedData from "../../backend/Data/1per15/target1/processedData.js";

// EKF Data when trying takeoff -> zero -> forward(0.5 ... , 1.5)
import EKFData_50cmForwardAPI from "../../backend/Experiments/Data/Ex4/EKFData_50cmForwardAPI";
import EKFData_100cmForwardAPI from "../../backend/Experiments/Data/Ex4/EKFData_100cmForwardAPI";
import EKFData_150cmForwardAPI from "../../backend/Experiments/Data/Ex4/EKFData_150cmForwardAPI";

const NAVDATA_EVENT = "NAVDATA_EVENT";
const COMMAND_EVENT = "COMMAND_EVENT";
const EKF_EVENT1 = "EKF_EVENT1";
const EKF_EVENT2 = "EKF_EVENT2";

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [status, setStatus] = useState("INITIAL STATUS");
  const [commandData, sendCommandData] = useSocket("COMMAND", COMMAND_EVENT);
  const [navData, setNavData] = useSocket("NAVDATA", NAVDATA_EVENT);
  const [ekfData1, setEkfData1] = useSocket("EKFDATA1", EKF_EVENT1);
  const [ekfData2, setEkfData2] = useSocket("EKFDATA2", EKF_EVENT2);

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
      ) : (
        <>
          <Button color="green" onClick={() => setSlide(0)}>
            Change Slide
          </Button>

          {/* <Grid
            bgColor="gray.600"
            p="3"
            h="1200px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
          > */}
          {/* Data for modelling attitude controller */}
          {/* <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={processedData.phi} yLabel="Phi" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={processedData.phiAverage} yLabel="Phi Average" />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart data={processedData.theta} yLabel="Theta" />
            </GridItem> */}

          {/* </Grid> */}
          <Grid
            bgColor="gray.600"
            p="3"
            h="1200px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(1, 1fr)"
            gap={4}
          >
            {/* Data from EKF API forward (0.5 , ..., 1.5) */}
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart
                data={EKFData_50cmForwardAPI}
                yLabel="forwardAPI(50cm)"
              />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart
                data={EKFData_100cmForwardAPI}
                yLabel="forwardAPI(100cm)"
              />
            </GridItem>
            <GridItem colSpan={2} bg="papayawhip" color="black">
              <QuadrotorChart
                data={EKFData_150cmForwardAPI}
                yLabel="forwardAPI(150cm)"
              />
            </GridItem>
          </Grid>
        </>
      )}
    </div>
  );
}
