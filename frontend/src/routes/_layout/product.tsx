import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid, Spinner, Flex, Button } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/product')({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ensure API_BASE_URL is always HTTPS
  const API_BASE_URL = (process.env.API_BASE_URL || 'https://iconluxury.shop')
    .replace(/^http:/, 'https:')
    .replace(/\/+$/, '');

  // Log the URL for debugging
  console.log('API_BASE_URL:', API_BASE_URL);

  // Logging utility (disabled in production)
  const logDebug = process.env.NODE_ENV === 'development' ? console.debug : () => {};

  useEffect(() => {
    const fetchProducts = async (retryCount = 3, delay = 3000) => {
      if (!hasMore) return;
      setLoading(true);
      const url = `${API_BASE_URL}/api/v1/products/`;
      console.log('Fetching from:', url); // Debug log

      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          logDebug(`Attempt ${attempt}: Fetching products from ${url}`);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

          const response = await fetch(url, {
            signal: controller.signal,
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });

          clearTimeout(timeoutId);
          logDebug(`Response status: ${response.status}, ok: ${response.ok}`);

          if (!response.ok) {
            const text = await response.text();
            if (response.status === 404) {
              throw new Error('API route not found (404). Please contact support@iconluxury.shop.');
            }
            if (response.status === 403) {
              throw new Error('Access denied by server (403). Please contact support@iconluxury.shop.');
            }
            if (response.status === 500) {
              throw new Error('Server error (500). Please try again later or contact support@iconluxury.shop.');
            }
            throw new Error(`HTTP error! status: ${response.status}, body: ${text.slice(0, 200)}`);
          }

          const data = await response.json();
          if (!Array.isArray(data)) {
            throw new Error('Expected an array of products');
          }

          setProducts((prev) => [
            ...prev,
            ...data.map((product) => ({
              id: product.id || '',
              title: product.title || 'Untitled',
              price: product.price || 'N/A',
              thumbnail: product.thumbnail || null,
            })),
          ]);
          setHasMore(data.length === 20);
          setError(null);
          break;
        } catch (err) {
          let errorMessage = err.message || 'Unknown error';
          let userErrorMessage = 'Unable to load products. Please try again later.';
          if (err.name === 'AbortError') {
            errorMessage = 'Request timed out after 60s.';
            userErrorMessage = 'Request timed out. Please try again later.';
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect: Possible CORS, network, or server issue.';
            userErrorMessage = 'Failed to load products. Please check your network or contact support@iconluxury.shop.';
          } else if (err.message.includes('API route not found')) {
            errorMessage = 'API route not found (404).';
            userErrorMessage = 'The product data could not be found. Please contact support@iconluxury.shop.';
          } else if (err.message.includes('Access denied')) {
            errorMessage = 'Access denied by server (403).';
            userErrorMessage = 'Access to product data was denied. Please contact support@iconluxury.shop.';
          } else if (err.message.includes('Server error')) {
            errorMessage = 'Server error (500).';
            userErrorMessage = 'A server error occurred. Please try again later or contact support@iconluxury.shop.';
          }
          console.error(`Attempt ${attempt} failed: ${errorMessage}`, {
            name: err.name,
            message: err.message,
            stack: err.stack,
            url,
          });
          if (attempt === retryCount) {
            setError(userErrorMessage);
          } else {
            await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt)));
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  if (error) {
    return (
      <Box textAlign="center" py={16} color="red.500">
        <Text fontSize="lg">{error}</Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection, ensure the backend is running, or contact{' '}
          <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
            support@iconluxury.shop
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
    <Box p={4} bg="gray.900" color="white" minH="100vh">
      <Text fontSize="2xl" mb={4}>Products</Text>
      <Link
        to="/collections"
        style={{ color: '#3182CE', marginBottom: '16px', display: 'block' }}
        aria-label="Go to collections page"
      >
        Go to Collections
      </Link>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            aria-label={`View ${product.title}`}
          >
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              color="gray.900"
              _hover={{ boxShadow: 'md' }}
            >
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
              ) : (
                <Box
                  h="200px"
                  bg="gray.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
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
      {loading && (
        <Flex justify="center" mt={6}>
          <Spinner size="lg" color="yellow.400" />
        </Flex>
      )}
      {hasMore && !loading && (
        <Flex justify="center" mt={6}>
          <Button
            bg="yellow.400"
            color="gray.900"
            _hover={{ bg: 'yellow.500' }}
            onClick={loadMore}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default ProductsPage;