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
  Card,
  CardHeader,
  CardBody
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/authenticity')({
  component: AuthenticityPage,
});

function AuthenticityPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Authenticity at LuxuryVerse
          </Heading>
          
          <Text fontSize="lg" mb={4}>
            At LuxuryVerse, authenticity is the cornerstone of our commitment to delivering unparalleled luxury 
            experiences in both physical and digital realms. We ensure the legitimacy of every item and the 
            security of every digital asset through rigorous processes and cutting-edge technology.
          </Text>
          
          <Divider />
          
          {/* Authentication Process */}
          <Box w="full" id="authentication-process">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Our Authentication Process
            </Heading>
            <Text fontSize="md" mb={4}>
              We employ meticulous authentication procedures to guarantee the authenticity of all products 
              and the integrity of digital assets. Our processes include:
            </Text>
            <Card variant="outline" mb={6}>
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
            <Text fontSize="md" mb={4}>
              LuxuryVerse is dedicated to building trust through transparency and excellence. Our 
              authentication processes are designed to provide peace of mind, whether you're acquiring 
              a physical luxury item or a digital collectible. For a detailed overview of our phased 
              approach to delivering authentic luxury experiences, visit our{' '}
              <Text as="span" color="blue.600" textDecor="underline">
                Roadmap
              </Text>.
            </Text>
            <UnorderedList spacing={3} pl={4}>
              <ListItem>
                <Text fontWeight="medium">Transparency</Text>
                <Text>We provide clear documentation and blockchain-based records for all items.</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="medium">Expertise</Text>
                <Text>Our team of specialists ensures every item meets the highest standards of quality.</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="medium">Innovation</Text>
                <Text>We leverage blockchain and NFT technology to pioneer secure digital luxury.</Text>
              </ListItem>
            </UnorderedList>
          </Box>
          
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default AuthenticityPage;