import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

function DroneState(props) {
  console.log('props', props)
  return (
    <Box px="6" py="4" borderWidth="2px" borderRadius="lg">
      <Heading pb="4">EKF</Heading>
      <Text>x : {props?.data?.xPos}</Text>
      <Text>y : {props?.data?.yPos}</Text>
      <Text>z : {props?.data?.zPos}</Text>
    </Box>
  );
}

export default DroneState;
