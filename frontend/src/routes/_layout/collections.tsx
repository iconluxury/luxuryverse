import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid, Spinner, Flex, Button } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/collections')({
  component: CollectionsPage,
});

function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.iconluxury.today';

  useEffect(() => {
    const fetchWithRedirect = async (url: string, maxRedirects = 5) => {
      let currentUrl = url;
      let redirects = 0;

      while (redirects < maxRedirects) {
        try {
          const response = await fetch(currentUrl, { 
            timeout: 10000,
            redirect: 'manual'
          });
          
          if (response.status >= 300 && response.status < 400) {
            const redirectUrl = response.headers.get('location');
            if (!redirectUrl) {
              throw new Error('Redirect response missing location header');
            }
            console.info(`Redirecting from ${currentUrl} to ${redirectUrl}`);
            currentUrl = redirectUrl;
            redirects++;
            continue;
          }
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          return await response.json();
        } catch (err) {
          throw err;
        }
      }
      throw new Error('Max redirects exceeded');
    };

    const fetchCollections = async (retryCount = 3, delay = 1000) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const data = await fetchWithRedirect(`${API_BASE_URL}/api/v1/collections`);
          setCollections(data);
          setError(null);
          break;
        } catch (err) {
          const errorMessage = `Attempt ${attempt} failed: ${(err as Error).message}`;
          console.error(errorMessage);
          if (attempt === retryCount) {
            setError(`Failed to load collections: ${(err as Error).message}`);
          } else {
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
          }
        } finally {
          if (attempt === retryCount || !error) {
            setLoading(false);
          }
        }
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={16} color="red.500">
        <Text fontSize="lg">{error}</Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or try again later.
        </Text>
        <Button
          mt={4}
          bg="yellow.400"
          color="gray.900"
          _hover={{ bg: 'yellow.500' }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4} bg="gray.900" color="white">
      <Text fontSize="2xl" mb={4}>Collections</Text>
      <Link to="/products" style={{ color: '#3182CE', marginBottom: '16px', display: 'block' }}>
        Go to Products
      </Link>
      {collections.length === 0 ? (
        <Text fontSize="lg" color="gray.300">
          No collections available at the moment.
        </Text>
      ) : (
        collections.map((collection: { id: string; title: string; products: { id: string; title: string; thumbnail: string; price: string }[] }) => (
          <Box key={collection.id} mb={8}>
            <Text fontSize="xl" mb={2}>
              <Link to={`/collections/${collection.id}`}>
                {collection.title}
              </Link>
            </Text>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
              {collection.products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" color="gray.900">
                    {product.thumbnail ? (
                      <Image src={product.thumbnail} alt={product.title} />
                    ) : (
                      <Box h="200px" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">No Image</Text>
                      </Box>
                    )}
                    <Box p={4}>
                      <Text fontWeight="bold">{product.title}</Text>
                      <Text>{product.price}</Text>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
}

export default CollectionsPage;