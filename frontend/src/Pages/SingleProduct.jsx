import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Image,
  Flex,
  Heading,
  Link,
  Text,
  Button,
  Stack,
  Badge,
  Icon,
  Center,
} from "@chakra-ui/react";
import Rating from "react-rating-stars-component";
import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import { getProductDetails } from "../Redux/Products/action";
import { createStandaloneToast } from "@chakra-ui/react";
import MetaData from "../Layouts/MetaData";

import { addToCart } from "../Redux/Cart/action";

import ReviewProduct from "../Components/Products/ReviewProduct";
const productImages = [
  {
    id: 1,
    src: "data:image/jpeg;base64,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",
    alt: "Product Image 1",
  },
  {
    id: 2,
    src: "data:image/jpeg;base64,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",
    alt: "Product Image 2",
  },
  {
    id: 3,
    src: "data:image/jpeg;base64,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",

    alt: "Product Image 3",
  },
  {
    id: 4,
    src: "data:image/jpeg;base64,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",

    alt: "Product Image 4",
  },
];

function SingleProduct() {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const params = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((store) => store.productDetails);

  const { toast } = createStandaloneToast();

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const [quantity, setQuantity] = useState(product?.product?.Stock || 1);

  const handleDecrease = () => {
    if (quantity <= 1) {
      return;
    }

    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity >= product?.product?.Stock) {
      return;
    }
    setQuantity(quantity + 1);
  };
  //console.log(product?.product?.reviews);
  const handleAddToCart = (quantity) => {
    dispatch(addToCart(toast, params.id, quantity));
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id, toast));
  }, [params.id, dispatch]);
  return (
    <>
      <MetaData title={product.product?.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box maxW="full" p={{ base: "1rem", md: "2rem" }}>
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap="20px">
              {/* Image display */}
              <Box>
                <Box m="auto" maxW="l">
                  <Image
                    objectFit={"contain"}
                    w="100%"
                    h={{ base: "auto", md: "400px" }}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                  />
                </Box>
                <Flex justifyContent={{ base: "flex-start", md: "center" }}>
                  {productImages.map((image) => (
                    <Box
                      key={image.id}
                      mt="2rem"
                      ml="2rem"
                      w={{ base: "100%", md: "auto" }}
                    >
                      <Link
                        onClick={() => handleImageSelect(image)}
                        cursor="pointer"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          w={{ base: "100px", md: "150px" }}
                          h="auto"
                        />
                      </Link>
                    </Box>
                  ))}
                </Flex>
              </Box>

              {/* Product content */}
              <Box>
                <Heading as="h1" fontSize={{ base: "xl", md: "3xl" }} mb="1rem">
                  {product.product?.name}
                </Heading>

                <Heading as="h3" fontSize={{ base: "xl", md: "3xl" }} mb="1rem">
                  ₹{product.product?.price} INR
                </Heading>
                <Flex align="center" mb="1rem">
                  <Box>
                    <Rating
                      count={5}
                      value={product?.product?.ratings} // Set fixed value to 3
                      edit={false} // Disable user interaction
                      size={24}
                      isHalf={true}
                      activeColor="#ffd700"
                    />
                  </Box>
                  <span>{product?.product?.numOfReviews} Reviews</span>
                </Flex>
                <Flex mb="1rem">
                  <Badge colorScheme="green">In Stock</Badge>
                  <Text color="gray.500" fontSize="sm" ml={{ md: "1rem" }}>
                    {product?.product?.Stock}: left
                  </Text>
                </Flex>
                <Flex gap={2} mb="1rem">
                  <Heading size={"md"}>Category : </Heading>
                  <Text> {product?.product?.category}</Text>
                </Flex>

                {product?.product?.Stock > 0 ? (
                  <>
                    {" "}
                    <Flex align="center">
                      <Button
                        onClick={handleDecrease}
                        size="sm"
                        colorScheme="gray"
                        variant="outline"
                      >
                        <Icon as={MinusIcon} fontSize="7px"></Icon>
                      </Button>
                      <Text mx={3} fontSize="xl" fontWeight="bold">
                        {quantity}
                      </Text>
                      <Button
                        onClick={handleIncrease}
                        size="sm"
                        colorScheme="gray"
                        variant="outline"
                      >
                        <Icon as={SmallAddIcon}></Icon>
                      </Button>
                    </Flex>
                    <Flex mt="4">
                      <Button
                        fontWeight="bold"
                        size="lg"
                        fontSize={"sm"}
                        rounded={"full"}
                        bg={"blue.400"}
                        boxShadow={
                          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        onClick={() => handleAddToCart(quantity)}
                        _hover={{
                          transform: "translateY(-0.1vmax)",
                        }}
                      >
                        Add To Cart
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <Button
                    fontWeight="bold"
                    size="lg"
                    fontSize={"sm"}
                    rounded={"full"}
                    bg={"blue.400"}
                    boxShadow={
                      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    isDisabled
                    _hover={{
                      transform: "translateY(-0.1vmax)",
                    }}
                  >
                    Out Of Stock
                  </Button>
                )}

                <Heading mt="2rem" fontWeight="semibold" color="gray.700">
                  Description
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {product?.product?.description}
                </Text>
                <ReviewProduct productId={params.id} />
              </Box>
            </Grid>
          </Box>
          {/* ////// review box start from here  */}
          <Box
            overflowX={{ base: "unset", md: "scroll" }}
            maxW="100%"
            pb={{ base: 0, md: 4 }}
          >
            <Box
              display={{ base: "block", md: "flex" }}
              flexWrap="nowrap"
              w="max-content"
            >
              {product &&
                product?.product?.reviews.map((e) => (
                  <Box
                    key={e?._id}
                    boxShadow="lg"
                    borderRadius="md"
                    width={["xs", "md"]}
                    minH={"350px"}
                  >
                    <Stack p={4} spacing={2} align={"center"}>
                      <Box borderRadius={"100%"} w="100px" h="100px">
                        <Image
                          objectFit="cover"
                          src={
                            "https://www.svgrepo.com/show/295402/user-profile.svg"
                          }
                          alt="User profile picture"
                          w="100%"
                        />
                      </Box>
                      <Text fontWeight="bold">{e?.name}</Text>
                      <Rating
                        count={5}
                        value={e?.rating} // Set fixed value to 3
                        edit={false} // Disable user interaction
                        size={24}
                        isHalf={true}
                        activeColor="#ffd700"
                      />
                      <Text textAlign={"center"} w="90%">
                        {e?.comment}
                      </Text>
                    </Stack>
                  </Box>
                ))}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default SingleProduct;

////first design for single product page
////use in future if you want need yarn to add Carousel
///carousel component need to import commented for now that as well
// import React, { useEffect } from "react";
// import CarouselLelo from "../Components/Products/Carousel";
// import { getProductDetails } from "../Redux/Products/action";
// import { useDispatch, useSelector } from "react-redux";
// import { Center, Input, createStandaloneToast } from "@chakra-ui/react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Container,
//   Stack,
//   Text,
//   Image,
//   Flex,
//   VStack,
//   Button,
//   Heading,
//   SimpleGrid,
//   StackDivider,
//   useColorModeValue,
//   List,
//   ListItem,
// } from "@chakra-ui/react";

// import { MdLocalShipping } from "react-icons/md";
// import MetaData from "../Layouts/MetaData";
// const SingleProduct = () => {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const { product, loading } = useSelector((store) => store.productDetails);

//   const { toast } = createStandaloneToast();
//   useEffect(() => {
//     dispatch(getProductDetails(params.id, toast));
//   }, [params.id, dispatch]);

//   return (
//     <>
//       <MetaData title={product.product?.name} />
//       <Container maxW={"7xl"}>
//         <SimpleGrid
//           columns={{ base: 1, lg: 2 }}
//           spacing={{ base: 8, md: 10 }}
//           py={{ base: 18, md: 24 }}
//         >
//           {/* carousel start here */}
//           <Flex>
//             <CarouselLelo />
//           </Flex>
//           <Stack spacing={{ base: 6, md: 10 }}>
//             <Box as={"header"}>
//               <Heading
//                 lineHeight={1.1}
//                 fontWeight={600}
//                 fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
//               >

//                 {product.product?.name}
//               </Heading>
//               <Text
//                 color={useColorModeValue("gray.900", "gray.400")}
//                 fontWeight={300}
//                 fontSize={"2xl"}
//               >
//                 ₹{product.product?.price} INR
//               </Text>
//             </Box>

//             <Stack
//               spacing={{ base: 4, sm: 6 }}
//               direction={"column"}
//               divider={
//                 <StackDivider
//                   borderColor={useColorModeValue("gray.200", "gray.600")}
//                 />
//               }
//             >
//               <VStack spacing={{ base: 4, sm: 6 }}>
//                 <Text
//                   color={useColorModeValue("gray.500", "gray.400")}
//                   fontSize={"2xl"}
//                   fontWeight={"300"}
//                 >
//                   Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
//                   diam nonumy eirmod tempor invidunt ut labore
//                 </Text>
//                 <Text fontSize={"lg"}>
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
//                   aliquid amet at delectus doloribus dolorum expedita hic, ipsum
//                   maxime modi nam officiis porro, quae, quisquam quos
//                   reprehenderit velit? Natus, totam.
//                 </Text>
//               </VStack>
//               <Box>
//                 <Text
//                   fontSize={{ base: "16px", lg: "18px" }}
//                   color={useColorModeValue("yellow.500", "yellow.300")}
//                   fontWeight={"500"}
//                   textTransform={"uppercase"}
//                   mb={"4"}
//                 >
//                   Features
//                 </Text>

//                 <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
//                   <List spacing={2}>
//                     <ListItem>Chronograph</ListItem>
//                     <ListItem>Master Chronometer Certified</ListItem>{" "}
//                     <ListItem>Tachymeter</ListItem>
//                   </List>
//                   <List spacing={2}>
//                     <ListItem>Anti‑magnetic</ListItem>
//                     <ListItem>Chronometer</ListItem>
//                     <ListItem>Small seconds</ListItem>
//                   </List>
//                 </SimpleGrid>
//               </Box>
//               <Box>
//                 <Text
//                   fontSize={{ base: "16px", lg: "18px" }}
//                   color={useColorModeValue("yellow.500", "yellow.300")}
//                   fontWeight={"500"}
//                   textTransform={"uppercase"}
//                   mb={"4"}
//                 >
//                   Product Details
//                 </Text>

//                 <List spacing={2}>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Between lugs:
//                     </Text>{" "}
//                     20 mm
//                   </ListItem>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Bracelet:
//                     </Text>{" "}
//                     leather strap
//                   </ListItem>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Case:
//                     </Text>{" "}
//                     Steel
//                   </ListItem>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Case diameter:
//                     </Text>{" "}
//                     42 mm
//                   </ListItem>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Dial color:
//                     </Text>{" "}
//                     Black
//                   </ListItem>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Crystal:
//                     </Text>{" "}
//                     Domed, scratch‑resistant sapphire crystal with
//                     anti‑reflective treatment inside
//                   </ListItem>
//                   <ListItem>
//                     <Text as={"span"} fontWeight={"bold"}>
//                       Water resistance:
//                     </Text>{" "}
//                     5 bar (50 metres / 167 feet){" "}
//                   </ListItem>
//                 </List>
//               </Box>
//             </Stack>

//             <Button
//               rounded={"none"}
//               w={"full"}
//               mt={8}
//               size={"lg"}
//               py={"7"}
//               bg={useColorModeValue("gray.900", "gray.50")}
//               color={useColorModeValue("white", "gray.900")}
//               textTransform={"uppercase"}
//               _hover={{
//                 transform: "translateY(2px)",
//                 boxShadow: "lg",
//               }}
//             >
//               Add to cart
//             </Button>

//             <Stack
//               direction="row"
//               alignItems="center"
//               justifyContent={"center"}
//             >
//               <MdLocalShipping />
//               <Text>2-3 business days delivery</Text>
//             </Stack>
//           </Stack>
//         </SimpleGrid>
//       </Container>
//     </>
//   );
// };
