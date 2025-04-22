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
  Grid,
  GridItem,
  Badge,
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
            Authenticity
          </Heading>
          
          <Text fontSize="lg" mb={4}>
            At LuxuryVerse, we are committed to providing authentic luxury experiences both in the physical and digital realms. 
            Our phased approach ensures quality and authenticity across all our offerings.
          </Text>
          
          <Divider />
          
          {/* Digital Collectibles & Technology */}
          <Box w="full" id="digital-collectibles">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Digital Collectibles & Technology
            </Heading>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 1
                </Heading>
              </CardHeader>
              <CardBody>
                <UnorderedList spacing={2}>
                  <ListItem>Software for trading/managing digital currency</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 2
                </Heading>
              </CardHeader>
              <CardBody>
                <UnorderedList spacing={2}>
                  <ListItem>Crypto-collectibles and digital collectibles (downloadable multimedia files)</ListItem>
                  <ListItem>Autographed sports memorabilia authenticated by NFTs</ListItem>
                  <ListItem>Trading cards authenticated by NFTs</ListItem>
                  <ListItem>Downloadable digital media (image, audio, video) featuring artwork and sports memorabilia</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 3
                </Heading>
              </CardHeader>
              <CardBody>
                <UnorderedList spacing={2}>
                  <ListItem>Cryptocurrency hardware wallets</ListItem>
                  <ListItem>Downloadable mobile applications for crypto-collectibles access</ListItem>
                  <ListItem>Mobile apps for NFT and token access</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
          </Box>
          
          <Divider />
          
          {/* Retail Services */}
          <Box w="full" id="retail-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Retail Services
            </Heading>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 1
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontWeight="medium" mb={2}>Online retail store services:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>Eyewear</ListItem>
                  <ListItem>Handbags, purses, luggage</ListItem>
                  <ListItem>Small leather goods</ListItem>
                  <ListItem>Clothing, footwear, headwear</ListItem>
                </UnorderedList>
                <Text mt={4} fontWeight="medium">Other services:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>Wholesale store services for luxury products</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 2
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontWeight="medium" mb={2}>Online retail store services:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>Cosmetics and fragrances</ListItem>
                  <ListItem>Personal care products</ListItem>
                  <ListItem>Virtual versions of luxury items</ListItem>
                  <ListItem>Home goods and furniture</ListItem>
                  <ListItem>Vehicles and accessories</ListItem>
                </UnorderedList>
                <Text mt={4} fontWeight="medium">Other services:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>Physical retail store services for luxury goods</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
          </Box>
          
          <Divider />
          
          {/* Entertainment Services */}
          <Box w="full" id="entertainment-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Entertainment Services
            </Heading>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 2
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontWeight="medium" mb={2}>Non-downloadable virtual goods authenticated by NFTs:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>Virtual art and collectibles</ListItem>
                  <ListItem>Virtual luxury items and fashion</ListItem>
                  <ListItem>Virtual home goods and furniture</ListItem>
                  <ListItem>Virtual vehicles and accessories</ListItem>
                  <ListItem>Virtual environments for entertainment purposes</ListItem>
                </UnorderedList>
                <Text mt={4} fontWeight="medium">Other services:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>Non-downloadable artwork, photographs, videos, and audio</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
          </Box>
          
          <Divider />
          
          {/* Technology Services */}
          <Box w="full" id="technology-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Technology Services
            </Heading>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 1
                </Heading>
              </CardHeader>
              <CardBody>
                <UnorderedList spacing={2}>
                  <ListItem>Website technology for blockchain tokens/cryptocurrencies</ListItem>
                  <ListItem>Technology for purchasing and transferring crypto assets</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 2
                </Heading>
              </CardHeader>
              <CardBody>
                <UnorderedList spacing={2}>
                  <ListItem>Secure electronic systems for NFTs and crypto-collectibles</ListItem>
                  <ListItem>Non-downloadable software for digital currency management</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
            
            <Card variant="outline" mb={6}>
              <CardHeader pb={0}>
                <Heading as="h3" size="md" fontWeight="medium">
                  Phase 3
                </Heading>
              </CardHeader>
              <CardBody>
                <UnorderedList spacing={2}>
                  <ListItem>Platform as a Service (PaaS) for virtual currency and NFTs</ListItem>
                </UnorderedList>
              </CardBody>
            </Card>
          </Box>
          
          <Divider />
          
          {/* Authentication Process */}
          <Box w="full" id="authentication-process">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Authentication Process
            </Heading>
            <Text fontSize="md" mb={4}>
              At LuxuryVerse, we employ rigorous authentication procedures to ensure the legitimacy 
              of all physical items and the security of all digital assets. Our authentication processes include:
            </Text>
            <UnorderedList spacing={3} pl={4}>
              <ListItem>
                <Text fontWeight="medium">Physical Goods Authentication</Text>
                <Text>Each luxury item undergoes thorough examination by category experts.</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="medium">Digital Authentication</Text>
                <Text>Our NFTs and digital collectibles are secured through blockchain technology, providing 
                  immutable proof of ownership and authenticity.</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="medium">Certificate of Authenticity</Text>
                <Text>All items come with appropriate documentation verifying their authenticity.</Text>
              </ListItem>
            </UnorderedList>
          </Box>
          
          <Divider />
          
          {/* Contact Information */}
          <Box w="full" id="contact-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Contact
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions about our authenticity procedures or services, please reach out to us:
            </Text>
            <VStack align="start" spacing={2}>
              <Text><strong>Email:</strong> support@luxuryverse.com</Text>
              <Text><strong>Authentication Inquiries:</strong> authentication@luxuryverse.com</Text>
              <Text><strong>Phone:</strong> +1 (800) LUXURY-V</Text>
              <Text><strong>Hours:</strong> Monday-Friday, 9am-6pm EST</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default AuthenticityPage;