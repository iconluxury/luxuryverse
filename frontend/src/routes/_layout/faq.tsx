import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Container,
  Divider,
  Link,
} from '@chakra-ui/react';
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/faq')({
  component: FaqPage,
});

function FaqPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={12} align="start" w="full">
          {/* Page Header */}
          <Heading as="h1" size="xl" fontWeight="medium">
            Frequently Asked Questions
          </Heading>

   
          <Divider />

          {/* Digital Collectibles & Technology */}
          <Box w="full" id="digital-collectibles">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Digital Collectibles & Technology
            </Heading>
            <Text fontSize="md" mb={4}>
              Discover our innovative digital collectibles and technology services.
            </Text>
            <UnorderedList spacing={4}>
              <ListItem>
                <Text fontWeight="bold">
                  What are crypto-collectibles and digital collectibles?
                </Text>
                <Text>
                  These are downloadable multimedia files (e.g., images, audio, videos) authenticated by NFTs. Available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Do you offer autographed sports memorabilia or trading cards?
                </Text>
                <Text>
                  Yes, we provide NFT-authenticated autographed sports memorabilia and trading cards, available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  When will cryptocurrency hardware wallets be available?
                </Text>
                <Text>
                  Cryptocurrency hardware wallets will be introduced in Phase 3.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Are there mobile apps for accessing crypto-collectibles?
                </Text>
                <Text>
                  Downloadable mobile apps for accessing crypto-collectibles and NFTs will be available in Phase 3.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  What software is available for digital currency management?
                </Text>
                <Text>
                  Software for trading and managing digital currency is available in Phase 1. Non-downloadable software for digital currency management will be available in Phase 2.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>

          <Divider />

          {/* Retail Services */}
          <Box w="full" id="retail-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Retail Services
            </Heading>
            <Text fontSize="md" mb={4}>
              Explore our curated selection of physical and virtual luxury goods.
            </Text>
            <UnorderedList spacing={4}>
              <ListItem>
                <Text fontWeight="bold">
                  What products are available in your online retail store?
                </Text>
                <Text>
                  Our online store offers eyewear, handbags, purses, luggage, small leather goods, clothing, footwear, and headwear. Cosmetics, fragrances, personal care products, virtual luxury items, home goods, furniture, vehicles, and accessories will be available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Do you have physical retail stores?
                </Text>
                <Text>
                  Physical retail stores for luxury goods will be available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Are wholesale services offered?
                </Text>
                <Text>
                  Wholesale store services for luxury products are available to select partners.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>

          <Divider />

          {/* Entertainment Services */}
          <Box w="full" id="entertainment-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Entertainment Services
            </Heading>
            <Text fontSize="md" mb={4}>
              Immerse yourself in our non-downloadable virtual goods and entertainment offerings.
            </Text>
            <UnorderedList spacing={4}>
              <ListItem>
                <Text fontWeight="bold">
                  What are non-downloadable virtual goods?
                </Text>
                <Text>
                  These include virtual art, collectibles, luxury items, fashion, home goods, furniture, vehicles, and accessories authenticated by NFTs, available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Do you offer virtual environments for entertainment?
                </Text>
                <Text>
                  Virtual environments for entertainment purposes will be available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Are non-downloadable artwork and media available?
                </Text>
                <Text>
                  Non-downloadable artwork, photographs, videos, and audio will be available in Phase 2.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>

          <Divider />

          {/* Technology Services */}
          <Box w="full" id="technology-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Technology Services
            </Heading>
            <Text fontSize="md" mb={4}>
              Learn about our advanced blockchain and cryptocurrency solutions.
            </Text>
            <UnorderedList spacing={4}>
              <ListItem>
                <Text fontWeight="bold">
                  What technology services are available for blockchain and cryptocurrencies?
                </Text>
                <Text>
                  We offer website technology for blockchain tokens and cryptocurrencies, as well as solutions for purchasing and transferring crypto assets.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Are there secure systems for NFTs and crypto-collectibles?
                </Text>
                <Text>
                  Secure electronic systems for NFTs and crypto-collectibles will be available in Phase 2.
                </Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">
                  Will you offer Platform as a Service (PaaS) for virtual currency?
                </Text>
                <Text>
                  PaaS for virtual currency and NFTs will be introduced in Phase 3.
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>

          <Divider />
       {/* Contact Information */}
       <Box w="full" id="contact-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Contact Information
            </Heading>
            <Text fontSize="md" mb={4}>
              Have questions? We're here to help. Reach out to us at:
            </Text>
            <Text>
              <strong>Email:</strong>{' '}
              <Link href="mailto:support@luxuryverse.com" color="blue.600">
                support@luxuryverse.com
              </Link>
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default FaqPage;