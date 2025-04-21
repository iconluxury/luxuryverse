import { createFileRoute } from '@tanstack/react-router';
import { Box, Text, Image, SimpleGrid, VStack, Heading, Skeleton, SkeletonText, Button, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../../components/Common/Footer';

// Interfaces (unchanged)
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

function ErrorFallback({ error }: { error: Error }) {
  console.error('ErrorBoundary caught:', error, error.stack);
  return (
    <Box textAlign="center" py={16} color="gray.200" bg="transparent" w="100%">
      <Text fontSize="lg" mb={4}>
        An unexpected error occurred.
      </Text>
      <Text fontSize="sm" mt={2}>
        Please try again or contact{' '}
        <a href="mailto:support@luxuryverse.com" style={{ color: '#3182CE' }}>
          support@luxuryverse.com
        </a>.
      </Text>
    </Box>
  );
}

function CollectionDetails() {
  const API_BASE_URL = 'https://iconluxury.shop';
  const { id } = Route.useParams();

  const { data: collection, isLoading, error, refetch } = useQuery({
    queryKey: ['collection', id],
    queryFn: async () => {
      const url = `${API_BASE_URL}/api/v1/collections/${id}`;
      console.log('Fetching:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
        credentials: 'omit',
        cache: 'force-cache',
      });

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

      const collectionData = JSON.parse(receivedData);
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

      localStorage.setItem(`collection-${id}`, JSON.stringify(validatedCollection));
      return validatedCollection;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 3,
    retryDelay: (attempt) => 1000 * 2 ** attempt,
  });

  // Compute cleaned titles with useMemo
  const cleanedTitles = useMemo(() => {
    if (!collection?.products) return [];
    return collection.products.map((product) => {
      if (!product?.title) return 'Untitled Product';
      if (!product?.brand) return product.title.trim();

      // Escape special regex characters in brand
      const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const brandRegex = new RegExp(`\\b${escapeRegExp(product.brand)}\\b`, 'i');
      const menRegex = /\b(men'?s|men)\b/i;
      return product.title
        .replace(brandRegex, '')
        .replace(menRegex, '')
        .trim()
        .replace(/\s+/g, ' ');
    });
  }, [collection?.products]);

  if (isLoading) {
    return (
      <Box maxW="1200px" mx="auto" py={8} px={{ base: 4, md: 8 }} bg="transparent">
        <VStack spacing={4}>
          <Skeleton height="40px" width="300px" />
          <SkeletonText noOfLines={2} width="600px" />
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
      <Box textAlign="center" py={16} color="gray.200" bg="transparent" w="100%">
        <Text fontSize="lg" mb={4}>
          {error?.message || `Collection not found for ID: ${id}`}
        </Text>
        <Button onClick={() => refetch()} colorScheme="blue" mt={4}>
          Retry
        </Button>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or contact{' '}
          <a href="mailto:support@luxuryverse.com" style={{ color: '#3182CE' }}>
            support@luxuryverse.com
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
            <Heading as="h1" size="xl" color="#00FF00" textTransform="uppercase">
              {collection.title}
            </Heading>
            {collection.description && (
             <Box 
             fontSize="lg" 
             color="gray.200"
             sx={{ '& *': { color: 'inherit' } }} // Force child elements to inherit color
             dangerouslySetInnerHTML={{ __html: collection.description }} 
           />
            )}
            {collection.products.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="100%">
                {collection.products.map((product, index) => {
                  const cleanedTitle = cleanedTitles[index] || 'Untitled Product'; // Fallback if index is out of sync

                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      aria-label={`View details for ${cleanedTitle} by ${product.brand || 'Unknown'}`}
                    >
                      <Box
                        borderWidth="1px"
                        borderColor="gray.600"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="transparent"
                        _hover={{ shadow: 'md', transform: 'translateY(-4px)', borderColor: 'gray.500' }}
                        transition="all 0.2s"

                        display="flex"
                        flexDirection="column"
                        height="100%" 
                      >
                       <Box
  position="relative"
  w="full"
  style={{ aspectRatio: '3 / 4' }}
  bg="white"
  filter="brightness(0.85)" //85% of original
>
  <Image
    src={product.thumbnail}
    alt={`${cleanedTitle} by ${product.brand || 'Unknown'}`}
    w="full"
    h="full"
    objectFit="contain"
    position="absolute"
    top="0"
    left="0"
    loading="lazy"
    onError={(e) => (e.currentTarget.src = 'https://placehold.co/225x300')}
  />
</Box>
                        <Box p={4}>
                          <Text fontWeight="bold" fontSize="md" color="gray.200" noOfLines={1}
                               textTransform="uppercase"
                          >
                            {product.brand || 'Unknown'}
                          </Text>
                          <Text fontWeight="bold" fontSize="md" color="white" height="3em">
                            {cleanedTitle}
                          </Text>
                          <Flex mt={2} justify="space-between" align="center">
                            <Text fontWeight="bold" fontSize="2xl" color="#00FF00">
                              {product.sale_price}
                            </Text>
                            <Text fontSize="md" color="gray.400">
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
              <Text fontSize="md" color="gray.200">
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