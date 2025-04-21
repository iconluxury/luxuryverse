import { createFileRoute } from '@tanstack/react-router';
import { Box, Text, HStack, Divider, Image, VStack, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import Footer from '../../components/Common/Footer';
import { useCart } from '../../components/Common/CartContext';

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
  const { cart, removeFromCart, cartCount } = useCart();
  const navigate = useNavigate();

  // Remove from Cart Handler
  const handleRemoveFromCart = (productId: string, variantId: string) => {
    removeFromCart(productId, variantId);
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate Total Price for an Item
  const calculateItemTotalPrice = (item: CartItem) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return (price * item.quantity).toFixed(2);
  };

  return (
    <Box w="100%">
      <Box py={4} px={{ base: 2, md: 4 }}>
        <Box maxW="1200px" mx="auto" w="100%">
          <Text as="h1" fontSize="xl" mb={2} textTransform="uppercase" color="gray.900">
            Your Cart
          </Text>
          {cart.length === 0 ? (
            <Text fontSize="sm" color="gray.600">
              Your cart is empty.
            </Text>
          ) : (
            <VStack spacing={2} align="start">
              <Text fontSize="sm" color="gray.600">
                {cartCount} {cartCount === 1 ? 'Item' : 'Items'} in Your Cart
              </Text>
              {cart.map((item, index) => (
                <HStack
                  key={`${item.product_id}-${item.variant_id}-${index}`}
                  w="100%"
                  p={2}
                  borderWidth="1px"
                  borderRadius="sm"
                  spacing={2}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="60px"
                    h="80px"
                    objectFit="contain"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/60x80')}
                  />
                  <VStack align="start" flex={1} spacing={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.900" textTransform="uppercase">
                      {item.brand} {item.title}
                    </Text>
                    <Text fontSize="xs" color="gray.600" textTransform="uppercase">
                      Brand: {item.brand}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Size: {item.size}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Quantity: {item.quantity}
                    </Text>
                  </VStack>
                  <HStack spacing={2} align="center">
                    <VStack align="end" spacing={0}>
                      <Text fontSize="sm" fontWeight="bold" color="green.500">
                        {item.price}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        MSRP: {item.full_price}
                      </Text>
                    </VStack>
                    <Text
                      as="button"
                      color="green.500"
                      fontSize="xs"
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
              <Divider borderColor="gray.300" />
              <Text as="h3" fontSize="md" fontWeight="bold" color="gray.900" mt={2}>
                SUMMARY
              </Text>
              <Table variant="simple" size="sm" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th color="gray.600" textTransform="uppercase" fontSize="xs">Title</Th>
                    <Th color="gray.600" textTransform="uppercase" fontSize="xs">Size</Th>
                    <Th color="gray.600" textTransform="uppercase" fontSize="xs">Qty</Th>
                    <Th color="gray.600" textTransform="uppercase" fontSize="xs">Prices</Th>
                    <Th color="gray.600" textTransform="uppercase" fontSize="xs">Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.map((item, index) => (
                    <Tr key={`${item.product_id}-${item.variant_id}-${index}`}>
                      <Td color="gray.900" textTransform="uppercase" fontSize="xs">
                        {item.brand} {item.title}
                      </Td>
                      <Td color="gray.600" fontSize="xs">{item.size}</Td>
                      <Td color="gray.600" fontSize="xs">{item.quantity}</Td>
                      <Td color="gray.600" fontSize="xs">
                        <Text as="span" color="green.500">{item.price}</Text> / <Text as="span" color="gray.500">{item.full_price}</Text>
                      </Td>
                      <Td color="green.500" fontSize="xs">${calculateItemTotalPrice(item)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Divider borderColor="gray.300" mt={2} />
              <HStack justify="space-between" w="100%" align="center" spacing={2}>
                <Link to="/terms-and-conditions">
                  <Text fontSize="xs" color="gray.600" textDecoration="underline">
                    Terms and Conditions
                  </Text>
                </Link>
                <Text fontSize="md" fontWeight="bold" color="gray.900">
                  Subtotal: ${calculateSubtotal()}
                </Text>
              </HStack>
              <HStack justify="flex-end" w="100%" spacing={2}>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="md"
                  textTransform="uppercase"
                  onClick={() => navigate({ to: '/collections' })}
                >
                  Keep Shopping
                </Button>
                <Link to="/cart">
                  <Button
                    colorScheme="red"
                    size="md"
                    textTransform="uppercase"
                    isDisabled={cart.length === 0}
                  >
                    Checkout Now
                  </Button>
                </Link>
              </HStack>
            </VStack>
          )}
          <Divider my={4} borderColor="gray.300" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Cart;