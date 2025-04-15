import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <Box textAlign="center" py={20}>
      <Heading as="h1" size="2xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text mb={8}>Sorry, the page you're looking for doesn't exist.</Text>
      <Button as={Link} to="/" colorScheme="purple">
        Go Home
      </Button>
    </Box>
  );
}