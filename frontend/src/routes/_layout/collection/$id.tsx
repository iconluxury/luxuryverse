import { Box, Text, Image, Grid, Heading, Skeleton, Flex, Icon } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { LockIcon } from '@chakra-ui/icons';
import Footer from "@/components/Common/Footer";

export const Route = createFileRoute('/_layout/collections')({
  component: LatestDropsPage,
});

function LatestDropsPage() {
  const selectedDrops = ['461931184423', '471622844711', '488238383399'];
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState(0);

  const { data: dropsData = [], isLoading } = useQuery({
    queryKey: ['drops', selectedDrops],
    queryFn: async () => {
      const dropPromises = selectedDrops.map(id =>
        fetch(`https://iconluxury.shop/api/v1/collections/${id}`, {
          cache: 'force-cache',
        }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch drop ${id}`);
          return res.json();
        })
      );
      const results = await Promise.allSettled(dropPromises);
      const drops = results
        .filter(result => result.status === 'fulfilled')
        .map(result => ({
          ...result.value,
          productCount: result.value.products?.length || 0,
          isLocked: false,
        }));

      const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);
      if (errors.length > 0) {
        console.error('Some drops failed to fetch:', errors);
      }

      // Add a placeholder for a future locked drop
      const futureDrop = {
        id: 'future-1',
        title: 'Upcoming Drop',
        description: 'Get ready for our next exclusive drop!',
        image: 'https://placehold.co/400x400?text=Coming+Soon',
        isLocked: true,
        productCount: 0,
      };

      return [...drops, futureDrop];
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (dropsData.length > 0) {
      const descriptions = dropsData.map(col => col.description || '');
      const maxHeight = Math.max(...descriptions.map(desc => desc.length)) * 1.5;
      setMaxDescriptionHeight(maxHeight);
    }
  }, [dropsData]);

  if (isLoading) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box maxW="1200px" w="full">
          <Skeleton height="30px" width="250px" mb={10} />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            {selectedDrops.map((_, index) => (
              <Skeleton key={index} height="400px" borderRadius="lg" />
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  if (dropsData.length === 0) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>No drops available.</Text>
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
      <Box maxW="1400px" w="full" px={6} pt={8}>
        <Heading
          fontSize={{ base: '3xl', md: '4xl' }}
          mb={12}
          textAlign="center"
          bgGradient="linear(to-r, purple.400, pink.400)"
          bgClip="text"
        >
          Latest Drops
        </Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {dropsData.map(drop => (
            <Box key={drop.id} position="relative">
              <Link
                to={drop.isLocked ? undefined : `/collection/${drop.id}`}
                style={{ textDecoration: 'none', pointerEvents: drop.isLocked ? 'none' : 'auto' }}
              >
                <Box
                  role="link"
                  borderWidth="1px"
                  borderColor="gray.700"
                  borderRadius="xl"
                  overflow="hidden"
                  bg="white"
                  color="gray.900"
                  opacity={drop.isLocked ? 0.7 : 1}
                  _hover={!drop.isLocked ? { boxShadow: 'lg', transform: 'scale(1.03)' } : {}}
                  transition="all 0.3s ease"
                  boxShadow="0 4px 15px rgba(0, 0, 0, 0.2)"
                >
                  <Box position="relative">
                    <Image
                      src={drop.image || 'https://placehold.co/400x400'}
                      alt={drop.title || 'Drop Image'}
                      style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                      w="full"
                      loading="lazy"
                      filter={drop.isLocked ? 'grayscale(50%)' : 'none'}
                    />
                    {drop.isLocked && (
                      <Flex
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.600"
                        align="center"
                        justify="center"
                        flexDirection="column"
                        gap={2}
                      >
                        <Icon as={LockIcon} boxSize={10} color="white" />
                        <Text color="white" fontWeight="bold">Coming Soon</Text>
                      </Flex>
                    )}
                  </Box>
                  <Box p={6}>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      mb={3}
                      noOfLines={1}
                    >
                      {drop.title || 'Untitled Drop'}
                    </Text>
                    <Box height={`${maxDescriptionHeight}px`} overflow="hidden">
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        noOfLines={2}
                        lineHeight="1.5"
                      >
                        {drop.description
                          ? drop.description.replace(/<\/?p>/g, '')
                          : 'No description available.'}
                      </Text>
                    </Box>
                    <Text
                      fontSize="xs"
                      color={drop.isLocked ? 'gray.500' : 'purple.600'}
                      mt={3}
                      fontWeight="medium"
                    >
                      {drop.isLocked ? 'Locked' : `${drop.productCount} Items`}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
        </Grid>
      </Box>
      <Box w="full" mt={16}>
        <Footer />
      </Box>
    </Box>
  );
}

export default LatestDropsPage;