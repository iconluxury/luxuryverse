import { Flex, Heading } from "@chakra-ui/react";
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
      <Flex gap={4} alignItems="center">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/roadmap" style={{ color: "white", textDecoration: "none" }}>
          Roadmap
        </Link>
        <Link to="/authenticity" style={{ color: "white", textDecoration: "none" }}>
          Authenticity
        </Link>
        <Link to="/faq" style={{ color: "white", textDecoration: "none" }}>
          FAQ
        </Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </Link>
        <appkit-button />
      </Flex>
    </Flex>
  );
}