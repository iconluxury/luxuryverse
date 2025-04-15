import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  IconButton,
  Image,
  Link,
  Button,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link as RouterLink } from "@tanstack/react-router";
import { 
  FiLogOut, 
  FiMenu, 
  FiRefreshCw,
  FiUsers, 
  FiChevronDown, 
  FiUser,
  FiDatabase,
  FiCode,
  FiTool,
  FiPieChart,
  FiTarget,
  FiMonitor,
  FiGlobe,
  FiFileText,
  FiBook,
  FiHelpCircle,
  FiShield,
  FiTrendingUp,
  FiSettings
} from "react-icons/fi";

import Logo from "/assets/images/roaming-proxy-network-logo.png";
import type { UserPublic } from "../../client";
import useAuth from "../../hooks/useAuth";

interface NavItem {
  title: string;
  icon?: any;
  path?: string;
  subItems?: SubItem[];
  description?: string;
}

interface SubItem {
  title: string;
  path: string;
  description?: string;
  icon?: any;
}

interface NavItemsProps {
  onClose?: () => void;
  isMobile?: boolean;
}


const navStructure: NavItem[] = [
  {
    title: "Web Scraping",
    icon: FiTool,
    description: "Professional web scraping tools and proxies for data collection",
    subItems: [
      { title: "HTTPs Request Proxy", path: "/tools/https-proxy", description: "Route HTTPS requests globally", icon: FiGlobe },
      { title: "HTML Scraper", path: "/tools/html-scraper", description: "Extract data from HTML websites with precision", icon:FiCode },
      { title: "API Scraper", path: "/tools/api-scraper", description: "Collect data from APIs with reliable proxies", icon: FiDatabase },
      { title: "Scheduler", path: "/tools/scheduler", description: "Automate your web scraping jobs with scheduling", icon: FiTarget },
      { title: "User-Agents", path: "/tools/user-agents", description: "Customize and rotate user-agent strings to mimic real browsers effortlessly", icon: FiUser},
      { title: "Rotating Proxy", path: "/tools/rotating-proxy", description: "Cycle through proxies seamlessly to maintain anonymity and avoid blocks", icon: FiRefreshCw },
      { title: "SOCKS5 Proxy", path: "/tools/socks5-proxy", description: "Leverage SOCKS5 proxies for secure and versatile web traffic routing", icon: FiShield},
      { title: "Proxy Dashboard", path: "/tools/proxy-dashboard", description: "Monitor and manage your web scraping proxies", icon: FiMonitor },
    ]
  },
  {
    title: "Solutions",
    icon: FiDatabase,
    description: "Data extraction and processing solutions for businesses",
    subItems: [
      { title: "Market Research", path: "/solutions/market-research", description: "Collect market data through web scraping", icon: FiPieChart },
      { title: "Price Monitoring", path: "/solutions/price-monitoring", description: "Track competitor pricing across websites", icon: FiTrendingUp },
      { title: "AI Training Data", path: "/solutions/training-ai", description: "Build machine learning datasets through web scraping", icon: FiDatabase },
      { title: "Content Aggregation", path: "/solutions/content-aggregation", description: "Gather content from multiple web sources", icon: FiFileText }
    ]
  },
  {
    title: "Network",
    icon: FiGlobe,
    description: "Worldwide proxy infrastructure for web scraping",
    subItems: [
      { title: "Proxy Locations", path: "/network/locations", description: "Browse our global proxy server locations", icon: FiGlobe },
      { title: "Network Status", path: "/network/status", description: "Check real-time proxy performance and availability", icon: FiMonitor },
      { title: "Security Features", path: "/network/security", description: "Learn about our proxy security protocols", icon: FiShield },
      { title: "Proxy Types", path: "/network/proxy-types", description: "Different proxy types for various scraping needs", icon: FiSettings }
    ]
  },
  {
    title: "Resources",
    icon: FiBook,
    description: "Documentation and learning resources for web scraping",
    subItems: [
      { title: "Useful Articles", path: "/resources/blog", description: "Learn how to use our our scraping APIs", icon: FiCode },
      { title: "Web Scraping Guides", path: "/resources/web-scraping-guides", description: "Learn how to use our web scraping tools effectively", icon: FiBook },
      { title: "Code Examples", path: "/resources/code-examples", description: "Sample code for web scraping in multiple languages", icon: FiCode },
      { title: "Support Center", path: "/resources/support-center", description: "Get help with your web scraping projects", icon: FiHelpCircle }
    ]
  },
  {
    title: "Pricing",
    path: "/pricing",
    description: "View our pricing plans and features"
  }
];

