import { Box, Flex, Heading, Text, VStack, Button, Link, SimpleGrid, Icon, HStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import Footer from '../../components/Common/Footer';
import { PhoneIcon, EmailIcon, InfoIcon, CheckIcon, TimeIcon, AtSignIcon, ChatIcon } from '@chakra-ui/icons';
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/contact")({
  component: ContactPage,
});

function ContactPage() {
  const navigate = useNavigate();

  const handleContactSales = () => {
    navigate({ to: "/contact-sales" });
  };

  const officeLocations = [
    {
      city: "New York",
      address: "500 7th Avenue, 8th Floor, New York, NY 10018",
      phone: "+1 (855) 440-2242",
      email: "nyc@luxuryverse.com"
    },
    {
      city: "San Francisco",
      address: "535 Mission Street, 14th Floor, San Francisco, CA 94105",
      phone: "+1 (415) 555-1234",
      email: "sf@luxuryverse.com"
    },
    {
      city: "London",
      address: "201 Borough High Street, London SE1 1JA, UK",
      phone: "+44 20 7946 0958",
      email: "london@luxuryverse.com"
    }
  ];

  const contactCategories = [
    { category: "Sales Inquiries", description: "Questions about our products, pricing, and enterprise solutions", icon: InfoIcon },
    { category: "Technical Support", description: "Help with existing services, troubleshooting, and implementation", icon: CheckIcon },
    { category: "Partnership Opportunities", description: "Explore strategic partnerships and integration possibilities", icon: ChatIcon },
    { category: "Press & Media", description: "Media inquiries, press releases, and company information", icon: AtSignIcon }
  ];

  return (
    <>
      {/* Contact Hero Section */}
      <Box py={16} bg="red.50" color="gray.800">
        <Box maxW="1200px" mx="auto" px={4}>
          <Heading as="h1" size="2xl" textAlign="center" mb={8} fontWeight="medium">
            Contact Us
          </Heading>
          <Text fontSize="xl" textAlign="center" mb={8} maxW="800px" mx="auto">
            Have questions or need assistance? Reach out to our team through any of our contact channels.
            We're here to help you succeed.
          </Text>
          
          <Flex justify="space-between" flexWrap="wrap" gap={6}>
            <VStack flex="1" minW="280px" align="flex-start" bg="white" p={6} borderRadius="md" spacing={4}>
              <EmailIcon boxSize={6} color="red.600" />
              <Heading as="h3" size="md" color="red.600">Email Us</Heading>
              <Text>Send us a message anytime and we'll respond within 4 business hours.</Text>
              <Link href="mailto:support@luxuryverse.com" color="red.600">support@luxuryverse.com</Link>
            </VStack>
            
            <VStack flex="1" minW="280px" align="flex-start" bg="white" p={6} borderRadius="md" spacing={4}>
              <PhoneIcon boxSize={6} color="red.600" />
              <Heading as="h3" size="md" color="red.600">Call Us</Heading>
              <Text>Speak directly with our team during business hours.</Text>
              <Link href="tel:+18554402242" color="red.600">+1 (855) 440-2242</Link>
            </VStack>
            
            <VStack flex="1" minW="280px" align="flex-start" bg="white" p={6} borderRadius="md" spacing={4}>
              <TimeIcon boxSize={6} color="red.600" />
              <Heading as="h3" size="md" color="red.600">Business Hours</Heading>
              <Text>Mon-Fri: 9am - 8pm (EST)</Text>
              <Text>Weekend: Closed (Email support available)</Text>
            </VStack>
          </Flex>
        </Box>
      </Box>
      
      {/* Contact Options Section (Replacing Form) */}
      {/* <Box py={16} bg="white">
        <Box maxW="1200px" mx="auto" p={6} px={4}>
          <Heading as="h2" size="xl" textAlign="center" mb={6} fontWeight="medium">
            Get in Touch
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={8} maxW="700px" mx="auto">
            Choose how you'd like to connect with our team. We're ready to assist you with any questions or needs.
          </Text>
          
          <Flex justifyContent="center" gap={8} flexWrap="wrap" mt={10}>
            <VStack 
              p={8} 
              bg="red.50" 
              borderRadius="md" 
              boxShadow="sm" 
              spacing={5} 
              align="center"
              minW="300px"
            >
              <Box bg="red.100" p={4} borderRadius="full">
                <EmailIcon boxSize={8} color="red.600" />
              </Box>
              <Heading as="h3" size="lg" fontWeight="medium">
                Contact Sales
              </Heading>
              <Text textAlign="center" fontSize="md">
                Speak with our sales team about products, pricing, and custom solutions for your business.
              </Text>
              <Button 
                colorScheme="blue" 
                size="lg"
                width="full"
                onClick={handleContactSales}
              >
                Contact Sales
              </Button>
            </VStack>
            
            <VStack 
              p={8} 
              bg="red.50" 
              borderRadius="md" 
              boxShadow="sm" 
              spacing={5} 
              align="center"
              minW="300px"
            >
              <Box bg="red.100" p={4} borderRadius="full">
                <PhoneIcon boxSize={8} color="red.600" />
              </Box>
              <Heading as="h3" size="lg" fontWeight="medium">
                Call Us
              </Heading>
              <Text textAlign="center" fontSize="md">
                Speak directly with our support team during business hours for immediate assistance.
              </Text>
              <Button 
                as="a"
                href="tel:+18554402242"
                colorScheme="blue" 
                size="lg"
                width="full"
              >
                Call Now
              </Button>
            </VStack>
          </Flex>
        </Box>
      </Box> */}
      
      {/* Contact Categories Section */}
      <Box py={16} bg="red.50">
        <Box maxW="1200px" mx="auto" px={4}>
          <Heading as="h2" size="xl" textAlign="center" mb={4} fontWeight="medium">
            How Can We Help You?
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={12} maxW="700px" mx="auto">
            Select the category that best matches your needs for more specialized assistance
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {contactCategories.map((category, index) => (
              <VStack 
                key={index} 
                p={6} 
                bg="white" 
                borderRadius="md" 
                boxShadow="sm" 
                spacing={4} 
                align="flex-start"
              >
                <Box bg="red.50" p={3} borderRadius="md">
                  <Icon as={category.icon} boxSize={6} color="red.600" />
                </Box>
                <Heading as="h3" size="md" fontWeight="medium">
                  {category.category}
                </Heading>
                <Text color="gray.600">
                  {category.description}
                </Text>
                <HStack spacing={4}>
                  <Button 
                    as="a"
                    href="/contact-sales"
                    colorScheme="red" 
                    variant="link" 
                    rightIcon={<EmailIcon />}
                  >
                    Email
                  </Button>
                  <Button 
                    as="a"
                    href="tel:+18554402242"
                    colorScheme="red" 
                    variant="link" 
                    rightIcon={<PhoneIcon />}
                  >
                    Call
                  </Button>
                </HStack>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      
      {/* Stats Section */}
      {/* <Box py={16} bg="white">
        <Box maxW="1200px" mx="auto" px={4} textAlign="center">
          <Heading as="h2" size="xl" mb={8} fontWeight="medium">
            We're Here For You
          </Heading>
          <Text fontSize="lg" mb={12} maxW="700px" mx="auto">
            Our dedicated team is committed to providing exceptional service and support
          </Text>
          
          <Box bg="red.50" p={8} borderRadius="md" boxShadow="md">
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              <VStack>
                <Heading as="h3" size="lg" color="red.600">4 hrs</Heading>
                <Text fontWeight="medium">Email Response</Text>
                <Text fontSize="sm" color="gray.600">Average reply time</Text>
              </VStack>
              <VStack>
                <Heading as="h3" size="lg" color="red.600">3 mins</Heading>
                <Text fontWeight="medium">Phone Wait Time</Text>
                <Text fontSize="sm" color="gray.600">During business hours</Text>
              </VStack>
              <VStack>
                <Heading as="h3" size="lg" color="red.600">96%</Heading>
                <Text fontWeight="medium">Resolution Rate</Text>
                <Text fontSize="sm" color="gray.600">First contact resolution</Text>
              </VStack>
              <VStack>
                <Heading as="h3" size="lg" color="red.600">24/7</Heading>
                <Text fontWeight="medium">Online Support</Text>
                <Text fontSize="sm" color="gray.600">Email & documentation</Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </Box>
      </Box> */}
    
      
      {/* Call to Action */}
      <Box py={16} bg="red.600" color="white">
        <Box maxW="1200px" mx="auto" px={4} textAlign="center">
          <Heading as="h2" size="xl" mb={6} fontWeight="medium" color="white">
            Ready to Get Started?
          </Heading>
          <Text fontSize="lg" mb={10} maxW="700px" mx="auto" color="white">
            Our team is ready to help you implement our solutions and answer any questions you may have
          </Text>
          
          <Flex justify="center" gap={6} flexWrap="wrap">
            <Button
              as="a"
              href="/contact-sales"
              size="lg"
              bg="white"
              color="red.500"
              _hover={{ bg: "gray.100" }}
            >
              Contact Sales
            </Button>
            
            <Button
              as="a"
              href="tel:+18554402242"
              size="lg"
              variant="outline"
              borderColor="white"
              color="white"
              _hover={{ bg: "red.700" }}
              leftIcon={<PhoneIcon />}
            >
              Call Now
            </Button>
          </Flex>
        </Box>
      </Box>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default ContactPage;