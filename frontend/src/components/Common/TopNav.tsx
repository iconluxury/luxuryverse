import { Flex, Heading, Button } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export default function TopNav() {
  return (
    <Flex
      bg="gray.800"
      p={4}
      justify="space-between"
      align="center"
      px={{ base: 4, md: 8 }}
    >
      <Heading size="md" color="purple.300">
        <Link to="/">LuxuryVerse</Link>
      </Heading>
      <Flex gap={4}>
        <Button as={Link} to="/" variant="ghost" colorScheme="purple">
          Home
        </Button>
        <Button as={Link} to="/shop" variant="ghost" colorScheme="purple">
          Shop
        </Button>
        <Button as={Link} to="/about" variant="ghost" colorScheme="purple">
          About
        </Button>
      </Flex>
    </Flex>
  );
}