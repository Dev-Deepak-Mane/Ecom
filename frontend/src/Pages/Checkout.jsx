import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Icon,
  Select,
  Slide,
  Flex,
  InputGroup,
  InputLeftAddon,
  Grid,
  GridItem,
  Heading,
  createStandaloneToast,
  HStack,
  Divider,
  Text,
  Image,
  FormHelperText,
  Spacer,
  FormErrorMessage,
} from "@chakra-ui/react";

import { MdArrowDropDown, MdLocalShipping } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GiPiggyBank } from "react-icons/gi";

import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../Redux/Cart/action";
import { UserDetails } from "../Redux/Authentication/action";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { config } from "react-transition-group";
import { creatOrder } from "../Redux/Order/action";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Shipping Details",
    description: "",
    icon: <Icon as={MdLocalShipping}></Icon>,
  },
  {
    title: "Confirm Order",
    description: "",
    icon: <Icon as={BsFillCartCheckFill}></Icon>,
  },
  { title: "Payment", description: "", icon: <Icon as={GiPiggyBank}></Icon> },
];

function MyStepper({ step }) {
  let { activeStep } = useSteps({
    index: step,
    count: steps.length,
  });
  activeStep = step;

  return (
    <Flex maxW="70%" m="auto">
      <Stepper
        w="100%"
        mt="20px"
        size={["xs", "xs", "lg"]}
        display={["none", "flex", "flex"]}
        colorScheme="blue"
        index={activeStep}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={step.icon}
                incomplete={step.icon}
                active={step.icon}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Flex>
  );
}

const Checkout = () => {
  const { stripeApiKey } = useSelector((store) => store.stripeApiKey);
  const [step, setStep] = useState(0);
  const handleNext = () => {
    setStep((pre) => {
      if (step === 3) {
        return step;
      }
      return pre + 1;
    });
  };
  return (
    <>
      <MyStepper step={step} />

      {step === 0 ? <ShippingForm next={handleNext} /> : ""}
      {step === 1 ? <ConfirmOrderPage next={handleNext} /> : ""}
      {step === 2
        ? stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          )
        : ""}
      {/* <Button
        onClick={() =>
          setStep((pre) => {
            if (step === 0) {
              return step;
            }
            return pre - 1;
          })
        }
      >
        Prev
      </Button>
      <Button onClick={handleNext}>Next</Button> */}
    </>
  );
};

