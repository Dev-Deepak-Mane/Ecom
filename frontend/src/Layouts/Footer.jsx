// import { ReactNode } from "react";
// import {
//   Box,
//   Container,
//   Stack,
//   SimpleGrid,
//   Text,
//   Link,
//   VisuallyHidden,
//   chakra,
//   useColorModeValue,
//   Image,
// } from "@chakra-ui/react";
// import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

// import AppStoreBadge from "../Assests/Images/apple_badge_logo.svg";
// import PlayStoreBadge from "../Assests/Images/google_play_badge_logo.svg";

// const ListHeader = ({ children }) => {
//   return (
//     <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
//       {children}
//     </Text>
//   );
// };

// const SocialButton = ({ children, label, href }) => {
//   return (
//     <chakra.button
//       bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
//       rounded={"full"}
//       w={8}
//       h={8}
//       cursor={"pointer"}
//       as={"a"}
//       href={href}
//       display={"inline-flex"}
//       alignItems={"center"}
//       justifyContent={"center"}
//       transition={"background 0.3s ease"}
//       _hover={{
//         bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
//       }}
//     >
//       <VisuallyHidden>{label}</VisuallyHidden>
//       {children}
//     </chakra.button>
//   );
// };

// export default function Footer() {
//   return (
//     <Box
//       bg={useColorModeValue("gray.50", "gray.900")}
//       color={useColorModeValue("gray.700", "gray.200")}
//     >
//       <Container as={Stack} maxW={"6xl"} py={10}>
//         <SimpleGrid
//           columns={{ base: 1, sm: 2, md: 4 }}
//           spacing={8}
//           alignItems={"center"}
//         >
//           <Stack align={"flex-start"}>
//             <ListHeader>Company</ListHeader>
//             <Link href={"#"}>About Us</Link>
//             <Link href={"#"}>Blog</Link>
//             <Link href={"#"}>Careers</Link>
//             <Link href={"#"}>Contact Us</Link>
//           </Stack>

//           <Stack align={"flex-start"}>
//             <ListHeader>Support</ListHeader>
//             <Link href={"#"}>Help Center</Link>
//             <Link href={"#"}>Safety Center</Link>
//             <Link href={"#"}>Community Guidelines</Link>
//           </Stack>

//           <Stack align={"flex-start"}>
//             <ListHeader>Legal</ListHeader>
//             <Link href={"#"}>Cookies Policy</Link>
//             <Link href={"#"}>Privacy Policy</Link>
//             <Link href={"#"}>Terms of Service</Link>
//             <Link href={"#"}>Law Enforcement</Link>
//           </Stack>

//           <Stack>
//             <ListHeader>Install App</ListHeader>
//             <Link href={"#"}>
//               <Box borderRadius={"30px"} height={"77px"} w={["250px", "auto"]}>
//                 <Image
//                   w="100%"
//                   h="100%"
//                   objectFit={"cover"}
//                   src={AppStoreBadge}
//                 />
//               </Box>
//             </Link>
//             <Link href={"#"}>
//               <Box borderRadius="30px" height={"77px"} w={["250px", "auto"]}>
//                 <Image
//                   w="100%"
//                   h="100%"
//                   objectFit={"cover"}
//                   src={PlayStoreBadge}
//                 />
//               </Box>
//             </Link>
//           </Stack>
//         </SimpleGrid>
//       </Container>

//       <Box
//         borderTopWidth={1}
//         borderStyle={"solid"}
//         borderColor={useColorModeValue("gray.200", "gray.700")}
//       >
//         <Container
//           as={Stack}
//           maxW={"6xl"}
//           py={4}
//           direction={{ base: "column", md: "row" }}
//           spacing={4}
//           justify={{ md: "space-between" }}
//           align={{ md: "center" }}
//         >
//           <Text>© 2022 Chakra Templates. All rights reserved</Text>
//           <Stack direction={"row"} spacing={6}>
//             <SocialButton label={"Twitter"} href={"#"}>
//               <FaTwitter />
//             </SocialButton>
//             <SocialButton label={"YouTube"} href={"#"}>
//               <FaYoutube />
//             </SocialButton>
//             <SocialButton label={"Instagram"} href={"#"}>
//               <FaInstagram />
//             </SocialButton>
//           </Stack>
//         </Container>
//       </Box>
//     </Box>
//   );
// }
import { Box, Container, Flex, Grid, Icon, Link, Text } from "@chakra-ui/react";
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <Box>
      <Container maxW="6xl" py={10}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
          <Flex direction="column">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Company
            </Text>
            <Link href="#">About Us</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Contact Us</Link>
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Support
            </Text>
            <Link href="#">Help Center</Link>
            <Link href="#">Safety Center</Link>
            <Link href="#">Community Guidelines</Link>
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Legal
            </Text>
            <Link href="#">Cookies Policy</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Law Enforcement</Link>
          </Flex>

          <Flex direction="column">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Install App
            </Text>
            <Flex
              justifyContent={"space-evenly"}
              gap="10px"
              maxW={"110px"}
              h="70px"
            >
              <Link href="#">
                <Icon as={FaApple} boxSize={"full"} p="2" />
              </Link>
              <Link href="#">
                <Icon as={FaGooglePlay} boxSize={"full"} p="2" />
              </Link>
            </Flex>
          </Flex>
        </Grid>
      </Container>

      <Box py={4}>
        <Container
          maxW="6xl"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="gray.400">
            © 2023 Deepak Mane. All rights reserved
          </Text>
          <Flex>
            <Link href="#" mx={2}>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
            <Link href="#" mx={2}>
              <Icon as={FaYoutube} boxSize={6} />
            </Link>
            <Link href="#" mx={2}>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
