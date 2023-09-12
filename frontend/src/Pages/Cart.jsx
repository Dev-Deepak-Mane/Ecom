import { AddIcon, MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";

import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Heading,
  Divider,
  Stack,
  Icon,
  Center,
  useBreakpointValue,
  createStandaloneToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useState } from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../Redux/Cart/action";
import MetaData from "../Layouts/MetaData";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { toast } = createStandaloneToast();
  const dispatch = useDispatch();
  const handleDecrease = (id, quantity, stock) => {
    let newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addToCart(null, id, (quantity = newQty)));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(toast, id));
  };
  const handleIncrease = (id, quantity, stock) => {
    let newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(null, id, (quantity = newQty)));
  };
  const numItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // Calculate the total quantity and price of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [isMobile] = useMediaQuery("(maxWidth: 480px)");

  const [isCartEmpty, setIsCartEmpty] = useState(cartItems.length === 0);
  useEffect(() => {
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);
  return (
    <>
      <MetaData title={"Cart"} />
      {cartItems.length ? (
        <Flex
          flexDirection={{
            base: "column",
            md: "column",
            lg: "row",
          }}
          gap="20px"
        >
          <Box w={["95vw", "95vw", "95vw", "65vw"]} overflowX={"hidden"}>
            <Text fontSize="2xl" mb={4}>
              Shopping Cart ({totalQuantity} items)
            </Text>
            {isCartEmpty ? (
              <Text>Your cart is currently empty.</Text>
            ) : (
              <Table>
                {isMobile ? (
                  ""
                ) : (
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Price</Th>
                      <Th>Quantity</Th>
                      <Th>Total</Th>
                      <Th />
                    </Tr>
                  </Thead>
                )}

                <Tbody>
                  {cartItems.map((item) => (
                    <React.Fragment key={item.product}>
                      {isMobile ? (
                        <MobileCard
                          {...item}
                          onRemove={() => handleRemoveItem(item.product)}
                          onIncrement={() =>
                            handleIncrease(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                          onDecrement={() =>
                            handleDecrease(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        />
                      ) : (
                        <DesktopCard
                          {...item}
                          onRemove={() => handleRemoveItem(item.product)}
                          onIncrement={() =>
                            handleIncrease(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                          onDecrement={() =>
                            handleDecrease(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
          <Stack
            position={{ base: "static", md: "static", lg: "fixed" }}
            top={{ base: "auto", md: "70" }}
            right={{ base: "auto", md: "1" }}
            p={4}
            gap="10px"
            borderRadius="md"
            w={{ base: "100%", md: "90%", lg: "30%" }}
            m={"auto"}
          >
            <Heading as="h1" size="md" mb={4}>
              Order Summary
            </Heading>
            <Flex justify="space-between" mb={2}>
              <Text>
                Subtotal ({numItems} {numItems === 1 ? "item" : "items"})
              </Text>
              <Text>${totalPrice.toFixed(2)}</Text>
            </Flex>
            <Flex justify="space-between" mb={2}>
              <Text>Shipping &amp; Tax</Text>
              <Text>$59.00</Text>
            </Flex>
            <Divider border={"2px solid blue"} />
            <Flex justify="space-between" mt={2}>
              <Text fontWeight="bold">Total</Text>
              <Text fontWeight="bold" fontSize="xl">
                ${(totalPrice + 59).toFixed(2)}
              </Text>
            </Flex>

            <Button
              mt="20px"
              fontWeight="bold"
              as={Link}
              to="/checkout"
              w="full"
              fontSize={"3xl"}
              rounded={"full"}
              bg={"blue.400"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                transform: "translateY(-0.1vmax)",
              }}
            >
              Checkout
            </Button>
          </Stack>
        </Flex>
      ) : (
        <Center h="100vh">
          <Stack textAlign={"center"}>
            <Box>
              <Icon
                as={MdRemoveShoppingCart}
                color={"blue.500"}
                fontSize={"9xl"}
              ></Icon>
            </Box>
            <Box>
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Cart is Empty!
              </Heading>
            </Box>
            <Box>
              <Text color={"gray.500"}>
                feel free to buy range of products accross the world any time
                any where
              </Text>
              <Button
                mt="20px"
                fontWeight="bold"
                size="lg"
                minW={["100px", "200px", "300px"]}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  transform: "translateY(-0.1vmax)",
                }}
                as={Link}
                to="/products"
              >
                View Products
              </Button>
            </Box>
          </Stack>
        </Center>
      )}
    </>
  );
};

const DesktopCard = ({
  imageSrc,
  name,
  price,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Tr>
      <Td>
        <Flex align="center">
          <Image
            src={
              "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/18594832/2022/6/2/bc3e81f9-5e5d-4c3d-9440-b6d02501c2b91654174293411ADIDASMenWhiteSportsShoes1.jpg"
            }
            alt={name}
            boxSize="64px"
            rounded="md"
            mr="3"
          />
          <Text fontSize="lg" fontWeight="bold">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="lg" fontWeight="bold">
          {`$${price}`}
        </Text>
      </Td>
      <Td>
        <Flex align="center">
          <IconButton
            size="sm"
            icon={<MinusIcon />}
            variant="ghost"
            colorScheme="gray"
            aria-label="Decrement item"
            onClick={onDecrement}
            disabled={quantity === 1}
            mr="2"
          />
          <Text fontSize="md">{quantity}</Text>
          <IconButton
            size="sm"
            icon={<AddIcon />}
            variant="ghost"
            colorScheme="gray"
            aria-label="Increment item"
            onClick={onIncrement}
            ml="2"
          />
        </Flex>
      </Td>
      <Td>
        <Text fontSize="lg" fontWeight="bold">{`$${price * quantity}`}</Text>
      </Td>
      <Td>
        <IconButton
          size="md"
          icon={<CloseIcon />}
          variant="ghost"
          colorScheme="gray"
          aria-label="Remove item"
          onClick={onRemove}
        />
      </Td>
    </Tr>
  );
};

const MobileCard = ({
  imageSrc,
  name,
  price,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  const [isMobile] = useMediaQuery("(maxWidth: 480px)");
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <Flex
      align="center"
      bg="white"
      boxShadow="md"
      borderRadius="md"
      p="4"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position="relative"
    >
      <Image
        src={
          "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/18594832/2022/6/2/bc3e81f9-5e5d-4c3d-9440-b6d02501c2b91654174293411ADIDASMenWhiteSportsShoes1.jpg"
        }
        alt={name}
        boxSize={isMobile ? "100px" : "120px"}
        borderRadius="md"
        mr={isMobile ? "2" : "4"}
        flexShrink={0}
      />

      <Box flex="1">
        <Flex justify="space-between" align="baseline" mb="2">
          <Text fontWeight="semibold" fontSize="lg">
            {name}
          </Text>
          <IconButton
            size={isMobile ? "xs" : "md"}
            icon={<CloseIcon />}
            variant="ghost"
            colorScheme="gray"
            aria-label="Remove item"
            onClick={onRemove}
            position="absolute"
            top="2"
            right="2"
            display={isHovering ? "block" : "none"}
          />
        </Flex>
        <Text fontSize="md" color="gray.500" mb="2">
          {`$${price}`}
        </Text>
        <Flex align="center">
          <IconButton
            size={isMobile ? "xs" : "sm"}
            icon={<MinusIcon />}
            variant="ghost"
            colorScheme="gray"
            aria-label="Decrement item"
            onClick={onDecrement}
            disabled={quantity === 1}
            mr="2"
          />
          <Text fontSize={isMobile ? "sm" : "md"}>{quantity}</Text>
          <IconButton
            size={isMobile ? "xs" : "sm"}
            icon={<AddIcon />}
            variant="ghost"
            colorScheme="gray"
            aria-label="Increment item"
            onClick={onIncrement}
            ml="2"
          />
          <Text fontSize="sm" color="gray.500" ml="4">
            {`Subtotal: $${price * quantity}`}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Cart;
