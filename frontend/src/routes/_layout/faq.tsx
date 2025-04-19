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

export const Route = createFileRoute('/_layout/faq')({
  component: FaqPage,
});

function FaqPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
          Frequently Asked Questions
          </Heading>
          {/* Contact Information */}
          <Box w="full" id="contact-information">
          <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Contact
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions, please reach out to us:
            </Text>
    
            <Text><strong>Email:</strong> support@luxuryverse.com</Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default FaqPage;