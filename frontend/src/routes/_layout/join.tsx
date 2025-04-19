import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Container,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  useToast,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import validator from 'validator';
import Footer from '../../components/Common/Footer';

interface XProfile {
  id: string;
  username: string;
  name: string;
  email?: string;
  location?: string;
  description?: string;
  profile_image_url?: string;
}

export const Route = createFileRoute('/_layout/join')({
  component: JoinPage,
});

function JoinPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [email, setEmail] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [xProfile, setXProfile] = useState<XProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isXAuthLoading, setIsXAuthLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isXConnected, setIsXConnected] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://iconluxury.shop/api/v1';

  const initiateXAuth = useCallback(async () => {
    if (isXAuthLoading) return;
    setIsXAuthLoading(true);
    try {
      sessionStorage.removeItem('x_profile');
      sessionStorage.removeItem('x_user_id');
      const response = await fetch(`${API_BASE_URL}/x-auth/request-token`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch request token: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      window.location.href = data.authorization_url;
    } catch (error: any) {
      toast({
        title: 'X Authentication Error',
        description: error.message || 'Failed to connect X account. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsXAuthLoading(false);
    }
  }, [isXAuthLoading, toast, API_BASE_URL]);

  useEffect(() => {
    // Handle stored X profile
    const storedProfile = sessionStorage.getItem('x_profile');
    const storedUserId = sessionStorage.getItem('x_user_id');
    if (storedProfile && storedUserId) {
      try {
        const profile: XProfile = JSON.parse(storedProfile);
        setXProfile(profile);
        setUserId(storedUserId);
        setIsXConnected(true);
        toast({
          title: 'X Profile Connected',
          description: `Connected as @${profile.username}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'X Profile Error',
          description: 'Failed to load X profile. Please reconnect.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

    // Handle malformed URLs
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      toast({
        title: 'X Authentication Error',
        description: error || 'Invalid authentication parameters.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      window.history.replaceState({}, document.title, '/join');
    }
  }, [toast]);

  useEffect(() => {
    // Show wallet connection toast
    if (isConnected && address) {
      toast({
        title: 'Wallet Connected',
        description: `Connected as ${address.slice(0, 6)}...${address.slice(-4)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isConnected, address, toast]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setIsEmailInvalid(true);
      return;
    }
    setIsEmailInvalid(false);
    setIsSubmitting(true);

    try {
      const htmlContent = `
        <body>
          <h1>New User Submission - LuxuryVerse</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>X Username:</strong> ${xProfile?.username || 'N/A'}</p>
          <p><strong>X Name:</strong> ${xProfile?.name || 'N/A'}</p>
          <p><strong>X Profile ID:</strong> ${userId || 'N/A'}</p>
          <p><strong>Wallet Address:</strong> ${address || 'N/A'}</p>
        </body>
      `;
      const response = await fetch(`${API_BASE_URL}/utils/send-email/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_to: 'nik@luxurymarket.com',
          subject: 'LuxuryVerse - New User Submission',
          html_content: htmlContent,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
      }
      toast({
        title: 'Submission Successful',
        description: 'Your details have been submitted. Welcome to LuxuryVerse!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEmail('');
      navigate({ to: '/collections' });
    } catch (error: any) {
      toast({
        title: 'Submission Error',
        description: error.message || 'Failed to submit details. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="transparent" minH="100vh" color="white" py={[8, 12]}>
      <Container maxW="container.md" px={[4, 6]} py={12}>
        <VStack spacing={10} align="stretch">
          <VStack spacing={4} align="stretch">
            <Heading as="h1" size={['lg', 'xl']} color="green.400">
              Join LuxuryVerse
            </Heading>
            <Text fontSize={['md', 'lg']} color="gray.300">
              Sign up in three simple steps to access exclusive digital collectibles.
            </Text>
          </VStack>

          {/* Step 1: Connect Wallet */}
          <Box>
            <Heading as="h2" size="md" mb={3} color="white">
              Step 1: Connect Your Wallet
            </Heading>
            <Text fontSize="sm" mb={4} color="gray.400">
              Link your crypto wallet to interact with LuxuryVerse.
            </Text>
            {!isConnected ? (
              <appkit-button />
            ) : (
              <HStack>
                <Text fontSize="sm" color="gray.400">
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </Text>
              </HStack>
            )}
            <Text fontSize="xs" mt={2} color="red.300">
              Verify you’re on iconluxury.shop before connecting your wallet.
            </Text>
          </Box>

          {/* Step 2: Connect X Profile */}
          <Box>
            <Heading as="h2" size="md" mb={3} color="white">
              Step 2: Connect X Profile
            </Heading>
            <Text fontSize="sm" mb={4} color="gray.400">
              Link your X account to join the LuxuryVerse community.
            </Text>
            <Tooltip label={isXConnected ? 'X Profile Connected' : 'Connect your X account'}>
              <Button
                onClick={initiateXAuth}
                bg="green.400"
                color="gray.900"
                _hover={{ bg: isXConnected ? 'green.400' : 'green.500' }}
                px={6}
                py={3}
                isDisabled={!isConnected || isXConnected}
                isLoading={isXAuthLoading}
                loadingText="Connecting..."
              >
                {isXConnected ? 'Connected' : 'Connect X Profile'}
              </Button>
            </Tooltip>
            {xProfile && (
              <Text fontSize="sm" mt={2} color="gray.400">
                Connected as @{xProfile.username}
              </Text>
            )}
          </Box>

          {/* Step 3: Submit Email */}
          <Box>
            <Heading as="h2" size="md" mb={3} color="white">
              Step 3: Submit Email
            </Heading>
            <Text fontSize="sm" mb={4} color="gray.400">
              Enter your email to complete your sign-up.
            </Text>
            {!isXConnected ? (
              <Text fontSize="sm" color="gray.500">
                Please connect your X profile to proceed.
              </Text>
            ) : (
              <form onSubmit={handleEmailSubmit}>
                <FormControl isInvalid={isEmailInvalid} maxW="sm">
                  <FormLabel htmlFor="email" fontSize="sm">
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="gray.800"
                    border="none"
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    px={4}
                    py={3}
                    aria-describedby={isEmailInvalid ? 'email-error' : undefined}
                  />
                  <FormErrorMessage id="email-error">Please enter a valid email.</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  bg="green.400"
                  color="gray.900"
                  _hover={{ bg: 'green.500' }}
                  px={6}
                  py={3}
                  mt={4}
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                >
                  Join Now
                </Button>
              </form>
            )}
          </Box>

          <Text fontSize="sm" color="gray.400">
            By joining, you agree to our{' '}
            <Link href="/privacy" color="green.400" textDecoration="underline">
              Privacy Policy
            </Link>
            . Questions? Contact{' '}
            <Link href="mailto:privacy@luxuryverse.com" color="green.400" textDecoration="underline">
              privacy@luxuryverse.com
            </Link>.
          </Text>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default JoinPage;