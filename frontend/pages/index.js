
import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import QuadMonitor from "./QuadMonitor";
import DataAnalysis from "./DataAnalysis";
import Simulator from "./components/Simulator";
import Implementation from "./components/Implementation";

function Menu({ setSlide }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box color="white" p="1" bgColor="gray.800">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Menu"
          fontSize="20px"
          onClick={onOpen}
          icon={<HamburgerIcon />}
        />
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bgColor="darkslategrey" textColor="white">
          <DrawerHeader borderBottomWidth="1px">
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Menu"
              fontSize="20px"
              onClick={onClose}
              icon={<CloseIcon />}
              marginRight="2"
            />
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Box
              as="button"
              bg="grey"
              w="100%"
              p={2}
              color="white"
              onClick={() => setSlide(0)}
            >
              Controller
            </Box>
            <Box
              as="button"
              bg="tomato"
              w="100%"
              p={2}
              color="white"
              onClick={() => setSlide(1)}
            >
              Data
            </Box>
            <Box
              as="button"
              bg="Background"
              w="100%"
              p={2}
              color="white"
              onClick={() => setSlide(2)}
            >
              Simulator
            </Box>
            <Box
              as="button"
              bg="powderblue"
              w="100%"
              p={2}
              color="white"
              onClick={() => setSlide(3)}
            >
              Implementation Data
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(2);

  return (
    <div>
      <Head>
        <title>React Parrot AR2 SWARM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu setSlide={setSlide} />
      {slide === 0 ? (
        <QuadMonitor />
      ) : slide == 1 ? (
        <DataAnalysis />
      ) : slide == 2 ? (
        <Simulator />
      ) : (
        <Implementation/>
      )}
    </div>
  );
}
