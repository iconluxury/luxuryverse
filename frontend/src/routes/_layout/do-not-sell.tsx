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
  component: DoNotSellPage,
});

function DoNotSellPage() {
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
            Do Not Sell or Share My Personal Information
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Last Updated: March 2025
          </Text>
          <Box w="full">
            <Text fontSize="lg" mb={4}>
              At Roaming Proxy, we respect your privacy rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). 
              This page allows California residents to opt out of the sale or sharing of their personal information, including for targeted advertising purposes.
            </Text>
            <Text fontSize="lg" mb={4}>
              Clicking "Opt Out Now" will display our consent banner, where you can decline cookies to disable targeted advertising while keeping essential cookies active.
            </Text>
            <Text fontSize="lg">
              For more details, see our{" "}
              <Link href="/cookie" color="red.500" textDecoration="underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" color="red.500" textDecoration="underline">
                Privacy Policy
              </Link>.
            </Text>
          </Box>
          <Divider />
          <Box w="full" id="opt-out-instructions">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              How to Opt Out
            </Heading>
            <Text fontSize="md" mb={4}>
              Click below to bring up the consent banner and decline targeted advertising cookies.
            </Text>
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
              Opt Out Now
            </Button>
            <Text fontSize="md" mt={4}>
              After declining, advertising cookies (e.g., <code>_fbp</code>, <code>_lipt</code>) will be disabled, but essential cookies will remain active.
            </Text>
          </Box>
          <Box w="full" id="additional-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Additional Information
            </Heading>
            <Text fontSize="md" mb={4}>
              This opt-out applies only to this device and browser. Repeat on other devices as needed.
            </Text>
            <Text fontSize="md">
              For broader opt-outs, visit the{" "}
              <Link href="http://www.aboutads.info/choices/" color="red.500" textDecoration="underline" isExternal>
                Digital Advertising Alliance
              </Link>{" "}
              or{" "}
              <Link href="https://www.networkadvertising.org/choices/" color="red.500" textDecoration="underline" isExternal>
                Network Advertising Initiative
              </Link>.
            </Text>
          </Box>
          <Box w="full" id="contact-us">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              Contact Us
            </Heading>
            <Text fontSize="md" mb={4}>
              Questions? Contact us at:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text><strong>Email:</strong> privacy@luxuryverse.com</Text>
            </VStack>
            <Text fontSize="md" mt={4}>
              For formal requests, use{" "}
              <Link href="https://luxuryverse.com/privacy-request" color="red.500" textDecoration="underline" isExternal>
                luxuryverse.com/privacy-request
              </Link>.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default DoNotSellPage;