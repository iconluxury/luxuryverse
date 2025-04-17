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

export const Route = createFileRoute('/_layout/terms-conditions')({
  component: TermsPage,
});

function TermsPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Terms and Conditions
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Last Updated: September 2025
          </Text>

          {/* 9. Contact Information */}
          <Box w="full" id="contact-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              9. Contact Information
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions about these Terms, or if you need to contact us for any reason, please reach out to us at:
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

export default TermsPage;