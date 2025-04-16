import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid, Spinner, Flex, Button } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
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
            redirect: 'manual' // Handle redirects manually
          });
          
          if (response.status >= 300 && response.status < 400) {
            const redirectUrl = response.headers.get('location');
            if (!redirectUrl) {
              throw new Error('Redirect response missing location header');
            }
            logger.info(`Redirecting from ${currentUrl} to ${redirectUrl}`);
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

    const fetchProducts = async (retryCount = 3, delay = 1000) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const data = await fetchWithRedirect(`${API_BASE_URL}/api/v1/products`);
          setProducts(data);
          setError(null);
          break;
        } catch (err) {
          const errorMessage = `Attempt ${attempt} failed: ${(err as Error).message}`;
          console.error(errorMessage);
          if (attempt === retryCount) {
            setError(`Failed to load products: ${(err as Error).message}`);
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

    fetchProducts();
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
      <Text fontSize="2xl" mb={4}>Products</Text>
      <Link to="/collections" style={{ color: '#3182CE', marginBottom: '16px', display: 'block' }}>
        Go to Collections
      </Link>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {products.map((product: { id: string; title: string; thumbnail: string; price: string }) => (
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
  );
}

export default ProductsPage;