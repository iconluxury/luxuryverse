import { createFileRoute } from '@tanstack/react-router';
import { Flex, Spinner, Box, Text, SimpleGrid, VStack, Heading, Skeleton, SkeletonText } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../../components/Common/Footer';
import { Image } from '@chakra-ui/react';

// Interfaces
interface Variant {
  id: string;
  title: string;
  size: string;
  inventory_quantity: number;
  price: string;
  compare_at_price: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  thumbnail: string;
  images?: string[];
  variants?: Variant[];
  full_price: string;
  sale_price: string;
  discount: string | null;
  collection_id?: string;
  total_inventory?: number;
  discount_value?: number;
}

interface Collection {
  id: string;
  title: string;
  description?: string;
  products: Product[];
}

// ErrorFallback component
function ErrorFallback({ error }: { error: Error }) {
  console.error('ErrorBoundary caught (suppressed):', error, error.stack);
  return <Box />;
}

// Define the route
export const Route = createFileRoute('/_layout/collections/$id')({
  component: CollectionDetails,
});

// CollectionDetails component
function CollectionDetails() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = 'https://iconluxury.shop';
  const { id } = Route.useParams();

  // Fetch with retry
  const fetchWithRetry = async (url: string, retryCount = 6) => {
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        const response = await fetch(url, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'omit',
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 404) throw new Error('Resource not found.');
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (err: any) {
        if (err.name === 'AbortError') {
          err.message = 'Request timed out after 30s.';
        }
        console.error('Fetch error:', { url, attempt, error: err.message });
        if (attempt === retryCount) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      }
    }
  };

  // Fetch collection data
  const fetchCollection = async () => {
    try {
      const collectionUrl = `${API_BASE_URL}/api/v1/collections/${id}`;
      console.log('Fetching:', collectionUrl);
      const collectionData = await fetchWithRetry(collectionUrl);
      console.log('Fetch successful for', collectionUrl, ':', collectionData);

      if (!collectionData || typeof collectionData !== 'object' || !Array.isArray(collectionData.products)) {
        throw new Error('Invalid collection data received');
      }

      const validatedCollection: Collection = {
        id: collectionData.id || id,
        title: collectionData.title || 'Untitled Collection',
        description: collectionData.description || '',
        products: collectionData.products
          .filter(
            (p: Product) =>
              p &&
              typeof p.id === 'string' &&
              typeof p.title === 'string' &&
              Array.isArray(p.variants) &&
              p.variants.some((v: Variant) => v.inventory_quantity > 0)
          )
          .map((p: Product) => {
            const variants = Array.isArray(p.variants)
              ? p.variants.filter(
                  (v: Variant) =>
                    v &&
                    typeof v === 'object' &&
                    typeof v.id === 'string' &&
                    typeof v.size === 'string' &&
                    v.size !== '' &&
                    v.size !== 'N/A' &&
                    typeof v.inventory_quantity === 'number' &&
                    v.inventory_quantity > 0
                )
              : [];
            return {
              ...p,
              id: p.id || '',
              title: p.title || 'Untitled Product',
              description: p.description || '',
              brand: p.brand || 'Unknown Brand',
              thumbnail: p.thumbnail || 'https://placehold.co/150x200',
              images: Array.isArray(p.images) ? p.images : undefined,
              variants: variants,
              full_price: p.full_price || '',
              sale_price: p.sale_price || 'N/A',
              discount: p.discount || null,
              collection_id: p.collection_id || id,
              total_inventory: variants.reduce((sum: number, v: Variant) => {
                return sum + (typeof v.inventory_quantity === 'number' ? v.inventory_quantity : 0);
              }, 0),
              discount_value: p.discount ? parseFloat(p.discount.replace('% off', '')) || 0 : 0,
            };
          })
          .sort((a, b) => {
            const aDiscount = a.discount_value || 0;
            const bDiscount = b.discount_value || 0;
            const aInventory = a.total_inventory || 0;
            const bInventory = b.total_inventory || 0;

            if (aDiscount !== bDiscount) {
              return bDiscount - aDiscount;
            }
            return bInventory - aInventory;
          }),
      };

      setCollection(validatedCollection);
      setError(null);
    } catch (err: any) {
      console.error('Fetch error (suppressed):', err.message);
      setError('Failed to load collection. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setLoading(false);
      setError('Invalid collection ID.');
      return;
    }

    fetchCollection();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Box maxW="1200px" mx="auto" py={8} px={{ base: 4, md: 8 }} bg="gray.800">
        <VStack spacing={4}>
          <Skeleton height="40px" width="300px" bg="gray.700" />
          <SkeletonText noOfLines={2} width="600px" bg="gray.700" />
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="100%">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Box key={index}>
                  <Skeleton height="200px" bg="gray.700" />
                  <SkeletonText mt={4} noOfLines={3} bg="gray.700" />
                </Box>
              ))}
          </SimpleGrid>
        </VStack>
      </Box>
    );
  }

  // Error or no collection
  if (error || !collection) {
    return (
      <Box textAlign="center" py={16} color="gray.300" bg="transparent" w="100%">
        <Text fontSize="lg" mb={4}>
          {error || `Collection not found for ID: ${id}`}
        </Text>
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
        <Box py={8} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto" bg="gray.800" borderRadius="lg">
          <VStack spacing={6} align="start">
            {/* Collection Header */}
            <Heading as="h1" size="xl" color="white">
              {collection.title}
            </Heading>
            {collection.description && (
              <Text fontSize="md" color="gray.300">
                {collection.description}
              </Text>
            )}

            {/* Product Grid */}
            {collection.products.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="100%">
                {collection.products.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <Box
                      borderWidth="1px"
                      borderColor="gray.600"
                      borderRadius="lg"
                      overflow="hidden"
                      bg="gray.700"
                      _hover={{ shadow: 'md', transform: 'translateY(-4px)', borderColor: 'gray.500' }}
                      transition="all 0.2s"
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        w="100%"
                        h="200px"
                        objectFit="cover"
                        aspectRatio="3/4"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x200')}
                      />
                      <Box p={4}>
                        <Text fontWeight="bold" fontSize="md" color="white" noOfLines={1}>
                          {product.title}
                        </Text>
                        <Text fontSize="sm" color="gray.300" noOfLines={1} mt={1}>
                          {product.brand}
                        </Text>
                        <Flex mt={2} justify="space-between" align="center">
                          <Text fontSize="sm" color="gray.400" as={product.discount ? 's' : 'span'}>
                            {product.full_price}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" color="var(--color-primary-hover)">
                            {product.sale_price}
                          </Text>
                        </Flex>
                        {product.discount && (
                          <Text fontSize="xs" color="red.400" mt={1}>
                            {product.discount}
                          </Text>
                        )}
                      </Box>
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            ) : (
              <Text fontSize="md" color="gray.300">
                No products found in this collection.
              </Text>
            )}
          </VStack>
        </Box>
        <Footer />
      </Box>
    </ErrorBoundary>
  );
}