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
  SimpleGrid
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/authenticity')({
  component: AuthenticityPage,
});

function AuthenticityPage() {
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
            Authenticity
          </Heading>
          
          <Text fontSize="lg" mb={4}>
            Authenticity is the cornerstone of our commitment to delivering unparalleled luxury 
            experiences in both physical and digital realms. We ensure the legitimacy of every item and the 
            security of every digital asset through rigorous processes and cutting-edge technology.
          </Text>
          
          <Divider />
          
          {/* Authentication Process */}
          <Box w="full" id="authentication-process">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Our Authentication Process
            </Heading>
            <Text fontSize="md" mb={12}>
              We employ meticulous authentication procedures to guarantee the authenticity of all products 
              and the integrity of digital assets.
            </Text>
            <Card variant="outline" mb={6}  bg="gray.900" >
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Physical Goods Authentication
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Every luxury item is thoroughly examined by category experts using advanced techniques 
                  to verify materials, craftsmanship, and provenance.
                </Text>
              </CardBody>
            </Card>
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Digital Authentication
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Our NFTs and digital collectibles are secured through blockchain technology, ensuring 
                  immutable proof of ownership and authenticity for every digital asset.
                </Text>
              </CardBody>
            </Card>
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Certificate of Authenticity
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  All physical and digital items are accompanied by comprehensive documentation, 
                  including certificates of authenticity, to verify their legitimacy.
                </Text>
              </CardBody>
            </Card>
          </Box>
          
          <Divider />
          
          {/* Commitment to Authenticity */}
          <Box w="full" id="commitment-to-authenticity">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Our Commitment to You
            </Heading>
            <Text fontSize="md" mb={12}>
              We are dedicated to building trust through transparency and excellence. Our 
              authentication processes are designed to provide peace of mind, whether you're acquiring 
              a physical luxury item or a digital collectible.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Card variant="outline" bg="gray.900">
                <CardHeader>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Transparency
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    We provide clear documentation and blockchain-based records for all items to ensure full traceability.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" bg="gray.900">
                <CardHeader>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Expertise
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    Our team of specialists ensures every item meets the highest standards of quality and authenticity.
                  </Text>
                </CardBody>
              </Card>
              <Card variant="outline" bg="gray.900">
                <CardHeader>
                  <Heading as="h3" size="md" fontWeight="medium">
                    Innovation
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    We leverage blockchain and NFT technology to pioneer secure and authentic digital luxury experiences.
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

export default AuthenticityPage;