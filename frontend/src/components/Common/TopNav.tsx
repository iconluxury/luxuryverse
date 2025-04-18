import { Flex, Heading, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from '@chakra-ui/react';
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
        width="100vw" // Respect viewport width
        zIndex={10}
        mt={{ base: '0.5rem', md: 0 }}
        backdropFilter="blur(5px)"
        overflowX="hidden" // Prevent horizontal overflow
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
            fontSize={{ base: '0.5rem', md: '0.875rem' }} // 8px mobile, 14px desktop
            color="var(--color-primary)"
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
              <Link
                key={to}
                to={to}
                style={{
                  color: label === text ? 'var(--color-primary-hover)' : 'var(--color-primary)',
                  textDecoration: 'none',
                  fontFamily: "'Special Gothic Expanded One', sans-serif",
                  fontWeight: 'var(--font-weight-normal)',
                  textTransform: 'uppercase',
                }}
                _hover={{
                  color: 'var(--color-primary-hover)',
                }}
                onClick={() => navigate({ to })}
              >
                {label}
              </Link>
            ))}
          </Flex>
          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            icon={<HamburgerIcon />}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            bg="transparent"
            color="var(--color-primary)"
            _hover={{ color: 'var(--color-primary-hover)' }}
            size="xs"
            ml="auto" // Pin to right edge
          />
        </Flex>
      </Flex>
      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={closeMenu}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(10, 10, 10, 0.9)" color="white" maxW={{ base: '75%', sm: '250px' }}>
          <DrawerCloseButton color="var(--color-primary)" />
          <DrawerHeader
            fontFamily="'Special Gothic Expanded One', sans-serif"
            color="var(--color-primary)"
          >
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: label === text ? 'var(--color-primary-hover)' : 'var(--color-primary)',
                    textDecoration: 'none',
                    fontFamily: "'Special Gothic Expanded One', sans-serif",
                    fontWeight: 'var(--font-weight-normal)',
                    textTransform: 'uppercase',
                    padding: '0.5rem',
                  }}
                  _hover={{
                    color: 'var(--color-primary-hover)',
                  }}
                  onClick={() => {
                    navigate({ to });
                    closeMenu();
                  }}
                >
                  {label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}