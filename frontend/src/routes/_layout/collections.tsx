import { Box, Text, Image, Grid, Flex, Button, Heading } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/collections')({
  component: CollectionsPage,
});

function CollectionsPage() {
  // Hardcoded selected collections list
  const selectedCollections = [
   '461931184423',
 '471622844711',
 '488238383399',

  ];

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
        {selectedCollections.map((collection) => (
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
              src={collection.image}
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