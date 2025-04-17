import { Box, Text, Image, Grid, Button, Heading } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/_layout/collections')({
  component: CollectionsPage,
});

function CollectionsPage() {
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCollections = ['461931184423', '471622844711', '488238383399'];

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Create an array of fetch promises for each collection ID
        const collectionPromises = selectedCollections.map(id =>
          fetch(`https://iconluxury.shop/api/v1/collections/${id}`).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch collection ${id}`);
            }
            return response.json();
          })
        );

        // Wait for all promises to settle (fulfilled or rejected)
        const results = await Promise.allSettled(collectionPromises);

        // Filter successful fetches and transform the data
        const collections = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value)
          .map(collection => ({
            ...collection,
            productCount: collection.products ? collection.products.length : 0
          }));

        // Set the state with the fetched collections
        setCollectionsData(collections);

        // Log any errors for failed fetches
        const errors = results
          .filter(result => result.status === 'rejected')
          .map(result => result.reason);

        if (errors.length > 0) {
          console.error('Some collections failed to fetch:', errors);
        }
      } catch (error) {
        console.error('Unexpected error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh">
        <Text>Loading...</Text>
      </Box>
    );
  }

  // Display message if no collections are available
  if (collectionsData.length === 0) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh">
        <Text>No collections available.</Text>
      </Box>
    );
  }

  // Render the collections grid
  return (
    <Box p={4} bg="gray.900" color="white" minH="100vh">
      <Heading fontSize="2xl" mb={6}>Collections</Heading>
      <Link
        to="/products"
        style={{ color: '#3182CE', marginBottom: '16px', display: 'block' }}
        aria-label="Go to products page"
      >
        Go to Products
      </Link>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {collectionsData.map((collection) => (
          <Box
            key={collection.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            color="gray.900"
            _hover={{ boxShadow: 'md' }}
          >
            <Image
              src={collection.image || 'https://placehold.co/400x400'}
              alt={collection.title || 'Collection Image'}
              style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
              w="full"
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="xl" mb={2}>
                {collection.title || 'Untitled Collection'}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4} noOfLines={2}>
                {collection.description || 'No description available.'}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={4}>
                {collection.productCount} {collection.productCount === 1 ? 'item' : 'items'}
              </Text>
              <Button
                as={Link}
                to={`/collections/${collection.id}`}
                bg="yellow.400"
                color="gray.900"
                _hover={{ bg: 'yellow.500' }}
                size="sm"
                aria-label={`View ${collection.title || 'collection'}`}
              >
                View Collection
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default CollectionsPage;