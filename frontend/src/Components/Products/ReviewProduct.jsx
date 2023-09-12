import React from "react";
import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";
import Rating from "react-rating-stars-component";
import { useState } from "react";
import { addNewReview, getProductDetails } from "../../Redux/Products/action";
import { useDispatch } from "react-redux";
const ReviewProduct = ({ productId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (rating && review) {
      const data = { rating, comment: review, productId };
      dispatch(addNewReview(toast, data)).then(() => {
        dispatch(getProductDetails(productId, toast));
      });
    }
  };
  return (
    <>
      <Button onClick={onOpen}>Submit Review</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">Add a review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={4} borderWidth="1px" rounded="md">
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Rating
                    count={5}
                    // value={3.5} // Set fixed value to 3
                    // edit={false} // Disable user interaction
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    onChange={handleRatingChange}
                  />
                  <Textarea
                    onChange={(e) => setReview(e.target.value)}
                    h="40"
                    placeholder="Write your review here"
                  />
                  <Button type="submit">Submit</Button>
                </Stack>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewProduct;
