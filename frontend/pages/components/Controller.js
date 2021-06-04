import React from "react";
import { ButtonGroup, Button, Box } from "@chakra-ui/react";

function Controller(props) {
  return (
    <>
      <Box py="4">
        <ButtonGroup>
          <Button
            colorScheme="green"
            onClick={() => props.sendCommandData("COMMAND", "START")}
          >
            START
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => props.sendCommandData("COMMAND", "CALIBRATE")}
          >
            CALIBRATE
          </Button>
          <Button
            colorScheme="orange"
            variant="outline"
            onClick={() => props.sendCommandData("COMMAND", "MISSION")}
          >
            MISSION
          </Button>
        </ButtonGroup>
      </Box>

      <Box py="4">
        <ButtonGroup>
          <Button
            colorScheme="green"
            onClick={() => props.sendCommandData("COMMAND", "PHI")}
          >
            PHI
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => props.sendCommandData("COMMAND", "THETA")}
          >
            THETA
          </Button>
          <Button
            colorScheme="orange"
            variant="outline"
            onClick={() => props.sendCommandData("COMMAND", "PSI")}
          >
            PSI
          </Button>
        </ButtonGroup>
      </Box>

      <Box py="4">
        <ButtonGroup>
          <Button
            colorScheme="green"
            onClick={() => props.sendCommandData("COMMAND", "X1Y0")}
          >
            Go x1y0
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => props.sendCommandData("COMMAND", "X0Y1")}
          >
            Go x0y1
          </Button>

          <Button
            colorScheme="orange"
            variant="outline"
            onClick={() => props.sendCommandData("COMMAND", "X0Y0")}
          >
            Go x0y0
          </Button>
        </ButtonGroup>
      </Box>

      <Box py="4">
        <ButtonGroup>
          <Button
            colorScheme="green"
            onClick={() => props.sendCommandData("COMMAND", "TAKEOFF")}
          >
            TAKEOFF
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => props.sendCommandData("COMMAND", "LAND")}
          >
            LAND
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default Controller;
