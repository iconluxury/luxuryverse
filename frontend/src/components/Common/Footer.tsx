import React from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={12}>
      <Box maxW="1200px" mx="auto" px={4}>
        {/* Main Footer Content */}
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }} gap={8} mb={8}>
          {/* Company Information */}
          <Box>
            <Heading as="h4" size="md" mb={1} color="white">
              <Link href="https://luxuryverse.com" _hover={{ textDecoration: "none", color: "red.600" }}>
                luxury verse
              </Link>
            </Heading>
            <Text color="gray.400" fontSize="sm" mb={2}>
              <Link href="https://cobaltdata.net" _hover={{ textDecoration: "none", color: "blue.400" }}>
                Cobalt Data Network
              </Link>
            </Text>
            <Text color="gray.300" mb={4}>
              Enterprise level proxy infrastructure built for web scraping, data collection, and market intelligence, 
              offering limitless scalability and global reach across over 200 countries.
            </Text>
            <Text color="gray.300" mb={4}>
              <strong>Phone:</strong> <a href="tel:+18554402242">+1 (855) 440-2242</a>
            </Text>
            <Flex align="center" gap={4} mb={4}>
              <Link href="mailto:info@luxuryverse.com" color="gray.300" _hover={{ color: "red.600" }}>
                Email: info@luxuryverse.com
              </Link>
            </Flex>
            <Flex gap={4}>
              <Link href="https://twitter.com/cobaltdata" isExternal aria-label="Twitter">
                <Box as="span" color="gray.300" _hover={{ color: "red.600" }}>Twitter</Box>
              </Link>
              <Link href="https://linkedin.com/company/cobaltdata" isExternal aria-label="LinkedIn">
                <Box as="span" color="gray.300" _hover={{ color: "red.600" }}>LinkedIn</Box>
              </Link>
              <Link href="https://github.com/cobaltdatanet" isExternal aria-label="GitHub">
                <Box as="span" color="gray.300" _hover={{ color: "red.600" }}>GitHub</Box>
              </Link>
            </Flex>
            <Text color="gray.300" mb={4} pt={4}>
              <strong>Address:</strong> 99 Wall St Suite 5660, New York, NY 10005, USA
            </Text>
          </Box>

          {/* Solutions */}
          <Box>
            <Heading as="h4" size="md" mb={4} color="white">Solutions</Heading>
            <VStack align="flex-start" spacing={2}>
              <Link href="/solutions/market-research" color="gray.300" _hover={{ color: "red.600" }}>Market Research</Link>
              <Link href="/tools/https-proxy" color="gray.300" _hover={{ color: "red.600" }}>HTTPs Request Proxy</Link>
              <Link href="/tools/rotating-proxy" color="gray.300" _hover={{ color: "red.600" }}>Rotating Proxy</Link>
              <Link href="/tools/user-agents" color="gray.300" _hover={{ color: "red.600" }}>User Agents API</Link>
              <Link href="/tools/socks5-proxy" color="gray.300" _hover={{ color: "red.600" }}>SOCKS5 Proxy</Link>
              <Link href="/solutions/price-monitoring" color="gray.300" _hover={{ color: "red.600" }}>Price Monitoring</Link>
              <Link href="/solutions/training-ai" color="gray.300" _hover={{ color: "red.600" }}>AI Training Datasets</Link>
              <Link href="/solutions/content-aggregation" color="gray.300" _hover={{ color: "red.600" }}>Content Aggregation</Link>
              <Link href="/solutions/lead-generation" color="gray.300" _hover={{ color: "red.600" }}>Lead Generation</Link>
              <Link href="/solutions/seo-monitoring" color="gray.300" _hover={{ color: "red.600" }}>SEO Monitoring</Link>
              <Link href="/solutions/enterprise" color="gray.300" _hover={{ color: "red.600" }}>Enterprise</Link>
            </VStack>
          </Box>

          {/* Resources */}
          <Box>
            <Heading as="h4" size="md" mb={4} color="white">Resources</Heading>
            <VStack align="flex-start" spacing={2}>
              <Link href="/network/locations" color="gray.300" _hover={{ color: "red.600" }}>Locations</Link>
              <Link href="/network/status" color="gray.300" _hover={{ color: "red.600" }}>Status</Link>
              <Link href="/network/security" color="gray.300" _hover={{ color: "red.600" }}>Security</Link>
              <Link href="/resources/blog" color="gray.300" _hover={{ color: "red.600" }}>Articles</Link>
              <Link href="/resources/code-examples" color="gray.300" _hover={{ color: "red.600" }}>Support</Link>
              <Link href="/resources/web-scraping-guides" color="gray.300" _hover={{ color: "red.600" }}>Guides</Link>
              <Link href="/network/proxy-types" color="gray.300" _hover={{ color: "red.600" }}>Proxy Types</Link>
              <Link href="/resources/faq" color="gray.300" _hover={{ color: "red.600" }}>FAQ</Link>
              <Link href="/resources/support-center" color="gray.300" _hover={{ color: "red.600" }}>Help & Support</Link>
              <Link href="https://apis.luxuryverse.com/redoc" color="gray.300" _hover={{ color: "red.600" }}>API Reference</Link>
            </VStack>
          </Box>

          {/* Company */}
          <Box>
            <Heading as="h4" size="md" mb={4} color="white">Company</Heading>
            <VStack align="flex-start" spacing={2}>
              <Link href="/pricing" color="gray.300" _hover={{ color: "red.600" }}>Pricing</Link>
              <Link href="/contact-sales" color="gray.300" _hover={{ color: "red.600" }}>Sales</Link>
              <Link href="https://cloud.luxuryverse.com/login" color="gray.300" _hover={{ color: "red.600" }}>Log In</Link>
              <Link href="https://cloud.luxuryverse.com/signup" color="gray.300" _hover={{ color: "red.600" }}>Sign Up</Link>
              <Link href="/contact" color="gray.300" _hover={{ color: "red.600" }}>Contact</Link>
              <Link href="https://cobaltdata.net" color="gray.300" _hover={{ color: "red.400" }}>Cobalt Data Network</Link>
            </VStack>
          </Box>
        </Grid>

        {/* Secondary Footer - Popular Use Cases with Keywords */}
        <Box borderTop="1px solid" borderColor="gray.700" pt={6} mb={6}>
          <Heading as="h4" size="sm" mb={4} color="gray.400">Popular Web Scraping Use Cases</Heading>
          <Flex flexWrap="wrap" gap={4}>
            <Link href="/use-cases/ecommerce-price-monitoring" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              E-commerce Pricing Tracker
            </Link>
            <Link href="/use-cases/product-data-extraction" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Product Data Retrieval
            </Link>
            <Link href="/use-cases/competitor-analysis" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Competitor Analysis
            </Link>
            <Link href="/use-cases/real-estate-data-scraping" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Real Estate Data Collection
            </Link>
            <Link href="/use-cases/travel-fare-aggregation" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Travel Pricing Aggregation
            </Link>
            <Link href="/use-cases/financial-data-collection" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Financial Insights Collection
            </Link>
            <Link href="/use-cases/social-media-monitoring" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Social Media Insights Platform
            </Link>
            <Link href="/use-cases/news-aggregation" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              News Aggregation Solution
            </Link>
          </Flex>
        </Box>

        {/* Third Footer - Regions with Keywords */}
        <Box borderTop="1px solid" borderColor="gray.700" pt={6} mb={6}>
          <Heading as="h4" size="sm" mb={4} color="gray.400">Global Proxy Coverage</Heading>
          <Flex flexWrap="wrap" gap={4}>
            <Link href="/network/north-america" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              North America Proxies
            </Link>
            <Link href="/network/europe" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Europe Proxies
            </Link>
            <Link href="/network/asia-pacific" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Asia-Pacific Proxies
            </Link>
            <Link href="/network/south-america" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              South America Proxies
            </Link>
            <Link href="/network/middle-east" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Middle East Proxies
            </Link>
          </Flex>
        </Box>

        {/* Bottom Footer - Copyright and Legal */}
        <Flex justify="space-between" align="center" borderTop="1px solid" borderColor="gray.700" pt={6} flexWrap="wrap" gap={4}>
          <Text color="gray.400" fontSize="sm">
            © 2025 <Link href="https://luxuryverse.com" color="gray.200" _hover={{ color: "red.400" }}>luxury verse</Link>,{" "}
            <Link href="https://cobaltdata.net" color="gray.200" _hover={{ color: "blue.400" }}>Cobalt Data Network</Link>. All rights reserved.
          </Text>
          <Flex gap={6}>
            <Link href="/privacy" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>Privacy Policy</Link>
            <Link href="/terms" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>Terms of Service</Link>
            <Link href="/compliance" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>Compliance</Link>
            <Link href="/cookie" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>Cookie Policy</Link>
            <Link href="/do-not-sell" color="gray.400" fontSize="sm" _hover={{ color: "red.600" }}>
              Do Not Sell or Share My Personal Information
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;