import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  HStack,
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
          gap={{ base: 8, md: 4 }}
        >
          {/* Left Section: Company Info, Explore, and Shop */}
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 8, md: 12 }}
            align={{ base: "center", md: "flex-start" }}
            flex="2"
          >
            {/* Company Information */}
            <Box maxW={{ base: "100%", md: "400px" }}>
              <Heading as="h4" size="md" mb={4}>
                <Link href="https://luxuryverse.com" _hover={{ textDecoration: "none", color: "purple.600" }}>
                  LuxuryVerse
                </Link>
              </Heading>
              <Text color="gray.300" mb={4}>
                Defining luxury through innovation, authenticity, and global connectivity. Join us in shaping the future of exclusivity.
              </Text>
            </Box>

            {/* Explore Links */}
            <Box>
              <Heading as="h4" size="md" mb={4}>
                Explore
              </Heading>
              <HStack wrap="wrap" spacing={4} justify={{ base: "center", md: "flex-start" }}>
                <Link href="/roadmap" color="gray.300" _hover={{ color: "purple.600" }}>
                  Roadmap
                </Link>
                <Link href="/authenticity" color="gray.300" _hover={{ color: "purple.600" }}>
                  Authenticity
                </Link>
                <Link href="/faq" color="gray.300" _hover={{ color: "purple.600" }}>
                  FAQ
                </Link>
                <Link href="/contact" color="gray.300" _hover={{ color: "purple.600" }}>
                  Contact
                </Link>
              </HStack>
            </Box>

            {/* Shop Links */}
            <Box>
              <Heading as="h4" size="md" mb={4}>
                Shop
              </Heading>
              <HStack wrap="wrap" spacing={4} justify={{ base: "center", md: "flex-start" }}>
                <Link href="/join" color="gray.300" _hover={{ color: "purple.600" }}>
                  Join
                  </Link>
                <Link href="/collections" color="gray.300" _hover={{ color: "purple.600" }}>
                  Collections
                </Link>
              </HStack>
            </Box>
          </Flex>

          {/* Right Section: Contact (Email and Address) */}
          <Box
            textAlign={{ base: "center", md: "left" }}
            flex="1"
            minW={{ base: "100%", md: "200px" }}
          >
            <Heading as="h4" size="md" mb={4}>
              Contact
            </Heading>
            <Text color="gray.300" mb={2}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:info@luxuryverse.com" _hover={{ color: "purple.600" }}>
                info@luxuryverse.com
              </Link>
            </Text>
            <Text color="gray.300">
              <strong>Address:</strong> 599 Broadway, New York, NY 10012, USA
            </Text>
          </Box>
        </Flex>

        {/* Bottom Footer - Copyright and Legal Links */}
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
            © 2025{" "}
            <Link href="https://luxuryverse.com" color="gray.200" _hover={{ color: "purple.600" }}>
              LuxuryVerse
            </Link>
            . All rights reserved.
          </Text>
          <HStack
            spacing={4}
            flexWrap="wrap"
            justify={{ base: "center", md: "flex-end" }}
          >
            <Link href="/privacy-policy" color="gray.400" fontSize="sm" _hover={{ color: "purple.600" }}>
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" color="gray.400" fontSize="sm" _hover={{ color: "purple.600" }}>
              Terms and Conditions
            </Link>
            <Link href="/cookies" color="gray.400" fontSize="sm" _hover={{ color: "purple.600" }}>
              Cookie Policy
            </Link>
            <Link href="/opt-out" color="gray.400" fontSize="sm" _hover={{ color: "purple.600" }}>
              Opt Out
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;