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
            
            <Text fontSize="lg" mb={4}>
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
                {/* Left Column: Phase 1 and Phase 2 */}
                <VStack spacing={12} align="center">
                  {/* Phase 1 */}
                  <Flex direction="column" align="center" position="relative">
                    <Card variant="outline" bg="gray.900" w="full" minH="250px">
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
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
                        d="M12 4V20M12 20L8 16M12 20L16 16"
                        stroke="#CBD5E0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Box>
                  </Flex>
                  
                  {/* Phase 2 */}
                  <Flex direction="column" align="center" position="relative">
                    <Card variant="outline" bg="gray.900" w="full" minH="250px">
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
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
                
                {/* Right Column: Phase 3 and Phase 4 */}
                <VStack spacing={12} align="center">
                  {/* Phase 3 and Phase 4 in a horizontal Flex */}
                  <Flex direction={{ base: "column", md: "row" }} align="center" position="relative" w="full">
                    {/* Phase 3 */}
                    <Card variant="outline" bg="gray.900" w="full" minH="250px" mr={{ base: 0, md: 6 }}>
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
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
                    
                    {/* Horizontal Arrow */}
                    <Box
                      as="svg"
                      width="60px"
                      height="40px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      display={{ base: "none", md: "block" }}
                    >
                      <path
                        d="M4 12H20M20 12L16 8M20 12L16 16"
                        stroke="#CBD5E0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Box>
                    
                    {/* Phase 4 */}
                    <Card variant="outline" bg="gray.900" w="full" minH="250px" mt={{ base: 6, md: 0 }}>
                      <CardHeader pb={0}>
                        <Heading as="h3" size="md" fontWeight="medium" color="gray.400" text iron="true" textTransform="uppercase">
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