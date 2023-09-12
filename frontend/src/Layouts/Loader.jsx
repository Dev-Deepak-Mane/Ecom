// import { Container, chakra, shouldForwardProp } from "@chakra-ui/react";
// import { motion, isValidMotionProp } from "framer-motion";

// const ChakraBox = chakra(motion.div, {
//   shouldForwardProp: (prop) =>
//     isValidMotionProp(prop) || shouldForwardProp(prop),
// });

// export default function Loader() {
//   return (
//     <Container
//       h="100vh"
//       w="100vw"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <ChakraBox
//         w={"10vmax"}
//         h={"10vmax"}
//         borderBottom={"5px solid rgb(110,110,110)"}
//         borderRadius="50%"
//         animate={{
//           rotate: 360,
//         }}
//         transition={{
//           duration: 0.6,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//       ></ChakraBox>
//     </Container>
//   );
// }

import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w="100vw"
      maxW={"100%"}
      h="100vh"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Box>
  );
};

export default Loader;
