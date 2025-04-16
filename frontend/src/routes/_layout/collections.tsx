import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid, Spinner, Flex } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/collections')({
  component: CollectionsPage,
});

function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('https://api.iconluxury.today/api/v1/collections');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        setError(`Failed to load collections: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={16} color="red.500">
        <Text fontSize="lg">{error}</Text>
        <Text fontSize="sm" mt={2}>
          Please check if the backend server is running or try again later.
        </Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Collections</Text>
      <Link to="/products" style={{ color: '#3182CE', marginBottom: '16px', display: 'block' }}>
        Go to Products
      </Link>
      {collections.map((collection: { id: string; title: string; products: { id: string; title: string; thumbnail: string; price: string }[] }) => (
        <Box key={collection.id} mb={8}>
          <Text fontSize="xl" mb={2}>
            <Link to={`/collection/${collection.id}`}>
              {collection.title}
            </Link>
          </Text>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {collection.products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                  {product.thumbnail && <Image src={product.thumbnail} alt={product.title} />}
                  <Box p={4}>
                    <Text fontWeight="bold">{product.title}</Text>
                    <Text>{product.price}</Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default CollectionsPage;