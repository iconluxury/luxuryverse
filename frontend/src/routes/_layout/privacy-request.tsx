import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Radio,
  RadioGroup,
  Stack,
  FormHelperText,
  useToast,
  Flex,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Icon
} from "@chakra-ui/react";
import { InfoIcon, LockIcon } from '@chakra-ui/icons';
import { CheckCircleIcon, ArrowForwardIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/privacy-request')({
  component: PrivacyRequestPage,
});

function PrivacyRequestPage() {
  const [requestType, setRequestType] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [deletionReason, setDeletionReason] = useState('1');
  const [verificationMethod, setVerificationMethod] = useState('email');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = {
        full_name: e.target.fullName.value,
        email: e.target.email.value,
        phone_number: e.target.phoneNumber.value || null,
        account_id: e.target.accountId.value || null,
        request_type: requestType,
        verification_method: verificationMethod,
        additional_details: e.target.additionalDetails?.value || null
      };
      
      // Add request-type specific fields
      if (requestType === 'rectification') {
        formData.correction_details = e.target.correctionDetails.value;
      } else if (requestType === 'erasure') {
        formData.deletion_reason = deletionReason;
        formData.deletion_details = e.target.deletionDetails?.value || null;
      }
      
      console.log("Form data being submitted:", formData);

      const response = await fetch('https://apis.luxuryverse.com/api/v1/utils/privacy-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit privacy request');
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
      console.error("Form submission error:", error);
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
              Privacy Request Submitted Successfully
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your privacy request has been received. Our Data Protection team will review your request and respond within 30 days. 
              A confirmation email has been sent to the email address you provided.
            </AlertDescription>
            <Button mt={6} colorScheme="red" onClick={() => window.location.href = "/"}>
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
            Submit a Privacy Request
          </Heading>
          
        
          {/* Request Form */}
          <Box w="full" as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} align="start">
              {/* Personal Information */}
              <Heading as="h2" size="md" fontWeight="medium">
                1. Your Information
              </Heading>
              
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="fullName" type="text" placeholder="Enter your full name" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input name="email" type="email" placeholder="Enter your email address" />
                <FormHelperText>
                  We'll use this email to communicate about your request and send the requested information.
                </FormHelperText>
              </FormControl>
              
              <Flex w="full" direction={{ base: "column", md: "row" }} gap={4}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input name="phoneNumber" type="tel" placeholder="Optional" />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Account ID or Username (if applicable)</FormLabel>
                  <Input name="accountId" type="text" placeholder="If you have an account with us" />
                </FormControl>
              </Flex>
              
              <Divider />
              
              {/* Request Type */}
              <Heading as="h2" size="md" fontWeight="medium">
                2. Request Type
              </Heading>
              
              <FormControl isRequired>
                <FormLabel>What type of privacy request would you like to submit?</FormLabel>
                <Select 
                  name="requestType"
                  placeholder="Select request type" 
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  <option value="access">Access My Data</option>
                  <option value="rectification">Correct My Data</option>
                  <option value="erasure">Delete My Data</option>
                  <option value="restriction">Restrict Processing of My Data</option>
                  <option value="portability">Data Portability</option>
                  <option value="objection">Object to Processing</option>
                  <option value="consent">Withdraw Consent</option>
                  <option value="other">Other Privacy-Related Request</option>
                </Select>
              </FormControl>
              
              {requestType === 'rectification' && (
                <FormControl>
                  <FormLabel>What information needs to be corrected?</FormLabel>
                  <Textarea name="correctionDetails" placeholder="Please specify which information is incorrect and what it should be corrected to" rows={4} />
                </FormControl>
              )}
              
              {requestType === 'erasure' && (
                <FormControl>
                  <FormLabel>Reason for deletion request</FormLabel>
                  <RadioGroup 
                    name="deletionReason"
                    value={deletionReason} 
                    onChange={setDeletionReason}
                  >
                    <Stack direction="column" spacing={2}>
                      <Radio value="1">I no longer wish to use Roaming Proxy services</Radio>
                      <Radio value="2">I'm concerned about my privacy</Radio>
                      <Radio value="3">I didn't authorize the collection of my data</Radio>
                      <Radio value="4">Other reason (please specify below)</Radio>
                    </Stack>
                  </RadioGroup>
                  <Textarea 
                    name="deletionDetails" 
                    mt={4} 
                    placeholder="Additional information about your deletion request" 
                    rows={4} 
                  />
                </FormControl>
              )}
              
              {(requestType && requestType !== 'rectification' && requestType !== 'erasure') && (
                <FormControl>
                  <FormLabel>Additional Information</FormLabel>
                  <Textarea 
                    name="additionalDetails"
                    placeholder="Please provide any additional details that will help us process your request" 
                    rows={4}
                  />
                </FormControl>
              )}
              
              <Divider />
              
              {/* Identity Verification */}
              <Heading as="h2" size="md" fontWeight="medium">
                3. Identity Verification
              </Heading>
              
              <Text fontSize="md" color="gray.700">
                To protect your privacy and security, we need to verify your identity before processing your request. 
                Please select one of the following verification methods:
              </Text>
              
              <FormControl isRequired>
                <RadioGroup 
                  name="verificationMethod"
                  value={verificationMethod} 
                  onChange={setVerificationMethod}
                >
                  <Stack direction="column" spacing={4}>
                    <Radio value="email">
                      <Box>
                        <Text fontWeight="medium">Email Verification</Text>
                        <Text fontSize="sm" color="gray.600">We'll send a verification code to your email address</Text>
                      </Box>
                    </Radio>
                    <Radio value="account">
                      <Box>
                        <Text fontWeight="medium">Account Login</Text>
                        <Text fontSize="sm" color="gray.600">Verify through your existing account (if applicable)</Text>
                      </Box>
                    </Radio>
                    <Radio value="document">
                      <Box>
                        <Text fontWeight="medium">ID Verification</Text>
                        <Text fontSize="sm" color="gray.600">
                          You may need to provide identification documents for certain requests. 
                          We'll contact you if this is necessary.
                        </Text>
                      </Box>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            
              <Divider />
              
              {/* Consent */}
              <Heading as="h2" size="md" fontWeight="medium">
                4. Consent and Submission
              </Heading>
              
              <FormControl isRequired>
                <Checkbox 
                  name="consent"
                  size="md" 
                  colorScheme="red"
                  isChecked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                >
                  I understand that Roaming Proxy will use the information provided in this form to verify my identity and respond 
                  to my request. The information will be processed in accordance with the 
                  <Button variant="link" color="red.500" mx={1}>Privacy Policy</Button>
                  and retained as required by law.
                </Checkbox>
              </FormControl>
              
              <Button 
                type="submit" 
                colorScheme="red" 
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
              
           
            </VStack>
          </Box>
          
          <Divider />
          <HStack>
            <Text fontSize="lg" color="gray.600">
              Your privacy matters to us. Use this form to submit formal requests regarding your personal data.
            </Text>
          </HStack>

          {/* Introduction */}
          <Box w="full" bg="red.50" p={6} borderRadius="md">
            <Text fontSize="md" mb={4}>
              In accordance with data protection regulations like GDPR, CCPA, and others, you have certain rights regarding your personal data. 
              You can use this form to exercise these rights, including:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text><strong>• Access:</strong> Request a copy of your personal data</Text>
              <Text><strong>• Rectification:</strong> Correct inaccurate or incomplete data</Text>
              <Text><strong>• Erasure:</strong> Request deletion of your personal data</Text>
              <Text><strong>• Restriction:</strong> Request limitations on how we process your data</Text>
              <Text><strong>• Portability:</strong> Receive your data in a structured, machine-readable format</Text>
              <Text><strong>• Objection:</strong> Object to certain types of processing</Text>
            </VStack>
            <Text fontSize="md" mt={4}>
              We will respond to your request within 30 days. For complex requests or if we receive a large volume of requests, 
              we may extend this period by an additional 60 days, in which case we will notify you.
            </Text>
          </Box>
          
          <Divider />
          
          {/* Additional Information */}
          <Box w="full">
            <Heading as="h2" size="md" fontWeight="medium" mb={4}>
              Additional Information
            </Heading>
            
            <Text fontSize="md" mb={4}>
              If you have any questions about the privacy request process or need assistance completing this form, 
              please contact our Data Protection Team at:
            </Text>
            
            <VStack align="start" spacing={2} pl={4} mb={4}>
              <Text><strong>Email:</strong> privacy@luxuryverse.com</Text>
              <Text><strong>Phone:</strong> +1 (855) 440-2242</Text>
              <Text><strong>Hours:</strong> Monday to Friday, 9:00 AM to 5:00 PM EST</Text>
            </VStack>
            
            <Text fontSize="md">
              For more information about how we handle your personal data, please refer to our 
              <Button variant="link" color="red.500" mx={1}>Privacy Policy</Button>.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default PrivacyRequestPage;