const ShippingForm = ({ next }) => {
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [myAddress, setMyAddress] = useState("");
  const [myCity, setMyCity] = useState("");
  const [myState, setMyState] = useState("");
  const [myCountry, setMycountry] = useState("");
  const [myPinCode, setMyPinCode] = useState("");
  const [myPhoneNo, setMyPhoneNo] = useState("");
  const { toast } = createStandaloneToast();

  const countryOptions = Country.getAllCountries().map((country) => ({
    name: country.name,
    isoCode: country.isoCode,
    phonecode: country.phonecode,
  }));
  const stateOptions = State.getStatesOfCountry(country).map((state) => ({
    name: state.name,
    isoCode: state.isoCode,
  }));
  const cityOptions = City.getCitiesOfState(country, state).map((city) => city);

  const handleShipping = (e) => {
    e.preventDefault();
    let myShippingDetails = {
      address: myAddress,
      phoneNo: myPhoneNo,
      country: country,
      state: myState,
      city: myCity,
      pinCode: myPinCode,
    };
    if (myAddress && myPhoneNo && myCity && myState && myPinCode) {
      dispatch(saveShippingInfo(toast, myShippingDetails));
      next();
    } else {
      return;
    }
  };

  useEffect(() => {
    setMycountry(
      countryOptions?.find(({ isoCode }) => isoCode == country)?.name
    );
    setMyState(stateOptions?.find(({ isoCode }) => isoCode === state)?.name);

    setMyCity(city);
  }, [country, state, city]);

  return (
    <Box
      maxW="md"
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      _hover={{ boxShadow: "xl" }}
      mx="auto"
      my={8}
    >
      <Box p={4}>
        <Flex alignItems="center">
          <Box fontSize="xl" fontWeight="bold" mr={2}>
            Shipping Information
          </Box>
        </Flex>
      </Box>
      <form onSubmit={handleShipping}>
        <Box p={4}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              isRequired
              type="text"
              onChange={(e) => setMyAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Mobile Number</FormLabel>
            <InputGroup>
              <InputLeftAddon
                children={
                  (country &&
                    "+" +
                      countryOptions.find(({ isoCode }) => isoCode === country)
                        .phonecode) ||
                  "+91"
                }
              />
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                isRequired
                onChange={(e) => setMyPhoneNo(e.target.value)}
              />
            </InputGroup>
            <FormHelperText>Mobile Number should be 10 digit</FormHelperText>
          </FormControl>
          <Flex mt={4}>
            <Box flex={1} mr={2}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select
                  isRequired
                  icon={<MdArrowDropDown />}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  placeholder="Select your country"
                >
                  {countryOptions.map((c) => (
                    <option key={c.isoCode + c.name} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {country && (
              <Box flex={1} mr={2}>
                <FormControl>
                  <FormLabel>State/Region</FormLabel>
                  <Select
                    isRequired
                    icon={<MdArrowDropDown />}
                    placeholder="Select your State"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  >
                    {stateOptions.map((c) => (
                      <option key={c.isoCode + c.name} value={c.isoCode}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Flex>
          <Flex mt={4}>
            {state && (
              <Box flex={1} mr={2}>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Select
                    isRequired
                    icon={<MdArrowDropDown />}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setMyCity(city);
                    }}
                    placeholder="Select your city"
                  >
                    {cityOptions.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            <Box flex={1} ml={2}>
              <FormControl>
                <FormLabel>Pincode</FormLabel>
                <Input
                  onChange={(e) => setMyPinCode(e.target.value)}
                  isRequired
                  type="number"
                  placeholder="Enter your pincode"
                />
              </FormControl>
            </Box>
          </Flex>
          <Button
            type="submit"
            onClick={() => {
              return 0;
            }}
            mt={4}
            colorScheme="teal"
            w="100%"
          >
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

// Component for the entire confirm order page layout
const ConfirmOrderPage = ({ next }) => {
  const { shippingInfo } = useSelector((store) => store.cart);
  const { user } = useSelector(UserDetails);
  const { cartItems } = useSelector((store) => store.cart);
  const subTotal = cartItems?.reduce((acc, each) => {
    return acc + each.price * each.quantity;
  }, 0);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const grandTotal = subTotal + shippingCharges + tax;
  const handleConfirmOrder = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      grandTotal,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    next();
  };
  return (
    <Flex flexWrap="wrap" p="3rem" gap="6%">
      {/* Left side with shipping info and cart items */}
      <Box flexBasis={{ base: "100%", md: "100%", lg: "60%" }} p="2rem">
        <Heading as="h2" size="lg" mb="4">
          Shipping Info
        </Heading>
        <VStack align="start" spacing="4" mb="20px">
          <Text>Name: {user?.name}</Text>
          <Text>Address: {shippingInfo?.address}</Text>
          <Text>City:{shippingInfo?.city} </Text>
          <Text>State: {shippingInfo?.state}</Text>
          <Text>Zip code: {shippingInfo?.pinCode}</Text>
        </VStack>

        <Heading as="h2" size="lg" mb="4">
          Your Cart
        </Heading>
        {/* cart item list */}
        <VStack align="start" spacing="4">
          {cartItems &&
            cartItems.map((each) => (
              <HStack key={each.name + each.price} w="100%" p="4">
                <Image
                  w="100px"
                  h="100px"
                  src="data:image/jpeg;base64,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"
                  alt="name"
                ></Image>
                <Text fontSize="lg">{each.name} </Text>
                <Spacer />
                <Text fontSize="lg">
                  {each.quantity} X ₹{each.price}={" "}
                  <Text fontWeight={"bold"} as={"span"}>
                    ₹{each.quantity * each.price}
                  </Text>
                </Text>
              </HStack>
            ))}
        </VStack>
      </Box>

      {/* Right side with order summary */}
      <Box
        flexBasis={{ base: "100%", md: "100%", lg: "30%" }}
        p="2rem"
        borderLeft={["none", "none", "none", "solid rgb(49,130,206)"]}
        borderTop={[
          "solid rgb(49,130,206)",
          "solid rgb(49,130,206)",
          "solid rgb(49,130,206)",
          "none",
        ]}
      >
        <Heading as="h2" size="lg" mb="4">
          Order Summary
        </Heading>
        <VStack align="start" spacing="4">
          <Box w="100%">
            <HStack fontSize="lg" justify="space-between" w="100%">
              <Text>Subtotal:</Text>
              <Text>₹ {subTotal}</Text>
            </HStack>
            <HStack fontSize="lg" justify="space-between" w="100%">
              <Text>Shipping: </Text>
              <Text>₹{shippingCharges}</Text>
            </HStack>
            <HStack
              borderBottom={"1px solid"}
              fontSize="lg"
              justify="space-between"
              w="100%"
            >
              <Text>GST:</Text>
              <Text>₹{tax}</Text>
            </HStack>
            <HStack
              justify="space-between"
              w="100%"
              fontWeight="bold"
              mt="4"
              fontSize="lg"
              mb="2"
            >
              <Text>Total:</Text>
              <Text>₹{grandTotal}</Text>
            </HStack>
          </Box>
          <Flex>
            <Button bg="blue.500" size="lg" onClick={handleConfirmOrder}>
              Proceed To Payment
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((store) => store.cart);
  const { cartItems } = useSelector((store) => store.cart);
  const { user } = useSelector(UserDetails);
  const { toast } = createStandaloneToast();
  const Navigate = useNavigate();
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.grandTotal,
  };

  const paymentData = {
    amount: Math.round(orderInfo.grandTotal * 100),
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payment/process`,
        paymentData,
        { withCredentials: true },
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(creatOrder(toast, order)).then(() =>
            setTimeout(() => {
              Navigate("/ordersuccess");
            }, 2000)
          );
        } else {
          alert();
          toast({
            title: "An error occurred.",
            description: `"There's some issue while processing payment"`,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} borderWidth={1} borderRadius={8} p={4}>
      <form onSubmit={handlePayment}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Card number</FormLabel>
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <FormErrorMessage>
              "Please enter a valid card number.
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Expiration date</FormLabel>
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <FormErrorMessage>
              Please enter a valid expiration date.
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>CVC code</FormLabel>
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <FormErrorMessage>Please enter a valid CVC code.</FormErrorMessage>
          </FormControl>
          <Button type="submit" mt={4} colorScheme="blue" ref={payBtn}>
            {`Pay - ₹${orderInfo && orderInfo.grandTotal}`}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Checkout;
