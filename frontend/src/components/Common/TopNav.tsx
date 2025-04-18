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
        bg: '#D4A017', // --color-primary
        color: '#F5F6F5', // --color-text (white)
      };
    }
    if (isJoining) {
      return {
        text: 'Join',
        onClick: () => navigate({ to: '/join' }),
        bg: '#D4A017', // --color-primary
        color: '#F5F6F5', // --color-text
      };
    }
    return {
      text: 'Login',
      onClick: () => navigate({ to: '/join' }),
      bg: '#D4A017', // --color-primary
      color: '#F5F6F5', // --color-text
    };
  };

  const { text, onClick, bg, color } = getButtonProps();

  return (
    <Flex
      bg="rgba(10, 10, 10, 0.5)" // Black with 50% transparency
      p={4}
      align="center"
      px={{ base: 4, md: 8 }}
      position="relative"
    >
      {/* Left spacer for centering */}
      <Flex flex={1} />
      
      {/* Centered Logo */}
      <Heading
        size="md"
        color="purple.300"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        <Link to="/" className="luxuryverse-logo">
          LuxuryVerse
        </Link>
      </Heading>
      
      {/* Right Navigation Links */}
      <Flex flex={1} justify="flex-end" gap={4} alignItems="center">
        <Link
          to="/"
          style={{
            color: '#F5F6F5', // --color-text
            textDecoration: 'none',
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          }}
        >
          Home
        </Link>
        <Link
          to="/roadmap"
          style={{
            color: '#F5F6F5',
            textDecoration: 'none',
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          }}
        >
          Roadmap
        </Link>
        <Link
          to="/authenticity"
          style={{
            color: '#F5F6F5',
            textDecoration: 'none',
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          }}
        >
          Authenticity
        </Link>
        <Link
          to="/faq"
          style={{
            color: '#F5F6F5',
            textDecoration: 'none',
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          }}
        >
          FAQ
        </Link>
        <Link
          to="/contact"
          style={{
            color: '#F5F6F5',
            textDecoration: 'none',
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          }}
        >
          Contact
        </Link>
        <Button
          onClick={onClick}
          bg={bg}
          color={color}
          _hover={{
            bg: '#B8860B', // --color-primary-hover
          }}
          borderRadius="md"
          px={4}
          py={2}
          fontWeight="medium"
          size="sm"
          fontFamily="'Special Gothic Expanded One', sans-serif"
        >
          {text}
        </Button>
      </Flex>
    </Flex>
  );
}