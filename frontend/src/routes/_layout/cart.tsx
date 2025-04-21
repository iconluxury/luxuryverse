import { createFileRoute } from '@tanstack/react-router';
import { Box, Text, HStack, Divider, Image, VStack, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import Footer from '../../components/Common/Footer';
import useCustomToast from '../../hooks/useCustomToast';

// Interfaces
interface CartItem {
  customer_id: string | null; // Nullable for guest users
  product_id: string;
  variant_id: string;
  title: string;
  brand: string;
  price: string; // Sale price
  full_price: string; // Full price (MSRP)
  image: string;
  size: string;
  quantity: number;
}

// Define the route
export const Route = createFileRoute('/cart')({
  component: Cart,
});

// Cart component
function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const showToast = useCustomToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    setCart(cartItems);
  }, []);

  // Remove from Cart Handler
  const handleRemoveFromCart = (productId: string, variantId: string) => {
    const updatedCart = cart.filter((item) => !(item.product_id === productId && item.variant_id === variantId));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    showToast('Removed from Cart', 'Item removed from your cart.', 'info');
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate Total Items
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate Total Price for an Item
  const calculateItemTotalPrice = (item: CartItem) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return (price * item.quantity).toFixed(2);
  };

  return (
    <Box bg="transparent" w="100%">
      <Box py={8} px={{ base: 4, md: 8 }}>
        <Box maxW="1200px" mx="auto" w="100%">
          <Text as="h1" fontSize="2xl" mb={4} textTransform="uppercase" color="gray.50">
            Your Cart
          </Text>
          {cart.length === 0 ? (
            <Text fontSize="md" color="gray.400">
              Your cart is empty.
            </Text>
          ) : (
            <VStack spacing={4} align="start">
              <Text fontSize="md" color="gray.400">
                {calculateTotalItems()} {calculateTotalItems() === 1 ? 'Item' : 'Items'} in Your Cart
              </Text>
              {cart.map((item, index) => (
                <HStack
                  key={`${item.product_id}-${item.variant_id}-${index}`}
                  w="100%"
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="gray.800"
                  borderColor="gray.600"
                  spacing={4}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="80px"
                    h="100px"
                    objectFit="contain"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x100')}
                  />
                  <VStack align="start" flex={1}>
                    <Text fontSize="md" fontWeight="medium" color="white" textTransform="uppercase">
                      {item.brand} {item.title}
                    </Text>
                    <Text fontSize="sm" color="gray.400" textTransform="uppercase">
                      Brand: {item.brand}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Size: {item.size}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Quantity: {item.quantity}
                    </Text>
                  </VStack>
                  <HStack spacing={4} align="center">
                    <VStack align="end" spacing={0}>
                      <Text fontSize="md" fontWeight="bold" color="green.500">
                        {item.price}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        MSRP: {item.full_price}
                      </Text>
                    </VStack>
                    <Text
                      as="button"
                      color="green.500"
                      fontSize="sm"
                      textTransform="uppercase"
                      textDecoration="underline"
                      onClick={() => handleRemoveFromCart(item.product_id, item.variant_id)}
                    >
                      Remove
                    </Text>
                  </HStack>
                </HStack>
              ))}
              {/* Compact Text-Only Table */}
              <Divider borderColor="gray.600" />
              <Text as="h3" fontSize="lg" fontWeight="bold" color="gray.50" mt={4}>
                Cart Summary
              </Text>
              <Table variant="simple" size="sm" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th color="gray.400" textTransform="uppercase">Title</Th>
                    <Th color="gray.400" textTransform="uppercase">Size</Th>
                    <Th color="gray.400" textTransform="uppercase">Qty</Th>
                    <Th color="gray.400" textTransform="uppercase">Prices</Th>
                    <Th color="gray.400" textTransform="uppercase">Total Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.map((item, index) => (
                    <Tr key={`${item.product_id}-${item.variant_id}-${index}`}>
                      <Td color="white" textTransform="uppercase">
                        {item.brand} {item.title}
                      </Td>
                      <Td color="gray.400">{item.size}</Td>
                      <Td color="gray.400">{item.quantity}</Td>
                      <Td color="gray.400">
                        <Text as="span" color="green.500">{item.price}</Text> / <Text as="span" color="gray.500">{item.full_price}</Text>
                      </Td>
                      <Td color="green.500">${calculateItemTotalPrice(item)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Divider borderColor="gray.600" mt={4} />
              <HStack justify="space-between" w="100%" align="center">
                <Link to="/terms-and-conditions">
                  <Text fontSize="sm" color="gray.400" textDecoration="underline">
                    Terms and Conditions
                  </Text>
                </Link>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  Subtotal: ${calculateSubtotal()}
                </Text>
              </HStack>
              <HStack justify="flex-end" w="100%" spacing={4}>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="lg"
                  textTransform="uppercase"
                  onClick={() => navigate({ to: '/' })}
                >
                  Keep Shopping
                </Button>
                <Link to="/cart">
                  <Button
                    colorScheme="red"
                    size="lg"
                    textTransform="uppercase"
                    isDisabled={cart.length === 0}
                  >
                    Checkout Now
                  </Button>
                </Link>
              </HStack>
            </VStack>
          )}
          <Divider my={8} borderColor="gray.600" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Cart;