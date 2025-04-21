import { createFileRoute } from '@tanstack/react-router';
import {
  Flex, Spinner, Box, Text, Tag, HStack, Divider, IconButton, Skeleton, SkeletonText, VStack, Button,
  useBreakpointValue, SimpleGrid, Select,
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from '../../../components/Common/Footer';
import { Image, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import DOMPurify from 'dompurify';
import useCustomToast from '../../../hooks/useCustomToast';
import { useCart } from '../../../components/Common/CartContext';

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
  images?: string[];
  variants?: Variant[];
  full_price: string;
  sale_price: string;
  discount: string | null;
  collection_id?: string;
}

interface CartItem {
  customer_id: string | null;
  product_id: string;
  variant_id: string;
  title: string;
  brand: string;
  price: string;
  full_price: string;
  image: string;
  size: string;
  quantity: number;
}

interface CryptoPrice {
  symbol: string;
  price_usd: number;
  last_updated: string;
}

function ErrorFallback({ error }: { error: Error }) {
  console.error('ErrorBoundary caught (suppressed):', error, error.stack);
  return <Box />;
}

export const Route = createFileRoute('/_layout/products/$id')({
  component: ProductDetails,
});

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const { cartCount, addToCart } = useCart();
  const API_BASE_URL = 'https://iconluxury.shop';
  const { id } = Route.useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const showToast = useCustomToast();
  const navigate = useNavigate();

  // Debug third-party scripts
  useEffect(() => {
    console.log('Global objects:', Object.keys(window).filter(key => key.includes('cart') || key.includes('analytics')));
  }, []);

  // Fetch with retry
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
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      }
    }
  };

  // Fetch crypto prices
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        console.log('Fetching crypto prices:', `${API_BASE_URL}/api/v1/crypto/prices`);
        const prices = await fetchWithRetry(`${API_BASE_URL}/api/v1/crypto/prices`);
        console.log('Crypto prices fetched:', prices);
        if (!Array.isArray(prices)) {
          throw new Error('Invalid crypto prices data received');
        }
        setCryptoPrices(prices);
      } catch (err: any) {
        console.error('Crypto prices fetch error:', err.message);
        setCryptoPrices([]); // Fallback to empty array
        showToast('Error', 'Failed to load cryptocurrency prices.', 'error');
      }
    };
    fetchCryptoPrices();
  }, []);

  // Fetch product
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
        brand: productData.brand || 'Unknown Brand',
        thumbnail: productData.thumbnail || 'https://placehold.co/150x150',
        images: Array.isArray(productData.images) ? productData.images : undefined,
        variants: Array.isArray(productData.variants)
          ? productData.variants
              .filter((v: Variant) => {
                const isValid =
                  v &&
                  typeof v === 'object' &&
                  typeof v.id === 'string' &&
                  typeof v.size === 'string' &&
                  v.size !== '' &&
                  v.size !== 'N/A' &&
                  typeof v.price === 'string' &&
                  typeof v.inventory_quantity === 'number' &&
                  v.inventory_quantity > 0;
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
          : undefined,
        full_price: productData.full_price || '$950.00',
        sale_price: productData.sale_price || '$380.00',
        discount: productData.discount || '60% off',
        collection_id: productData.collection_id || undefined,
      };
      setProduct(validatedProduct);
      setError(null);
      if (validatedProduct.variants && validatedProduct.variants.length > 0) {
        setSelectedVariant(validatedProduct.variants[0].id);
      }
    } catch (err: any) {
      console.error('Fetch error (suppressed):', err.message);
      setError(null);
    } finally {
      setProductLoading(false);
    }
  };

  // Fetch top products
  const fetchTopProducts = async () => {
    try {
      const topProductsUrl = product?.collection_id
        ? `${API_BASE_URL}/api/v1/collections/${product.collection_id}`
        : `${API_BASE_URL}/api/v1/collections/488238383399`;
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
            Array.isArray(p.variants) &&
            p.variants.some((v: Variant) => v.inventory_quantity > 0)
        )
        .map((p: Product) => {
          const variants = Array.isArray(p.variants)
            ? p.variants.filter(
                (v: Variant) =>
                  v &&
                  typeof v === 'object' &&
                  typeof v.id === 'string' &&
                  typeof v.size === 'string' &&
                  v.size !== '' &&
                  v.size !== 'N/A' &&
                  typeof v.inventory_quantity === 'number' &&
                  v.inventory_quantity > 0
              )
            : [];
          return {
            ...p,
            id: p.id || '',
            title: p.title || 'Untitled Product',
            description: p.description || '',
            brand: p.brand || 'Unknown Brand',
            thumbnail: p.thumbnail || 'https://placehold.co/150x150',
            images: Array.isArray(p.images) ? p.images : undefined,
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
      console.warn('Top products fetch error (suppressed):', topErr.message);
      setTopProducts([]);
    } finally {
      setTopProductsLoading(false);
    }
  };

  // Clean title
  const cleanTitle = useMemo(() => {
    if (product?.title && product?.brand) {
      const brandRegex = new RegExp(`\\b${product.brand}\\b`, 'i');
      const menRegex = /\b(men'?s|men)\b/i;
      return product.title
        .replace(brandRegex, '')
        .replace(menRegex, '')
        .trim()
        .replace(/\s+/g, ' ');
    }
    return product?.title || 'Untitled Product';
  }, [product?.title, product?.brand]);

  // Effect hooks
  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setProductLoading(false);
      return;
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setTopProductsLoading(true);
      fetchTopProducts();
    }
  }, [product?.id]);

  // Memoized values
  const validatedImages = useMemo(() => (Array.isArray(product?.images) ? product.images : undefined), [product?.images]);
  const validatedVariants = useMemo(() => (Array.isArray(product?.variants) ? product.variants : undefined), [product?.variants]);
  const features = useMemo(() => {
    if (product?.description) {
      const featureList = product.description
        .split('\n')
        .filter((line) => line.trim().startsWith('-') || line.trim().startsWith('*'))
        .map((line) => line.trim().replace(/^[-*]\s*/, ''));
      return featureList.length > 0 ? featureList : ['Premium materials', 'Designed for comfort', 'Exclusive styling'];
    }
    return ['Premium materials', 'Designed for comfort', 'Exclusive styling'];
  }, [product?.description]);

  // Price conversion function
  const convertPrice = (usdPrice: string, currency: string): string => {
    if (!usdPrice || currency === 'USD') {
      return usdPrice;
    }
    const usdValue = parseFloat(usdPrice.replace('$', '')) || 0;
    const crypto = cryptoPrices.find((c) => c.symbol === currency);
    if (!crypto || crypto.price_usd === 0) {
      return 'N/A';
    }
    const converted = usdValue / crypto.price_usd;
    return converted.toFixed(6);
  };

  // Add to Cart Handler
  const handleAddToCart = () => {
    if (!product || !selectedVariant || !validatedVariants) return;
    const variant = validatedVariants.find((v) => v.id === selectedVariant);
    if (!variant || variant.inventory_quantity <= 0) {
      showToast('Error', 'Selected variant is out of stock.', 'error');
      return;
    }
    const cartItem: CartItem = {
      customer_id: null,
      product_id: product.id,
      variant_id: variant.id,
      title: cleanTitle,
      brand: product.brand,
      price: variant.price,
      full_price: product.full_price,
      image: product.thumbnail || 'https://placehold.co/150x150',
      size: variant.size,
      quantity: 1,
    };
    addToCart(cartItem);
    navigate({ to: '/cart' });
  };

  // Loading state
  if (productLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="transparent">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  // Product not found
  if (!product) {
    return (
      <Box textAlign="center" py={16} color="gray.700" bg="transparent" w="100%">
        <Text fontSize="lg" mb={4}>
          Product not found for ID: {id}
        </Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or contact{' '}
          <a href="mailto:support@luxuryverse.com" style={{ color: '#3182CE' }}>
            support@luxuryverse.com
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
      <Box bg="transparent" w="100%">
        <Box py={8} px={{ base: 4, md: 8 }}>
          <Box maxW="1200px" mx="auto" w="100%">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Image Section */}
              {validatedImages ? (
  <Box position="relative" display="flex" flexDirection="column" alignItems="center">
    <Box position="relative" w="full" style={{ aspectRatio: '3 / 4' }} bg="white" filter="brightness(0.85)">
      <Image
        src={validatedImages[currentImage] || 'https://placehold.co/450x550'}
        alt={`${cleanTitle} image ${currentImage + 1}`}
        w="100%"
        maxW="450px"
        h="550px"
        objectFit="contain"
        mx="auto"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/450x550')}
      />
      {/* Discount Tag */}
      {product.discount && (
  <Tag
    size="md"
    variant="solid"
    colorScheme="green"
    borderRadius="sm" // Small border radius
    position="absolute"
    top="10px"
    left="10px"
    fontSize="lg"
    lineHeight="1.5"
    textTransform="uppercase"
    px={3}
    py={1}
    bg="green.700" // Darker green background
    color="white" // White text
    _hover={{
      bg: 'green.800', // Even darker green on hover
    }}
    transition="all 0.2s"
  >
    {product.discount}
  </Tag>
)}
    </Box>
    {validatedImages.length > 1 && (
      <HStack mt={4} justify="center" spacing={2}>
        {validatedImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            w="90px"
            h="110px"
            objectFit="contain"
            cursor="pointer"
            borderRadius="md"
            border={index === currentImage ? '2px solid green.500' : '2px solid transparent'}
            onClick={() => setCurrentImage(index)}
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/90x110')}
          />
        ))}
      </HStack>
    )}
    {validatedImages.length > 1 && (
      <>
        <IconButton
          aria-label="Previous image"
          icon={<ChevronLeftIcon boxSize={5} />}
          position="absolute"
          left={{ base: '4px', md: '8px' }}
          top="250px"
          transform="translateY(-50%)"
          bg="gray.700"
          color="white"
          _hover={{ bg: 'gray.600' }}
          borderRadius="full"
          size="sm"
          onClick={() => setCurrentImage((prev) => (prev - 1 + validatedImages.length) % validatedImages.length)}
        />
        <IconButton
          aria-label="Next image"
          icon={<ChevronRightIcon boxSize={5} />}
          position="absolute"
          right={{ base: '4px', md: '8px' }}
          top="250px"
          transform="translateY(-50%)"
          bg="gray.700"
          color="white"
          _hover={{ bg: 'gray.600' }}
          borderRadius="full"
          size="sm"
          onClick={() => setCurrentImage((prev) => (prev + 1) % validatedImages.length)}
        />
      </>
    )}
  </Box>
) : (
  <Skeleton w="100%" maxW="400px" h="500px" mx="auto" />
)}

              {/* Product Details Section */}
              <VStack align="start" spacing={4}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold" lineHeight="1.5" color="gray.400" textTransform="uppercase">
                    {product.brand || 'Unknown Brand'}
                  </Text>
                  <Text as="h1" fontSize={{ base: '3xl', md: '4xl' }} fontWeight="medium" lineHeight="1.3" color="gray.50">
                    {cleanTitle}
                  </Text>
                </VStack>
                {validatedVariants && validatedVariants.length > 0 && (
                  <>
                    <Text fontSize="lg" fontWeight="medium" color="gray.50">
                      Select Size
                    </Text>
                    <HStack spacing={2} flexWrap="wrap" maxW="100%" gap={2}>
                      {validatedVariants.map((variant, index) => (
                        <Box
                          key={variant.id || `variant-${index}`}
                          bg={
                            selectedVariant === variant.id
                              ? 'green.700'
                              : variant.inventory_quantity > 0
                              ? 'gray.700'
                              : 'red.900'
                          }
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="md"
                          fontSize="md"
                          cursor={variant.inventory_quantity > 0 ? 'pointer' : 'not-allowed'}
                          _hover={variant.inventory_quantity > 0 ? { bg: 'gray.600' } : { bg: 'red.800' }}
                          onClick={() => {
                            if (variant.inventory_quantity > 0) {
                              setSelectedVariant(variant.id);
                            }
                          }}
                        >
                          {variant.size}
                        </Box>
                      ))}
                    </HStack>
                  </>
                )}
                {/* Price and Currency Selector */}
                <VStack align="start" spacing={1}>
                  <Select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    width={{ base: '120px', md: '150px' }}
                    bg="transparent"
                    color="white"
                    borderColor="green.500"
                    _hover={{ borderColor: 'green.400' }}
                    _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 1px green.400' }}
                    sx={{
                      '> option': {
                        background: 'gray.800',
                        color: 'white',
                      },
                    }}
                  >
                    <option value="USD" style={{ background: 'gray.800', color: 'white' }}>
                      USD
                    </option>
                    {cryptoPrices.map((crypto) => (
                      <option
                        key={crypto.symbol}
                        value={crypto.symbol}
                        style={{ background: 'gray.800', color: 'white' }}
                      >
                        {crypto.symbol}
                      </option>
                    ))}
                  </Select>
                  <HStack spacing={4} align="center">
                    <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color="#00FF00">
                      {`${convertPrice(product.sale_price, selectedCurrency)} ${selectedCurrency}`}
                    </Text>
                  </HStack>
                  <HStack spacing={4} align="center">
      {product.full_price && (
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400">
          MSRP: {product.full_price}
        </Text>
      )}
    </HStack>
                </VStack>
                {validatedVariants && validatedVariants.length > 0 && (
      <Button
      size="lg"
      onClick={handleAddToCart}
      isDisabled={
        !selectedVariant || validatedVariants.find((v) => v.id === selectedVariant)?.inventory_quantity <= 0
      }
      bg="transparent"
      color="#00FF00"
      textTransform="uppercase"
      fontFamily="'Special Gothic Expanded One', sans-serif"
      fontWeight="normal"
      textAlign="left"
      justifyContent="flex-start"
      width="100%"
      px={4}
      py={2}
      border="none"
      borderRadius="0"
      textDecoration="none" // Link-like appearance
      display="inline-block" // Makes it behave more like a link
      cursor="pointer" // Pointer cursor for interactivity
      _hover={{
        bg: "transparent",
        color: "#00CC00", // Darker green on hover
        textDecoration: "underline", // Underline on hover like a link
      }}
      _disabled={{
        bg: "transparent",
        color: "#00FF00",
        opacity: 0.7,
        cursor: "not-allowed",
        textDecoration: "none", // No underline when disabled
        _hover: {
          bg: "transparent",
          color: "#00FF00", // Maintain color when disabled
          textDecoration: "none",
        },
      }}
      transition="all 0.2s"
    >
      ADD TO CART
    </Button>
)}
                <Text as="h2" fontSize="xl" mb={2}>
                  Product Description
                </Text>
                {product.description ? (
                  <Text
                    fontSize="lg"
                    color="gray.400"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                  />
                ) : (
                  <Text fontSize="lg" color="gray.400">
                    No description available
                  </Text>
                )}
                {features.length > 0 && (
                  <Box>
                    <Text as="h2" fontSize="xl" mb={2}>
                      Features
                    </Text>
                    <VStack align="start" spacing={1}>
                      {features.map((feature, index) => (
                        <Text key={index} fontSize="md" color="gray.300">
                          • {feature}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </SimpleGrid>
            <Divider my={8} borderColor="gray.600" />
            {/* Related Products */}
            <Box mt={8}>
              <Text as="h2" fontSize="xl" mb={4}>
                Related Products
              </Text>
              {topProductsLoading ? (
                <HStack spacing={4} flexWrap="wrap" justify="center">
                  {[...Array(5)].map((_, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="md" textAlign="center" maxW="160px">
                      <Skeleton w="120px" h="160px" mx="auto" startColor="gray.700" endColor="gray.600" />
                      <SkeletonText mt={2} noOfLines={2} spacing="2" />
                      <Skeleton mt={2} h="16px" w="100px" mx="auto" />
                    </Box>
                  ))}
                </HStack>
              ) : topProducts.length > 0 ? (
                <HStack spacing={4} flexWrap="wrap" justify="center">
                  {topProducts.map((topProduct) => (
                    <Link key={topProduct.id} to={`/products/${topProduct.id}`}>
                      <Box
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        textAlign="center"
                        maxW="160px"
                        bg="gray.800"
                        _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
                        transition="all 0.2s"
                      >
                        <Image
                          src={topProduct.thumbnail || 'https://placehold.co/120x160'}
                          alt={topProduct.title || 'Product'}
                          w="120px"
                          h="160px"
                          objectFit="contain"
                          mx="auto"
                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/120x160')}
                        />
                        <Text mt={2} fontSize="sm" fontWeight="medium" noOfLines={2} color="white">
                          {topProduct.title || 'Untitled Product'}
                        </Text>
                        <Text color="gray.300" fontSize="sm">
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
                <Text fontSize="md" color="gray.400">
                  No related products available.
                </Text>
              )}
            </Box>
            {isMobile && (
              <>
                <Divider my={8} borderColor="gray.600" />
                <HStack
                  justify="space-between"
                  align="center"
                  bg="gray.800"
                  p={4}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="gray.600"
                >
                  <Link to="/cart">
                    <Text fontSize="md" color="gray.400">
                      {cartCount} {cartCount === 1 ? 'Item' : 'Items'} in Cart
                    </Text>
                  </Link>
                  <Link to="/cart">
                    <Button colorScheme="red" size="sm" textTransform="uppercase" isDisabled={cartCount === 0}>
                      Checkout
                    </Button>
                  </Link>
                </HStack>
              </>
            )}
            <Divider my={8} borderColor="gray.600" />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ErrorBoundary>
  );
}

export default ProductDetails;