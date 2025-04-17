import { createFileRoute } from '@tanstack/react-router';
import { Flex, Spinner, Box, Text, Tag, HStack, Divider, IconButton, Skeleton, SkeletonText, Button } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../../components/Common/Footer';
import { Heading, Image, TimeIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import DOMPurify from 'dompurify';

// Interfaces
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

// ErrorFallback component
function ErrorFallback({ error }: { error: Error }) {
  console.error('ErrorBoundary caught:', error, error.stack);
  return (
    <Box textAlign="center" py={16} color="red.500">
      <Text fontSize="lg">Error: {error.message}</Text>
      <Text fontSize="sm" mt={2}>
        Please try again or contact{' '}
        <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
          support@iconluxury.shop
        </a>.
      </Text>
    </Box>
  );
}

// Define the route
export const Route = createFileRoute('/_layout/products/$id')({
  component: ProductDetails,
});

// ProductDetails component
function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const API_BASE_URL = 'https://iconluxury.shop';
  const { id } = Route.useParams();
  const isBrowser = typeof window !== 'undefined';

  // Debug Shopify SDK and authentication
  useEffect(() => {
    console.log('ShopifyBuy available:', window.ShopifyBuy);
    if (window.ShopifyBuy) {
      console.log('ShopifyBuy client methods:', Object.keys(window.ShopifyBuy));
    }
    console.log('Customer authentication status:', window.Shopify?.customer);
  }, []);

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
        console.error('Fetch error:', { url, attempt, error: err.message });
        if (attempt === retryCount) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, Math.min(1000 * 2 ** attempt, 10000)));
      }
    }
  };

  const fetchProduct = async () => {
    try {
      console.log('Fetching:', `${API_BASE_URL}/api/v1/products/${id}`);
      const productData = await fetchWithRetry(`${API_BASE_URL}/api/v1/products/${id}`);
      console.log('Fetch successful for', `${API_BASE_URL}/api/v1/products/${id}:`, productData);
      if (!productData || typeof productData !== 'object') {
        throw new Error('Invalid product data received');
      }

      const validatedProduct: Product = {
        ...productData,
        id: productData.id || '',
        title: productData.title || 'Untitled Product',
        description: productData.description || '',
        brand: productData.brand || '',
        thumbnail: productData.thumbnail || 'https://placehold.co/150x150',
        images: Array.isArray(productData.images) ? productData.images : [],
        variants: Array.isArray(productData.variants)
          ? productData.variants
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
              }))
          : [],
        full_price: productData.full_price || '',
        sale_price: productData.sale_price || 'N/A',
        discount: productData.discount || null,
        collection_id: productData.collection_id || undefined,
      };
      setProduct(validatedProduct);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load product:', { error: err.message, productId: id });
      setError(`Failed to load product: ${err.message || 'Unknown error'}`);
    } finally {
      setProductLoading(false);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const topProductsUrl = `${API_BASE_URL}/api/v1/collections/488238383399`;
      console.log('Fetching:', topProductsUrl);
      const collectionData = await fetchWithRetry(topProductsUrl);
      console.log('Fetch successful for', topProductsUrl, ':', collectionData);

      if (!collectionData || !Array.isArray(collectionData.products)) {
        console.warn('Invalid collection data:', collectionData);
        setTopProducts([]);
        return;
      }

      const validatedTopProducts = collectionData.products
        .filter(
          (p: Product) =>
            p &&
            typeof p.id === 'string' &&
            typeof p.title === 'string' &&
            p.id !== id &&
            Array.isArray(p.variants)
        )
        .map((p: Product) => {
          const variants = Array.isArray(p.variants) ? p.variants : [];
          return {
            ...p,
            id: p.id || '',
            title: p.title || 'Untitled Product',
            description: p.description || '',
            brand: p.brand || '',
            thumbnail: p.thumbnail || 'https://placehold.co/150x150',
            images: Array.isArray(p.images) ? p.images : [],
            variants: variants,
            full_price: p.full_price || '',
            sale_price: p.sale_price || 'N/A',
            discount: p.discount || null,
            collection_id: p.collection_id || undefined,
            total_inventory: variants.reduce((sum: number, v: Variant) => {
              return sum + (typeof v.inventory_quantity === 'number' ? v.inventory_quantity : 0);
            }, 0),
            discount_value: p.discount ? parseFloat(p.discount.replace('% off', '')) || 0 : 0,
          };
        })
        .sort((a, b) => {
          const aDiscount = a.discount_value || 0;
          const bDiscount = b.discount_value || 0;
          const aInventory = a.total_inventory || 0;
          const bInventory = b.total_inventory || 0;

          if (aDiscount !== bDiscount) {
            return bDiscount - aDiscount;
          }
          return bInventory - aInventory;
        })
        .slice(0, 5);

      console.log('Top 5 products:', validatedTopProducts);
      setTopProducts(validatedTopProducts);
    } catch (topErr: any) {
      console.warn('Failed to fetch top products:', topErr.message);
      setError((prev) => prev || `Failed to load top products: ${topErr.message || 'Unknown error'}`);
      setTopProducts([]);
    } finally {
      setTopProductsLoading(false);
    }
  };

  // Fetch product
  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError('Invalid product ID');
      setProductLoading(false);
      return;
    }

    fetchProduct();
  }, [id]);

  // Fetch top products
  useEffect(() => {
    if (product && !error) {
      setTopProductsLoading(true);
      fetchTopProducts();
    }
  }, [product, error]);

  const validatedImages = useMemo(() => product?.images ?? [], [product?.images]);
  const validatedVariants = useMemo(() => product?.variants ?? [], [product?.variants]);

  if (productLoading) {
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
      </Box>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box>
        {isBrowser && (
          <Helmet>
            <title>{product.title || 'Product'} | Icon Luxury</title>
            <meta
              name="description"
              content={product.description ? product.description.slice(0, 160) : 'Product description'}
            />
          </Helmet>
        )}
        <Box py={16} bg="white">
          <Box maxW="800px" mx="auto" px={4}>
            <Link to="/products" aria-label="Back to all products" style={{ color: '#3182CE', fontWeight: 'medium', textDecoration: 'none', margin: '8px', display: 'block' }}>
              ← Back to all products
            </Link>
            {validatedImages.length > 0 ? (
              <Box position="relative">
                <Image
                  src={validatedImages[currentImage] || 'https://placehold.co/275x350'}
                  alt={`${product.title || 'Product'} image ${currentImage + 1}`}
                  w="full"
                  h="400px"
                  objectFit="cover"
                  borderRadius="md"
                  mb={8}
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/275x350')}
                />
                {validatedImages.length > 1 && (
                  <>
                    <IconButton
                      aria-label="Previous image"
                      icon={<ChevronLeftIcon />}
                      position="absolute"
                      left="8px"
                      top="50%"
                      transform="translateY(-50%)"
                      onClick={() => setCurrentImage((prev) => (prev - 1 + validatedImages.length) % validatedImages.length)}
                    />
                    <IconButton
                      aria-label="Next image"
                      icon={<ChevronRightIcon />}
                      position="absolute"
                      right="8px"
                      top="50%"
                      transform="translateY(-50%)"
                      onClick={() => setCurrentImage((prev) => (prev + 1) % validatedImages.length)}
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
                <Text fontSize="sm" color="gray.500">{validatedVariants.length || 0} variants</Text>
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
            {product.description ? (
              <Text
                fontSize="lg"
                color="gray.700"
                mb={4}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
              />
            ) : (
              <Text fontSize="lg" color="gray.700" mb={4}>
                No description available
              </Text>
            )}
            <Box mt={8}>
              <Heading as="h2" size="lg" mb={4}>
                Variants
              </Heading>
              <HStack spacing={2} flexWrap="wrap" maxW="100%" gap={2}>
                {validatedVariants.map((variant, index) => (
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
                    {variant.inventory_quantity > 0 ? `(${variant.inventory_quantity} in stock)` : '(Out of stock)'}
                  </Box>
                ))}
              </HStack>
            </Box>
            {/* Add to Cart Button */}
            <Box mt={4}>
              <Button
                colorScheme="blue"
                onClick={() => {
                  console.log('Add to cart clicked:', validatedVariants[0]);
                  // Replace with actual cart logic, e.g., cart.add(validatedVariants[0]);
                }}
                isDisabled={validatedVariants.length === 0 || validatedVariants.every((v) => v.inventory_quantity === 0)}
              >
                Add to Cart
              </Button>
            </Box>
            <Box mt={8}>
              <Heading as="h2" size="lg" mb={4}>
                Related Products
              </Heading>
              {topProductsLoading ? (
                <HStack spacing={4} flexWrap="wrap">
                  {[...Array(5)].map((_, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="md" textAlign="center" maxW="200px">
                      <Skeleton w="150px" h="150px" mx="auto" startColor="gray.100" endColor="gray.300" />
                      <SkeletonText mt={2} noOfLines={2} spacing="2" />
                      <Skeleton mt={2} h="16px" w="100px" mx="auto" />
                    </Box>
                  ))}
                </HStack>
              ) : topProducts.length > 0 ? (
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
                          alt={topProduct.title || 'Product'}
                          w="150px"
                          h="150px"
                          objectFit="cover"
                          mx="auto"
                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150')}
                        />
                        <Text mt={2} fontSize="sm" fontWeight="medium" noOfLines={2}>
                          {topProduct.title || 'Untitled Product'}
                        </Text>
                        <Text color="gray.700" fontSize="sm">
                          {topProduct.sale_price || 'N/A'}
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
              ) : (
                <Text fontSize="md" color="gray.500">
                  No related products available.
                </Text>
              )}
            </Box>
            <Divider mb={8} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ErrorBoundary>
  );
}