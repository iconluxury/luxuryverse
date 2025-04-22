import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  HStack,
  VStack,
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
          {/* Navigation Links */}
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
                _hover={{ color: 'gray.400' }}
              >
                {label}
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Bottom Footer - Legal Links and Copyright */}
        <Flex
          justify="center"
          align="center"
          borderTop="1px solid"
          borderColor="gray.700"
          pt={4}
          flexWrap="wrap"
          gap={{ base: 4, md: 4 }}
        >
          <Box width="100%" maxW="80rem">
            {/* Mobile/Tablet Layout (X Pattern) */}
            <VStack
              display={{ base: 'flex', md: 'none' }}
              spacing={4}
              align="center"
              width="100%"
            >
              {/* Top Row: Privacy Policy + Cookie Policy */}
              <HStack
                spacing={{ base: 2, sm: 4 }}
                justify="space-between"
                width="100%"
                maxW={{ base: 'xs', sm: 'sm' }}
              >
                <Link
                  href="/privacy-policy"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Cookie Policy
                </Link>
              </HStack>

              {/* Middle Row: Copyright */}
              <Text
                fontSize="sm"
                color="gray.500"
                lineHeight="1.5"
                fontFamily="'Special Gothic Expanded One', sans-serif"
                textTransform="uppercase"
                textAlign="center"
                width="100%"
              >
                <Link
                  href="https://luxuryverse.com"
                  color="#FF9900"
                  fontSize="sm"
                  lineHeight="1.5"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  LuxuryVerse
                </Link>
                {' '}© 2025
              </Text>

              {/* Bottom Row: Terms and Conditions + Opt Out */}
              <HStack
                spacing={{ base: 2, sm: 4 }}
                justify="space-between"
                width="100%"
                maxW={{ base: 'xs', sm: 'sm' }}
              >
                <Link
                  href="/terms-conditions"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/opt-out"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Opt Out
                </Link>
              </HStack>
            </VStack>

            {/* Desktop Layout */}
            <Flex
              display={{ base: 'none', md: 'flex' }}
              justify="space-between"
              align="baseline"
              flexWrap="wrap"
              gap={{ base: 2, md: 4 }}
            >
              {/* Left Side - Privacy and Cookie Policy */}
              <HStack
                spacing={{ base: 2, md: 4 }}
                justify="flex-start"
                align="baseline"
              >
                <Link
                  href="/privacy-policy"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Cookie Policy
                </Link>
              </HStack>

              {/* Center - Copyright */}
              <Text
                fontSize="sm"
                color="gray.500"
                lineHeight="1.5"
                fontFamily="'Special Gothic Expanded One', sans-serif"
                textTransform="uppercase"
                textAlign="center"
              >
                <Link
                  href="https://luxuryverse.com"
                  color="#FF9900"
                  fontSize="sm"
                  lineHeight="1.5"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  LuxuryVerse
                </Link>
                {' '}© 2025
              </Text>

              {/* Right Side - Terms and Opt Out */}
              <HStack
                spacing={{ base: 2, md: 4 }}
                justify="flex-end"
                align="baseline"
              >
                <Link
                  href="/terms-conditions"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/opt-out"
                  color="gray.400"
                  fontSize="sm"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  lineHeight="1.5"
                  textTransform="uppercase"
                  _hover={{ color: 'white' }}
                >
                  Opt Out
                </Link>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;