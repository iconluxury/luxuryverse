import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid, Spinner, Flex, Button } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/product')({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.API_BASE_URL || 'https://iconluxury.today';

  console.debug(`API_BASE_URL set to: ${API_BASE_URL}`);

  useEffect(() => {
    
    const fetchProducts = async (retryCount = 3, delay = 1000) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          console.debug(`Attempt ${attempt}: Fetching products from ${API_BASE_URL}/api/v1/products`);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);
    
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
          console.debug(`Response status: ${response.status}, ok: ${response.ok}`);
    
          if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${text.slice(0, 200)}`);
          }
    
          const data = await response.json();
          if (!Array.isArray(data)) {
            throw new Error('Expected an array of products');
          }
          setProducts(data.map(product => ({
            id: product.id || '',
            title: product.title || 'Untitled',
            price: product.price || 'N/A',
            thumbnail: product.thumbnail || null,
          })));
          setError(null);
          break;
        } catch (err) {
          let errorMessage = err.message || 'Unknown error';
          if (err.name === 'AbortError') {
            errorMessage = 'Request timed out after 15s.';
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect: Possible DNS, CORS, or server issue.';
          }
          console.error(`Attempt ${attempt} failed: ${errorMessage}`, err);
          if (attempt === retryCount) {
            setError(`Failed to load products: ${errorMessage}`);
          } else {
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
          }
        } finally {
          if (attempt === retryCount || !error) {
            setLoading(false);
          }
        }
      }
    };

    fetchProducts();
  }, []); };

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
        {products.map((product) => (
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