import React from "react";
import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  Button,
  Text,
  createStandaloneToast,
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserDetails, logoutUser } from "../../Redux/Authentication/action";
import { useDispatch, useSelector } from "react-redux";
const Navbar_signUpBtn = () => {
  const { user, isAuth } = useSelector(UserDetails);
  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const Navigate = useNavigate();
  //console.log(user);
  const handleLogout = () => {
    dispatch(logoutUser(toast));
  };
  return (
    <>
      {isAuth ? (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
            color="blue.500"
          >
            <Avatar
              size={"sm"}
              src={
                user.avatar?.url ||
                "https://avatars.dicebear.com/api/male/username.svg"
              }
            />
          </MenuButton>
          <MenuList alignItems={"center"}>
            <br />
            <Center>
              <Avatar
                size={"2xl"}
                src={
                  user.avatar?.url ||
                  "https://avatars.dicebear.com/api/male/username.svg"
                }
              />
            </Center>
            <br />
            <Center>
              <Text fontWeight="bold">{user?.name || "username"}</Text>
            </Center>
            <br />
            <MenuDivider />
            <Link to="/profile">
              <MenuItem>Profile</MenuItem>
            </Link>
            {user.role === "admin" ? (
              <Link to="/dashboard">
                <MenuItem>Dashboard</MenuItem>
              </Link>
            ) : (
              <></>
            )}
            <MenuDivider />
            <Link to="/orders">
              <MenuItem>Orders</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Link to="/login">
            <Button _hover={{ bg: "blue.500", color: "white" }}>Login</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default Navbar_signUpBtn;
