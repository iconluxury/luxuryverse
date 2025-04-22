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
              
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} alignItems="stretch">
                {/* Phase 1 */}
                <Card 
                  variant="outline" 
                  bg="gray.900" 
                  w="full" 
                  height="300px" 
                  display="flex" 
                  flexDirection="column"
                >
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
                      Phase 1: Launch Platform
                    </Heading>
                  </CardHeader>
                  <CardBody flex="1" display="flex" alignItems="flex-start">
                    <Text textAlign="left">
                      - Weekly drops of in-season luxury products<br />
                      - Crypto payments (BTC, ETH, USDC, etc.)<br />
                      - Global shipping for physical goods<br />
                      - Website tech for blockchain transactions<br />
                      - Online retail for eyewear, handbags, clothing
                    </Text>
                  </CardBody>
                </Card>
                
                {/* Phase 2 */}
                <Card 
                  variant="outline" 
                  bg="gray.900" 
                  w="full" 
                  height="300px" 
                  display="flex" 
                  flexDirection="column"
                >
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
                      Phase 2: Mobile & Hardware
                    </Heading>
                  </CardHeader>
                  <CardBody flex="1" display="flex" alignItems="flex-start">
                    <Text textAlign="left">
                      - Mobile apps for drop access and NFT management<br />
                      - Cryptocurrency hardware wallets<br />
                      - Downloadable apps for crypto-collectibles<br />
                      - Enhanced user experience for gates and drops
                    </Text>
                  </CardBody>
                </Card>
                
                {/* Phase 3 */}
                <Card 
                  variant="outline" 
                  bg="gray.900" 
                  w="full" 
                  height="300px" 
                  display="flex" 
                  flexDirection="column"
                >
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
                      Phase 3: Ecosystem
                    </Heading>
                  </CardHeader>
                  <CardBody flex="1" display="flex" alignItems="flex-start">
                    <Text textAlign="left">
                      - Platform as a Service (PaaS) for NFTs<br />
                      - Virtual environments for entertainment<br />
                      - Non-downloadable software for crypto management<br />
                      - Multi-brand partnerships for exclusive drops<br />
                      - Global luxury marketplace integration
                    </Text>
                  </CardBody>
                </Card>
                
                {/* Phase 4 */}
                <Card 
                  variant="outline" 
                  bg="gray.900" 
                  w="full" 
                  height="300px" 
                  display="flex" 
                  flexDirection="column"
                >
                  <CardHeader pb={0}>
                    <Heading as="h3" size="md" fontWeight="medium" color="gray.400" textTransform="uppercase">
                      Phase 4: Digital Expansion
                    </Heading>
                  </CardHeader>
                  <CardBody flex="1" display="flex" alignItems="flex-start">
                    <Text textAlign="left">
                      - NFT-authenticated digital collectibles<br />
                      - Virtual luxury items (fashion, art, accessories)<br />
                      - Retail for cosmetics, home goods, vehicles<br />
                      - Physical retail stores for luxury goods<br />
                      - Secure blockchain systems for NFTs
                    </Text>
                  </CardBody>
                </Card>
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