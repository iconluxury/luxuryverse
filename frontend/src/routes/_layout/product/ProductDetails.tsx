import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Image, Tag, HStack, Divider, Spinner, UnorderedList, ListItem } from "@chakra-ui/react";
import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { TimeIcon } from "@chakra-ui/icons";
import Footer from "../../../components/Common/Footer";

export const Route = createFileRoute('/_layout/product/ProductDetails')({
  component: ProductDetails,
});

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Extract the 'id' parameter from the URL
  const { id } = useParams({ from: "/_layout/products/$id" });

  // Fetch product details from the FastAPI backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.iconluxury.today/api/v1/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(`Failed to load product: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Parse the product description into JSX elements
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
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Text fontSize="lg" textAlign="center" py={16} color="red.500">
        {error}
      </Text>
    );
  }

  // Handle product not found
  if (!product) {
    return (
      <Box py={16} textAlign="center">
        <Text fontSize="lg" mb={4}>
          Product not found for ID: {id}
        </Text>
      </Box>
    );
  }

  // Render the product details
  return (
    <Box>
      <Box py={16} bg="white">
        <Box maxW="800px" mx="auto" px={4}>
          <Link 
            to="/products" 
            style={{ 
              color: "#3182CE", 
              fontWeight: "medium", 
              textDecoration: "none", 
              margin: "8px",
              display: "block"
            }}
          >
            ← Back to all products
          </Link>
          {product.thumbnail && (
            <Image 
              src={product.thumbnail} 
              alt={product.title} 
              w="full" 
              h="400px" 
              objectFit="cover" 
              borderRadius="md" 
              mb={8} 
            />
          )}
          <Flex align="center" mb={4}>
            <Tag colorScheme="gray" mr={4} px={3} py={1} borderRadius="full">
              Product
            </Tag>
            <Text fontSize="sm" color="gray.500">{new Date().toLocaleDateString()}</Text>
            <Flex align="center" ml={4}>
              <TimeIcon mr={1} color="gray.500" boxSize={3} />
              <Text fontSize="sm" color="gray.500">{product.variants.length} variants</Text>
            </Flex>
          </Flex>
          <Heading as="h1" size="2xl" mb={6} fontWeight="medium" lineHeight="1.3">
            {product.title}
          </Heading>
          <Text fontSize="xl" color="gray.700" mb={4}>
            {product.price}
          </Text>
          {product.description ? parseDescription(product.description) : (
            <Text fontSize="lg" color="gray.700" mb={4}>
              No description available
            </Text>
          )}
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>Variants</Heading>
            <HStack spacing={2} flexWrap="wrap" maxW="100%" gap={2}>
              {product.variants.map((variant: string, index: number) => (
                <Tag
                  key={`variant-${index}`}
                  colorScheme="gray"
                  variant="subtle"
                  size="md"
                  flex="0 0 calc(25% - 8px)"
                  mb={2}
                >
                  {variant}
                </Tag>
              ))}
            </HStack>
          </Box>
          <Divider mb={8} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default ProductDetails;