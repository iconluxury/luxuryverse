import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Image, Tag, HStack, Divider, Spinner, UnorderedList, ListItem } from "@chakra-ui/react";
import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { TimeIcon } from "@chakra-ui/icons";
import Footer from "../../../components/Common/Footer";

export const Route = createFileRoute('/_layout/collections/$id')({
  component: CollectionDetails,
});

function CollectionDetails() {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = process.env.API_BASE_URL || 'https://iconluxury.today';

  // Extract the 'id' parameter from the URL
  const { id } = useParams({ from: "/_layout/collections/$id" });

  // Fetch collection details from the FastAPI backend
  useEffect(() => {
    const fetchCollection = async (retryCount = 6, delay = 2000) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          console.debug(`Attempt ${attempt}: Fetching collection ${id} from ${API_BASE_URL}/api/v1/collections/${id}`);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);

          const response = await fetch(`${API_BASE_URL}/api/v1/collections/${id}`, {
            signal: controller.signal,
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'omit',
          });

          clearTimeout(timeoutId);
          const headers = Object.fromEntries(response.headers.entries());
          console.debug(`Response status: ${response.status}, ok: ${response.ok}, headers: ${JSON.stringify(headers)}`);

          if (!response.ok) {
            if (response.status === 502) {
              throw new Error('Server error (502 Bad Gateway). The backend may be down or misconfigured.');
            }
            if (response.status === 404) {
              throw new Error('Collection not found.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.debug(`Fetched collection: ${data.id}`);
          setCollection(data);
          setError(null);
          break;
        } catch (err: any) {
          const errorMessage = `Attempt ${attempt} failed: ${err.message || 'Unknown error'}`;
          console.error(errorMessage);
          if (err.name === 'AbortError') {
            err.message = 'Request timed out after 30s. Please check the backend server status.';
          }
          if (err.message.includes('Failed to fetch')) {
            err.message = 'Unable to connect: Possible CORS issue, server downtime, or network error. Check console for details.';
          }
          if (attempt === retryCount) {
            setError(`Failed to load collection: ${err.message || 'Unable to connect to the server.'}`);
          } else {
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
          }
        } finally {
          if (attempt === retryCount || !error) {
            setLoading(false);
          }
        }
      }
    };

    fetchCollection();
  }, [id]);

  // Parse the collection description into JSX elements
  const parseDescription = (description: string) => {
    if (!description || typeof description !== 'string') {
      return [<Text key="no-description" fontSize="lg" color="gray.700" mb={4}>No description available</Text>];
    }

    const paragraphs = description.split('\n').filter(p => p.trim());
    const elements: JSX.Element[] = [];
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.startsWith('<h1>')) {
        elements.push(
          <Heading key={`h1-${index}`} as="h1" size="xl" mb={4}>
            {paragraph.replace(/<\/?h1>/g, '')}
          </Heading>
        );
      } else if (paragraph.startsWith('<h2>')) {
        elements.push(
          <Heading key={`h2-${index}`} as="h2" size="lg" mb={4} mt={6}>
            {paragraph.replace(/<\/?h2>/g, '')}
          </Heading>
        );
      } else if (paragraph.startsWith('<h3>')) {
        elements.push(
          <Heading key={`h3-${index}`} as="h3" size="md" mb={4} mt={6}>
            {paragraph.replace(/<\/?h3>/g, '')}
          </Heading>
        );
      } else if (paragraph.startsWith('<ul>')) {
        const listItems = paragraph.replace(/<\/?ul>/g, '').split('<li>').filter(item => item.trim()).map(item => item.replace('</li>', ''));
        elements.push(
          <UnorderedList key={`ul-${index}`} mb={4}>
            {listItems.map((item, itemIndex) => (
              <ListItem key={`li-${itemIndex}`}>
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        );
      } else {
        elements.push(
          <Text key={`p-${index}`} fontSize="lg" color="gray.700" mb={4}>
            {paragraph}
          </Text>
        );
      }

      if (index < paragraphs.length - 1) {
        elements.push(<br key={`br-${index}`} />);
      }
    });

    return elements.length > 0 ? elements : [<Text key="empty" fontSize="lg" color="gray.700" mb={4}>Description is empty</Text>];
  };

  // Handle loading state
  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box textAlign="center" py={16} color="red.500">
        <Text fontSize="lg">{error}</Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection, ensure the backend is running, or contact{' '}
          <a href="mailto:support@iconluxury.today" style={{ color: '#3182CE' }}>
            support@iconluxury.today
          </a>.
        </Text>
        <Button
          mt={4}
          bg="yellow.400"
          color="gray.900"
          _hover={{ bg: 'yellow.500' }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Handle collection not found
  if (!collection) {
    return (
      <Box py={16} textAlign="center">
        <Text fontSize="lg" mb={4}>
          Collection not found for ID: {id}
        </Text>
        <Link to="/collections" style={{ color: '#3182CE' }}>
          Back to all collections
        </Link>
      </Box>
    );
  }

  // Render the collection details
  return (
    <Box>
      <Box py={16} bg="white">
        <Box maxW="800px" mx="auto" px={4}>
          <Link 
            to="/collections" 
            style={{ 
              color: "#3182CE", 
              fontWeight: "medium", 
              textDecoration: "none", 
              margin: "8px",
              display: "block"
            }}
          >
            ← Back to all collections
          </Link>
          {collection.image && (
            <Image 
              src={collection.image} 
              alt={collection.title} 
              w="full" 
              h="400px" 
              objectFit="cover" 
              borderRadius="md" 
              mb={8} 
            />
          )}
          <Flex align="center" mb={4}>
            <Tag colorScheme="gray" mr={4} px={3} py={1} borderRadius="full">
              Collection
            </Tag>
            <Text fontSize="sm" color="gray.500">{new Date().toLocaleDateString()}</Text>
            <Flex align="center" ml={4}>
              <TimeIcon mr={1} color="gray.500" boxSize={3} />
              <Text fontSize="sm" color="gray.500">{collection.products.length} items</Text>
            </Flex>
          </Flex>
          <Heading as="h1" size="2xl" mb={6} fontWeight="medium" lineHeight="1.3">
            {collection.title}
          </Heading>
          {collection.description ? parseDescription(collection.description) : (
            <Text fontSize="lg" color="gray.700" mb={4}>
              No description available
            </Text>
          )}
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>Products</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
              {collection.products.map((product: { id: string; title: string; thumbnail: string; price: string }) => (
                <Link key={product.id} to={`/products/${product.id}`}>
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
          <HStack spacing={2} mb={8} flexWrap="wrap" maxW="100%" gap={2}>
            {collection.products.map((product: { id: string; variants: string[] }) => (
              product.variants.map((variant, index) => (
                <Tag
                  key={`${product.id}-variant-${index}`}
                  colorScheme="gray"
                  variant="subtle"
                  size="md"
                  flex="0 0 calc(25% - 8px)"
                  mb={2}
                >
                  {variant}
                </Tag>
              ))
            ))}
          </HStack>
          <Divider mb={8} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CollectionDetails;