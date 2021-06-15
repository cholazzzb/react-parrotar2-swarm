import React from "react";
import {Grid, GridItem} from "@chakra-ui/react"
import QuadrotorChart from "./components/QuadrotorChart"

// EKF Data when trying takeoff -> zero -> forward(0.5 ... , 1.5)
import EKFData_50cmForwardAPI from "../../backend/Experiments/Data/Ex4/EKFData_50cmForwardAPI";
import EKFData_100cmForwardAPI from "../../backend/Experiments/Data/Ex4/EKFData_100cmForwardAPI";
import EKFData_150cmForwardAPI from "../../backend/Experiments/Data/Ex4/EKFData_150cmForwardAPI";

// Data for modelling attitude conroller
import processedData from "../../backend/Data/1per15/target1/processedData.js";


function DataAnalysis() {
  return (
    <>
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
  );
}

export default DataAnalysis;
