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
      .get("https://iconluxury.today/api/v1/collections")
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
        const response = await axios.post("https://iconluxury.today/api/v1/auth/wallet", {
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
      {/* Hero Section: Exclusive Brands */}
      <Box
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        py={{ base: 16, md: 24 }}
        px={{ base: 4, md: 8 }}
      >
        <VStack spacing={6} maxW="800px" align="flex-start">
          <Heading as="h1" size={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" lineHeight="1.2">
            Exclusive Brands
          </Heading>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Exclusive Access
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }} opacity={0.9}>
            Authenticated luxury goods, fully verified on the blockchain
          </Text>
          {/* <Button
            size="lg"
            colorScheme="purple"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{ bgGradient: "linear(to-r, purple.600, pink.600)" }}
            onClick={handleJoinWaitlist}
            fontSize="xl"
            py={8}
            px={12}
          >
            Join The Waitlist
          </Button> */}
          <Flex gap={8} flexWrap="nowrap" overflowX="auto" mt={12} pb={2}>
            <Image
              src="/images/balmain.jpg"
              alt="Balmain Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/ferragamo.jpg"
              alt="Ferragamo Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/the-row.jpg"
              alt="The Row Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/roger-vivier.jpg"
              alt="Roger Vivier Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/gianvito-rossi.jpg"
              alt="Gianvito Rossi Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/etro.jpg"
              alt="Etro Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
            <Image
              src="/images/moschino.jpg"
              alt="Moschino Logo"
              boxSize="100px"
              objectFit="contain"
              fallbackSrc="/images/placeholder.jpg"
            />
          </Flex>
        </VStack>
      </Box>

      {/* Cards Section: Luxury Brands, Exclusive Drops, Authentic Goods */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          justify="space-between"
          align="stretch"
        >
          {/* Luxury Brands Card */}
          <VStack
            bg="gray.700"
            borderRadius="md"
            p={6}
            flex="1"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
          >
            <Heading as="h3" size="lg" mb={4}>
              Luxury Brands
            </Heading>
            <Text>
              LuxuryVerse has direct access to the world's top luxury brands. We have built our
              industry relationships over decades, ensuring that we have the best styles at the prices.
            </Text>
          </VStack>

          {/* Exclusive Drops Card */}
          <VStack
            bg="gray.700"
            borderRadius="md"
            p={6}
            flex="1"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
          >
            <Heading as="h3" size="lg" mb={4}>
              Exclusive Drops
            </Heading>
            <Text>
              Each week, LuxuryVerse releases a limited selection of luxury goods to our members. We
              announce these drops one day in advance on X, releasing goods on a first come first serve
              basis exclusive to our members. Over time, LuxuryVerse will move to daily drops and
              additional membership levels, enabling earlier access or deeper discounts.
            </Text>
       
          </VStack>

          {/* Authentic Goods Card */}
          <VStack
            bg="gray.700"
            borderRadius="md"
            p={6}
            flex="1"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
          >
            <Heading as="h3" size="lg" mb={4}>
              Authentic Goods
            </Heading>
            <Text>
              LuxuryVerse goods are 100% authentic and guaranteed on the blockchain. Our goods and
              services are also supported by the Authentication Council, a group of former FBI and
              Interpol agents, dedicated to ensuring confidence and trust throughout the entire
              experience.
            </Text>
          </VStack>
        </Flex>
      </Box>

      {/* Launch Card */}
      <Box py={16} bg="gray.800" textAlign="center">
        <VStack
          bg="gray.700"
          borderRadius="md"
          p={8}
          maxW="600px"
          mx="auto"
          spacing={6}
          transition="all 0.3s"
          _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
        >
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

      {/* Recent Drops Card */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack
          bg="gray.700"
          borderRadius="md"
          p={8}
          spacing={6}
          transition="all 0.3s"
          _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
        >
          <Heading as="h2" size="xl">
            Recent Drops
          </Heading>
          <Text maxW="600px" textAlign="center">
            Each week, LuxuryVerse releases a limited selection of luxury goods to our members. We
            announce these drops one day in advance on X, releasing goods on a first come first serve
            basis exclusive to our members.
          </Text>
          {error && <Text color="red.300">{error}</Text>}
          {isLoading && <Text color="gray.400">Loading drops...</Text>}
          {!isLoading && collections.length === 0 && (
            <Text color="gray.400">No drops available</Text>
          )}
          {!isLoading && collections.length > 0 && (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={8}
              w="100%"
            >
              {collections.flatMap((collection) =>
                collection.products.map((product) => (
                  <VStack
                    key={product.id}
                    bg="gray.600"
                    borderRadius="md"
                    p={4}
                    align="start"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={`${product.title} Image`}
                      borderRadius="md"
                      objectFit="cover"
                      h="150px"
                      w="100%"
                      fallbackSrc="/images/placeholder.jpg"
                    />
                    <Text fontSize="md" fontWeight="bold">
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

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;