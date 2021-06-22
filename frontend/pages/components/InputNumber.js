import React from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function InputNumber({ label, value, onChange, max }) {
  return (
    <Flex>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <NumberInput onChange={onChange} value={value} max={max}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Flex>
  );
}

export default InputNumber;
