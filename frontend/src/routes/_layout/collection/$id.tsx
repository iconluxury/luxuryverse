import { createFileRoute } from '@tanstack/react-router';
import { Flex, Spinner, Box, Text, SimpleGrid, VStack, Heading, Skeleton, SkeletonText, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../../components/Common/Footer';
import { Image } from '@chakra-ui/react';

// ... Interfaces remain unchanged ...

function ErrorFallback({ error }: { error: Error }) {
  console.error('ErrorBoundary caught:', error, error.stack);
  return (
    <Box textAlign="center" py={16} color="gray.300" bg="transparent" w="100%">
      <Text fontSize="lg" mb={4}>
        An unexpected error occurred.
      </Text>
      <Text fontSize="sm" mt={2}>
        Please try again or contact{' '}
        <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
          support@iconluxury.shop
        </a>.
      </Text>
    </Box>
  );
}

function CollectionDetails() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSlowMessage, setShowSlowMessage] = useState(false);
  const API_BASE_URL = 'https://iconluxury.shop';
  const { id } = Route.useParams();

  const fetchWithRetry = async (url: string, retryCount = 6): Promise<any> => {
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        console.log(`Attempt ${attempt} for ${url}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000);
        const response = await fetch(url, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
          credentials: 'omit',
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 404) throw new Error('Collection not found.');
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('Response body is not readable.');

        let receivedData = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          receivedData += new TextDecoder().decode(value);
        }

        const data = JSON.parse(receivedData);
        if (!data) throw new Error('Empty response received.');
        return data;
      } catch (err: any) {
        console.error(`Attempt ${attempt} failed:`, err.message);
        if (err.name === 'AbortError') {
          err.message = 'Request timed out after 90s.';
        }
        if (attempt === retryCount) {
          const cached = localStorage.getItem(`collection-${id}`);
          if (cached) return JSON.parse(cached);
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      }
    }
  };

  const fetchCollection = async () => {
    setLoading(true);
    try {
      const collectionUrl = `${API_BASE_URL}/api/v1/collections/${id}`;
      console.log('Fetching:', collectionUrl);
      const collectionData = await fetchWithRetry(collectionUrl);
      console.log('Raw API response:', JSON.stringify(collectionData, null, 2));
      console.log('Products count:', collectionData.products?.length || 0);

      if (!collectionData || typeof collectionData !== 'object') {
        throw new Error('Invalid collection data received');
      }

      const validatedCollection: Collection = {
        id: collectionData.id || id,
        title: collectionData.title || 'Untitled Collection',
        description: collectionData.description || '',
        products: Array.isArray(collectionData.products)
          ? collectionData.products
              .filter((p: Product) => p && p.id)
              .map((p: Product) => {
                const variants = Array.isArray(p.variants) ? p.variants.filter((v: Variant) => v && v.id) : [];
                return {
                  ...p,
                  id: p.id || `temp-${Math.random()}`,
                  title: p.title || 'Unknown Product',
                  description: p.description || '',
                  brand: p.brand || 'Unknown',
                  thumbnail: p.thumbnail || 'https://placehold.co/225x300',
                  images: Array.isArray(p.images) ? p.images : [],
                  variants,
                  full_price: p.full_price || 'N/A',
                  sale_price: p.sale_price || 'N/A',
                  discount: p.discount || null,
                  collection_id: p.collection_id || id,
                  total_inventory: variants.reduce((sum: number, v: Variant) => sum + (v.inventory_quantity || 0), 0),
                  discount_value: p.discount ? parseFloat(p.discount.replace('% off', '')) || 0 : 0,
                };
              })
              .sort((a, b) => (b.discount_value || 0) - (a.discount_value || 0))
          : [],
      };

      setCollection(validatedCollection);
      localStorage.setItem(`collection-${id}`, JSON.stringify(validatedCollection));
      setError(null);
    } catch (err: any) {
      console.error('Fetch error:', err.message);
      setError(
        err.message.includes('not found')
          ? `Collection with ID ${id} not found.`
          : 'Failed to load collection. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError('Invalid collection ID.');
      setLoading(false);
      return;
    }
    fetchCollection();
    const timer = setTimeout(() => setShowSlowMessage(true), 10000);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <Box maxW="1200px" mx="auto" py={8} px={{ base: 4, md: 8 }} bg="transparent">
        <VStack spacing={4}>
          <Skeleton height="40px" width="300px" />
          <SkeletonText noOfLines={2} width="600px" />
          {showSlowMessage && (
            <Text color="gray.300">Loading collection, please wait...</Text>
          )}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="100%">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Box key={index}>
                  <Skeleton height="300px" />
                  <SkeletonText mt={4} noOfLines={3} />
                </Box>
              ))}
          </SimpleGrid>
        </VStack>
      </Box>
    );
  }

  if (error || !collection) {
    return (
      <Box textAlign="center" py={16} color="gray.300" bg="transparent" w="100%">
        <Text fontSize="lg" mb={4}>
          {error || `Collection not found for ID: ${id}`}
        </Text>
        <Button onClick={fetchCollection} colorScheme="blue" mt={4}>
          Retry
        </Button>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or contact{' '}
          <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
            support@iconluxury.shop
          </a>.
        </Text>
      </Box>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box bg="transparent" w="100%">
        <Box py={8} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto" bg="transparent" borderRadius="lg">
          <VStack spacing={6} align="start">
            <Heading as="h1" size="xl" color="white">
              {collection.title}
            </Heading>
            {collection.description && (
              <Box fontSize="md" color="gray.300" dangerouslySetInnerHTML={{ __html: collection.description }} />
            )}
            {collection.products.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="100%">
                {collection.products.map((product) => {
                  const cleanTitle = product.brand
                    ? product.title.replace(new RegExp(`\\b${product.brand}\\b`, 'i'), '').trim()
                    : product.title;
                  return (
                    <Link key={product.id} to={`/products/${product.id}`}>
                      <Box
                        borderWidth="1px"
                        borderColor="gray.600"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="transparent"
                        _hover={{ shadow: 'md', transform: 'translateY(-4px)', borderColor: 'gray.500' }}
                        transition="all 0.2s"
                      >
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          w="100%"
                          h="300px"
                          objectFit="cover"
                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/225x300')}
                        />
                        <Box p={4}>
                          <Text fontWeight="bold" fontSize="md" color="white" noOfLines={1}>
                            {cleanTitle}
                          </Text>
                          <Flex justify="space-between" align固定式
                            align="center" mt={1}>
                              <Text fontSize="sm" color="gray.300" noOfLines={1}>
                                {product.brand}
                              </Text>
                              {product.discount && (
                                <Text fontSize="xs" color="red.400">
                                  {product.discount}
                                </Text>
                              )}
                            </Flex>
                            <Flex mt={2} justify="space-between" align="center">
                              <Text fontWeight="bold" fontSize="lg" color="var(--color-primary-hover)">
                                {product.sale_price}
                              </Text>
                              <Text fontSize="sm" color="gray.400">
                                {product.full_price}
                              </Text>
                            </Flex>
                          </Box>
                        </Box>
                      </Link>
                    );
                  })}
                </SimpleGrid>
              ) : (
                <Text fontSize="md" color="gray.300">
                  No products are currently available in this collection. Check back soon!
                </Text>
              )}
            </VStack>
          </Box>
          <Footer />
        </Box>
      </ErrorBoundary>
    );
  }

  export const Route = createFileRoute('/_layout/collection/$id')({
    component: CollectionDetails,
  });