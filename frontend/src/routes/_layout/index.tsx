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
  subtitle?: string; // Added subtitle as optional
  products: Product[];
}

function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { open, address, isConnected, signMessageAsync } = useAppKit();

  const exclusiveRef = useRef(null);
  const brandsRef = useRef(null);
  const exclusiveCursorRef = useRef(null);
  const brandsCursorRef = useRef(null);
  const logosWrapperRef = useRef(null);

  // GSAP Animation for Headings
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

    gsap.set([exclusiveElement, brandsElement], { opacity: 0, color: "#58fb6cd9" });
    gsap.set(exclusiveSpans, { opacity: 0 });
    gsap.set(brandsSpans, { opacity: 0 });

    gsap.set([exclusiveCursor, brandsCursor], {
      transformPerspective: 400,
      rotateY: 30,
      scale: 1.2,
      color: "#58fb6cd9",
      fontSize: { base: "1rem", md: "5.5rem" },
      lineHeight: "1",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      x: 0,
    });

    gsap.to([exclusiveCursor, brandsCursor], {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
    });

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

    const glitchExclusive = () => {
      //const colors = ["#58fb6cd9", "#ff00ff", "#00e5ff", "#ffea00", "#ff5555"];
      const colors = ["#ff00ff","#FFFFFF"];
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
            color: "#00FF00",
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.1,
            ease: "power1.out",
          });
      });
      gsap.delayedCall(gsap.utils.random(1.5, 3), glitchExclusive);
    };

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
      gsap.delayedCall(gsap.utils.random(1.5, 3), glitchBrands);
    };

    gsap.delayedCall(exclusiveText.length * 0.2 + 0.5, glitchExclusive);
    gsap.delayedCall((exclusiveText.length + brandsText.length) * 0.2 + 0.5, glitchBrands);
  }, []);

  // GSAP Animation for Brand Logos Scrolling
  useEffect(() => {
    if (!logosWrapperRef.current) return;
  
    const logos = logosWrapperRef.current.querySelectorAll(".brand-logo");
    const wrapperWidth = logosWrapperRef.current.offsetWidth;
    const totalWidth = Array.from(logos).reduce((sum, logo) => sum + logo.offsetWidth + 24, 0); // 24px gap
  
    // Duplicate logos for seamless looping
    gsap.set(logosWrapperRef.current, { x: 0 });
    const timeline = gsap.timeline({ repeat: -1, paused: false });
    timeline.to(logosWrapperRef.current, {
      x: -totalWidth / 3, // Move by one set of logos (since tripled)
      duration: 20, // Adjust for speed
      ease: "none",
      onComplete: () => {
        gsap.set(logosWrapperRef.current, { x: 0 }); // Reset position for seamless loop
      },
    });
  
    // Define event listener functions
    const handleMouseEnter = () => timeline.pause();
    const handleMouseLeave = () => timeline.play();
    const handleClick = () => timeline.play();
    const handleFocus = () => timeline.play();
  
    // Add event listeners
    const wrapper = logosWrapperRef.current;
    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("click", handleClick);
    wrapper.addEventListener("focus", handleFocus);
  
    // Cleanup
    return () => {
      timeline.kill();
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
        wrapper.removeEventListener("click", handleClick);
        wrapper.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  // Fetch collections
  useEffect(() => {
    setIsLoading(true);
    const url = "https://iconluxury.shop/api/v1/collections/";
    console.log("Fetching collections from:", url);
    axios
      .get(url, {
        headers: { Accept: "application/json" },
        timeout: 10000,
      })
      .then((res) => {
        console.log("API Response:", res.data);
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.collections)
          ? res.data.collections
          : [];
        setCollections(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", {
          message: err.message,
          code: err.code,
          response: err.response
            ? {
                status: err.response.status,
                data: err.response.data,
              }
            : null,
        });
        setError("Unable to load collections. Please try again later.");
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

  // Handle waitlist join
  const handleJoinWaitlist = () => {
    console.log("Joined the waitlist");
    // TODO: Implement waitlist logic
  };

  // Logo data (tripled for scrolling)
  const brandLogos = [
    { src: "/assets/images/brand/brand_img01.png", alt: "Balmain Logo" },
    { src: "/assets/images/brand/brand_img02.png", alt: "Ferragamo Logo" },
    { src: "/assets/images/brand/brand_img03.png", alt: "The Row Logo" },
    { src: "/assets/images/brand/brand_img04.png", alt: "Gianvito Rossi Logo" },
    { src: "/assets/images/brand/brand_img05.png", alt: "Roger Vivier Logo" },
    { src: "/assets/images/brand/brand_img06.png", alt: "Etro Logo" },
    { src: "/assets/images/brand/brand_img07.png", alt: "Moschino Logo" },
    { src: "/assets/images/brand/brand_img01.png", alt: "Balmain Logo" },
    { src: "/assets/images/brand/brand_img02.png", alt: "Ferragamo Logo" },
    { src: "/assets/images/brand/brand_img03.png", alt: "The Row Logo" },
    { src: "/assets/images/brand/brand_img04.png", alt: "Gianvito Rossi Logo" },
    { src: "/assets/images/brand/brand_img05.png", alt: "Roger Vivier Logo" },
    { src: "/assets/images/brand/brand_img06.png", alt: "Etro Logo" },
    { src: "/assets/images/brand/brand_img07.png", alt: "Moschino Logo" },
    { src: "/assets/images/brand/brand_img01.png", alt: "Balmain Logo" },
    { src: "/assets/images/brand/brand_img02.png", alt: "Ferragamo Logo" },
    { src: "/assets/images/brand/brand_img03.png", alt: "The Row Logo" },
    { src: "/assets/images/brand/brand_img04.png", alt: "Gianvito Rossi Logo" },
    { src: "/assets/images/brand/brand_img05.png", alt: "Roger Vivier Logo" },
    { src: "/assets/images/brand/brand_img06.png", alt: "Etro Logo" },
    { src: "/assets/images/brand/brand_img07.png", alt: "Moschino Logo" },
  ];

  return (
    <Box
      width="100%"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="black.900"
    >
      {/* Hero Section */}
      <Box
        bgImage="url('/images/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 8 }}
        position="relative"
        width="100%"
        display="flex"
        justifyContent="center"
        pt={{ base: 4, md: 6 }}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "black.900",
          opacity: 0.7,
          zIndex: 1,
        }}
      >
        <Box position="relative" zIndex={2} width="100%">
          <VStack
            align={{ base: "center", lg: "center" }}
            spacing={{ base: 4, md: 6 }}
            maxW={{ base: "100%", lg: "800px" }}
            textAlign={{ base: "center", lg: "center" }}
            mx="auto"
            px={{ base: 4, md: 8 }}
          >
            <Box position="relative" display="inline-block" whiteSpace="nowrap">
              <Heading
                as="h2"
                variant="glitch"
                size={{ base: "5xl", md: "9xl" }}
                className="glitch glitch-exclusive"
                data-text="EXCLUSIVE"
                ref={exclusiveRef}
              >
                EXCLUSIVE
              </Heading>
              <Box
                as="span"
                ref={exclusiveCursorRef}
                className="terminal-cursor"
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                left="0"
                color="#58fb6cd9"
                fontSize={{ base: "1rem", md: "5.5rem" }}
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
                size={{ base: "5xl", md: "9xl" }}
                className="glitch glitch-brands"
                data-text="BRANDS"
                ref={brandsRef}
              >
                BRANDS
              </Heading>
              <Box
                as="span"
                ref={brandsCursorRef}
                className="terminal-cursor"
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                left="0"
                color="#58fb6cd9"
                fontSize={{ base: "1rem", md: "5.5rem" }}
                lineHeight="1"
                fontWeight="normal"
                ml="0.05em"
              >
                |
              </Box>
            </Box>
            <Text fontSize={{ base: "md", md: "2xl" }} color="white">
              Exclusive access to luxury goods, verified and authenticated on the blockchain.
            </Text>
            <Button
  size="3xl"
  bg="transparent"
  color="#00FF00"
  textTransform="uppercase"
  fontFamily="'Special Gothic Expanded One', sans-serif"
  fontWeight="normal"
  fontSize={{ base: "md", md: "xl" }}
  py={{ base: 6, md: 8 }}
  px={{ base: 8, md: 12 }}
  _hover={{
    bg: "transparent",
    color: "#33FF33",
  }}
  onClick={handleJoinWaitlist}
  alignSelf={{ base: "center", lg: "center" }}
  as={Link}
  to="/join"
>
  GET IN LINE
</Button>
          </VStack>
          <Box
            mt={{ base: 10, md: 12 }}
            overflow="hidden"
            width="100%"
            maxW={{ base: "800px", lg: "1200px" }}
            mx="auto"
          >
            <Box
              ref={logosWrapperRef}
              display="flex"
              flexWrap="nowrap"
              gap={{ base: 4, md: 8 }}
              w="max-content"
              cursor="pointer"
              tabIndex={0}
              _hover={{ animationPlayState: "paused" }}
              _focus={{ outline: "2px solid", outlineColor: "green.500" }}
            >
              {brandLogos.map((img, index) => (
                <Image
                  key={`${img.alt}-${index}`}
                  className="brand-logo"
                  src={img.src}
                  alt={img.alt}
                  boxSize={{ base: "80px", md: "160px" }}
                  objectFit="contain"
                  fallbackSrc="https://via.placeholder.com/160"
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.currentTarget.src}, alt: ${img.alt}`);
                    e.currentTarget.src = "/images/placeholder.jpg";
                  }}
                  filter="grayscale(100%)"
                  _hover={{ filter: "grayscale(0%)" }}
                  transition="filter 0.3s ease"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Second Section (Three Cards) */}
      <Box
        py={0}
        px={{ base: 4, md: 8 }}
        width="100%"
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          justify="space-between"
          align="stretch"
          maxW={{ base: "100%", lg: "100%" }}
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={{ base: 12, md: 16 }}
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
          >
            <Heading as="h3" size="xl" mb={4} color="gray.400"
                         textTransform="uppercase"
            >
              Luxury Brands
            </Heading>
            <Text fontSize="lg" color="gray.400">
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
          >
            <Heading as="h3" size="xl" mb={4} color="gray.400"
                         textTransform="uppercase"
            >
              Exclusive Drops
            </Heading>
            <Text fontSize="lg" color="gray.400">
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
          >
            <Heading as="h3" size="xl" mb={4} color="gray.400"
                         textTransform="uppercase"
            >
              Verified Goods
            </Heading>
            <Text fontSize="lg" color="gray.400">
              LuxuryVerse goods are 100% authentic and guaranteed on the blockchain. Our goods and
              services are also supported by the Authentication Council.
            </Text>
          </VStack>
        </Flex>
      </Box>
      {/* Authentication Council */}
      <Box
        py={{ base: 12, md: 16 }}
        px={{ base: 4, md: 8 }}
        width="100%"
      >
        <VStack
          spacing={8}
          maxW={{ base: "100%", lg: "100%" }}
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          <Heading as="h2" size="2xl" color="gray.400" 
                    textTransform="uppercase"
          >
            Trust in Every Purchase
          </Heading>
          <Text
            textAlign="center"
            maxW={{ base: "700px", lg: "900px" }}
            fontSize="lg"
            color="gray.400"
          >
            LuxuryVerse partners with former members of Interpol, the FBI, and other agencies to guarantee authentic merchandise. All goods are transported, stored, and shipped from secure facilities.
          </Text>
        </VStack>
      </Box>
      {/* FAQs Section */}
      <Box
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
        width="100%"
      >
        <VStack
          bg="gray.900"
          border="1px solid"
          borderColor="gray.700"
          borderRadius="md"
          p={8}
          spacing={8}
          transition="all 0.3s"
          _hover={{ transform: "translateY(-4px)", shadow: "lg", borderColor: "green.500" }}
          maxW={{ base: "100%", lg: "100%" }}
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          <Heading as="h2" size="2xl" color="gray.400"
                       textTransform="uppercase"
          >
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
                  <Box flex="1" textAlign="left" color="gray.400" fontSize="lg">
                    {question}
                  </Box>
                  <AccordionIcon color="gray.400" />
                </AccordionButton>
                <AccordionPanel color="gray.400" fontSize="lg">
                  {answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Box>


      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;