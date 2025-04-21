import { createFileRoute } from '@tanstack/react-router';
import { Box, Text, HStack, Image, VStack, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
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
        <Text as="h1" fontSize="xl" fontWeight="bold"  mb={2} textTransform="uppercase" color="white">
          Cart
        </Text>
          {cart.length === 0 ? (
            <Text fontSize="sm" color="gray.400">
              Your cart is empty.
            </Text>
          ) : (
            <VStack spacing={2} align="start">
              <Text fontSize="sm" color="gray.400">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
              </Text>
              {cart.map((item, index) => (
  <HStack
    key={`${item.product_id}-${item.variant_id}-${index}`}
    w="100%"
    p={2}
    borderWidth="1px"
    borderRadius="sm"
    spacing={2}
    align="start" // Ensure consistent alignment
  >
    <Box
      position="relative"
      w="60px"
      h="80px"
      minW="60px" // Prevent shrinking
      minH="80px" // Prevent shrinking
      bg="white"
      filter="brightness(0.85)"
      overflow="hidden"
      flexShrink={0} // Prevent container from growing
      boxSizing="border-box" // Ensure padding/border don’t affect size
    >
      <Image
        src={item.image}
        alt={item.title}
        w="100%"
        h="100%"
        maxW="60px"
        maxH="80px"
        objectFit="contain"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/60x80')}
        boxSizing="border-box"
      />
    </Box>
    <VStack align="start" flex={1} spacing={0}>
      <Text fontSize="sm" fontWeight="medium" color="gray.300" textTransform="uppercase">
        {item.brand}
      </Text>
      <Text fontSize="sm" fontWeight="medium" color="white" textTransform="uppercase">
        {item.brand} {item.title}
      </Text>
      <HStack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">
          Size:
        </Text>
        <Text fontSize="sm" color="gray.300" textTransform="uppercase">
          {item.size || 'N/A'}
        </Text>
      </HStack>
      <HStack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase">
          Quantity:
        </Text>
        <Text fontSize="sm" color="gray.300" textTransform="uppercase">
          {item.quantity}
        </Text>
      </HStack>
    </VStack>
    <HStack spacing={2} align="center">
      <VStack align="end" spacing={1}>
        <HStack spacing={2}>
          <Text fontSize="sm" fontWeight="bold" color="green.500">
            {item.price}
          </Text>
          <Text fontSize="xs" fontWeight="medium" color="gray.300" textTransform="uppercase">
            / {item.full_price}
          </Text>
        </HStack>
        <Text
          as="button"
          color="#00ff00"
          fontSize="xs"
          textTransform="uppercase"
          textDecoration="underline"
          onClick={() => handleRemoveFromCart(item.product_id, item.variant_id)}
        >
          Remove
        </Text>
      </VStack>
    </HStack>
  </HStack>
))}
              {/* Compact Text-Only Table */}
              <Text as="h3" fontSize="md" fontWeight="bold" color="white" mt={2}>
                SUMMARY
              </Text>
              <Table variant="simple" size="sm" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th color="white" textTransform="uppercase" fontSize="xs">Title</Th>
                      <Th color="white" textTransform="uppercase" fontSize="xs">Size</Th>
                      <Th color="white" textTransform="uppercase" fontSize="xs">Qty</Th>
                      <Th color="white" textTransform="uppercase" fontSize="xs">Prices</Th>
                      <Th color="white" textTransform="uppercase" fontSize="xs">Total</Th>
                    </Tr>
                  </Thead>
                <Tbody>
                  {cart.map((item, index) => (
                    <Tr key={`${item.product_id}-${item.variant_id}-${index}`}>
                      <Td color="white" textTransform="uppercase" fontSize="xs">
                        {item.brand} {item.title}
                      </Td>
                      <Td color="gray.400" fontSize="xs">{item.size}</Td>
                      <Td color="gray.400" fontSize="xs">{item.quantity}</Td>
                      <Td color="gray.400" fontSize="xs">
                        <Text as="span" color="#00ff00">{item.price}</Text> / <Text as="span" color="gray.500">{item.full_price}</Text>
                      </Td>
                      <Td color="green.500" fontSize="xs">${calculateItemTotalPrice(item)}</Td>
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
                <Text fontSize="md" fontWeight="bold" color="white">
                    Subtotal: ${calculateSubtotal()}
                  </Text>
              </HStack>
              <HStack justify="flex-end" w="100%" spacing={2}>
  <Button
    size="md"
    onClick={() => navigate({ to: '/collections' })}
    bg="transparent"
    color="#00FF00" // Green text
    textTransform="uppercase"
    fontFamily="'Special Gothic Expanded One', sans-serif"
    fontWeight="normal"
    textAlign="left"
    justifyContent="flex-start"
    alignItems="flex-start"
    width="100%"
    maxW="150px" // Limit width for consistency
    px={4}
    py={2}
    border="none"
    borderRadius="0"
    _hover={{
      bg: "transparent",
      color: "#00CC00", // Darker green on hover
    }}
    _disabled={{
      bg: "transparent",
      color: "#00FF00",
      opacity: 0.7,
      cursor: "not-allowed",
      _hover: {
        bg: "transparent",
        color: "#00FF00",
      },
    }}
    transition="all 0.2s"
  >
    Keep Shopping{' '}
  </Button>
  <Link to="/cart">
    <Button
      size="md"
      isDisabled={cart.length === 0}
      bg="transparent"
      color="white" // White text
      textTransform="uppercase"
      fontFamily="'Special Gothic Expanded One', sans-serif"
      fontWeight="normal"
      textAlign="left"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="100%"
      maxW="150px" // Limit width for consistency
      px={4}
      py={2}
      border="none"
      borderRadius="0"
      _hover={{
        bg: "transparent",
        color: "#E0E0E0", // Slightly darker white (light gray) on hover
      }}
      _disabled={{
        bg: "transparent",
        color: "white",
        opacity: 0.7,
        cursor: "not-allowed",
        _hover: {
          bg: "transparent",
          color: "white",
        },
      }}
      transition="all 0.2s"
    >
      Checkout Now
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