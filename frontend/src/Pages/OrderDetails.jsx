import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../Redux/Order/action";
import {
  createStandaloneToast,
  Box,
  Divider,
  Heading,
  Text,
  Grid,
  Image,
  Flex,
} from "@chakra-ui/react";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const orderDetails = useSelector((store) => store.orderDetails.order);

  const dateObj = new Date(orderDetails?.paidAt);

  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1; // Months are zero-indexed
  const day = dateObj.getUTCDate();

  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();

  useEffect(() => {
    dispatch(getOrderDetails(toast, params?.id));
  }, [dispatch, params?.id]);

  return (
    <Box p={["0", "0", "0", "0 200px"]}>
      <Box p="40px" border="1px" borderRadius="md">
        <Heading textAlign="center" mb="6">
          Order Details
        </Heading>

        {/* Shipping Info */}
        <Box mb="6">
          <Heading mb={4} as="h2" size="md">
            Order #{orderDetails?._id}
          </Heading>
          <Heading as="h2" size="md" mb="2">
            Shipping Information
          </Heading>
          <Grid templateColumns={"1fr"} gap="4">
            <Flex gap={1}>
              <Text fontWeight="bold">Name:</Text>
              <Text>{orderDetails?.user?.name}</Text>
            </Flex>
            <Flex gap={1}>
              <Text fontWeight="bold">Contact No:</Text>
              <Text>{orderDetails?.shippingInfo?.phoneNo}</Text>
            </Flex>
            <Flex gap={1}>
              <Text fontWeight="bold">Address:</Text>
              <Text>
                {orderDetails?.shippingInfo?.address +
                  ", " +
                  orderDetails?.shippingInfo?.city +
                  " " +
                  orderDetails?.shippingInfo?.state +
                  " " +
                  orderDetails?.shippingInfo?.country +
                  " - " +
                  orderDetails?.shippingInfo?.pinCode}
              </Text>
            </Flex>
          </Grid>
        </Box>

        {/* Payment */}
        <Box mb="6">
          <Heading as="h2" size="md" mb="2">
            Payment
          </Heading>
          <Grid templateColumns={"1fr"} gap="4">
            <Flex gap={1}>
              <Text fontWeight="bold">Paid:</Text>
              <Text>{orderDetails?.paymentInfo?.status}</Text>
            </Flex>
            <Flex gap={1}>
              <Text fontWeight="bold">Paid At:</Text>
              <Text>
                {orderDetails?.paidAt ? (
                  <>
                    {`Date: ${year}-${month}-${day} `}
                    {`Time: ${hours}:${minutes}:${seconds}`}
                  </>
                ) : (
                  "NA"
                )}
              </Text>
            </Flex>
            <Flex gap={1}>
              <Text fontWeight="bold">Amount:</Text>
              <Text>₹ {orderDetails?.totalPrice}</Text>
            </Flex>
          </Grid>
        </Box>

        {/* Order Status */}
        <Box mb="6">
          <Heading as="h2" size="md" mb="2">
            Order Status
          </Heading>
          <Text
            fontWeight="bold"
            color={
              orderDetails?.orderStatus === "Processing"
                ? "red"
                : orderDetails?.orderStatus === "Shipped"
                ? "blue"
                : "green"
            }
          >
            {orderDetails?.orderStatus}
          </Text>
        </Box>

        {/* Order Items */}
        <Box w="90%">
          <Box mb="6">
            <Heading as="h2" size="md" mb="2">
              Order Items
            </Heading>
            {orderDetails?.orderItems?.map((item) => (
              <Box key={item._id} mb="4">
                <Flex alignItems="center" mb="2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    mr="4"
                    boxSize="60px"
                    objectFit="contain"
                  />
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb="1">
                      {item.name.length > 30
                        ? item.name.substring(0, 30)
                        : item.name}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      {item.quantity} x {item.price}
                    </Text>
                  </Box>
                  <Text fontSize="md" fontWeight="bold" ml="auto">
                    {item.quantity * item.price}
                  </Text>
                </Flex>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* Total Price */}
          <Box mb="6">
            <Flex justifyContent="space-between">
              <Text fontWeight="bold">Tax:</Text>
              <Text fontWeight="bold">₹ {orderDetails?.taxPrice}</Text>
            </Flex>
            <Divider mb="2" />
            <Flex justifyContent="space-between">
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold">₹ {orderDetails?.totalPrice}</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetails;
