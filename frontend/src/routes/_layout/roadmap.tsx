import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Heading, 
  Text, 
  VStack,
  Container,
  Divider,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/roadmap')({
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <Box
      width="100%"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="black.900"
    >
      <Box display="flex" justifyContent="center">
        <Container maxW="1000px" px={4} py={16} color="gray.800" textAlign="center">
          <VStack spacing={8} align="center" w="full">
            <Heading as="h1" size="xl" fontWeight="medium">
              Our Roadmap
            </Heading>
            
            <Text fontSize="lg" mb={4}>
              Our phased approach to revolutionizing luxury experiences through physical and digital authenticity. 
              Explore our strategic roadmap across technology, retail, and entertainment services.
            </Text>
            
            <Divider />
            
            {/* Roadmap Phases */}
            <Box w="full" id="roadmap-phases">
              <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
                Development Phases
              </Heading>
              <Text fontSize="md" mb={12}>
                We are building a seamless ecosystem for authentic luxury goods and digital collectibles, 
                with each phase introducing new capabilities and offerings.
              </Text>
              
              {/* Phase 1 */}
              <Flex direction="column" align="center" position="relative" mb={12}>
                <Card variant="outline" mb={6} w="full">
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium">
                      Phase 1: Foundation
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      - Software for trading/managing digital currency<br />
                      - Website technology for blockchain tokens/cryptocurrencies<br />
                      - Technology for purchasing and transferring crypto assets<br />
                      - Online retail for eyewear, handbags, purses, luggage, small leather goods, clothing, footwear, headwear<br />
                      - Wholesale store services for luxury products
                    </Text>
                  </CardBody>
                </Card>
                <Box
                  as="svg"
                  width="40px"
                  height="60px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V20M12 20L8 16M12 20L16 16"
                    stroke="#CBD5E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Box>
              </Flex>
              
              {/* Phase 2 */}
              <Flex direction="column" align="center" position="relative" mb={12}>
                <Card variant="outline" mb={6} w="full">
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium">
                      Phase 2: Expansion
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      - Crypto-collectibles and digital collectibles (downloadable multimedia files)<br />
                      - Autographed sports memorabilia and trading cards authenticated by NFTs<br />
                      - Downloadable digital media (image, audio, video) featuring artwork and sports memorabilia<br />
                      - Online retail for cosmetics, fragrances, personal care products, home goods, furniture, vehicles, and accessories<br />
                      - Physical retail store services for luxury goods<br />
                      - Non-downloadable virtual goods authenticated by NFTs (art, collectibles, luxury items, fashion, home goods, vehicles)<br />
                      - Non-downloadable artwork, photographs, videos, and audio<br />
                      - Virtual environments for entertainment purposes<br />
                      - Secure electronic systems for NFTs and crypto-collectibles<br />
                      - Non-downloadable software for digital currency management
                    </Text>
                  </CardBody>
                </Card>
                <Box
                  as="svg"
                  width="40px"
                  height="60px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V20M12 20L8 16M12 20L16 16"
                    stroke="#CBD5E0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Box>
              </Flex>
              
              {/* Phase 3 */}
              <Flex direction="column" align="center" position="relative">
                <Card variant="outline" mb={6} w="full">
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium">
                      Phase 3: Innovation
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      - Cryptocurrency hardware wallets<br />
                      - Downloadable mobile applications for crypto-collectibles access<br />
                      - Mobile apps for NFT and token access<br />
                      - Platform as a Service (PaaS) for virtual currency and NFTs
                    </Text>
                  </CardBody>
                </Card>
              </Flex>
            </Box>
            
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default RoadmapPage;