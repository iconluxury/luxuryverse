// src/components/Common/TopNav.tsx
import { Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const AuthContext = createContext({
  user: null,
  isJoining: false,
  login: () => {},
  logout: () => {},
  setJoining: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isJoining, setJoining] = useState(false);
  const { address, isConnected, isConnecting, error: walletError } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    // Restore session from localStorage
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress && !isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  }, [connectors, isConnected, connect]);

  useEffect(() => {
    if (isConnected && address) {
      setUser({ address });
      setJoining(false);
      localStorage.setItem('walletAddress', address);
    } else if (connectError || walletError) {
      console.error('Wallet connection failed:', connectError || walletError);
      setJoining(false);
    }
  }, [address, isConnected, connectError, walletError]);

  const login = async () => {
    try {
      setJoining(true);
      if (!isConnected && connectors.length > 0) {
        await connect({ connector: connectors[0] });
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setJoining(false);
    }
  };

  const logout = () => {
    disconnect();
    setUser(null);
    setJoining(false);
    localStorage.removeItem('walletAddress');
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