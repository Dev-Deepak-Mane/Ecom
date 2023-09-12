import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserDetails,
  UserUpdate,
  getProfile,
  updateProfile,
} from "../../Redux/Authentication/action";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../Redux/Authentication/actionTypes";
import { useEffect } from "react";
export function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector(UserDetails);
  const { isUpdated } = useSelector(UserUpdate);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setImage] = useState(
    user.avatar?.url || "https://bit.ly/sage-adebayo"
  );

  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    // handle form submission
    const myformData = new FormData();

    myformData.set("name", name);
    myformData.set("email", email);
    myformData.set("file", avatar);

    dispatch(updateProfile(toast, myformData));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    //preview of image after selection on DOM
    reader.onload = (e) => {
      const preview = new Image();
      preview.src = e.target.result;
      preview.alt = "Preview";
      const previewContainer = document.getElementById("image-preview");
      previewContainer.innerHTML = "";
      previewContainer.appendChild(preview);
    };
  };
  useEffect(() => {
    if (isUpdated) {
      setTimeout(() => {
        dispatch(getProfile()).then(() => {
          onClose();
          dispatch({ type: UPDATE_PROFILE_RESET });
        });
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
        Edit Profile
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
                  User Profile
                </Heading>
                <FormControl>
                  <FormLabel>User Icon</FormLabel>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        id="image-preview"
                        size="xl"
                        src={avatar}
                      ></Avatar>
                    </Center>
                    <Center w="full">
                      <label htmlFor="fileInput">
                        <Box
                          as="span"
                          bg="white"
                          borderWidth="1px"
                          borderRadius="lg"
                          cursor="pointer"
                          px="6"
                          py="3"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          _hover={{ bg: "gray.100" }}
                        >
                          <FiUpload />
                          <Text ml="2">Change Avatar</Text>
                        </Box>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </Center>
                  </Stack>
                </FormControl>

                <FormControl id="userName" isRequired>
                  <FormLabel>User name</FormLabel>
                  <Input
                    onChange={handleNameChange}
                    defaultValue={user?.name}
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    onChange={handleEmailChange}
                    defaultValue={user?.email}
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                  />
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
