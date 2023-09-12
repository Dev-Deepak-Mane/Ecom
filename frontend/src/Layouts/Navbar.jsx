import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Image,
  Input,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { HiOutlineShoppingCart } from "react-icons/hi";
import LogoImage from "../Assests/Images/Lelo_logo.svg";
import { Link } from "react-router-dom";
import { Navbar_Search_Modal } from "../Components/Navbar/Navbar_Search_Modal";
import Navbar_signUpBtn from "../Components/Navbar/Navbar_signUpBtn";
import { useSelector } from "react-redux";
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { cartItems } = useSelector((store) => store.cart);
  return (
    <Box position={"fixed"} top="0" zIndex={"100"} w="100%">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            <Box w="90px" color={"white"}>
              {colorMode === "light" ? (
                <Image src={LogoImage} />
              ) : (
                <Image
                  src={LogoImage}
                  bgColor={"white"}
                  borderRadius={"20px"}
                />
              )}
            </Box>
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          ml="20px"
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={[1, 6]}
        >
          {/* search button modal is here */}
          <Navbar_Search_Modal />
          <Button
            color="blue.500"
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={toggleColorMode}
            rounded={"full"}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button
            _hover={{ bg: "blue.500", color: "white" }}
            color="blue.500"
            rounded={"full"}
            as={Link}
            to="/cart"
          >
            <Icon as={HiOutlineShoppingCart} fontSize={"xl"}></Icon>
            <Text as={"span"}>{cartItems?.length || 0}</Text>
          </Button>
          <Navbar_signUpBtn />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                to={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) =>
  // : NavItem
  {
    return (
      <Link
        to={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("blue.500", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "blue.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) =>
  // : NavItem
  {
    const { isOpen, onToggle } = useDisclosure();

    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Link to={href ?? "#"}>
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              {label}
            </Text>
          </Link>

          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: "0!important" }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align={"start"}
          >
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };

// interface NavItem {
//   label: string;
//   subLabel?: string;
//   children?: Array<NavItem>;
//   href?: string;
// }

const NAV_ITEMS =
  //: Array<NavItem>
  [
    {
      label: "Products",
      href: "products",
    },
    {
      label: "Sub-Produts",
      children: [
        {
          label: "Electronics",
          subLabel: "Find best electronics produts here",
          href: "http://localhost:3000/products?keyword=&resultPerPage=2&page=1&price%5Bgte%5D=0&price%5Blte%5D=30000&category=electronics&order=&ratings%5Bgte%5D=0",
        },
        {
          label: "Toy",
          subLabel: "Children Special offers",
          href: "http://localhost:3000/products?keyword=&resultPerPage=5&page=1&price%5Bgte%5D=0&price%5Blte%5D=30000&category=toy&order=&ratings%5Bgte%5D=0",
        },
        {
          label: "Fashion",
          subLabel: "select your Style",
          href: "http://localhost:3000/products?keyword=&resultPerPage=1&page=1&price%5Bgte%5D=0&price%5Blte%5D=30000&category=cloth&order=&ratings%5Bgte%5D=0",
        },
        {
          label: "Education",
          subLabel: "Book changes your future",
          href: "http://localhost:3000/products?keyword=&resultPerPage=0&page=1&price%5Bgte%5D=0&price%5Blte%5D=30000&category=education&order=&ratings%5Bgte%5D=0",
        },
        {
          label: "Accessories",
          subLabel: "small things big matters",
          href: "http://localhost:3000/products?keyword=&resultPerPage=0&page=1&price%5Bgte%5D=0&price%5Blte%5D=30000&category=accessories&order=&ratings%5Bgte%5D=0",
        },
      ],
    },

    {
      label: "About",
      href: "about",
    },
  ];
