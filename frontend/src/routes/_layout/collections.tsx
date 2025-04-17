import { Box, Text, Image, Grid, Button, Heading } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/_layout/collections')({
  component: CollectionsPage,
});

function CollectionsPage() {
  // State to hold fetched collection data and loading status
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded collection IDs
  const selectedCollections = ['461931184423', '471622844711', '488238383399'];

  // Fetch collection data when the component mounts
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Assuming an API endpoint that accepts multiple IDs
        const response = await fetch(`/api/collections?ids=${selectedCollections.join(',')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await response.json();
        setCollectionsData(data); // Expecting array of objects: [{ id, title, image, description, productCount }, ...]
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchCollections();
  }, []); // Empty dependency array means this runs once on mount

  // Show loading state while fetching data
  if (loading) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh">
        <Text>Loading...</Text>
      </Box>
    );
  }

  // Render the grid once data is available
  return (
    <Box p={4} bg="gray.900" color="white" minH="100vh">
      <Heading fontSize="2xl" mb={6}>Collections</Heading>
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
              src={collection.image || 'https://placehold.co/400x400'} // Fallback to placeholder if image is missing
              alt={collection.title}
              style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
              w="full"
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="xl" mb={2}>
                {collection.title}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4} noOfLines={2}>
                {collection.description}
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
                aria-label={`View ${collection.title} collection`}
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