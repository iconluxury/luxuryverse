import { Box, Button, Flex, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Define product and collection interfaces
interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
}

interface Collection {
  id: string;
  title: string;
  products: Product[];
}

// Mock data (replace with your backend API calls)
const mockCollections: Collection[] = [
  {
    id: "col1",
    title: "Luxury Watches",
    products: [
      { id: "p1", title: "Gold Chronograph", thumbnail: "/images/watch1.jpg", price: "0.5 ETH" },
      { id: "p2", title: "Diamond Quartz", thumbnail: "/images/watch2.jpg", price: "0.7 ETH" },
    ],
  },
  {
    id: "col2",
    title: "Designer Bags",
    products: [
      { id: "p3", title: "Leather Tote", thumbnail: "/images/bag1.jpg", price: "0.3 ETH" },
      { id: "p4", title: "Velvet Clutch", thumbnail: "/images/bag2.jpg", price: "0.2 ETH" },
    ],
  },
];

const Home = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  // Simulate fetching data (replace with your API call)
  useEffect(() => {
    // Example: fetch from your backend
    // fetch('/api/collections')
    //   .then(res => res.json())
    //   .then(data => setCollections(data))
    //   .catch(err => console.error(err));
    setCollections(mockCollections); // Mock for now
  }, []);

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      {/* Hero Section */}
      <Box
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        py={{ base: 16, md: 24 }}
        textAlign="center"
      >
        <VStack spacing={6} maxW="800px" mx="auto" px={4}>
          <Heading
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            fontWeight="extrabold"
            lineHeight="1.2"
          >
            Discover LuxuryVerse
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} opacity={0.9}>
            Your decentralized marketplace for luxury goods. Buy and trade with cryptocurrency.
          </Text>
          <Button
            size="lg"
            colorScheme="purple"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{ bgGradient: "linear(to-r, purple.600, pink.600)" }}
          >
            Shop Now
          </Button>
        </VStack>
      </Box>

      {/* Featured Products Section */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={8} textAlign="center">
          Featured Collections
        </Heading>
        {collections.length === 0 ? (
          <Text textAlign="center" color="gray.400">
            Loading collections...
          </Text>
        ) : (
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={8}
          >
            {collections.flatMap((collection) =>
              collection.products.map((product) => (
                <VStack
                  key={product.id}
                  bg="gray.800"
                  borderRadius="md"
                  p={6}
                  align="start"
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    borderRadius="md"
                    objectFit="cover"
                    h="200px"
                    w="100%"
                    fallbackSrc="/images/placeholder.jpg"
                  />
                  <Text fontSize="lg" fontWeight="bold">{product.title}</Text>
                  <Text color="purple.300">{product.price}</Text>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    variant="outline"
                    w="full"
                    mt={2}
                  >
                    View Details
                  </Button>
                </VStack>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

// Wrapper Component (Nav and Footer)
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Box>
    {/* Navigation */}
    <Flex
      as="nav"
      bg="gray.800"
      p={4}
      justify="space-between"
      align="center"
      px={{ base: 4, md: 8 }}
    >
      <Heading size="md" color="purple.300">LuxuryVerse</Heading>
      <Flex gap={4}>
        <Button variant="ghost" colorScheme="purple">Home</Button>
        <Button variant="ghost" colorScheme="purple">Shop</Button>
        <Button variant="ghost" colorScheme="purple">About</Button>
      </Flex>
    </Flex>
    {children}
    {/* Footer */}
    <Box as="footer" bg="gray.800" py={8} textAlign="center">
      <Text>© 2025 LuxuryVerse. All rights reserved.</Text>
    </Box>
  </Box>
);

const HomePage = () => (
  <Wrapper>
    <Home />
  </Wrapper>
);

export default HomePage;