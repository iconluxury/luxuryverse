import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";

import axios from "axios";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

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

function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { open } = useAppKit();
  const { address, isConnected } = useAppKit();
  const { signMessageAsync } = useAppKit();

  // Countdown logic
  useEffect(() => {
    const targetDate = new Date("2024-09-05T00:00:00Z").getTime();
    const now = new Date().getTime();
    if (now >= targetDate) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch collections
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/api/v1/collections")
      .then((res) => {
        setCollections(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Wallet authentication
  const handleConnect = async () => {
    try {
      await open();
      if (isConnected && address) {
        const message = `Sign this message to authenticate with LuxuryVerse: ${address}`;
        const signature = await signMessageAsync({ message });
        const response = await axios.post("http://localhost:8000/api/v1/auth/wallet", {
          address,
          signature,
          message,
        });
        console.log("Authenticated:", response.data);
        localStorage.setItem("access_token", response.data.access_token);
      }
    } catch (err) {
      console.error(err);
      setError("Authentication failed");
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        py={{ base: 16, md: 24 }}
        textAlign="center"
      >
        <VStack spacing={6} maxW="800px" mx="auto" px={4}>
          <Heading as="h1" size={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" lineHeight="1.2">
            Authenticated Luxury Goods, Fully Verified on the Blockchain
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} opacity={0.9}>
            LuxuryVerse offers exclusive access to the world’s top luxury brands, guaranteed authentic.
          </Text>
          <Button
            size="lg"
            colorScheme="purple"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{ bgGradient: "linear(to-r, purple.600, pink.600)" }}
            onClick={handleConnect}
          >
            {isConnected ? "Connected" : "Connect Wallet"}
          </Button>
        </VStack>
      </Box>

      {/* Exclusive Brands */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={8} textAlign="center">
          Luxury Brands
        </Heading>
        <Text textAlign="center" maxW="600px" mx="auto" mb={12}>
          LuxuryVerse has direct access to the world’s top luxury brands. We have built our industry
          relationships over decades, ensuring that we have the best styles at the prices.
        </Text>
        <Flex justify="center" gap={8} wrap="wrap">
          <Image src="/images/brand1.jpg" alt="Brand 1" boxSize="150px" objectFit="contain" />
          <Image src="/images/brand2.jpg" alt="Brand 2" boxSize="150px" objectFit="contain" />
        </Flex>
      </Box>

      {/* Exclusive Drops */}
      <Box py={16} bg="gray.800" px={{ base: 4, md: 8 }}>
        <VStack maxW="1200px" mx="auto" spacing={8}>
          <Heading as="h2" size="xl">
            Exclusive Drops
          </Heading>
          <Text textAlign="center" maxW="600px">
            Each week, LuxuryVerse releases a limited selection of luxury goods to our members. We
            announce these drops one day in advance on X, releasing goods on a first come first serve
            basis exclusive to our members.
          </Text>
          {error ? (
            <Text color="red.300">{error}</Text>
          ) : isLoading ? (
            <Text color="gray.400">Loading drops...</Text>
          ) : collections.length === 0 ? (
            <Text color="gray.400">No drops available</Text>
          ) : (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={8}
            >
              {collections.flatMap((collection) =>
                collection.products.map((product) => (
                  <VStack
                    key={product.id}
                    bg="gray.700"
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
                    <Text fontSize="lg" fontWeight="bold">
                      {product.title}
                    </Text>
                    <Text color="purple.300">{product.price}</Text>
                    <Button size="sm" colorScheme="purple" variant="outline" w="full" mt={2}>
                      View Details
                    </Button>
                  </VStack>
                ))
              )}
            </Grid>
          )}
        </VStack>
      </Box>

      {/* Authentic Goods */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl">
            Authentic Goods
          </Heading>
          <Text textAlign="center" maxW="600px">
            LuxuryVerse goods are 100% authentic and guaranteed on the blockchain. Our goods and
            services are supported by the Authentication Council, dedicated to ensuring confidence
            and trust.
          </Text>
        </VStack>
      </Box>

      {/* Countdown */}
      {countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0 ? (
        <Box py={16} bg="gray.800" textAlign="center">
          <VStack spacing={6} maxW="1200px" mx="auto">
            <Heading as="h2" size="xl">
              Launching September 2024
            </Heading>
            <Text>First Drop: September 5th, 2024</Text>
            <Flex gap={8} justify="center" wrap="wrap">
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  {countdown.days}
                </Text>
                <Text>Days</Text>
              </VStack>
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  {countdown.hours}
                </Text>
                <Text>Hours</Text>
              </VStack>
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  {countdown.minutes}
                </Text>
                <Text>Minutes</Text>
              </VStack>
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  {countdown.seconds}
                </Text>
                <Text>Seconds</Text>
              </VStack>
            </Flex>
          </VStack>
        </Box>
      ) : null}

      {/* Authentication Council */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl">
            Trust in Every Purchase
          </Heading>
          <Text textAlign="center" maxW="600px">
            LuxuryVerse partners with former members of Interpol, the FBI, and other agencies to
            guarantee authentic merchandise across the value chain.
          </Text>
        </VStack>
      </Box>

      {/* FAQs */}
      <Box py={16} bg="gray.800" px={{ base: 4, md: 8 }}>
        <VStack maxW="1200px" mx="auto" spacing={8}>
          <Heading as="h2" size="xl">
            Frequently Asked Questions
          </Heading>
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What types of luxury goods do you offer?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                We offer a wide range of luxury goods, including designer handbags, watches, jewelry,
                apparel, and accessories from the world’s most prestigious brands.
              </AccordionPanel>
            </AccordionItem>
            {/* ... other FAQ items ... */}
          </Accordion>
          <Button as={Link} to="/faq" colorScheme="purple" variant="outline">
            See All FAQ
          </Button>
        </VStack>
      </Box>

      {/* Documents */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl">
            Read Documents
          </Heading>
          <Flex gap={8} wrap="wrap" justify="center">
            <Button as="a" href="/docs/whitepaper.pdf" colorScheme="purple" variant="outline">
              Whitepaper
            </Button>
            <Button as="a" href="/docs/presentation.pdf" colorScheme="purple" variant="outline">
              Presentation
            </Button>
            <Button as="a" href="/docs/lightpaper.pdf" colorScheme="purple" variant="outline">
              Lightpaper
            </Button>
          </Flex>
        </VStack>
      </Box>

      {/* Footer */}
      <Box py={8} bg="gray.800" textAlign="center">
        <Text>Copyright © 2024 LuxuryVerse. All rights reserved.</Text>
        <Flex justify="center" gap={4} mt={4}>
          <Button as={Link} to="/roadmap" variant="ghost" colorScheme="purple">
            Roadmap
          </Button>
          <Button as={Link} to="/authenticity" variant="ghost" colorScheme="purple">
            Authenticity
          </Button>
          <Button as={Link} to="/faq" variant="ghost" colorScheme="purple">
            FAQ
          </Button>
          <Button as={Link} to="/contact" variant="ghost" colorScheme="purple">
            Contact
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}