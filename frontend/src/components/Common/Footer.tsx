import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={10}>
      <Box maxW="1200px" mx="auto" px={4}>
        {/* Main Footer Content */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          mb={8}
          textAlign={{ base: "center", md: "left" }}
        >
          {/* Company Information */}
          <Box mb={{ base: 8, md: 0 }}>
            <Heading as="h4" size="md" mb={4}>
              <Link href="https://luxuryverse.com" _hover={{ textDecoration: "none", color: "red.600" }}>
                LuxuryVerse
              </Link>
            </Heading>
            <Text color="gray.300" mb={4} maxW="400px">
              Redefining luxury through innovation, authenticity, and global connectivity. Join us in shaping the future of exclusivity.
            </Text>
            <Text color="gray.300" mb={2}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:info@luxuryverse.com" _hover={{ color: "red.600" }}>
                info@luxuryverse.com
              </Link>
            </Text>
            <Text color="gray.300">
              <strong>Address:</strong> 99 Wall St Suite 5660, New York, NY 10005, USA
            </Text>
          </Box>

          {/* Navigation Links */}
          <Box>
            <Heading as="h4" size="md" mb={4}>
              Explore
            </Heading>
            <VStack align={{ base: "center", md: "flex-start" }} spacing={2}>
              <Link href="/" color="gray.300" _hover={{ color: "red.600" }}>
                Home
              </Link>
              <Link href="/roadmap" color="gray.300" _hover={{ color: "red.600" }}>
                Roadmap
              </Link>
              <Link href="/authenticity" color="gray.300" _hover={{ color: "red.600" }}>
                Authenticity
              </Link>
              <Link href="/faq" color="gray.300" _hover={{ color: "red.600" }}>
                FAQ
              </Link>
              <Link href="/contact" color="gray.300" _hover={{ color: "red.600" }}>
                Contact
              </Link>
            </VStack>
          </Box>
        </Flex>

        {/* Bottom Footer - Copyright and Legal */}
        <Flex
          justify="space-between"
          align="center"
          borderTop="1px solid"
          borderColor="gray.700"
          pt={6}
          flexWrap="wrap"
          gap={4}
          textAlign={{ base: "center", md: "left" }}
        >
          <Text color="gray.400" fontSize="sm">
            © 2024{" "}
            <Link href="https://luxuryverse.com" color="gray.200" _hover={{ color: "red.600" }}>
              LuxuryVerse
            </Link>
            . All rights reserved.
          </Text>
          <Flex
            gap={4}
            flexWrap="wrap"
            justify={{ base: "center", md: "flex-end" }}
          >
            <Link href="/privacy" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Terms and Conditions
            </Link>
            <Link href="/cookie" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Cookie Policy
            </Link>
            <Link href="/do-not-sell" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Do Not Sell My Personal Information
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;