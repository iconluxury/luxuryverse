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
    <Box bg="rgba(10, 10, 10, 0.5)" color="white" py={6} backdropFilter="blur(5px)" width="100%">
      <Box maxW="80rem" mx="auto" px={{ base: 4, md: 8 }}>
        {/* Main Footer Content */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="flex-start"
          align="flex-start"
          mb={6}
          textAlign="left"
          gap={{ base: 6, md: 4 }}
        >
          {/* Left Section: Company Info and Links */}
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 12 }}
            align="flex-start"
            flex="2"
          >
            {/* Company Information */}
            <Box maxW={{ base: "100%", md: "400px" }}>
              <Heading
                as="h4"
                size="xs"
                fontSize={{ base: '0.5rem', md: '0.875rem' }}
                color="white"
                fontFamily="'Special Gothic Expanded One', sans-serif"
                lineHeight="1.1"
                mb={4}
              >
                <Link href="https://luxuryverse.com" _hover={{ color: "#E0E0E0" }}>
                  <Flex flexDir="column" align="flex-start" gap={0}>
                    <span>Luxury</span>
                    <span>Verse</span>
                  </Flex>
                </Link>
              </Heading>
              <Text color="gray.400" fontSize="sm">
                Defining luxury through innovation, authenticity, and global connectivity. Join us in shaping the future of exclusivity.
              </Text>
            </Box>

            {/* Links (No Explore Title) */}
            <Box>
              <HStack spacing={4} justify="flex-start">
                <Link
                  href="/faq"
                  color="white"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  fontWeight="normal"
                  textTransform="uppercase"
                  _hover={{ color: "#E0E0E0" }}
                >
                  FAQ
                </Link>
              </HStack>
            </Box>
          </Flex>
        </Flex>

        {/* Bottom Footer - Copyright and Legal Links */}
        <Flex
          justify="flex-start"
          align="center"
          borderTop="1px solid"
          borderColor="gray.700"
          pt={4}
          flexWrap="wrap"
          gap={4}
          textAlign="left"
        >
          <Text color="gray.400" fontSize="sm">
            © 2025{" "}
            <Link href="https://luxuryverse.com" color="gray.200" _hover={{ color: "#E0E0E0" }}>
              LuxuryVerse
            </Link>
            . All rights reserved.
          </Text>
          <HStack spacing={4} justify="flex-start">
            <Link
              href="/privacy-policy"
              color="gray.400"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              _hover={{ color: "#E0E0E0" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              color="gray.400"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              _hover={{ color: "#E0E0E0" }}
            >
              Terms and Conditions
            </Link>
            <Link
              href="/cookies"
              color="gray.400"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              _hover={{ color: "#E0E0E0" }}
            >
              Cookie Policy
            </Link>
            <Link
              href="/opt-out"
              color="gray.400"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              _hover={{ color: "#E0E0E0" }}
            >
              Opt Out
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;