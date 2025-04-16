import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useToast } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

// NEW: Add this file to src/routes/_layout/ to handle /auth-complete redirect
export const Route = createFileRoute('/_layout/auth-complete')({
  component: AuthComplete,
});

function AuthComplete() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const twitter = urlParams.get('twitter');
    const userId = urlParams.get('user_id');
    const error = urlParams.get('error');

    console.log('Auth-complete received:', { twitter, userId, error });

    if (error) {
      console.error('OAuth error:', error);
      toast({
        title: 'X Auth Error',
        description: `Failed to connect X profile: ${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate({ to: '/join' });
      setIsProcessing(false);
      return;
    }

    if (twitter === '1' && userId) {
      const fetchXProfile = async (retryCount = 3): Promise<void> => {
        try {
          console.log('Fetching user details for user_id:', userId);
          const response = await fetch(`https://iconluxury.today/api/v1/x-auth/user/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Fetch user error:', errorText);
            if (retryCount > 0 && response.status >= 500) {
              console.log(`Retrying... attempts left: ${retryCount}`);
              await new Promise(resolve => setTimeout(resolve, 2000));
              return fetchXProfile(retryCount - 1);
            }
            throw new Error(`Failed to fetch X profile: ${response.status} - ${errorText}`);
          }
          const data = await response.json();
          sessionStorage.setItem('x_profile', JSON.stringify(data));
          sessionStorage.setItem('x_user_id', userId);
          navigate({ to: '/join' });
        } catch (error: any) {
          console.error('X Auth Error:', error);
          toast({
            title: 'X Auth Error',
            description: `Failed to connect X profile: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          navigate({ to: '/join' });
        } finally {
          setIsProcessing(false);
        }
      };
      fetchXProfile();
    } else {
      console.error('Invalid auth-complete parameters:', { twitter, userId });
      toast({
        title: 'X Auth Error',
        description: 'Invalid authentication parameters. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate({ to: '/join' });
      setIsProcessing(false);
    }
  }, [toast, navigate]);

  if (isProcessing) {
    return <Box>Loading...</Box>;
  }

  return null;
}