const NavItems = ({ onClose, isMobile = false }: NavItemsProps) => {
  const queryClient = useQueryClient();
  const textColor = "gray.800";
  const hoverColor = "red.600";
  const bgActive = "red.100";
  const activeTextColor = "red.800";
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const finalNavStructure = [...navStructure];
  if (currentUser?.is_superuser && !finalNavStructure.some(item => item.title === "Admin")) {
    finalNavStructure.push({ title: "Admin", icon: FiUsers, path: "/admin" });
  }

  const handleMenuToggle = (index: number) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  const renderNavItems = (items: NavItem[]) =>
    items.map(({ icon, title, path, subItems, description }, index) => {
      const isActive = activeMenuIndex === index;

      if (subItems) {
        return (
          <Box key={title} position="relative">
            <Flex
              as="button"
              px={4}
              py={2}
              color={textColor}
              _hover={{ color: hoverColor }}
              _active={{ bg: bgActive, color: activeTextColor }}
              align="center"
              onClick={() => handleMenuToggle(index)}
              w="100%"
            >
              {icon && <Icon as={icon} mr={2} />}
              <Text flex={1} textAlign="left">{title}</Text>
              <Icon as={FiChevronDown} ml={1} transform={isActive ? "rotate(180deg)" : "rotate(0deg)"} transition="transform 0.2s" />
            </Flex>
            {isActive && (
              <Box
                bg="white"
                w={isMobile ? "100%" : "100%"} // Full width within Container on desktop
                maxW={isMobile ? "100%" : "1200px"} // Match Container maxW
                mx={isMobile ? 0 : "auto"} // Center on desktop
                pl={isMobile ? 6 : 0}
                py={isMobile ? 2 : 4}
                position={isMobile ? "static" : "fixed"}
                top={isMobile ? "auto" : "60px"} // Below header (adjust if needed)
                left={isMobile ? "auto" : "50%"} // Center within viewport
                transform={isMobile ? "none" : "translateX(-50%)"} // Center align
                zIndex={20}
                boxShadow={isMobile ? "none" : "md"}
                borderRadius={isMobile ? 0 : "md"}
              >
                {/* Title and Subtitle */}
                <Box px={4} py={2} borderBottom="1px" borderColor="gray.200">
                  {/* <Text fontWeight="bold" fontSize="lg">{title}</Text> */}
                  {description && (
                    <Text fontSize="sm" color="gray.600" mt={1}>{description}</Text>
                  )}
                </Box>
                <Flex
                  direction={isMobile ? "column" : "row"}
                  wrap={isMobile ? "nowrap" : "wrap"}
                  justify={isMobile ? "flex-start" : "space-between"}
                  p={isMobile ? 0 : 4}
                >
                  {subItems.map((subItem) => (
                    <Box
                      key={subItem.title}
                      as={RouterLink}
                      to={subItem.path}
                      color={textColor}
                      _hover={{ color: hoverColor, bg: "gray.100" }}
                      onClick={() => {
                        if (isMobile && onClose) onClose();
                        setActiveMenuIndex(null);
                      }}
                      p={2}
                      flex={isMobile ? "none" : "0 0 25%"} // 4 per row on desktop
                      minW={isMobile ? "auto" : 0}
                    >
                      <Flex align="center">
                        {subItem.icon && <Icon as={subItem.icon} mr={2} />}
                        <Box>
                          <Text fontWeight="medium">{subItem.title}</Text>
                          {subItem.description && (
                            <Text fontSize="xs" color="gray.500">{subItem.description}</Text>
                          )}
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        );
      }

      return (
        <Flex
          key={title}
          as={RouterLink}
          to={path}
          px={4}
          py={2}
          color={textColor}
          _hover={{ color: hoverColor }}
          activeProps={{ style: { background: bgActive, color: activeTextColor } }}
          align="center"
          onClick={() => isMobile && onClose ? onClose() : null}
        >
          {icon && <Icon as={icon} mr={2} />}
          <Text>{title}</Text>
        </Flex>
      );
    });

  return (
    <Flex 
      align="center" 
      gap={2} 
      flexDir={isMobile ? "column" : "row"}
      justify="center"
    >
      {renderNavItems(finalNavStructure)}
    </Flex>
  );
};

const TopNav = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);
  const textColor = "gray.800";
  const hoverColor = "red.5600";

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Box w="100%">
      {/* Sticky Header */}
      <Box
        bg="red.50"
        px={4}
        py={2}
        position="sticky"
        top="0"
        zIndex="sticky"
        boxShadow="sm"
      >
        <Container maxW="1200px" px={0}>
          <Flex align="center" justify="space-between" w="100%">
            <Link href="/" as={RouterLink} onClick={onClose}>
              <Image src={Logo} alt="Web Scraping Proxy Network" h="40px" />
            </Link>

            <IconButton
              onClick={isOpen ? onClose : onOpen}
              display={{ base: "flex", md: "none" }}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              fontSize="20px"
              color="red.5600"
              icon={<FiMenu />}
              variant="ghost"
            />

            <Flex 
              align="center" 
              gap={4} 
              display={{ base: "none", md: "flex" }}
              flex={1}
              justify="center"
            >
              <NavItems /> {/* No onClose for desktop */}
            </Flex>

            <Flex 
              align="center" 
              display={{ base: "none", md: "flex" }}
            >
              {currentUser ? (
                <Box position="relative">
                  <Flex
                    as="button"
                    px={4}
                    py={2}
                    color={textColor}
                    _hover={{ color: hoverColor }}
                    onClick={onOpen}
                  >
                    <Icon as={FiUser} mr={2} />
                    <Text maxW="200px" isTruncated>{currentUser.email}</Text>
                    <Icon as={FiChevronDown} ml={1} />
                  </Flex>
                  {isOpen && (
                    <Box
                      position="absolute"
                      right={0}
                      top="100%"
                      bg="white"
                      boxShadow="md"
                      borderRadius="md"
                      zIndex={20}
                    >
                      <Box 
                        as={RouterLink} 
                        to="/settings" 
                        p={2} 
                        display="block" 
                        _hover={{ bg: "gray.100" }}
                        onClick={onClose}
                      >
                        Settings
                      </Box>
                      <Box 
                        as="button" 
                        p={2} 
                        display="block" 
                        _hover={{ bg: "gray.100" }} 
                        onClick={handleLogout}
                      >
                        Log out
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <Flex gap={2}>
                  <Button as={RouterLink} to="https://buy.stripe.com/4gwg1C2by9Cs2Ry6op" colorScheme="red" variant="solid" size="sm">
                    Start Free Trial
                  </Button>
                  <Button as={RouterLink} to="https://cloud.luxuryverse.com/login" variant="outline" colorScheme="red" size="sm">
                    Login
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Menu - Accordion Style */}
      <Box
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        bg="white"
        w="100%"
      >
        <Container maxW="1200px" px={0}>
          <Flex flexDir="column" py={4}>
            <NavItems onClose={onClose} isMobile={true} />
            {currentUser ? (
              <>
                <Text color={textColor} fontSize="sm" px={4} py={2}>
                  Logged in as: {currentUser.email}
                </Text>
                <Box
                  as={RouterLink}
                  to="/settings"
                  p={2}
                  px={4}
                  color={textColor}
                  _hover={{ color: hoverColor }}
                  onClick={onClose}
                >
                  Settings
                </Box>
                <Flex
                  as="button"
                  onClick={handleLogout}
                  color={hoverColor}
                  fontWeight="bold"
                  alignItems="center"
                  gap={2}
                  px={4}
                  py={2}
                >
                  <FiLogOut />
                  <Text>Log out</Text>
                </Flex>
              </>
            ) : (
              <Flex flexDir="column" gap={2} px={4} py={2}>
                <Button
                  as={RouterLink}
                  to="https://buy.stripe.com/4gwg1C2by9Cs2Ry6op"
                  colorScheme="red"
                  variant="solid"
                  size="sm"
                  onClick={onClose}
                >
                  Start Free Trial
                </Button>
                <Button
                  as={RouterLink}
                  to="https://cloud.luxuryverse.com/login"
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  onClick={onClose}
                >
                  Login
                </Button>
              </Flex>
            )}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default TopNav;