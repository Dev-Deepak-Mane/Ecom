import React from "react";

import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Page404NotFound(goTO) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = {};
    params.keyword = "";
    params.resultPerPage = 6;
    params.page = 1;
    params["price[gte]"] = 0;
    params["price[lte]"] = 100 * 300;
    params.category = [];
    params.order = "";
    setSearchParams(params);
  }, []);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <br />
      <Text>OR</Text>
      <br />
      <Text color={"gray.500"} mb={6}>
        Product limit reached come back again
      </Text>
      <Link to="/">
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}
