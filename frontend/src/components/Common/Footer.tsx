import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  HStack,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="black.900" color="white" py={6} width="100%">
      <Box maxW="80rem" mx="auto" px={{ base: 4, md: 8 }}>
        {/* Main Footer Content */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          mb={6}
          textAlign="center"
          gap={4}
        >
          {/* Navigation Links (First Row) */}
          <HStack
            spacing={{ base: 2, md: 4 }}
            flexWrap="wrap"
            justify="center"
          >
            {[
              { to: '/', label: 'Home' },
              { to: '/roadmap', label: 'Roadmap' },
              { to: '/authenticity', label: 'Authenticity' },
              { to: '/faq', label: 'FAQ' },
              { to: '/contact', label: 'Contact' },
              { to: '/collections', label: 'Shop' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                href={to}
                color="white"
                fontFamily="'Special Gothic Expanded One', sans-serif"
                fontWeight="normal"
                textTransform="uppercase"
                fontSize={{ base: '0.75rem', md: '0.875rem' }}
                _hover={{ color: 'gray.200' }}
              >
                {label}
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Bottom Footer - Legal Links and Copyright */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          borderTop="1px solid"
          borderColor="gray.700"
          pt={4}
          gap={4}
        >
          {/* Legal Links (Second Row) */}
          <HStack
            spacing={{ base: 2, md: 4 }}
            flexWrap="wrap"
            justify="center"
            align="baseline"
          >
            <Link
              href="/privacy-policy"
              color="gray.200"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              lineHeight="1.5"
              _hover={{ color: 'white' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              color="gray.200"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              lineHeight="1.5"
              _hover={{ color: 'white' }}
            >
              Terms and Conditions
            </Link>
            <Link
              href="/cookies"
              color="gray.200"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              lineHeight="1.5"
              _hover={{ color: 'white' }}
            >
              Cookie Policy
            </Link>
            <Link
              href="/opt-out"
              color="gray.200"
              fontSize="sm"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              lineHeight="1.5"
              _hover={{ color: 'white' }}
            >
              Opt Out
            </Link>
          </HStack>

          {/* Copyright Notice (Third Row) */}
          <Text
            fontSize="sm"
            lineHeight="1.5"
            fontFamily="'Special Gothic Expanded One', sans-serif"
            display="flex"
            alignItems="baseline"
          >
            <Box as="span" color="gray.500">
              © 2025
            </Box>
            <Link
              href="https://luxuryverse.com"
              color="green.500"
              fontSize="sm"
              lineHeight="1.5"
              fontFamily="'Special Gothic Expanded One', sans-serif"
              _hover={{ color: 'white' }}
              mx={1}
            >
              LuxuryVerse
            </Link>
            <Box as="span" color="gray.500">
              . All rights reserved.
            </Box>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;