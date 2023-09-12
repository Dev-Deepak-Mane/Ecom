import { AddIcon, CloseIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputRightElement,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import {
  Box,
  Textarea,
  Select,
  createStandaloneToast,
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

import { FaUserEdit } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { RiShieldUserFill } from "react-icons/ri";

import { useDispatch } from "react-redux";

import React from "react";
import {
  getAdminAllUsers,
  updateAdminUserRole,
} from "../../Redux/Admin/Users/action";

export default function EditUserModel({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  const dispatch = useDispatch();

  const { toast } = createStandaloneToast();
  const categories = ["Admin", "User"];
  const handleUpdate = (e) => {
    e.preventDefault();
    const createData = new FormData();
    createData.append("name", name);
    createData.append("email", email);

    createData.append("role", role);
    console.log(name, email, role);
    // setLoading(true);
    dispatch(updateAdminUserRole(toast, user?._id, createData)).then(() => {
      setLoading(false);
      dispatch(getAdminAllUsers(toast));
      onClose();
    });
  };

  return (
    <>
      <IconButton
        aria-label="Edit"
        onClick={onOpen}
        icon={<EditIcon />}
        size="lg"
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <form onSubmit={handleUpdate}>
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>User Name</FormLabel>

                  <InputGroup>
                    <InputLeftAddon
                      children={
                        <Icon color={"blue.500"} as={FaUserEdit}></Icon>
                      }
                    />
                    <Input
                      placeholder="Enter User Name"
                      defaultValue={user?.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>User Email</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      children={
                        <Icon color={"blue.500"} as={AiOutlineMail}></Icon>
                      }
                    />
                    <Input
                      placeholder="Enter User Email"
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={user?.email}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel>Change Role</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      children={
                        <Icon color={"blue.500"} as={RiShieldUserFill}></Icon>
                      }
                    />
                    <Select
                      placeholder="Select Role"
                      onChange={(e) => setRole(e.target.value)}
                      defaultValue={user?.role}
                    >
                      {categories?.map((each) => (
                        <option key={each} value={each.toLocaleLowerCase()}>
                          {each}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                loadingText="Updating"
                colorScheme="blue"
                mr={3}
                type={"submit"}
              >
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
