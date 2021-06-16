import React, { useState } from "react";
import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import useSocketSim from "../../useSocketSim";
import QuadrotorPosition from "./QuadrotorPosition.js";
import InputNumber from "./InputNumber.js";
import QuadrotorChart from "./QuadrotorChart";

const SIMULATION_EVENT = "SIMULATION_EVENT";
var initialState = {
  position: [
    { id: "parrot 1", data: [] },
    { id: "parrot 2", data: [] },
    { id: "target", data: [{ x: 10, y: 1 }] },
    { id: "obstacle 1", data: [{ x: 5, y: 2 }] },
  ],
  attitude: [
    { id: "parrot 1", data: [] },
    { id: "parrot 2", data: [] },
  ],
  yaw: [
    { id: "parrot 1", data: [] },
    { id: "parrot 2", data: [] },
  ],
};

function Simulator() {
  const [kob1, setKob1] = useState(0);
  const [start, setStart] = useState(false);
  const [quadState, sendCommand, setQuadState] = useSocketSim(
    initialState,
    "SIMULATION",
    SIMULATION_EVENT
  );

  return (
    <Grid
      bgColor="gray.600"
      p="3"
      h="1200px"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={2} bg="papayawhip" color="black">
        <QuadrotorPosition data={quadState.position} />
      </GridItem>
      <GridItem bg="papayawhip" color="black">
        <QuadrotorChart data={quadState.attitude} yLabel="z(m)" />
      </GridItem>
      <GridItem bg="papayawhip" color="black">
        <QuadrotorChart data={quadState.yaw} yLabel="yaw(degree)" />
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
        <Button
          onClick={() => {
            setQuadState(initialState);
          }}
        >
          Reset
        </Button>
      </GridItem>
    </Grid>
  );
}

export default Simulator;
