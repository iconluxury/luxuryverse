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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
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
            
            <Accordion allowMultiple w="full" mb={6}>
              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 1
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={2}>
                    <ListItem>Software for trading/managing digital currency</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 2
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={2}>
                    <ListItem>Crypto-collectibles and digital collectibles (downloadable multimedia files)</ListItem>
                    <ListItem>Autographed sports memorabilia authenticated by NFTs</ListItem>
                    <ListItem>Trading cards authenticated by NFTs</ListItem>
                    <ListItem>Downloadable digital media (image, audio, video) featuring artwork and sports memorabilia</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 3
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={2}>
                    <ListItem>Cryptocurrency hardware wallets</ListItem>
                    <ListItem>Downloadable mobile applications for crypto-collectibles access</ListItem>
                    <ListItem>Mobile apps for NFT and token access</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          
          <Divider />
          
          {/* Retail Services */}
          <Box w="full" id="retail-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Retail Services
            </Heading>
            
            <Accordion allowMultiple w="full" mb={6}>
              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 1
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
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
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 2
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
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
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          
          <Divider />
          
          {/* Entertainment Services */}
          <Box w="full" id="entertainment-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Entertainment Services
            </Heading>
            
            <Accordion allowMultiple w="full" mb={6}>
              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 2
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
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
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          
          <Divider />
          
          {/* Technology Services */}
          <Box w="full" id="technology-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Technology Services
            </Heading>
            
            <Accordion allowMultiple w="full" mb={6}>
              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 1
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={2}>
                    <ListItem>Website technology for blockchain tokens/cryptocurrencies</ListItem>
                    <ListItem>Technology for purchasing and transferring crypto assets</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 2
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={2}>
                    <ListItem>Secure electronic systems for NFTs and crypto-collectibles</ListItem>
                    <ListItem>Non-downloadable software for digital currency management</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium" fontSize="md">
                      Phase 3
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={2}>
                    <ListItem>Platform as a Service (PaaS) for virtual currency and NFTs</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
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
        
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default AuthenticityPage;