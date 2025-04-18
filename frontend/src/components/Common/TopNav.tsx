import { Flex, Heading, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function TopNav() {
  const { user, isJoining } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
      text: isJoining ? 'Join' : 'Shop',
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
            color="primary.500"
            fontFamily="'Special Gothic Expanded One', sans-serif"
            lineHeight="1.1"
            className={pathname !== '/' ? 'glitch dela-gothic-one-regular' : ''}
          >
            <Link to="/" className="luxuryverse-logo">
              <Flex
                flexDir={{ base: 'column', md: 'row' }}
                align={{ base: 'flex-start', md: 'center' }}
                gap={{ base: 0, md: 0.5 }}
              >
                <span data-text="Luxury">Luxury</span>
                <span data-text="Verse">Verse</span>
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
                  color: label === text ? '#00FF00' : 'primary.500', // Green for Shop/Join/Profile, blue-grey for others
                  textDecoration: 'none',
                  fontFamily: "'Special Gothic Expanded One', sans-serif",
                  fontWeight: 'var(--font-weight-normal)',
                  textTransform: 'uppercase',
                }}
                _hover={{ color: 'green.500' }}
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
            color="white"
            _hover={{ color: 'gray.300' }}
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
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: label === text ? '#00FF00' : 'primary.500', // Green for Shop/Join/Profile, blue-grey for others
                    textDecoration: 'none',
                    fontFamily: "'Special Gothic Expanded One', sans-serif",
                    fontWeight: 'var(--font-weight-normal)',
                    textTransform: 'uppercase',
                    padding: '0.5rem',
                  }}
                  _hover={{
                    color: label === text ? 'green.400' : 'gray.300', // Lighter green for auth hover, light gray for others
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
      <style jsx global>{`
        .glitch {
          position: relative;
          font-family: var(--font-family-glitch);
          animation: glitch 0.3s linear infinite;
        }

        .glitch span {
          position: relative;
          display: inline-block;
        }

        .glitch span::before,
        .glitch span::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip: rect(0, 0, 0, 0);
        }

        .glitch span::before {
          color: var(--color-primary-hover); /* Green (#58fb6cd9) */
          animation: glitch-top 1s linear infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        .glitch span::after {
          color: cyan.500; /* Cyan (#00e5ffd9) */
          animation: glitch-bottom 1.5s linear infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-top {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
            transform: translate(-2px, -1px);
          }
          50% {
            clip-path: polygon(0 0, 100% 0, 100% 10%, 0 10%);
            transform: translate(2px, 1px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
            transform: translate(-2px, -1px);
          }
        }

        @keyframes glitch-bottom {
          0% {
            clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            transform: translate(2px, 1px);
          }
          50% {
            clip-path: polygon(0 90%, 100% 90%, 100% 100%, 0 100%);
            transform: translate(-2px, -1px);
          }
          100% {
            clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            transform: translate(2px, 1px);
          }
        }
      `}</style>
    </>
  );
}