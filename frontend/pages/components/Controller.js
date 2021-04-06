import React from "react";
import { ButtonGroup, Button, Box } from "@chakra-ui/react";

function Controller(props) {
  return (
    <>
      <Box py="4">
        <ButtonGroup>
          <Button
            colorScheme="green"
            onClick={() => props.sendCommandData("COMMAND", "CINNECT")}
          >
            Connect
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => props.sendCommandData("COMMAND", "TAKEOFF")}
          >
            TakeOff
          </Button>
          <Button
            colorScheme="orange"
            variant="outline"
            onClick={() => props.sendCommandData("COMMAND", "LAND")}
          >
            Land
          </Button>
        </ButtonGroup>
      </Box>
      <Box p="2" borderWidth="2px" borderRadius="lg">
        <Button my="2" colorScheme="purple" variant="solid">
          Move Forward 1m
        </Button>
        <Button my="2" colorScheme="purple" variant="solid">
          Move Backward 1m
        </Button>
        <Button my="2" colorScheme="purple" variant="solid">
          Move Left 1m
        </Button>
        <Button my="2" colorScheme="purple" variant="solid">
          Move Right 1m
        </Button>
      </Box>
    </>
  );
}

export default Controller;
