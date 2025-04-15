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
  const [user, setUser] = useState(null); // e.g., { address: "0x..." }
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
      onClick: () => navigate({ to: '/join' }), // Redirect to join
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
        <Link to="/">LuxuryVerse</Link>
      </Heading>
      <Flex gap={4} alignItems="center">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/roadmap" style={{ color: 'white', textDecoration: 'none' }}>
          Roadmap
        </Link>
        <Link to="/authenticity" style={{ color: 'white', textDecoration: 'none' }}>
          Authenticity
        </Link>
        <Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>
          FAQ
        </Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
          Contact
        </Link>
        <Button
          onClick={onClick}
          bg={bg}
          color={color}
          _hover={{ bg: bg === 'purple.500' ? 'purple.600' : bg === 'yellow.400' ? 'yellow.500' : 'purple.400' }}
          borderRadius="md"
          px={4}
          py={2}
          fontWeight="medium"
          size="sm"
        >
          {text}
        </Button>
      </Flex>
    </Flex>
  );
}