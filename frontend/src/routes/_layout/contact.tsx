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

export const Route = createFileRoute('/_layout/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <Box>
    <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
      <VStack spacing={8} align="start" w="full">
        <Heading as="h1" size="xl" fontWeight="medium">
          Contact
        </Heading>
        <Text fontSize="md" mb={4}>
          If you have any questions, please reach out to us:
        </Text>
        <Text>
          <strong>Email:</strong>{' '}
          <a href="mailto:support@luxuryverse.com">support@luxuryverse.com</a>
        </Text>
      </VStack>
    </Container>
    <Footer />
  </Box>
  );
}

export default ContactPage;