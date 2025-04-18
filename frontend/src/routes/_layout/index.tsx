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
import { useEffect, useRef, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import axios from "axios";
import Footer from "@/components/Common/Footer";
import { gsap } from "gsap";

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

  const exclusiveRef = useRef(null);
  const brandsRef = useRef(null);
  const exclusiveCursorRef = useRef(null);
  const brandsCursorRef = useRef(null);

  // GSAP Animation for Typewriter, 3D Slanted Cursor, and Flashy Glitch
  useEffect(() => {
    if (!exclusiveRef.current || !brandsRef.current || !exclusiveCursorRef.current || !brandsCursorRef.current) {
      console.error("Refs not found:", {
        exclusiveRef: exclusiveRef.current,
        brandsRef: brandsRef.current,
        exclusiveCursorRef: exclusiveCursorRef.current,
        brandsCursorRef: brandsCursorRef.current,
      });
      return;
    }

    const exclusiveElement = exclusiveRef.current;
    const brandsElement = brandsRef.current;
    const exclusiveCursor = exclusiveCursorRef.current;
    const brandsCursor = brandsCursorRef.current;

    // Split text into spans for typewriter and glitch effects
    const exclusiveText = "EXCLUSIVE";
    const brandsText = "BRANDS";
    exclusiveElement.innerHTML = exclusiveText
      .split("")
      .map((char) => `<span class="glitch-letter">${char}</span>`)
      .join("");
    brandsElement.innerHTML = brandsText
      .split("")
      .map((char) => `<span class="glitch-letter">${char}</span>`)
      .join("");

    const exclusiveSpans = exclusiveElement.querySelectorAll(".glitch-letter");
    const brandsSpans = brandsElement.querySelectorAll(".glitch-letter");

    // Set initial state: hide entire heading and letters
    gsap.set([exclusiveElement, brandsElement], { opacity: 0, color: "#58fb6cd9" });
    gsap.set(exclusiveSpans, { opacity: 0 });
    gsap.set(brandsSpans, { opacity: 0 });

    // 3D Slanted Cursor Style
    gsap.set([exclusiveCursor, brandsCursor], {
      transformPerspective: 400,
      rotateY: 30,
      scale: 1.2,
      color: "#58fb6cd9",
      fontSize: { base: "3rem", md: "5.5rem" },
      lineHeight: "1",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      x: 0,
    });

    // Cursor blinking animation (always blinking)
    gsap.to([exclusiveCursor, brandsCursor], {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
    });

    // Typewriter animation for EXCLUSIVE (cumulative letter reveal)
    gsap.to(exclusiveElement, {
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        gsap.to(exclusiveSpans, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.2,
          stagger: 0.2,
          ease: "power2.out",
          onStart: () => {
            gsap.set(exclusiveCursor, { opacity: 1 });
          },
          onUpdate: function () {
            const currentIndex = Math.floor(this.progress() * exclusiveSpans.length);
            gsap.set(exclusiveCursor, {
              x: currentIndex * (exclusiveElement.offsetWidth / exclusiveText.length) + 5,
            });
          },
        });
      },
    });

    // Typewriter animation for BRANDS (cumulative letter reveal)
    gsap.to(brandsElement, {
      opacity: 1,
      duration: 0.1,
      delay: exclusiveText.length * 0.2,
      onComplete: () => {
        gsap.to(brandsSpans, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.2,
          stagger: 0.2,
          ease: "power2.out",
          onStart: () => {
            gsap.set(brandsCursor, { opacity: 1 });
          },
          onUpdate: function () {
            const currentIndex = Math.floor(this.progress() * brandsSpans.length);
            gsap.set(brandsCursor, {
              x: currentIndex * (brandsElement.offsetWidth / brandsText.length) + 5,
            });
          },
        });
      },
    });

    // Flashy Glitch animation for EXCLUSIVE (individual letters)
    const glitchExclusive = () => {
      const colors = ["#58fb6cd9", "#ff00ff", "#00e5ff", "#ffea00", "#ff5555"];
      exclusiveSpans.forEach((span) => {
        gsap
          .timeline()
          .to(span, {
            color: colors[Math.floor(Math.random() * colors.length)],
            x: gsap.utils.random(-20, 20),
            y: gsap.utils.random(-20, 20),
            scale: gsap.utils.random(0.9, 1.1),
            rotate: gsap.utils.random(-10, 10),
            duration: 0.08,
            ease: "none",
          })
          .to(span, {
            color: colors[Math.floor(Math.random() * colors.length)],
            x: gsap.utils.random(-15, 15),
            y: gsap.utils.random(-15, 15),
            scale: gsap.utils.random(0.95, 1.05),
            rotate: gsap.utils.random(-5, 5),
            duration: 0.08,
            ease: "none",
          })
          .to(span, {
            color: "#58fb6cd9",
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.1,
            ease: "power1.out",
          });
      });
      gsap.delayedCall(gsap.utils.random(1.5, 3), glitchExclusive); // Frequent glitches
    };

    // Flashy Glitch animation for BRANDS (individual letters)
    const glitchBrands = () => {
      const colors = ["#58fb6cd9", "#ff00ff", "#00e5ff", "#ffea00", "#ff5555"];
      brandsSpans.forEach((span) => {
        gsap
          .timeline()
          .to(span, {
            color: colors[Math.floor(Math.random() * colors.length)],
            x: gsap.utils.random(-20, 20),
            y: gsap.utils.random(-20, 20),
            scale: gsap.utils.random(0.9, 1.1),
            rotate: gsap.utils.random(-10, 10),
            duration: 0.08,
            ease: "none",
          })
          .to(span, {
            color: colors[Math.floor(Math.random() * colors.length)],
            x: gsap.utils.random(-15, 15),
            y: gsap.utils.random(-15, 15),
            scale: gsap.utils.random(0.95, 1.05),
            rotate: gsap.utils.random(-5, 5),
            duration: 0.08,
            ease: "none",
          })
          .to(span, {
            color: "#58fb6cd9",
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.1,
            ease: "power1.out",
          });
      });
      gsap.delayedCall(gsap.utils.random(1.5, 3), glitchBrands); // Frequent glitches
    };

    // Start glitch animations after typewriter effect
    gsap.delayedCall(exclusiveText.length * 0.2 + 0.5, glitchExclusive);
    gsap.delayedCall((exclusiveText.length + brandsText.length) * 0.2 + 0.5, glitchBrands);
  }, []);

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
      {/* Hero Section: Exclusive Brands */}
      <Box
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        py={{ base: 10, md: 16 }}
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
        <Flex maxW="1200px" mx="auto" direction={{ base: "column", lg: "row" }} align={{ base: "flex-start", lg: "center" }} gap={{ base: 6, md: 12 }} position="relative">
          <VStack align="flex-start" spacing={{ base: 6, md: 12 }} flex="1" ml={{ base: 0, md: 0 }}>
            <Box position="relative" display="inline-block" whiteSpace="nowrap">
              <Heading
                as="h2"
                variant="glitch"
                size={{ base: "6xl", md: "9xl" }}
                className="glitch glitch-exclusive"
                data-text="EXCLUSIVE"
                ref={exclusiveRef}
              />
              <Box
                as="span"
                ref={exclusiveCursorRef}
                className="terminal-cursor"
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                left="0"
                color="#58fb6cd9"
                fontSize={{ base: "3rem", md: "5.5rem" }}
                lineHeight="1"
                fontWeight="normal"
                ml="0.05em"
              >
                |
              </Box>
            </Box>
            <Box position="relative" display="inline-block" whiteSpace="nowrap">
              <Heading
                as="h2"
                variant="glitch"
                size={{ base: "6xl", md: "9xl" }}
                className="glitch glitch-brands"
                data-text="BRANDS"
                ref={brandsRef}
              />
              <Box
                as="span"
                ref={brandsCursorRef}
                className="terminal-cursor"
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                left="0"
                color="#58fb6cd9"
                fontSize={{ base: "3rem", md: "5.5rem" }}
                lineHeight="1"
                fontWeight="normal"
                ml="0.05em"
              >
                |
              </Box>
            </Box>
            <Text fontFamily="'DM Sans', sans-serif" fontSize={{ base: "md", md: "2xl" }} color="purple.500">
              Exclusive Access
            </Text>
            <Text fontSize={{ base: "sm", md: "xl" }} color="purple.500">
              Authenticated luxury goods, fully verified on the blockchain
            </Text>
            <Button
              size="lg"
              variant="solid"
              bg="green.500"
              color="black.900"
              _hover={{ bg: "green.600" }}
              onClick={handleJoinWaitlist}
              fontSize={{ base: "md", md: "xl" }}
              py={{ base: 6, md: 8 }}
              px={{ base: 8, md: 12 }}
            >
              Join The Waitlist
            </Button>
          </VStack>
          <Flex flex="1" justify="center" mt={{ base: 6, lg: 0 }}>
            <Flex gap={{ base: 4, md: 8 }} flexWrap="wrap" justify="center">
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
                  boxSize={{ base: "60px", md: "100px" }}
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
            _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "green.500" }}
          >
            <Heading as="h3" size="lg" mb={4} color="purple.500">
              Luxury Brands
            </Heading>
            <Text color="purple.500">
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
            _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "green.500" }}
          >
            <Heading as="h3" size="lg" mb={4} color="purple.500">
              Exclusive Drops
            </Heading>
            <Text color="purple.500">
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
            _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "green.500" }}
          >
            <Heading as="h3" size="lg" mb={4} color="purple.500">
              Authentic Goods
            </Heading>
            <Text color="purple.500">
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
          p={4}
          maxW="600px"
          mx="auto"
          spacing={6}
          transition="all 0.3s"
          _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "green.500" }}
        >
          <Heading as="h2" size="xl" color="purple.500">
            Launching September 2025
          </Heading>
          <Text color="purple.500">First Drop: September 5th, 2025</Text>
          <Flex gap={8} justify="center" wrap="wrap">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Minutes" },
              { value: countdown.seconds, label: "Seconds" },
            ].map(({ value, label }) => (
              <VStack key={label}>
                <Text fontSize="4xl" fontWeight="bold" color="purple.500">
                  {value}
                </Text>
                <Text color="purple.500">{label}</Text>
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
          _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "green.500" }}
        >
          <Heading as="h2" size="xl" color="purple.500">
            Recent Drops
          </Heading>
          <Text maxW="600px" textAlign="center" color="purple.500">
            Each week, LuxuryVerse releases a limited selection of luxury goods to our members.
          </Text>
          {error && <Text color="red.300">{error}</Text>}
          {isLoading && <Text color="purple.500">Loading drops...</Text>}
          {!isLoading && !Array.isArray(collections) && (
            <Text color="purple.500">No valid collections available</Text>
          )}
          {!isLoading && Array.isArray(collections) && collections.length === 0 && (
            <Text color="purple.500">No drops available</Text>
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
                    _hover={{ borderColor: "green.500", shadow: "md" }}
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
                    <Text fontSize="md" fontWeight="bold" color="purple.500">
                      {product.title}
                    </Text>
                    <Text color="purple.500">{product.price}</Text>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="purple.500"
                      color="purple.500"
                      w="full"
                      mt={2}
                      _hover={{ bg: "green.500", color: "black.900" }}
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
          <Heading as="h2" size="xl" color="purple.500">
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
                question: "What payment options do you offer?",
                answer: "We offer cryptocurrency payments via wallet authentication, with additional methods to be announced.",
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
                  <Box flex="1" textAlign="left" color="purple.500">
                    {question}
                  </Box>
                  <AccordionIcon color="purple.500" />
                </AccordionButton>
                <AccordionPanel color="purple.500">
                  {answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Button
            as={Link}
            to="/faq"
            variant="outline"
            borderColor="purple.500"
            color="purple.500"
            _hover={{ bg: "green.500", color: "black.900" }}
          >
            See All FAQ
          </Button>
        </VStack>
      </Box>

      {/* Documents */}
      <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        <VStack spacing={8}>
          <Heading as="h2" size="xl" color="purple.500">
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
                borderColor="purple.500"
                color="purple.500"
                _hover={{ bg: "green.500", color: "black.900" }}
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
          <Heading as="h2" size="xl" color="purple.500">
            Trust in Every Purchase
          </Heading>
          <Text textAlign="center" maxW="600px" color="purple.500">
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