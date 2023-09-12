import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";

import ReactStars from "react-rating-stars-component";

export default function ProductCard({ product }) {
  const { name, price, category, ratings, numOfReviews, _id, images } = product;
  const IMAGE = images && images[0]?.url;
  // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80";
  console.log(images);
  return (
    <Box
      key={_id}
      _hover={{ transform: "translateY(-0.5vmax)" }}
      style={{ transitionDuration: "500ms" }}
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Box
        rounded={"lg"}
        mt={-12}
        pos={"relative"}
        height={"230px"}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${IMAGE})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          rounded={"lg"}
          height={230}
          width={282}
          objectFit={"cover"}
          src={IMAGE}
          alt={IMAGE}
        />
      </Box>
      <Stack pt={10} align={"center"}>
        <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          {name}
        </Heading>
        <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
          {category}
        </Text>
        <Stack direction={"row"} align={"center"}>
          <Text fontWeight={800} fontSize={"xl"}>
            ₹{price}
          </Text>
          <Text textDecoration={"line-through"} color={"gray.600"}>
            ₹199
          </Text>
        </Stack>
        <Flex justifyContent={"center"} alignItems={"center"} gap="15px">
          <Box>
            <ReactStars
              count={5}
              value={ratings || 0}
              size={24}
              isHalf={true}
              activeColor="#ffd700"
            />
          </Box>
          <Box>({numOfReviews} Reviews)</Box>
        </Flex>
      </Stack>
    </Box>
  );
}
