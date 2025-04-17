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
  Link
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/privacy-policy')({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Privacy Policy
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Last Updated: September 2025
          </Text>

          {/* 9. Contact Information */}
          <Box w="full" id="contact-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Contact
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions, please reach out to us:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text><strong>Email:</strong> support@luxuryverse.com</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default PrivacyPolicyPage;