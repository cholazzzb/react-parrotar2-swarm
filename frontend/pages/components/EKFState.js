import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

function DroneState(props) {
  return (
    <Box px="6" py="4" borderWidth="2px" borderRadius="lg">
      <Heading pb="4">EKF</Heading>
      <Text>Parrot 1</Text>
      {/* <Text>x : {props?.position[0]?.data[-1]?.xPos}</Text>
      <Text>y : {props?.position[0]?.data[-1]?.xPos}</Text> */}
      <Text>Parrot 2</Text>
      {/* <Text>x : {props?.position[1]?.data[-1]?.xPos}</Text>
      <Text>y : {props?.position[1]?.data[-1]?.yPos}</Text> */}
    </Box>
  );
}

export default DroneState;
