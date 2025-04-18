import { Flex, Heading, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Box } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from '@tanstack/react-router';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function TopNav() {
  const { user, isJoining } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getAuthLinkProps = () => {
    if (user) {
      return {
        text: 'Profile',
        to: '/profile',
      };
    }
    return {
      text: isJoining ? 'Join' : 'Login',
      to: '/join',
    };
  };

  const { text, to } = getAuthLinkProps();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/authenticity', label: 'Authenticity' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
    { to, label: text },
  ];

  return (
    <>
      <Flex
        bg="rgba(10, 10, 10, 0.5)"
        p={{ base: 2, md: 4 }}
        justify="center"
        width="100vw"
        zIndex={10}
        mt={{ base: '0.5rem', md: 0 }}
        backdropFilter="blur(5px)"
        overflowX="hidden"
      >
        <Flex
          maxW={{ base: '100%', md: '80rem' }}
          width="100%"
          px={{ base: '0.25rem', md: '1rem' }}
          justify={{ base: 'space-between', md: 'space-between' }}
          align="center"
          direction={{ base: 'row', md: 'row' }}
          gap={{ base: 0.5, md: 2 }}
        >
          <Heading
            size="xs"
            fontSize={{ base: '0.5rem', md: '0.875rem' }}
            color="white"
            fontFamily="'Special Gothic Expanded One', sans-serif"
            lineHeight="1.1"
          >
            <Link to="/" className="luxuryverse-logo">
              <Flex
                flexDir={{ base: 'column', md: 'row' }}
                align={{ base: 'flex-start', md: 'center' }}
                gap={{ base: 0, md: 0.5 }}
              >
                <span>Luxury</span>
                <span>Verse</span>
              </Flex>
            </Link>
          </Heading>
          {/* Desktop Menu */}
          <Flex
            display={{ base: 'none', md: 'flex' }}
            gap={4}
            flexWrap="wrap"
            justify="center"
            align="center"
          >
            {navItems.map(({ to, label }) => (
              <Box
                key={to}
                as="span"
                display="inline-block"
                _hover={{ color: 'gray.400' }}
                fontSize={{ base: '0.75rem', md: '0.875rem' }} // Match Footer nav links
              >
                <Link
                  to={to}
                  style={{
                    color: label === text ? '#00FF00' : 'white', // Green for Login/Join/Profile, white for others
                    textDecoration: 'none',
                    fontFamily: "'Special Gothic Expanded One', sans-serif",
                    fontWeight: 'var(--font-weight-normal)',
                    textTransform: 'uppercase',
                  }}
                  onClick={() => navigate({ to })}
                >
                  {label}
                </Link>
             </Box>
            ))}
          </Flex>
          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            icon={<HamburgerIcon />}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            bg="transparent"
            color="white"
            _hover={{ color: '#E0E0E0' }}
            size="xs"
            ml="auto"
          />
        </Flex>
      </Flex>
      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={closeMenu}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(10, 10, 10, 0.9)" color="white" maxW={{ base: '75%', sm: '250px' }}>
          <DrawerCloseButton color="white" />
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map(({ to, label }) => (
                <Box
                  key={to}
                  as="span"
                  display="block"
                  _hover={{
                    color: label === text ? '#33FF33' : '#E0E0E0', // Lighter green for auth hover, light gray for others
                  }}
                  fontSize={{ base: '0.75rem', md: '0.875rem' }} // Match Footer nav links
                >
                  <Link
                    to={to}
                    style={{
                      color: label === text ? '#00FF00' : 'white', // Green for Login/Join/Profile, white for others
                      textDecoration: 'none',
                      fontFamily: "'Special Gothic Expanded One', sans-serif",
                      fontWeight: 'var(--font-weight-normal)',
                      textTransform: 'uppercase',
                      padding: '0.5rem',
                      display: 'block', // Ensure full-width click area
                    }}
                    onClick={() => {
                      navigate({ to });
                      closeMenu();
                    }}
                  >
                  {label}
                  </Link>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}