import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Container,
  Divider,
  Link,
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';
import theme from "../../theme";

export const Route = createFileRoute('/_layout/do-not-sell')({
  component: OptOutPage,
});

function OptOutPage() {
  const handleOptOut = () => {
    // Expire the consent cookie to trigger the banner
    document.cookie = "luxuryverse-consent=; path=/; max-age=0";
    window.dispatchEvent(new Event("consentChange")); // Signal Layout to re-show banner
  };

  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Opt Out of Cookies 
          </Heading>
          <Box w="full">
          <Text fontSize="lg" mb={4}>
            Clicking "Opt Me Out" will show the consent banner, allowing you to decline non-essential cookies to disable targeted advertising while keeping essential cookies active.
            </Text>
          </Box>
          <Divider />
          <Box w="full" id="opt-out-instructions">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
            How to Opt Out of Non Essential Cookies
            </Heading>
            <Text fontSize="md" mb={4}> Click below to open the consent banner and opt out of targeted advertising cookies. </Text>
            <Button
              onClick={handleOptOut}
              bg="red.500"
              color="white"
              _hover={{ bg: "red.600" }}
              borderRadius="md"
              px={6}
              py={3}
              fontWeight="medium"
            >
              Opt Me Out
            </Button>
            <Text fontSize="md" mt={4}>
            After opting out, advertising cookies (e.g., <code>_fbp</code>, <code>_lipt</code>) will be disabled, while essential cookies will remain active.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default OptOutPage;