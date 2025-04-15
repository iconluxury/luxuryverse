import { createFileRoute } from '@tanstack/react-router';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Container,
  Input,
  FormControl,
  FormErrorMessage,
  Link,
  useToast,
  Image,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import Footer from '../../components/Common/Footer';
import theme from '../../theme';
import { useState, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { AuthContext } from '../../components/Common/TopNav';
import { OpenAPI } from '../../client';

export const Route = createFileRoute('/_layout/join')({
  component: JoinPage,
});

function JoinPage() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [xProfile, setXProfile] = useState(null);
  const { user, setJoining, login } = useContext(AuthContext);
  const { address, isConnected } = useAccount();

  // OAuth 2.0 config
  const clientId = 'N0p3ZG8yN3lWUFpWcUFXQjE4X206MTpjaQ';
  const redirectUri = 'https://psychic-space-goldfish-4jjjw7wp967xfqqj9-8000.app.github.dev/callback';
  const xAuthUrl = `https://api.x.com/2/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=users.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain`;

  // Sync wallet connection
  useEffect(() => {
    setJoining(true);
    if (isConnected && address && !user) {
      login({ address });
      toast({
        title: 'Wallet Connected',
        description: `Connected as ${address.slice(0, 6)}...${address.slice(-4)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isConnected, address, user, login, setJoining, toast]);

  // Handle X auth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      toast({
        title: 'X Auth Error',
        description: 'Failed to connect X profile. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (code && state === 'state') {
      const fetchXProfile = async () => {
        try {
          const response = await fetch('https://apis.iconluxury.today/x-auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, redirectUri }),
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch X profile: ${response.status} - ${errorText}`);
          }
          const data = await response.json();
          setXProfile(data);
          toast({
            title: 'X Profile Connected',
            description: `Logged in as @${data.username}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: 'X Auth Error',
            description: `Failed to connect X profile: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      };
      fetchXProfile();
    }
  }, [toast]);

  // Handle email subscription
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsEmailInvalid(true);
      return;
    }
    setIsEmailInvalid(false);

    try {
      // Call backend /subscribe endpoint
      const response = await fetch('https://apis.iconluxury.today/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          walletAddress: address,
          xUsername: xProfile?.username,
          xProfile,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
      toast({
        title: 'Subscribed',
        description: `Thank you for subscribing with ${email}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEmail('');
      setJoining(false);
      login({ address, xUsername: xProfile?.username, xProfile });
    } catch (error) {
      toast({
        title: 'Subscription Error',
        description: `Failed to subscribe: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.900" minH="100vh" color="white">
      <Container maxW="1000px" mx="auto" px={4} py={16}>
        <VStack spacing={12} align="start" w="full">
          <Heading as="h1" size={['lg', 'xl']} fontWeight="medium" color="yellow.400">
            Join LuxuryVerse
          </Heading>
          <Text fontSize={['md', 'lg']} color="gray.300">
            Step into a world of exclusive digital collectibles and luxury experiences. Follow these steps to join LuxuryVerse.
          </Text>

          {/* Step 1: Connect Wallet */}
          <Box w="full">
            <Heading as="h2" size={['md', 'lg']} fontWeight="medium" mb={4}>
              1. Connect Your Wallet
            </Heading>
            <Text fontSize={['sm', 'md']} mb={4} color="gray.400">
              Connect your crypto wallet for seamless access to LuxuryVerse collectibles.
            </Text>
            <VStack align="start" spacing={4}>
              {!isConnected && <appkit-button />}
              {isConnected && (
                <HStack spacing={4}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.400">
                      0.000 ETH
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {address ? `${address.slice(0, 4)}...${address.slice(-6)}` : ''}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                    </Text>
                  </VStack>
                </HStack>
              )}
              <Text fontSize="sm" mt={2} color="red.300">
                Warning: Always verify you’re on iconluxury.today before connecting your wallet.
              </Text>
            </VStack>
          </Box>

          {/* Step 2: Follow @LuxuryVerse & X Auth */}
          <Box w="full">
            <Heading as="h2" size={['md', 'lg']} fontWeight="medium" mb={4}>
              2. Follow @LuxuryVerse
            </Heading>
            <Text fontSize={['sm', 'md']} mb={4} color="gray.400">
              Connect your X account to follow @LuxuryVerse and create your collectible profile.
            </Text>
            <Tooltip label="Connect your X account to follow @LuxuryVerse">
              <Button
                as="a"
                href={xAuthUrl}
                bg="yellow.400"
                color="gray.900"
                _hover={{ bg: 'yellow.500' }}
                borderRadius="md"
                px={6}
                py={3}
                fontWeight="medium"
                isDisabled={!isConnected}
              >
                Connect X Profile
              </Button>
            </Tooltip>
            {xProfile && (
              <HStack mt={2} spacing={2}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" color="gray.500">
                    Connected as @{xProfile.username}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {xProfile.name}
                  </Text>
                </VStack>
              </HStack>
            )}
          </Box>

          {/* Step 3: Email Subscription */}
          <Box w="full">
            <Heading as="h2" size={['md', 'lg']} fontWeight="medium" mb={4}>
              3. Sign Up for Notifications
            </Heading>
            <Text fontSize={['sm', 'md']} mb={4} color="gray.400">
              Enter your email to receive order updates and exclusive offers.
            </Text>
            <form onSubmit={handleEmailSubmit}>
              <FormControl isInvalid={isEmailInvalid} maxW="400px">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="gray.800"
                  border="none"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  borderRadius="md"
                  px={4}
                  py={3}
                />
                <FormErrorMessage>Email is invalid.</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                bg="yellow.400"
                color="gray.900"
                _hover={{ bg: 'yellow.500' }}
                borderRadius="md"
                px={6}
                py={3}
                mt={4}
                fontWeight="medium"
                isDisabled={!isConnected || !xProfile}
              >
                Subscribe
              </Button>
            </form>
          </Box>

          {/* Additional Info */}
          <Box w="full">
            <Text fontSize={['sm', 'md']} color="gray.400">
              For more details, see our{' '}
              <Link href="/privacy" color="yellow.400" textDecoration="underline">
                Privacy Policy
              </Link>{' '}
              or contact us at{' '}
              <Link href="mailto:privacy@iconluxury.today" color="yellow.400" textDecoration="underline">
                privacy@iconluxury.today
              </Link>.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default JoinPage;