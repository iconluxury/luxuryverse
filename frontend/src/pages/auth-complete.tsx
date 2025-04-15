import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useToast } from '@chakra-ui/react';

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
    const receivedState = urlParams.get('state');

    if (error) {
      console.error('OAuth error:', error);
      toast({
        title: 'X Auth Error',
        description: `Failed to connect X profile: ${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      sessionStorage.removeItem('oauth_state');
      navigate({ to: '/join' });
      return;
    }

    const storedState = sessionStorage.getItem('oauth_state');
    console.log('Callback received:', { twitter, userId, receivedState, storedState });
    if (twitter === '1' && userId && receivedState === storedState) {
      const fetchXProfile = async (retryCount = 3) => {
        try {
          console.log('Fetching user details for user_id:', userId);
          const response = await fetch(`https://api.iconluxury.today/api/v1/x-auth/user/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
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
          toast({
            title: 'X Profile Connected',
            description: `Logged in as @${data.username}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate({ to: '/join' });
        } catch (error) {
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
          sessionStorage.removeItem('oauth_state');
          setIsProcessing(false);
        }
      };
      fetchXProfile();
    } else if (twitter === '1' && userId && receivedState !== storedState) {
      console.error('OAuth error: State mismatch', { receivedState, storedState });
      toast({
        title: 'X Auth Error',
        description: 'State mismatch during authentication. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      sessionStorage.removeItem('oauth_state');
      navigate({ to: '/join' });
      setIsProcessing(false);
    } else {
      navigate({ to: '/join' });
      setIsProcessing(false);
    }
  }, [toast, navigate]);

  if (isProcessing) {
    return <Box>Loading...</Box>;
  }

  return null; // Redirect handles navigation
}