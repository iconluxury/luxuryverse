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
    <Box bg="gray.50" minH="100vh">
      <Container maxW="1200px" mx="auto" px={6} py={12}>
        <VStack spacing={12} align="start" w="full">
          {/* Page Header */}
          <Heading as="h1" size="2xl" fontWeight="bold" color="gray.800">
            Frequently Asked Questions
          </Heading>

          {/* Contact Information */}
          <Card w="full" shadow="md" borderRadius="lg" bg="white" variant="outline">
            <CardHeader pb={2}>
              <Heading as="h2" size="lg" fontWeight="semibold" color="gray.700">
                Contact Information
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={3}>
                <Text fontSize="lg" color="gray.600">
                  Have questions? We're here to help. Reach out to us at:
                </Text>
                <Text fontSize="lg" color="gray.600">
                  <strong>Email:</strong>{' '}
                  <Link href="mailto:support@luxuryverse.com" color="blue.500" fontWeight="medium">
                    support@luxuryverse.com
                  </Link>
                </Text>
              </VStack>
            </CardBody>
          </Card>

          {/* Digital Collectibles & Technology */}
          <Box w="full" id="digital-collectibles">
            <Heading as="h2" size="lg" fontWeight="semibold" mb={6} color="gray.700">
              Digital Collectibles & Technology
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What are crypto-collectibles and digital collectibles?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    These are downloadable multimedia files (e.g., images, audio, videos) authenticated by NFTs. Available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Do you offer autographed sports memorabilia or trading cards?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Yes, we provide NFT-authenticated autographed sports memorabilia and trading cards, available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    When will cryptocurrency hardware wallets be available?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Cryptocurrency hardware wallets will be introduced in Phase 3.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are there mobile apps for accessing crypto-collectibles?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Downloadable mobile apps for accessing crypto-collectibles and NFTs will be available in Phase 3.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What software is available for digital currency management?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Software for trading and managing digital currency is available in Phase 1. Non-downloadable software for digital currency management will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Retail Services */}
          <Box w="full" id="retail-services">
            <Heading as="h2" size="lg" fontWeight="semibold" mb={6} color="gray.700">
              Retail Services
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What products are available in your online retail store?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Our online store offers eyewear, handbags, purses, luggage, small leather goods, clothing, footwear, and headwear. Cosmetics, fragrances, personal care products, virtual luxury items, home goods, furniture, vehicles, and accessories will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Do you have physical retail stores?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Physical retail stores for luxury goods will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are wholesale services offered?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Wholesale store services for luxury products are available to select partners.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Entertainment Services */}
          <Box w="full" id="entertainment-services">
            <Heading as="h2" size="lg" fontWeight="semibold" mb={6} color="gray.700">
              Entertainment Services
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What are non-downloadable virtual goods?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    These include virtual art, collectibles, luxury items, fashion, home goods, furniture, vehicles, and accessories authenticated by NFTs, available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Do you offer virtual environments for entertainment?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Virtual environments for entertainment purposes will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are non-downloadable artwork and media available?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Non-downloadable artwork, photographs, videos, and audio will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Technology Services */}
          <Box w="full" id="technology-services">
            <Heading as="h2" size="lg" fontWeight="semibold" mb={6} color="gray.700">
              Technology Services
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    What technology services are available for blockchain and cryptocurrencies?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    We offer website technology for blockchain tokens and cryptocurrencies, as well as solutions for purchasing and transferring crypto assets.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Are there secure systems for NFTs and crypto-collectibles?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    Secure electronic systems for NFTs and crypto-collectibles will be available in Phase 2.
                  </Text>
                </CardBody>
              </Card>
              <Card shadow="md" borderRadius="lg" bg="white" variant="outline">
                <CardHeader pb={2}>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Will you offer Platform as a Service (PaaS) for virtual currency?
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md" color="gray.600">
                    PaaS for virtual currency and NFTs will be introduced in Phase 3.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default FaqPage;