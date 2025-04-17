import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Tag,
  HStack,
  Divider,
  Spinner,
  Skeleton,
  Grid,
} from '@chakra-ui/react';
import { createFileRoute, useParams, Link } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import Footer from '../../../components/Common/Footer';
import { parseHtml } from '../../../utils/htmlParser'; 

export const Route = createFileRoute('/_layout/collection/$id')({
  component: CollectionsDetails,
});

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  sale_price: string;
  full_price: string;
  discount: string | null;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
}

function CollectionsDetails() {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [otherCollections, setOtherCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);
  const API_BASE_URL = process.env.API_BASE_URL || 'https://iconluxury.shop';
  const { id } = useParams({ from: '/_layout/collection/$id' });

  // Same selected collections as in CollectionsPage
  const selectedCollections = ['461931184423', '471622844711', '488238383399'];

  useEffect(() => {
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
            cache: 'force-cache',
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
          if (attempt === retryCount) {
            throw err;
          }
          await new Promise((resolve) => setTimeout(resolve, Math.min(1000 * 2 ** attempt, 10000)));
        }
      }
    };

    const fetchData = async () => {
      try {
        // Fetch current collection
        const collectionData = await fetchWithRetry(`${API_BASE_URL}/api/v1/collection/${id}`);
        console.log('Fetched collection data:', collectionData);
        if (!collectionData || typeof collectionData !== 'object') {
          throw new Error('Invalid collection data received');
        }

        // Validate products
        if (collectionData.products) {
          collectionData.products = collectionData.products
            .filter(
              (p: Product) =>
                p &&
                typeof p === 'object' &&
                typeof p.id === 'string' &&
                typeof p.title === 'string'
            )
            .map((p: Product) => ({
              id: p.id,
              title: p.title || 'Untitled Product',
              thumbnail: p.thumbnail || 'https://placehold.co/150x150',
              sale_price: p.sale_price || 'N/A',
              full_price: p.full_price || '',
              discount: p.discount || null,
            }));
        } else {
          collectionData.products = [];
        }

        setCollection(collectionData);

        // Fetch other collections for the grid
        const collectionPromises = selectedCollections
          .filter((colId) => colId !== id)
          .map((colId) =>
            fetchWithRetry(`${API_BASE_URL}/api/v1/collection/${colId}`).then((data) => ({
              ...data,
              productCount: data.products?.length || 0,
            }))
          );
        const results = await Promise.allSettled(collectionPromises);
        const validCollections = results
          .filter((result) => result.status === 'fulfilled')
          .map((result: any) => result.value);

        setOtherCollections(validCollections);

        // Calculate max description height for other collections
        if (validCollections.length > 0) {
          const descriptions = validCollections.map((col: Collection) => col.description || '');
          const maxHeight = Math.max(...descriptions.map((desc: string) => desc.length)) * 1.5;
          setMaxDescriptionHeight(maxHeight);
        }

        setError(null);
      } catch (err: any) {
        setError(`Failed to load collection: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  };

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
        <Text fontSize="lg" mb={4}>
          {error || `Collection not found for ID: ${id}`}
        </Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or contact{' '}
          <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
            support@iconluxury.shop
          </a>.
        </Text>
        <Link
          to="/collections"
          aria-label="Back to all collections"
          style={{ color: '#3182CE', marginTop: '16px', display: 'inline-block' }}
        >
          Back to all collections
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Helmet>
        <title>{collection.title || 'Collection'} | Icon Luxury</title>
        <meta
          name="description"
          content={
            collection.description
              ? stripHtml(collection.description).slice(0, 160)
              : 'Collection description'
          }
        />
      </Helmet>

      {/* Grid of Other Collections */}
      <Box p={4} bg="gray.900" color="white">
        <Heading fontSize="2xl" mb={6}>
          Other Collections
        </Heading>
        {otherCollections.length > 0 ? (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {otherCollections.map((col) => (
              <Link
                key={col.id}
                to={`/collection/${col.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  role="link"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  color="gray.900"
                  _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
                  transition="all 0.2s"
                >
                  <Image
                    src={col.image || 'https://placehold.co/400x400'}
                    alt={col.title || 'Collection Image'}
                    style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                    w="full"
                    loading="lazy"
                  />
                  <Box p={4}>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                      {col.title || 'Untitled Collection'}
                    </Text>
                    <Box height={`${maxDescriptionHeight}px`} overflow="hidden">
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {col.description
                          ? stripHtml(col.description)
                          : 'No description available.'}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Grid>
        ) : (
          <Text>No other collections available.</Text>
        )}
      </Box>

      {/* Collection Details */}
      <Box py={16} bg="white">
        <Box maxW="800px" mx="auto" px={4}>
          <Link
            to="/collections"
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
          </Link>
          {collection.image ? (
            <Image
              src={collection.image}
              alt={`${collection.title || 'Collection'} image`}
              w="full"
              h="400px"
              objectFit="cover"
              borderRadius="md"
              mb={8}
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400')}
            />
          ) : (
            <Skeleton w="full" h="400px" borderRadius="md" mb={8} />
          )}
          <Flex align="center" mb={4}>
            <Tag colorScheme="gray" mr={4} px={3} py={1} borderRadius="full">
              Collection
            </Tag>
            <Text fontSize="sm" color="gray.500">{new Date().toLocaleDateString()}</Text>
            <Text fontSize="sm" color="gray.500" ml={4}>
              {collection.products.length} products
            </Text>
          </Flex>
          <Heading as="h1" size="2xl" mb={6} fontWeight="medium" lineHeight="1.3">
            {collection.title || 'Untitled Collection'}
          </Heading>
          {collection.description ? (
            parseHtml(collection.description)
          ) : (
            <Text fontSize="lg" color="gray.700" mb={4}>
              No description available
            </Text>
          )}

          {/* Products in Collection */}
          {collection.products.length > 0 && (
            <Box mt={8}>
              <Heading as="h2" size="lg" mb={4}>
                Products in this Collection
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                {collection.products.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      textAlign="center"
                      _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
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
              </Grid>
            </Box>
          )}
          <Divider mb={8} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CollectionsDetails;