import { Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useState } from 'react';

// AuthContext
export const AuthContext = createContext({
  user: null,
  isJoining: false,
  login: () => {},
  logout: () => {},
  setJoining: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // e.g., { address, xUsername, xProfile }
  const [isJoining, setJoining] = useState(false);

  const login = async (userData) => {
    setUser(userData);
    setJoining(false);
  };

  const logout = () => {
    setUser(null);
    setJoining(false);
  };

  return (
    <AuthContext.Provider value={{ user, isJoining, login, logout, setJoining }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function TopNav() {
  const { user, isJoining } = useContext(AuthContext);
  const navigate = useNavigate();

  const getButtonProps = () => {
    if (user) {
      return {
        text: 'Profile',
        onClick: () => navigate({ to: '/profile' }),
        bg: '#00E5FF', // --color-primary
        color: '#0A0A0A', // --color-background
      };
    }
    if (isJoining) {
      return {
        text: 'Join',
        onClick: () => navigate({ to: '/join' }),
        bg: '#00E5FF', // --color-primary
        color: '#0A0A0A', // --color-background
      };
    }
    return {
      text: 'Login',
      onClick: () => navigate({ to: '/join' }),
      bg: '#00E5FF', // --color-primary
      color: '#0A0A0A', // --color-background
    };
  };

  const { text, onClick, bg, color } = getButtonProps();

  return (
    <Flex
      bg="rgba(10, 10, 10, 0.5)" // Black with 50% transparency
      p={4}
      justify="center"
      width="100%"
      mt={{ base: '2rem', md: '4rem' }} // Account for header
    >
      <Flex
        maxW="80rem" // Match .container
        width="100%"
        px={{ base: '1rem', md: '1rem' }} // --spacing-md
        justify={{ base: 'flex-start', md: 'space-between' }} // Left on small, spread on large
        align="center"
        direction={{ base: 'column', md: 'row' }} // Stack on small screens
        gap={{ base: 2, md: 4 }} // Spacing between items
      >
        {/* Logo */}
        <Heading
          size="md"
          color="#00E5FF" // --color-primary
          alignSelf={{ base: 'flex-start', md: 'center' }} // Left on small, center on large
          lineHeight="1.2" // Match CSS --line-height-heading
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
          justify={{ base: 'flex-start', md: 'center' }} // Left on small, center on large
        >
          <Link
            to="/"
            style={{
              color: '#3A4A4F', // --color-border (muted)
              textDecoration: 'none',
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              fontSize: 'var(--font-size-base)', // 1rem for readability
              lineHeight: '1.2', // Align with logo
            }}
            _hover={{ color: '#00E5FF' }} // --color-primary
          >
            Home
          </Link>
          <Link
            to="/roadmap"
            style={{
              color: '#3A4A4F', // --color-border
              textDecoration: 'none',
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              fontSize: 'var(--font-size-base)',
              lineHeight: '1.2',
            }}
            _hover={{ color: '#00E5FF' }}
          >
            Roadmap
          </Link>
          <Link
            to="/authenticity"
            style={{
              color: '#3A4A4F', // --color-border
              textDecoration: 'none',
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              fontSize: 'var(--font-size-base)',
              lineHeight: '1.2',
            }}
            _hover={{ color: '#00E5FF' }}
          >
            Authenticity
          </Link>
          <Link
            to="/faq"
            style={{
              color: '#3A4A4F', // --color-border
              textDecoration: 'none',
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              fontSize: 'var(--font-size-base)',
              lineHeight: '1.2',
            }}
            _hover={{ color: '#00E5FF' }}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            style={{
              color: '#3A4A4F', // --color-border
              textDecoration: 'none',
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              fontSize: 'var(--font-size-base)',
              lineHeight: '1.2',
            }}
            _hover={{ color: '#00E5FF' }}
          >
            Contact
          </Link>
        </Flex>

        {/* Button */}
        <Button
          onClick={onClick}
          bg={bg}
          color={color}
          _hover={{
            bg: '#00B8CC', // --color-primary-hover
          }}
          borderRadius="md"
          px={4}
          py={2}
          fontWeight="medium"
          size="sm"
          fontFamily="'Special Gothic Expanded One', sans-serif"
          lineHeight="1.2" // Align with logo
        >
          {text}
        </Button>
      </Flex>
    </Flex>
  );
}