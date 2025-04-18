import { Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useState } from 'react';

// AuthContext
export const AuthProvider = createContext({
  user: null,
  isJoining: false,
  login: () => {},
  logout: () => {},
  setJoining: () => {},
});

export default function TopNav() {
  const { user, isJoining } = useContext(AuthProvider);
  const navigate = useNavigate();

  const getButtonProps = () => {
    if (user) {
      return {
        text: 'Profile',
        onClick: () => navigate({ to: '/profile' }),
        bg: 'var(--color-primary)', // #c2a0e5d9 (light purple)
        color: 'var(--color-background)', // #0A0A0A (black)
        _hover: { bg: 'var(--color-primary-hover)' }, // #58fb6cd9 (green)
      };
    }
    if (isJoining) {
      return {
        text: 'Join',
        onClick: () => navigate({ to: '/join' }),
        bg: 'var(--color-primary)', // #c2a0e5d9
        color: 'var(--color-background)', // #0A0A0A
        _hover: { bg: 'var(--color-primary-hover)' }, // #58fb6cd9
      };
    }
    return {
      text: 'Login',
      onClick: () => navigate({ to: '/join' }),
      bg: 'var(--color-primary)', // #c2a0e5d9
      color: 'var(--color-background)', // #0A0A0A
      _hover: { bg: 'var(--color-primary-hover)' }, // #58fb6cd9
    };
  };

  const { text, onClick, bg, color, _hover } = getButtonProps();

  return (
    <Flex
      bg="rgba(10, 10, 10, 0.5)" // Semi-transparent black
      p={4}
      justify="center"
      width="100%"
      position="fixed"
      top={0}
      zIndex={10}
      mt={{ base: '2rem', md: 0 }} // Push down on small screens
    >
      <Flex
        maxW="80rem" // Match .container
        width="100%"
        px={{ base: '1rem', md: '1rem' }} // --spacing-md
        justify={{ base: 'space-between', md: 'space-between' }} // Spread items evenly
        align="center" // Vertically center all items
        direction={{ base: 'row', md: 'row' }} // Row layout on all screens
        gap={{ base: 2, md: 4 }} // Spacing between items
      >
        {/* Logo */}
        <Heading
          size="md"
          color="var(--color-primary)" // #c2a0e5d9
          fontFamily="'Special Gothic Expanded One', sans-serif"
        >
          <Link to="/" className="luxuryverse-logo">
            LuxuryVerse
          </Link>
        </Heading>

        {/* Navigation Links */}
        <Flex
          gap={4}
          alignItems="center"
          flexWrap="wrap"
          justify="center" // Center links
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/roadmap', label: 'Roadmap' },
            { to: '/authenticity', label: 'Authenticity' },
            { to: '/faq', label: 'FAQ' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                color: 'var(--color-primary)', // #c2a0e5d9
                textDecoration: 'none',
                fontFamily: "'Special Gothic Expanded One', sans-serif",
              }}
              _hover={{
                color: 'var(--color-primary-hover)', // #58fb6cd9
              }}
            >
              {label}
            </Link>
          ))}
        </Flex>

        {/* Button */}
        <Button
          onClick={onClick}
          bg={bg}
          color={color}
          _hover={_hover}
          borderRadius="md"
          px={4}
          py={2}
          fontWeight="medium"
          size="sm"
          fontFamily="'DM Sans', sans-serif"
        >
          {text}
        </Button>
      </Flex>
    </Flex>
  );
}