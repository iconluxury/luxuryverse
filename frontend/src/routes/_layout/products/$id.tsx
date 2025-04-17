import { useState, useEffect, useMemo } from 'react';
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
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { createFileRoute, useParams, Link } from '@tanstack/react-router';
import { TimeIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';
import Footer from '../../../components/Common/Footer';

export const Route = createFileRoute('/_layout/products/$id')({
  component: ProductDetails,
});

interface Variant {
  id: string;
  title: string;
  size: string;
  inventory_quantity: number;
  price: string;
  compare_at_price: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  thumbnail: string;
  images: string[];
  variants: Variant[];
  full_price: string;
  sale_price: string;
  discount: string | null;
  collection_id?: string;
}

// Custom HTML Parser (unchanged, omitted for brevity)
// ... parseHtml function ...

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const API_BASE_URL = process.env.API_BASE_URL || 'https://iconluxury.shop';
  const { id } = useParams({ from: '/_layout/products/$id' });
  const isBrowser = typeof window !== 'undefined';

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

    const fetchProductAndTopProducts = async () => {
      try {
        const productData = await fetchWithRetry(`${API_BASE_URL}/api/v1/products/${id}`);
        console.log('Fetched product data:', productData);
        if (!productData || typeof productData !== 'object') {
          throw new Error('Invalid product data received');
        }

        if (productData.variants) {
          productData.variants = productData.variants
            .filter((v: Variant) => {
              const isValid =
                v &&
                typeof v === 'object' &&
                typeof v.id === 'string' &&
                typeof v.size === 'string' &&
                typeof v.price === 'string' &&
                typeof v.inventory_quantity === 'number';
              if (!isValid) {
                console.warn('Invalid variant filtered:', v);
              }
              return isValid;
            })
            .map((v: Variant) => ({
              id: v.id,
              title: v.title || 'Unknown',
              size: v.size || 'N/A',
              inventory_quantity: typeof v.inventory_quantity === 'number' ? v.inventory_quantity : 0,
              price: v.price || 'N/A',
              compare_at_price: v.compare_at_price || '',
            }));
        } else {
          productData.variants = [];
        }
        setProduct(productData);
        setError(null);

        try {
          const collectionId = productData.collection_id || '8789669282087';
          const topProductsUrl = `${API_BASE_URL}/api/v1/collections/${collectionId}/products`;
          const collectionData = await fetchWithRetry(topProductsUrl);
          console.log('Fetched collection products:', collectionData);

          const validatedTopProducts = Array.isArray(collectionData?.products)
            ? collectionData.products
                .filter(
                  (p: Product) =>
                    p &&
                    typeof p === 'object' &&
                    typeof p.id === 'string' &&
                    typeof p.title === 'string' &&
                    p.id !== id
                )
                .map((p: Product) => ({
                  ...p,
                  total_inventory: p.variants.reduce((sum: number, v: Variant) => sum + v.inventory_quantity, 0),
                  discount_value: p.discount
                    ? parseFloat(p.discount.replace('% off', '')) || 0
                    : 0,
                }))
                .sort((a: any, b: any) => {
                  if (a.discount_value !== b.discount_value) {
                    return b.discount_value - a.discount_value;
                  }
                  return b.total_inventory - a.total_inventory;
                })
                .slice(0, 5)
            : [];
          console.log('Top 5 products:', validatedTopProducts);
          setTopProducts(validatedTopProducts);
        } catch (topErr: any) {
          console.warn('Failed to fetch top products:', topErr.message);
          setTopProducts([]);
          setError((prev) => prev || `Failed to load top products: ${topErr.message || 'Unknown error'}`);
        }
      } catch (err: any) {
        setError(`Failed to load product: ${err.message || 'Unknown error'}`);
        try {
          const topProductsUrl = `${API_BASE_URL}/api/v1/collections/8789669282087/products`;
          const collectionData = await fetchWithRetry(topProductsUrl);
          console.log('Fetched collection products (fallback):', collectionData);

          const validatedTopProducts = Array.isArray(collectionData?.products)
            ? collectionData.products
                .filter(
                  (p: Product) =>
                    p &&
                    typeof p === 'object' &&
                    typeof p.id === 'string' &&
                    typeof p.title === 'string' &&
                    p.id !== id
                )
                .map((p: Product) => ({
                  ...p,
                  total_inventory: p.variants.reduce((sum: number, v: Variant) => sum + v.inventory_quantity, 0),
                  discount_value: p.discount
                    ? parseFloat(p.discount.replace('% off', '')) || 0
                    : 0,
                }))
                .sort((a: any, b: any) => {
                  if (a.discount_value !== b.discount_value) {
                    return b.discount_value - a.discount_value;
                  }
                  return b.total_inventory - a.total_inventory;
                })
                .slice(0, 5)
            : [];
          console.log('Top 5 products (fallback):', validatedTopProducts);
          setTopProducts(validatedTopProducts);
        } catch (topErr: any) {
          setError((prev) => `${prev}\nFailed to load top products: ${topErr.message || 'Unknown error'}`);
          setTopProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndTopProducts();
  }, [id]);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  };

  const nextImage = () => {
    if (product?.images?.length) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const variantComponents = useMemo(() => {
    if (!product?.variants?.length) {
      return <Text fontSize="md" color="gray.500">No variants available</Text>;
    }
    return product.variants.map((variant, index) => {
      console.log('Rendering variant:', index, variant);
      return (
        <Box
          key={variant.id || `variant-${index}`}
          bg={variant.inventory_quantity > 0 ? 'gray.100' : 'red.100'}
          px={3}
          py={1}
          borderRadius="full"
          mb={2}
          fontSize="md"
        >
          Size {variant.size || 'N/A'} - {variant.price || 'N/A'}{' '}
          {variant.inventory_quantity > 0
            ? `(${variant.inventory_quantity} in stock)`
            : '(Out of stock)'}
        </Box>
      );
    });
  }, [product?.variants]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }

  if (error || !product) {
    return (
      <Box textAlign="center" py={16} color={error ? 'red.500' : 'gray.700'}>
        <Text fontSize="lg" mb={4}>
          {error || `Product not found for ID: ${id}`}
        </Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or contact{' '}
          <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
            support@iconluxury.shop
          </a>.
        </Text>
        {topProducts.length > 0 && (
          <Box mt={4}>
            <Text fontSize="md" mb={2}>
              Explore our top products:
            </Text>
            <HStack spacing={2} flexWrap="wrap" justify="center">
              {topProducts.slice(0, 3).map((topProduct) => (
                <Link key={topProduct.id} to={`/products/${topProduct.id}`} style={{ color: '#3182CE' }}>
                  <Tag colorScheme="gray" m={1}>
                    {topProduct.title || 'Untitled Product'}
                  </Tag>
                </Link>
              ))}
            </HStack>
          </Box>
        )}
        <Link
          to="/products"
          aria-label="Back to all products"
          style={{ color: '#3182CE', marginTop: '16px', display: 'inline-block' }}
        >
          Back to all products
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      {isBrowser && (
        <Helmet>
          <title>{product.title || 'Product'} | Icon Luxury</title>
          <meta
            name="description"
            content={product.description ? stripHtml(product.description).slice(0, 160) : 'Product description'}
          />
        </Helmet>
      )}
      <Box py={16} bg="white">
        <Box maxW="800px" mx="auto" px={4}>
          <Link
            to="/products"
            aria-label="Back to all products"
            style={{
              color: '#3182CE',
              fontWeight: 'medium',
              textDecoration: 'none',
              margin: '8px',
              display: 'block',
            }}
          >
            ← Back to all products
          </Link>
          {product.images?.length > 0 ? (
            <Box position="relative">
              <Image
                src={product.images[currentImage]}
                alt={`${product.title || 'Product'} image ${currentImage + 1}`}
                w="full"
                h="400px"
                objectFit="cover"
                borderRadius="md"
                mb={8}
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/275x350')}
              />
              {product.images.length > 1 && (
                <>
                  <IconButton
                    aria-label="Previous image"
                    icon={<ChevronLeftIcon />}
                    position="absolute"
                    left="8px"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={prevImage}
                  />
                  <IconButton
                    aria-label="Next image"
                    icon={<ChevronRightIcon />}
                    position="absolute"
                    right="8px"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={nextImage}
                  />
                </>
              )}
            </Box>
          ) : (
            <Skeleton w="full" h="400px" borderRadius="md" mb={8} />
          )}
          <Flex align="center" mb={4}>
            <Tag colorScheme="gray" mr={4} px={3} py={1} borderRadius="full">
              Product
            </Tag>
            <Text fontSize="sm" color="gray.500">{new Date().toLocaleDateString()}</Text>
            <Flex align="center" ml={4}>
              <TimeIcon mr={1} color="gray.500" boxSize={3} />
              <Text fontSize="sm" color="gray.500">{product.variants?.length || 0} variants</Text>
            </Flex>
            {product.discount && (
              <Tag colorScheme="green" ml={4} px={3} py={1} borderRadius="full">
                {product.discount}
              </Tag>
            )}
          </Flex>
          <Heading as="h1" size="2xl" mb={6} fontWeight="medium" lineHeight="1.3">
            {product.title || 'Untitled Product'}
          </Heading>
          <Text fontSize="xl" color="gray.700" mb={4}>
            {product.sale_price || 'N/A'}{' '}
            {product.full_price && <Text as="s" color="gray.500">{product.full_price}</Text>}
          </Text>
          {product.description ? parseHtml(product.description) : (
            <Text fontSize="lg" color="gray.700" mb={4}>
              No description available
            </Text>
          )}
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              Variants
            </Heading>
            <HStack spacing={2} flexWrap="wrap" maxW="100%" gap={2}>
              {variantComponents}
            </HStack>
          </Box>
          {topProducts.length > 0 ? (
            <Box mt={8}>
              <Heading as="h2" size="lg" mb={4}>
                Related Products
              </Heading>
              <HStack spacing={4} flexWrap="wrap">
                {topProducts.map((topProduct) => (
                  <Link key={topProduct.id} to={`/products/${topProduct.id}`}>
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      textAlign="center"
                      maxW="200px"
                      _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
                      transition="all 0.2s"
                    >
                      <Image
                        src={topProduct.thumbnail || 'https://placehold.co/150x150'}
                        alt={topProduct.title}
                        w="150px"
                        h="150px"
                        objectFit="cover"
                        mx="auto"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150')}
                      />
                      <Text mt={2} fontSize="sm" fontWeight="medium" noOfLines={2}>
                        {topProduct.title}
                      </Text>
                      <Text color="gray.700" fontSize="sm">
                        {topProduct.sale_price}
                        {topProduct.discount && (
                          <Text as="span" color="green.500" ml={1}>
                            ({topProduct.discount})
                          </Text>
                        )}
                      </Text>
                    </Box>
                  </Link>
                ))}
              </HStack>
            </Box>
          ) : (
            <Text fontSize="md" color="gray.500" mt={8}>
              No related products available.
            </Text>
          )}
          <Divider mb={8} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default ProductDetails;