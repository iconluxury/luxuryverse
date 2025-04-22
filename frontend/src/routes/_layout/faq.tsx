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
  Link
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/faq')({
  component: FaqPage,
});

function FaqPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            FAQ
          </Heading>

          {/* Contact Information */}
          <Box w="full" id="contact-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Contact
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions, please reach out to us:
            </Text>
            <Text><strong>Email:</strong> support@luxuryverse.com</Text>
          </Box>

          {/* Digital Collectibles & Technology */}
          <Box w="full" id="digital-collectibles">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Digital Collectibles & Technology
            </Heading>
            <Text fontSize="md" mb={4">
              Learn more about our offerings in digital collectibles and technology services.
            </Text>
            <UnorderedList spacing={3}>
              <ListItem>
                <Text><strong>What are crypto-collectibles and digital collectibles?</strong></Text>
                <Text>These are downloadable multimedia files, such as images, audio, or videos, authenticated by NFTs. Available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Do you offer autographed sports memorabilia or trading cards?</strong></Text>
                <Text>Yes, we provide autographed sports memorabilia and trading cards authenticated by NFTs, available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>When will cryptocurrency hardware wallets be available?</strong></Text>
                <Text>Cryptocurrency hardware wallets will be introduced in Phase 3.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Are there mobile apps for accessing crypto-collectibles?</strong></Text>
                <Text>Downloadable mobile applications for accessing crypto-collectibles and NFTs will be available in Phase 3.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>What software is available for digital currency management?</strong></Text>
                <Text>Software for trading and managing digital currency is currently available in Phase 1, with non-downloadable software for digital currency management coming in Phase 2.</Text>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* Retail Services */}
          <Box w="full" id="retail-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Retail Services
            </Heading>
            <Text fontSize="md" mb={4">
              Explore our retail offerings for physical and virtual luxury goods.
            </Text>
            <UnorderedList spacing={3}>
              <ListItem>
                <Text><strong>What products are available in your online retail store?</strong></Text>
                <Text>Our online retail store offers eyewear, handbags, purses, luggage, small leather goods, clothing, footwear, and headwear in Phase 1. Cosmetics, fragrances, personal care products, virtual luxury items, home goods, furniture, vehicles, and accessories will be available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Do you have physical retail stores?</strong></Text>
                <Text>Physical retail store services for luxury goods will be available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Are wholesale services offered?</strong></Text>
                <Text>Wholesale store services for luxury products are available in Phase 1.</Text>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* Entertainment Services */}
          <Box w="full" id="entertainment-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Entertainment Services
            </Heading>
            <Text fontSize="md" mb={4">
              Discover our non-downloadable virtual goods and entertainment offerings.
            </Text>
            <UnorderedList spacing={3}>
              <ListItem>
                <Text><strong>What are non-downloadable virtual goods?</strong></Text>
                <Text>These include virtual art, collectibles, luxury items, fashion, home goods, furniture, vehicles, and accessories authenticated by NFTs, available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Do you offer virtual environments for entertainment?</strong></Text>
                <Text>Virtual environments for entertainment purposes will be available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Are non-downloadable artwork and media available?</strong></Text>
                <Text>Non-downloadable artwork, photographs, videos, and audio will be available in Phase 2.</Text>
              </ListItem>
            </UnorderedList>
          </Box>

          {/* Technology Services */}
          <Box w="full" id="technology-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Technology Services
            </Heading>
            <Text fontSize="md" mb={4">
              Learn about our blockchain and cryptocurrency technology solutions.
            </Text>
            <UnorderedList spacing={3}>
              <ListItem>
                <Text><strong>What technology services are available for blockchain and cryptocurrencies?</strong></Text>
                <Text>Website technology for blockchain tokens and cryptocurrencies, as well as technology for purchasing and transferring crypto assets, are available in Phase 1.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Are there secure systems for NFTs and crypto-collectibles?</strong></Text>
                <Text>Secure electronic systems for NFTs and crypto-collectibles will be available in Phase 2.</Text>
              </ListItem>
              <ListItem>
                <Text><strong>Will you offer Platform as a Service (PaaS) for virtual currency?</strong></Text>
                <Text>PaaS for virtual currency and NFTs will be introduced in Phase 3.</Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default FaqPage;