import { Center, Box, Button, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function PageSuccess() {
  return (
    <Center h="100vh">
      <Box textAlign={"center"}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Order Placed Successfully
        </Heading>
        <Button as={Link} to="/orders">
          Go to Order
        </Button>
      </Box>
    </Center>
  );
}
