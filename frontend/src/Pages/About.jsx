import React from "react";
import { Box, Heading, Text, Link, Center, Stack } from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FcAbout } from "react-icons/fc";

const About = () => {
  return (
    <>
      <Center p="80px 0 20px 0">
        <Box
          className="about"
          p={8}
          boxShadow="xl"
          borderRadius="lg"
          maxWidth="960"
        >
          <Stack spacing={4} align="center">
            <Heading as="h1" size="2xl" textAlign="center" color="blue.500">
              Welcome to ले-Lo
            </Heading>
            <Box as={FcAbout} boxSize={14} color="blue.500" />

            <Text textAlign="center" fontSize="lg">
              We are a dedicated team of professionals who are passionate about
              what we do.
            </Text>
            <Text textAlign="center" fontSize="lg">
              Our mission is to provide high-quality products/services and
              exceptional customer satisfaction.
            </Text>
            <Text textAlign="center" fontSize="lg">
              At our company, we believe in innovation, collaboration, and
              continuous learning. We strive to stay ahead of the curve and
              deliver the best solutions to our clients.
            </Text>
            <Text textAlign="center" fontSize="lg">
              Whether you're a business owner, an individual, or an
              organization, we have the expertise to meet your needs.
            </Text>
            <Text textAlign="center" fontSize="lg">
              Feel free to explore our website and learn more about our
              offerings. If you have any questions or would like to discuss a
              project, don't hesitate to get in touch with us.
            </Text>
            <Text textAlign="center" fontSize="lg">
              Thank you for visiting!
            </Text>
            <Box display={"flex"} gap={"10px"} className="social-links">
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
              >
                <FaLinkedin size={32} />
              </Link>
              <Link
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.500"
              >
                <FaGithub size={32} />
              </Link>
              <Link href="mailto:info@example.com" color="blue.500">
                <FiMail size={32} />
              </Link>
            </Box>
          </Stack>
        </Box>
      </Center>
    </>
  );
};

export default About;
