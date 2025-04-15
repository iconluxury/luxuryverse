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
import Footer from "@/components/Common/Footer";

// Define the route
export const Route = createFileRoute("/_layout/")({
  component: Home,
});

// TypeScript interfaces
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
  const { open, address, isConnected, signMessageAsync } = useAppKit();

  // Countdown logic for September 5, 2025 launch
  useEffect(() => {
    const targetDate = new Date("2025-09-05T00:00:00Z").getTime();
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

  // Fetch collections from the API
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/api/v1/collections")
      .then((res) => {
        setCollections(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Request failed with status code 404");
        setIsLoading(false);
      });
  }, []);

  // Handle wallet authentication
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
        localStorage.setItem("access_token", response.data.access_token);
      }
    } catch (err) {
      console.error(err);
      setError("Authentication failed");
    }
  };

  // Handle waitlist join (placeholder functionality)
  const handleJoinWaitlist = () => {
    // TODO: Implement waitlist logic (e.g., API call or form redirect)
    console.log("Joined the waitlist");
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
          <Flex gap={4}>
            <Button
              size="lg"
              colorScheme="purple"
              bgGradient="linear(to-r, purple.500, pink.500)"
              _hover={{ bgGradient: "linear(to-r, purple.600, pink.600)" }}
              onClick={handleConnect}
            >
              {isConnected ? "Connected" : "Connect Wallet"}
            </Button>
            <Button as={Link} to="/login" size="lg" colorScheme="purple" variant="outline">
              Login
            </Button>
          </Flex>
        </VStack>
      </Box>

      {/* Exclusive Brands */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl">
            Exclusive Brands
          </Heading>
          <Text fontSize="2xl" fontWeight="bold">
            Exclusive Access
          </Text>
          <Text textAlign="center" maxW="600px">
            Authenticated luxury goods, fully verified on the blockchain
          </Text>
          <Button
            size="lg"
            colorScheme="purple"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{ bgGradient: "linear(to-r, purple.600, pink.600)" }}
            onClick={handleJoinWaitlist}
          >
            Join The Waitlist
          </Button>
          <Flex justify="center" gap={8} wrap="wrap">
            <Image
              src="/images/balmain.jpg"
              alt="Balmain Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/ferragamo.jpg"
              alt="Ferragamo Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/the-row.jpg"
              alt="The Row Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/roger-vivier.jpg"
              alt="Roger Vivier Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/gianvito-rossi.jpg"
              alt="Gianvito Rossi Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/etro.jpg"
              alt="Etro Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/moschino.jpg"
              alt="Moschino Logo"
              boxSize="150px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
          </Flex>
        </VStack>
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
                      alt={`${product.title} Image`}
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
      <Box py={16} bg="gray.800" textAlign="center">
        <VStack spacing={6} maxW="1200px" mx="auto">
          <Heading as="h2" size="xl">
            Launching September 2025
          </Heading>
          <Text>First Drop: September 5th, 2025</Text>
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

      {/* Authentication Council */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl">
            TRUST IN EVERY PURCHASE
          </Heading>
          <Text textAlign="center" maxW="600px">
            LuxuryVerse partners with former members of Interpol, the United States Federal Bureau of
            Investigation (FBI), and other agencies to guarantee its suppliers provide authentic
            merchandise across the value chain. All goods are transported, stored, and shipped to
            consumers from LuxuryVerse's secure facilities. Together, LuxuryVerse and the
            Authentication Council provides total consumer confidence throughout the purchase process.
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
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How often are your drops?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                Drops occur weekly, announced one day in advance on X, with plans to move to daily
                drops in the future.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How do I know your products are authentic?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                All products are 100% authentic, verified on the blockchain, and backed by the
                Authentication Council, comprising former FBI and Interpol agents.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What payment options do you accept?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                We accept cryptocurrency payments via wallet authentication, with additional methods
                to be announced.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Do you offer international shipping?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                Yes, we offer international shipping from our secure facilities, with details
                provided at checkout.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How can I track my order?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                Once shipped, you’ll receive a tracking link via email to monitor your order’s
                progress.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How can I contact customer service?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                Reach us at info@example.com, example.mail@hum.com, or call +0989 7876 9865 9 or
                +(090) 8765 86543 85.
              </AccordionPanel>
            </AccordionItem>
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
      <Footer />
    </Box>
  );
}

export default Home;