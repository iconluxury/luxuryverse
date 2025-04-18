import { Box, Text, Grid, Heading, Skeleton, Flex, Icon, Button } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { TimeIcon } from '@chakra-ui/icons';
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
      const pastDrops = results
        .filter(result => result.status === 'fulfilled')
        .map(result => ({
          ...result.value,
          isLocked: false,
        }));

      const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);
      if (errors.length > 0) {
        console.error('Some drops failed to fetch:', errors);
      }

      // Add a placeholder for the upcoming locked drop
      const upcomingDrop = {
        id: 'future-1',
        title: 'Next Exclusive Drop',
        description: 'Our next premium collection is almost here!',
        isLocked: true,
        unlockDate: '2025-05-01', // Fixed future date
      };

      return {
        upcoming: [upcomingDrop],
        past: pastDrops,
      };
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (dropsData.past?.length > 0 || dropsData.upcoming?.length > 0) {
      const allDrops = [...(dropsData.upcoming || []), ...(dropsData.past || [])];
      const descriptions = allDrops.map(col => col.description || '');
      const maxHeight = Math.max(...descriptions.map(desc => desc.length)) * 1.5;
      setMaxDescriptionHeight(maxHeight);
    }
  }, [dropsData]);

  if (isLoading) {
    return (
      <Box p={4} bg="gray.900" color="white" minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box maxW="1400px" w="full">
          <Skeleton height="20px" width="200px" mb={6} />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            <Skeleton height="200px" borderRadius="lg" />
          </Grid>
          <Skeleton height="20px" width="200px" mt={12} mb={6} />
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            {selectedDrops.map((_, index) => (
              <Skeleton key={index} height="200px" borderRadius="lg" />
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  if (!dropsData.upcoming?.length && !dropsData.past?.length) {
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
        {/* Upcoming Drops Section */}
        {dropsData.upcoming?.length > 0 && (
          <Box mb={16}>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              mb={8}
              textAlign="center"
              color="white"
            >
              Upcoming Drops
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
              {dropsData.upcoming.map(drop => (
                <Box key={drop.id}>
                  <Box
                    borderWidth="1px"
                    borderColor="gray.700"
                    borderRadius="xl"
                    overflow="hidden"
                    bg="white"
                    color="gray.900"
                    opacity={drop.isLocked ? 0.7 : 1}
                    transition="all 0.3s ease"
                    boxShadow="0 4px 15px rgba(0, 0, 0, 0.2)"
                    p={6}
                  >
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      mb={3}
                      noOfLines={1}
                    >
                      {drop.title || 'Untitled Drop'}
                    </Text>
                    <Box height={`${maxDescriptionHeight}px`} overflow="hidden" mb={3}>
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
                    {drop.isLocked && (
                      <>
                        <Flex align="center" gap={3} mb={3}>
                          <Icon as={TimeIcon} boxSize={6} color="gray.600" />
                          <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="medium"
                            color="gray.600"
                          >
                            Shop Opens: {drop.unlockDate}
                          </Text>
                        </Flex>
                        <Button
                          size="md"
                          colorScheme="purple"
                          variant="outline"
                          borderColor="gray.600"
                          color="gray.600"
                          width="full"
                          fontSize={{ base: 'md', md: 'lg' }}
                          _hover={{ bg: 'purple.600', borderColor: 'purple.600', color: 'white' }}
                        >
                          Notify Me
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        )}

        {/* Past Drops Section */}
        {dropsData.past?.length > 0 && (
          <Box>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              mb={8}
              textAlign="center"
              color="white"
            >
              Past Drops
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
              {dropsData.past.map(drop => (
                <Box key={drop.id}>
                  <Link
                    to={`/collection/${drop.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      role="link"
                      borderWidth="1px"
                      borderColor="gray.700"
                      borderRadius="xl"
                      overflow="hidden"
                      bg="white"
                      color="gray.900"
                      _hover={{ boxShadow: 'lg', transform: 'scale(1.03)' }}
                      transition="all 0.3s ease"
                      boxShadow="0 4px 15px rgba(0, 0, 0, 0.2)"
                      p={6}
                    >
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
                    </Box>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <Box w="full" mt={16}>
        <Footer />
      </Box>
    </Box>
  );
}

export default LatestDropsPage;