import { Box, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";

import {
  Button,
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
} from "@chakra-ui/react";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { BasicUsage } from "../Components/Authentication/Modal";
import { UserDetails } from "../Redux/Authentication/action";
import Loader from "../Layouts/Loader";
import { ChangePasswordModel } from "../Components/Authentication/ChangePasswordModel";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuth, loading } = useSelector(UserDetails);
  console.log(user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box padding="70px">
          {/* <UserProfileEdit /> */}

          <Flex maxW={"100vw"} align={"center"} justify={"center"}>
            <VStack
              spacing={5}
              w={"full"}
              maxW={"md"}
              // bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
              textAlign="center"
              minW={["300px", "auto"]}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile
              </Heading>

              <Avatar
                size="xl"
                src={user.avatar?.url || "https://bit.ly/sage-adebayo"}
              ></Avatar>
              <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                {user?.name}
              </Heading>
              <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                {user?.email}
              </Heading>
              <Text>
                Joined On : <span>{user.createdAt?.substring(0, 10)}</span>
              </Text>

              <Flex gap={"20px"}>
                <Button
                  rightIcon={<FcViewDetails />}
                  colorScheme="blue"
                  variant="outline"
                  as={Link}
                  to={"/orders"}
                >
                  My Orders
                </Button>
                <Spacer />
                <BasicUsage />
              </Flex>
              <ChangePasswordModel />
            </VStack>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default UserProfile;
