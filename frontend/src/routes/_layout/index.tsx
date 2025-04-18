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
    const url = 'https://iconluxury.shop/api/v1/collections/';
    console.log('Fetching collections from:', url);
    axios
      .get(url, {
        headers: { 'Accept': 'application/json' },
        timeout: 10000,
      })
      .then((res) => {
        console.log('API Response:', res.data);
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.collections)
          ? res.data.collections
          : [];
        setCollections(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', {
          message: err.message,
          code: err.code,
          response: err.response ? {
            status: err.response.status,
            data: err.response.data,
          } : null,
        });
        setError('Unable to load collections. Please try again later.');
        setCollections([]);
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
        const response = await axios.post("https://iconluxury.shop/api/v1/auth/wallet", {
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
    console.log("Joined the waitlist");
    // TODO: Implement waitlist logic (e.g., API call or form redirect)
  };

  return (
    <Box bg="black.900">
      {/* Header with Logo */}
      <Box as="header" py={6} px={{ base: 4, md: 8 }} textAlign="center">
        <Heading as="h1" variant="logo" className="luxuryverse-logo" size="2xl">
          LUXURYVERSE
        </Heading>
      </Box>

      {/* Hero Section: Exclusive Brands */}
      <Box
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        py={{ base: 20, md: 32 }}
        px={{ base: 4, md: 8 }}
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "black.900",
          opacity: 0.7,
        }}
      >
        <Flex maxW="1200px" mx="auto" direction={{ base: "column", lg: "row" }} align="center" gap={12} position="relative">
          <VStack align="flex-start" spacing={10} flex="1">
            <Heading
              as="h2"
              variant="glitch"
              size={{ base: "5xl", md: "6xl" }}
              className="glitch"
              data-text="Exclusive Brands"
            >
              Exclusive Brands
            </Heading>
            <Text fontFamily="'DM Sans', sans-serif" fontSize={{ base: "xl", md: "2xl" }} color="gray.300">
              Exclusive Access
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.300">
              Authenticated luxury goods, fully verified on the blockchain
            </Text>
            <Button
              size="lg"
              variant="solid"
              bg="gold.500"
              color="black.900"
              _hover={{ bg: "gold.600" }}
              onClick={handleJoinWaitlist}
              fontSize="xl"
              py={8}
              px={12}
            >
              Join The Waitlist
            </Button>
          </VStack>
          <Flex flex="1" justify="center" mt={{ base: 8, lg: 0 }}>
            <Flex gap={8} flexWrap="wrap" justify="center">
              {[
                { src: "/images/balmain.jpg", alt: "Balmain Logo" },
                { src: "/images/ferragamo.jpg", alt: "Ferragamo Logo" },
                { src: "/images/the-row.jpg", alt: "The Row Logo" },
                { src: "/images/roger-vivier.jpg", alt: "Roger Vivier Logo" },
                { src: "/images/gianvito-rossi.jpg", alt: "Gianvito Rossi Logo" },
                { src: "/images/etro.jpg", alt: "Etro Logo" },
                { src: "/images/moschino.jpg", alt: "Moschino Logo" },
              ].map((img) => (
                <Image
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  boxSize={{ base: "80px", md: "100px" }}
                  objectFit="contain"
                  fallbackSrc="/images/placeholder.jpg"
                  filter="grayscale(100%)"
                  _hover={{ filter: "grayscale(0%)" }}
                  transition="filter 0.3s ease"
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Cards Section: Luxury Brands, Exclusive Drops, Authentic Goods */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          justify="space-between"
          align="stretch"
        >
          <VStack
            bg="gray.900"
            border="1px solid"
            borderColor="gray.700"
            borderRadius="md"
            p={6}
            flex="1"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "gold.500" }}
          >
            <Heading as="h3" size="lg" mb={4} color="gold.500">
              Luxury Brands
            </Heading>
            <Text color="gray.300">
              LuxuryVerse has direct access to the world's top luxury brands. We have built our
              industry relationships over decades, ensuring that we have the best styles at the prices.
            </Text>
          </VStack>
          <VStack
            bg="gray.900"
            border="1px solid"
            borderColor="gray.700"
            borderRadius="md"
            p={6}
            flex="1"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "gold.500" }}
          >
            <Heading as="h3" size="lg" mb={4} color="gold.500">
              Exclusive Drops
            </Heading>
            <Text color="gray.300">
              Each week, LuxuryVerse releases a limited selection of luxury goods to our members. We
              announce these drops one day in advance on X, releasing goods on a first come first serve
              basis exclusive to our members.
            </Text>
          </VStack>
          <VStack
            bg="gray.900"
            border="1px solid"
            borderColor="gray.700"
            borderRadius="md"
            p={6}
            flex="1"
            align="start"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "gold.500" }}
          >
            <Heading as="h3" size="lg" mb={4} color="gold.500">
              Authentic Goods
            </Heading>
            <Text color="gray.300">
              LuxuryVerse goods are 100% authentic and guaranteed on the blockchain. Our goods and
              services are also supported by the Authentication Council.
            </Text>
          </VStack>
        </Flex>
      </Box>

      {/* Launch Card */}
      <Box py={16} bg="gray.800" textAlign="center">
        <VStack
          bg="gray.900"
          border="1px solid"
          borderColor="gray.700"
          borderRadius="md"
          p={8}
          maxW="600px"
          mx="auto"
          spacing={6}
          transition="all 0.3s"
          _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "gold.500" }}
        >
          <Heading as="h2" size="xl" color="gold.500">
            Launching September 2025
          </Heading>
          <Text color="gray.300">First Drop: September 5th, 2025</Text>
          <Flex gap={8} justify="center" wrap="wrap">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Minutes" },
              { value: countdown.seconds, label: "Seconds" },
            ].map(({ value, label }) => (
              <VStack key={label}>
                <Text fontSize="4xl" fontWeight="bold" color="gold.500">
                  {value}
                </Text>
                <Text color="gray.300">{label}</Text>
              </VStack>
            ))}
          </Flex>
        </VStack>
      </Box>

      {/* Recent Drops Card */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack
          bg="gray.900"
          border="1px solid"
          borderColor="gray.700"
          borderRadius="md"
          p={8}
          spacing={6}
          transition="all 0.3s"
          _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "gold.500" }}
        >
          <Heading as="h2" size="xl" color="gold.500">
            Recent Drops
          </Heading>
          <Text maxW="600px" textAlign="center" color="gray.300">
            Each week, LuxuryVerse releases a limited selection of luxury goods to our members.
          </Text>
          {error && <Text color="red.300">{error}</Text>}
          {isLoading && <Text color="gray.300">Loading drops...</Text>}
          {!isLoading && !Array.isArray(collections) && (
            <Text color="gray.300">No valid collections available</Text>
          )}
          {!isLoading && Array.isArray(collections) && collections.length === 0 && (
            <Text color="gray.300">No drops available</Text>
          )}
          {!isLoading && Array.isArray(collections) && collections.length > 0 && (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={8}
              w="100%"
            >
              {collections.flatMap((collection) =>
                collection.products.map((product) => (
                  <VStack
                    key={product.id}
                    bg="gray.800"
                    border="1px solid"
                    borderColor="gray.700"
                    borderRadius="md"
                    p={4}
                    align="start"
                    transition="all 0.3s"
                    _hover={{ borderColor: "gold.500", shadow: "md" }}
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
                    <Text fontSize="md" fontWeight="bold" color="gray.50">
                      {product.title}
                    </Text>
                    <Text color="purple.500">{product.price}</Text>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="gold.500"
                      color="gold.500"
                      w="full"
                      mt={2}
                      _hover={{ bg: "gold.500", color: "black.900" }}
                    >
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
          <Heading as="h2" size="xl" color="gold.500">
            Frequently Asked Questions
          </Heading>
          <Accordion allowToggle w="100%">
            {[
              {
                question: "What types of luxury goods do you offer?",
                answer: "We offer a wide range of luxury goods, including designer handbags, watches, jewelry, apparel, and accessories from the world’s most prestigious brands.",
              },
              {
                question: "How often are your drops?",
                answer: "Drops occur weekly, announced one day in advance on X, with plans to move to daily drops in the future.",
              },
              {
                question: "How do I know your products are authentic?",
                answer: "All products are 100% authentic, verified on the blockchain, and backed by the Authentication Council.",
              },
              {
                question: "What payment options do you accept?",
                answer: "We accept cryptocurrency payments via wallet authentication, with additional methods to be announced.",
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we offer international shipping from our secure facilities, with details provided at checkout.",
              },
              {
                question: "How can I track my order?",
                answer: "Once shipped, you’ll receive a tracking link via email to monitor your order’s progress.",
              },
              {
                question: "How can I contact customer service?",
                answer: "Reach us at info@example.com, example.mail@hum.com, or call +0989 7876 9865 9 or +(090) 8765 86543 85.",
              },
            ].map(({ question, answer }) => (
              <AccordionItem key={question}>
                <AccordionButton>
                  <Box flex="1" textAlign="left" color="gray.50">
                    {question}
                  </Box>
                  <AccordionIcon color="gold.500" />
                </AccordionButton>
                <AccordionPanel color="gray.300">
                  {answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Button
            as={Link}
            to="/faq"
            variant="outline"
            borderColor="gold.500"
            color="gold.500"
            _hover={{ bg: "gold.500", color: "black.900" }}
          >
            See All FAQ
          </Button>
        </VStack>
      </Box>

      {/* Documents */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl" color="gold.500">
            Read Documents
          </Heading>
          <Flex gap={8} wrap="wrap" justify="center">
            {[
              { href: "/docs/whitepaper.pdf", label: "Whitepaper" },
              { href: "/docs/presentation.pdf", label: "Presentation" },
              { href: "/docs/lightpaper.pdf", label: "Lightpaper" },
            ].map(({ href, label }) => (
              <Button
                key={label}
                as="a"
                href={href}
                variant="outline"
                borderColor="gold.500"
                color="gold.500"
                _hover={{ bg: "gold.500", color: "black.900" }}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </VStack>
      </Box>

      {/* Authentication Council */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl" color="gold.500">
            Trust in Every Purchase
          </Heading>
          <Text textAlign="center" maxW="600px" color="gray.300">
            LuxuryVerse partners with former members of Interpol, the FBI, and other agencies to guarantee authentic merchandise. All goods are transported, stored, and shipped from secure facilities.
          </Text>
        </VStack>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;