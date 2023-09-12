import { AddIcon, CloseIcon, Icon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Box,
  Textarea,
  Select,
  createStandaloneToast,
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { MdStorage } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { TbTextSpellcheck } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminProduct,
  getAdminProducts,
} from "../../Redux/Admin/Products/action";

export default function CreateProductModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ripple, setRipple] = useState(false);

  const handleClick = (event) => {
    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const rippleSize = Math.max(buttonRect.width, buttonRect.height);
    const rippleX = event.clientX - buttonRect.left - rippleSize / 2;
    const rippleY = event.clientY - buttonRect.top - rippleSize / 2;
    setRipple({ rippleX, rippleY, rippleSize });
    setTimeout(() => setRipple(false), 1000);
  };

  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.creatProduct);
  const { toast } = createStandaloneToast();
  const [error, setError] = useState(null);
  function handleImageInputChange(event) {
    const files = Array.from(event.target.files);
    const newImages = files.filter((file) => {
      return !images.some(
        (image) => image.name === file.name && image.size === file.size
      );
    });
    setImages((prevSelectedImages) => [...prevSelectedImages, ...newImages]);
    setError(null);
  }

  function handleImageRemove(index) {
    setImages((prevSelectedImages) =>
      prevSelectedImages.filter((_, i) => i !== index)
    );
  }

  let previewImages = images.map((image) => URL.createObjectURL(image));
  const categories = [
    "Electronics",
    "Toy",
    "Cloth",
    "Education",
    "Accessories",
    "SmartPhones",
  ];
  const handleCreate = (e) => {
    e.preventDefault();
    const createData = new FormData();
    createData.append("name", name);
    createData.append("price", price);
    createData.append("description", description);
    createData.append("category", category);
    createData.append("Stock", Stock);

    images.forEach((image) => {
      createData.append("images", image);
    });
    if (images.length < 4) {
      setError("Please select at least 4 New Images");
      return;
    }

    dispatch(createAdminProduct(toast, createData)).then(() => {
      dispatch(getAdminProducts());
      onClose();
    });
  };
  return (
    <>
      <Button
        m={"20px 40px"}
        size={"lg"}
        bg="blue.500"
        color="white"
        _hover={{ bg: "blue.600" }}
        onClick={(e) => {
          handleClick(e);
          onOpen();
        }}
      >
        Create New Product
        {ripple && (
          <span
            className="ripple"
            style={{
              left: ripple.rippleX,
              top: ripple.rippleY,
              width: ripple.rippleSize,
              height: ripple.rippleSize,
            }}
          />
        )}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <form onSubmit={handleCreate}>
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>

                  <InputGroup>
                    <InputLeftAddon
                      children={<Icon as={TbTextSpellcheck}></Icon>}
                    />
                    <Input
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Price</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="$" />
                    <Input
                      type="number"
                      placeholder="Enter Price"
                      onChange={(e) => setprice(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Description</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      h="auto"
                      children={<Icon as={MdOutlineDescription}></Icon>}
                    />

                    <Textarea
                      placeholder="Enter description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Category</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      children={<Icon as={FaCodeBranch}></Icon>}
                    />
                    <Select
                      placeholder="Select category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((each) => (
                        <option key={each} value={each.toLocaleLowerCase()}>
                          {each}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Stock</FormLabel>

                  <InputGroup>
                    <InputLeftAddon children={<Icon as={MdStorage}></Icon>} />
                    <Input
                      type="number"
                      placeholder="Enter stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4} isInvalid={!!error}>
                  <FormLabel>Images</FormLabel>

                  <Flex alignItems="center">
                    <InputGroup>
                      <InputLeftAddon children={<FcAddImage />} />
                      <Button
                        as="label"
                        w="full"
                        htmlFor="imageInput"
                        variant="outline"
                        cursor="pointer"
                        _hover={{ bg: "gray.50" }}
                        _active={{ bg: "gray.100" }}
                        _focus={{ boxShadow: "outline" }}
                      >
                        Choose File
                      </Button>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageInputChange}
                        id="imageInput"
                        display="none"
                      />
                    </InputGroup>
                  </Flex>
                  <FormErrorMessage fontSize={"md"} fontWeight={"bold"}>
                    {error}
                  </FormErrorMessage>
                </FormControl>
                <Flex flexWrap="wrap" gap="20px" p="4">
                  {previewImages.map((image, index) => (
                    <Box
                      key={index}
                      position="relative"
                      width="150px"
                      height="150px"
                    >
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        objectFit="contain"
                        width="100%"
                        height="100%"
                        borderRadius="md"
                      />
                      <IconButton
                        icon={<CloseIcon />}
                        size="sm"
                        variant="ghost"
                        aria-label="Remove"
                        onClick={() => handleImageRemove(index)}
                        position="absolute"
                        top="0.25rem"
                        right="0.25rem"
                      />
                    </Box>
                  ))}
                </Flex>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                loadingText="Creating"
                colorScheme="blue"
                mr={3}
                type={"submit"}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
