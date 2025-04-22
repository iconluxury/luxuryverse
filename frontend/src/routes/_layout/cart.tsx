import { createFileRoute } from '@tanstack/react-router';
import { Box, Text, HStack, Image, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import Footer from '../../components/Common/Footer';
import { useCart } from '../../components/Common/CartContext';
import { useState, useEffect } from 'react';

// Interfaces
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

// Define the route
export const Route = createFileRoute('/cart')({
  component: Cart,
});

// Cart component
function Cart() {
  const { cart, removeFromCart, cartCount } = useCart();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const API_BASE_URL = 'https://iconluxury.shop';

  // Debug cart state
  useEffect(() => {
    console.log('Cart state:', cart);
  }, [cart]);

  // Fetch crypto prices
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const prices = await fetchWithRetry(`${API_BASE_URL}/api/v1/crypto/prices`);
        if (!Array.isArray(prices)) {
          throw new Error('Invalid crypto prices data received');
        }
        setCryptoPrices(prices);
      } catch (err: any) {
        console.error('Crypto prices fetch error:', err.message);
        setCryptoPrices([]);
      }
    };
    fetchCryptoPrices();
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

  // Remove from Cart Handler
  const handleRemoveFromCart = (productId: string, variantId: string) => {
    console.log('Removing item:', { productId, variantId });
    removeFromCart(productId, variantId);
  };

  // Calculate Subtotal in USD
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Convert Price to Selected Currency
  const convertPrice = (usdPrice: string, currency: string): string => {
    if (!usdPrice || currency === 'USD') {
      return usdPrice;
    }
    const usdValue = parseFloat(usdPrice) || 0;
    const crypto = cryptoPrices.find((c) => c.symbol === currency);
    if (!crypto || crypto.price_usd === 0) {
      return 'N/A';
    }
    const converted = usdValue / crypto.price_usd;
    return converted.toFixed(6);
  };

  // Calculate Item Total Price in USD
  const calculateItemTotalPrice = (item: CartItem) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return (price * item.quantity).toFixed(2);
  };

  return (
    <Box w="100%">
      <Box py={4} px={{ base: 2, md: 4 }}>
        <Box maxW="1200px" mx="auto" w="100%">
          <Text as="h1" fontSize="xl" fontWeight="bold" mb={2} textTransform="uppercase" color="white">
            Cart
          </Text>
          {cart.length === 0 ? (
            <Text fontSize="sm" color="gray.400">
              Your cart is empty.
            </Text>
          ) : (
            <VStack spacing={4} align="start">
              <Text fontSize="sm" color="gray.400">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
              </Text>
              {/* Compact Text-Only Table */}
              <Table variant="simple" size="sm" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th color="white" textTransform="uppercase" fontSize="xs" w="60px">
                      Image
                    </Th>
                    <Th color="white" textTransform="uppercase" fontSize="xs">
                      Title
                    </Th>
                    <Th color="white" textTransform="uppercase" fontSize="xs">
                      Size
                    </Th>
                    <Th color="white" textTransform="uppercase" fontSize="xs">
                      Qty
                    </Th>
                    <Th color="white" textTransform="uppercase" fontSize="xs">
                      Price / MSRP
                    </Th>
                    <Th color="white" textTransform="uppercase" fontSize="xs">
                      Total
                    </Th>
                    <Th color="white" textTransform="uppercase" fontSize="xs">
                      <Select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        width="100px"
                        bg="transparent"
                        color="white"
                        borderColor="green.500"
                        fontSize="xs"
                        height="24px"
                        mt={1}
                        _hover={{ borderColor: 'green.400' }}
                        _focus={{ borderColor: 'green.400', boxShadow: '0 0 0 1px green.400' }}
                        sx={{
                          '> option': {
                            background: 'gray.800',
                            color: 'white',
                            _hover: {
                              background: 'green.700',
                              color: 'white',
                            },
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
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.map((item) => (
                    <Tr key={`${item.product_id}-${item.variant_id}`}>
                      <Td>
                        <Box
                          w="40px"
                          h="60px"
                          bg="white"
                          filter="brightness(0.85)"
                          overflow="hidden"
                          flexShrink={0}
                          boxSizing="border-box"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            w="100%"
                            h="100%"
                            maxW="40px"
                            maxH="60px"
                            objectFit="contain"
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x60')}
                            boxSizing="border-box"
                          />
                        </Box>
                      </Td>
                      <Td color="white" textTransform="uppercase" fontSize="xs">
                        {item.brand} {item.title}
                      </Td>
                      <Td color="gray.400" fontSize="xs">
                        {item.size}
                      </Td>
                      <Td color="gray.400" fontSize="xs">
                        {item.quantity}
                      </Td>
                      <Td color="gray.400" fontSize="xs">
                        <Text as="span" color="#FF9900">
                          {convertPrice(item.price.replace('$', ''), selectedCurrency)} {selectedCurrency}
                        </Text>{' '}
                        /{' '}
                        <Text as="span" color="gray.500">
                          {item.full_price}
                        </Text>
                      </Td>
                      <Td color="#FF9900" fontSize="xs">
                        {convertPrice(calculateItemTotalPrice(item), selectedCurrency)} 
                        
                      </Td>
                      <Td color="white" fontSize="xs">
                      {selectedCurrency}
                      </Td>
                      <Td>
                        <Text
                          as="button"
                          color="#FF9900"
                          fontSize="xs"
                          textTransform="uppercase"
                          textDecoration="underline"
                          onClick={() => handleRemoveFromCart(item.product_id, item.variant_id)}
                        >
                          Remove
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <HStack justify="space-between" w="100%" align="center" spacing={2}>
                <Link to="/terms-conditions">
                  <Text fontSize="xs" color="gray.400" textDecoration="underline">
                    Terms and Conditions
                  </Text>
                </Link>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="white"
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <Text as="span" fontSize={{ base: 'md', md: '3xl' }} color="#FF9900">
                    {`${convertPrice(calculateSubtotal(), selectedCurrency)} ${selectedCurrency}`}
                  </Text>
                </Text>
              </HStack>
              <HStack justify="flex-end" w="100%" spacing={2}>
                <Button
                  size="md"
                  onClick={() => navigate({ to: '/collections' })}
                  bg="transparent"
                  color="#FF9900"
                  textTransform="uppercase"
                  fontFamily="'Special Gothic Expanded One', sans-serif"
                  fontWeight="normal"
                  textAlign="left"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  width="100%"
                  maxW="150px"
                  px={4}
                  py={2}
                  border="none"
                  borderRadius="0"
                  _hover={{
                    bg: 'transparent',
                    color: '#00CC00',
                  }}
                  _disabled={{
                    bg: 'transparent',
                    color: '#FF9900',
                    opacity: 0.7,
                    cursor: 'not-allowed',
                    _hover: {
                      bg: 'transparent',
                      color: '#FF9900',
                    },
                  }}
                  transition="all 0.2s"
                >
                  Keep Shopping
                </Button>
                <Link to="/checkout">
                  <Button
                    size="md"
                    isDisabled={cart.length === 0}
                    bg="transparent"
                    color="white"
                    textTransform="uppercase"
                    fontFamily="'Special Gothic Expanded One', sans-serif"
                    fontWeight="normal"
                    textAlign="left"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    width="100%"
                    maxW="150px"
                    px={4}
                    py={2}
                    border="none"
                    borderRadius="0"
                    _hover={{
                      bg: 'transparent',
                      color: '#E0E0E0',
                    }}
                    _disabled={{
                      bg: 'transparent',
                      color: 'white',
                      opacity: 0.7,
                      cursor: 'not-allowed',
                      _hover: {
                        bg: 'transparent',
                        color: 'white',
                      },
                    }}
                    transition="all 0.2s"
                  >
                    Checkout
                  </Button>
                </Link>
              </HStack>
            </VStack>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Cart;