import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  AlertDescription,
  SimpleGrid,
  Icon,
  useToast
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon ,ArrowForwardIcon} from '@chakra-ui/icons';
import { useState } from 'react';
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/demo-request')({
  component: RequestDemoPage,
});

function RequestDemoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [useCase, setUseCase] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      business_email: e.target.businessEmail.value,
      phone_number: e.target.phoneNumber.value,
      company_name: e.target.companyName.value,
      job_title: e.target.jobTitle.value,
      primary_use_case: useCase,
      other_use_case: useCase === 'other' ? e.target.otherUseCase?.value : null,
      additional_requirements: e.target.additionalRequirements.value || null,
      preferred_demo_datetime: e.target.preferredDemoDateTime.value || null
    };

    try {
      // To this (with absolute URL):
      const response = await fetch('https://apis.luxuryverse.com/api/v1/utils/demo-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit demo request');
      }

      const data = await response.json();
      setFormSubmitted(true);
      window.scrollTo(0, 0);
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while submitting your request",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <Box>
        <Container maxW="800px" mx="auto" px={4} py={16} color="gray.800">
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            py={8}
            borderRadius="md"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={2} fontSize="xl">
              Demo Request Submitted Successfully
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thank you for your interest in our web scraping solutions. A member of our team will contact you within 24 hours to schedule your personalized demo.
            </AlertDescription>
            <Button mt={6} colorScheme="orange" onClick={() => window.location.href = "/"}>
              Return to Homepage
            </Button>
          </Alert>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box>
      <Container maxW="800px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Request a Solution Demo
          </Heading>
          
       
          <Box w="full" as="form" onSubmit={handleSubmit} mt={6} bg="white" p={8} borderRadius="md" boxShadow="sm">
            <VStack spacing={6} align="start">
              <Heading as="h2" size="md" fontWeight="medium">
                Your Information
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input name="firstName" type="text" placeholder="Enter your first name" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="lastName" type="text" placeholder="Enter your last name" />
                </FormControl>
              </SimpleGrid>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>Business Email</FormLabel>
                  <Input name="businessEmail" type="email" placeholder="Enter your business email" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input name="phoneNumber" type="tel" placeholder="Enter your phone number" />
                </FormControl>
              </SimpleGrid>
              
              <FormControl isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input name="companyName" type="text" placeholder="Enter your company name" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input name="jobTitle" type="text" placeholder="Enter your job title" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Primary Use Case</FormLabel>
                <Select 
                  name="primaryUseCase"
                  placeholder="Select primary use case" 
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                >
                  <option value="competitive_intelligence">Competitive Intelligence</option>
                  <option value="market_analysis">Market Analysis & Trends</option>
                  <option value="price_monitoring">Price Monitoring</option>
                  <option value="sentiment_analysis">Consumer Sentiment Analysis</option>
                  <option value="product_research">Product Research</option>
                  <option value="lead_generation">Lead Generation</option>
                  <option value="content_aggregation">Content Aggregation</option>
                  <option value="other">Other (please specify)</option>
                </Select>
              </FormControl>
              
              {useCase === 'other' && (
                <FormControl>
                  <FormLabel>Please specify your use case</FormLabel>
                  <Input name="otherUseCase" type="text" placeholder="Describe your use case" />
                </FormControl>
              )}
              
              <FormControl>
                <FormLabel>Additional Requirements or Questions</FormLabel>
                <Textarea 
                  name="additionalRequirements"
                  placeholder="Please share any specific requirements, questions, or areas of interest for the demo"
                  rows={4}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Preferred Demo Date/Time</FormLabel>
                <Input name="preferredDemoDateTime" type="datetime-local" />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  We'll do our best to accommodate your preferred time or suggest alternatives.
                </Text>
              </FormControl>
              
              <FormControl isRequired mt={4}>
                <Checkbox 
                  size="md" 
                  colorScheme="orange"
                  isChecked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                >
                  I agree to receive communications about luxury verse services. I understand that my information will be processed in accordance with the 
                  <Button as="a" href="/privacy" variant="link" color="red.500" mx={1}>Privacy Policy</Button>.
                </Checkbox>
              </FormControl>
              
              <Button 
                type="submit" 
                bg="red.600"
                color="white"
                _hover={{ bg: "red.500" }}
                size="lg" 
                w={{ base: "full", md: "auto" }}
                isLoading={isSubmitting}
                loadingText="Submitting"
                isDisabled={!consentChecked}
                mt={4}
                rightIcon={<ArrowForwardIcon />}
                >
                  Submit 
                </Button>
              
                            <Divider />
              <Text fontSize="lg" color="gray.600">
            Experience the power of our enterprise-grade web scraping proxy infrastructure. Complete this form to schedule a personalized demo tailored to your market research needs.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
            <Box bg="red.50" p={5} borderRadius="md">
              <Flex align="center" mb={3}>
                <Icon as={CheckCircleIcon} color="red.500" boxSize={5} mr={2} />
                <Text fontWeight="medium">Personalized Demonstration</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600">
                Our team will showcase features most relevant to your specific market research needs.
              </Text>
            </Box>
            
            <Box bg="red.50" p={5} borderRadius="md">
              <Flex align="center" mb={3}>
                <Icon as={CheckCircleIcon} color="red.500" boxSize={5} mr={2} />
                <Text fontWeight="medium">Technical Deep Dive</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600">
                Get answers to your technical questions from our expert engineering team.
              </Text>
            </Box>
            
            <Box bg="red.50" p={5} borderRadius="md">
              <Flex align="center" mb={3}>
                <Icon as={CheckCircleIcon} color="red.500" boxSize={5} mr={2} />
                <Text fontWeight="medium">Custom Integration Planning</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600">
                Learn how our solutions integrate with your existing data infrastructure.
              </Text>
            </Box>
            
            <Box bg="red.50" p={5} borderRadius="md">
              <Flex align="center" mb={3}>
                <Icon as={CheckCircleIcon} color="red.500" boxSize={5} mr={2} />
                <Text fontWeight="medium">Pricing Consultation</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600">
                Transparent discussion about pricing options tailored to your usage needs.
              </Text>
            </Box>
          </SimpleGrid>
          
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default RequestDemoPage;