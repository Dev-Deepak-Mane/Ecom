import React, { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useColorMode,
  Input,
  useColorModeValue,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { redirect, useNavigate } from "react-router-dom";

export function Navbar_Search_Modal() {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const { colorMode } = useColorMode();
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query?.trim()) {
      navigate(`/products/${query}`);
    } else {
      navigate(`/products`);
    }
    setQuery("");
  };
  return (
    <>
      <Button
        ml="4"
        color="blue.500"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
        // bg={"blue.400"}
        rounded={"full"}
        _hover={{ bg: "blue.500", color: "white" }}
        // _focus={{ bg: "blue.500" }}
      >
        <Icon as={Search2Icon} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalBody>
            <form action="" onSubmit={handleSearch}>
              <Flex gap="30px">
                <Input
                  type={"text"}
                  placeholder={"Search Product"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  bg={useColorModeValue("gray.100", "gray.600")}
                  rounded={"full"}
                  border={0}
                  _focus={{
                    bg: useColorModeValue("gray.200", "gray.800"),
                    outline: "none",
                  }}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <Button
                  type="submit"
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  flex={"1 0 auto"}
                  _hover={{ bg: "blue.500" }}
                  _focus={{ bg: "blue.500" }}
                  onClick={onClose}
                >
                  Search
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
