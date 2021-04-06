import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

function DroneState(props) {
  console.log('props', props)
  return (
    <>
    <Box px="6" py="4" borderWidth="2px" borderRadius="lg">
      <Heading pb="4">Drone State</Heading>

      <Text>Phi : {props?.data?.angles[0]?.data.slice(-1)[0]?.y}</Text>
      <Text>Theta : {props?.data?.angles[1]?.data.slice(-1)[0]?.y}</Text>
      <Text>Psi : {props?.data?.angles[2]?.data.slice(-1)[0]?.y}</Text>
      <Text>Altitude : {props?.data?.altitude[0]?.data.slice(-1)[0]?.y}</Text>
      <Text>Battery : {props.data?.battery}%</Text>
      
    </Box>
    <Box px="6" py="4" borderWidth="2px" borderRadius="lg">
      <Heading pb="4">GPS</Heading>
      <Text>x : </Text>
      <Text>y : </Text>
      <Text>z : </Text>
    </Box>
    </>
  );
}

export default DroneState;
