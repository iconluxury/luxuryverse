import { useState, useEffect } from 'react';
import { Box, Text, Image, Grid } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.iconluxury.today/api/v1/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(`Failed to load products: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box color="red.500">{error}</Box>;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Products</Text>
      <Link to="/collections" style={{ color: '#3182CE', marginBottom: '16px', display: 'block' }}>
        Go to Collections
      </Link>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {products.map((product: { id: string; title: string; thumbnail: string; price: string }) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            {product.thumbnail && <Image src={product.thumbnail} alt={product.title} />}
            <Box p={4}>
              <Text fontWeight="bold">{product.title}</Text>
              <Text>{product.price}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductsPage;