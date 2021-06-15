import React, { useState } from "react";
import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import useSocket from "../../useSocket";
import QuadrotorPosition from "./QuadrotorPosition.js";
import InputNumber from "./InputNumber.js";

const SIMULATION_EVENT = "SIMULATION_EVENT";

function Simulator() {
  const [kob1, setKob1] = useState(0);
  const [start, setStart] = useState(false);
  const [quadState, setQuadState] = useSocket("SIMULATION", SIMULATION_EVENT);
  /**
   * NOTE : initialState in useSocket !!!
   * 
   * 
   * 
   */

  return (
    <Grid
      bgColor="gray.600"
      p="3"
      h="1200px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={2} bg="papayawhip" color="black">
        <QuadrotorPosition data={quadState} />
      </GridItem>
      <GridItem bg="orange.600" color="black">
        1. Altitude Graph 2. Yaw Graph
      </GridItem>
      <GridItem color="black">
        <Flex>
          <InputNumber label="kob1" value={kob1} onChange={setKob1} max={50} />
        </Flex>
        <Flex>
          <InputNumber label="kob2" value={kob1} onChange={setKob1} max={50} />
        </Flex>
        <Flex>
          <InputNumber label="kob2" value={kob1} onChange={setKob1} max={50} />
        </Flex>
        <Flex>
          <InputNumber label="kob2" value={kob1} onChange={setKob1} max={50} />
        </Flex>
        {start ? (
          <Button onClick={() => setStart(false)}>Pause Simulation</Button>
        ) : (
          <Button onClick={() => setStart(true)}>Run Simulation</Button>
        )}
      </GridItem>
    </Grid>
  );
}

export default Simulator;
