import {
  EditIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Text,
  Box,
  Icon,
  createStandaloneToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserDetails,
  UserUpdate,
  getProfile,
  updatePassword,
  updateProfile,
} from "../../Redux/Authentication/action";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../Redux/Authentication/actionTypes";

export function ChangePasswordModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [oldPassword, SetOldPassword] = useState("");
  const handleOldPasswordChange = (event) => SetOldPassword(event.target.value);

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, SetNewPassword] = useState("");
  const handlePasswordChange = (event) => SetNewPassword(event.target.value);
  const [showPasswords, setShowPasswords] = useState(false);
  const [confirmPassword, SetConfirmPassword] = useState("");
  const handlePasswordChange2 = (event) =>
    SetConfirmPassword(event.target.value);

  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();

  const { isUpdated } = useSelector(UserUpdate);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    // handle form submission
    const myformData = new FormData();

    myformData.set("oldPassword", oldPassword);
    myformData.set("newPassword", newPassword);
    myformData.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(toast, myformData));
  };

  useEffect(() => {
    if (isUpdated) {
      setTimeout(() => {
        onClose();
        dispatch({ type: UPDATE_PASSWORD_RESET });
      }, 2000);
    }
  }, [dispatch, isUpdated]);

  return (
    <>
      <Button
        rightIcon={<EditIcon />}
        colorScheme="blue"
        variant="outline"
        onClick={onOpen}
      >
        Change Password
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form action="" onSubmit={handleUpdateProfile}>
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack p="10px" spacing={4} w={"full"} maxW={"md"} rounded={"xl"}>
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Update Password
                </Heading>

                <FormControl id="oldPassword" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      onChange={handleOldPasswordChange}
                      type={showOldPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowOldPassword(
                            (showOldPassword) => !showOldPassword
                          )
                        }
                      >
                        {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      onChange={handlePasswordChange}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl id="confirmpassword" isRequired>
                  <FormLabel>confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      onChange={handlePasswordChange2}
                      type={showPasswords ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPasswords((showPasswords) => !showPasswords)
                        }
                      >
                        {showPasswords ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter gap={"30px"}>
              <Button
                bg={"gray.300"}
                color={"black"}
                onClick={onClose}
                w="full"
                _hover={{
                  bg: "gray.400",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                bg={"blue.500"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.600",
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
