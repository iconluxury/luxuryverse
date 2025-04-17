import { Box, Text, Image, Grid, Heading, Skeleton } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Footer from "@/components/Common/Footer";

export const Route = createFileRoute('/_layout/collections')({
  component: CollectionsPage,
});

function CollectionsPage() {
  const selectedCollections = ['461931184423', '471622844711', '488238383399'];
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);

  const { data: collectionsData = [], isLoading } = useQuery({
    queryKey: ['collections', selectedCollections],
    queryFn: async () => {
      const collectionPromises = selectedCollections.map(id =>
        fetch(`https://iconluxury.shop/api/v1/collections/${id}`, {
          cache: 'force-cache',
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch collection ${id}`);
          return res.json();
        })
      );
      const results = await Promise.allSettled(collectionPromises);
      const collections = results
        .filter(result => result.status === 'fulfilled')
        .map(result => ({
          ...result.value,
          productCount: result.value.products?.length || 0,
        }));

      const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);
      if (errors.length > 0) {
        console.error('Some collections failed to fetch:', errors);
      }

      return collections;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (collectionsData.length > 0) {
      const descriptions = collectionsData.map(col => col.description || '');
      const maxHeight = Math.max(...descriptions.map(desc => desc.length)) * 1.5;
      setMaxDescriptionHeight(maxHeight);
    }
  }, [collectionsData]);

  if (isLoading) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box maxW="1200px" w="full">
          <Skeleton height="20px" width="200px" mb={8} />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {selectedCollections.map((_, index) => (
              <Skeleton key={index} height="300px" />
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  if (collectionsData.length === 0) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>No collections available.</Text>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.900"
      color="white"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box maxW="1200px" w="full" px={4} pt={4}>
        <Heading fontSize="2xl" mb={10} textAlign="center">Collections</Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {collectionsData.map(collection => (
            <Link
              key={collection.id}
              to={`/collection/${collection.id}`}
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
                  src={collection.image || 'https://placehold.co/400x400'}
                  alt={collection.title || 'Collection Image'}
                  style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                  w="full"
                  loading="lazy"
                />
                <Box p={4}>
                  <Text fontWeight="bold" fontSize="xl" mb={2}>
                    {collection.title || 'Untitled Collection'}
                  </Text>
                  <Box height={`${maxDescriptionHeight}px`} overflow="hidden">
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {collection.description
                        ? collection.description.replace(/<\/?p>/g, '')
                        : 'No description available.'}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
        </Grid>
      </Box>
      <Box w="full" mt={10}>
        <Footer />
      </Box>
    </Box>
  );
}

export default CollectionsPage;