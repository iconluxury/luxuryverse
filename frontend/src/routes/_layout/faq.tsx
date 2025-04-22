import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Container,
  Link,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
} from '@chakra-ui/react';
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/faq')({
  component: FaqPage,
});

function FaqPage() {
  return (
           <Box
              width="100%"
              minH="100vh"
              display="flex"
              flexDirection="column"
              alignItems="center"
              bg="transparent"
            >
<Box display="flex" justifyContent="center">
      <Container maxW="1000px" mx="auto" px={4} py={16} textAlign="center">
        <VStack spacing={8} align="center" w="full">
          {/* Page Header */}
          <Heading as="h1" size="xl" fontWeight="medium">
            Frequently Asked Questions
          </Heading>
          <Text fontSize="lg" mb={4}>
            We are dedicated to delivering transparency and excellence in every aspect of our luxury offerings, 
            from digital collectibles to retail and technology services, ensuring trust in every interaction.
          </Text>
         
          {/* Technology Services */}
          <Box w="full" id="technology-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Technology Services
            </Heading>
            <Text fontSize="md" mb={6} color="gray.300">
              Learn about our advanced blockchain and cryptocurrency solutions.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What technology services are available for blockchain and cryptocurrencies?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    We offer website technology for blockchain tokens and cryptocurrencies, as well as solutions for purchasing and transferring crypto assets.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are there secure systems for NFTs and crypto-collectibles?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Secure electronic systems for NFTs and crypto-collectibles will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Will you offer Platform as a Service (PaaS) for virtual currency?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    PaaS for virtual currency and NFTs will be introduced in Phase 3.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
          {/* Digital Collectibles & Technology */}
          <Box w="full" id="digital-collectibles">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Digital Collectibles & Technology
            </Heading>
            <Text fontSize="md" mb={6} color="gray.300">
              Discover our innovative digital collectibles and technology services.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What are crypto-collectibles and digital collectibles?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    These are downloadable multimedia files (e.g., images, audio, videos) authenticated by NFTs. Available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Do you offer autographed sports memorabilia or trading cards?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Yes, we provide NFT-authenticated autographed sports memorabilia and trading cards, available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    When will cryptocurrency hardware wallets be available?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Cryptocurrency hardware wallets will be introduced in Phase 3.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are there mobile apps for accessing crypto-collectibles?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Downloadable mobile apps for accessing crypto-collectibles and NFTs will be available in Phase 3.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What software is available for digital currency management?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Software for trading and managing digital currency is available in Phase 1. Non-downloadable software for digital currency management will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Retail Services */}
          <Box w="full" id="retail-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Retail Services
            </Heading>
            <Text fontSize="md" mb={6} color="gray.300">
              Explore our curated selection of physical and virtual luxury goods.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What products are available in your online retail store?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Our online store offers eyewear, handbags, purses, luggage, small leather goods, clothing, footwear, and headwear. Cosmetics, fragrances, personal care products, virtual luxury items, home goods, furniture, vehicles, and accessories will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Do you have physical retail stores?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Physical retail stores for luxury goods will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are wholesale services offered?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Wholesale store services for luxury products are available to select partners.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Entertainment Services */}
          <Box w="full" id="entertainment-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Entertainment Services
            </Heading>
            <Text fontSize="md" mb={6} color="gray.300">
              Immerse yourself in our non-downloadable virtual goods and entertainment offerings.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What are non-downloadable virtual goods?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    These include virtual art, collectibles, luxury items, fashion, home goods, furniture, vehicles, and accessories authenticated by NFTs, available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Do you offer virtual environments for entertainment?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Virtual environments for entertainment purposes will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="gray.700">
                <CardHeader pb={0}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are non-downloadable artwork and media available?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.300">
                    Non-downloadable artwork, photographs, videos, and audio will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Contact Information */}
          <Card variant="outline" w="full" borderColor="gray.700">
            <CardHeader pb={0}>
              <Heading as="h2" size="lg" fontWeight="medium">
                Contact Information
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack align="center" spacing={4}>
                <Text fontSize="md" color="gray.300">
                  Have questions? We're here to help. Reach out to us at:
                </Text>
                <Text fontSize="md" color="gray.300">
                  <strong>Email:</strong>{' '}
                  <Link href="mailto:support@luxuryverse.com" color="orange.300">
                    support@luxuryverse.com
                  </Link>
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
      <Footer />
    </Box>
    </Box>
  );
}

export default FaqPage;