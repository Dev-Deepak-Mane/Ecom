import React, { useRef, useState } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Icon,
  Stack,
  Link,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import Loader from "../Layouts/Loader";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  createStandaloneToast,
} from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Text } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails, login, register } from "../Redux/Authentication/action";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginSignup = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, isAuth } = useSelector(UserDetails);
  // console.log(user, loading, isAuth);
  const Navigate = useNavigate();
  const location = useLocation();
  const { toast } = createStandaloneToast();
  const loginFormRef = useRef("");
  /// login fun

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginFormRef.current[0].value === "" &&
      loginFormRef.current[1].value === ""
    ) {
      return;
    }

    dispatch(
      login(toast, loginFormRef.current[0].value, loginFormRef.current[1].value)
    );
  };
  useEffect(() => {
    if (isAuth) {
      const { state } = location;
      if (state && state.from) {
        Navigate(state.from);
      } else {
        Navigate("/");
      }
    }
  }, [isAuth, location, Navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Flex
          minHeight="90vh"
          width="90%"
          align="center"
          m="auto"
          flexDirection="column"
        >
          <Flex
            width="full"
            align="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Box
              onClick={() => setShowLogin(true)}
              cursor="pointer"
              p={4}
              bg={showLogin ? "blue.200" : "gray.200"}
              color={showLogin ? "white" : "black"}
              fontWeight="bold"
              width="50%"
              textAlign="center"
            >
              Login
            </Box>
            <Box
              onClick={() => setShowLogin(false)}
              cursor="pointer"
              p={4}
              bg={!showLogin ? "blue.200" : "gray.200"}
              color={!showLogin ? "white" : "black"}
              fontWeight="bold"
              width="50%"
              textAlign="center"
            >
              Signup
            </Box>
          </Flex>
          <AnimatePresence mode="wait">
            {showLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -500 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 500 }}
                transition={{ duration: 0.5 }}
              >
                <Box pt="20%" maxWidth="500px" minW={["s", "md"]}>
                  <Heading mb={6}>Log in to your account</Heading>
                  <form ref={loginFormRef} onSubmit={handleLogin}>
                    <FormControl id="username" mb={4} isRequired>
                      <FormLabel>Username</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input type={showPassword ? "text" : "password"} />
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
                    <Stack
                      p="3"
                      direction={{ base: "column", sm: "row" }}
                      justifyContent="end"
                    >
                      <Link color={"blue.500"}>Forgot password?</Link>
                    </Stack>
                    <Button
                      type="submit"
                      isDisabled={isAuth}
                      colorScheme="blue"
                      mt={5}
                      w="full"
                    >
                      Login
                    </Button>
                  </form>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 500 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -500 }}
                transition={{ duration: 0.5 }}
              >
                <RegistrationForm />
              </motion.div>
            )}
          </AnimatePresence>
        </Flex>
      )}
    </>
  );
};

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setImage] = useState(null);
  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

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
      preview.maxWidth = "200px";
      const previewContainer = document.getElementById("image-preview");
      previewContainer.innerHTML = "";
      previewContainer.innerText = "Don't like feel free to choose again";
      previewContainer.appendChild(preview);
    };
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // handle form submission
    const myformData = new FormData();

    myformData.set("name", name);
    myformData.set("email", email);
    myformData.set("password", password);
    myformData.set("file", avatar);

    dispatch(register(toast, myformData));
  };

  return (
    <Box
      minW={["s", "md", "xl"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      mt={10}
    >
      <Heading as="h2" size="lg" mb={4}>
        Register
      </Heading>
      <Text mb={4}>Create an account to access exclusive features.</Text>
      <form onSubmit={handleRegister}>
        <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl
          borderWidth="1px"
          borderStyle="dashed"
          borderColor="gray.300"
          borderRadius="md"
          m="20px 0 20px 0"
          textAlign="center"
        >
          <FormLabel htmlFor="image-upload" p="6" cursor={"pointer"}>
            Choose an image file
          </FormLabel>
          <Input
            onChange={handleImageChange}
            type="file"
            id="image-upload"
            accept="image/*"
            display="none"
          />
          {avatar && (
            <Box mt="4" id="image-preview" w="160px" m="auto">
              {/* preview image will be added here */}
            </Box>
          )}
        </FormControl>

        <Button colorScheme="blue" type="submit" w="full">
          Register
        </Button>
      </form>
    </Box>
  );
}
export default LoginSignup;
