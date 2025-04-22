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
              Launch Roadmap
            </Heading>
            
            <Text fontSize="lg" mb={}>
              Launch delivers exclusive weekly drops of in-season, multi-brand luxury products. Gates open, collections sell out, and payments are made seamlessly with crypto. Our phased roadmap builds a revolutionary platform for luxury retail and digital assets.
            </Text>
            
            <Divider />
            
            {/* Roadmap Phases */}
            <Box w="full" id="roadmap-phases">
              <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
                Development Phases
              </Heading>
              <Text fontSize="md" mb={12}>
                From crypto-powered luxury drops to digital collectibles and beyond, our roadmap creates a seamless ecosystem for authentic luxury experiences.
              </Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="start">
                {/* Left Column: Phase 1 */}
                <VStack spacing={12} align="center">
                  {/* Phase 1 */}
                  <Flex direction="column" align="center" position="relative">
                    <Card variant="outline" w="full">
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium">
                          Phase 1: Launch Platform
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Text textAlign="left">
                          - Weekly drops of in-season luxury products<br />
                          - Crypto payments (BTC, ETH, USDC, etc.)<br />
                          - Global shipping for physical goods<br />
                          - Website tech for blockchain transactions<br />
                          - Online retail for eyewear, handbags, clothing
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
                      display={{ base: "none", md: "block" }}
                    >
                      <path
                        d="M12 4V20M12 20L8 16 stretchesM12 20L16 16"
                        stroke="#CBD5E0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Box>
                  </Flex>
                  
                  {/* Phase 3 (replacing Phase 4) */}
                  <Flex direction="column" align="center" position="relative">
                    <Card variant="outline" w="full">
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium">
                          Phase 3: Ecosystem
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Text textAlign="left">
                          - Platform as a Service (PaaS) for NFTs<br />
                          - Virtual environments for entertainment<br />
                          - Non-downloadable software for crypto management<br />
                          - Multi-brand partnerships for exclusive drops<br />
                          - Global luxury marketplace integration
                        </Text>
                      </CardBody>
                    </Card>
                  </Flex>
                </VStack>
                
                {/* Right Column: Phase 4 (replacing Phase 2) */}
                <VStack spacing={12} align="center">
                  {/* Phase 4 */}
                  <Flex direction="column" align="center" position="relative">
                    <Card variant="outline" w="full">
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium">
                          Phase 4: Digital Expansion
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Text textAlign="left">
                          - NFT-authenticated digital collectibles<br />
                          - Virtual luxury items (fashion, art, accessories)<br />
                          - Retail for cosmetics, home goods, vehicles<br />
                          - Physical retail stores for luxury goods<br />
                          - Secure blockchain systems for NFTs
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
                      display={{ base: "none", md: "block" }}
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
                  
                  {/* Phase 2 (replacing Phase 3) */}
                  <Flex direction="column" align="center" position="relative">
                    <Card variant="outline" w="full">
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium">
                          Phase 2: Mobile & Hardware
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <Text textAlign="left">
                          - Mobile apps for drop access and NFT management<br />
                          - Cryptocurrency hardware wallets<br />
                          - Downloadable apps for crypto-collectibles<br />
                          - Enhanced user experience for gates and drops
                        </Text>
                      </CardBody>
                    </Card>
                  </Flex>
                </VStack>
              </SimpleGrid>
            </Box>
            
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default RoadmapPage;