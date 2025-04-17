import { createFileRoute } from '@tanstack/react-router';
import { Flex, Spinner, Box, Text, Heading, Image, Skeleton, SkeletonText, HStack } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../../components/Common/Footer';

// Interfaces (same as ProductDetails)
interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  thumbnail: string;
  images: string[];
  variants: Variant[];
  full_price: string;
  sale_price: string;
  discount: string | null;
}

interface Variant {
  id: string;
  title: string;
  size: string;
  inventory_quantity: number;
  price: string;
  compare_at_price: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
}

// ErrorFallback (same as ProductDetails)
function ErrorFallback({ error }: { error: Error }) {
  console.error('ErrorBoundary caught:', error, error.stack);
  return (
    <Box textAlign="center" py={16} color="red.500">
      <Text fontSize="lg">Error: {error.message}</Text>
      <Text fontSize="sm" mt={2}>
        Please try again or contact{' '}
        <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
          support@iconluxury.shop
        </a>.
      </Text>
    </Box>
  );
}

// Define the route
export const Route = createFileRoute('/_layout/collection/$id')({
  component: CollectionDetails,
});

function CollectionDetails() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = 'https://iconluxury.shop';
  const { id } = Route.useParams();
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError('Invalid collection ID');
      setLoading(false);
      return;
    }

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
          if (attempt === retryCount) throw err;
          await new Promise((resolve) => setTimeout(resolve, Math.min(1000 * 2 ** attempt, 10000)));
        }
      }
    };

    const fetchCollection = async () => {
      try {
        console.log('Fetching:', `${API_BASE_URL}/api/v1/collections/${id}`);
        const collectionData = await fetchWithRetry(`${API_BASE_URL}/api/v1/collections/${id}`);
        console.log('Fetch successful for', `${API_BASE_URL}/api/v1/collections/${id}:`, collectionData);

        if (!collectionData || typeof collectionData !== 'object') {
          throw new Error('Invalid collection data received');
        }

        const validatedCollection: Collection = {
          id: collectionData.id || '',
          title: collectionData.title || 'Untitled Collection',
          description: collectionData.description || '',
          image: collectionData.image || 'https://placehold.co/400x400',
          products: Array.isArray(collectionData.products)
            ? collectionData.products
                .filter(
                  (p: Product) =>
                    p &&
                    typeof p.id === 'string' &&
                    typeof p.title === 'string' &&
                    Array.isArray(p.variants)
                )
                .map((p: Product) => ({
                  ...p,
                  thumbnail: p.thumbnail || 'https://placehold.co/150x150',
                  images: Array.isArray(p.images) ? p.images : [],
                  variants: Array.isArray(p.variants) ? p.variants : [],
                  sale_price: p.sale_price || 'N/A',
                  full_price: p.full_price || '',
                  discount: p.discount || null,
                }))
            : [],
        };

        setCollection(validatedCollection);
        setError(null);
      } catch (err: any) {
        console.error('Failed to load collection:', { error: err.message, collectionId: id });
        setError(`Failed to load collection: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  const validatedProducts = useMemo(() => collection?.products ?? [], [collection?.products]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }

  if (error || !collection) {
    return (
      <Box textAlign="center" py={16} color={error ? 'red.500' : 'gray.700'}>
        <Text fontSize="lg">{error || `Collection not found for ID: ${id}`}</Text>
        <Text fontSize="sm" mt={2}>
          Please try again or contact{' '}
          <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
            support@iconluxury.shop
          </a>.
        </Text>
      </Box>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box>
        {isBrowser && (
          <Helmet>
            <title>{collection.title} | Icon Luxury</title>
            <meta
              name="description"
              content={collection.description ? collection.description.slice(0, 160) : 'Collection description'}
            />
          </Helmet>
        )}
        <Box py={16} bg="white">
          <Box maxW="1200px" mx="auto" px={4}>
            <a
              href="/collections"
              aria-label="Back to all collections"
              style={{
                color: '#3182CE',
                fontWeight: 'medium',
                textDecoration: 'none',
                margin: '8px',
                display: 'block',
              }}
            >
              ← Back to all collections
            </a>
            <Heading as="h1" size="2xl" mb={6} fontWeight="medium">
              {collection.title}
            </Heading>
            {collection.image && (
              <Image
                src={collection.image}
                alt={`${collection.title} image`}
                w="full"
                h="300px"
                objectFit="cover"
                borderRadius="md"
                mb={8}
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400')}
              />
            )}
            {collection.description && (
              <Text fontSize="lg" color="gray.700" mb={8} dangerouslySetInnerHTML={{ __html: collection.description }} />
            )}
            <Heading as="h2" size="lg" mb={4}>
              Products
            </Heading>
            {validatedProducts.length > 0 ? (
              <HStack spacing={4} flexWrap="wrap">
                {validatedProducts.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      textAlign="center"
                      maxW="200px"
                      _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
                      transition="all 0.2s"
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        w="150px"
                        h="150px"
                        objectFit="cover"
                        mx="auto"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150')}
                      />
                      <Text mt={2} fontSize="sm" fontWeight="medium" noOfLines={2}>
                        {product.title}
                      </Text>
                      <Text color="gray.700" fontSize="sm">
                        {product.sale_price}
                        {product.discount && (
                          <Text as="span" color="green.500" ml={1}>
                            ({product.discount})
                          </Text>
                        )}
                      </Text>
                    </Box>
                  </Link>
                ))}
              </HStack>
            ) : (
              <Text fontSize="md" color="gray.500">
                No products available in this collection.
              </Text>
            )}
          </Box>
        </Box>
        <Footer />
      </Box>
    </ErrorBoundary>
  );
}