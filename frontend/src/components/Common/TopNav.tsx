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
  const [isJoining occupa, setJoining] = useState(false);

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
        bg: 'purple.500',
        color: 'white',
      };
    }
    if (isJoining) {
      return {
        text: 'Join',
        onClick: () => navigate({ to: '/join' }),
        bg: 'yellow.400',
        color: 'gray.900',
      };
    }
    return {
      text: 'Login',
      onClick: () => navigate({ to: '/join' }),
      bg: 'purple.300',
      color: 'gray.900',
    };
  };

  const { text, onClick, bg, color } = getButtonProps();

  return (
    <Flex
      bg="gray.800"
      p={4}
      justify="space-between"
      align="center"
      px={{ base: 4, md: 8 }}
    >
      <Heading size="md" color="purple.300">
        <Link to="/" className="luxuryverse-logo">
          LuxuryVerse
        </Link>
      </Heading>
      <Flex gap={4} alignItems="center">
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Home
        </Link>
        <Link
          to="/roadmap"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Roadmap
        </Link>
        <Link
          to="/authenticity"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Authenticity
        </Link>
        <Link
          to="/faq"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          FAQ
        </Link>
        <Link
          to="/contact"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Contact
        </Link>
        <Button
          onClick={onClick}
          bg={bg}
          color={color}
          _hover={{
            bg:
              bg === 'purple.500'
                ? 'purple.600'
                : bg === 'yellow.400'
                ? 'yellow.500'
                : 'purple.400',
          }}
          borderRadius="md"
          px={4}
          py={2}
          fontWeight="medium"
          size="sm"
          fontFamily="DM Sans, sans-serif"
        >
          {text}
        </Button>
      </Flex>
    </Flex>
  );
}