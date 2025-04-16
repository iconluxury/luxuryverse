import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid, Spinner, Flex, Button } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/product')({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.iconluxury.today';

  useEffect(() => {
    const fetchProducts = async (retryCount = 6, delay = 2000) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          console.debug(`Attempt ${attempt}: Fetching products from ${API_BASE_URL}/api/v1/products`);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

          const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
            signal: controller.signal,
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'omit',
          });

          clearTimeout(timeoutId);
          const headers = Object.fromEntries(response.headers.entries());
          console.debug(`Response status: ${response.status}, ok: ${response.ok}, headers: ${JSON.stringify(headers)}`);

          if (!response.ok) {
            if (response.status === 502) {
              throw new Error('Server error (502 Bad Gateway). The backend may be down or misconfigured.');
            }
            if (response.status === 0) {
              throw new Error('No response received. Possible CORS policy block or network issue.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.debug(`Fetched ${data.length} products`);
          setProducts(data);
          setError(null);
          break;
        } catch (err: any) {
          const errorMessage = `Attempt ${attempt} failed: ${err.message || 'Unknown error'}`;
          console.error(errorMessage);
          if (err.name === 'AbortError') {
            err.message = 'Request timed out after 30s. Please check the backend server status or your network.';
          }
          if (err.message.includes('Failed to fetch')) {
            err.message = 'Unable to connect: Possible CORS issue, server downtime, or network error. Check console for details.';
          }
          if (attempt === retryCount) {
            setError(`Failed to load products: ${err.message || 'Unable to connect to the server.'}`);
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
          Please check your network connection, ensure the backend is running, or contact{' '}
          <a href="mailto:support@iconluxury.today" style={{ color: '#3182CE' }}>
            support@iconluxury.today
          </a>.
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
          <Link key={product.id} to={`/product/${product.id}`}>
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